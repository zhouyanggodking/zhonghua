<template>
  <encircle-image v-if="imageUrl !== ''" style="height:100%;" :rotate="(360 - imageRotate) || 0" :img-src="imageUrl" ref="img"></encircle-image>
</template>
<script>
import {loadEncicleImage} from '@/helpers/zoomImage';
import {global_} from '@/global/global';
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
  mounted() {
    loadEncicleImage().then(() => {
      this.imageUrl = `${global_}/images${this.imgSrc}`;
    }).catch(() => {
      this.$message({
        message: '图片错误',
        type: 'failed'
      })
    })
  },
}
</script>
