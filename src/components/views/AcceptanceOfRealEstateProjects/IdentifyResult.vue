<template>
  <div class="identify-page">
    <div class="identify-page-title">
      <div class="top-box">
        <bread-crumb :data="breadCrumbList" :currentTitle="currentTitle"></bread-crumb>
      </div>
    </div>
    <div class="identify-page-search">
      <div class="identify-page_search_condition">
        <div class="search-condition_input">
          <div class="search-condition_input_item">
            <div class="text">付款主题</div>
            <el-input v-model="paymentTitle" placeholder="请输入内容"></el-input>
          </div>
          <div class="search-condition_input_item">
            <div class="text">合同编号</div>
            <el-input v-model="contractNo" placeholder="请输入内容"></el-input>
          </div>
          <div class="search-condition_input_item">
            <div class="text">付款方</div>
            <el-input v-model="payer" placeholder="请输入内容"></el-input>
          </div>
          <div class="search-condition_input_item">
            <div class="text">收款方</div>
            <el-input v-model="receiver" placeholder="请输入内容"></el-input>
          </div>
          <div class="search-condition_input_item">
            <div class="text">审核状态</div>
            <el-select v-model="auditState" placeholder="请选择">
              <el-option v-for="(item, index) in reviewStatusList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
          <div class="search-condition_input_item second">
            <el-button class="search-btn" @click="search">查询</el-button>
            <div class="export-excel" @click="exportExcel">导出Excel</div>
          </div>
        </div>
      </div>
    </div>
    <div class="identify-page-table">
      <div class="identify-page-table_btn">
        <el-checkbox v-model="allChecked">全选</el-checkbox>
        <el-button class="btn" @click="tableDownload()">下载</el-button>
        <el-button class="btn" @click="batchReview()">批量审核</el-button>
      </div>
      <div class="identify-page-table_content">
        <el-table
          v-loading="isLoading"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column fixed type="selection" width="30"></el-table-column>
          <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="paymentTitle" label="付款主题" width="120"></el-table-column>
          <el-table-column prop="contractNo" label="合同编号" width="120"></el-table-column>
          <el-table-column prop="payer" label="付款单位" show-overflow-tooltip></el-table-column>
          <el-table-column prop="receiver" label="收款单位" show-overflow-tooltip></el-table-column>
          <el-table-column prop="contractDynamicAmount" label="合同动态金额" show-overflow-tooltip>
            <template slot-scope="scope">
              {{formatMoney(scope.row.contractDynamicAmount)}}
            </template>
          </el-table-column>
          <el-table-column prop="paidAmount" label="累计已付金额" show-overflow-tooltip>
            <template slot-scope="scope">
              {{formatMoney(scope.row.paidAmount)}}
            </template>
          </el-table-column>
          <el-table-column prop="acountPayable" label="本次应付金额" show-overflow-tooltip>
            <template slot-scope="scope">
              {{formatMoney(scope.row.acountPayable)}}
            </template>
          </el-table-column>
          <el-table-column prop="invoiceTotalPrice" label="票据总金额" show-overflow-tooltip>
            <template slot-scope="scope">
              {{formatMoney(scope.row.invoiceTotalPrice)}}
            </template>
          </el-table-column>
          <el-table-column prop="invoiceNum" label="票据数量" show-overflow-tooltip></el-table-column>
          <el-table-column prop="auditState" label="状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.auditState === 0">驳回</span>
              <span v-else-if="scope.row.auditState === 1" style="color: #417505;">已审核</span>
              <span v-else-if="scope.row.auditState === 2 || scope.row.auditState === null" style="color: #F5A623;">未审核</span>
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
                :disabled="scope.row.auditState === 0"
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
          :class="{'review-icon':dialogHintOperate==='审核通过' || dialogHintOperate==='批量通过','reject-icon':dialogHintOperate==='驳回'}"
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
          @click="batchReviewPass"
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
        <div class="label-content">驳回意见</div>
        <el-input type="textarea" maxlength="100" show-word-limit v-model="rejectContent" placeholder="请输入内容"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-btn" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" class="submit-btn" @click="handleRejectClick">驳 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import resourceWrapper from "@/rest/resourceWrapper";
import { global_upload} from '@/global/global';
import { formatMoney } from '@/helpers/moneyHelper';
import {checkPaymentRequestOrders, checkPaymentRequestOrder} from "@/rest/realEstateUploadApi";
import BreadCrumb from "@/components/common/BreadCrumb";
import Pagination from "@/components/common/Pagination";
import localStorageHelper from '@/helpers/localStorageHelper';

let USERID = null;
const PAGE_SIZE = 10;
const CHECK = 1;
const REJECT = 0;

export default {
  data() {
    return {
      isLoading: false,
      paymentTitle:'',
      contractNo:'',
      payer: "",
      receiver:'',
      auditState: '',
      rejectId: null,
      userId: USERID,
      pageNum:1,
      allChecked: false,
      dialogHintText: "请确认是否驳回",
      dialogHintOperate: "驳回",
      isDialogVisible: false,
      rejectContent: "",
      collector: "",
      dialogTitle: "填写驳回意见",
      dialogVisible: false,
      multipleSelection: [],
      currentPage: 1,
      totalCount: 0,
      currentTitle: "识别结果",
      breadCrumbList: ["首页", "地产项目承兑", "识别结果"],
      pageSize: PAGE_SIZE,
      pageSizes: [PAGE_SIZE],
      downloadMultipleSelection: [],
      reviewStatusList: [
        {
          name: '全部',
          id: ''
        },
        {
          name: '驳回',
          id: 0
        },
        {
          name: '已审核',
          id: 1
        },
        {
          name: '未审核',
          id: 2
        },
      ],
      tableData: [],
    };
  },
  watch: {
    'allChecked'() {
      this.toggleSelection();
    }
  },
  methods: {
    formatMoney(param) {
      return formatMoney(param);
    },
    search() {
      this.currentPage = 1;
      this.getPaymentOrderInfos();
    },
    tableDownload() {
      if (this.multipleSelection.length) {
        const params = {
          ids: this.multipleSelection,
          userId: USERID
        };
        window.open(`${global_upload}/estate/estatePaymentRequestOrderController/downloadEstatePaymentRequestOrderById?userId=${params.userId}&ids=${params.ids}`,'_parent');
      } else {
        this.$message({
          message: '请勾选要下载的对象!',
          type: 'warning'
        })
      }
    },
    batchReview() {
      if (this.downloadMultipleSelection.length && this.multipleSelection.length) {
        this.isDialogVisible = true;
        if (this.multipleSelection.length > 1) {
          this.dialogHintText = "请确认是否批量通过";
          this.dialogHintOperate = "批量通过";
        } else {
          this.dialogHintText = "请确认是否审核通过";
          this.dialogHintOperate = "审核通过";
        }
      } else if (this.downloadMultipleSelection.length && !this.multipleSelection.length) {
        this.$message.error('没有审核权限!');
      } else if (!this.downloadMultipleSelection.length && !this.multipleSelection.length) {
        this.$message.error('请勾选要下载的对象!');
      }
    },
    // 全选toggle
    toggleSelection() {
      if (this.allChecked) {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleAllSelection();
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    tableItemDetails(row) {
      this.$router.push({ name: "indentify-result-details", query: { id: row.id } });
    },
    exportExcel() {
      const params = {
        paymentTitle: this.paymentTitle,
        contractNo: this.contractNo,
        payer: this.payer,
        receiver: this.receiver,
        auditState: this.auditState,
        userId: this.userId,
        fileName: ''
      }
      window.open(`${global_upload}/estate/estatePaymentRequestOrderController/exportPaymentRequestOrdersToExcel?userId=${params.userId}&paymentTitle=${params.paymentTitle}&contractNo=${params.contractNo}&payer=${params.payer}&receiver=${params.receiver}&fileName=${params.fileName}`,'_parent');
    },
    tableItemRejected(row) {
      if (USERID === row.createUser) {
        this.isDialogVisible = true;
        this.dialogHintText = "请确认是否驳回";
        this.dialogHintOperate = "驳回";
        this.rejectId = row.id;
      } else {
        this.$message.error('没有驳回权限!');
      }
    },
    // 批量审核
    batchReviewPass() {
      this.isDialogVisible = false;
      const params = {
        orders : {
          ids: this.multipleSelection,
          auditState: CHECK,
        },
        userId: USERID
      };
      checkPaymentRequestOrders(params).then((res) => {
        if (res.data.status === 200) {
          this.$message({
            message: '审核完成!',
            type: 'success'
          });
          this.getPaymentOrderInfos();
          this.dialogVisible = false;
        } else {
          this.$message({
            message: '审核失败!',
            type: 'warning'
          })
        }
      })
    },
    // 驳回
    rejectOpinion() {
      this.isDialogVisible = false;
      this.dialogVisible = true;
    },
    handleRejectClick() {
      const params = {
        userId: USERID,
        order: {
          auditState: REJECT,
          id: this.rejectId,
          rejectReason: this.rejectContent
        }
      };
      if (this.rejectContent !== '') {
        checkPaymentRequestOrder(params).then((res) => {
          if (res.data.status === 200) {
            this.$message({
              message: '驳回成功!',
              type: 'success'
            });
            this.dialogVisible = false;
            this.getPaymentOrderInfos();
          } else {
            this.$message({
              message: '驳回失败!',
              type: 'warning'
            })
          }
        });
      } else {
        this.$message({
          message: '请填写驳回原因!',
          type: 'warning'
        })
      }
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleSelectionChange(val) {
      this.downloadMultipleSelection = val.map(item => item.id);
      this.multipleSelection = val.filter(item => USERID === item.createUser).map(item => item.id);
    },
    // 分页
    onPageNumberChange(res) {
      this.pageSize = res.pageSize;
      this.currentPage = res.pageNum;
      this.allChecked = false;
      this.getPaymentOrderInfos();
    },
    getPaymentOrderInfos(){
      this.tableData = [];
      this.isLoading = true;
      const params = {
        paymentTitle: this.paymentTitle,
        contractNo: this.contractNo,
        payer: this.payer,
        receiver: this.receiver,
        auditState: this.auditState,
        userId: this.userId,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      resourceWrapper.getPaymentOrderInfos(params).then(res=>{
        this.tableData=res.data.data;
        this.totalCount=res.data.total || 0;
        this.isLoading = false;
      })
    }
  },
  beforeCreate() {
    USERID = Number(localStorageHelper.getItem('USERID'));
  },
  mounted() {
    this.getPaymentOrderInfos();
  },
  components: {
    BreadCrumb,
    Pagination
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/mixin.scss';

.identify-page {
  display: flex;
  flex: 1;
  flex-direction: column;
  .top-box {
    height: 130px;
    background-color: #ffffff;
  }
  .identify-page-title {
    background-color: #ffffff;
    height: 129px;
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
          margin-right: 30px;
          margin-top: 20px;
          .text {
            width: 56px;
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
  .identify-page-table {
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
        span {
          color: #4a90e2;
        }
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
    height: 36px;
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
    padding: 20px 90px;
    border-top: 2px solid #ebebeb;
    border-bottom: 2px solid #ebebeb;
    .label-content {
      flex-shrink: 0;
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
/deep/ .el-dialog {
  width: 660px !important;
  .el-dialog__header {
    .el-dialog__title {
      font-size: 20px;
      color: #333333;
    }
    .el-dialog__headerbtn {
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
/deep/ {
  .el-loading-mask {
    min-height: 200px;
  }
}
</style>
