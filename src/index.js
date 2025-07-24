#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import { createInterface } from 'readline';
import { showMenu, showLogo } from './utils/index.js';
import { handleLogin, handleRegister } from './app/index.js';
import { pastel } from 'gradient-string'




// 启动 CLI 主程序
async function startCLI() {
  console.clear();
  const logo = await showLogo();
  showMenu();
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(chalk.cyan('👉 操作编号：'), async (answer) => {
    switch (answer.trim()) {
      case '1':
        console.log(chalk.green('🔧 正在开始注册任务...'));
        handleRegister();
        break;
      case '2':
        console.log(chalk.blue('📖 正在查看日志...'));
        break;
      case '3':
        console.log(chalk.yellow('⚙️ 验证登录...'));
        await handleLogin();
        startCLI();
        break;
      case '0':
        console.log(chalk.red('👋 程序退出，再见！'));
        process.exit(0);
        break;
      default:
        console.log(chalk.red('❌ 无效输入，请输入 0 - 3 的数字'));
        rl.close();
        startCLI(); // 重新启动CLI，让用户重新选择
        return;
    }
    rl.close();
  });
}

startCLI();

