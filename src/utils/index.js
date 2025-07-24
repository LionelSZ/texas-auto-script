import fs from 'fs';
import path from 'path';
// import chalk from 'chalk';
import chalk from './chalk-simple.js';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { functions } from '../config/LanguageConfig.js';

//随机生成邮箱
const randomEmail = () => {
  const mails = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com', 'aol.com', 'icloud.com', 'zoho.com', 'yandex.com', 'protonmail.com', 'fastmail.com'];
  return `${Math.random().toString(36).substring(2, 8)}@${mails[Math.floor(Math.random() * mails.length)]}`;
}
// 随机英文昵称
const randomNickname = () => {
  const firstNames = ['John', 'Emma', 'Michael', 'Sophia', 'William', 'Olivia', 'James', 'Ava', 'Alexander', 'Isabella', 'Daniel', 'Charlotte', 'Matthew', 'Amelia', 'David', 'Harper', 'Joseph', 'Evelyn', 'Andrew', 'Abigail', 'Joshua', 'Emily', 'Christopher', 'Elizabeth', 'Nicholas', 'Mia', 'Ethan', 'Ella', 'Ryan', 'Grace'];
  const lastNames = ['Smith', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Miller', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King', 'Wright', 'Lopez', 'Hill'];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${firstName}${lastName}${Math.floor(Math.random() * 1000)}`;
}

// 把数据保存到./outJson/文件
const saveDataToJson = (data, fileName) => {
  // 确保目录存在
  const dir = './outJson';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // 避免重复的.json后缀
  const cleanFileName = fileName.endsWith('.json')
    ? fileName
    : `${fileName}.json`;

  fs.writeFileSync(path.join(dir, cleanFileName), JSON.stringify(data, null, 2));
}


// 显示主菜单
function showMenu() {
  const line_str = chalk.green('------------------------------------------------------');
  console.log(chalk.yellow('🌟 欢迎使用「Texas Poker」v1.0 🌟'));
  console.log(line_str);
  // console.log('📅 当前时间：' + chalk.cyan(new Date().toLocaleString()));
  console.log('🛠 功能列表：');
  // 将功能列表分成两列显示
  // 将功能项两两展示
  for (let i = 0; i < functions.length; i += 2) {
    const leftItem = functions[i];
    const rightItem = functions[i + 1];
    let line = chalk.green(`   [${leftItem.command}] ${leftItem.zh}`);
    // 如果右侧有项目，添加到同一行
    if (rightItem) {
      line += ' '.repeat(10 - leftItem.zh.length);
      line += chalk.green(`   [${rightItem.command}] ${rightItem.zh}`);
    }
    console.log(line);
  }

  console.log(chalk.magenta('📌 请输入操作编号并回车开始：'));
  console.log(line_str);
}


// 显示 ASCII LOGO
function showLogo() {
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
}


/**
 * 从outJson目录读取所有账号数据
 * @returns {Array} 包含所有账号数据的数组
 */
const getAccountsFromJson = () => {
  const files = fs.readdirSync('./outJson');
  const allAccounts = [];

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(`./outJson/${file}`, 'utf8'));
    console.log(`读取文件: ${file}, 包含 ${data.length} 个账号`);
    allAccounts.push(...data);
  }

  return allAccounts;
};


const showStatLog = (totalAccounts, successCount, failCount) => {
  // console.log(chalk.blue(`\n============ 登录统计信息 ============`));
  // console.log(chalk.yellow(`📊 总账号数: ${totalAccounts}`));
  // console.log(chalk.green(`✅ 成功个数: ${successCount.length}`));
  // console.log(chalk.red(`❌ 失败个数: ${failCount.length}`));
  // console.log(chalk.blue(`======================================`));
  console.log(chalk.green(`成功: ${successCount.length}`));
  console.log(chalk.red(`失败: ${failCount.length}`));
}

const showLineLog = (text) => {
  const line_str = '=========================================='
  return console.log(chalk.green(`\n${line_str}${text}${line_str}\n`));
}

const showAboutInfo = () => {
  console.log(chalk.cyan(`
    ┌───────────────────────────────────────────────────────────────┐
    │ Author: Lionelsz                                              │
    │ 📧 Email: gsuzher@gmail.com                                   │
    │ 🔗 GitHub: https://github.com/LionelSZ                        │
    │ 🔗 Project: https://github.com/LionelSZ/texas-auto-script     │
    └───────────────────────────────────────────────────────────────┘
    `));

}
export {
  randomEmail,
  randomNickname,
  saveDataToJson,
  showMenu,
  showLogo,
  getAccountsFromJson,
  showStatLog,
  showLineLog,
  showAboutInfo
};