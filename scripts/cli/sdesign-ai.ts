#!/usr/bin/env node
/**
 * sdesign-ai CLI — 将 AI 文档分发到用户项目
 *
 * 核心思路：渐进式文档结构 — llms.txt 索引 + ai/components/ 详细文档
 *
 * 用法:
 *   npx sdesign-ai init              # 复制 llms.txt + components/ 到项目根目录
 *   npx sdesign-ai init --all        # 复制到所有 AI 编辑器位置
 *   npx sdesign-ai init --cursor     # 额外生成 .cursorrules
 *   npx sdesign-ai init --claude     # 额外生成 CLAUDE.md
 *   npx sdesign-ai init --copilot    # 额外生成 .github/copilot-instructions.md
 *   npx sdesign-ai update            # 同 init，更新已有文件
 *   npx sdesign-ai sync              # 同步整个 ai/ 目录到项目 .ai/sdesign/
 */
import * as fs from 'fs';
import * as path from 'path';

const AI_DIR = path.resolve(__dirname, '..', '..', 'ai');

function getVersion(): string {
  try {
    const pkg = JSON.parse(
      fs.readFileSync(
        path.resolve(__dirname, '..', '..', 'package.json'),
        'utf-8',
      ),
    );
    return pkg.version;
  } catch {
    return 'unknown';
  }
}

function copyTo(srcName: string, targetPath: string): void {
  const src = path.join(AI_DIR, srcName);
  if (!fs.existsSync(src)) {
    console.log(`  ⚠️ ${srcName} 不存在，请先运行 npm run ai:generate`);
    return;
  }
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(src, targetPath);
  console.log(`  ✅ ${path.relative(process.cwd(), targetPath)}`);
}

/** 复制 ai/components/ 目录到目标位置 */
function copyComponentsDir(targetDir: string): void {
  const srcDir = path.join(AI_DIR, 'components');
  if (!fs.existsSync(srcDir)) {
    console.log('  ⚠️ ai/components/ 不存在，请先运行 npm run ai:generate');
    return;
  }

  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const files = fs.readdirSync(srcDir);
  let count = 0;
  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    if (!fs.statSync(srcPath).isFile()) continue;
    fs.copyFileSync(srcPath, path.join(targetDir, file));
    count++;
  }
  console.log(
    `  ✅ ${path.relative(process.cwd(), targetDir)}/ (${count} 个组件文档)`,
  );
}

/** 递归复制目录 */
function copyDirSync(src: string, dest: string): number {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  let fileCount = 0;
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      fileCount += copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      fileCount++;
    }
  }
  return fileCount;
}

/** sync 命令：同步整个 ai/ 目录到消费项目的 .ai/sdesign/ */
function syncDocs(): void {
  const version = getVersion();
  console.log(`🔄 同步 @dalydb/sdesign AI 文档 (v${version})...`);
  console.log('');

  const srcDir = AI_DIR;
  if (!fs.existsSync(srcDir)) {
    console.error('❌ ai/ 目录不存在，请先运行 npm run ai:generate');
    process.exit(1);
  }

  const targetDir = path.join(process.cwd(), '.ai', 'sdesign');

  // 清理旧目录，确保完全同步
  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true });
  }

  const fileCount = copyDirSync(srcDir, targetDir);

  console.log(`  源目录:    ${srcDir}`);
  console.log(`  目标目录:  ${path.relative(process.cwd(), targetDir)}`);
  console.log(`  同步文件数: ${fileCount}`);
  console.log(`  版本:      ${version}`);
  console.log('');
  console.log('✅ 同步完成！');
  console.log(
    '💡 推荐将 .ai/sdesign/ 加入 .gitignore，运行 npx sdesign-ai sync 随时更新。',
  );
}

function main(): void {
  const args = process.argv.slice(2);
  const cmd = args[0];

  // sync 命令 —— 独立处理，不进 init/update 分支
  if (cmd === 'sync') {
    syncDocs();
    return;
  }

  if (cmd !== 'init' && cmd !== 'update') {
    console.log(`sdesign-ai v${getVersion()}`);
    console.log('');
    console.log('用法:');
    console.log(
      '  npx sdesign-ai init          # 复制 llms.txt + components/ 到项目根目录',
    );
    console.log('  npx sdesign-ai init --all    # 复制到所有 AI 编辑器位置');
    console.log('  npx sdesign-ai init --cursor # 额外生成 .cursorrules');
    console.log('  npx sdesign-ai init --claude # 额外生成 CLAUDE.md');
    console.log(
      '  npx sdesign-ai init --copilot # 额外生成 copilot-instructions.md',
    );
    console.log(
      '  npx sdesign-ai sync          # 同步 ai/ 文档到 .ai/sdesign/',
    );
    return;
  }

  const root = process.cwd();
  const flags = new Set(args.slice(1));
  const all = flags.has('--all');

  console.log(`\n🚀 @dalydb/sdesign AI 文档初始化 (v${getVersion()})\n`);

  // 核心复制 llms.txt（索引） + components/（详细文档）
  copyTo('llms.txt', path.join(root, 'llms.txt'));
  copyComponentsDir(path.join(root, 'ai', 'components'));

  if (all || flags.has('--cursor')) {
    copyTo('llms.txt', path.join(root, '.cursorrules'));
  }
  if (all || flags.has('--claude')) {
    copyTo('llms.txt', path.join(root, 'CLAUDE.md'));
  }
  if (all || flags.has('--copilot')) {
    copyTo('llms.txt', path.join(root, '.github', 'copilot-instructions.md'));
  }

  console.log(
    '\n✅ 完成！ 渐进式文档结构：llms.txt（索引）+ ai/components/（按需读取）。',
  );
  console.log('🔑 组件库更新后运行 npx sdesign-ai update 同步。');
}

main();
