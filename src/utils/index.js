
// 重新导出所有工具函数，保持向后兼容
export { generateRandomEmail as randomEmail, generateRandomNickname as randomNickname, generateUserData } from './dataGenerator.js';
export { saveDataToJson, getAccountsFromJson } from './fileManager.js';
export { showMenu, showLogo, showLineLog, showAboutInfo } from './uiDisplay.js';
export { showStatLog, showDetailedStats } from './logger.js';