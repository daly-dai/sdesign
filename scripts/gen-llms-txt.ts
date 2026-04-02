#!/usr/bin/env tsx
/**
 * scripts/gen-llms-txt.ts — 一键生成精简版 README.md
 *
 * 通用提取逻辑：自动扫描所有组件 types.ts 和 hook 文件，
 * 提取全部 interface/type 定义，无需手动维护硬编码列表。
 *
 * 用法: npx tsx scripts/gen-llms-txt.ts
 */
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// ─── 常量 ───────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const COMPONENTS_DIR = path.join(SRC, 'components');
const HOOKS_DIR = path.join(SRC, 'hooks');
const OUTPUT_DIR = path.join(ROOT, 'ai');

// 需要格式化的文件列表
const filesToFormat: string[] = [];

/** 使用 prettier 格式化指定文件 */
function formatFiles(): void {
  if (filesToFormat.length === 0) return;

  try {
    // 使用 prettier 格式化生成的文件
    const cmd = `npx prettier --write ${filesToFormat.join(' ')}`;
    execSync(cmd, { cwd: ROOT, stdio: 'pipe' });
    console.log(`  ✓ 已格式化 ${filesToFormat.length} 个文件`);
  } catch {
    // prettier 格式化失败不影响主流程
    console.log(`  ⚠ 格式化失败，跳过`);
  }
}

const COMPONENT_DESCRIPTIONS: Record<string, string> = {
  SButton: '增强按钮，支持 actionType 预设操作类型和按钮组',
  SInput: '增强输入框，支持 trim、onEnter',
  SSelect: '增强选择器',
  SCheckGroup: '复选框组',
  SRadioGroup: '单选框组',
  SCascader: '增强级联选择器',
  SCard: '卡片容器，内置错误边界',
  SCollapse: '折叠面板',
  SDatePicker: '增强日期选择器，onChange 直接返回字符串',
  SDatePickerRange: '日期范围选择器，支持 rangeKeys 拆分字段',
  SForm: '配置化表单，items 数组声明 22 种控件、联动、分组、搜索',
  SConfigProvider: '全局配置（字典、上传地址），STable/SDetail 自动读取',
  STable: '增强表格，支持 dictKey 字典映射、render 快捷类型、序号列',
  SSearchTable: 'SForm.Search + STable 一体化，列表页首选',
  SDependency: '字段依赖联动组件',
  SDetail: '详情展示，支持 8 种渲染类型（text/dict/file/img 等）',
  SConfirm: '确认组件，支持 Popconfirm 和 Modal 两种模式',
  SErrorBoundary: '错误边界',
  SErrorCom: '错误展示',
  SNoData: '无数据占位',
  SNoPage: '无页面占位',
  SDynamicContainer: '动态容器',
  STitle: '标题组件（page/table/form 三种类型）',
  SFile: '文件上传/列表',
  SLucideIcon: 'Lucide 图标',
  SFrameAnimation: '帧动画',
  STextEllipsis: '文本省略',
};

// ─── 类型 ───────────────────────────────────────────────────────

interface PropInfo {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

/** 一个 interface 或 type 的完整定义 */
interface TypeDef {
  name: string;
  kind: 'interface' | 'type';
  /** extends 声明（仅 interface 有） */
  extendsFrom?: string;
  /** 提取到的属性列表（type alias 无法结构化解析时为空） */
  props: PropInfo[];
  /** type alias 的原始定义文本（当 props 为空时用于输出） */
  rawType?: string;
  /** JSDoc 描述 */
  description: string;
}

interface SubComponent {
  name: string;
  source: 'internal' | 'antd';
  importName: string;
}

/** 组件使用边界（从 metadata.json 读取） */
interface ComponentBoundary {
  useWhen: string[];
  dontUseWhen: string[];
  prefer: Record<string, string>;
}

interface ComponentMeta {
  name: string;
  /** 组件目录名（如 form, search-table） */
  dirName: string;
  description: string;
  /** 主 Props 接口名 */
  mainPropsName: string;
  /** 该组件 types.ts 中所有类型定义 */
  typeDefs: TypeDef[];
  extendsFrom?: string;
  subComponents: SubComponent[];
  staticMethods: string[];
  /** 使用边界（从 metadata.json 提取） */
  boundary?: ComponentBoundary;
}

interface HookMeta {
  name: string;
  description: string;
  /** 所有相关类型定义（参数、返回值等） */
  typeDefs: TypeDef[];
  /** 主签名文本（从 hook 函数声明提取） */
  signature: string;
}

/** 全局类型注册表中的条目 */
interface KnownTypeEntry {
  source: 'component' | 'hook';
  sourceName: string;
  typeDef: TypeDef;
}

/** 组合引用：某个 prop 引用了外部组件/Hook 的类型 */
interface CompositionRef {
  propName: string;
  propDescription: string;
  typeName: string;
  entry: KnownTypeEntry;
}

interface LibraryMeta {
  name: string;
  version: string;
  components: ComponentMeta[];
  hooks: HookMeta[];
}

// ─── 工具：注释提取 ─────────────────────────────────────────────

/** 提取紧贴在某位置之前的 JSDoc 注释文本 */
function extractLeadingJSDoc(content: string, pos: number): string {
  const before = content.slice(0, pos).trimEnd();
  const commentEndMatch = before.match(/\*\/\s*$/);
  if (!commentEndMatch) return '';
  const commentEnd =
    before.length - (before.length - before.lastIndexOf('/**'));
  const commentBlock = before.slice(commentEnd);
  return commentBlock
    .replace(/\/\*\*|\*\//g, '')
    .split('\n')
    .map((l) =>
      l
        .replace(/^\s*\*\s?/, '')
        .replace(/@\w+[^\n]*/g, '')
        .trim(),
    )
    .filter(Boolean)
    .join(' ')
    .trim();
}

// ─── 工具：属性块解析 ───────────────────────────────────────────

/** 解析 interface / object type 的属性块 `{ ... }` */
function parsePropsBlock(block: string): PropInfo[] {
  const props: PropInfo[] = [];
  let currentComment = '';
  let depth = 0;
  let currentProp = '';

  for (const line of block.split('\n')) {
    const trimmed = line.trim();

    // 收集注释
    if (
      trimmed.startsWith('/**') ||
      trimmed.startsWith('*') ||
      trimmed.startsWith('//')
    ) {
      const text = trimmed
        .replace(/^\/\*\*?\s*/, '')
        .replace(/\*\/\s*$/, '')
        .replace(/^\*\s?/, '')
        .replace(/^\/\/\s?/, '')
        .replace(/@\w+[^\n]*/g, '')
        .trim();
      if (text)
        currentComment = currentComment ? `${currentComment} ${text}` : text;
      continue;
    }

    // 累积属性（处理多行类型）
    depth += (trimmed.match(/[{(<[]/g) || []).length;
    depth -= (trimmed.match(/[}>)\]]/g) || []).length;
    currentProp += (currentProp ? ' ' : '') + trimmed;

    if (depth <= 0) {
      // 匹配属性：name??: Type; 或 readonly name?: Type;
      const propMatch = currentProp.match(
        /^(?:readonly\s+)?(\w+)(\??):\s*(.+?);?\s*$/,
      );
      if (propMatch && !propMatch[1].startsWith('[')) {
        props.push({
          name: propMatch[1],
          type: propMatch[3].replace(/;$/, '').trim(),
          required: propMatch[2] !== '?',
          description: currentComment,
        });
      }
      currentComment = '';
      currentProp = '';
      depth = 0;
    }
  }
  return props;
}

// ─── 核心：从文件内容提取所有 TypeDef ──────────────────────────

/**
 * 从 TypeScript 源文件中提取所有 export interface 和 export type。
 * 支持多行定义、嵌套泛型、extends 子句。
 */
function extractAllTypeDefs(content: string): TypeDef[] {
  const defs: TypeDef[] = [];

  // ── interface ──
  const ifaceRegex =
    /export\s+interface\s+(\w+)(?:<[^>]*>)?(\s+extends\s+([^{]+))?\s*\{/g;
  let m: RegExpExecArray | null;

  while ((m = ifaceRegex.exec(content)) !== null) {
    const name = m[1];
    const extendsFrom = m[3]?.trim();
    const startBrace = m.index + m[0].length - 1;

    // 找对应的闭合 }
    let depth = 1;
    let i = startBrace + 1;
    while (i < content.length && depth > 0) {
      if (content[i] === '{') depth++;
      else if (content[i] === '}') depth--;
      i++;
    }
    const block = content.slice(startBrace + 1, i - 1);
    const description = extractLeadingJSDoc(content, m.index);

    defs.push({
      name,
      kind: 'interface',
      extendsFrom,
      props: parsePropsBlock(block),
      description,
    });
  }

  // ── type alias（export type Foo = { ... } 或 export type Foo = ...） ──
  const typeRegex = /export\s+type\s+(\w+)(?:<[^>]*>)?\s*=\s*/g;
  while ((m = typeRegex.exec(content)) !== null) {
    const name = m[1];
    const afterEq = m.index + m[0].length;
    const description = extractLeadingJSDoc(content, m.index);

    if (content[afterEq] === '{') {
      // 对象类型，提取属性块
      let depth = 1;
      let i = afterEq + 1;
      while (i < content.length && depth > 0) {
        if (content[i] === '{') depth++;
        else if (content[i] === '}') depth--;
        i++;
      }
      const block = content.slice(afterEq + 1, i - 1);
      defs.push({
        name,
        kind: 'type',
        props: parsePropsBlock(block),
        description,
      });
    } else {
      // 非对象类型（联合类型、交叉类型等），取到分号或换行
      const rest = content.slice(afterEq);
      // 找到语句结束（考虑泛型嵌套）
      let depth = 0;
      let end = 0;
      for (let i = 0; i < rest.length; i++) {
        const ch = rest[i];
        if (ch === '<' || ch === '(' || ch === '{') depth++;
        else if (ch === '>' || ch === ')' || ch === '}') depth--;
        else if (ch === ';' && depth === 0) {
          end = i;
          break;
        } else if (ch === '\n' && depth === 0 && i > 0) {
          end = i;
          break;
        }
      }
      const rawType = rest.slice(0, end).trim().replace(/;$/, '');
      // 只保留有意义的类型（非纯 import 引用）
      if (rawType && !rawType.startsWith('import(')) {
        defs.push({
          name,
          kind: 'type',
          props: [],
          rawType,
          description,
        });
      }
    }
  }

  return defs;
}

// ─── 提取：组件边界 metadata.json ────────────────────────────────

function extractMetadata(componentDir: string): ComponentBoundary | undefined {
  const metaPath = path.join(componentDir, 'metadata.json');
  if (!fs.existsSync(metaPath)) return undefined;

  try {
    const raw = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
    return {
      useWhen: raw.useWhen || [],
      dontUseWhen: raw.dontUseWhen || [],
      prefer: raw.prefer || {},
    };
  } catch {
    console.log(`  ⚠ metadata.json 解析失败: ${metaPath}`);
    return undefined;
  }
}

// ─── 提取：组件类型 ─────────────────────────────────────────────

function extractComponentTypes(
  typesFile: string,
  componentName: string,
): { typeDefs: TypeDef[]; mainPropsName: string; extendsFrom?: string } {
  const empty = {
    typeDefs: [] as TypeDef[],
    mainPropsName: '',
    extendsFrom: undefined as string | undefined,
  };
  if (!fs.existsSync(typesFile)) return empty;

  const content = fs.readFileSync(typesFile, 'utf-8');
  const typeDefs = extractAllTypeDefs(content);

  // 找主 Props 接口：优先精确匹配 ComponentNameProps，其次 S*Props
  const propsNames = typeDefs
    .filter((d) => d.name.endsWith('Props'))
    .map((d) => d.name);
  const mainPropsName =
    propsNames.find((n) => n === `${componentName}Props`) ||
    propsNames.find((n) => n.startsWith('S') && n.endsWith('Props')) ||
    propsNames[0] ||
    '';

  const mainDef = typeDefs.find((d) => d.name === mainPropsName);

  return {
    typeDefs,
    mainPropsName,
    extendsFrom: mainDef?.extendsFrom,
  };
}

// ─── 提取：复合子组件 ───────────────────────────────────────────

function extractStructure(indexFile: string) {
  const subs: SubComponent[] = [];
  const methods: string[] = [];
  if (!fs.existsSync(indexFile))
    return { subComponents: subs, staticMethods: methods };

  const content = fs.readFileSync(indexFile, 'utf-8');
  const regex = /(\w+)\.(\w+)\s*=\s*(\w+)/g;
  let m: RegExpExecArray | null;

  while ((m = regex.exec(content)) !== null) {
    const subName = m[2];
    const importName = m[3];
    if (
      subName.startsWith('use') ||
      subName === 'ErrorList' ||
      subName === 'List'
    ) {
      methods.push(subName);
    } else {
      const fromAntd = content
        .split('\n')
        .some(
          (l) =>
            l.includes(importName) &&
            (l.includes("from 'antd'") || l.includes('from "antd"')),
        );
      subs.push({
        name: subName,
        source: fromAntd ? 'antd' : 'internal',
        importName,
      });
    }
  }
  return { subComponents: subs, staticMethods: methods };
}

// ─── 提取：Hook 签名 ────────────────────────────────────────────

/**
 * 从 hook 文件中提取函数签名（参数 + 返回值）
 * 支持 `const useFoo = (...) =>` 和 `function useFoo(...)` 两种风格
 */
function extractHookSignature(content: string, hookName: string): string {
  // 匹配 const hookName = (...): ReturnType =>
  const arrowMatch = content.match(
    new RegExp(
      `const\\s+${hookName}\\s*=\\s*\\(([^)]*)\\)\\s*(?::\\s*([^=>{]+))?\\s*=>`,
    ),
  );
  if (arrowMatch) {
    const params = arrowMatch[1].replace(/\s+/g, ' ').trim();
    const ret = arrowMatch[2]?.trim();
    return ret ? `${hookName}(${params}): ${ret}` : `${hookName}(${params})`;
  }

  // 匹配 function hookName(...): ReturnType
  const fnMatch = content.match(
    new RegExp(
      `function\\s+${hookName}\\s*\\(([^)]*)\\)\\s*(?::\\s*([^{]+))?\\s*\\{`,
    ),
  );
  if (fnMatch) {
    const params = fnMatch[1].replace(/\s+/g, ' ').trim();
    const ret = fnMatch[2]?.trim();
    return ret ? `${hookName}(${params}): ${ret}` : `${hookName}(${params})`;
  }

  return hookName;
}

// ─── 组合组件：自动检测外部类型引用 ────────────────────────────

/** 构建全局类型注册表，收集所有组件和 Hook 导出的类型 */
function buildKnownTypesMap(meta: LibraryMeta): Map<string, KnownTypeEntry> {
  const map = new Map<string, KnownTypeEntry>();

  for (const c of meta.components) {
    for (const td of c.typeDefs) {
      map.set(td.name, {
        source: 'component',
        sourceName: c.name,
        typeDef: td,
      });
    }
  }

  for (const h of meta.hooks) {
    for (const td of h.typeDefs) {
      map.set(td.name, {
        source: 'hook',
        sourceName: h.name,
        typeDef: td,
      });
    }
  }

  return map;
}

/** 从 TypeScript 类型字符串中提取可能的类型名引用 */
function extractTypeNameRefs(typeStr: string): string[] {
  const refs = new Set<string>();
  const regex = /\b([A-Z][A-Za-z0-9]*|use[A-Z][A-Za-z0-9]*)\b/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(typeStr)) !== null) {
    refs.add(m[1]);
  }
  return Array.from(refs);
}

/**
 * 检测组件 props 中引用了哪些外部组件/Hook 的类型
 * 自动扫描主 Props 接口的属性类型，匹配全局类型注册表
 */
function resolveCompositionRefs(
  component: ComponentMeta,
  knownTypes: Map<string, KnownTypeEntry>,
): CompositionRef[] {
  const mainDef = component.typeDefs.find(
    (d) => d.name === component.mainPropsName,
  );
  if (!mainDef || mainDef.props.length === 0) return [];

  // 排除自身定义的类型
  const selfTypeNames = new Set(component.typeDefs.map((d) => d.name));

  const refs: CompositionRef[] = [];
  const seenTypes = new Set<string>();

  for (const prop of mainDef.props) {
    const typeRefs = extractTypeNameRefs(prop.type);
    for (const typeName of typeRefs) {
      if (selfTypeNames.has(typeName)) continue;
      if (seenTypes.has(typeName)) continue;

      const entry = knownTypes.get(typeName);
      if (!entry) continue;
      if (entry.sourceName === component.name) continue;

      // 只关注有属性的类型（跳过简单 union/alias 类型）
      if (entry.typeDef.props.length === 0 && !entry.typeDef.rawType) continue;

      seenTypes.add(typeName);
      refs.push({
        propName: prop.name,
        propDescription: prop.description,
        typeName,
        entry,
      });
    }
  }

  return refs;
}

/**
 * 生成组合组件说明的 Markdown 段落
 * 包含每个引用类型的核心属性摘要和交叉引用链接
 */
function generateCompositionSection(
  refs: CompositionRef[],
  knownTypes: Map<string, KnownTypeEntry>,
  maxProps: number = 8,
): string[] {
  if (refs.length === 0) return [];

  const L: string[] = [];
  L.push('## 组合组件说明');
  L.push('');
  L.push(
    '以下是本组件 props 中引用的子组件/Hook 类型的核心属性摘要，无需额外查阅即可理解完整能力：',
  );
  L.push('');

  for (const ref of refs) {
    const td = ref.entry.typeDef;
    const docFile = `ai/components/${ref.entry.sourceName}.md`;
    const ext = td.extendsFrom ? ` (extends ${td.extendsFrom})` : '';

    L.push(
      `### ${ref.propName} → ${ref.entry.sourceName} (${ref.typeName})${ext}`,
    );
    L.push('');
    L.push(`> 完整 API: ${docFile}`);
    L.push('');

    if (td.props.length > 0) {
      // 收集属性：自身 + 继承的父类型属性
      let allProps = [...td.props];

      if (td.extendsFrom) {
        const parentRefs = extractTypeNameRefs(td.extendsFrom);
        for (const parentName of parentRefs) {
          const parentEntry = knownTypes.get(parentName);
          if (parentEntry && parentEntry.typeDef.props.length > 0) {
            const existingNames = new Set(allProps.map((p) => p.name));
            for (const pp of parentEntry.typeDef.props) {
              if (!existingNames.has(pp.name)) {
                allProps.push(pp);
              }
            }
          }
        }
      }

      // 必填优先排序
      const sorted = [...allProps].sort((a, b) => {
        if (a.required && !b.required) return -1;
        if (!a.required && b.required) return 1;
        return 0;
      });
      const shown = sorted.slice(0, maxProps);

      for (const p of shown) {
        const comment = p.description ? ` — ${p.description}` : '';
        L.push(`- ${p.name}${p.required ? '' : '?'}: \`${p.type}\`${comment}`);
      }

      if (allProps.length > maxProps) {
        L.push(`- _... 共 ${allProps.length} 个属性，详见完整文档_`);
      }
    } else if (td.rawType) {
      L.push(`类型: \`${td.rawType}\``);
    }
    L.push('');
  }

  return L;
}

// ─── 提取：Hooks ────────────────────────────────────────────────

function extractHooks(hooksDir: string): HookMeta[] {
  const indexPath = path.join(hooksDir, 'index.ts');
  if (!fs.existsSync(indexPath)) return [];

  const indexContent = fs.readFileSync(indexPath, 'utf-8');
  const hooks: HookMeta[] = [];

  // 匹配所有 import/export 的 hook 名称和路径
  const exportMatches = indexContent.matchAll(
    /(?:import\s+(\w+)|export\s+\{\s*(\w+)\s*(?:as\s+\w+)?\s*\})\s+from\s+['"](\.[^'"]+)['"]/g,
  );

  for (const match of exportMatches) {
    const hookName = match[1] || match[2];
    const hookPath = match[3];
    if (!hookName?.startsWith('use')) continue;

    // 解析文件路径（支持 ./useXxx、./useXxx/index.ts 等）
    let filePath = path.join(hooksDir, `${hookPath}.ts`);
    if (!fs.existsSync(filePath))
      filePath = path.join(hooksDir, `${hookPath}.tsx`);
    if (!fs.existsSync(filePath))
      filePath = path.join(hooksDir, hookPath, 'index.ts');
    if (!fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, 'utf-8');

    // 顶部 JSDoc 作为描述
    const topComment = content.match(/^\/\*\*[\s\S]*?\*\//);
    let description = `${hookName} hook`;
    if (topComment) {
      const parsed = topComment[0]
        .replace(/\/\*\*|\*\//g, '')
        .split('\n')
        .map((l) =>
          l
            .replace(/^\s*\*\s?/, '')
            .replace(/@\w+[^\n]*/g, '')
            .trim(),
        )
        .filter(Boolean)
        .join(' ')
        .trim();
      if (parsed) description = parsed;
    }

    // 提取类型定义：优先从同级 types.ts，再从 hook 文件本身
    let typeDefs: TypeDef[] = [];
    const typesPath = path.join(path.dirname(filePath), 'types.ts');
    if (fs.existsSync(typesPath)) {
      typeDefs = extractAllTypeDefs(fs.readFileSync(typesPath, 'utf-8'));
    }
    // 从 hook 文件本身补充内联类型（不重复）
    const inlineTypes = extractAllTypeDefs(content);
    for (const t of inlineTypes) {
      if (!typeDefs.some((d) => d.name === t.name)) {
        typeDefs.push(t);
      }
    }

    const signature = extractHookSignature(content, hookName);

    hooks.push({ name: hookName, description, typeDefs, signature });
  }

  return hooks;
}

// ─── 生成：格式化输出 ────────────────────────────────────────────

function formatProps(props: PropInfo[], indent = '  '): string {
  if (props.length === 0) return '';
  return props
    .map((p) => {
      const comment = p.description ? ` — ${p.description}` : '';
      return `${indent}- ${p.name}${p.required ? '' : '?'}: ${
        p.type
      }${comment}`;
    })
    .join('\n');
}

function formatTypeDef(def: TypeDef): string {
  const lines: string[] = [];
  const ext = def.extendsFrom ? ` extends ${def.extendsFrom}` : '';
  if (def.props.length > 0) {
    lines.push(
      `**${def.name}**${ext}${def.description ? ` — ${def.description}` : ''}`,
    );
    lines.push(formatProps(def.props));
  } else if (def.rawType) {
    // 将多行类型定义压缩为单行，移除内部注释，避免 JSDoc 解析错误
    const singleLineType = def.rawType
      .split('\n')
      .map((l) => l.trim())
      .filter(
        (l) =>
          !l.startsWith('/**') && !l.startsWith('*') && !l.startsWith('//'),
      )
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
    lines.push(
      `**${def.name}**${
        def.description ? ` — ${def.description}` : ''
      }: \`${singleLineType}\``,
    );
  }
  return lines.join('\n');
}

// ─── 生成：注入 dist/index.d.ts ─────────────────────────────────

function injectIntoDistDts(llmsContent: string): void {
  const DIST_DIR = path.join(ROOT, 'dist');
  const dtsPath = path.join(DIST_DIR, 'index.d.ts');

  if (!fs.existsSync(dtsPath)) {
    console.log('  ⚠ dist/index.d.ts 不存在，跳过注入（请先运行 build）');
    return;
  }

  const original = fs.readFileSync(dtsPath, 'utf-8');

  // 移除旧的 JSDoc 注释块
  // 匹配从 /** @module 开始，到第一个后面跟着非注释行的 */ 结束
  // 这样可以正确处理多行注释块，避免匹配到代码中的 */
  const cleaned = original.replace(
    /\/\*\*\s*\n\s*\*\s*@module\s+@dalydb\/sdesign[\s\S]*?\*\/\n(?!\s*\*\s)/,
    '',
  );

  const jsdocLines = llmsContent
    .split('\n')
    .map((line) => ` * ${line}`)
    .join('\n');
  const jsdocBlock = `/**\n * @module @dalydb/sdesign\n *\n${jsdocLines}\n */\n`;

  const newContent = jsdocBlock + cleaned;

  // 只有内容真正变化时才写入，避免不必要的文件修改
  if (original === newContent) {
    console.log(`  ✓ dist/index.d.ts 内容无变化，跳过写入`);
    return;
  }

  fs.writeFileSync(dtsPath, newContent, 'utf-8');
  console.log(`  ✓ dist/index.d.ts 已注入 README.md 内容`);
}

// ─── 生成：README.md（索引层，含边界，不含完整类型） ──────────────

function generateLlmsTxt(meta: LibraryMeta, outputDir: string): void {
  const L: string[] = [];

  L.push(`# ${meta.name} v${meta.version}`);
  L.push('');
  L.push('基于 Ant Design 5.x 的企业级 React 组件库。所有组件以 S 前缀命名。');
  L.push('');

  // ── 渐进式读取指南
  L.push('## 渐进式读取指南');
  L.push('');
  L.push('本文件是组件索引，包含每个组件的用途和使用边界。');
  L.push('每个组件的完整类型定义和使用示例在独立文件中：');
  L.push(
    '- 需要某个组件的详细 API 时，读取 `ai/components/{ComponentName}.md`',
  );
  L.push('- 不要一次性读取所有组件文件，按当前场景按需读取');
  L.push('- 使用边界中的"不适用"描述了该组件不应使用的场景，请严格遵守');
  L.push('');

  // ── 导入示例
  L.push('## 导入');
  L.push('```ts');
  L.push(
    "import { SForm, STable, SSearchTable, SButton, SDetail } from '@dalydb/sdesign';",
  );
  L.push(
    "import type { SFormItems, SColumnsType, SDetailItem } from '@dalydb/sdesign';",
  );
  L.push("import { useSearchTable } from '@dalydb/sdesign/hooks';");
  L.push('```');
  L.push('');

  // ── 组件速查表（含边界）
  L.push('## 组件速查表');
  L.push('');
  for (const c of meta.components) {
    const subs =
      c.subComponents.length > 0
        ? ` [${c.subComponents.map((s) => `.${s.name}`).join(', ')}]`
        : '';
    const methods =
      c.staticMethods.length > 0
        ? ` [${c.staticMethods.map((m) => `.${m}`).join(', ')}]`
        : '';
    L.push(`### ${c.name}${subs}${methods} — ${c.description}`);
    L.push(`> 详细 API: ai/components/${c.name}.md`);
    L.push('');

    if (c.boundary) {
      if (c.boundary.useWhen.length > 0) {
        L.push(`- **适用场景**: ${c.boundary.useWhen.join('; ')}`);
      }
      if (c.boundary.dontUseWhen.length > 0) {
        L.push(`- **不适用**: ${c.boundary.dontUseWhen.join('; ')}`);
      }
      const preferEntries = Object.entries(c.boundary.prefer);
      if (preferEntries.length > 0) {
        const preferStr = preferEntries
          .map(([comp, reason]) => `${comp} → ${reason}`)
          .join('; ');
        L.push(`- **优先使用**: ${preferStr}`);
      }
    } else {
      L.push(`- **适用场景**: ${c.description}`);
    }
    L.push('');
  }

  // ── Hook 速查
  L.push('## Hook 列表');
  L.push('');
  for (const h of meta.hooks) {
    const desc =
      h.description !== `${h.name} hook` ? ` — ${h.description}` : '';
    L.push(`- **${h.name}**${desc} (详细 API: ai/components/${h.name}.md)`);
  }
  L.push('');

  // ── 注意事项
  L.push('## 注意事项');
  L.push('1. 优先使用 S 前缀组件而非 antd 原生组件');
  L.push('2. SForm 通过 items 数组配置，不需要手动写 Form.Item');
  L.push('3. SSearchTable = SForm.Search + STable 一体化，列表页首选');
  L.push('4. SConfigProvider 提供全局字典，STable/SDetail 自动读取');
  L.push('5. SButton 用 actionType 选择预设类型，无需设置 children');
  L.push(
    '6. 使用组件前，先在本索引中确认场景是否匹配，再读取对应 ai/components/ 下的详细文档',
  );

  const content = L.join('\n');
  const outputPath = path.join(outputDir, 'README.md');

  // 只有内容变化时才写入，避免不必要的文件修改
  const existingContent = fs.existsSync(outputPath)
    ? fs.readFileSync(outputPath, 'utf-8')
    : '';
  if (existingContent === content) {
    console.log(`  ✓ README.md 内容无变化，跳过写入`);
  } else {
    fs.writeFileSync(outputPath, content, 'utf-8');
    filesToFormat.push(outputPath);
    console.log(`  ✓ README.md 已写入`);
  }

  const bytes = Buffer.byteLength(content);
  console.log(
    `  ✓ README.md 索引 (${(bytes / 1024).toFixed(1)}KB, ~${Math.round(
      bytes / 3,
    )} tokens)`,
  );

  injectIntoDistDts(content);
}

// ─── 生成：ai/components/{Name}.md（每个组件独立详细文档） ────────

function generateComponentDocs(
  meta: LibraryMeta,
  outputDir: string,
  knownTypes: Map<string, KnownTypeEntry>,
): void {
  const componentsDir = path.join(outputDir, 'components');

  // 确保目录存在
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
  }

  // 获取现有文件列表，用于后续检测删除
  const existingFiles = new Set(fs.readdirSync(componentsDir));

  let count = 0;
  let writeCount = 0;

  for (const c of meta.components) {
    if (c.typeDefs.length === 0) continue;

    const L: string[] = [];
    L.push(`# ${c.name} — ${c.description}`);
    L.push('');

    // 子组件和静态方法
    if (c.subComponents.length > 0 || c.staticMethods.length > 0) {
      L.push('## 子组件与静态方法');
      for (const sub of c.subComponents) {
        L.push(`- ${c.name}.${sub.name}`);
      }
      for (const method of c.staticMethods) {
        L.push(`- ${c.name}.${method}`);
      }
      L.push('');
    }

    // 使用边界
    if (c.boundary) {
      L.push('## 使用边界');
      if (c.boundary.useWhen.length > 0) {
        L.push('**适用场景:**');
        for (const s of c.boundary.useWhen) {
          L.push(`- ${s}`);
        }
      }
      if (c.boundary.dontUseWhen.length > 0) {
        L.push('**不适用:**');
        for (const s of c.boundary.dontUseWhen) {
          L.push(`- ${s}`);
        }
      }
      const preferEntries = Object.entries(c.boundary.prefer);
      if (preferEntries.length > 0) {
        L.push('**优先使用:**');
        for (const [comp, reason] of preferEntries) {
          L.push(`- ${comp} → ${reason}`);
        }
      }
      L.push('');
    }

    // 完整类型定义
    L.push('## 类型定义');
    L.push('');

    // 主 Props 优先
    const mainDef = c.typeDefs.find((d) => d.name === c.mainPropsName);
    const otherDefs = c.typeDefs.filter((d) => d.name !== c.mainPropsName);

    if (mainDef) {
      const formatted = formatTypeDef(mainDef);
      if (formatted) {
        L.push(formatted);
        L.push('');
      }
    }

    for (const def of otherDefs) {
      const formatted = formatTypeDef(def);
      if (formatted) {
        L.push(formatted);
        L.push('');
      }
    }

    // 组合组件说明：自动检测并内联子组件类型摘要
    const compositionRefs = resolveCompositionRefs(c, knownTypes);
    const compositionSection = generateCompositionSection(
      compositionRefs,
      knownTypes,
    );
    L.push(...compositionSection);

    const content = L.join('\n');
    const fileName = `${c.name}.md`;
    const filePath = path.join(componentsDir, fileName);
    existingFiles.delete(fileName);

    // 只有内容变化时才写入
    const existingContent = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, 'utf-8')
      : '';
    if (existingContent !== content) {
      fs.writeFileSync(filePath, content, 'utf-8');
      filesToFormat.push(filePath);
      writeCount++;
    }
    count++;
  }

  // Hook 文档也写入 components 目录
  for (const h of meta.hooks) {
    if (h.typeDefs.length === 0 && h.signature === h.name) continue;

    const L: string[] = [];
    const desc =
      h.description !== `${h.name} hook` ? ` — ${h.description}` : '';
    L.push(`# ${h.name}${desc}`);
    L.push('');

    if (h.signature && h.signature !== h.name) {
      L.push('## 签名');
      L.push('```ts');
      L.push(h.signature);
      L.push('```');
      L.push('');
    }

    if (h.typeDefs.length > 0) {
      L.push('## 类型定义');
      L.push('');
      for (const def of h.typeDefs) {
        const formatted = formatTypeDef(def);
        if (formatted) {
          L.push(formatted);
          L.push('');
        }
      }
    }

    const content = L.join('\n');
    const fileName = `${h.name}.md`;
    const filePath = path.join(componentsDir, fileName);
    existingFiles.delete(fileName);

    // 只有内容变化时才写入
    const existingContent = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, 'utf-8')
      : '';
    if (existingContent !== content) {
      fs.writeFileSync(filePath, content, 'utf-8');
      filesToFormat.push(filePath);
      writeCount++;
    }
    count++;
  }

  // 删除不再需要的文件
  for (const fileName of existingFiles) {
    fs.unlinkSync(path.join(componentsDir, fileName));
    console.log(`  🗑 删除过时文件: ${fileName}`);
  }

  console.log(`  ✓ ai/components/ (${count} 个文档, ${writeCount} 个写入)`);
}

// ─── 主流程 ──────────────────────────────────────────────────────

function dirToComponentName(dirName: string): string {
  return (
    'S' +
    dirName
      .split('-')
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join('')
  );
}

function main(): void {
  console.log('🔍 @dalydb/sdesign AI 文档生成（渐进式）');
  const pkg = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8'),
  );
  console.log(`📦 ${pkg.name} v${pkg.version}`);

  // 扫描组件目录
  const componentDirs = fs.readdirSync(COMPONENTS_DIR).filter((d) => {
    const p = path.join(COMPONENTS_DIR, d);
    return (
      fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.tsx'))
    );
  });

  const components: ComponentMeta[] = componentDirs.map((dirName) => {
    const dir = path.join(COMPONENTS_DIR, dirName);
    const name = dirToComponentName(dirName);
    const { typeDefs, mainPropsName, extendsFrom } = extractComponentTypes(
      path.join(dir, 'types.ts'),
      name,
    );
    const structure = extractStructure(path.join(dir, 'index.tsx'));
    const boundary = extractMetadata(dir);

    return {
      name,
      dirName,
      description: COMPONENT_DESCRIPTIONS[name] || name,
      mainPropsName,
      typeDefs,
      extendsFrom,
      subComponents: structure.subComponents,
      staticMethods: structure.staticMethods,
      boundary,
    };
  });

  const totalTypes = components.reduce((s, c) => s + c.typeDefs.length, 0);
  const withBoundary = components.filter((c) => c.boundary).length;
  console.log(
    `  ${components.length} 个组件，${totalTypes} 个类型定义，${withBoundary} 个含边界定义`,
  );

  // 扫描 Hooks
  const hooks = extractHooks(HOOKS_DIR);
  const totalHookTypes = hooks.reduce((s, h) => s + h.typeDefs.length, 0);
  console.log(`  ${hooks.length} 个 hooks，${totalHookTypes} 个类型定义`);

  const meta: LibraryMeta = {
    name: pkg.name,
    version: pkg.version,
    components,
    hooks,
  };

  // 确保输出目录存在
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // 清理旧文件
  for (const f of [
    'llms.txt',
    'llms-full.txt',
    'cursorrules',
    'claude.md',
    'copilot-instructions.md',
    'component-metadata.json',
  ]) {
    const p = path.join(OUTPUT_DIR, f);
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
      console.log(`  🗑 删除旧文件: ${f}`);
    }
  }

  console.log('');
  generateLlmsTxt(meta, OUTPUT_DIR);

  // 构建全局类型注册表，用于组合组件交叉引用
  const knownTypes = buildKnownTypesMap(meta);
  generateComponentDocs(meta, OUTPUT_DIR, knownTypes);

  // 格式化所有生成的文件
  formatFiles();

  console.log('\n✅ 完成!');
}

main();
