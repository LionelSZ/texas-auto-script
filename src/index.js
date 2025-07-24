#!/usr/bin/env node

import chalk from 'chalk';
import { createInterface } from 'readline';
import { showMenu, showLogo, showLineLog } from './utils/index.js';
import { handleLogin, handleRegister, handleBenefit, handleCheckIn, handleGlpz } from './app/index.js';

// 创建一个函数用于让用户选择继续或退出
function askContinueOrExit() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(chalk.cyan('👉 操作已完成，是否继续使用？(y/n): \n'), (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase() === 'y');
    });
  });
}

// 启动 CLI 主程序
async function startCLI() {
  console.clear();
  const logo = await showLogo();
  console.log(logo); // 添加这一行，将logo输出到控制台
  showMenu();
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(chalk.cyan('👉 操作编号：'), async (answer) => {
    rl.close();
    const outText = answer.trim();
    const funcMaps = {
      '1': handleRegister,
      '2': handleRegister,
      '3': handleLogin,
      '4': handleCheckIn,
      '5': handleBenefit,
      '6': handleGlpz,
      '7': async () => {

        showLineLog('开始签到');
        await handleCheckIn();
        showLineLog('领取福袋');
        await handleBenefit();
        showLineLog('领取低保');
        await handleGlpz();
      },
      '0': () => {
        console.log(chalk.red('👋 程序退出，再见！'));
        process.exit(0);
      }
    }

    if (funcMaps[outText]) {

      console.log(`\n`, chalk.green(`🔧 正在开始${outText === '1' || outText === '2' ? '注册' : '执行'}任务...`));

      try {
        // 执行选择的功能
        await funcMaps[outText]();

        // 操作完成后询问用户是否继续
        const continueUse = await askContinueOrExit();

        if (continueUse) {
          // 用户选择继续，重新启动CLI
          startCLI();
        } else {
          // 用户选择退出
          console.log(chalk.red('👋 程序退出，再见！'));
          process.exit(0);
        }
      } catch (error) {
        console.error(chalk.red(`❌ 执行过程中出错: ${error.message}`));
        // 出错时也询问用户是否继续
        const continueUse = await askContinueOrExit();

        if (continueUse) {
          startCLI();
        } else {
          console.log(chalk.red('👋 程序退出，再见！'));
          process.exit(0);
        }
      }
    } else {
      console.log(chalk.red('❌ 无效输入，请输入 0 - 6 的数字'));
      startCLI(); // 重新启动CLI，让用户重新选择
    }
  });
}

startCLI();

