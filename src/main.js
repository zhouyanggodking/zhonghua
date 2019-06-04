import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
import App from './App.vue';
import store from './store';
import router from './router';
import uploader from '@/components/uploader';
import './main.scss';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Viewer);
Vue.use(uploader)

// axios.defaults.baseURL = 'http://49.4.79.11:8181';
axios.defaults.baseURL = 'http://10.17.16.204:8080';
// axios.defaults.baseURL = 'http://10.17.20.121:8080';

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

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});