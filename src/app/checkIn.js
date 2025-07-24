import { api } from '../utils/request.js';

/**
 * 处理签到功能
 * @param {string} uid 用户ID
 * @returns {Promise<Object>} 签到结果
 */
const handleCheckIn = async (uid) => {
  try {
    if (!uid) {
      console.error('签到失败：用户ID不能为空');
      return { success: false, message: '用户ID不能为空' };
    }

    console.log(`正在为用户 ${uid} 执行签到操作...`);
    const response = await api.checkIn(uid);

    if (response && response.r === 0) {
      console.log(`✅ 签到成功！用户: ${uid}`);
      return { success: true, data: response.d, message: '签到成功' };
    } else {
      const errorMsg = response?.m || '未知错误';
      console.error(`❌ 签到失败：${errorMsg}`);
      return { success: false, message: errorMsg };
    }
  } catch (error) {
    console.error(`❌ 签到过程中发生错误：${error.message}`);
    return { success: false, message: error.message };
  }
};

export { handleCheckIn };
