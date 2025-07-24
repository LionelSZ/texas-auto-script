import axios from 'axios';
import { config } from '../config/config.js';

/**
 * 封装 axios 请求
 * @param {Object} options - 请求配置项
 * @returns {Promise} - 返回请求的 Promise 对象
 */
const request = async (options) => {
  const { url = config.baseUrl, method = 'post', data = {}, headers = {} } = options;

  try {
    // console.log(data);
    const response = await axios({
      url,
      method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...headers
      },
      data,
      // timeout: 30000 // 30秒超时
    });

    // 统一处理响应
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`请求失败，状态码: ${response.status}`);
    }
  } catch (error) {
    console.error('请求出错:', error);
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
  }
};

export { request, api };
