<template>
  <div class="top-pagination">
    <div class="title">{{title}}</div>
    <div class="pagination">
      <div class="count">{{String(currentPageNum).padStart(2, 0)}}/{{String(total).padStart(2, 0)}}</div>
      <div>前往第
        <el-input v-model="currentPageNum" @blur="onInputBlur"></el-input>
        页</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPageNum: 0
    };
  },
  props: {
    title: {
      type: String
    },
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number
    }
  },
  methods: {
    onInputBlur() {
      this.$emit('change',this.currentPageNum);
    }
  },
  watch: {
    'currentPage'(newVal) {
      this.currentPageNum = newVal;
    }
  },
  mounted() {
    this.currentPageNum = this.currentPage;
  }
}
</script>
<style lang="scss" scoped>
.top-pagination {
  display: flex;
  .title {
    margin-right: auto;
    font-size: 18px;
    font-weight: bold;
    color: #9A8B7B;
    line-height: 28px;
  }
  .pagination {
    display: flex;
    align-items: center;
    line-height: 28px;
    font-size: 12px;
    color: #333333;
    .count {
      margin-right: 28px;
    }
    /deep/ {
      .el-input {
        width: 40px;
        margin: 0 4px;
        .el-input__inner {
          height: 28px;
          padding: 0 8px;
          text-align: center;
        }
      }
    }
  }
}
</style>
