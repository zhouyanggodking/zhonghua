import env from './env'

// 生产环境
// const DEV_URL = 'http://10.7.86.27:8080/' //接口访问URL
// const PRO_URL = 'http://10.7.86.27:8080/'


// 测试环境
const DEV_URL = 'http://10.17.16.91:8080/' //接口访问URL
const PRO_URL = 'http://localhost:8080/'

// const DEV_URL = window.globalHosts.bds+'/'
// const PRO_URL = window.globalHosts.bds+'/'

// 王鹏的本地服务
// const DEV_URL = 'http://10.17.17.104:8080/' //接口访问URL
// const PRO_URL = 'http://10.17.17.104:8080/'

//本地地址
// const DEV_URL = 'http://10.17.17.189:8080/' //接口访问URL
// const PRO_URL = 'http://10.17.17.189:8080/'

export default env === 'development' ? DEV_URL : PRO_URL
