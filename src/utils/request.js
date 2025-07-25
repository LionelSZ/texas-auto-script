import axios from 'axios';
import { config } from '../config/apiConfig.js';

/**
 * 创建 axios 实例，配置默认设置
 */
const axiosInstance = axios.create({
  timeout: config.timeout || 30000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

/**
 * 请求重试函数
 * @param {Function} requestFn - 请求函数
 * @param {number} retries - 重试次数
 * @param {number} delay - 重试延迟
 */
const retryRequest = async (requestFn, retries = 3, delay = 100) => {
  for (let i = 0; i <= retries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      const isLastAttempt = i === retries;
      const isNetworkError = error.code === 'ECONNRESET' ||
        error.code === 'ENOTFOUND' ||
        error.code === 'ECONNREFUSED' ||
        error.code === 'ETIMEDOUT';

      if (isLastAttempt || !isNetworkError) {
        throw error;
      }

      console.log(`网络错误，${delay}ms 后进行第 ${i + 1} 次重试...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      // delay *= 1.5; // 指数退避
    }
  }
};

/**
 * 封装 axios 请求
 * @param {Object} options - 请求配置项
 * @returns {Promise} - 返回请求的 Promise 对象
 */
const request = async (options) => {
  const { url = config.baseUrl, method = 'post', data = {}, headers = {} } = options;

  const requestFn = () => axiosInstance({
    url,
    method,
    headers: {
      ...axiosInstance.defaults.headers,
      ...headers
    },
    data
  });

  try {
    const response = await retryRequest(requestFn, config.retryCount || 3);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`请求失败，状态码: ${response.status}`);
    }
  } catch (error) {
    // 更详细的错误处理
    if (error.code === 'ECONNRESET') {
      console.error('网络连接被重置，请检查网络连接');
    } else if (error.code === 'ETIMEDOUT') {
      console.error('请求超时，请检查网络连接或增加超时时间');
    } else if (error.code === 'ENOTFOUND') {
      console.error('无法解析域名，请检查网络连接');
    } else {
      console.error('请求出错:', error.message);
    }
    throw error;
  }
};

/**
 * 封装常用的 API 请求
 */
const api = {
  // 登录
  login: (account) => {
    return request({
      data: { j: JSON.stringify(config.login(account)) }
    });
  },

  // 注册
  register: (account, password, nickName) => {
    return request({
      data: { j: JSON.stringify(config.register(account, password, nickName)) }
    });
  },

  // 签到
  checkIn: (uid) => {
    return request({
      data: { j: JSON.stringify(config.checkIn(uid)) }
    });
  },

  // 福袋
  benefit: (uid) => {
    return request({
      data: { j: JSON.stringify(config.benefit(uid)) }
    });
  },
  // 低保
  glpz: (uid) => {
    return request({
      data: { j: JSON.stringify(config.glpz(uid)) }
    });
  }
};

export { request, api };