<template>
  <el-upload
    class="upload-demo"
    drag
    show-file-list
    :file-list="fileList"
    action="https://jsonplaceholder.typicode.com/posts/"
    multiple>
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">点击选择或将文件拖拽到这里上传</div>
    <div class="accept-type">支持.pdf/.jpg/.png/.tif/.zip/.rar格式</div>
  </el-upload>
</template>
<script>
export default {
  data() {
    return {
      fileList: [
        {
          name: 'food.jpeg',
          size: '300kb',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          size: '300kb',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ]
    };
  }
}
</script>

<style lang="scss" scoped>
/deep/ {
  .el-upload {
    width: 100%;
    .el-upload-dragger {
      width: 100%;
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
    padding: 0 150px;
  }
}
</style>
