<template>
  <div class="usermanagement-page">
    <div class="usermanagement-page-search">
      <div class="search-conditions">
        <div class="search-box search-name">
          <div class="text">姓名</div>
          <el-input></el-input>
        </div>
        <div class="search-box search-phonenumber">
          <div class="text">手机号</div>
          <el-input></el-input>
        </div>
        <div class="search-box search-department">
          <div class="text">部门</div>
          <el-select v-model="reviewStatus" placeholder="请选择">
            <el-option v-for="item in reviewStatusList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </div>
        <div class="search-box search-authority">
          <div class="text">权限</div>
          <el-checkbox-group v-model="selectedAuthority">
            <el-checkbox v-for="(item, index) in checkList" :key="index" :label="item"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="search-box search-options">
          <div class="text"></div>
          <el-button>查询</el-button>
          <div class="export-excle">导出excle</div>
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
          @selection-change="handleSelectionChange"
        >
          <el-table-column fixed width="30"></el-table-column>
          <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
          <el-table-column label="付款主题" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="序号" width="120"></el-table-column>
          <el-table-column prop="address" label="姓名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="手机号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="部门" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="权限" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="创建人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="变更人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="修改时间" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="120" fixed="right">
            <template slot-scope="scope">
              <span class="option-btn" @click="freezeAccount(scope.$index, scope.row)">冻结</span>
              <span class="option-btn" @click="updateAccount(scope.$index, scope.row)">变更</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-footer">
        <Pagination></Pagination>
      </div>
    </div>
    <el-dialog class="dialog-form user-dialog" :title="dialogTitle" :visible.sync="isDialogVisible">
      <el-form :model="addUserform" :rules="rules" ref="addUserform">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input :disabled="this.dialogTitle === '用户变更'" :class="{'update-account': this.dialogTitle === '用户变更'}" placeholder="请输入标准字段(必填)" v-model="addUserform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phoneNum">
          <el-input placeholder="请输入提取字段(必填)" v-model="addUserform.phoneNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth" prop="department">
          <el-select v-model="addUserform.department" placeholder="请选择">
            <el-option v-for="item in reviewStatusList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth" prop="authority">
          <el-checkbox-group v-model="addUserform.authority">
            <el-checkbox v-for="(item, index) in checkList" :key="index" :label="item"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancle-btn" @click="isDialogVisible = false">取 消</el-button>
        <el-button class="submit-btn" type="primary" @click="handleSubmitClick('sureBtn')">确 定</el-button>
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
        <el-button class="cancle-btn" @click="confirmDialogVisiable = false">取 消</el-button>
        <el-button class="submit-btn" type="primary" @click="handleFreezeClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/common/Pagination";

const PAGE_SIZE = 10;

export default {
  data() {
    return {
      checkList: ['地产承兑', '其他承兑', '贴现', '征信查询'],
      selectedAuthority: [],
      isDialogVisible: false,
      confirmDialogVisiable: false,
      reviewStatus: "全部",
      multipleSelection: [],
      currentPage: 1,
      totalCount: 0,
      pageSize: PAGE_SIZE,
      pageSizes: [PAGE_SIZE],
      reviewStatusList: ["全部", "未审核", "已审核", "审核中"],
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      addUserform: {
        name: '',
        phoneNum: '',
        department: '',
        authority: []
      },
      rules: {
        name: [
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
    search() {},
    batchReview() {
      this.isDialogVisible = true;
      this.dialogHintText = "请确认是否批量通过";
      this.dialogHintOperate = "批量通过";
    },
    addNewUser() {
      this.isDialogVisible = true;
      this.dialogTitle = '新增用户'
    },
    handleSubmitClick() {

    },
    freezeAccount() {
      this.confirmDialogVisiable = true;
    },
    handleFreezeClick() {
      this.confirmDialogVisiable = false;
    },
    updateAccount() {
      this.isDialogVisible = true;
      this.dialogTitle = '用户变更';
    },
    batchReviewPass() {},
    tableItemDetails() {
      // this.$router.push({ name: "indentify-result-details", query: { id: 1 } });
    },
    exportExcel() {},
    reviewPass() {
      this.isDialogVisible = false;
    },
    rejectOpinion() {
      this.isDialogVisible = false;
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
    },
    handleCurrentChange(currPage) {
      this.currentPage = currPage;
    }
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
    margin-top: 20px;
    padding-bottom: 30px;
    .search-conditions {
      display: flex;
      flex-wrap: wrap;
      /deep/ {
        .el-input {
          .el-input__inner {
            width: 200px;
            height: 40px;
          }
        }
      }
      .search-box {
        display: flex;
        margin-top: 20px;
        align-items: center;
        .text {
          width: 60px;
          margin-right: 10px;
          text-align: right;
          flex-shrink: 0;
          font-size: 14px;
          font-weight: bold;
          color: #666666;
        }
        &.search-options {
          .export-excle {
            margin-left: 30px;
            font-weight: bold;
            font-size: 14px;
            color: #C1B071;
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
              border-color: rgba(0, 0, 0, 0.09);
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
        .el-table__fixed-body-wrapper {
          .el-table__body {
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
                .cell {
                  font-family: PingFangSC-Medium;
                  font-size: 14px;
                  color: rgba(0, 0, 0, 0.85);
                  line-height: 22px;
                }
              }
              // .el-table_1_column_1{
              //   .cell{
              //     display: none;
              //   }
              // }
              // .el-table_1_column_2{
              //   position: relative;

              // }
            }
          }
        }
        .el-table__body-wrapper {
          .el-table__body {
            .el-table__row {
              .el-table_1_column_1 {
              }
              .el-table_1_column_13 {
                .cell {
                  // display: flex;
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
            border: none;
            cursor: default;
          }
        }
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
