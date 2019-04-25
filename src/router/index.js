import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const homePage = resolve => require.ensure([], () => resolve(require('../components/views/HomePage.vue')), 'homePage');
const indexPage = resolve => require.ensure([], () => resolve(require('../components/views/IndexPage.vue')), 'indexPage');
// 地产承兑
const realEstateUpload = resolve => require.ensure([], () => resolve(require('../components/views/AcceptanceOfRealEstateProjects/RealEstateUpload.vue')), '文件上传');
const identifyResult = resolve => require.ensure([], () => resolve(require('../components/views/AcceptanceOfRealEstateProjects/IdentifyResult.vue')), '识别结果');
// 征信
const creditUpload = resolve => require.ensure([], () => resolve(require('../components/views/LetterOfAuthorizationForCreditInquiry/CreditUpload.vue')), '文件上传');
const creditReupload = resolve => require.ensure([], () => resolve(require('../components/views/LetterOfAuthorizationForCreditInquiry/CreditReupload.vue')), '文件补录');
const electronicBatchInformation = resolve => require.ensure([], () => resolve(require('../components/views/LetterOfAuthorizationForCreditInquiry/ElectronicBatchInformation.vue')), '电子版批次信息');
const paperBatchInformation = resolve => require.ensure([], () => resolve(require('../components/views/LetterOfAuthorizationForCreditInquiry/PaperBatchInformation.vue')), '纸质版批次信息');
// 用户管理
const userManagement = resolve => require.ensure([], () => resolve(require('../components/views/UserManagementPage.vue')), '纸质版批次信息');

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: homePage,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'index',
          name: 'index',
          component: indexPage,
        },
        // 地产承兑
        {
          path: 'realEstateUpload',
          name: '文件上传',
          component: realEstateUpload,
        },
        {
          path: 'realEstateIdentifyResult',
          name: '识别结果',
          component: identifyResult,
        },
        // 征信
        {
          path: 'creditUpload',
          name: '文件上传',
          component: creditUpload,
        },
        {
          path: 'creditReupload',
          name: '文件补录',
          component: creditReupload,
        },
        {
          path: 'creditElectronicBatchInformation',
          name: '电子版批次信息',
          component: electronicBatchInformation,
        },
        {
          path: 'creditPaperBatchInformation',
          name: '纸质版批次信息',
          component: paperBatchInformation,
        },
        {
          path: 'userManagement',
          name: '用户管理',
          component: userManagement,
        }
      ]
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.
//     if (!authService.isLoggedIn()) {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       });
//     } else {
//       // NProgress.start();
//       next();
//     }
//   } else {
//     // NProgress.start();
//     next(); // 确保一定要调用 next()
//   }
// });
// router.afterEach(() => {
//   NProgress.done();
// });

export default router;
