<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      :on-progress="onFileUploading"
      :on-success="onFileUploadingSuccess"
      :on-error="onFileUploadingError"
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple>
      <img src="../../assets/imgs/upload-icon.png" alt="">
      <div class="el-upload__text">点击选择或将文件拖拽到这里上传</div>
      <div class="accept-type">支持.pdf/.jpg/.png/.tif/.zip/.rar格式</div>
    </el-upload>
    <div class="file-list">
      <div class="file-list-item" v-for="(item, index) in fileList" :key="index">
        <div class="left">{{item.name}}</div>
        <div class="right">
          <div>{{item.size}}</div>
          <div>
            <span class="status succeed" v-if="item.status === 'success'">上传成功</span>
            <span class="status failed" v-else>上传失败</span>
          </div>
          <span class="del-btn"></span>
        </div>
      </div>
      <div v-if="isUploading" class="file-list-item">
        <div class="left">{{uploadingFile.name}}</div>
        <div class="right">
          <el-progress :text-inside="true" :stroke-width="16" :percentage="progressBarPercent" status="success"></el-progress>
          <span class="status uploading">上传中</span>
          <span class="del-btn"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isUploading: false,
      completeUpload: false,
      progressBarPercent: 0,
      fileList: [
        {
          name: 'food.jpeg',
          size: '300kb',
          status: 'fail',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          size: '300kb',
          status: 'success',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      uploadingFile: {
        name: '',
        status: '',
        size: '',
        url: ''
      }
    };
  },
  methods: {
    onFileUploading(event, file) {
      this.isUploading = true;
      this.progressBarPercent = 0;
      this.progressBarPercent = parseInt(event.percent);
      this.uploadingFile.name = file.name;
      this.uploadingFile = {
        name: file.name,
        status: file.status,
        size: file.size
      }
    },
    onFileUploadingSuccess() {
      this.isUploading = false;
      this.fileList.push(this.uploadingFile);
    },
    onFileUploadingError() {
      this.isUploading = false;
      this.fileList.push(this.uploadingFile);
    }
  }
}
</script>

<style lang="scss" scoped>
.file-list {
  width:600px;
  margin: 0 auto;
  .file-list-item {
    display: flex;
    align-items: center;
    // padding: 0 150px;
    margin: 6px 0;
    font-size: 14px;
    color: #666666;
    .left {
      display: flex;
      align-items: center;
      &:before {
        content: '';
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-right: 8px;
        background: url('../../assets/imgs/file-icon.png') no-repeat;
        background-size: cover;
      }
      .el-icon-document {
        margin-right: 10px;
      }
    }
    .right {
      display: flex;
      margin-left: auto;
      .el-icon-circle-close {
        line-height: 20px;
      }
      .status {
        display: inline-block;
        margin: 0 40px 0 24px;
        &.succeed {
          color: #7FE085;
        }
        &.failed {
          color: #D0021B;
        }
        &.uploading {
          color: #F5A623;
        }
      }
      /deep/ {
        .el-progress {
          width: 100px;
        }
      }
      .del-btn {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('../../assets/imgs/del-btn.png') no-repeat;
        background-size: cover;
        cursor: pointer;
      }
    }
  }
}
/deep/ {
  .el-upload {
    width: 100%;
    .el-upload-dragger {
      padding: 70px 0 50px 0;
      width: 100%;
      height: auto;
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
        border-color: #9B8B7C;
      }
    }
  }
  .el-upload-list {
    display: none;
    padding: 0 150px;
  }
}
</style>
