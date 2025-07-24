
import { api } from '../utils/request.js';
import { createBatchProcessor } from '../utils/batchProcessor.js';

const processor = createBatchProcessor({ delay: 500 });

const benefit = async (accounts) => {
  return await processor.processBatch(
    accounts,
    (account) => api.benefit(account.uid),
    (response) => response?.d?.day,
    '福袋领取'
  );
};

const handleBenefit = async (accounts) => {
  for (let i = 0; i < 2; i++) {
    console.log(`正在第${i + 1}次福袋领取`);
    await benefit(accounts);
  }
};

export { handleBenefit };
