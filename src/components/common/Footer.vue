<template>
  <el-footer v-if="currentRoute!=='realEstateUpload' && currentRoute!=='creditUpload'">
    <div class="footer-items-group">
      <div class="footer-item" v-for="(item, index) in footerItems" :key="index">{{item}}</div>
    </div>
    <div class="footer-msg">COPYRIGHT &copy; 中化资本 www.ici-sc.com 沪ICP备18028530号</div>
  </el-footer>
</template>
<script>
export default {
  data() {
    return {
      footerItems: ['关于我们', '联系我们', '关注微信', '免责声明'],
      currentRoute: ''
    };
  },
  watch: {
    $route(to) {
      this.currentRoute = to.name;
    }
  },
  mounted() {
    this.currentRoute = this.$route.name;
  }
}
</script>
<style lang="scss" scoped>
.el-footer {
  position: relative;
  height: 132px !important;
  padding-left: 50px;
  background-color: #f5f7f9;
  color: #333333;
  text-align: center;
  box-shadow: 0px -1px 5px #ccc;
  z-index: 99999;
  .footer-items-group {
    display: flex;
    padding: 58px 0 20px 0;
    .footer-item {
      padding: 0 26px;
      font-size: 12px;
      color: #999999;
      line-height: 18px;
      border-right: 1px solid #999999;
      &:first-child {
        padding-left: 0px;
      }
      &:last-child {
        border-right: none;
      }
    }
  }
  .footer-msg {
    text-align: left;
    font-size: 12px;
    color: #999999;
  }
}
</style>
