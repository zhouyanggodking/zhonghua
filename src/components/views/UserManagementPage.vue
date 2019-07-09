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
          <el-select v-model="searchDepartment" placeholder="请选择">
            <el-option v-for="item in departmentList" :key="item.id" :value="item.id" :label="item.departmentName"></el-option>
          </el-select>
        </div>
        <div class="search-box search-options">
          <el-button class="search-btn" @click="search">查询</el-button>
          <div class="export-excel" @click="exportExcel">导出Excel</div>
        </div>
        <div class="search-box search-authority">
          <div class="text">权限</div>
          <el-checkbox-group v-model="searchAuthority">
            <el-checkbox v-for="item in authorityList" :key="item.id" :label="item.id">{{item.authorityName}}</el-checkbox>
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
          <el-table-column prop="telephone" label="手机号" width="115px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="deptName" label="部门" show-overflow-tooltip></el-table-column>
          <el-table-column prop="authorityName" label="权限" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createUser" label="创建人" width="80px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="changeUser" label="变更人" width="80px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="changeTime" label="修改时间" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="120" fixed="right">
            <template slot-scope="scope">
              <span class="option-btn" @click="freezeAccount(scope.$index, scope.row)" v-if="scope.row.status =='1'">冻结</span>
              <span class="option-btn" @click="unfreezeAccount(scope.$index, scope.row)" v-if="scope.row.status =='0'">解冻</span>
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
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="username">
          <el-input :disabled="this.dialogTitle === '用户变更'" :class="{'update-account': this.dialogTitle === '用户变更'}" placeholder="请输入姓名(必填)" v-model="addUserform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="telephone">
          <el-input placeholder="请输入手机号(必填)" v-model="addUserform.telephone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth" prop="department">
          <el-select v-model="addUserform.department" placeholder="请选择">
            <el-option v-for="item in departmentList.filter(item =>item.id!='')" :key="item.id" :value="item.id" :label="item.departmentName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth" prop="authority">
          <el-checkbox-group v-model="addUserform.authority">
            <el-checkbox v-for="item in authorityList" :key="item.id" :label="item.id">{{item.authorityName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancle-btn" @click="cancelEditFileds">取消</el-button>
        <el-button class="submit-btn" type="primary" @click="handleSubmitClick">{{addButtonTitle}}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="confirmDialogVisiable"
      :show-close="false"
      class="confirmDialog"
      width="520px"
      center>
      <div class="icon"></div>
      <div class="text"> 请确认是否{{freezeButtonTitle}}该用户</div>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancle-btn" @click="confirmDialogVisiable = false">取消</el-button>
        <el-button class="submit-btn" type="primary" @click="handleFreezeClick">{{freezeButtonTitle}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/common/Pagination";
import { getUserList, addNewUserAccount, updateUserAccount, freezeUserAccount } from "@/rest/userManagmentPageApi";
import {global_upload} from '@/global/global';
// import localStorageHelper from '@/helpers/localStorageHelper';

const PAGE_SIZE = 10;

export default {
  data() {
    const phoneReg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
    const phoneMatch = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号码'));
      } else {
        if (!value.match(phoneReg)) {
          callback(new Error('请输入正确手机号码'));
        } else {
          callback();
        }
      }
    };
    return {
      loginUserId: localStorage.getItem('USERID'), 
      searchUsername: '',
      searchPhoneNum: '',
      searchAuthority: [],
      searchDepartment: '',
      authorityList: [
        { id: 1, authorityName: '地产承兑' },
        { id: 2, authorityName: '其他承兑' },
        { id: 3, authorityName: '贴现' },
        { id: 4, authorityName: '征信查询' },
      ],
      departmentList: [
        { id: 1, departmentName: '全部' },
        { id: 2, departmentName: '财务公司信贷部' },
        { id: 3, departmentName: '其他' }
      ],
      isDialogVisible: false,
      confirmDialogVisiable: false,
      addButtonTitle: "确定",
      freezeButtonTitle: "冻结",
      freezeUserId: null,
      currentPage: 1,
      totalCount: 0,
      pageSize: PAGE_SIZE,
      pageSizes: [PAGE_SIZE],
      tableData: [],
      addUserform: {
        id: "",
        username: '',
        telephone: '',
        department: '',
        authority: []
      },
      rules: {
        username: [
          { required: true, message: '请输入姓名(必填)', trigger: 'blur' },
          { min: 1, max: 10, message: '请输入10位以内字符', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入手机号(必填)', trigger: 'blur' },
          { validator: phoneMatch, trigger: 'blur' }
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
    search() {
      this.currentPage = 1;
      this.fetchUserCount();
    },
    addNewUser() {
      this.isDialogVisible = true;
      this.dialogTitle = '新增用户';
      this.addButtonTitle = '新增';
    },
    updateAccount(index, row) {
      this.isDialogVisible = true;
      this.dialogTitle = '用户变更';
      this.addButtonTitle = '变更';
      this.addUserform = {
        id: row.id,
        username: row.username,
        telephone: row.telephone,
        authority: row.authorityId,
        department: row.deptId
      }
    },
    handleSubmitClick() {
      this.$refs.addUserform.validate((vaild) => {
        if (vaild) {
          const params = {
            loginUserId: this.loginUserId,
            username: this.addUserform.username,
            telephone: this.addUserform.telephone,
            deptId: this.addUserform.department,
            aclId: this.addUserform.authority
          }
          if (this.dialogTitle === '用户变更') {
            params.id = this.addUserform.id;
            updateUserAccount(params)
            .then((flag) => {
              if (flag) {
                this.$message({
                  message: '用户变更成功!',
                  type: 'success'
                })
                this.fetchUserCount();
                this.clearAddUserform();
              } else {
                this.$message({
                  message: '手机号码已存在!',
                  type: 'error'
                })
              }
            })
          } else {
            addNewUserAccount(params)
            .then((res) => {
              if (res) {
                this.$message({
                  message: '用户增加成功!',
                  type: 'success'
                })
                this.fetchUserCount();
                this.clearAddUserform();
              } else {
                this.$message({
                  message: '手机号码已存在!',
                  type: 'error'
                })
              }
           })
          }
        }
      })
    },
    // 取消
    cancelEditFileds() {
      this.$refs['addUserform'].resetFields();
      this.clearAddUserform();
    },
    clearAddUserform() {
      this.isDialogVisible = false;
      this.addUserform = {
        id: '',
        username: '',
        telephone: '',
        authority: []
      }
    },
    freezeAccount(index, row) {
      this.confirmDialogVisiable = true;
      this.freezeUserId = row.id;
      this.freezeButtonTitle = '冻结';
    },
    unfreezeAccount(index, row) {
      this.confirmDialogVisiable = true;
      this.freezeUserId = row.id;
      this.freezeButtonTitle = '解冻';
    },
    handleFreezeClick() { 
      const params = {
        loginUserId: this.loginUserId,
        id: this.freezeUserId
      }
      if (this.freezeButtonTitle == '冻结') {
        params.status = 0; // 冻结
      } else {
        params.status = 1; // 解冻
      }
      freezeUserAccount(params)
      .then(() => {
        this.$message({
          message: '用户' + this.freezeButtonTitle + '成功!',
          type: 'success'
        })
        this.fetchUserCount();
      })
      this.confirmDialogVisiable = false;
    },
    // 翻页
    onUserPageNumChange(res) {
      this.pageSize = res.pageSize;
      this.currentPage = res.pageNum;
      this.fetchUserCount();
    },
    // 获取用户列表
    fetchUserCount() { 
      const params = {
        username: this.searchUsername, //姓名
        telephone: this.searchPhoneNum, //手机号
        deptId: this.searchDepartment, //部门
        aclId: this.searchAuthority, //权限
        pageSize: this.pageSize,
        pageNum: this.currentPage
      }
      getUserList(params)
      .then((res) => {
        res.data.forEach((data) => {
          let authorityIdTemp = new Array()
          let authorityNameTemp = new Array()
           data.sysOcrAcls.forEach((deptdata) => {
            authorityIdTemp.push(deptdata.id);
            authorityNameTemp.push(deptdata.aclName);
           })
          data.authorityId = authorityIdTemp;
          data.authorityName  =  authorityNameTemp.join('，');
        })
        this.tableData = res.data; 
        this.totalCount = res.total;
      })
    },
    // 导出excel
    exportExcel() {
      const params = {
        username: this.searchUsername, //姓名
        telephone: this.searchPhoneNum, //手机号
        deptId: this.searchDepartment, //部门
        aclId: this.searchAuthority, //权限
        titles: '表头',
        name: '名字'
      }
      window.open(`${global_upload}/sys/ocr/getUserExcel?username=${params.username}&telephone=${params.telephone}&deptId=${params.deptId}&aclId=${params.aclId}`,'_parent')
    }
  },
  mounted() {
    this.fetchUserCount();
  },
  components: {
    Pagination
  }
};
</script>
<style lang="scss" scoped>
@import '@/scss/mixin.scss';

.usermanagement-page {
  display: -webkit-box;
  flex: 1;
  flex-direction: column;
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
            @include buttonStyle;
          }
          .export-excel {
            margin-left: 30px;
            font-weight: normal;
            font-size: 14px;
            color: #4A90E2;
            cursor: pointer;
          }
        }
      }
    }
  }
  .usermanagement-page-table {
    flex: 1;
    margin-top: 20px;
    padding: 30px;
    background: #ffffff;
    .usermanagement-page-table_btn {
      .el-checkbox {
        margin-right: 13px;
      }
      .btn {
        @include buttonStyle;
      }
    }
    .usermanagement-page-table_content {
      margin-top: 20px;
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
/deep/ .el-table__fixed-right::before,
.el-table__fixed::before {
  display: none;
  height: 0;
}
</style>
