<template>
  <div class="identify-page">
    <div class="identify-page-title">
      <div class="uploadTitle">
        <i class="el-icon-arrow-left backBorder" @click="goBack"></i>
        <router-link class="backToIndex" to="/home">首页/资产识别比对</router-link>/比对结果
      </div>
      <div class="title-num">识别结果</div>
    </div>
    <div class="identify-page-search">
      <div class="identify-page_search_condition">
        <div class="search-condition_input">
          <div class="search-condition_input_item">
            <div class="text">付款主题</div>
            <el-input v-model="payTheme" placeholder="请输入内容"></el-input>
          </div>
          <div class="search-condition_input_item">
            <div class="text">合同编号</div>
            <el-input v-model="contractNum" placeholder="请输入内容"></el-input>
          </div>
          <div class="search-condition_input_item">
            <div class="text">付款方</div>
            <el-input v-model="payer" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="search-condition_input second">
          <div class="search-condition_input_item">
            <div class="text">收款方</div>
            <el-input v-model="collector" placeholder="请输入内容"></el-input>
          </div>
          <div class="search-condition_input_item">
            <div class="text">审核状态</div>
            <el-select v-model="reviewStatus" placeholder="请选择">
              <el-option v-for="item in reviewStatusList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </div>
          <el-button class="search-btn" @click="search">查询</el-button>
        </div>
      </div>
    </div>
    <div class="identify-page-table">
      <div class="identify-page-table_btn">
        <el-checkbox v-model="checked">全选</el-checkbox>
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
          <el-table-column type="selection" width="30"></el-table-column>
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column label="付款主题" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="合同编号" width="120"></el-table-column>
          <el-table-column prop="address" label="付款单位" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="收款单位" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="合同动态金额" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="累计已付金额" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                class="table-btn"
                size="mini"
                @click="tableItemDetails(scope.$index, scope.row)"
              >详情</el-button>
              <el-button
                class="table-btn"
                size="mini"
                type="danger"
                @click="tableItemReview(scope.$index, scope.row)"
              >审核</el-button>
              <el-button
                class="table-btn"
                size="mini"
                type="danger"
                @click="tableItemRejected(scope.$index, scope.row)"
              >驳回</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-footer">
        <div class="row pager">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="totalCount"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const PAGE_SIZE = 10;

export default {
  data() {
    return {
      payTheme: "",
      contractNum: "",
      payer: "",
      collector: "",
      reviewStatus: "全部",
      multipleSelection: [],
      currentPage:1,
      totalCount:0,
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
      ]
    };
  },
  methods: {
    goBack() {},
    search() {},
    tableDownload() {},
    batchReview() {},
    tableItemDetails() {},
    tableItemReview() {},
    tableItemRejected() {},
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
    },
    handleCurrentChange(currPage) {
      this.currentPage = currPage;
    },
  }
};
</script>

<style lang="scss" scoped>
.identify-page {
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

    .title-num {
      font-family: "PingFangSC-Semibold";
      font-size: 20px;
      color: #333333;
      margin-top: 33px;
      margin-left: 30px;
    }
  }
  .identify-page-search {
    height: 160px;
    background: #fff;
    margin-top: 20px;
    .identify-page_search_condition {
      display: flex;
      flex-direction: column;
      padding-top: 30px;
      margin-left: 30px;
      .search-condition_input {
        display: flex;
        .search-condition_input_item {
          display: inline-flex;
          align-items: center;
          width: 266px;
          margin-right: 30px;
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
        }
      }
      .second {
        margin-top: 20px;
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
        font-family: "PingFangSC-Semibold";
      }
    }
    .identify-page-table_content {
      margin-top: 20px;
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
    .table-footer{
      margin-top: 25px;
      .pager{
       /deep/ .el-pagination{
          display: flex;
          justify-content: flex-end;
          align-items: center;
          position: relative;
          .el-pagination__total{
            position: absolute;
            left: 0;
          }
          .el-pager{
            .number{
              font-size: 12px;
            }
            .active{
              color: #C1B071;
            }
          }
          .el-pagination button{
            color: #C1B071;
          }
          .el-pagination__jump{
            font-size: 12px;
          }
          .el-pagination__editor.el-input .el-input__inner{

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
</style>
