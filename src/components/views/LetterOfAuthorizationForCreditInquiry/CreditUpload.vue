<template>
  <div class="credit-upload">
    <bread-crumb :data="breadCrumbList" currentTitle="征信查询授权书上传"></bread-crumb>
    <div class="upload-main">
      <div class="upload-filter">
        <div class="file-type">
          <span class="text">文件类型</span>
          <el-select v-model="fileType" placeholder="请选择">
            <el-option
              v-for="item in fileTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
        <div class="expiry-date">
          <span class="text">授权书有效期</span>
          <el-date-picker
            v-model="dateTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <span class="long-time">长期有效</span>
        </div>
      </div>
      <file-upload class="file-upload-box"></file-upload>
      <div class="upload-history">
        <div class="title">上传记录</div>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            align="center"
            prop="date"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="文件名">
          </el-table-column>
          <el-table-column
            align="center"
            prop="address"
            label="上传日期"
            width="352">
          </el-table-column>
        </el-table>
        <Pagination class="history-pagination"></Pagination>
      </div>
    </div>
    <div class="real-estate-upload-footer">
      <el-button class="return-back">返回</el-button>
      <el-button class="start-identify">开始识别 </el-button>
    </div>
  </div>
</template>
<script>
import BreadCrumb from '@/components/common/BreadCrumb';
import FileUpload from '@/components/common/FileUpload';
import Pagination from "@/components/common/Pagination";

const PAGE_SIZE = 10;

export default {
  data() {
    return {
      dateTime: '',
      fileType: 'a',
      fileTypeList: [
        {name: 'a', value: 1},
        {name: 'b', value: 2},
        {name: 'c', value: 3}
      ],
      currentPage: 1,
      totalCount: 0,
      pageSize: PAGE_SIZE,
      pageSizes: [PAGE_SIZE],
      formLabelWidth: '120px',
      breadCrumbList: [
        '征信查询授权书', '文件上传'
      ],
      tableData: [{
        date: '1',
        name: '组件1235体育热图新方法付付的111.zip',
        address: '2016-05-03'
      }, {
        date: '2',
        name: '组件1235体育热图新方法付付的111.zip',
        address: '2016-05-03'
      }, {
        date: '3',
        name: '组件1235体育热图新方法付付的111.zip',
        address: '2016-05-03'
      }, {
        date: '4',
        name: '组件1235体育热图新方法付付的111.zip',
        address: '2016-05-03'
      }],
      readyDeleteItem: null
    };
  },
  methods: {
    toggleFiledList() {
      this.isShowFiledList = !this.isShowFiledList;
    },
    removeItem(item) {
      this.delDialogVisiable  = true;
      this.readyDeleteItem = item;
    },
  },
  components: {
    BreadCrumb,
    FileUpload,
    Pagination
  }
}
</script>
<style lang="scss" scoped>
@import '@/scss/mixin.scss';

.credit-upload {
  display: flex;
  flex-direction: column;
  padding-bottom: 200px;
  .bread-crumb {
    padding: 14px 20px 30px 20px;
    background-color: #ffffff;
  }
  .upload-main {
    padding: 20px 30px 0  30px;
    margin-top: 20px;
    background-color: #ffffff;
    .upload-filter {
      padding: 10px 0 20px 0;
      .text {
        display: inline-block;
        width: 90px;
        margin-right: 10px;
        text-align: right;
        font-size: 14px;
        font-weight: bold;
        color: #666666;
      }
      .file-type {
        text-align: center;
        /deep/ {
          .el-input {
            .el-input__inner {
              width: 300px;
              
            }
          }
        }
      }
      .expiry-date {
        margin-top: 20px;
        text-align: center;
        .long-time {
          margin-left: 16px;
          font-size: 16px;
          color: #4A90E2;
          cursor: pointer;
        }
      }
    }
    .file-upload-box {
      margin-bottom: 40px;
    }
    .upload-history {
      border-top: 1px solid #ebebeb;
      .title {
        margin: 30px 0 10px;
        font-size: 18px;
        font-weight: bold;
        color: #9A8B7B;
      }
      .history-pagination {
        padding: 10px 0 50px;
      }
    }
  }
  .real-estate-upload-footer {
    position: fixed;
    bottom: 0;
    left: 236px;
    width: calc(100vw - 236px);
    padding: 24px  0;
    background-color: #ffffff;
    text-align: right;
    z-index: 999;
    /deep/ {
      .el-button {
        &.return-back {
          @include cancleBtnStyle;
          margin: 0;
        }
        &.start-identify {
          @include buttonStyle;
          margin: 0 110px 0 30px;
        }
      }
    }
  }
}
</style>
