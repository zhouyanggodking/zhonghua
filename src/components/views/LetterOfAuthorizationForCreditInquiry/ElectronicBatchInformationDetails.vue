<template>
  <div class="elect-batch-info-page-details">
    <div class="identify-page-title">
      <div class="top-box">
        <bread-crumb :data="breadCrumbList"></bread-crumb>
      </div>
      <div class="btn-group">
        <div
          class="btn-group_item"
          :class="{'btn-actived':index===activedIndex}"
          v-for="(item,index) in topBtnGroup"
          :key="index"
          @click="topMenus(index)"
        >{{item}}</div>
      </div>
    </div>
    <div class="identify-page-search" v-if="activedIndex===0">
      <div class="identify-page_search_condition">
        <div class="search-condition_input">
          <div class="search-condition_input_item">
            <div class="text">部门</div>
            <el-select v-model="searchCondition.depart" placeholder="请选择">
              <el-option v-for="(item, index) in departmentList" :key="index" :label="item.departmentName" :value="item.id"></el-option>
            </el-select>
          </div>
          <div class="search-condition_input_item">
            <div class="text">公司名称</div>
            <el-input v-model="searchCondition.companyName" placeholder="请输入内容"></el-input>
          </div>
          <div class="search-condition_input_item">
            <div class="text">授权提交时间</div>
            <date-range @change="onDateRangeChange"></date-range>
          </div>
          <div class="search-condition_input_item">
            <div class="text">公司名称一致</div>
            <el-select v-model="searchCondition.companySealMatch" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="否是" value="0"></el-option>
              <el-option label="全部" value="1"></el-option>
            </el-select>
          </div>
          <div class="search-condition_input_item">
            <div class="text">是否法人</div>
            <el-select v-model="searchCondition.corporateStamp" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="否是" value="0"></el-option>
              <el-option label="全部" value="1"></el-option>
            </el-select>
          </div>
          <div class="search-condition_input_item">
            <div class="text">授权有效期</div>
            <el-select v-model="searchCondition.authorizationValidDateLegal	" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="大于等于申请日期" value="0"></el-option>
              <el-option label="小于申请日期" value="1"></el-option>
            </el-select>
          </div>
          <div class="search-condition_input_item">
            <div class="text">审核状态</div>
            <el-select v-model="searchCondition.auditState" placeholder="请选择">
              <el-option v-for="(item, index) in auditState" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
          <div class="search-condition_input_item second">
            <el-button class="search-btn" @click="search">查询</el-button>
            <div class="export-excel" @click="exportExcel">导出Excel</div>
          </div>
        </div>
      </div>
    </div>
    <div class="identify-page-table" v-if="activedIndex===0">
      <div class="identify-page-table_btn">
        <el-checkbox v-model="allChecked">全选</el-checkbox>
        <el-button class="btn" @click="tableDownload()">下载</el-button>
        <el-button class="btn" @click="batchReview()">批量审核</el-button>
      </div>
      <div class="identify-page-table_content">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column fixed type="selection" width="30"></el-table-column>
          <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="depart" label="部门" show-overflow-tooltip></el-table-column>
          <el-table-column prop="companyName" label="公司名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="name" label="公章" show-overflow-tooltip></el-table-column>
          <el-table-column prop="companySealMatch" label="公章是否一致" show-overflow-tooltip></el-table-column>
          <el-table-column prop="personSeal" label="人名章" show-overflow-tooltip></el-table-column>
          <el-table-column prop="corporateStamp" label="是否法人" show-overflow-tooltip></el-table-column>
          <el-table-column prop="submitDate" label="授权提交时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="签署时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="authorizationValidDateLegal" label="授权有效期" show-overflow-tooltip></el-table-column>
          <el-table-column prop="auditState" label="审核状态" show-overflow-tooltip></el-table-column>
          <el-table-column prop="fileNo" label="档案编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="fileId" label="提供纸质授权书" show-overflow-tooltip>
            <!-- //审核通过为是 -->
          </el-table-column>
          <el-table-column label="操作" width="165" fixed="right">
            <template slot-scope="scope">
              <el-button
                class="table-btn"
                size="mini"
                @click="tableItemDetails(scope.row)"
              >详情</el-button>
              <el-button
                class="table-btn"
                size="mini"
                type="danger"
                @click="tableItemRejected(scope.row)"
              >驳回</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-footer">
        <Pagination :totalCount="totalCount" @change="onPageNumberChange"></Pagination>
      </div>
    </div>
    <div class="identify-page-search search-unauth" v-if="activedIndex===1">
      <div class="identify-page_search_condition">
        <div class="search-condition_input">
          <div class="search-condition_input_item">
            <div class="text">公司章</div>
            <el-input v-model="unMatchedTableData.companySeal" placeholder="请输入内容"></el-input>
          </div>
          <div class="search-condition_input_item">
            <div class="text">人名章</div>
            <el-input v-model="unMatchedTableData.personSeal" placeholder="请输入内容"></el-input>
          </div>
          <div class="search-condition_input_item">
            <div class="text">签署时间</div>
            <date-range @change="onDateRangeChange"></date-range>
          </div>
          <!-- 上传时间 -->
          <!-- <div class="search-condition_input_item">
            <div class="text">上传时间</div>
            <date-range @change="onDateRangeChange"></date-range>
          </div> -->
          <div class="search-condition_input_item second">
            <el-button class="search-btn" @click="unMatchedSearch">查询</el-button>
            <div class="export-excel" @click="exportExcel">导出Excel</div>
          </div>
        </div>
      </div>
    </div>
    <div class="search-unauth-table" v-if="activedIndex===1">
      <el-table :data="unMatchedTableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="companySeal" label="公司章"></el-table-column>
        <el-table-column prop="personSeal" label="人名章"></el-table-column>
        <el-table-column prop="signStartTime"  label="签署时间"></el-table-column>
        <!-- <el-table-column prop="address" label="上传时间"></el-table-column> -->
        <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- <el-button
                class="table-btn"
                size="mini"
                @click="lookOrigin(scope.$index, scope.row)"
              >详情</el-button> -->
              <span class="detail-button" @click="lookOrigin(scope.$index, scope.row)">
                详情
              </span>
            </template>
          </el-table-column>
      </el-table>
      <div class="table-footer">
        <Pagination :totalCount="unMatchedtotalCount" @change="onUnmatchedPageNumberChange"></Pagination>
      </div>
    </div>
    <el-dialog
      class="dialog-common"
      title
      :visible.sync="isDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="dialog-content">
        <div
          class="dialog-content_icon"
          :class="{'review-icon':dialogHintOperate==='批量审核','reject-icon':dialogHintOperate==='驳回'}"
        ></div>
        <div class="dialog-content_text">{{dialogHintText}}</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-btn" @click="isDialogVisible = false">取消</el-button>
        <el-button
          v-if="dialogHintOperate==='驳回'"
          type="primary"
          @click="rejectOpinion"
        >{{dialogHintOperate}}</el-button>
        <el-button
          v-if="dialogHintOperate==='批量审核'"
          type="primary"
          @click="batchReviewPass"
        >{{dialogHintOperate}}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="dialog"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="reject-content">
        <el-form ref="rejectForm" label-position="right" :rules="rejectRules" label-width="120px" :model="rejectForm">
          <el-form-item label="问题分类:" prop="problemType">
            <el-select v-model="rejectForm.problemType" placeholder="请选择">
              <el-option
                v-for="(item, index) in questionClassificationList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="驳回意见:" prop="problemDescription">
            <el-input v-model="rejectForm.problemDescription" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>
      
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-btn" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleRejectClick">驳 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {elecDetailList, checkAuthRecords, checkAuthRecord, unMatchedElecDetailList} from "@/rest/letterOfAuthorizationElecApi";
import BreadCrumb from "@/components/common/BreadCrumb";
import Pagination from "@/components/common/Pagination";
import DateRange from "@/components/common/DateRange";
import {formatQuery} from '@/helpers/formatGetParams';
import {DEPARTMENT_LIST, USERID, CHECK_STATUS_LIST, global_, PROBLEM_LIST} from '@/global/global';

const PAGE_SIZE = 10;
const ELE_FILE = 0;

export default {
  data() {
    return {
      searchCondition: {
        depart: '',
        companyName: '',
        submitStartTime: '',
        submitEndTime: '',
        companySealMatch: '',
        corporateStamp: '',
        authorizationValidDateLegal: '',
        auditState: '',
        summaryId: '',
        elecOrFile: ELE_FILE,
        userId: USERID,
        pageNum: '',
        pageSize: ''
      },
      unMatchedSearchCondition: {
        companySeal: '',
        personSeal: '',
        signStartTime: '',
        signEndTime: '',
        summaryId: '',
        elecOrFile: ELE_FILE,
        userId: USERID,
        pageNum: '',
        pageSize: ''
      },
      rejectObj: {
        fileId: '',
        id: ''
      },
      rejectForm: {
        problemType: '',
        problemDescription: ''
      },
      rejectRules: {
        problemType: [
          { required: true, message: '请选择问题类型', trigger: 'blur' },
        ],
        problemDescription: [
          { required: true, message: '请输入驳回意见', trigger: 'blur' },
        ]
      },
      unMatchedTableData: [],
      questionClassificationList: PROBLEM_LIST,
      auditState: CHECK_STATUS_LIST,
      activedIndex: 0,
      topBtnGroup: ["查询清单", "未匹配查询清单授权书"],
      departmentList: DEPARTMENT_LIST,
      allChecked: false,
      dialogHintText: "请确认是否驳回",
      dialogHintOperate: "驳回",
      isDialogVisible: false,
      rejectContent: "",
      collector: "",
      dialogTitle: "填写驳回意见",
      dialogVisible: false,
      reviewStatus: "全部",
      multipleSelection: [],
      currentPage: 1,
      unMatchedcurrentPage: 1,
      totalCount: 0,
      unMatchedtotalCount: 0,
      currentTitle: "识别结果",
      breadCrumbList: ["征信查询授权书","识别结果","电子版批次信息"],
      pageSize: PAGE_SIZE,
      unMatchedPageSize: PAGE_SIZE,
      tableData: [],
      summaryId: ''
    };
  },
  methods: {
    onDateRangeChange(res) {
      this.searchCondition.submitStartTime = res.startTime;
      this.searchCondition.submitEndTime = res.endTime;
    },
    goBack() {},
    search() {
      this.fetchElecDetailList();
    },
    unMatchedSearch() {
      this.fetchUnmatchedElecDetailList();
    },
    onPageNumberChange(res) {
      this.pageSize = res.pageSize;
      this.currentPage = res.pageNum;
      this.fetchElecDetailList();
    },
    onUnmatchedPageNumberChange(res) {
      this.unMatchedPageSize = res.pageSize;
      this.unMatchedcurrentPage = res.pageNum;
      this.fetchUnmatchedElecDetailList();
    },
    // 下载
    tableDownload() {
      if (this.multipleSelection.length) {
        const params = {
          ids: this.multipleSelection,
          elecOrFile: ELE_FILE,
          summaryId: this.summaryId,
          userId: USERID
        };
        window.open(`${global_}/estate/estatePaymentRequestOrderController/downloadEstatePaymentRequestOrderById${formatQuery(params)}`,'_parent');
      } else {
        this.$message({
          message: '请勾选要下载的对象!',
          type: 'warning'
        })
      }
    },
    batchReview() {
      if (this.multipleSelection.length) {
        this.isDialogVisible = true;
        this.dialogHintText = "请确认是否批量通过";
        this.dialogHintOperate = "批量审核";
      } else {
        this.$message({
          message: '请勾选要审核的对象!',
          type: 'warning'
        })
      }
    },
    topMenus(index) {
      this.activedIndex = index;
    },
    //未授权 查看原件
    lookOrigin(){
      this.$router.push({ name: "look-origin" });
    },
    // 批量审核
    batchReviewPass() {
      this.dialogHintOperate = '批量审核';
      this.isDialogVisible = false;
      const params = {
        excels:{
          ids: this.multipleSelection,
          problemType: 0,
          problemDescription: "",
          auditState: 1,
          elecOrFile: ELE_FILE
        },
        userId: USERID
      }
      checkAuthRecords(params).then(() => {
        this.$message({
          message: '审核完成',
          type: 'success'
        });
        this.fetchElecDetailList();
      }, () => {
        this.$message({
          message: '审核失败',
          type: 'warning'
        })
      })
    },
    tableItemDetails(row) {
      this.$router.push({
        name: "elec-batch-info-identify-details",
        query: { id: row.id, auditState: row.auditState }
      });
    },
    // 驳回
    handleRejectClick() {
      const params = {
        excel: {
          id: this.rejectObj.id,
          fileId: this.rejectObj.fileId,
          rowkey: "",
          auditState: 0,
          problemType: this.rejectForm.problemType,
          problemDescription: this.rejectForm.problemDescription,
          elecOrFile: ELE_FILE
        },
        userId: USERID
      };
      this.$refs.rejectForm.validate(valid => {
        if (valid) {
          checkAuthRecord(params).then(() => {
            this.$message({
              message: '驳回完成',
              type: 'success'
            });
            this.dialogVisible = false;
            this.fetchElecDetailList();
          }, () => {
            this.$message({
              message: '驳回失败',
              type: 'warning'
            })
          })
        }
      })
    },
    // 导出excel
    exportExcel() {
      const params = this.searchCondition;
      params.pageNum = this.currentPage;
      params.pageSize = this.pageSize;
      window.open(`${global_}/auth/estateAuthorizationExcelController/exportExcelRecords${formatQuery(params)}`,'_parent');
    },
    tableItemReview() {
      this.isDialogVisible = true;
      this.dialogHintText = "请确认是否审核通过";
      this.dialogHintOperate = "审核通过";
    },
    tableItemRejected(row) {
      // this.dialogVisible = true;
      this.isDialogVisible = true;
      this.dialogHintText = "请确认是否驳回";
      this.dialogHintOperate = "驳回";
      this.rejectObj.fileId = row.elecFileId;
      this.rejectObj.id = row.id
    },
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
      this.multipleSelection = val.map(item => item.id);
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
    },
    handleCurrentChange(currPage) {
      this.currentPage = currPage;
    },
    fetchElecDetailList() {
      this.searchCondition.pageSize = this.pageSize;
      this.searchCondition.pageNum = this.currentPage;
      this.searchCondition.summaryId = this.summaryId;
      elecDetailList(this.searchCondition)
      .then(res => {
        this.tableData = res.data;
        this.totalCount = res.total;
      });
    },
    fetchUnmatchedElecDetailList() {
      this.unMatchedSearchCondition.pageSize = this.unMatchedPageSize;
      this.unMatchedSearchCondition.pageNum = this.unMatchedcurrentPage;
      this.unMatchedSearchCondition.summaryId = this.summaryId;
      unMatchedElecDetailList(this.unMatchedSearchCondition)
      .then(res => {
        this.unMatchedTableData = res.data;
        this.totalCount = res.total;
      });
    }
  },
  mounted() {
    this.summaryId = this.$route.query.id;
    this.fetchElecDetailList();
    this.fetchUnmatchedElecDetailList();
  },
  components: {
    BreadCrumb,
    Pagination,
    DateRange
  }
};
</script>

<style lang="scss" scoped>
.elect-batch-info-page-details {
  .top-box {
    height: 130px;
    background-color: #ffffff;
    .bread-crumb {
      padding: 14px 20px 0px;
    }
  }

  .identify-page-title {
    background-color: #ffffff;
    height: 129px;
    position: relative;
    .uploadTitle {
      padding: 20px 0px 0 14px;
      font-size: 12px;
      color: #151515;
      .backToIndex {
        color: #999999;
      }
      .backBorder {
        padding: 2px 0;
        font-size: 12px;
        border: 1px solid #999999;
        border-radius: 3px;
        color: #999999;
        margin-right: 5px;
      }
    }
    .btn-group {
      display: flex;
      position: absolute;
      left: 0;
      bottom: 0;
      .btn-group_item {
        height: 42px;
        margin: 0 20px 0 30px;
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        color: #999999;
        cursor: pointer;
      }
      .btn-actived {
        color: #9b8b7c;
        border-bottom: 3px solid #c1b071;
      }
    }
    .title-name {
      font-family: "PingFangSC-Regular";
      font-size: 12px;
      color: #999999;
      padding-top: 33px;
      margin-left: 30px;
    }
  }
  .identify-page-search {
    background: #fff;
    margin-top: 20px;
    padding-bottom: 30px;
    .identify-page_search_condition {
      display: flex;
      flex-direction: column;
      padding-top: 10px;
      margin-left: 30px;
      .search-condition_input {
        display: flex;
        flex-wrap: wrap;
        .search-condition_input_item {
          display: inline-flex;
          align-items: center;
          // width: 266px;
          margin-right: 30px;
          margin-top: 20px;
          .text {
            width: 100px;
            margin-right: 10px;
            font-family: "PingFangSC-Semibold";
            font-size: 14px;
            color: #666666;
          }
          /deep/ .el-input {
            width: 200px;

            .el-input__inner {
              width: 200px;
            }
          }
        }
        .search-btn {
          margin-left: 66px;
          font-family: "PingFangSC-Semibold";
        }
        .export-excel {
          width: 123px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          font-size: 14px;
          color: #c1b071;
          cursor: pointer;
        }
      }
    }
  }
  .search-unauth {
    .identify-page_search_condition {
      .search-condition_input_item {
        .text {
          width: 56px !important;
        }
      }
    }
  }
  .search-unauth-table{
    margin-top: 30px;
    background: #fff;
    padding: 30px;
    .detail-button {
      color: #4A90E2;
      cursor: pointer;
    }
  }
  .identify-page-table {
    margin-top: 20px;
    padding: 20px 40px;
    background: #ffffff;
    .identify-page-table_btn {
      .el-checkbox {
        margin-right: 13px;
      }
      .btn {
        font-family: "PingFangSC-Semibold";
      }
    }
    .identify-page-table_content {
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
      /deep/ .table-btn {
        width: 28px;
        height: 20px;
        margin-right: 20px;
        background: none;
        border: none;
        font-weight: normal;
        font-size: 14px;
        span {
          color: #4a90e2;
          // margin-right: 20px;
        }
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
.dialog-common {
  /deep/ .el-dialog {
    width: 521px !important;
    height: 228px !important;
    border-radius: 0;
    .el-dialog__header {
      padding-top: 0;
      padding-bottom: 4px;
      .el-dialog__headerbtn {
        display: none;
      }
    }
    .el-dialog__body {
      padding-bottom: 30px;
    }
    .el-dialog__footer {
      border: none;
      .dialog-footer {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        .el-button {
          width: 135px;
          height: 40px;
        }
      }
    }

    .dialog-footer {
      .cancel-btn {
        margin-right: 40px;
        background: #ffffff;
        border: 1px solid #d9d9d9;
        span {
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #666666 !important;
        }
      }
    }
  }

  .dialog-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .dialog-content_icon {
    width: 36px;
    height: 38px;
  }
  .review-icon {
    width: 36px;
    height: 37px;
    background: url("./../../../assets/imgs/9.png") no-repeat;
    background-size: cover;
  }
  .reject-icon {
    background: url("./../../../assets/imgs/8.png") no-repeat;
    background-size: cover;
  }
  .dialog-content_text {
    margin-top: 20px;
    font-family: PingFangSC-Semibold;
    font-size: 20px;
    color: #666666;
  }
}
.dialog {
  .reject-content {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 2px solid #ebebeb;
    border-bottom: 2px solid #ebebeb;
    /deep/ {
      .el-form {
        margin-top: 20px;
      }
    }
    .label-content {
      font-family: PingFangSC-Semibold;
      font-size: 14px;
      color: #666666;
      margin-right: 10px;
    }
    /deep/ .el-input {
      width: 300px;
      .el-input__inner {
        width: 300px;
        height: 44px;
      }
    }
  }
  .dialog-footer {
    /deep/ .cancel-btn {
      margin-right: 40px;
      background: #ffffff;
      border: 1px solid #d9d9d9;
      span {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #666666 !important;
      }
    }
  }
}
/deep/ .el-dialog {
  width: 660px !important;
  .el-dialog__header {
    .el-dialog__title {
      font-size: 20px;
      color: #9a8b7b;
    }
    .el-dialog__headerbtn {
      // width: 30px;
      // height: 30px;
      font-size: 30px;
      .el-dialog__close {
        color: rgba(51, 51, 51, 0.3);
      }
    }
  }
  .el-dialog__body {
    padding-bottom: 20px;
  }
  .el-dialog__footer {
    padding-top: 0;
    border: none;
    padding-bottom: 30px;
    .el-button {
      width: 135px !important;
      height: 40px !important;
    }
  }
}
.el-table__fixed-right::before,
.el-table__fixed::before {
  display: none;
}
/deep/ .table-btn {
        width: 28px;
        height: 20px;
        margin-right: 20px;
        background: none;
        border: none;
        font-weight: normal;
        font-size: 14px;
        span {
          color: #4a90e2;
          // margin-right: 20px;
        }
      }
</style>
