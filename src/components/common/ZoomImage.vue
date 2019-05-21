<template>
  <div>
    <img
      :id="id"
      class="img-src"
      :src="imagesSrc"
      height="633"
      width="494"
    >
  </div>
</template>
<script>
import Viewer from "viewerjs";

export default {
  data() {
    return {
      imagesSrc: "http://www.pptbz.com/pptpic/UploadFiles_6909/201201/20120101182704481.jpg"
    };
  },
  props: {
    id: {
      type: String
    }
  },
  mounted() {
    // this.$nextTick(
    //   () => {
        const viewer = new Viewer(document.getElementById(this.id), {
          inline: true,
          button: false, //右上角按钮
          navbar: false, //底部缩略图
          title: false, //当前图片标题
          toolbar: false, //底部工具栏
          tooltip: true, //显示缩放百分比
          movable: true, //是否可以移动
          zoomable: true, //是否可以缩放
          rotatable: true, //是否可旋转
          scalable: true, //是否可翻转
          transition: true, //使用 CSS3 过度
          fullscreen: false, //播放时是否全屏
          keyboard: true, //是否支持键盘
          viewed() {
            viewer.zoomTo(1);
          }
        });
    //   }
    // )
  }
}
</script>
<style lang="scss" scoped>
.viewer-backdrop {
  background-color: #ffffff;
}
</style>
