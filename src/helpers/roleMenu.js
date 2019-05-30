const totalMenu = [
  {
    name: '首页',
    index: '/',
    children: []
  },
  {
    name: '承兑业务单据',
    index: '2',
    children: []
  },
  {
    name: '地产项目承兑',
    index: 'realEstate',
    children: [
      {
        name: '文件上传',
        index: '/realEstateUpload',
        children: []
      },
      {
        name: '识别结果',
        index: '/realEstateIdentifyResult',
        children: []
      }
    ]
  },
  {
    name: '征信查询授权书',
    index: '/credit',
    children: [
      {
        name: '文件上传',
        index: '/creditUpload',
        children: []
      },
      {
        name: '文件补录',
        index: '/creditReupload',
        children: []
      },
      {
        name: '识别结果',
        index: '/creditIdentifyResult',
        children: [
          {
            name: '电子版批次信息',
            index: '/creditElectronicBatchInformation'
          },
          {
            name: '纸质版批次信息',
            index: '/creditPaperBatchInformation'
          }
        ]
      }
    ]
  },
  {
    name: '用户管理',
    index: '/userManagement',
    children: []
  },
];
export default totalMenu;