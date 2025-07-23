const config = {
  baseUrl: 'http://54.152.176.249/texas/index.php',
  // 登录
  login: (account = 'lionel@gmail.com', psd = 'dc483e80a7a0bd9ef71d8cf973673924') => {
    return { "d": { "clag": "CN", "cver": "20160306", "acc": account, "psd": psd, "cpt": "Win10-Windows.Desktop" }, "i": "user_hylg", "k": "", "s": "" }
  },
  // 注册
  register: (account = 'lionel@gmail.com', psd = 'a123456', nickName = 'GGBoud') => {
    return { "d": { "clag": "CN", "cver": "20160306", "cpt": "Win10-Windows.Desktop", "acc": account, "nm": nickName, "psd": psd, "mid": `WN10-${nickName}@gamil.com`, "mnm": "Win10-Windows.Desktop" }, "i": "user_hyreg", "k": "", "s": "" }
  },
  // 签到
  signIn: (uid) => {
    return { "d": { "clag": "CN", "cver": "20160306", "uid": uid }, "i": "user_glpz", "k": "", "s": "" }
  },
  // 福袋
  benefit: (uid) => {
    return { "d": { "clag": "CN", "cver": "20160306", "uid": uid }, "i": "user_ggpz", "k": "", "s": "" }
  },
};
export default config;