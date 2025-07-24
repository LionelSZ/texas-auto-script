#!/usr/bin/env node

import { createInterface } from 'readline';
import { showMenu, showLogo, showLineLog, showAboutInfo } from '../utils/uiDisplay.js';
import { getAccountsFromJson } from '../utils/fileManager.js';
import { handleAuth, handleDailyTasks } from '../app/handlers/index.js';
import { appConfig } from '../config/appConfig.js';
import chalk from '../utils/chalk-simple.js';

/**
 * CLI 主程序类
 */
export class TexasPokerCLI {
  constructor() {
    this.rl = null;
    this.isRunning = false;
  }

  /**
   * 启动 CLI
   */
  async start() {
    if (appConfig.UI.CLEAR_CONSOLE_ON_START) {
      console.clear();
    }

    if (appConfig.UI.SHOW_LOGO) {
      const logo = await showLogo();
      console.log(logo);
    }

    this.isRunning = true;
    await this.showMainMenu();
  }

  /**
   * 显示主菜单并处理用户输入
   */
  async showMainMenu() {
    showMenu();
    
    this.rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.rl.question(chalk.cyan('👉 操作编号：'), async (answer) => {
      this.rl.close();
      await this.handleUserChoice(answer.trim());
    });
  }

  /**
   * 处理用户选择
   */
  async handleUserChoice(choice) {
    const accounts = getAccountsFromJson();
    const totalAccounts = accounts.length;
    
    if (totalAccounts > 0) {
      console.log(`总共读取到 ${totalAccounts} 个账号`);
    }

    const actionMap = {
      '1': async () => {
        const count = await this.askRegistrationCount();
        return handleAuth.register(count);
      },
      '2': () => handleAuth.login(),
      '3': () => handleDailyTasks.checkIn(accounts),
      '4': () => handleDailyTasks.benefit(accounts),
      '5': () => handleDailyTasks.glpz(accounts),
      '6': () => handleDailyTasks.runAll(accounts),
      '7': () => showAboutInfo(),
      '0': () => this.exit()
    };

    const action = actionMap[choice];
    
    if (action) {
      console.log(`\n`, chalk.green(`🔧 正在开始执行任务...`));
      
      try {
        await action();
        await this.askContinueOrExit();
      } catch (error) {
        console.error(chalk.red(`❌ 执行过程中出错: ${error.message}`));
        await this.askContinueOrExit();
      }
    } else {
      console.log(chalk.red('❌ 无效输入，请输入 0 - 7 的数字'));
      await this.showMainMenu();
    }
  }

  /**
   * 询问注册数量
   */
  async askRegistrationCount() {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question(chalk.cyan('👉 请输入要注册的账号数量: '), (answer) => {
        rl.close();
        const count = parseInt(answer.trim());
        if (isNaN(count) || count <= 0) {
          console.log(chalk.yellow('⚠️ 输入无效，将默认注册1个账号'));
          resolve(1);
        } else {
          resolve(count);
        }
      });
    });
  }

  /**
   * 询问用户是否继续
   */
  async askContinueOrExit() {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question(chalk.cyan('👉 操作已完成，是否继续使用？(y/n): \n'), (answer) => {
        rl.close();
        const shouldContinue = answer.trim().toLowerCase() === 'y';
        
        if (shouldContinue) {
          this.showMainMenu();
        } else {
          this.exit();
        }
        
        resolve(shouldContinue);
      });
    });
  }

  /**
   * 退出程序
   */
  exit() {
    console.log(chalk.red('👋 程序退出，再见！'));
    this.isRunning = false;
    process.exit(0);
  }
}