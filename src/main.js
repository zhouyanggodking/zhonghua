import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import store from './store';
import router from './router';
// import axios from 'axios';

Vue.config.productionTip = false
Vue.use(ElementUI);

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