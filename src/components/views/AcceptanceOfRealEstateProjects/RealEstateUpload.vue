<template>
  <div class="real-estate-upload">
    <div class="top-box">
      <bread-crumb :data="breadCrumbList"></bread-crumb>
    </div>
  </div>
</template>
<script>
import BreadCrumb from '@/components/common/BreadCrumb';

export default {
  data() {
    return {
      breadCrumbList: [
        '动产项目承兑', '文件上传'
      ]
    };
  },
  methods: {
  },
  components: {
    BreadCrumb
  }
}
</script>
<style lang="scss">
.real-estate-upload {
  .top-box {
    height: 130px;
    background-color: #ffffff;
    .bread-crumb {
      padding: 14px 20px 0px;
    }
  }
}
</style>
