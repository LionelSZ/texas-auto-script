
import { api } from '../utils/request.js';
import { createBatchProcessor } from '../utils/batchProcessor.js';

const processor = createBatchProcessor({ delay: 500 });

const checkIn = async (accounts) => {
  return await processor.processBatch(
    accounts,
    (account) => api.checkIn(account.uid),
    (response) => response?.e !== 10002,
    '签到'
  );
};

const handleCheckIn = async (accounts) => {
  for (let i = 0; i < 2; i++) {
    console.log(`正在第${i + 1}次签到`);
    await checkIn(accounts);
  }
};

export { handleCheckIn };
