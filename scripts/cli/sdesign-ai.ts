#!/usr/bin/env node
/**
 * sdesign-ai CLI — 将 llms.txt 分发到用户项目
 *
 * 核心思路：只有一份 llms.txt 内容，复制到不同 AI 编辑器约定的文件位置。
 *
 * 用法:
 *   npx sdesign-ai init              # 复制 llms.txt 到项目根目录
 *   npx sdesign-ai init --all        # 复制到所有 AI 编辑器位置
 *   npx sdesign-ai init --cursor     # 额外生成 .cursorrules
 *   npx sdesign-ai init --claude     # 额外生成 CLAUDE.md
 *   npx sdesign-ai init --copilot    # 额外生成 .github/copilot-instructions.md
 *   npx sdesign-ai update            # 同 init，更新已有文件
 */
import * as fs from 'fs';
import * as path from 'path';

const AI_DIR = path.resolve(__dirname, '..', 'ai');

function getVersion(): string {
  try {
    const pkg = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '..', 'package.json'), 'utf-8'),
    );
    return pkg.version;
  } catch {
    return 'unknown';
  }
}

function copyTo(srcName: string, targetPath: string): void {
  const src = path.join(AI_DIR, srcName);
  if (!fs.existsSync(src)) {
    console.log(`  ⚠ ${srcName} 不存在，请先运行 npm run ai:generate`);
    return;
  }
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(src, targetPath);
  console.log(`  ✓ ${path.relative(process.cwd(), targetPath)}`);
}

function main(): void {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (cmd !== 'init' && cmd !== 'update') {
    console.log(`sdesign-ai v${getVersion()}`);
    console.log('');
    console.log('用法:');
    console.log('  npx sdesign-ai init          # 复制 llms.txt 到项目');
    console.log('  npx sdesign-ai init --all    # 复制到所有 AI 编辑器位置');
    console.log('  npx sdesign-ai init --cursor # 额外生成 .cursorrules');
    console.log('  npx sdesign-ai init --claude # 额外生成 CLAUDE.md');
    return;
  }

  const root = process.cwd();
  const flags = new Set(args.slice(1));
  const all = flags.has('--all');

  console.log(`\n🚀 @dalydb/sdesign AI 文档初始化 (v${getVersion()})\n`);

  // 始终复制 llms.txt
  copyTo('llms.txt', path.join(root, 'llms.txt'));

  if (all || flags.has('--cursor')) {
    copyTo('llms.txt', path.join(root, '.cursorrules'));
  }
  if (all || flags.has('--claude')) {
    copyTo('llms.txt', path.join(root, 'CLAUDE.md'));
  }
  if (all || flags.has('--copilot')) {
    copyTo('llms.txt', path.join(root, '.github', 'copilot-instructions.md'));
  }

  console.log('\n✅ 完成! 同一份文档，文件名适配不同 AI 编辑器的加载约定。');
  console.log('💡 组件库更新后运行 npx sdesign-ai update 同步。');
}

main();
