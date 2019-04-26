<template>
  <div class="identify-result-detail-page">
    <div class="identify-page-title">
      <div class="top-box">
        <bread-crumb :data="breadCrumbList" :currentTitle="currentTitle"></bread-crumb>
      </div>
    </div>
    <div class="identify-result-detail-page-content">
      <div class="header">
        <div class="title">付款申请</div>
        <div class="look-origin-btn">查看原件</div>
      </div>
      <div class="content-table">
        <el-row>
          <el-col :span="6">
            <div class="grid-content column1">付款主题：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content grid-result">金茂绿地有限公司</div>
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
            <div class="grid-content grid-result">111111111111111</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content column1">合同编号：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content grid-result">222222222</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content column1">付款单位：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content grid-result">222222222</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content column1">收款单位：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content grid-result">我我我我我我我</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content column1">合同动态金额：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content grid-result">111111111111111</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content column1">累计已付金额：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content grid-result">134566</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content column1 red-text">本次应付金额（大写）：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content grid-result red-text">壹贰叁肆伍陆柒捌玖零</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content column1">应付未付金额：</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content grid-result">134566</div>
          </el-col>
        </el-row>
      </div>
      <div class="divide-line"></div>
      <div class="invoice-table">
        <div class="invoice-table_header">
          <div class="title">发票信息</div>
          <div class="invoice-details">本次使用金额：</div>
          <div class="invoice-num red-text">发票数量：</div>
        </div>
        <div class="invoice-table_content">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column label="发票号码" width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="发票代码" width="120"></el-table-column>
            <el-table-column prop="address" label="购买方" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="销售方" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="开票日期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="金额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="已用金额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="本次使用金额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="是否盖章" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="凭证联" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="发票验真" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  class="table-btn"
                  size="mini"
                  @click="tableItemDetails(scope.$index, scope.row)"
                >查看原件</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="divide-line"></div>
      <div class="review-opinion">
        <div class="review-opinion_header">
          <div class="title">付款申请</div>
        </div>
        <div class="review-opinion_content">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="textarea"></el-input>
        </div>
      </div>
      <div class="divide-line"></div>
      <div class="review-btn-group">
        <el-button class="cancel-btn">取消</el-button>
        <el-button>审核通过</el-button>
        <el-button>驳回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumb from "@/components/common/BreadCrumb";

export default {
  data() {
    return {
      tableData: [],
      textarea: "",
      breadCrumbList: ["首页", "资产识别比对", "比对结果"],
      currentTitle: "付款公司名称-合同编号-付款主题"
    };
  },
  methods:{
      tableItemDetails(){
          this.$router.push({name:'identify-payment-request-origin'})
      }
  },
  components: {
    BreadCrumb
  }
};
</script>

<style lang="scss" scoped>
.identify-result-detail-page {
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
    border-color: #D9D9D9;
  }
  &:active{
      border-color: #D9D9D9;
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
  color: #d0021b;
}
.divide-line {
  margin: 30px 0;
  height: 1px;
  background: #ebebeb;
}
</style>
