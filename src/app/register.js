import { api } from '../utils/request.js';
import { generateUserData, saveDataToJson } from '../utils/index.js';

const handleRegister = async () => {
  const userData = generateUserData(); // 生成一次，避免重复调用

  console.log(`正在注册账号...${userData.email}-${userData.nickname}`);

  try {
    const res = await api.register(userData.email, userData.nickname);
    const successList = [];

    if (!res?.d?.uid) {
      console.log(`注册失败:${userData.email} 错误信息:${JSON.stringify(res)}`);
    } else {
      console.log(`注册成功:${userData.email}`);
      successList.push({
        uid: res.d.uid,
        email: userData.email,
        nickname: userData.nickname,
        registerTime: new Date().toLocaleString(),
      });

      // 保存成功的注册数据
      if (successList.length > 0) {
        const fileName = `register-${new Date().toISOString().slice(0, 10)}`;
        saveDataToJson(successList, fileName);
      }
    }
  } catch (error) {
    console.error(`注册异常:${userData.email}`, error.message);
  }
};

export { handleRegister };
