import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const homePage = resolve => require.ensure([], () => resolve(require('../components/views/HomePage.vue')), 'homePage');
const indexPage = resolve => require.ensure([], () => resolve(require('../components/views/IndexPage.vue')), 'indexPage');
// 登录
const loginPage = resolve => require.ensure([], () => resolve(require('../components/views/Login/LoginPage.vue')), 'loginPage');
// 地产承兑
const realEstateUpload = resolve => require.ensure([], () => resolve(require('../components/views/AcceptanceOfRealEstateProjects/RealEstateUpload.vue')), '文件上传');
const identifyResult = resolve => require.ensure([], () => resolve(require('../components/views/AcceptanceOfRealEstateProjects/IdentifyResult.vue')), '识别结果');
const identifyResultPage = resolve => require.ensure([], () => resolve(require('../components/views/IdentifyResultPage.vue')), '识别结果');
const identifyResultDetail = resolve => require.ensure([], () => resolve(require('../components/views/AcceptanceOfRealEstateProjects/IdentifyResultDetail.vue')), 'indentify-result-details');
const IdentifyInvoiceOrigin = resolve => require.ensure([], () => resolve(require('../components/views/AcceptanceOfRealEstateProjects/IdentifyInvoiceOrigin.vue')), 'identify-invoice-origin');
const IdentifyPaymentRequestOrigin = resolve => require.ensure([], () => resolve(require('../components/views/AcceptanceOfRealEstateProjects/IdentifyPaymentRequestOrigin.vue')), 'identify-payment-request-origin');
// 征信
const creditUpload = resolve => require.ensure([], () => resolve(require('../components/views/LetterOfAuthorizationForCreditInquiry/CreditUpload.vue')), '文件上传');
const creditReupload = resolve => require.ensure([], () => resolve(require('../components/views/LetterOfAuthorizationForCreditInquiry/CreditReupload.vue')), '文件补录');
const creditElectronicIdentifyResultPage = resolve => require.ensure([], () => resolve(require('../components/views/CreditElectronicIdentifyResultPage.vue')), '识别结果');
const electronicBatchInformation = resolve => require.ensure([], () => resolve(require('../components/views/LetterOfAuthorizationForCreditInquiry/ElectronicBatchInformation.vue')), '电子版批次信息');
const electronicBatchInformationDetails = resolve => require.ensure([], () => resolve(require('../components/views/LetterOfAuthorizationForCreditInquiry/ElectronicBatchInformationDetails.vue')), '电子版批次信息详情');
const elecBatchInfoIdentifyDetails = resolve => require.ensure([], () => resolve(require('../components/views/LetterOfAuthorizationForCreditInquiry/ElecBatchInfoIdentifyDetails.vue')), '电子版批次识别详情');
const lookOrigin = resolve => require.ensure([], () => resolve(require('../components/views/LetterOfAuthorizationForCreditInquiry/LookOrigin.vue')), '电子版批次识别详情');
const lookCompanyInfo = resolve => require.ensure([], () => resolve(require('../components/views/LetterOfAuthorizationForCreditInquiry/LookCompanyInfo.vue')), '电子版批次识别详情');
const paperBatchInformation = resolve => require.ensure([], () => resolve(require('../components/views/LetterOfAuthorizationForCreditInquiry/PaperBatchInformation.vue')), '纸质版批次信息');
const paperBatchIdentifyDetails = resolve => require.ensure([], () => resolve(require('../components/views/LetterOfAuthorizationForCreditInquiry/PaperBatchIdentifyDetails.vue')), '纸质版批次信息');
const paperBatchInformationDetails = resolve => require.ensure([], () => resolve(require('../components/views/LetterOfAuthorizationForCreditInquiry/PaperBatchInformationDetails.vue')), '纸质版批次信息');
// 用户管理
const userManagement = resolve => require.ensure([], () => resolve(require('../components/views/UserManagementPage.vue')), '纸质版批次信息');

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'loginName',
      component: loginPage
    },
    {
      path: '/',
      component: homePage,
      meta: { requiresAuth: true },
        // 地产承兑
      children: [
        {
          path: '',
          component: indexPage,
        },
        // 地产承兑
        {
          path: 'realEstateUpload',
          name: 'realEstateUpload',
          component: realEstateUpload,
        },
        {
          path: 'realEstateIdentifyResult',
          component: identifyResultPage,
          children: [
            {
              path: '/',
              name: 'realEstateIdentifyResult',
              component: identifyResult
            },
            {
              path: 'indentify-result-details',
              name: 'indentify-result-details',
              component: identifyResultDetail
            },
            {
              path:'identify-payment-request-origin',
              name:'identify-payment-request-origin',
              component:IdentifyPaymentRequestOrigin
            },
            {
              path:'identify-invoice-origin',
              name:'identify-invoice-origin',
              component:IdentifyInvoiceOrigin
            }
          ]
        },
        // 征信
        {
          path: 'creditUpload',
          name: 'creditUpload',
          component: creditUpload,
        },
        {
          path: 'creditReupload',
          name: 'creditReupload',
          component: creditReupload,
        },
        {
          path: 'creditElectronicBatchInformation',
          component: creditElectronicIdentifyResultPage,
          children: [
            {
              path: '/',
              name: 'creditElectronicBatchInformation',
              component: electronicBatchInformation,
            },
            {
              path:'electronicBatchInformationDetails',
              name:'credit-auth-elect-result-details',
              component:electronicBatchInformationDetails
            },
            {
              path:'elecBatchInfoIdentifyDetails',
              name:'elec-batch-info-identify-details',
              component:elecBatchInfoIdentifyDetails
            },
            {
              path:'lookOrigin',
              name:'look-origin',
              component:lookOrigin
            },
            {
              path:'look-company-info',
              name:'look-company-info',
              component:lookCompanyInfo
            },
            {
              path:'paperBatchInformationDetails',
              name:'paper-batch-information-details',
              component:paperBatchInformationDetails
            },
            {
              path:'paperBatchIdentifyDetails',
              name:'paper-batch-indentify-details',
              component:paperBatchIdentifyDetails
            }
          ]
        },
        {
          path: 'creditPaperBatchInformation',
          name: 'creditPaperBatchInformation',
          component: paperBatchInformation,
        },
        {
          path: 'userManagement',
          name: 'userManagement',
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