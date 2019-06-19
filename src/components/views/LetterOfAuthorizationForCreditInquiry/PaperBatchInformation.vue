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
          <div class="search-condition_input_item date-picker">
            <div class="text">上传日期</div>
            <date-range @change="onDateRangeChange"></date-range>
          </div>
          <div class="search-condition_input_item">
            <div class="text">审核状态</div>
            <el-select v-model="state" placeholder="请选择">
              <el-option v-for="(item, index) in checkStatusList" :key="index" :label="item.name" :value="item.id"></el-option>
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
          <el-table-column prop="applyDate" label="申请日期" width="120"></el-table-column>
          <el-table-column prop="submitOnApply" label="申请日提交" width="120"></el-table-column>
          <el-table-column prop="submitNotOnApply" label="非申请日提交" show-overflow-tooltip></el-table-column>
          <el-table-column prop="uploadFileNum" label="上传文件数量" show-overflow-tooltip></el-table-column>
          <el-table-column prop="state" label="状态" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.state === '0'">驳回</span>
              <span v-else-if="scope.row.state === '1'" style="color: #417505;">已审核</span>
              <span v-else-if="scope.row.state === '2'" style="color: #F5A623;">未审核</span>
            </template>
          </el-table-column>
          <el-table-column prop="createUser" label="上传人员" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createTime" label="上传日期" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="80" fixed="right">
            <template slot-scope="scope">
              <el-button
                class="table-btn"
                size="mini"
                @click="tableItemDetails(scope.row)"
              >详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-footer">
        <Pagination :totalCount="totalCount" @change="onPageNumberChange"></Pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {getEstateElecAuthorizationSummaryInfos} from "@/rest/letterOfAuthorizationElecApi";
import BreadCrumb from "@/components/common/BreadCrumb";
import DateRange from "@/components/common/DateRange";
import Pagination from "@/components/common/Pagination";
import {global_upload} from "@/global/global";
import {formatQuery} from '@/helpers/formatGetParams';

const PAGE_SIZE = 10;

export default {
  data() {
    return {
      allChecked: false,
      isLoading: false,
      applyDate:'',
      startTime: '',
      endTime: '',
      elecOrFile: 1,
      rejectContent: "",
      collector: "",
      state: "",
      currentPage: 1,
      totalCount: 0,
      currentTitle: "纸质版授权书批次识别结果",
      breadCrumbList: ['首页', '征信查询授权书', '识别结果', '纸质版批次详情'],
      pageSize: PAGE_SIZE,
      pageSizes: [PAGE_SIZE],
      checkStatusList: [
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
      tableData: []
    };
  },
  watch: {
    'allChecked'() {
      this.toggleSelection();
    }
  },
  methods: {
    toggleSelection() {
      if (this.allChecked) {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleAllSelection();
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    onDateRangeChange(res) {
      this.startTime = res.startTime;
      this.endTime = res.endTime;
    },
    goBack() {},
    search() {
      this.currentPage = 1;
      this.fetchTableData();
    },
    tableDownload() {
      if (this.multipleSelection.length) {
        const params = {
          ids: this.multipleSelection,
          userId: 1,
          elecOrFile: this.elecOrFile
        };
        window.open(`${global_upload}/auth/estateAuthorizationSummaryController/downLoadExcelsBySummaryId
${formatQuery(params)}`,'_parent');
      } else {
        this.$message({
          message: '请勾选要下载的对象!',
          type: 'warning'
        })
      }
    },
    tableItemDetails(row) {
      this.$router.push({ name: "paper-batch-information-details", query: { id: row.id } });
    },
    exportExcel() {
      const params = {
        startTime: this.startTime,
        endTime: this.endTime,
        state: this.state,
        userId: 1,
        elecOrFile: this.elecOrFile
      }
      window.open(`${global_upload}/auth/estateAuthorizationSummaryController/exportToExcel
${formatQuery(params)}`,'_parent');
    },
    handleSelectionChange(val) {
      this.multipleSelection = val.map(item => item.id);
    },
    // 分页
    onPageNumberChange(res) {
      this.pageSize = res.pageSize;
      this.currentPage = res.pageNum;
      this.fetchTableData();
    },
    fetchTableData() {
      this.isLoading = true;
      const params = {
        startTime: this.startTime,
        endTime: this.endTime,
        state: this.state,
        userId: 1,
        elecOrFile: this.elecOrFile,
        pageSize: this.pageSize,
        pageNum: this.currentPage
      };
      getEstateElecAuthorizationSummaryInfos(params)
      .then(res => {
        this.tableData = res.data.data;
        this.totalCount = res.data.total;
        this.isLoading = false;
      })
    }
  },
  mounted() {
    this.fetchTableData();
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

.identify-page {
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
            flex-shrink: 0;
            width: 80px;
            margin-right: 10px;
            text-align: right;
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
        .date-picker{
          width: 430px;
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
              .el-checkbox__input {
                display: none;
              }
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
    height: 123px;
    border-top: 2px solid #ebebeb;
    border-bottom: 2px solid #ebebeb;
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
/deep/ .el-table__fixed-right::before,
.el-table__fixed::before {
  display: none;
  height: 0;
}
</style>
