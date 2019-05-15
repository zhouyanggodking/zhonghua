<template>
  <div class="date-range">
    <el-date-picker
      v-model="startTime"
      :clearable="false"
      type="date"
      @change="onDateChange"
      value-format="yyyy-MM-dd 00:00:00"
      placeholder="开始日期">
    </el-date-picker>
    <span>-</span>
    <el-date-picker
      v-model="endTime"
      :clearable="false"
      type="date"
      @change="onDateChange"
      value-format="yyyy-MM-dd 00:00:00"
      placeholder="到期日期">
    </el-date-picker>
  </div>
</template>
<script>
export default {
  data() {
    return {
      startTime: '',
      endTime: ''
    };
  },
  methods: {
    onDateChange() {
      this.$emit('change', {
        startTime: this.startTime,
        endTime: this.endTime
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.date-range {
  display: flex;
  align-items: center;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  >span {
    color: #DCDFE6;
  }
  /deep/ {
    .el-date-editor {
      &.el-input {
        width: 180px !important;
        .el-input__prefix {
          display: none !important;
        }
        .el-input__inner {
          height: 38px;
          width: 180px !important;
          line-height: 38px;
          padding: 10px;
          border: none;
          text-align: center;
        }
      }
    }
  }
}
</style>
