#!/usr/bin/env node

import chalk from 'chalk';
import { createInterface } from 'readline';
import { showMenu, showLogo } from './utils/index.js';
import { handleLogin, handleRegister, handleBenefit, handleCheckIn, handleGlpz } from './app/index.js';




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

    const outText = answer.trim();
    const funcMaps = {
      '1': handleRegister,
      '2': handleRegister,
      '3': handleLogin,
      '4': handleCheckIn,
      '5': handleBenefit,
      '6': handleGlpz,
      '0': () => {
        console.log(chalk.red('👋 程序退出，再见！'));
        process.exit(0);
      }
    }
    if (funcMaps[outText]) {
      console.log(chalk.green('🔧 正在开始注册任务...'));
      funcMaps[outText]();
    } else {
      console.log(chalk.red('❌ 无效输入，请输入 0 - 3 的数字'));
      rl.close();
      startCLI(); // 重新启动CLI，让用户重新选择
    }
  });
}

startCLI();

