<template>
  <div class="elect-batch-info-page-details">
    <div class="identify-page-title">
      <div class="top-box">
        <bread-crumb :data="formatBreadCrumbList()"></bread-crumb>
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
            <el-input v-model="searchCondition.depart" placeholder="请输入部门名称"></el-input>
          </div>
          <div class="search-condition_input_item">
            <div class="text">公司名称</div>
            <el-input v-model="searchCondition.companyName" placeholder="请输入内容"></el-input>
          </div>
          <div class="search-condition_input_item">
            <div class="text">授权书提交日期</div>
            <date-range @change="onDateRangeChange"></date-range>
          </div>
          <div class="search-condition_input_item">
            <div class="text">公司名称一致</div>
            <el-select v-model="searchCondition.companySealMatch" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
            </el-select>
          </div>
          <div class="search-condition_input_item">
            <div class="text">是否法人</div>
            <el-select v-model="searchCondition.corporateStamp" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
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
          v-loading="isEleLoading"
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
          <el-table-column prop="companySeal" label="公章" show-overflow-tooltip></el-table-column>
          <el-table-column prop="companySealMatch" label="公章是否一致" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.companySealMatch === 0">否</span>
              <span v-else-if="scope.row.companySealMatch === 1">是</span>
            </template>
          </el-table-column>
          <el-table-column prop="personSeal" label="人名章" show-overflow-tooltip></el-table-column>
          <el-table-column prop="corporateStamp" label="是否法人" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.corporateStamp === 0">否</span>
              <span v-else-if="scope.row.corporateStamp === 1">是</span>
            </template>
          </el-table-column>
          <el-table-column prop="submitDate" label="授权书提交日期" show-overflow-tooltip></el-table-column>
          <el-table-column prop="signTime" label="签署时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="authorizationValidDate" label="授权有效期" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="auditState" label="审核状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.auditState === 0">驳回</span>
              <span v-else-if="scope.row.auditState === 1" style="color: #417505;">已审核</span>
              <span v-else-if="scope.row.auditState === 2" style="color: #F5A623;">未审核</span>
            </template>
          </el-table-column>
          <el-table-column prop="fileNo" label="档案编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="fileId" label="提供纸质授权书" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.fileId">已提供</span>
              <span v-else-if="scope.row.fileId === null">未提供</span>
            </template>
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
                :disabled="scope.row.auditState === 0 || !scope.row.companySeal"
                @click="tableItemRejected(scope.row)"
              >驳回</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-footer">
        <!-- <Pagination></Pagination> -->
        <Pagination :totalCount="totalCount" @change="onPageNumberChange"></Pagination>
      </div>
    </div>
    <div class="identify-page-search search-unauth" v-if="activedIndex===1">
      <div class="identify-page_search_condition">
        <div class="search-condition_input">
          <div class="search-condition_input_item">
            <div class="text">公司章</div>
            <el-input v-model="unMatchedSearchCondition.companySeal" placeholder="请输入内容"></el-input>
          </div>
          <div class="search-condition_input_item">
            <div class="text">人名章</div>
            <el-input v-model="unMatchedSearchCondition.personSeal" placeholder="请输入内容"></el-input>
          </div>
          <div class="search-condition_input_item">
            <div class="text">签署时间</div>
            <date-range @change="onSigninDateRangeChange"></date-range>
          </div>
          <div class="search-condition_input_item second">
            <el-button class="search-btn" @click="unMatchedSearch">查询</el-button>
            <div class="export-excel" @click="exportUnmatchedExcel">导出Excel</div>
          </div>
        </div>
      </div>
    </div>
    <div class="search-unauth-table" v-if="activedIndex===1">
      <el-table v-loading="isUnmatchedEleLoading" :data="unMatchedTableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="companySeal" label="公司章"></el-table-column>
        <el-table-column prop="personSeal" label="人名章"></el-table-column>
        <el-table-column prop="signTime"  label="签署时间"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="detail-button" @click="lookOrigin(scope.row)">
                查看原件
              </span>
            </template>
          </el-table-column>
      </el-table>
      <div class="table-footer">
        <Pagination :totalCount="unMatchedtotalCount" @change="onUnmatchedPageNumberChange"></Pagination>
      </div>
    </div>
    <el-dialog
      class="dialog-common confirmDialog"
      title
      :visible.sync="isDialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="dialog-content">
        <div
          class="dialog-content_icon"
          :class="{'review-icon':dialogHintOperate==='批量通过' || dialogHintOperate==='审核通过','reject-icon':dialogHintOperate==='驳回'}"
        ></div>
        <div class="dialog-content_text">{{dialogHintText}}</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-btn" @click="isDialogVisible = false">取消</el-button>
        <el-button
          v-if="dialogHintOperate==='驳回'"
          type="primary"
          class="submit-btn"
          @click="rejectOpinion"
        >{{dialogHintOperate}}</el-button>
        <el-button
          v-if="dialogHintOperate==='审核通过'"
          type="primary"
          class="submit-btn"
          @click="reviewPass"
        >{{dialogHintOperate}}</el-button>
        <el-button
          v-if="dialogHintOperate==='批量通过'"
          type="primary"
          class="submit-btn"
          @click="batchReviewPass"
        >{{dialogHintOperate}}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="dialog confirmDialog"
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
          <el-form-item label="其他问题描述:" prop="problemDescription">
            <el-input v-model="rejectForm.problemDescription" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-btn" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" class="submit-btn" @click="handleRejectClick">驳 回</el-button>
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
import { CHECK_STATUS_LIST, global_upload, PROBLEM_LIST} from '@/global/global';
import localStorageHelper from '@/helpers/localStorageHelper';

let USERID = null;
const PAGE_SIZE = 10;
const ELE_FILE = 0;

export default {
  data() {
    return {
      isEleLoading: false,
      isUnmatchedEleLoading: false,
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
        userId: USERID
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
      downloadMultipleSelection: [],
      currentPage: 1,
      unMatchedcurrentPage: 1,
      totalCount: 0,
      unMatchedtotalCount: 0,
      currentTitle: "识别结果",
      breadCrumbList: ["首页", "征信查询授权书","识别结果","电子版批次详情"],
      pageSize: PAGE_SIZE,
      unMatchedPageSize: PAGE_SIZE,
      tableData: [],
      summaryId: ''
    };
  },
  watch: {
    'allChecked'() {
      this.toggleSelection();
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === '/creditElectronicBatchInformation/lookOrigin') {
      next(vm => {
        vm.activedIndex = 1;
      });
    } else {
      next();
    }
  },
  methods: {
    formatBreadCrumbList() {
      if (this.activedIndex) {
        return ["首页", "征信查询授权书","识别结果","电子版批次详情","未匹配查询清单授权书"]
      }
      return ["首页", "征信查询授权书","识别结果","电子版批次详情","查询清单"]
    },
    toggleSelection() {
      if (this.allChecked) {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleAllSelection();
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    onDateRangeChange(res) {
      this.searchCondition.submitStartTime = res.startTime;
      this.searchCondition.submitEndTime = res.endTime;
    },
    onSigninDateRangeChange(res) {
      this.unMatchedSearchCondition.signStartTime = res.startTime || '';
      this.unMatchedSearchCondition.signEndTime = res.endTime || '';
    },
    search() {
      this.currentPage = 1;
      this.fetchElecDetailList();
    },
    unMatchedSearch() {
      this.unMatchedcurrentPage = 1;
      this.fetchUnmatchedElecDetailList();
    },
    onPageNumberChange(res) {
      this.pageSize = res.pageSize;
      this.currentPage = res.pageNum;
      this.allChecked = false;
      this.fetchElecDetailList();
    },
    onUnmatchedPageNumberChange(res) {
      this.unMatchedPageSize = res.pageSize;
      this.unMatchedcurrentPage = res.pageNum;
      this.fetchUnmatchedElecDetailList();
    },
    // 下载
    tableDownload() {
      if (this.downloadMultipleSelection.length) {
        const params = {
          ids: this.downloadMultipleSelection,
          elecOrFile: ELE_FILE,
          summaryId: this.summaryId,
          userId: USERID
        };
        window.open(`${global_upload}/auth/estateAuthorizationExcelController/downElecExcels${formatQuery(params)}`,'_parent');
      } else {
        this.$message({
          message: '请勾选要下载的对象!',
          type: 'warning'
        })
      }
    },
    batchReview() {
      // if (this.multipleSelection.length) {
      //   this.isDialogVisible = true;
      //   if (this.multipleSelection.length > 0) {
      //     this.dialogHintText = "请确认是否批量通过";
      //     this.dialogHintOperate = "批量通过";
      //   } else {
      //     this.dialogHintText = "请确认是否审核通过";
      //     this.dialogHintOperate = "审核通过";
      //   }
      // } else {
      //   this.$message({
      //     message: '请勾选符合审核条件的对象!',
      //     type: 'warning'
      //   })
      // }
      if (this.downloadMultipleSelection.length && this.multipleSelection.length) {
        this.isDialogVisible = true;
        if (this.multipleSelection.length > 0) {
          this.dialogHintText = "请确认是否批量通过";
          this.dialogHintOperate = "批量通过";
        } else {
          this.dialogHintText = "请确认是否审核通过";
          this.dialogHintOperate = "审核通过";
        }
      } else if (this.downloadMultipleSelection.length && !this.multipleSelection.length) {
        this.$message.error('没有审核权限或者当前勾选项不可审核!');
      } else if (!this.downloadMultipleSelection.length && !this.multipleSelection.length) {
        this.$message.error('请勾选要下载的对象!');
      }
    },
    topMenus(index) {
      this.activedIndex = index;
    },
    //未授权 查看原件
    lookOrigin(row){
      // this.$router.push({ name: "look-origin" });
      this.$router.push({ name: "look-origin", query: {fileId: row.id, batchNo: this.$route.query.batchNo, type: 'elec-notMatch'} });
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
      checkAuthRecords(params).then((res) => {
        if (res.data.status === 200) {
          this.$message({
            message: '审核完成',
            type: 'success'
          });
          this.fetchElecDetailList();
          this.allChecked = false;
        } else {
          this.$message.error('审核失败');
        }
      })
    },
    tableItemDetails(row) {
      this.$router.push({
        name: "elec-batch-info-identify-details",
        query: { pageNum: this.currentPage, summaryId: this.summaryId, id: row.id, auditState: row.auditState, batchNo: this.$route.query.batchNo }
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
          checkAuthRecord(params).then((res) => {
            if (res.data.status === 200) {
              this.$message({
                message: '驳回完成',
                type: 'success'
              });
              this.dialogVisible = false;
              this.fetchElecDetailList();
            } else {
              this.$message.error('驳回失败');
            }
          })
        }
      })
    },
    // 导出excel
    exportExcel() {
      const params = this.searchCondition;
      params.pageNum = this.currentPage;
      params.pageSize = this.pageSize;
      window.open(`${global_upload}/auth/estateAuthorizationExcelController/exportExcelRecords${formatQuery(params)}`,'_parent');
    },
    // 导出为匹配详情
    exportUnmatchedExcel() {
      const params = this.unMatchedSearchCondition;
      window.open(`${global_upload}/auth/estateAuthorizationFileController/exportUnmatchedFilesToExcel
${formatQuery(params)}`,'_parent');
    },
    tableItemReview() {
      this.isDialogVisible = true;
      this.dialogHintText = "请确认是否审核通过";
      this.dialogHintOperate = "审核通过";
    },
    tableItemRejected(row) {
      if (USERID === row.createUser) {
        this.rejectForm.problemType = '';
        this.rejectForm.problemDescription = '';
        this.isDialogVisible = true;
        this.dialogHintText = "请确认是否驳回";
        this.dialogHintOperate = "驳回";
        this.rejectObj.fileId = row.elecFileId;
        this.rejectObj.id = row.id
      } else {
        this.$message.error('没有驳回权限!');
      }
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
      this.multipleSelection = val.filter(item => item.companySeal && USERID === item.createUser).map(item => item.id);
      this.downloadMultipleSelection = val.map(item => item.id);
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
    },
    handleCurrentChange(currPage) {
      this.currentPage = currPage;
    },
    fetchElecDetailList() {
      this.tableData = [];
      this.isEleLoading = true;
      this.searchCondition.pageSize = this.pageSize;
      this.searchCondition.pageNum = this.currentPage;
      this.searchCondition.summaryId = this.summaryId;
      elecDetailList(this.searchCondition)
      .then(res => {
        this.tableData = res.data;
        this.totalCount = res.total;
        this.isEleLoading = false;
      });
    },
    fetchUnmatchedElecDetailList() {
      this.unMatchedTableData = [];
      this.isUnmatchedEleLoading = true;
      this.unMatchedSearchCondition.pageSize = this.unMatchedPageSize;
      this.unMatchedSearchCondition.pageNum = this.unMatchedcurrentPage;
      this.unMatchedSearchCondition.summaryId = this.summaryId;
      unMatchedElecDetailList(this.unMatchedSearchCondition)
      .then(res => {
        this.unMatchedTableData = res.data;
        this.unMatchedtotalCount = res.total;
        this.isUnmatchedEleLoading = false;
      });
    }
  },
  beforeCreate() {
    USERID = Number(localStorageHelper.getItem('USERID'));
  },
  mounted() {
    this.summaryId = this.$route.query.id;
    this.currentPage = Number(this.$route.query.pageNum || 1);
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
@import '@/scss/mixin.scss';

.elect-batch-info-page-details {
  display: -webkit-box;
  flex: 1;
  flex-direction: column;
  .top-box {
    height: 130px;
    background-color: #ffffff;
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
        color: #0263FF;
        border-bottom: 3px solid #0263FF;
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
          @include buttonStyle;
        }
        .export-excel {
          width: 123px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          font-size: 14px;
          color: #4A90E2;
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
    flex: 1;
    margin-top: 30px;
    background: #fff;
    padding: 30px;
    .detail-button {
      color: #4A90E2;
      cursor: pointer;
    }
    .table-footer {
      margin-top: 25px;
    }
  }
  .identify-page-table {
    flex: 1;
    margin-top: 20px;
    padding: 20px 40px;
    background: #ffffff;
    .identify-page-table_btn {
      .el-checkbox {
        margin-right: 13px;
      }
      .btn {
        @include buttonStyle;
      }
    }
    .identify-page-table_content {
      margin-top: 20px;
      /deep/ .table-btn {
        width: 28px;
        height: 20px;
        margin-right: 20px;
        background: none;
        border: none;
        font-weight: normal;
        font-size: 14px;
        &.is-disabled {
          span {
            color: #d9d9d9;
          }
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
.confirmDialog {
  /deep/ .el-dialog {
    width: 521px !important;
    // height: 228px !important;
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
      }
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
