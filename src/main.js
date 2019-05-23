import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
import App from './App.vue';
import store from './store';
import router from './router';
// import uploader from 'vue-simple-uploader';
import uploader from '@/components/uploader';
import './main.scss';
// import axios from 'axios';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Viewer);
Vue.use(uploader)

// axios.defaults.baseURL = 'http://49.4.79.11:8181';
// axios.defaults.baseURL = 'http://10.145.6.121:8080';

// axios.interceptors.request.use(config => {
//   if (config.url.indexOf('/api/login') === -1) {
//     const authToken = authService.getAuthToken();
//     if (authToken) {
//       config.headers.Authorization = authToken;
//     }
//   }
//   return config;
// });

// axios.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     if (error.response.status === 401) {
//       const currentUrl = router.currentRoute.fullPath;
//       if (currentUrl.indexOf('/login') === -1) {
//         router.push({
//           path: '/login',
//           query: {
//             redirect: currentUrl
//           }
//         });
//       }
//     }
//     return Promise.reject(error);
//   }
// );
// Viewer.setDefaults({
//   'inline':true,
//   'button':false, //右上角按钮
//   "navbar": false, //底部缩略图
//   "title": false, //当前图片标题
//   "toolbar": false, //底部工具栏
//   "tooltip": true, //显示缩放百分比
//   "movable": true, //是否可以移动
//   "zoomable": true, //是否可以缩放
//   "rotatable": true, //是否可旋转
//   "scalable": true, //是否可翻转
//   "transition": true, //使用 CSS3 过度
//   "fullscreen": false, //播放时是否全屏
//   "keyboard": true, //是否支持键盘
//   "url": "data-source",
// });

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});