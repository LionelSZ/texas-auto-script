/**
 * 多语言配置文件
 */

export const SUPPORTED_LANGUAGES = ['zh', 'en'];

export const MENU_FUNCTIONS = [
  {
    id: 'register',
    zh: '批量注册',
    en: 'Batch Registration',
    command: '1',
    description: {
      zh: '批量注册新的游戏账号，可自定义数量',
      en: 'Register new game accounts in batch with custom quantity'
    }
  },
  {
    id: 'login',
    zh: '验证登录',
    en: 'Verify Login',
    command: '2',
    description: {
      zh: '验证现有账号的登录状态',
      en: 'Verify login status of existing accounts'
    }
  },
  {
    id: 'checkin',
    zh: '签到奖励',
    en: 'Check-in Rewards',
    command: '3',
    description: {
      zh: '领取每日签到奖励',
      en: 'Claim daily check-in rewards'
    }
  },
  {
    id: 'benefit',
    zh: '领取福袋',
    en: 'Lucky Bag',
    command: '4',
    description: {
      zh: '领取游戏福袋奖励',
      en: 'Claim lucky bag rewards'
    }
  },
  {
    id: 'glpz',
    zh: '领取低保',
    en: 'Welfare Benefits',
    command: '5',
    description: {
      zh: '领取低保福利',
      en: 'Claim welfare benefits'
    }
  },
  {
    id: 'all_tasks',
    zh: '(签到+福袋+低保)',
    en: 'All Daily Tasks',
    command: '6',
    description: {
      zh: '一键完成所有日常任务',
      en: 'Complete all daily tasks at once'
    }
  },
  {
    id: 'about',
    zh: '关于我们',
    en: 'About',
    command: '7',
    description: {
      zh: '显示应用程序信息',
      en: 'Show application information'
    }
  },
  {
    id: 'exit',
    zh: '退出程序',
    en: 'Exit',
    command: '0',
    description: {
      zh: '退出应用程序',
      en: 'Exit the application'
    }
  }
];

// 保持向后兼容
export const functions = MENU_FUNCTIONS;

/**
 * 获取指定语言的菜单项
 */
export const getMenuItems = (language = 'zh') => {
  return MENU_FUNCTIONS.map(item => ({
    command: item.command,
    text: item[language] || item.zh,
    description: item.description[language] || item.description.zh
  }));
};
