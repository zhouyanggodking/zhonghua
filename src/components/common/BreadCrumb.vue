<template>
  <div class="bread-crumb">
    <div class="bread-crumb-icon" @click="goback">&lt;</div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in data" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array
    }
  },
  methods: {
    goback() {
      this.$router.back(-1);
    }
  }
}
</script>
<style lang="scss">
.bread-crumb {
  display: flex;
  align-items: center;
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
