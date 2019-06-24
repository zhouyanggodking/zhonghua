const global_ = 'http://49.4.79.11:8666';
const global_upload = 'http://49.4.79.11:8181';
// const global_ = 'http://10.17.17.151:8080';
const DEPARTMENT_LIST = [
  {id: '', departmentName: '全部'},
  {id: 1, departmentName: '开发部'},
  {id: 2, departmentName: '测试部'},
  {id: 3, departmentName: '销售部'}
];
const CHECK_STATUS_LIST = [
  {id: '', name: '全部'},
  {id: 0, name: '驳回'},
  {id: 1, name: '已审核'},
  {id: 2, name: '未审核'},
];
const PROBLEM_LIST = [
  {id: 0, name: '无'},
  {id: 1, name: '缺少公章'},
  {id: 2, name: '公章与申请方名称不符'},
  {id: 3, name: '公章不清'},
  {id: 4, name: '缺少法人章'},
  {id: 5, name: '法人章与实际法人名称不符'},
  {id: 6, name: '法人章不清'},
  {id: 7, name: '授权书无签署日期'},
  {id: 8, name: '授权书已过期'},
  {id: 9, name: '其他'}
];
const INVOICE_TYPE = [
  {id: '01', name: '增值税专用发票'},
  {id: '04', name: '增值税普通发票'},
  {id: '10', name: '增值税普通发票(电子)'},
  {id: '11', name: '增值税普通发票(卷式)'}
]
export {
  global_,
  global_upload,
  DEPARTMENT_LIST,
  CHECK_STATUS_LIST,
  PROBLEM_LIST,
  INVOICE_TYPE
}