#!/usr/bin/env tsx
/**
 * scripts/gen-llms-txt.ts — 一键生成精简版 llms.txt（~2.7K token）
 *
 * 合并了原 scripts/gen-ai-docs/ 下的全部提取 + 生成逻辑。
 * 完整 API 文档通过 .d.ts 中的 JSDoc 自动携带，此脚本只负责概览。
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

interface SubComponent {
  name: string;
  source: 'internal' | 'antd';
  importName: string;
}

interface ComponentMeta {
  name: string;
  description: string;
  propsInterfaceName: string;
  props: PropInfo[];
  extendsFrom?: string;
  subComponents: SubComponent[];
  staticMethods: string[];
}

interface HookMeta {
  name: string;
  description: string;
  params: PropInfo[];
  returns: PropInfo[];
}

interface LibraryMeta {
  name: string;
  version: string;
  components: ComponentMeta[];
  hooks: HookMeta[];
}

/**
 * 将 llms.txt 内容作为模块级 JSDoc 注入 dist/index.d.ts 顶部
 *
 * 原理: AI 模型解析 `import { SForm } from '@dalydb/sdesign'` 时，
 * 会读取 package.json.types 指向的 dist/index.d.ts。
 * 模块顶部的 JSDoc 注释会被 AI 作为上下文自动获取。
 */
function injectIntoDistDts(llmsContent: string): void {
  const DIST_DIR = path.join(ROOT, 'dist');
  const dtsPath = path.join(DIST_DIR, 'index.d.ts');

  if (!fs.existsSync(dtsPath)) {
    console.log('  ⚠ dist/index.d.ts 不存在，跳过注入（请先运行 build）');
    return;
  }

  const original = fs.readFileSync(dtsPath, 'utf-8');

  // 移除旧注入（如果有）
  const cleaned = original.replace(
    /\/\*\*\n \* @module @dalydb\/sdesign[\s\S]*?\*\/\n/m,
    '',
  );

  // 将 llms.txt 内容转为 JSDoc 块注释
  const jsdocLines = llmsContent
    .split('\n')
    .map((line) => ` * ${line}`)
    .join('\n');

  const jsdocBlock = `/**\n * @module @dalydb/sdesign\n *\n${jsdocLines}\n */\n`;

  fs.writeFileSync(dtsPath, jsdocBlock + cleaned, 'utf-8');
  console.log(`  ✓ dist/index.d.ts 已注入 llms.txt 内容`);
}

// ─── 提取: Props ────────────────────────────────────────────────

function parseInterfaceProps(
  content: string,
  interfaceName: string,
): PropInfo[] {
  const regex = new RegExp(
    `export\\s+interface\\s+${interfaceName}[^{]*\\{([\\s\\S]*?)\\n\\}`,
    'm',
  );
  const match = content.match(regex);
  if (!match) return [];

  const props: PropInfo[] = [];
  let currentComment = '';

  for (const line of match[1].split('\n')) {
    const trimmed = line.trim();

    // 收集注释
    if (
      trimmed.startsWith('//') ||
      trimmed.startsWith('*') ||
      trimmed.startsWith('/**')
    ) {
      const text = trimmed
        .replace(/^\/\*\*?\s*/, '')
        .replace(/\*\/\s*$/, '')
        .replace(/^\*\s?/, '')
        .replace(/^\/\/\s?/, '')
        .replace(/@description\s?/, '')
        .replace(/@desc\s?/, '')
        .trim();
      if (text)
        currentComment = currentComment ? `${currentComment} ${text}` : text;
      continue;
    }

    // 匹配属性: name?: Type;
    const propMatch = trimmed.match(/^(\w+)(\??):\s*(.+?);?\s*$/);
    if (propMatch) {
      props.push({
        name: propMatch[1],
        type: propMatch[3].replace(/;$/, '').trim(),
        required: propMatch[2] !== '?',
        description: currentComment,
      });
      currentComment = '';
      continue;
    }

    if (trimmed && !trimmed.startsWith('{') && !trimmed.startsWith('}')) {
      currentComment = '';
    }
  }
  return props;
}

function parseAllInterfaces(content: string): Record<string, PropInfo[]> {
  const result: Record<string, PropInfo[]> = {};
  const names = (content.match(/export\s+interface\s+(\w+)/g) || []).map((m) =>
    m.replace(/export\s+interface\s+/, ''),
  );
  for (const n of names) result[n] = parseInterfaceProps(content, n);
  return result;
}

function extractTypes(typesFile: string, componentName: string) {
  if (!fs.existsSync(typesFile))
    return {
      props: [] as PropInfo[],
      propsInterfaceName: '',
      extendsFrom: undefined as string | undefined,
    };

  const content = fs.readFileSync(typesFile, 'utf-8');

  // 找主 Props 接口
  const names = (
    content.match(/export\s+interface\s+(S?\w*Props)\b/g) || []
  ).map((m) => m.replace(/export\s+interface\s+/, ''));
  const mainName =
    names.find((n) => n === `${componentName}Props`) ||
    names.find((n) => n.startsWith('S') && n.endsWith('Props')) ||
    names[0] ||
    '';

  // 提取 Props
  const allProps: PropInfo[] = [];
  for (const n of names) {
    const props = parseInterfaceProps(content, n);
    if (n === mainName) {
      allProps.unshift(...props);
    } else {
      allProps.push(
        ...props.map((p) => ({
          ...p,
          description: p.description ? `[${n}] ${p.description}` : `[${n}]`,
        })),
      );
    }
  }

  // extends
  const extMatch = content.match(
    new RegExp(
      `export\\s+interface\\s+${mainName}\\s+extends\\s+([\\w.]+(?:<[^>]*>)?(?:\\s*,\\s*[\\w.]+(?:<[^>]*>)?)*)`,
    ),
  );

  return {
    props: allProps,
    propsInterfaceName: mainName,
    extendsFrom: extMatch?.[1]?.trim(),
  };
}

// ─── 提取: 复合子组件 ──────────────────────────────────────────

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

// ─── 提取: Hooks ────────────────────────────────────────────────

function extractHooks(hooksDir: string): HookMeta[] {
  const indexPath = path.join(hooksDir, 'index.ts');
  if (!fs.existsSync(indexPath)) return [];

  const indexContent = fs.readFileSync(indexPath, 'utf-8');
  const hooks: HookMeta[] = [];
  const exportMatches = indexContent.matchAll(
    /(?:import\s+(\w+)|export\s+\{\s*(\w+)\s*\})\s+from\s+['"](\.\/\w+)['"]/g,
  );

  for (const match of exportMatches) {
    const hookName = match[1] || match[2];
    const hookPath = match[3];
    if (!hookName?.startsWith('use')) continue;

    let filePath = path.join(hooksDir, `${hookPath}.ts`);
    if (!fs.existsSync(filePath))
      filePath = path.join(hooksDir, hookPath, 'index.ts');
    if (!fs.existsSync(filePath)) continue;

    // 顶部注释作为描述
    const content = fs.readFileSync(filePath, 'utf-8');
    const topComment = content.match(/^\/\*\*[\s\S]*?\*\//);
    let description = `${hookName} hook`;
    if (topComment) {
      description =
        topComment[0]
          .replace(/\/\*\*|\*\//g, '')
          .split('\n')
          .map((l) => l.replace(/^\s*\*\s?/, '').trim())
          .filter(Boolean)
          .join(' ') || description;
    }

    // 从同级 types.ts 提取参数/返回值
    let params: PropInfo[] = [];
    let returns: PropInfo[] = [];
    const typesPath = path.join(path.dirname(filePath), 'types.ts');
    if (fs.existsSync(typesPath)) {
      const ifaces = parseAllInterfaces(fs.readFileSync(typesPath, 'utf-8'));
      const paramKey = Object.keys(ifaces).find((k) =>
        /options|props/i.test(k),
      );
      const retKey = Object.keys(ifaces).find((k) => /return/i.test(k));
      if (paramKey) params = ifaces[paramKey];
      if (retKey) returns = ifaces[retKey];
    }

    hooks.push({ name: hookName, description, params, returns });
  }
  return hooks;
}

// ─── 生成: llms.txt ─────────────────────────────────────────────

function compactProps(props: PropInfo[]): string {
  const own = props.filter((p) => !p.description.startsWith('['));
  if (own.length === 0) return '';
  return own
    .map(
      (p) =>
        `  - ${p.name}${p.required ? '' : '?'}: ${p.type}${
          p.description ? ' — ' + p.description : ''
        }`,
    )
    .join('\n');
}

function generateLlmsTxt(meta: LibraryMeta, outputDir: string): void {
  const L: string[] = [];

  L.push(`# ${meta.name} v${meta.version}`);
  L.push('');
  L.push('基于 Ant Design 5.x 的企业级 React 组件库。所有组件以 S 前缀命名。');
  L.push('');

  // 导入
  L.push('## 导入');
  L.push('```');
  L.push(
    "import { SForm, STable, SSearchTable, SButton, SDetail } from '@dalydb/sdesign';",
  );
  L.push(
    "import type { SFormItems, SColumnsType, SDetailItem } from '@dalydb/sdesign';",
  );
  L.push("import { useSearchTable } from '@dalydb/sdesign/hooks';");
  L.push('```');
  L.push('');

  // 组件速查
  L.push('## 组件');
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

  // 核心 Props
  const keyComponents = [
    'SForm',
    'SSearchTable',
    'STable',
    'SDetail',
    'SButton',
  ];
  L.push('## 核心组件 Props');
  for (const name of keyComponents) {
    const c = meta.components.find((x) => x.name === name);
    if (!c) continue;
    const ext = c.extendsFrom ? ` (extends ${c.extendsFrom})` : '';
    L.push(`### ${c.name}${ext}`);
    const propsStr = compactProps(c.props);
    L.push(propsStr || '  (无自有 Props，使用继承属性)');
    L.push('');
  }

  // 关键配置类型
  L.push('## 关键配置类型');
  L.push('');
  L.push('### SFormItems (表单项配置)');
  L.push('extends Omit<FormItemProps, "label | name" | "required">');
  L.push('```ts');
  L.push(`{
  label?: ReactNode;              // 表单项标签
  name?: NamePath;                // 字段名，支持嵌套 ['user', 'name']
  type?: FormComType;             // 控件类型，默认 'input'，见下方 type 值表
  fieldProps?: ComponentProps;    // 控件属性，类型根据 type 自动推导（如 type='select' 则为 SelectProps）
  required?: string | boolean;    // true=默认提示 | string=自定义提示
  disabled?: boolean;
  readonly?: boolean;             // 只读模式，展示文本
  regKey?: RegKeyType;            // 内置校验: 'phone' | 'percentage' 等
  customCom?: ReactNode;          // 自定义组件，替代 type 内置组件
  render?: (form) => ReactNode;   // 自定义渲染函数
  depNames?: string[];            // 依赖字段名，仅 type='dependency' 生效
  formName?: string;              // 嵌套表单字段前缀
  colProps?: ColProps;            // 栅格布局，控制单项列宽
  hidden?: boolean;               // 隐藏（仍参与表单提交）
}`);
  L.push('```');
  L.push('');
  L.push('### SColumnsType<T> (表格列定义)');
  L.push('extends antd ColumnType<T>，额外属性:');
  L.push('```ts');
  L.push(`{
  // ...antd ColumnType 所有属性（title, dataIndex, width, fixed, sorter 等）
  dictKey?: string;               // 字典映射 key，配合 SConfigProvider globalDict 自动转换值
  render?: ((text, record, index) => ReactNode) | 'datetime' | 'date' | 'ellipsis';
                                  // 除函数外支持字符串快捷类型
}`);
  L.push('```');
  L.push('');
  L.push('### SDetailItem (详情项配置)');
  L.push('```ts');
  L.push(`{
  label?: ReactNode;              // 详情项标签
  name?: string | string[];       // 数据源字段名，支持嵌套
  type?: 'text' | 'dict' | 'file' | 'img' | 'rangeTime' | 'checkbox' | 'empty' | 'placeholder';
                                  // 渲染类型，默认 'text'
  dictKey?: string;               // 字典 key，type='dict' 时配合 SConfigProvider
  dictMap?: Record<string, string> | any[];  // 直接提供字典数据
  render?: (value, dataSource) => ReactNode; // 自定义渲染
  fileProps?: Partial<FileListProps>;        // type='file' 时文件展示配置
  span?: number;                  // 栅格占位
  hidden?: boolean;
}`);
  L.push('```');
  L.push('');
  L.push('### SearchProps (搜索表单配置)');
  L.push('extends SFormProps，额外属性:');
  L.push('```ts');
  L.push(`{
  defaultExpand?: boolean;        // 是否默认展开，默认 false
  showExpand?: boolean;           // 是否显示展开/收起按钮
  expandLine?: number;            // 收起时显示的行数
  actionNode?: ReactNode;         // 搜索栏右侧自定义操作
  isCard?: boolean;               // 是否包裹在卡片中
}`);
  L.push('```');
  L.push('');
  L.push('### SButton.Group items 配置');
  L.push('```ts');
  L.push(`{
  actionType?: SButtonActionType; // 预设类型
  onClick?: () => void;
  visible?: boolean;              // 是否可见
  render?: ReactNode | (() => ReactNode); // 自定义渲染
  // ...其他 SButtonProps 属性
}`);
  L.push('```');
  L.push('');
  L.push('### SForm.Group groupItems 配置');
  L.push('```ts');
  L.push(`{
  title?: ReactNode;              // 分组标题
  items?: SFormItems[];           // 该分组的表单项
  columns?: number;               // 该分组的列数
  formName?: string;              // 嵌套表单字段前缀
  container?: React.ComponentType; // 自定义分组容器
}`);
  L.push('```');
  L.push('');
  L.push('### SDetail.Group items 配置');
  L.push('```ts');
  L.push(`{
  groupTitle?: string | ReactNode;
  items?: SDetailItem[];          // 分组内详情项
  groupItems?: SDetailProps[];    // 分组内多个详情面板
  dataSource?: Record<string, any>;
  hidden?: boolean;
}`);
  L.push('```');
  L.push('');
  L.push('### SButtonActionType 可选值');
  L.push(
    'save | cancel | reset | upload | download | export | import | delete | view | back | next | previous | finish | create | edit | confirm | close | refresh | search | t-link',
  );
  L.push('');

  // FormComType
  L.push('## SForm 表单控件 type 值');
  L.push(
    'input | inputNumber | password | textarea | select | slider | radio | radioGroup | switch | treeSelect | upload | datePicker | SDatePicker | datePickerRange | SDatePickerRange | timePicker | timePickerRange | checkbox | checkGroup | cascader | SCascader | table | dependency',
  );
  L.push('');
  L.push('fieldProps 类型根据 type 自动推导。');
  L.push('');

  // STable render
  L.push('## STable columns');
  L.push('render 除函数外可传字符串: "datetime" | "date" | "ellipsis"');
  L.push('dictKey 配合 SConfigProvider globalDict 自动映射。');
  L.push('');

  // useSearchTable
  const hook = meta.hooks.find((h) => h.name === 'useSearchTable');
  if (hook) {
    L.push('## useSearchTable');
    L.push('```');
    L.push(
      'const { tableProps, formConfig, form, getPageData, handleReset } = useSearchTable(requestFn, options);',
    );
    L.push('```');
    if (hook.params.length > 0) {
      L.push('Options:');
      for (const p of hook.params) {
        L.push(
          `  - ${p.name}${p.required ? '' : '?'}: ${p.type}${
            p.description ? ' — ' + p.description : ''
          }`,
        );
      }
    }
    if (hook.returns.length > 0) {
      L.push('Returns:');
      for (const p of hook.returns) {
        L.push(
          `  - ${p.name}: ${p.type}${
            p.description ? ' — ' + p.description : ''
          }`,
        );
      }
    }
    L.push('');
  }

  // 示例
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

  // 注意事项
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

  // 注入到 dist/index.d.ts 顶部，让 AI 通过 import 自动读取
  injectIntoDistDts(content);
}

// ─── 主流程 ─────────────────────────────────────────────────────

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

  // 扫描组件
  const componentDirs = fs.readdirSync(COMPONENTS_DIR).filter((d) => {
    const p = path.join(COMPONENTS_DIR, d);
    return (
      fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.tsx'))
    );
  });

  const components: ComponentMeta[] = componentDirs.map((dirName) => {
    const dir = path.join(COMPONENTS_DIR, dirName);
    const name = dirToComponentName(dirName);
    const types = extractTypes(path.join(dir, 'types.ts'), name);
    const structure = extractStructure(path.join(dir, 'index.tsx'));

    return {
      name,
      description: COMPONENT_DESCRIPTIONS[name] || name,
      propsInterfaceName: types.propsInterfaceName,
      props: types.props,
      extendsFrom: types.extendsFrom,
      subComponents: structure.subComponents,
      staticMethods: structure.staticMethods,
    };
  });

  console.log(`  ${components.length} 个组件`);

  // 扫描 Hooks
  const hooks = extractHooks(HOOKS_DIR);
  console.log(`  ${hooks.length} 个 hooks`);

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
