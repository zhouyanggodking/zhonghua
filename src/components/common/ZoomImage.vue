<template>
  <encircle-image style="height:360px;" :rotate="(360 - imageRotate) || 0" :img-src="imageUrl" ref="img"></encircle-image>
</template>
<script>
import {loadEncicleImage} from '@/helpers/zoomImage';
// import {global_} from '@/global/global';
export default {
  data() {
    return {
      imageUrl: ''
    };
  },
  props: {
    imagePosition: {
      type: Array
    },
    imageRotate: {
      type: String
    },
    imgSrc: {
      type: String
    }
  },
  watch: {
    imagePosition: {
        handler: function (locations) {
          if (!locations || locations.length == 0) {
            this.$refs.img.focusAreas = locations;
            return;
          } else {
            this.$refs.img.focusAreas = locations;
          }
        },
        deep: true
      },
  },
  // created() {
  //   console.log('beforeCreate');
  //   loadEncicleImage().then(() => {
  //     console.log('start');
  //     // this.imageUrl = `${global_}${this.imgSrc}`;
  //     this.imageUrl = 'http://10.17.17.151:8080/test/test1.png';
  //   }).catch(() => {
  //     this.$message({
  //       message: '图片错误',
  //       type: 'failed'
  //     })
  //   })
  // },
  mounted() {
    loadEncicleImage().then(() => {
      // this.imageUrl = `${global_}${this.imgSrc}`;
      this.imageUrl = 'http://10.17.17.151:8080/test/test1.png';
    }).catch(() => {
      this.$message({
        message: '图片错误',
        type: 'failed'
      })
    })
  },
}
</script>
