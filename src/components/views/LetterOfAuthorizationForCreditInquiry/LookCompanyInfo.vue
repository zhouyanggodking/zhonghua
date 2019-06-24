<template>
  <div class="company-info-page">
    <div class="company-info-page-title">
      <div class="top-box">
        <bread-crumb :data="breadCrumbList" :currentTitle="`${batch}批次`"></bread-crumb>
      </div>
    </div>
    <div class="company-info-page_container">
      <div class="company-details">
        <div class="company-details_header">
          <div class="title">{{dataBusInfo.entname}}</div>
          <div class="status">{{dataBusInfo.entstatus}}</div>
        </div>
        <div class="company-details_content">
          <el-row class="item" :gutter="10" v-for="(item,index) in companyInfoItems" :key="index">
            <el-col class="item-title" :span="6">
              <div>{{item.value}}</div>
            </el-col>
            <el-col class="item_num" :span="18">
              <div class="bg-purple">{{dataBusInfo[item.key]}}</div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="license-info">
        <div class="title">营业执照信息</div>
        <div class="content">
          <div class="content_item">
            <div class="item_title">企业类型:</div>
            <div class="item_content">{{dataBusInfo.enttype}}</div>
          </div>
          <div class="content_item">
            <div class="item_title">营业状态:</div>
            <div class="item_content">{{dataBusInfo.entstatus}}</div>
          </div>
          <div class="content_item">
            <div class="item_title">注册号:</div>
            <div class="item_content">{{dataBusInfo.regno}}</div>
          </div>
          <div class="content_item">
            <div class="item_title">注册资本:</div>
            <div class="item_content">{{dataBusInfo.regcap}} (万元)</div>
          </div>
          <div class="content_item">
            <div class="item_title">所属行业:</div>
            <div class="item_content">{{dataBusInfo.industryconame}}</div>
          </div>
          <div class="content_item">
            <div class="item_title">营业期限:</div>
            <div class="item_content">{{dataBusInfo.opto}}</div>
          </div>
          <div class="content_item">
            <div class="item_title">核准日期:</div>
            <div class="item_content">{{dataBusInfo.apprdate}}</div>
          </div>
          <div class="content_item">
            <div class="item_title">公司地址:</div>
            <div class="item_content">{{dataBusInfo.dom}}</div>
          </div>
          <div class="content_item">
            <div class="item_title">经营范围:</div>
            <div class="item_content">{{dataBusInfo.zsopscope}}</div>
          </div>
        </div>
      </div>
      <div class="shareholders-info">
        <div class="title">股东及出资信息</div>
        <div class="content">
          <el-table :data="dataBusInfo.estateCompanyShareholders" style="width: 100%">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="shaname" label="股东名称" width="180"></el-table-column>
            <el-table-column prop="invtype" label="股东类型" width="180"></el-table-column>
            <el-table-column prop="subconam" label="认缴份额(万元)">
              <template slot-scope="scope">
                {{formatMoney(scope.row.subconam)}}
              </template>
            </el-table-column>
            <el-table-column prop="funderatio" label="出资比例"></el-table-column>
            <el-table-column prop="condate" label="出资日期"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="go-back-btn">
          <el-button class="cancel-btn" @click="goBack">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumb from "@/components/common/BreadCrumb";
import { getDatabusMsg } from "@/rest/letterOfAuthorizationElecApi";
import { formatMoney } from '@/helpers/moneyHelper';
import localStorageHelper from '@/helpers/localStorageHelper';

let USERID = null;

export default {
  data() {
    return {
      companyName: '',
      companyInfoItems: [
        {key: 'creditcode', value: '统一社会信用代码:'},
        {key: 'frname', value: '法定代表人:'},
        {key: 'regorg', value: '登记机关:'},
        {key: 'esdate', value: '成立日期:'}
      ],
      batch: "",
      breadCrumbList: [
        "征信查询授权书",
        "识别结果",
        "电子版批次信息",
        "电子版批次详情"
      ],
      dataBusInfo: {}
    };
  },
  methods: {
    formatMoney(param) {
      return formatMoney(param);
    },
    goBack(){
      this.$router.go(-1);
    },
    fetchDataBusData() {
      const params = {
        companyName: this.companyName,
        userId: USERID
      };
      getDatabusMsg(params)
      .then(res => {
        this.dataBusInfo = res.info;
      })
    }
  },
  beforeCreate() {
    USERID = Number(localStorageHelper.getItem('USERID'));
  },
  mounted() {
    this.companyName = this.$route.query.companyName;
    this.batch = this.$route.query.batch;
    this.fetchDataBusData();
  },
  components: {
    BreadCrumb
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/mixin.scss';

.company-info-page {
  .top-box {
    height: 130px;
    background-color: #ffffff;
    .bread-crumb {
      padding: 14px 20px 0px;
    }
  }
  .company-info-page-title {
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
  .company-info-page_container {
    background: #fff;
    margin-top: 20px;
    padding: 20px 30px;
    .company-details {
      padding: 30px 50px;
      border: 1px solid #ebebeb;
      .company-details_header {
        display: flex;
        align-items: center;
        .title {
          margin-right: 10px;
          font-family: PingFangSC-Semibold;
          font-size: 20px;
          color: #333333;
        }
        .status {
          padding: 0px 10px;
          height: 20px;
          line-height: 20px;
          font-family: PingFangSC-Semibold;
          font-size: 14px;
          color: #107eff;
          background: rgba(74, 144, 226, 0.3);
          border-radius: 2px;
        }
      }
      .company-details_content {
        margin-top: 15px;
        padding: 20px 40px;
        background: url('../../../assets/imgs/zhiluopan.png') #fafafa no-repeat;
        background-position: center;
        .item {
          margin-bottom: 10px;
          font-size: 14px;
          color: #333333;
          /deep/ {
            .el-col {
              &.item-title {
                display: flex;
                // margin-right: 30px;
                justify-content: flex-end;
                font-size: 14px;
                color: #666666;
              }
              &.item_num {
                padding-left: 20px !important;
                font-size: 14px;
                color: #333;
              }
            }
          }
        }
        .item:last-child {
          margin-bottom: 0;
        }
      }
    }
    .license-info {
      margin-top: 30px;
      .title {
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        color: #796f65;
      }
      .content {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
        padding: 30px 50px;
        border: 1px solid #ebebeb;
        .content_item {
          display: flex;
          margin-right: 100px;
          padding: 10px 0px;
        }
        .item_title {
          flex-shrink: 0;
          width: 60px;
          margin-right: 20px;
          font-family: PingFangSC-Semibold;
          font-size: 14px;
          color: #666666;
          text-align: right;
        }
        .item_content {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #333333;
        }
      }
    }
    .shareholders-info {
      margin-top: 30px;
      .title {
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        color: #333333;
      }
      .content {
        padding: 0;
        /deep/ .el-table {
          .el-table__header-wrapper {
            tr {
              th {
                background: #fafafa;
                border-right: 1px solid #ebebeb;
                border-bottom: 1px solid #ebebeb;
                .cell {
                  font-family: PingFangSC-Semibold;
                  font-size: 14px;
                  color: #333333;
                  text-align: center;
                }
              }
            }
          }
          .el-table__body-wrapper {
            tr {
              td {
                border-right: 1px solid #ebebeb;
                border-bottom: 1px solid #ebebeb;
                .cell {
                  font-family: PingFangSC-Regular;
                  font-size: 14px;
                  color: #333333;
                  text-align: center;
                }
              }
            }
          }
        }
      }
    }
    .go-back-btn{
        display: flex;
        justify-content: flex-end;
        margin-top: 30px;
        margin-bottom: 40px;
        .cancel-btn {
          @include cancelBtnStyle;
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
</style>
