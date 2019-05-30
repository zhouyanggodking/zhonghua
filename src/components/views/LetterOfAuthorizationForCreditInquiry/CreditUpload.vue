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
            placeholder="选择日期">
          </el-date-picker>
          <span class="long-time">长期有效</span>
        </div>
      </div>
      <div class="file-upload-example" v-if="disableUpload" @click="beforeUpload">
        <img src="../../../assets/imgs/upload-icon.png" alt="">
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
              <span v-if="scope.row.status === 0">未开始</span>
              <span v-else-if="scope.row.status === 1" style="color: #4A90E2;">识别中</span>
              <span v-else-if="scope.row.status === 2" style="color: #417505;">识别成功</span>
              <span v-else-if="scope.row.status === -1" style="color: #D0021B;">识别失败</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="审核状态"
            prop="audit_status">
            <template slot-scope="scope">
              <span v-if="scope.row.audit_status === 0">未审核</span>
              <span v-else-if="scope.row.audit_status === 1" style="color: #4A90E2;">已审核</span>
              <span v-else-if="scope.row.audit_status === 2" style="color: #D0021B;">驳回</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="上传日期"
            prop="uploadTime">
          </el-table-column>
        </el-table>
        <Pagination @change="onHistoryPageNumChange" :totalCount="totalCount" class="history-pagination"></Pagination>
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
import {getUploadHistory} from '@/rest/letterOfAuthorizationElecApi';

const PAGE_SIZE = 10;

export default {
  data() {
    return {
      isLoading: false,
      disableUpload: true,
      authorizationValidDate: '',
      businessTypeId: '',
      currentPage: 1,
      totalCount: 0,
      pageSize: PAGE_SIZE,
      pageSizes: [PAGE_SIZE],
      formLabelWidth: '120px',
      breadCrumbList: [
        '首页', '征信查询授权书', '文件上传'
      ],
      tableData: [],
      readyDeleteItem: null
    };
  },
  methods: {
    uploadSuccess() {
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
      this.isLoading = true;
      this.tableData = [];
      const params = {
        businessTypeId: this.businessTypeId,
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        type: 1,
        userId: 1
      }
      getUploadHistory(params)
      .then((res) => {
        this.tableData = res.data.data;
        this.totalCount = res.data.total;
        this.isLoading = false;
      })
    }
  },
  watch: {
    businessTypeId(newVal) {
      this.businessTypeId = newVal;
      this.fetchHistoryList();
      if(newVal !== '' && this.authorizationValidDate !== '' && this.authorizationValidDate) {
        this.disableUpload = true
      }
    },
    authorizationValidDate(newVal) {
      if(newVal !== '' && this.businessTypeId !== '') {
        this.disableUpload = true
      }
    }
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
    .file-upload-example {
      width: 100%;
      margin-bottom: 40px;
      padding: 70px 0 50px;
      border: none;
      text-align: center;
      border: 1px dashed rgba(0, 0, 0, 0.15);
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
        border-color: #C1B071;
      }
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
    z-index: 9999;
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
