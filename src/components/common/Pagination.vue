<template>
  <div class="row pager">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="totalCount"
    ></el-pagination>
  </div>
</template>
<script>
const PAGE_SIZE = 10;

export default {
  props:{
    totalCount:{
      type:Number,
      default:1
    }
  },
  data() {
    return {
      currentPage:1,
      pageSize: PAGE_SIZE,
      pageSizes: [PAGE_SIZE]
    };
  },
  methods: {
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
    },
    handleCurrentChange(currPage) {
      this.currentPage = currPage;
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
      }
      .active {
        color: #c1b071;
      }
    }
    .el-pagination button {
      color: #c1b071;
    }
    .el-pagination__jump {
      font-size: 12px;
    }
  }
}
</style>

