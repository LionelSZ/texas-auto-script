import { api } from '../utils/request.js';
import { getAccountsFromJson, showStatLog } from '../utils/index.js';
import { createBatchProcessor } from '../utils/batchProcessor.js';

const processor = createBatchProcessor({ delay: 200 });

const handleLogin = async () => {
  const accounts = getAccountsFromJson();
  console.log(`总共读取到 ${accounts.length} 个账号`);

  return await processor.processBatch(
    accounts,
    (account) => api.login(account.email),
    (response) => response?.d?.uid,
    '登录'
  );
};

export { handleLogin };
