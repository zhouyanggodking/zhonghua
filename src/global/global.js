// const global_ = 'http://10.17.16.91:8080'
const global_ = 'http://10.17.17.151:8080';
const USERID = 1;
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
]
export {
  global_,
  USERID,
  DEPARTMENT_LIST,
  CHECK_STATUS_LIST,
  PROBLEM_LIST
}