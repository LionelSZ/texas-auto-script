
import { api } from '../utils/request.js';
import { getAccountsFromJson, showStatLog } from '../utils/index.js';
const benefit = async (accounts) => {
  // const accounts = getAccountsFromJson();
  const totalAccounts = accounts.length;
  let successCount = [];
  let failCount = [];

  // console.log(`总共读取到 ${totalAccounts} 个账号，开始处理福袋领取`);

  for (let i = 0; i < totalAccounts; i++) {
    let account = ''
    try {
      account = accounts[i];
      if (account?.uid) {
        // 然后调用福袋接口
        const benefitRes = await api.benefit(account.uid);
        if (benefitRes?.d?.day) {
          console.log(`✅ 福袋领取成功！用户: ${account.email}`);
          successCount.push(account.email);
        } else {
          console.log(`❌ 福袋领取失败：${account.email}, 错误信息: ${JSON.stringify(benefitRes)}`);
          failCount.push(account.email);
        }
      } else {
        console.log(`❌ 福袋领取失败：${account.email}`);
        failCount.push(account.email);
      }
    } catch (error) {
      console.error(`❌ 处理异常：${accounts[i].email}`, error);
      failCount.push(account.email);
    }
    // 添加短暂延迟，避免请求过于频繁
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  showStatLog(totalAccounts, successCount, failCount)
};
const handleBenefit = async (accounts) => {
  for (let i = 0; i < 6; i++) {
    await benefit(accounts)
  }
}
export { handleBenefit };