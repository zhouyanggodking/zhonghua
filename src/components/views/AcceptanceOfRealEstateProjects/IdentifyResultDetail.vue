<template>
  <div class="identify-result-detail-page">
    <div class="identify-page-title">
      <div class="top-box">
        <bread-crumb :data="breadCrumbList" :currentTitle="currentTitle"></bread-crumb>
      </div>
      <div class="export-excel" @click="exportExcel">导出Excel</div>
    </div>
    <div class="identify-result-detail-page-content">
      <div class="header">
        <div class="title">付款申请</div>
        <div class="look-origin-btn" @click="lookPayRequestOrigin">查看原件</div>
      </div>
      <div class="content-table">
        <el-row>
          <el-col :span="6">
            <div class="grid-content column1">付款主题：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content grid-result">{{data.paymentTitle}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content column1"></div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content grid-result"></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content column1">合同名称：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content grid-result">{{data.contractName}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content column1">合同编号：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content grid-result">{{data.contractNo}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content column1">付款单位：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content grid-result">{{data.payer}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content column1">收款单位：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content grid-result">{{data.receiver}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content column1">合同动态金额：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content grid-result">{{data.contractDynamicAmount}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content column1">累计已付金额：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content grid-result">{{data.acountPayable}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content column1" :class="[data.paidAmount!==data.unpaidAmoun ? 'red-text' :'green-text']">本次应付金额（大写）：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content grid-result"  :class="[data.paidAmount!==data.unpaidAmoun ? 'red-text' :'green-text']">{{data.paidAmount}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content column1" :class="[data.paidAmount!==data.unpaidAmoun ? 'red-text' :'green-text']">应付未付金额：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content grid-result" :class="[data.paidAmount!==data.unpaidAmoun ? 'red-text' :'green-text']">{{data.unpaidAmount}}</div>
          </el-col>
        </el-row>
      </div>
      <div class="divide-line"></div>
      <div class="invoice-table">
        <div class="invoice-table_header">
          <div class="title">发票信息</div>
          <div class="invoice-details">本次使用金额：{{data.invoiceTotalPrice}}</div>
          <!-- <div class="invoice-num red-text">发票数量：</div> -->
        </div>
        <div class="invoice-table_content">
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
            <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
            <el-table-column label="发票号码" prop="invoiceNo" width="120">
            </el-table-column>
            <el-table-column prop="invoiceNo" label="发票代码" width="120"></el-table-column>
            <el-table-column prop="buyyerName" label="购买方" show-overflow-tooltip></el-table-column>
            <el-table-column prop="salerName" label="销售方" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="开票日期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="finalPrice" label="金额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="usedPrice" label="已用金额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="usePrice" label="本次使用金额" show-overflow-tooltip width="120">
              <template slot-scope="scope">
                <el-input v-model="scope.row.finalPrice"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="stamped" label="是否盖章" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.stamped === 0">否</span>
                <span v-else-if="scope.row.stamped === 1">是</span>
              </template>
            </el-table-column>
            <el-table-column prop="invoiceType" label="凭证联" show-overflow-tooltip></el-table-column>
            <el-table-column prop="verification" label="发票验真" show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.verification === 0">未通过</span>
                <span v-else-if="scope.row.verification === 1">通过</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button
                  class="table-btn"
                  size="mini"
                  @click="checkInvoiceInfo(scope.row)"
                >查看原件</el-button>
              </template>
            </el-table-column>
          </el-table>
          <Pagination class="invoices-pager" :totalCount="totalCount" @change="onPageNumberChange"></Pagination>
        </div>
      </div>
      <div class="divide-line"></div>
      <div class="review-opinion">
        <div class="review-opinion_header">
          <div class="title">付款申请</div>
        </div>
        <div class="review-opinion_content">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="data.rejectReason"></el-input>
        </div>
      </div>
      <div class="divide-line"></div>
      <div class="review-btn-group">
        <el-button class="cancel-btn" @click="previous">返回</el-button>
        <el-button :disabled="data.state === 1" @click="reviewPass">审核通过</el-button>
        <el-button :disabled="data.state === 0" @click="reviewReject">驳回</el-button>
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
        <div class="dialog-content_icon" :class="{'review-icon':dialogHintOperate==='审核通过','reject-icon':dialogHintOperate==='驳回'}"
></div>
        <div class="dialog-content_text">{{dialogHintText}}</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-btn" @click="isDialogVisible = false">取消</el-button>
        <el-button
          v-if="dialogHintOperate==='驳回'"
          type="primary"
          @click="rejectOpinionOperate"
        >{{dialogHintOperate}}</el-button>
        <el-button
          v-if="dialogHintOperate==='审核通过'"
          type="primary"
          @click="reviewPassOpearte"
        >{{dialogHintOperate}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {checkPaymentRequestOrder} from "@/rest/realEstateUploadApi";
import BreadCrumb from "@/components/common/BreadCrumb";
import Pagination from "@/components/common/Pagination";
import resourceWrapper from "@/rest/resourceWrapper";
import {global_} from '@/global/global';

const CHECK = 1;
const REJECT = 0;
const PAGESIZE = 10;

export default {
  data() {
    return {
      checkBtnToggle: false,
      pageSize: PAGESIZE,
      currentPage: 1,
      totalCount: 0,
      tableData: [],
      id:1,
      data:{},
      textarea: "",
      isDialogVisible:false,
      dialogVisible:false,
      dialogTitle:'',
      dialogHintText: "请确认是否驳回",
      dialogHintOperate: "驳回",
      rejectContent:'',
      breadCrumbList: ["首页", "资产识别比对", "识别结果"],
      currentTitle: "",
      paymentOrderId: ''
    };
  },
  methods: {
    checkInvoiceInfo(row) {
      this.$router.push({ name: "identify-invoice-origin", query: { id: row.id, paymentOrderId: this.paymentOrderId, title: this.data.paymentTitle, payer: this.data.payer, contractNo: this.data.contractNo}});
    },
    exportExcel(){
      window.open(`${global_}/estate/estatePaymentRequestOrderController/exportPaymentRequestOrderToExcel?userId=1&id=1`,'_parent');
    },
    reviewPass(){
        this.isDialogVisible = true;
      this.dialogHintText = "请确认是否审核通过";
      this.dialogHintOperate = "审核通过";
    },
    reviewReject(){
    this.isDialogVisible = true;
      this.dialogHintText = "请确认是否驳回";
      this.dialogHintOperate = "驳回";
    },
    rejectOpinionOperate(){
      this.data.state = 0;
      const params = {
        id: this.data.id,
        state: REJECT,
        userId: 1,
        rejectReason: this.data.rejectReason
      };
      checkPaymentRequestOrder(params).then(() => {
        this.$message({
          message: '驳回成功',
          type: 'success'
        });
        this.isDialogVisible = false;
      },() => {
        this.$message({
          message: '驳回失败',
          type: 'warning'
        })
      });
    },
    reviewPassOpearte(){
      this.data.state = 1;
      const params = {
        id: this.data.id,
        state: CHECK,
        userId: 1,
        rejectReason: ''
      };
      checkPaymentRequestOrder(params).then(() => {
        this.$message({
          message: '审批成功',
          type: 'success'
        });
        this.isDialogVisible = false;
        this.data.rejectReason = '';
      },() => {
        this.$message({
          message: '审批失败',
          type: 'warning'
        })
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    previous(){
      this.$router.back(-1);
    },
    lookPayRequestOrigin() {
      this.$router.push({ name: "identify-payment-request-origin", query: { id: this.paymentOrderId }});
    },
    getPaymentDetailData(){
      const params = {
        userId: 1,
        id: this.paymentOrderId
      }
      resourceWrapper.getPaymentOrderDetail(params).then(res => {
          this.data=res.data.order;
          this.tableData=res.data.estateInvoices;
          this.currentTitle = `${res.data.order.payer}-${res.data.order.contractNo}-${res.data.order.paymentTitle}`;
      })
    },
    getInvoicesTableData() {
      const params = {
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        paymentRequestOrderId: this.paymentOrderId,
        userId: 1
      }
      resourceWrapper.getInvoicesByPaymentOrder(params).then(res => {
        this.tableData = res.data.data;
        this.totalCount = res.data.total;
      })
    },
    onPageNumberChange(res) {
      this.pageSize = res.pageSize;
      this.currentPage = res.pageNum;
      this.getInvoicesTableData();
    },
  },
  mounted(){
    this.paymentOrderId=this.$route.query.id;
    this.getPaymentDetailData();
    this.getInvoicesTableData();
  },
  components: {
    BreadCrumb,
    Pagination
  }
};
</script>

<style lang="scss" scoped>
.identify-result-detail-page {
  .identify-page-title {
    position: relative;
    .export-excel {
      position: absolute;
      width: 135px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      right: 100px;
      bottom: 30px;
      font-size: 16px;
      color: #4a90e2;
      background: #ffffff;
      border: 1px solid #4a90e2;
      border-radius: 4px;
      cursor: pointer;
    }
  }
  .top-box {
    height: 130px;
    background-color: #ffffff;
    .bread-crumb {
      padding: 14px 20px 0px;
    }
  }
  .identify-result-detail-page-content {
    margin-top: 30px;
    background: #fff;
    padding: 30px;
    .header {
      display: flex;
      justify-content: space-between;

      .look-origin-btn {
        font-size: 16px;
        color: #4a90e2;
        text-align: left;
        cursor: pointer;
      }
    }
    .content-table {
      margin-top: 10px;
      border: 1px solid #ebebeb;
      padding: 30px 30px 10px 30px;
      .el-row {
        margin-bottom: 20px;
        .el-col {
          .column1 {
            display: flex;
            justify-content: flex-end;
          }
        }
        .grid-content {
          font-family: PingFangSC-Semibold;
          font-size: 14px;
          color: #666666;
        }
        .grid-result {
          padding-left: 30px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
        }
      }
    }
    .invoice-table {
      .invoice-table_header {
        display: flex;
        align-items: center;
        .invoice-details {
          margin-left: 50px;
          font-family: PingFangSC-Semibold;
          font-size: 14px;
          color: #666666;
        }
        .invoice-num {
          margin-left: 70px;
          font-family: PingFangSC-Semibold;
          font-size: 14px;
        }
      }
      .invoice-table_content {
        margin-top: 10px;
        .invoices-pager {
          margin-top: 25px;
        }
        /deep/ .el-table {
          .el-table__header-wrapper {
            .el-table__header {
              tr {
                border-radius: 4px 4px 0px 0px;
                th {
                  background: #fafafa;
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
                .el-table_1_column_2 {
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
    }
    .review-opinion {
      .review-opinion_content {
        margin-top: 10px;
        padding: 30px 20px;
        background: #fafafa;
        .el-textarea {
          /deep/ .el-textarea__inner {
            border-radius: 0;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
          }
        }
      }
    }
    .review-btn-group {
      display: flex;
      justify-content: flex-end;
      .el-button {
        margin-left: 30px;
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
  &.is-disabled {
    background-color: #d9d9d9;
    border-color: #d9d9d9;
  }
}
.el-button:active {
  border-color: #c1b071;
  color: #fff;
}
/deep/ .cancel-btn {
  background: #ffffff;
  border: 1px solid #d9d9d9;
  span {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #666666 !important;
  }
  &:hover {
    background-color: #fff;
    border-color: #c1b071;
  }
  &:active {
    border-color: #c1b071;
  }
}
.btn {
  margin-right: 30px;
}
.el-button + .el-button {
  margin-left: 0;
}
.title {
  font-family: PingFangSC-Semibold;
  font-size: 18px;
  color: #9a8b7b;
}
.red-text {
  color: #d0021b !important;
}
.green-text{
    color: green !important;
}
.divide-line {
  margin: 30px 0;
  height: 1px;
  background: #ebebeb;
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
    height: 36px;
    background: red;
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
</style>
