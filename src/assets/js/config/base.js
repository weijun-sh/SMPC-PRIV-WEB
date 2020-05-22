const path = require('path').resolve('.')

let publicSet = {
  appURL: 'wss://smpcwallet.com',
  /**
   * @description 版本类型
   */
  env: 'dev',
  /**
   * @description 版本号
   */
  version: '0.1.0',
  /**
   * @description 区块节点请求地址
   */
  serverRPC: 'http://47.92.168.85:7117',
  /**
   * @description 通过地址查询外部交易历史
   */
  receiveAddrUrl: 'http://5.189.139.168:5000/',
  /**
   * @description 数据请求时间间隔
   */
  refreshDataTime: 15, // page refersh time
  /**
   * @description 页面title设置
   */
  title: 'SMPC Wallet',
  /**
   * @description 项目所属
   */
  AppName: 'SMPC Wallet',
  /**
   * @description copyRight
   */
  copyRight: '',
  /**
   * @description 超时时间
   */
  timeout: 1000 * 60 * 10,
  /**
   * @description Cookie key
   */
  cookies: {
    token: 'token',
    address: 'address',
    accountType: 'accountType',
    eNodeTx: 'eNodeTx'
  },
  /**
   * @description 启动gdcrm路径
   */
  gDcrm: path + '/gdcrm.exe',
  /**
   * @description 启动gdcrm路径
   */
  rawTx: {
    to: '0x00000000000000000000000000000000000000dc',
    gasLimit: 80000,
    gasPrice: 100000,
  },
  /**
   * @description 初始模式设置
   */
  modeInit: '1', // '0': 共管模式；'1'：个人模式
  /**
   * @description 日夜模式设置
   */
  dayAndNight: '1', // '0': 夜晚； '1': 白天
  /**
   * @description 默认组模式
   */
  initGroupMode: '5/5',
  /**
   * @description 账户开关
   */
  accountSwitch: {
    person: 1,
    group: 1
  },
  /**
   * @description 账户开关
   */
  networkMode: 1, // '0': 离线； '1': 在线
  // networkMode: 0, // '0': 离线； '1': 在线
  /**
   * @description 是否打开邮箱验证
   */
  isOpenEmail: 1, // '0': 否； '1': 是
}

// publicSet.appURL = 'http://smpcwallet.com'
// publicSet.appURL = 'http://smpcwallet.com:8300'
// publicSet.appURL = 'http://47.56.150.104:8300'
// publicSet.appURL = 'http://139.196.26.212:8300'
// publicSet.appURL = 'http://localhost:8300'
publicSet.appURL = 'wss://api.smpcwallet.com/'
// module.exports = publicSet
export default publicSet
