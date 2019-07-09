<template>
  <div class="row pager">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>
    {{this.currPage}}
  </div>
</template>
<script>
const PAGE_SIZE = 10;

export default {
  data() {
    return {
      currentPage: Number(this.$route.query.pageNum || 1),
      pageSize: PAGE_SIZE,
      pageSizes: [PAGE_SIZE]
    };
  },
  props:{
    totalCount:{
      type:Number,
      default: 0
    },
    currPage: {
      type: Number
    }
  },
  methods: {
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
    },
    handleCurrentChange(currPage) {
      this.currentPage = currPage;
      this.$emit('change', {pageSize: this.pageSize, pageNum: this.currentPage});
    }
  }
};
</script>
<style lang="scss" scoped>
.pager {
  /deep/ .el-pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    .el-pagination__total {
      position: absolute;
      left: 0;
    }
    .el-pager {
      .number {
        font-size: 12px;
        &:hover {
          color: #0263FF;
        }
      }
      .active {
        color: #0263FF;
      }
    }
    .el-pagination button {
      color: #333333;
    }
    .el-pagination__jump {
      font-size: 12px;
    }
  }
}
</style>

