<template>
  <uploader
    v-loading="load"
    :element-loading-text="loadingText"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :options="options"
    :autoStart="autoStart"
    :progress="progress"
    class="uploader-box"
    ref="uploader"
    :fileStatusText="fileStatusText"
    @change="fileChange"
    @file-complete="fileComplete">
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <uploader-btn>
        <img src="../../assets/imgs/upload-icon.png" alt="">
        <div class="el-upload__text">点击选择或将文件拖拽到这里上传</div>
        <div class="accept-type">支持.zip/.rar/.7z格式</div>
      </uploader-btn>
    </uploader-drop>
    <uploader-list></uploader-list>
  </uploader>
</template>
<script>
import {calculateMd5} from '@/utils/fileUpload.js';

let file_md5 = null
let uploader_file = null

export default {
  data() {
    return {
      load: false,
      autoStart: false,
      fileStatusText: {
        success: '上传成功',
        error: '出错了',
        uploading: '上传中',
        paused: '暂停中',
        waiting: '等待中'
      },
      loadingText: '文件解析中...',
      options: {
        target: 'http://10.17.16.91:8080/uploader/chunk',
        testChunks: false,
        singleFile: true,
        simultaneousUploads: 1, // 文件个数
        chunkSize: 1 * 1024 * 1024, // 切片大小
        allowDuplicateUploads: true, // 允许重复上传
        prioritizeFirstAndLastChunk: true, // 优先第一个和最后一个快
        generateUniqueIdentifier: function (file) {
          // 生成文件唯一标识
          return file.size
        },
        query: function (file) {
          let fileName = file.name.split('.')[0]
          return {
            identifier: file.size + '_' + fileName,
            relatedUserId: localStorage.getItem('userId'),
            type: 'zc'
          }
        },
        initFileFn: function (file) {
          uploader_file = file
        },
      }
    };
  },
  methods: {
    progress(e) {
      console.log(e);
    },
    fileChange(e) {
      let that = this
      that.loadingText = '文件解析中...'
      let fileName = e.target.files[0].name
      var ext = fileName.slice(fileName.lastIndexOf(".") + 1).toLowerCase();
      if ('rar' == ext || 'zip' == ext || '7z' === ext) {
        let completeFiile = e.target.files[0]
        that.load = true
        calculateMd5(completeFiile, function (val) {
          file_md5 = val;
          that.loadingText = '文件解析成功'
          that.load = false
          // fileIsExist({md5: val}).then(res => {
          //   if (res.status === 200) {
          //     if (res.data === true) {
          //       // 文件没上传过 就上传
          //       if (uploader_file) {
          //         uploader_file.resume()
          //       }
          //     } else {
          //       this.$message({
          //         message: '此文件已经上传过，请您选择其他文件',
          //         type: 'warning'
          //       })
          //       document.querySelector('.uploader-file-status').style.visibility = 'hidden'
          //       document.querySelector('.uploader-file-resume').style.visibility = 'hidden'
          //     }
          //   } else {
          //     this.$message({
          //       message: '选择文件出错',
          //       type: 'error'
          //     })
          //   }
          // }).catch(() => {
          //   this.$message({
          //     message: '选择文件出错',
          //     type: 'error'
          //   })
          // })
        })
      } else {
        this.$message({
          message: '文件类型错误！',
          type: 'error'
        })
      }
    },
    fileComplete() {}
    // fileComplete() {
    //   // 合并文件
    //   let obg = {
    //     md5: file_md5,
    //     filename: file.name,
    //     identifier: _identifier,
    //     totalSize: file.size,
    //     type: 'zc',
    //     location: '',
    //     serviceFilePath: servicePath,
    //     relatedUserId: localStorage.getItem('userId')
    //   }
    //   mergeFile(obg).then(res => {
    //     if (res.status === 200) {
    //       this.$message({
    //         message: '文件上传成功',
    //         type: 'success'
    //       })
    //       this.getFileList()
    //     } else {
    //       this.$message({
    //         message: '文件上传失败',
    //         type: 'error'
    //       })
    //     }
    //   }).catch(() => {
    //     this.$message({
    //       message: '文件上传失败',
    //       type: 'error'
    //     })
    //   })
    // },
  }
}
</script>
<style lang="scss">
.uploader-box {
  .uploader-drop {
    padding: 0;
    background: #FAFAFA;
    border: 1px dashed rgba(0,0,0,0.15);
    border-radius: 4px;
    &:hover {
      border: 1px dashed #C1B071;
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
