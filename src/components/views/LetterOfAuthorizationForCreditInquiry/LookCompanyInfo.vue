<template>
  <div class="company-info-page">
    <div class="company-info-page-title">
      <div class="top-box">
        <bread-crumb :data="breadCrumbList" :currentTitle="currentTitle"></bread-crumb>
      </div>
    </div>
    <div class="company-info-page_container">
      <div class="company-details">
        <div class="company-details_header">
          <div class="title">XXXXXXX有限公司</div>
          <div class="status">开业</div>
        </div>
        <div class="company-details_content">
          <el-row class="item" :gutter="10" v-for="(item,index) in companyInfoItems" :key="index">
            <el-col class="item-title" :span="6">
              <div>{{item}}</div>
            </el-col>
            <el-col class="item_num" :span="18">
              <div class="bg-purple"></div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="license-info">
        <div class="title">营业执照信息</div>
        <div class="content">
          <div class="content_item">
            <div class="item_title">企业类型：</div>
            <div class="item_content">dasdadasdasdasadasdads</div>
          </div>
          <div class="content_item">
            <div class="item_title">企业类型：</div>
            <div class="item_content"></div>
          </div>
          <div class="content_item">
            <div class="item_title">企业类型：</div>
            <div class="item_content"></div>
          </div>
          <div class="content_item">
            <div class="item_title">企业类型：</div>
            <div class="item_content"></div>
          </div>
        </div>
      </div>
      <div class="shareholders-info">
        <div class="title">股东及出资信息</div>
        <div class="content">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
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

export default {
  data() {
    return {
      companyInfoItems: [
        "统一社会信用代码：",
        "法定代表人：",
        "登记机关：",
        "成立日期："
      ],
      currentTitle: "20190404批次-金茂",
      breadCrumbList: [
        "征信查询授权书识别结果",
        "电子版批次信息",
        "电子版批次详情",
        "识别详情"
      ],
      reviewStatusList: ["全部", "未审核", "已审核", "审核中"],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
      goBack(){
          this.$router.go(-1);
      }
  },
  components: {
    BreadCrumb
  }
};
</script>

<style lang="scss" scoped>
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
        background: #fafafa;
        .item {
          margin-bottom: 10px;
          .item-title {
            display: flex;
            justify-content: flex-end;
            font-size: 14px;
            color: #666666;
          }
          .item-num {
            font-size: 14px;
            color: #333;
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
        }
        .item_title {
          font-family: PingFangSC-Semibold;
          font-size: 14px;
          color: #666666;
          margin-right: 30px;
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
        color: #9a8b7b;
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
    border-color: #d9d9d9;
  }
  &:active {
    border-color: #d9d9d9;
  }
}
.el-table__fixed-right::before,
.el-table__fixed::before {
  display: none;
}
</style>
