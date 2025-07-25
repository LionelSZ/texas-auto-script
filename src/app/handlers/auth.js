import { api } from '../../utils/request.js';
import { generateUserData, saveDataToJson, getAccountsFromJson, updateAccountGameStats } from '../../utils/index.js';
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
    let consecutiveErrors = 0;
    const maxConsecutiveErrors = 3;

    for (let i = 0; i < count; i++) {
      const userData = generateUserData();

      console.log(`正在注册账号 ${i + 1}/${count}...${userData.email}-${userData.nickname}`);

      try {
        const response = await api.register(userData.email, userData.nickname);

        if (!response?.d?.uid) {
          console.log(`注册失败:${userData.email} 错误信息:${JSON.stringify(response)}`);
          consecutiveErrors++;
        } else {
          console.log(`注册成功:${userData.email}`);
          consecutiveErrors = 0; // 重置连续错误计数
          const { d = {} } = response
          const { uid = '-1', ls = '-1', bv = '-1' } = d;


          const accountData = {
            uid: uid,
            email: userData.email,
            nickname: userData.nickname,
            gameCount: Number(ls),
            gameBalance: Number(bv),
            registerTime: new Date().toLocaleString(),
          };

          registeredAccounts.push(accountData);
        }

      } catch (error) {
        consecutiveErrors++;

        if (error.code === 'ECONNRESET') {
          console.error(`网络连接中断:${userData.email}，等待网络恢复...`);
          // 网络中断时等待更长时间
          await new Promise(resolve => setTimeout(resolve, 2000));
        } else {
          console.error(`注册异常:${userData.email}`, error.message);
        }

        // 如果连续错误过多，提示检查网络
        if (consecutiveErrors >= maxConsecutiveErrors) {
          console.log(`连续 ${maxConsecutiveErrors} 次错误，建议检查网络连接后继续...`);
          // await new Promise(resolve => setTimeout(resolve, 2000));
          consecutiveErrors = 0;
        }
      }

      // 动态调整延迟：网络不稳定时增加延迟
      // const delay = consecutiveErrors > 0 ? 2000 : 100;
      const delay = 100;
      if (i < count - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
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

    // 定义登录成功后的更新回调函数
    const updateGameStatsCallback = async (account, response) => {
      // 从登录响应中提取游戏统计信息
      const { d = {} } = response;
      const { ls = '-1', bv = '-1' } = d

      // 更新JSON文件中的游戏统计信息
      const updateResult = updateAccountGameStats(
        account.uid,
        Number(ls),
        Number(bv),
        account.email
      );

      if (!updateResult.success) {
        console.error(`❌ 更新账号 ${account.email} 游戏统计信息失败:`, updateResult.error);
      }
    };

    return await processor.processBatchWithUpdate(
      accounts,
      (account) => api.login(account.email),
      (response) => response?.d?.uid,
      updateGameStatsCallback,
      '登录'
    );
  }
};