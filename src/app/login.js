import { api } from '../utils/request.js';
import { getAccountsFromJson, showStatLog } from '../utils/index.js';


const handleLogin = async () => {
  const accounts = getAccountsFromJson();
  const totalAccounts = accounts.length;
  let successCount = [];
  let failCount = [];

  console.log(`总共读取到 ${totalAccounts} 个账号`);

  for (let i = 0; i < totalAccounts; i++) {
    let account = ''
    try {
      account = accounts[i];
      const res = await api.login(account.email);
      if (res?.d?.uid) {
        // console.log(`✅ 登录成功！用户: ${account.email}, UID: ${res.d.uid}`);
        successCount.push(account.email);
      } else {
        console.log(`❌ 登录失败：${account.email}, 错误信息: ${JSON.stringify(res)}`);
        failCount.push(account.email);
      }
    } catch (error) {
      console.error(`❌ 登录异常：${accounts[i].email}`, error);
      failCount.push(account.email);
    }
    // 添加短暂延迟，避免请求过于频繁
    // await new Promise(resolve => setTimeout(resolve, 200));
  }
  showStatLog(totalAccounts, successCount, failCount)
};



export { handleLogin };







