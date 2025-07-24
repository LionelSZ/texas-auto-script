import { api } from '../utils/request.js';
import { randomEmail, randomNickname, saveDataToJson } from '../utils/index.js';
const handleRegister = async () => {
  console.log(`正在注册账号...${randomEmail()}-${randomNickname()}`);
  const res = await api.register(randomEmail(), randomNickname());
  // const res = {
  //   e: 1,
  //   d: {
  //     uid: '7696625586052876',
  //     oid: '7696625586052876',
  //     lgc: '1',
  //     mbi: 'WN10-nifdge@hotmail.com',
  //     nm: 'EmilyJackson225',
  //     ac: '',
  //     hdtp: '0',
  //     hd: 'Local:h_31040.png',
  //     whd: null,
  //     uhd: null,
  //     vip: -1,
  //     vdy: '0',
  //     gfid: -1,
  //     s: '2',
  //     hm: '0',
  //     bv: '18000',
  //     rp: '0',
  //     sb: '0',
  //     lbs: '0',
  //     bhc: '255,255,255,255,255',
  //     rgl: '1',
  //     et: '',
  //     ws: 0,
  //     ls: 0,
  //     ds: 0,
  //     harr: '31040'
  //   },
  //   n: null,
  //   c: null
  // }
  const successList = []
  if (!res?.d?.uid) {
    console.log(`注册失败:${randomEmail()} 错误信息:${JSON.stringify(res)}`);
    // 切换ip地址
    // console.log('检测到注册失败，正在尝试切换IP地址...');
    // try {
    //   // 这里添加切换IP地址的逻辑
    //   // 例如可以调用VPN切换接口或其他代理服务
    //   console.log('IP地址已切换，准备重新尝试注册');
    // } catch (error) {
    //   console.error('切换IP地址失败:', error.message);
    // }
  } else {
    console.log(`注册成功:${randomEmail()}`);
    successList.push({
      uid: res.d.uid,
      email: randomEmail(),
      nickname: randomNickname(),
      registerTime: new Date().toLocaleString(),
    })
  }
  if (successList.length > 0) {
    const fileName = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}.json`;
    saveDataToJson(successList, fileName);
  }
}
export { handleRegister };







