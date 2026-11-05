// Firebase 网页配置（Project settings → General → Your apps → SDK setup and configuration → Config）
// 这些值本来就会出现在网页里，不是密码。数据由登录 + firestore.rules 保护。
// 留空时，App 以「本地模式」运行（数据只存在这台设备）。
export default {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};
