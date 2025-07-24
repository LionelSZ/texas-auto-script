import chalk from './chalk-simple.js';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { functions } from '../config/LanguageConfig.js';

/**
 * 显示主菜单
 */
export const showMenu = () => {
  const lineStr = chalk.green('------------------------------------------------------');
  
  console.log(chalk.yellow('🌟 欢迎使用「Texas Poker」v1.0 🌟'));
  console.log(lineStr);
  console.log('🛠 功能列表：');
  
  // 两列显示功能列表
  for (let i = 0; i < functions.length; i += 2) {
    const leftItem = functions[i];
    const rightItem = functions[i + 1];
    
    let line = chalk.green(`   [${leftItem.command}] ${leftItem.zh}`);
    
    if (rightItem) {
      const spacing = ' '.repeat(Math.max(1, 10 - leftItem.zh.length));
      line += spacing + chalk.green(`   [${rightItem.command}] ${rightItem.zh}`);
    }
    
    console.log(line);
  }

  console.log(chalk.magenta('📌 请输入操作编号并回车开始：'));
  console.log(lineStr);
};

/**
 * 显示 ASCII LOGO
 * @returns {Promise<string>} Logo字符串
 */
export const showLogo = () => {
  return new Promise((resolve) => {
    figlet.text('Texas Poker', {
      font: 'Standard',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      whitespaceBreak: true,
    }, (err, data) => {
      if (err) {
        console.log('❌ Logo 生成失败');
        resolve('');
        return;
      }
      resolve(gradient.pastel.multiline(data));
    });
  });
};

/**
 * 显示分割线日志
 * @param {string} text - 要显示的文本
 */
export const showLineLog = (text) => {
  const lineStr = '==========================================';
  console.log(chalk.green(`\n${lineStr}${text}${lineStr}\n`));
};

/**
 * 显示关于信息
 */
export const showAboutInfo = () => {
  console.log(chalk.cyan(`
    ┌───────────────────────────────────────────────────────────────┐
    │ Author: Lionelsz                                              │
    │ 📧 Email: gsuzher@gmail.com                                   │
    │ 🔗 GitHub: https://github.com/LionelSZ                        │
    │ 🔗 Project: https://github.com/LionelSZ/texas-auto-script     │
    └───────────────────────────────────────────────────────────────┘
  `));
};