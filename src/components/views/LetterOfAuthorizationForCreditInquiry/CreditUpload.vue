<template>
  <div class="credit-upload">
    <bread-crumb :data="breadCrumbList" currentTitle="征信查询授权书上传"></bread-crumb>
    <div class="upload-main">
      <div class="upload-filter">
        <div class="file-type">
          <span class="text">文件类型</span>
          <el-select v-model="businessTypeId" @change="filtypeChange" placeholder="请选择">
            <el-option label="征信授权(电子)" value="3"></el-option>
            <el-option label="征信授权(纸质)" value="4"></el-option>
          </el-select>
        </div>
        <div class="expiry-date">
          <span class="text">授权书有效期</span>
          <el-date-picker
            v-model="authorizationValidDate"
            type="date"
            value-format="yyyy-MM-dd"
            v-if="!isLongTime"
            placeholder="选择日期">
          </el-date-picker>
          <el-date-picker
            v-else
            disabled
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
          <el-checkbox class="long-time" v-model="isLongTime">长期有效</el-checkbox>
        </div>
      </div>
      <div class="file-upload-example" v-if="disableUpload" @click="beforeUpload">
        <img src="../../../assets/imgs/upload-icon.svg" alt="">
        <div class="el-upload__text">点击选择或将文件拖拽到这里上传</div>
        <div class="accept-type">支持.zip/.rar/.7z格式</div>
      </div>
      <file-upload @change="uploadSuccess" :timeStamp="authorizationValidDate" :fileType="businessTypeId" v-else class="file-upload-box"></file-upload>
      <div class="upload-history">
        <div class="title">上传记录</div>
        <el-table
          v-loading="isLoading"
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            align="center"
            label="文件名"
            prop="filename">
          </el-table-column>
          <el-table-column
            align="center"
            label="识别状态"
            prop="status">
            <template slot-scope="scope">
              <!-- <span v-if="scope.row.status === 0" style="color: #4A90E2;">识别中</span>
              <span v-else-if="scope.row.status === null" style="color: #C0C4CC;">未识别</span>
              <span v-else-if="scope.row.status === 2" style="color: #417505;">识别成功</span>
              <span v-else-if="scope.row.status === -1" style="color: #D0021B;">识别失败</span> -->
              
              <span v-if="scope.row.status === 1" style="color: #4A90E2;">识别中</span>
              <span v-else-if="scope.row.status === 0" style="color: #C0C4CC;">识别中</span>
              <span v-else-if="scope.row.status === 2" style="color: #417505;">识别成功</span>
              <span v-else-if="scope.row.status === -1" style="color: #D0021B;">识别失败</span>
              <span v-else-if="scope.row.status === -2" style="color: #D0021B;">上传失败</span>
              <span v-else-if="scope.row.status === -3" style="color: #D0021B;">文件错误</span>
              <span v-else-if="scope.row.status === null" style="color: #C0C4CC;">未识别</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="审核状态"
            prop="audit_status">
            <template slot-scope="scope">
              <span v-if="scope.row.auditStatus === 0">未识别</span>
              <span v-else-if="scope.row.auditStatus === 1" style="color: #417505;">已审核</span>
              <span v-else-if="scope.row.auditStatus === 2" style="color: #4A90E2;">未审核</span>
              <span v-else-if="scope.row.auditStatus === 3" style="color: #4A90E2;">审核中</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="上传时间"
            prop="uploadTime">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="提交任务中" :disabled="scope.row.status !== null" @click="handleTableStartOcrJob(scope.row)">提交</el-button>
            </template>
          </el-table-column>
        </el-table>
        <Pagination @change="onHistoryPageNumChange" :totalCount="totalCount" class="history-pagination"></Pagination>
      </div>
    </div>
    <div class="real-estate-upload-footer">
      <el-button class="return-back" @click="goBack">返回</el-button>
      <el-button class="start-identify" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="提交任务中" :disabled="isStartOcrJob" @click="handleOcrJobClick">提交任务 </el-button>
    </div>
  </div>
</template>
<script>
import BreadCrumb from '@/components/common/BreadCrumb';
import FileUpload from '@/components/common/FileUpload';
import Pagination from "@/components/common/Pagination";
import {getUploadHistory, startOcrJob} from '@/rest/letterOfAuthorizationElecApi';
import {dateFormat} from '@/helpers/dateHelper';
import localStorageHelper from '@/helpers/localStorageHelper';

let USERID = null;
const PAGE_SIZE = 10;

export default {
  data() {
    return {
      fullscreenLoading: false,
      isLongTime: false,
      isLoading: false,
      disableUpload: true,
      authorizationValidDate: '',
      businessTypeId: '3',
      currentPage: 1,
      totalCount: 0,
      pageSize: PAGE_SIZE,
      pageSizes: [PAGE_SIZE],
      formLabelWidth: '120px',
      breadCrumbList: [
        '首页', '征信查询授权书', '文件上传'
      ],
      tableData: [],
      readyDeleteItem: null,
      originalFileId: '',
      isStartOcrJob: true
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    uploadSuccess(res) {
      this.isStartOcrJob = false;
      this.originalFileId = res.originalFileId;
      this.fetchHistoryList();
    },
    toggleFiledList() {
      this.isShowFiledList = !this.isShowFiledList;
    },
    filtypeChange() {
      this.disableUpload = true;
    },
    onHistoryPageNumChange(res) {
      this.pageSize = res.pageSize;
      this.currentPage = res.pageNum;
      this.fetchHistoryList();
    },
    removeItem(item) {
      this.delDialogVisiable  = true;
      this.readyDeleteItem = item;
    },
    beforeUpload() {
      if (this.businessTypeId === '') {
        this.$message({
          message: '请选择文件类型!',
          type: 'warning'
        })
      } else if (this.authorizationValidDate === '' || !this.authorizationValidDate) {
        this.$message({
          message: '请选择授权书有效期!',
          type: 'warning'
        })
      } else if (this.businessTypeId !== '' && this.authorizationValidDate && this.authorizationValidDate !== '') {
        this.disableUpload = false;
      }
    },
    fetchHistoryList() {
      this.tableData = [];
      this.isLoading = true;
      const params = {
        businessTypeId: this.businessTypeId,
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        type: 1,
        userId: USERID
      }
      getUploadHistory(params)
      .then((res) => {
        this.tableData = res.data.data;
        this.totalCount = res.data.total;
        this.isLoading = false;
      })
      
    },
    handleOcrJobClick() {
      this.startOcrJob();
    },
    handleTableStartOcrJob(row) {
      this.originalFileId = row.id;
      this.authorizationValidDate = row.authorizationValidDate;
      this.startOcrJob();
    },
    startOcrJob() {
      this.fullscreenLoading = true;
      const params = {
        userId: USERID,
        ocrJobInfo: {
          originalFileId: this.originalFileId,
          businessTypeId: this.businessTypeId,
          elecOrFile: this.businessTypeId === '3' ? 0 : 1,
          authorizationValidDate: dateFormat(this.authorizationValidDate)
        }
      };
      startOcrJob(params).then(res => {
        if (res.status === 200) {
          this.$message({
            message: '文件已提交',
            type: 'success'
          });
          this.isStartOcrJob = true;
          this.fullscreenLoading = false;
          this.fetchHistoryList();
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          });
          this.fullscreenLoading = false;
          this.isStartOcrJob = true;
          this.fetchHistoryList();
        }
      }, err => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    }
  },
  watch: {
    businessTypeId(newVal) {
      this.businessTypeId = newVal;
      this.fetchHistoryList();
      if(newVal !== '' && this.authorizationValidDate !== '' && this.authorizationValidDate) {
        this.disableUpload = false
      } else {
        this.disableUpload = true
      }
    },
    authorizationValidDate(newVal) {
      if(newVal !== '' && this.businessTypeId !== '') {
        this.disableUpload = false
      } else {
        this.disableUpload = true
      }
    },
    isLongTime(newVal) {
      if(newVal) {
        this.authorizationValidDate = '2030-01-01';
      } else {
        this.authorizationValidDate = '';
      }
    }
  },
  beforeCreate() {
    USERID = Number(localStorageHelper.getItem('USERID'));
  },
  mounted() {
    this.fetchHistoryList();
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
  flex: 1;
  flex-direction: column;
  padding-bottom: 200px;
  .bread-crumb {
    background-color: #ffffff;
  }
  .upload-main {
    flex: 1;
    padding: 20px 30px 0  30px;
    margin-top: 20px;
    margin-bottom: 60px;
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
        /deep/ {
          .el-date-editor {
            &.el-input {
              width: 204px;
            }
          }
        }
        .long-time {
          margin-left: 16px;
          font-size: 16px;
          cursor: pointer;
        }
      }
    }
    .file-upload-box {
      margin-bottom: 40px;
    }
    .file-upload-example {
      width: 100%;
      margin-bottom: 40px;
      padding: 70px 0 50px;
      border: none;
      text-align: center;
      border: 2px dashed #ebebeb;
      border-radius: 2px;
      background-color: #FAFAFA;
      cursor: pointer;
      .el-upload__text {
        font-size: 16px;
        color: rgba(0,0,0,0.85);
        line-height: 24px;
      }
      .accept-type {
        font-size: 14px;
        color: rgba(0,0,0,0.43);
        line-height: 22px;
      }
      &:hover {
        border: 2px dashed #0094FF;
      }
    }
    .upload-history {
      border-top: 1px solid #ebebeb;
      .title {
        margin: 30px 0 10px;
        font-size: 18px;
        font-weight: bold;
        color: #333333;
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
    z-index: 9999;
    /deep/ {
      .el-button {
        &.return-back {
          @include cancelBtnStyle;
          margin: 0;
        }
        &.start-identify {
          @include buttonStyle;
          margin: 0 110px 0 30px;
        }
        &.is-disabled, &.is-disabled:hover {
          @include disbaledButtonStyle;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.el-loading-mask {
  &.is-fullscreen {
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 99999 !important;
  }
}
</style>
