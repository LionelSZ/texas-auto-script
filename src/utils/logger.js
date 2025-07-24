import chalk from './chalk-simple.js';

/**
 * 显示统计日志
 * @param {number} totalAccounts - 总账号数
 * @param {Array} successCount - 成功列表
 * @param {Array} failCount - 失败列表
 */
export const showStatLog = (totalAccounts, successCount, failCount) => {
  console.log(chalk.green(`成功: ${successCount.length}`));
  console.log(chalk.red(`失败: ${failCount.length}`));
};

/**
 * 显示详细统计信息
 * @param {string} operation - 操作名称
 * @param {number} totalAccounts - 总账号数
 * @param {Array} successCount - 成功列表
 * @param {Array} failCount - 失败列表
 */
export const showDetailedStats = (operation, totalAccounts, successCount, failCount) => {
  const lineStr = '============================================';
  
  console.log(chalk.blue(`\n${lineStr}`));
  console.log(chalk.yellow(`📊 ${operation} 统计信息`));
  console.log(chalk.yellow(`总账号数: ${totalAccounts}`));
  console.log(chalk.green(`✅ 成功: ${successCount.length}`));
  console.log(chalk.red(`❌ 失败: ${failCount.length}`));
  
  if (failCount.length > 0) {
    console.log(chalk.red(`失败账号: ${failCount.slice(0, 5).join(', ')}${failCount.length > 5 ? '...' : ''}`));
  }
  
  console.log(chalk.blue(lineStr));
};