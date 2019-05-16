<template>
  <div class="contract-supplyment">
    <div class="payment-order-theme">
      <label>关联付款主题:</label>
      <el-select v-model="contractSupplymentForm.name" placeholder="">
        <el-option label="专票" value="专票"></el-option>
        <el-option label="普票" value="普票"></el-option>
      </el-select>
    </div>
    <el-form label-position="right" :rules="rules" label-width="120px" :model="contractSupplymentForm">
      <el-form-item label="关联付款主题:" prop="name">
        <el-select v-model="contractSupplymentForm.name" placeholder="">
          <el-option label="专票" value="专票"></el-option>
          <el-option label="普票" value="普票"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发票类型:" prop="name">
        <el-select  v-model="contractSupplymentForm.name" placeholder="">
          <el-option label="专票" value="专票"></el-option>
          <el-option label="普票" value="普票"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发票号码:" prop="invoiceNo">
        <el-input v-model="contractSupplymentForm.invoiceNo"></el-input>
      </el-form-item>
      <el-form-item label="发票代码:" prop="invoiceCode">
        <el-input v-model="contractSupplymentForm.invoiceCode"></el-input>
      </el-form-item>
      <el-form-item label="开票日期:" prop="invoiceTime">
        <el-input v-model="contractSupplymentForm.invoiceTime"></el-input>
      </el-form-item>
      <el-form-item label="金额:" prop="invoiceTime">
        <el-input v-model="contractSupplymentForm.invoiceTime"></el-input>
      </el-form-item>
      <el-form-item label="校验码:">
        <el-input disabled v-model="contractSupplymentForm.invoiceTime"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn-list">
      <el-button class="verify-btn">无法识别</el-button>
      <el-button class="verify-btn" @click="handleNotVerifyClick">验真不通过</el-button>
      <el-button class="submit-btn" type="primary" @click="handleVerifyClick">提交验真</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    const phoneReg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
    const phoneMatch = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号码'));
      } else {
        if (!value.match(phoneReg)) {
          callback(new Error('请输入正确手机号码'));
        } else {
          callback();
        }
      }
    };
    return {
      isFiledFormEdit: false,
      contractSupplymentForm: {
        name: '',
        invoiceNo: '',
        invoiceCode: '',
        invoiceTime: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: phoneMatch, trigger: 'blur' }
        ],
        invoiceNo: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: phoneMatch, trigger: 'blur' }
        ],
        invoiceCode: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: phoneMatch, trigger: 'blur' }
        ],
        invoiceTime: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: phoneMatch, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleNotVerifyClick() {},
    handleVerifyClick() {}
  }
}
</script>
<style lang="scss" scoped>
@import '@/scss/mixin.scss';

.contract-supplyment {
  background-color: #FAFAFA;
  .top-pagination {
    padding-bottom: 6px;
    border-bottom: 1px solid #eee;
  }
  .payment-order-theme {
    display: flex;
    align-items: center;
    padding: 20px 20px;
    margin-top: 6px;
    background: #EFEFEF;
    border-radius: 4px;
    /deep/ {
      .el-input {
        height: 30px;
        .el-input__inner {
          height: 30px;
        }
        &.is-disabled {
          .el-input__inner {
            border: none;
            color: #333333;
            background-color: #FAFAFA;
            cursor: default;
          }
        }
      }
      .el-select {
        width: 100%;
        .el-input--suffix {
          .el-input__suffix {
            .el-input__icon {
              line-height: 30px;
            }
          }
        }
      }
    }
    label {
      flex-shrink: 0;
      width: 108px;
      padding-right: 12px;
      text-align: right;
      font-size: 14px;
      color: #333333;
      font-weight: bold;
    }
  }
  /deep/ {
    .el-form {
      height: 300px;
      overflow-y: scroll;
      padding:  20px 20px 0 20px;
      .goods-list {
        border: 1px dashed #EBEBEB;
      }
      .el-form-item {
        .el-form-item__label {
          line-height: 30px;
          font-size: 14px;
          color: #333333;
          font-weight: bold;
        }
        .el-form-item__content {
          line-height: 30px;
          .el-input {
            height: 30px;
            .el-input__inner {
              height: 30px;
            }
            &.is-disabled {
              .el-input__inner {
                border: none;
                color: #333333;
                background-color: #FAFAFA;
                cursor: default;
              }
            }
          }
          .el-select {
            width: 100%;
            .el-input--suffix {
              .el-input__suffix {
                .el-input__icon {
                  line-height: 30px;
                }
              }
            }
          }
        }
      }
    }
  }
  .btn-list {
    display: flex;
    justify-content: space-around;
    margin-top: 34px;
    .el-button {
      &.verify-btn {
        @include verifyBtnStyle;
        margin: 0;
        padding: 10px 20px;
      }
      &.submit-btn {
        @include buttonStyle;
        margin: 0;
        padding: 10px 20px;
      }
    }
  }
}
</style>
