<template>
  <div class="usermanagement-page">
    <div class="usermanagement-page-search">
      <div class="search-conditions">
        <div class="search-box search-name">
          <div class="text">姓名</div>
          <el-input v-model="searchUsername"></el-input>
        </div>
        <div class="search-box search-phonenumber">
          <div class="text">手机号</div>
          <el-input v-model="searchPhoneNum"></el-input>
        </div>
        <div class="search-box search-department">
          <div class="text">部门</div>
          <el-select v-model="departmentDefault" placeholder="请选择">
            <el-option v-for="(item, index) in departmentList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </div>
        <div class="search-box search-options">
          <el-button class="search-btn" @click="search">查询</el-button>
          <div class="export-excel" @click="exportExcel">导出excel</div>
        </div>
        <div class="search-box search-authority">
          <div class="text">权限</div>
          <el-checkbox-group v-model="searchAuthority">
            <el-checkbox v-for="(item, index) in authorityList" :key="index" :label="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <div class="usermanagement-page-table">
      <div class="usermanagement-page-table_btn">
        <el-button class="btn" @click="addNewUser()">新增用户</el-button>
      </div>
      <div class="usermanagement-page-table_content">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column fixed type="index" label="序号" width="50px"></el-table-column>
          <el-table-column prop="username" label="姓名" width="80px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="phoneNum" label="手机号" width="115px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="department" label="部门" show-overflow-tooltip></el-table-column>
          <el-table-column prop="authority" label="权限" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createUser" label="创建人" width="80px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lastUpdateUser" label="变更人" width="80px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lastUpdateTime" label="修改时间" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="120" fixed="right">
            <template slot-scope="scope">
              <span class="option-btn" @click="freezeAccount(scope.$index, scope.row)">冻结</span>
              <span class="option-btn" @click="updateAccount(scope.$index, scope.row)">变更</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-footer">
        <Pagination @change="onUserPageNumChange" :totalCount="totalCount"></Pagination>
      </div>
    </div>
    <el-dialog class="dialog-form user-dialog" :title="dialogTitle" :visible.sync="isDialogVisible" :before-close="cancelEditFileds">
      <el-form :model="addUserform" :rules="rules" ref="addUserform">
        <el-form-item  label="姓名" :label-width="formLabelWidth" prop="username">
          <el-input :disabled="this.dialogTitle === '用户变更'" :class="{'update-account': this.dialogTitle === '用户变更'}" placeholder="请输入标准字段(必填)" v-model="addUserform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phoneNum">
          <el-input placeholder="请输入提取字段(必填)" v-model="addUserform.phoneNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth" prop="department">
          <el-select v-model="addUserform.department" placeholder="请选择">
            <el-option v-for="(item, index) in departmentList" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth" prop="authority">
          <el-checkbox-group v-model="addUserform.authority">
            <el-checkbox v-for="(item, index) in authorityList" :key="index" :label="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancle-btn" @click="cancelEditFileds">取消</el-button>
        <el-button class="submit-btn" type="primary" @click="handleSubmitClick(addUserform.index)">{{buttonTitle}}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="confirmDialogVisiable"
      :show-close="false"
      class="confirmDialog"
      width="520px"
      center>
      <div class="icon"></div>
      <div class="text">请确认是否冻结该用户</div>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancle-btn" @click="confirmDialogVisiable = false">取消</el-button>
        <el-button class="submit-btn" type="primary" @click="handleFreezeClick(addUserform.index)">冻结</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/common/Pagination";
//import {getUserList, addNewUserAccount, updateUserAccount, freezeUserAccount, exportUserToExcel} from "@/rest/userManagmentPageApi";

const PAGE_SIZE = 10;

export default {
  data() {
    return {
      //检索条件
      searchUsername: '',
      searchPhoneNum: '',
      //权限多选框
      authorityList:['地产承兑', '其他承兑', '贴现', '征信查询'],
      searchAuthority: [],
      //部门下拉框
      departmentList: ['全部', '财务公司信贷部','其他'],
      //部门下拉列表默认为空
      departmentDefault: "",
      isDialogVisible: false,
      confirmDialogVisiable: false,
      buttonTitle: "确定",
      currentPage: 1,
      totalCount: 0,
      pageSize: PAGE_SIZE,
      pageSizes: [PAGE_SIZE],
      tableData: [
        {
        username: '地产承兑',
        phoneNum: '19998333333',
        department: 'bumen',
        authority:["地产承兑",'其他承兑','贴现'],
        createUser: '王晓蓉',
        lastUpdateUser: '王晓蓉',
        lastUpdateTime: '2029-09-09 30:34:43'
        }
      ],
      excelData: [],
      //对话框表单数据
      addUserform: {
        id: "",
        username: '',
        phoneNum: '',
        department: '',
        authority: [],
        createUser: '',
        lastUpdateUser: '',
        lastUpdateTime: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入姓名(必填)', trigger: 'blur' }
        ],
        phoneNum: [
          { required: true, message: '请输入手机号(必填)', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请选择部门(必填)', trigger: 'blur' }
        ],
        authority: [
          { required: true, message: '请选择权限(必填)', trigger: 'blur' }
        ],
      },
      formLabelWidth: '100px',
      dialogTitle: '新增用户'
    };
  },
  methods: {
    //查询
    search() {
      //this.fetchUserCount();
    },
    //新增用户
    addNewUser() {
      this.isDialogVisible = true;
      this.dialogTitle = '新增用户';
      this.buttonTitle = '新增';
    },
    //变更用户
    updateAccount(index, row) {
      this.isDialogVisible = true;
      this.dialogTitle = '用户变更';
      this.buttonTitle = '变更';
      this.addUserform = {
        index: index,
        id: row.id,
        username: row.username,
        phoneNum: row.phoneNum,
        authority: row.authority,
        department: row.department
      }
    },
    //对话框: 确定按钮
    handleSubmitClick(index) {
      this.$refs.addUserform.validate((vaild) => {
        if (vaild) {
          const params = {
            //userId: localStorageHelper.getItem("USERNAME"), // 登陆者id
            username: this.addUserform.username,
            phoneNum: this.addUserform.phoneNum,
            department: this.addUserform.department,
            authority: this.addUserform.authority
          }
          if (this.dialogTitle === '用户变更'){
            this.selected = index; // 修改的位置
            this.$set(this.tableData, this.selected, this.addUserform);
            //待修改用户id表示
            params.push = {
              id: this.addUserform.id
            }
            // //后台修改
            // updateUserAccount(params)
            // .then((res) => {
            //   this.fetchUserCount(); //检索用户
            // })
          }else{
            //新增用户
            this.tableData.push(this.addUserform);
            // //后台插入
            // addNewUserField(params)
            // .then(() => {
            //   this.fetchUserCount(); //检索用户
            // })
          }
          //关闭并清空对话框中的表单
          this.clearAddUserform();
        }
      })
    },
    //对话框：取消按钮
    cancelEditFileds() {
      this.$refs['addUserform'].resetFields();
      this.clearAddUserform();
    },
    //关闭并清空对话框中的表单
    clearAddUserform() {
      this.isDialogVisible = false;
      this.addUserform = {
        username: '',
        phoneNum: '',
        authority: []
      }
    },
    //冻结用户
    freezeAccount() {
      this.confirmDialogVisiable = true;
    },
    handleFreezeClick() {
      // const params = {
      //   //userId: localStorageHelper.getItem("USERNAME"), //登陆者id
      //   id: index
      // }
      // freezeUserAccount(params)
      // .then((res) => {
      //   return res;
      // })
      this.confirmDialogVisiable = false;
    },
    //翻页
    onUserPageNumChange(res) {
      this.pageSize = res.pageSize;
      this.currentPage = res.pageNum;
      //this.fetchUserCount();
    },
    //获取用户列表
    fetchUserCount() { 
      // const params = {
      //   userName: this.searchUsername, //姓名
      //   phoneNum: this.searchPhoneNum, //手机号
      //   department: this.departmentDefault, //部门
      //   authority: this.searchAuthority, //权限
      //   pageSize: this.pageSize,
      //   pageNum: this.currentPage
      // }
      // getUserList(params)
      // .then((res) => {
      //   this.tableData = res.data.data; 
      //   this.totalCount = res.data.total;//数据的总条数
      // })
    },
    //导出excel
    exportExcel() {
      // const params = {
      //   username: this.username,
      //   phoneNum: this.phoneNum,
      //   department: this.department,
      //   authority: this.authority,
      //   fileName: ''
      // }
      // exportUserToExcel(params)
      // .then((res) => {
      //   this.excelData = res.data.data; 
      //   this.fetchUserCount();
      //   return;
      // })
    }
  },
  //初始化函数
  mounted() {
    //获取用户列表
    //this.fetchUserCount();
  },
  components: {
    Pagination
  }
};
</script>
<style lang="scss" scoped>
.usermanagement-page {
  .usermanagement-page-search {
    background: #fff;
    padding-bottom: 20px;
    .search-conditions {
      display: flex;
      flex-wrap: wrap;
      /deep/ {
        .el-input {
          .el-input__inner {
            width:160px;
            height: 40px;
          }
        }
      }
      .search-box {
        display: flex;
        margin-top: 20px;
        align-items: center;
        .text {
          width: 55px;
          margin-right: 10px;
          text-align: right;
          flex-shrink: 0;
          font-size: 14px;
          font-weight: bold;
          color: #666666;
        }
        &.search-options {
          .search-btn {
            margin-left: 20px;
            font-family: "PingFangSC-Semibold";
          }
          .export-excel {
            margin-left: 30px;
            font-weight: bold;
            font-size: 14px;
            color: #C1B071;
            cursor: pointer;
          }
        }
      }
    }
  }
  .usermanagement-page-table {
    margin-top: 20px;
    padding: 30px;
    background: #ffffff;
    .usermanagement-page-table_btn {
      .el-checkbox {
        margin-right: 13px;
      }
      .btn {
        font-family: "PingFangSC-Semibold";
      }
    }
    .usermanagement-page-table_content {
      margin-top: 20px;
      /deep/ .el-table {
        .el-table__fixed-header-wrapper {
          thead {
            th,
            tr {
              background: #fafafa !important;
            }
            th {
              border-color: rgba(48, 224, 142, 0.09);
              .cell {
                font-family: PingFangSC-Medium;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.85);
                line-height: 22px;
              }
            }
            th.is-leaf {
              border-bottom: 1px solid rgba(0, 0, 0, 0.09);
            }
          }
        }
        .el-table__fixed-right {
          th {
            text-align: center;
          }
        }
        .el-table__header-wrapper {
          .el-table__header {
            tr {
              border-radius: 4px 4px 0px 0px;
              background: #fafafa !important;
              th {
                background: #fafafa !important;
                border-color: rgba(0, 0, 0, 0.09);
                text-align: center;
                .cell {
                  font-family: PingFangSC-Medium;
                  font-size: 14px;
                  color: rgba(0, 0, 0, 0.85);
                  line-height: 22px;
                }
              }
            }
          }
        }
        
      }
      /deep/ .option-btn {
        width: 28px;
        height: 20px;
        margin: 0 10px;
        background: none;
        border: none;
        font-weight: normal;
        font-size: 14px;
        color: #4a90e2;
        cursor: pointer;
      }
      .el-button--mini,
      .el-button--mini.is-round {
        padding: 0;
      }
    }
    .table-footer {
      margin-top: 25px;
    }
  }
  .user-dialog {
    /deep/ {
      .el-input {
        &.update-account {
          .el-input__inner {
            background-color: #ffffff;
            color: #606266;
            border: none;
            cursor: default;
          }
        }
      }
      .el-select {
        width: 100%;
      }
    }
  }
}
/deep/ .el-button {
  width: 135px;
  background: #c1b071;
  border-radius: 4px;
  border-color: #c1b071;
  span {
    font-size: 14px;
    color: #ffffff;
  }
  &:hover {
    background-color: #e9d58b;
    border-color: #e9d58b;
  }
}
.el-button:active {
  border-color: #c1b071;
  color: #fff;
}
.btn {
  margin-right: 30px;
}
.el-button + .el-button {
  margin-left: 0;
}
/deep/ .el-table__fixed-right::before,
.el-table__fixed::before {
  display: none;
  height: 0;
}
</style>
