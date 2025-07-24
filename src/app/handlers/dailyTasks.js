import { api } from '../../utils/request.js';
// import { createBatchProcessor } from '../../core/batchProcessor.js';
import { createBatchProcessor } from '../../utils/batchProcessor.js';
import { showLineLog } from '../../utils/uiDisplay.js';

const processor = createBatchProcessor({ delay: 500 });

/**
 * 日常任务处理器
 */
export const handleDailyTasks = {
  /**
   * 签到任务
   */
  async checkIn(accounts) {
    for (let i = 0; i < 2; i++) {
      console.log(`正在第${i + 1}次签到`);
      await processor.processBatch(
        accounts,
        (account) => api.checkIn(account.uid),
        (response) => response?.e !== 10002,
        '签到'
      );
    }
  },

  /**
   * 福袋任务
   */
  async benefit(accounts) {
    for (let i = 0; i < 2; i++) {
      console.log(`正在第${i + 1}次福袋领取`);
      await processor.processBatch(
        accounts,
        (account) => api.benefit(account.uid),
        (response) => response?.d?.day,
        '福袋领取'
      );
    }
  },

  /**
   * 低保任务
   */
  async glpz(accounts) {
    for (let i = 0; i < 2; i++) {
      console.log(`正在第${i + 1}次低保领取`);
      await processor.processBatch(
        accounts,
        (account) => api.glpz(account.uid),
        (response) => response?.e !== '20013',
        '低保领取'
      );
    }
  },

  /**
   * 执行所有日常任务
   */
  async runAll(accounts) {
    showLineLog('开始签到');
    await this.checkIn(accounts);

    showLineLog('领取福袋');
    await this.benefit(accounts);

    showLineLog('领取低保');
    await this.glpz(accounts);
  }
};