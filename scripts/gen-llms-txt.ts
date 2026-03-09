#!/usr/bin/env tsx
/**
 * scripts/gen-llms-txt.ts — 一键生成精简版 llms.txt
 *
 * 通用提取逻辑：自动扫描所有组件 types.ts 和 hook 文件，
 * 提取全部 interface/type 定义，无需手动维护硬编码列表。
 *
 * 用法: npx tsx scripts/gen-llms-txt.ts
 */
import * as fs from 'fs';
import * as path from 'path';

// ─── 常量 ───────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const COMPONENTS_DIR = path.join(SRC, 'components');
const HOOKS_DIR = path.join(SRC, 'hooks');
const OUTPUT_DIR = path.join(ROOT, 'ai');

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

interface ComponentMeta {
  name: string;
  description: string;
  /** 主 Props 接口名 */
  mainPropsName: string;
  /** 该组件 types.ts 中所有类型定义 */
  typeDefs: TypeDef[];
  extendsFrom?: string;
  subComponents: SubComponent[];
  staticMethods: string[];
}

interface HookMeta {
  name: string;
  description: string;
  /** 所有相关类型定义（参数、返回值等） */
  typeDefs: TypeDef[];
  /** 主签名文本（从 hook 函数声明提取） */
  signature: string;
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

  fs.writeFileSync(dtsPath, jsdocBlock + cleaned, 'utf-8');
  console.log(`  ✓ dist/index.d.ts 已注入 llms.txt 内容`);
}

// ─── 生成：llms.txt ──────────────────────────────────────────────

function generateLlmsTxt(meta: LibraryMeta, outputDir: string): void {
  const L: string[] = [];

  L.push(`# ${meta.name} v${meta.version}`);
  L.push('');
  L.push('基于 Ant Design 5.x 的企业级 React 组件库。所有组件以 S 前缀命名。');
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

  // ── 组件速查表
  L.push('## 组件列表');
  for (const c of meta.components) {
    const subs =
      c.subComponents.length > 0
        ? ` [${c.subComponents.map((s) => `.${s.name}`).join(', ')}]`
        : '';
    const methods =
      c.staticMethods.length > 0
        ? ` [${c.staticMethods.map((m) => `.${m}`).join(', ')}]`
        : '';
    L.push(`- **${c.name}**${subs}${methods}: ${c.description}`);
  }
  L.push('');

  // ── 所有组件类型定义
  L.push('## 组件类型定义');
  L.push('');
  for (const c of meta.components) {
    if (c.typeDefs.length === 0) continue;
    L.push(`### ${c.name}`);
    if (c.description) L.push(`> ${c.description}`);
    L.push('');

    // 主 Props 优先输出
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
  }

  // ── 所有 Hook 类型定义
  L.push('## Hook 列表与类型定义');
  L.push('');
  for (const h of meta.hooks) {
    L.push(`### ${h.name}`);
    if (h.description && h.description !== `${h.name} hook`) {
      L.push(`> ${h.description}`);
    }
    L.push('');
    if (h.signature && h.signature !== h.name) {
      L.push('**签名**');
      L.push('```ts');
      L.push(h.signature);
      L.push('```');
      L.push('');
    }
    for (const def of h.typeDefs) {
      const formatted = formatTypeDef(def);
      if (formatted) {
        L.push(formatted);
        L.push('');
      }
    }
  }

  // ── 使用示例
  L.push('## 示例');
  L.push('');
  L.push('### 搜索表格页面');
  L.push('```tsx');
  L.push(`import { SSearchTable, SFormItems, SColumnsType } from '@dalydb/sdesign';

const formItems: SFormItems[] = [
  { label: '姓名', name: 'name', type: 'input' },
  { label: '状态', name: 'status', type: 'select', fieldProps: { options: statusOptions } },
];
const columns: SColumnsType<any> = [
  { title: '姓名', dataIndex: 'name' },
  { title: '状态', dataIndex: 'status', dictKey: 'userStatus' },
  { title: '创建时间', dataIndex: 'createTime', render: 'datetime' },
];

<SSearchTable
  headTitle={{ children: '用户管理' }}
  requestFn={api.getUsers}
  formProps={{ items: formItems, columns: 3 }}
  tableProps={{ columns, rowKey: 'id' }}
/>`);
  L.push('```');
  L.push('');
  L.push('### 配置化表单');
  L.push('```tsx');
  L.push(`import { SForm, SFormItems } from '@dalydb/sdesign';

const items: SFormItems[] = [
  { label: '姓名', name: 'name', type: 'input', required: '请输入姓名' },
  { label: '部门', name: 'dept', type: 'select', fieldProps: { options: deptOptions } },
  { label: '日期', name: 'date', type: 'SDatePicker' },
];

<SForm items={items} columns={2} onFinish={(values) => save(values)} />`);
  L.push('```');
  L.push('');
  L.push('### 详情展示');
  L.push('```tsx');
  L.push(`import { SDetail, SDetailItem } from '@dalydb/sdesign';

const items: SDetailItem[] = [
  { label: '姓名', name: 'name' },
  { label: '状态', name: 'status', type: 'dict', dictKey: 'userStatus' },
  { label: '附件', name: 'files', type: 'file' },
];

<SDetail title="用户详情" dataSource={data} items={items} column={2} />`);
  L.push('```');
  L.push('');

  // ── 注意事项
  L.push('## 注意事项');
  L.push('1. 优先使用 S 前缀组件而非 antd 原生组件');
  L.push('2. SForm 通过 items 数组配置，不需要手动写 Form.Item');
  L.push('3. SSearchTable = SForm.Search + STable 一体化，列表页首选');
  L.push('4. SConfigProvider 提供全局字典，STable/SDetail 自动读取');
  L.push('5. SButton 用 actionType 选择预设类型，无需设置 children');
  L.push(
    '6. 完整类型定义和 @example 见 node_modules/@dalydb/sdesign/dist 中的 .d.ts 声明文件',
  );

  const content = L.join('\n');
  const outputPath = path.join(outputDir, 'llms.txt');
  fs.writeFileSync(outputPath, content, 'utf-8');

  const bytes = Buffer.byteLength(content);
  console.log(
    `  ✓ llms.txt (${(bytes / 1024).toFixed(1)}KB, ~${Math.round(
      bytes / 3,
    )} tokens)`,
  );

  injectIntoDistDts(content);
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
  console.log('🔍 @dalydb/sdesign AI 文档生成');
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

    return {
      name,
      description: COMPONENT_DESCRIPTIONS[name] || name,
      mainPropsName,
      typeDefs,
      extendsFrom,
      subComponents: structure.subComponents,
      staticMethods: structure.staticMethods,
    };
  });

  const totalTypes = components.reduce((s, c) => s + c.typeDefs.length, 0);
  console.log(`  ${components.length} 个组件，${totalTypes} 个类型定义`);

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
  console.log('\n✅ 完成!');
}

main();
