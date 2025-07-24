import { showStatLog } from './logger.js';

/**
 * 批处理基础类 - 封装账号批量操作的通用逻辑
 */
export class BatchProcessor {
  constructor(options = {}) {
    this.delay = options.delay || 500; // 默认延迟500ms
    this.retryCount = options.retryCount || 1; // 默认重试1次
    this.showLogs = options.showLogs !== false; // 默认显示日志
  }

  /**
   * 批量处理账号
   * @param {Array} accounts - 账号数组
   * @param {Function} processor - 处理单个账号的函数
   * @param {Function} successChecker - 检查响应是否成功的函数
   * @param {string} operationName - 操作名称（用于日志）
   * @returns {Object} 处理结果统计
   */
  async processBatch(accounts, processor, successChecker, operationName = '操作') {
    const totalAccounts = accounts.length;
    const successCount = [];
    const failCount = [];

    for (let i = 0; i < totalAccounts; i++) {
      const account = accounts[i];
      
      try {
        if (!account?.uid) {
          this._logError(operationName, account.email, '缺少UID');
          failCount.push(account.email);
          continue;
        }

        const result = await this._processWithRetry(
          processor, 
          account, 
          successChecker, 
          operationName
        );

        if (result.success) {
          this._logSuccess(operationName, account.email);
          successCount.push(account.email);
        } else {
          this._logError(operationName, account.email, result.error);
          failCount.push(account.email);
        }

      } catch (error) {
        this._logException(operationName, account.email, error);
        failCount.push(account.email);
      }

      // 添加延迟，避免请求过于频繁
      if (i < totalAccounts - 1) {
        await this._delay();
      }
    }

    if (this.showLogs) {
      showStatLog(totalAccounts, successCount, failCount);
    }

    return {
      total: totalAccounts,
      success: successCount,
      fail: failCount,
      successRate: ((successCount.length / totalAccounts) * 100).toFixed(2)
    };
  }

  /**
   * 带重试的处理逻辑
   */
  async _processWithRetry(processor, account, successChecker, operationName) {
    let lastError = null;

    for (let attempt = 1; attempt <= this.retryCount; attempt++) {
      try {
        const response = await processor(account);
        
        if (successChecker(response)) {
          return { success: true, response };
        } else {
          lastError = `响应检查失败: ${JSON.stringify(response)}`;
        }
      } catch (error) {
        lastError = error.message;
        
        // 如果不是最后一次尝试，等待后重试
        if (attempt < this.retryCount) {
          await this._delay(200); // 重试前短暂延迟
        }
      }
    }

    return { success: false, error: lastError };
  }

  /**
   * 延迟函数
   */
  async _delay(ms = this.delay) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 日志输出方法
   */
  _logSuccess(operation, email) {
    if (this.showLogs) {
      console.log(`✅ ${operation}成功！用户: ${email}`);
    }
  }

  _logError(operation, email, error) {
    if (this.showLogs) {
      console.log(`❌ ${operation}失败：${email}, 错误信息: ${error}`);
    }
  }

  _logException(operation, email, error) {
    if (this.showLogs) {
      console.error(`❌ ${operation}异常：${email}`, error.message);
    }
  }
}

/**
 * 创建默认的批处理器实例
 */
export const createBatchProcessor = (options) => new BatchProcessor(options);