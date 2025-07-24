/**
 * API 配置文件
 * 支持环境变量覆盖默认配置
 */

// 从环境变量获取配置，提供默认值
const CONFIG = {
  // 服务器配置
  SERVER: {
    BASE_URL: process.env.TEXAS_API_BASE_URL || 'http://54.152.176.249/texas/index.php',
    TIMEOUT: parseInt(process.env.TEXAS_API_TIMEOUT) || 30000,
    RETRY_COUNT: parseInt(process.env.TEXAS_API_RETRY_COUNT) || 3
  },

  // 默认用户配置
  DEFAULT_USER: {
    PASSWORD_HASH: process.env.TEXAS_DEFAULT_PASSWORD || 'dc483e80a7a0bd9ef71d8cf973673924',
    CLIENT_PLATFORM: process.env.TEXAS_CLIENT_PLATFORM || 'Win10-Windows.Desktop',
    CLIENT_VERSION: process.env.TEXAS_CLIENT_VERSION || '20160306',
    COUNTRY_CODE: process.env.TEXAS_COUNTRY_CODE || 'CN'
  },

  // 业务配置
  BUSINESS: {
    BENEFIT_COUNT: parseInt(process.env.TEXAS_BENEFIT_COUNT) || 2,
    REQUEST_DELAY: parseInt(process.env.TEXAS_REQUEST_DELAY) || 500
  }
};

/**
 * 创建请求数据的工厂函数
 */
const createRequestData = (interfaceName, data = {}) => {
  const baseData = {
    clag: CONFIG.DEFAULT_USER.COUNTRY_CODE,
    cver: CONFIG.DEFAULT_USER.CLIENT_VERSION,
    cpt: CONFIG.DEFAULT_USER.CLIENT_PLATFORM,
    ...data
  };

  return {
    d: baseData,
    i: interfaceName,
    k: "",
    s: ""
  };
};

/**
 * API 接口配置
 */
export const apiConfig = {
  baseUrl: CONFIG.SERVER.BASE_URL,
  timeout: CONFIG.SERVER.TIMEOUT,
  retryCount: CONFIG.SERVER.RETRY_COUNT,

  // 登录接口
  login: (account, password = CONFIG.DEFAULT_USER.PASSWORD_HASH) => {
    return createRequestData('user_hylg', {
      acc: account,
      psd: password
    });
  },

  // 注册接口
  register: (account, nickName, password = CONFIG.DEFAULT_USER.PASSWORD_HASH) => {
    return createRequestData('user_hyreg', {
      acc: account,
      nm: nickName,
      psd: password,
      mid: `WN10-${account}`,
      mnm: CONFIG.DEFAULT_USER.CLIENT_PLATFORM
    });
  },

  // 签到接口
  checkIn: (uid) => {
    return createRequestData('user_gmby', { uid });
  },

  // 低保接口
  glpz: (uid) => {
    return createRequestData('user_glpz', { uid });
  },

  // 福袋接口
  benefit: (uid, count = CONFIG.BUSINESS.BENEFIT_COUNT) => {
    return createRequestData('user_ggpz', { uid, count });
  }
};

/**
 * 配置验证函数
 */
export const validateConfig = () => {
  const errors = [];

  if (!CONFIG.SERVER.BASE_URL) {
    errors.push('BASE_URL 不能为空');
  }

  if (CONFIG.SERVER.TIMEOUT < 1000) {
    errors.push('TIMEOUT 不能小于1000ms');
  }

  if (CONFIG.BUSINESS.BENEFIT_COUNT < 1) {
    errors.push('BENEFIT_COUNT 必须大于0');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// 导出配置对象（保持向后兼容）
export const config = apiConfig; 
