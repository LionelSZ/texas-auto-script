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
   */
  async register() {
    const userData = generateUserData();

    console.log(`正在注册账号...${userData.email}-${userData.nickname}`);

    try {
      const res = await api.register(userData.email, userData.nickname);

      if (!res?.d?.uid) {
        console.log(`注册失败:${userData.email} 错误信息:${JSON.stringify(res)}`);
        return { success: false, error: res };
      }

      console.log(`注册成功:${userData.email}`);

      const accountData = {
        uid: res.d.uid,
        email: userData.email,
        nickname: userData.nickname,
        registerTime: new Date().toLocaleString(),
      };

      const fileName = `register-${new Date().toISOString().slice(0, 10)}`;
      const saveResult = saveDataToJson([accountData], fileName);

      return {
        success: true,
        data: accountData,
        saved: saveResult.success
      };

    } catch (error) {
      console.error(`注册异常:${userData.email}`, error.message);
      return { success: false, error: error.message };
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