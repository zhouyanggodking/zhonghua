<template>
  <div class="bread-crumb">
    <div class="bread-crumb_header">
      <i class="el-icon-arrow-left backBorder" @click="goBack"></i>
      <!-- <div class="bread-crumb-icon" @click="goback">&lt;</div> -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in data" :key="index">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="current-title">{{currentTitle}}</div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array
    },
    currentTitle: {
      type: String
    }
  },
  methods: {
    goBack() {
      this.$router.back(-1);
    }
  }
};
</script>
<style lang="scss">
.bread-crumb {
  display: flex;
  // align-items: center;
  flex-direction: column;
  .bread-crumb_header {
    display: flex;
    align-items: center;
    .backBorder {
      padding: 2px 0;
      font-size: 12px;
      border: 1px solid #999999;
      border-radius: 3px;
      color: #999999;
      margin-right: 5px;
    }
  }
  .bread-crumb-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 18px;
    margin-right: 10px;
    line-height: 16px;
    border: 1px solid #999999;
    cursor: pointer;
  }
  .current-title {
    font-family: "PingFangSC-Semibold";
    font-size: 20px;
    color: #333333;
    margin-top: 33px;
    margin-left: 10px;
  }
  .el-breadcrumb {
    font-size: 12px;
    .el-breadcrumb__inner {
      color: #999999;
    }
    .el-breadcrumb__separator {
      margin: 0 2px;
    }
    .el-breadcrumb__item:last-child .el-breadcrumb__inner {
      color: #151515;
    }
  }
}
</style>
