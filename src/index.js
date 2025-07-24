#!/usr/bin/env node

import { EnvLoader } from './utils/envLoader.js';
import { TexasPokerCLI } from './core/cli.js';
import { validateConfig } from './config/apiConfig.js';

/**
 * 程序入口点
 */
async function main() {
  try {
    // 加载环境变量
    EnvLoader.load();

    // 验证配置（而不是验证环境变量）
    const configValidation = validateConfig();
    if (!configValidation.isValid) {
      console.error('配置验证失败:', configValidation.errors);
      process.exit(1);
    }

    // 启动 CLI
    const cli = new TexasPokerCLI();
    await cli.start();

  } catch (error) {
    console.error('程序启动失败:', error);
    process.exit(1);
  }
}

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
  console.error('未捕获的异常:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的 Promise 拒绝:', reason);
  process.exit(1);
});

main();
