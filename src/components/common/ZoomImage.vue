<template>
  <encircle-image style="height:360px;" :rotate="360 - imageRotate" :img-src="imageUrl" ref="img"></encircle-image>
</template>
<script>
import {loadEncicleImage} from '@/helpers/zoomImage';

export default {
  data() {
    return {
      imageUrl: ''
    };
  },
  mounted() {
    loadEncicleImage().then(() => {
      this.imageUrl = 'http://10.17.17.151:8080/test/test1.png';
    // if (this.imageUrl == 'NULL' || this.imageUrl == '') {
    //     this.imageUrl = 'NULL'
    //   } else {
    //     this.imageUrl = 'http://10.17.17.151:8080/test/test1.png';
    //   }
    }).catch(() => {
      this.$message({
        message: '图片错误',
        type: 'failed'
      })
    })
  },
  props: {
    imagePosition: {
      type: Array
    },
    imageRotate: {
      type: String
    }
  },
  watch: {
    imagePosition: {
        handler: function (locations) {
          if (!locations || locations.length == 0) {
            this.$refs.img.focusAreas = locations;
            return;
          }
          //默认单张图片的page为0
          if (this.$refs.img) {
            this.$refs.img.focusAreas = locations;
          } else if (this.$refs.cimg) {
            this.$refs.cimg.focusAreas = locations
            let id = 'img' + new String(locations);
            if (document.getElementById(id)) {
              document.getElementById(id).focusAreas = locations;
            }
          } else {
            this.$refs.carouse.setActiveItem(locations[0].imgUrl);
            let id = new String(locations[0].imgUrl);
            if (document.getElementById(id)) {
              document.getElementById(id).focusAreas = locations;
            }
          }
        },
        deep: true
      },
  }
}
</script>
