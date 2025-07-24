
import { api } from '../utils/request.js';
import { getAccountsFromJson, showStatLog } from '../utils/index.js';

const checkIn = async (uid) => {
  const accounts = getAccountsFromJson();
  const totalAccounts = accounts.length;
  let successCount = [];
  let failCount = [];

  console.log(`总共读取到 ${totalAccounts} 个账号，开始处理签到`);

  for (let i = 0; i < totalAccounts; i++) {
    let account = ''
    try {
      account = accounts[i];
      if (account?.uid) {
        // 然后调用福袋接口
        const dataRes = await api.checkIn(account.uid);

        if (dataRes?.e !== 10002) {
          console.log(`✅ 签到成功！用户: ${account.email}`);
          successCount.push(account.email);
        } else {
          console.log(`❌ 签到失败：${account.email}, 错误信息: ${JSON.stringify(dataRes)}`);
          failCount.push(account.email);
        }
      } else {
        console.log(`❌ 签到失败：${account.email}`);
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
}
const handleCheckIn = async () => {
  for (let i = 0; i < 2; i++) {
    console.log(`正在第${i + 1}次签到`);
    await checkIn();
  }
};
export { handleCheckIn };