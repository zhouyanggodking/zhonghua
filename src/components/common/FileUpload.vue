<template>
<div 
    v-loading="loading"
    element-loading-text="正在解压中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
  <uploader
    v-loading="load"
    :element-loading-text="loadingText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :options="options"
    :autoStart="autoStart"
    class="uploader-box"
    ref="uploader"
    :fileStatusText="fileStatusText"
    @change="fileChange"
    @file-complete="fileComplete">
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <uploader-btn>
        <div style="line-height: 18px"><img src="../../assets/imgs/upload-icon.svg" alt=""></div>
        <div class="el-upload__text">点击选择或将文件拖拽到这里上传</div>
        <div class="accept-type">支持.zip/.rar/.7z格式</div>
      </uploader-btn>
    </uploader-drop>
    <uploader-list></uploader-list>
  </uploader>
</div>
</template>
<script>
import {calculateMd5} from '@/utils/fileUpload.js';
import {relocateFile, fileIsExist} from '@/rest/realEstateUploadApi';
import {global_upload} from '@/global/global';
import {dateFormat} from '@/helpers/dateHelper';
import localStorageHelper from '@/helpers/localStorageHelper';


let USERID = null;

export default {
  data() {
    let fileType = this.fileType;
    let timeStamp = dateFormat(this.timeStamp);
    return {
      loading: false,
      identifyFileType: this.fileType,
      file_md5: null,
      uploader_file: null,
      load: false,
      autoStart: false,
      list: 'asd',
      fileStatusText: {
        success: '上传成功',
        error: '上传失败',
        uploading: '上传中',
        paused: '暂停中',
        waiting: '等待中'
      },
      loadingText: '文件解析中...',
      options: {
        target: `${global_upload}/uploader/chunk`,
        testChunks: false,
        singleFile: true,
        simultaneousUploads: 1, // 文件个数
        chunkSize: 1 * 1024 * 1024, // 切片大小
        allowDuplicateUploads: true, // 允许重复上传
        prioritizeFirstAndLastChunk: true, // 优先第一个和最后一个快
        businessTypeId: 3,
        authorizationValidDate: '',
        generateUniqueIdentifier: function (file) {
          // 生成文件唯一标识
          return file.size
        },
        query: function (file) {
          let fileName = (file.name).substring(0, (file.name).lastIndexOf('.'));
          return {
            identifier: file.size + '_' + fileName + '_' + USERID,
            type: 'zc',
            userId: USERID,
            businessTypeId: fileType,
            authorizationValidDate: timeStamp,
          }
        },
        initFileFn: function (file) {
          this.uploader_file = file
        },
      }
    };
  },
  props: {
    fileType: {
      type: String,
      default: ''
    },
    timeStamp: {
      type: String,
      default: ''
    }
  },
  methods: {
    fileChange(e) {
      let that = this
      that.loadingText = '文件解析中...'
      let fileName = e.target.files[0].name;
      var ext = fileName.slice(fileName.lastIndexOf(".") + 1).toLowerCase();
      if ('rar' == ext || 'zip' == ext || '7z' === ext) {
        let completeFiile = e.target.files[0];
        let identifier = `${e.target.files[0].size}_${e.target.files[0].name.split('.')[0]}_${USERID}`
        that.load = true
        calculateMd5(completeFiile, function (val) {
          that.file_md5 = val;
          that.loadingText = '文件解析成功';
          that.load = false;
          fileIsExist({
            businessTypeId: that.identifyFileType,
            identifier: identifier
          }).then(res => {
            if (res.status === 200) {
              if (res.data) {
                that.$message({
                  message: '此文件已经上传过，请您选择其他文件',
                  type: 'warning'
                });
                document.querySelector('.uploader-file-status').style.visibility = 'hidden';
                document.querySelector('.uploader-file-resume').style.visibility = 'hidden';
              } else {
                if (that.uploader_file) {
                  that.uploader_file.resume()
                }
              }
            } else {
              that.$message({
                message: '文件上传错误',
                type: 'error'
              })
            }
          }).catch(() => {
            that.$message({
              message: '选择文件出错',
              type: 'error'
            })
          })
        })
      } else {
        this.$message({
          message: '文件类型错误！',
          type: 'error'
        });
        document.querySelector('.uploader-list').style.display = 'none';
      }
    },
    fileComplete() {
      // 先把File对象转换成Blob 然后转换成buffer进行加密
      this.loading = true;
      let file = arguments[0].file
      let _fileName = (file.name).substring(0, (file.name).lastIndexOf('.'))
      let _identifier = file.size + '_' + _fileName + '_' + USERID
      let servicePath = ''
      // 合并文件
      let obg = {
        userId: USERID,
        businessTypeId: this.fileType,
        authorizationValidDate: dateFormat(this.timeStamp),
        md5: this.file_md5,
        filename: file.name,
        identifier: _identifier,
        totalSize: file.size,
        type: 'zc',
        location: '',
        serviceFilePath: servicePath,
      };
      relocateFile(obg).then(res => {
        if (res.status === 200) {
          this.$message({
            message: '文件解压成功',
            type: 'success'
          });
          this.loading = false;
          this.$emit('change', {originalFileId: res.data});
        } else {
          this.loading = false;
          this.$message({
            message: '文件解压失败',
            type: 'error'
          })
        }
      }, err => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    }
  },
  beforeCreate() {
    USERID = Number(localStorageHelper.getItem('USERID'));
  }
}
</script>
<style lang="scss">
.uploader-box {
  .uploader-drop {
    padding: 0;
    background: #FAFAFA;
    border: 2px dashed #ebebeb;
    border-radius: 4px;
    &:hover {
      border: 2px dashed #0094FF;
    }
    .uploader-btn {
      width: 100%;
      padding: 70px 0 50px;
      border: none;
      text-align: center;
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
        background: #FAFAFA;
      }
    }
  }
  .uploader-list {
    .uploader-file[status=success] .uploader-file-remove {
      display: block;
    }
    .uploader-file[status] {
      .uploader-file-progress {
        display: none;
      }
      .uploader-file-info {
        display: inline;
        .uploader-file-name {
          .uploader-file-icon{
            &::before {
              content: '';
              display: inline-block;
              width: 14px;
              height: 14px;
              margin-right: 8px;
              background: url('../../assets/imgs/file-icon.png') no-repeat;
              background-size: cover;
            }
          }
        }
      }
    }
  }
}
</style>
