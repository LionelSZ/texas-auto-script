
import { api } from '../utils/request.js';
import { createBatchProcessor } from '../utils/batchProcessor.js';

const processor = createBatchProcessor({ delay: 500 });

const glpz = async (accounts) => {
  return await processor.processBatch(
    accounts,
    (account) => api.glpz(account.uid),
    (response) => response?.e !== '20013',
    '低保领取'
  );
};

const handleGlpz = async (accounts) => {
  for (let i = 0; i < 2; i++) {
    console.log(`正在第${i + 1}次低保领取`);
    await glpz(accounts);
  }
};

export { handleGlpz };
