<template>
  <div class="identify-result-detail-page">
    <div class="identify-page-title">
      <div class="top-box">
        <bread-crumb :data="breadCrumbList" :currentTitle="currentTitle"></bread-crumb>
      </div>
    </div>
    <div class="identify-result-detail-page-content">

    </div>
  </div>
</template>
<script>
import BreadCrumb from "@/components/common/BreadCrumb";


export default {
  data() {
    return {
       breadCrumbList: ["首页", "资产识别比对", "比对结果"],
       currentTitle:'付款公司名称-合同编号-付款主题'
    }
  },
  components: {
    BreadCrumb
  }
};
</script>

<style lang="scss" scoped>
.identify-result-detail-page {
  .top-box {
    height: 130px;
    background-color: #ffffff;
    .bread-crumb {
      padding: 14px 20px 0px;
    }
  }
    .identify-result-detail-page-content{
        margin-top: 30px;
        background: #fff;
        padding: 30px;
    }
}
/deep/ .el-button {
  width: 135px;
  background: #c1b071;
  border-radius: 4px;
  border-color: #c1b071;
  span {
    font-size: 14px;
    color: #ffffff;
  }
  &:hover {
    background-color: #e9d58b;
    border-color: #e9d58b;
  }
}
.el-button:active {
  border-color: #c1b071;
  color: #fff;
}
.btn {
  margin-right: 30px;
}
.el-button + .el-button {
  margin-left: 0;
}

</style>
