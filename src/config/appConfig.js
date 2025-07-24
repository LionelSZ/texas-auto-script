/**
 * 应用程序配置文件
 */

export const appConfig = {
  // 应用信息
  APP_INFO: {
    NAME: process.env.TEXAS_APP_NAME || 'Texas Poker CLI',
    VERSION: process.env.TEXAS_APP_VERSION || '1.0.0',
    AUTHOR: process.env.TEXAS_APP_AUTHOR || 'Lionelsz',
    EMAIL: process.env.TEXAS_APP_EMAIL || 'gsuzher@gmail.com',
    GITHUB: process.env.TEXAS_APP_GITHUB || 'https://github.com/LionelSZ',
    PROJECT_URL: 'https://github.com/LionelSZ/texas-auto-script'
  },

  // 文件路径配置
  PATHS: {
    OUTPUT_DIR: process.env.TEXAS_OUTPUT_DIR || './data/accounts',
    LOG_DIR: process.env.TEXAS_LOG_DIR || './logs',
    CONFIG_DIR: './src/config',
    EXPORT_DIR: process.env.TEXAS_EXPORT_DIR || './data/exports',
    BACKUP_DIR: process.env.TEXAS_BACKUP_DIR || './backups'
  },

  // 用户界面配置
  UI: {
    CLEAR_CONSOLE_ON_START: process.env.TEXAS_UI_CLEAR_CONSOLE === 'true',
    SHOW_LOGO: process.env.TEXAS_UI_SHOW_LOGO !== 'false',
    ENABLE_COLORS: process.env.TEXAS_UI_ENABLE_COLORS !== 'false',
    MENU_COLUMNS: parseInt(process.env.TEXAS_UI_MENU_COLUMNS) || 2
  },

  // 操作配置
  OPERATIONS: {
    DEFAULT_RETRY_COUNT: parseInt(process.env.TEXAS_DEFAULT_RETRY_COUNT) || 2,
    MAX_CONCURRENT_REQUESTS: parseInt(process.env.TEXAS_MAX_CONCURRENT_REQUESTS) || 5,
    ENABLE_PROGRESS_BAR: process.env.TEXAS_ENABLE_PROGRESS_BAR === 'true'
  },

  // 日志配置
  LOGGING: {
    LEVEL: process.env.TEXAS_LOG_LEVEL || 'info',
    TO_FILE: process.env.TEXAS_LOG_TO_FILE === 'true',
    MAX_SIZE: parseInt(process.env.TEXAS_LOG_MAX_SIZE) || 10,
    MAX_FILES: parseInt(process.env.TEXAS_LOG_MAX_FILES) || 5
  },

  // 性能配置
  PERFORMANCE: {
    MEMORY_LIMIT: parseInt(process.env.TEXAS_MEMORY_LIMIT) || 512,
    MAX_FILE_SIZE: parseInt(process.env.TEXAS_MAX_FILE_SIZE) || 100,
    CACHE_TTL: parseInt(process.env.TEXAS_CACHE_TTL) || 3600
  },

  // 备份配置
  BACKUP: {
    AUTO_BACKUP: process.env.TEXAS_AUTO_BACKUP === 'true',
    INTERVAL: parseInt(process.env.TEXAS_BACKUP_INTERVAL) || 24,
    RETENTION_DAYS: parseInt(process.env.TEXAS_BACKUP_RETENTION_DAYS) || 7
  }
};
