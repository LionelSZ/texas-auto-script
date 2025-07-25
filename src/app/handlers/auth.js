import { api } from '../../utils/request.js';
import { generateUserData, saveDataToJson, getAccountsFromJson } from '../../utils/index.js';
// import { createBatchProcessor } from '../../core/batchProcessor.js';
import { createBatchProcessor } from '../../utils/batchProcessor.js';

const processor = createBatchProcessor({ delay: 200 });

/**
 * 认证相关处理器
 */
export const handleAuth = {
  /**
   * 处理用户注册
   * @param {number} count - 要注册的账号数量，默认为1
   */
  async register(count = 1) {
    const registeredAccounts = [];

    for (let i = 0; i < count; i++) {
      const userData = generateUserData();

      console.log(`正在注册账号 ${i + 1}/${count}...${userData.email}-${userData.nickname}`);

      try {
        const res = await api.register(userData.email, userData.nickname);

        if (!res?.d?.uid) {
          console.log(`注册失败:${userData.email} 错误信息:${JSON.stringify(res)}`);
          continue;
        }

        console.log(`注册成功:${userData.email}`);

        const accountData = {
          uid: res?.d?.uid,
          email: userData.email,
          nickname: userData.nickname,
          // 游戏场次
          gameCount: res?.d?.ls || '-1',
          // 游戏余额
          gameBalance: res?.d?.bv || '-1',
          registerTime: new Date().toLocaleString(),

        };

        registeredAccounts.push(accountData);

      } catch (error) {
        console.error(`注册异常:${userData.email}`, error.message);
      }

      // 添加延迟，避免请求过于频繁
      if (i < count - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    if (registeredAccounts.length > 0) {
      const fileName = `register-${new Date().toISOString().slice(0, 10)}`;
      const saveResult = saveDataToJson(registeredAccounts, fileName);

      console.log(`成功注册 ${registeredAccounts.length}/${count} 个账号`);

      return {
        success: true,
        data: registeredAccounts,
        saved: saveResult.success
      };
    } else {
      return { success: false, error: '没有成功注册的账号' };
    }
  },

  /**
   * 处理批量登录验证
   */
  async login() {
    const accounts = getAccountsFromJson();
    console.log(`总共读取到 ${accounts.length} 个账号`);

    return await processor.processBatch(
      accounts,
      (account) => api.login(account.email),
      (response) => response?.d?.uid,
      '登录'
    );
  }
};