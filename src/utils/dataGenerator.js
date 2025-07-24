/**
 * 随机数据生成工具
 */

const EMAIL_DOMAINS = [
  'gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com', 'aol.com',
  'icloud.com', 'zoho.com', 'yandex.com', 'protonmail.com', 'fastmail.com'
];

const FIRST_NAMES = [
  'John', 'Emma', 'Michael', 'Sophia', 'William', 'Olivia', 'James', 'Ava',
  'Alexander', 'Isabella', 'Daniel', 'Charlotte', 'Matthew', 'Amelia'
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Miller', 'Taylor',
  'Anderson', 'Thomas', 'Jackson', 'White', 'Harris'
];

/**
 * 生成随机邮箱
 * @returns {string} 随机邮箱地址
 */
export const generateRandomEmail = () => {
  const username = Math.random().toString(36).substring(2, 8);
  const domain = EMAIL_DOMAINS[Math.floor(Math.random() * EMAIL_DOMAINS.length)];
  return `${username}@${domain}`;
};

/**
 * 生成随机英文昵称
 * @returns {string} 随机昵称
 */
export const generateRandomNickname = () => {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const number = Math.floor(Math.random() * 1000);
  return `${firstName}${lastName}${number}`;
};

/**
 * 生成用户注册数据
 * @returns {Object} 包含邮箱和昵称的对象
 */
export const generateUserData = () => {
  return {
    email: generateRandomEmail(),
    nickname: generateRandomNickname()
  };
};