<template>
  <div class="contract-supplyment">
    <div class="payment-order-theme">
      <label>关联付款主题:</label>
      <el-select v-model="paymentRequestOrderId" placeholder="">
        <el-option v-for="(value, key, index) of titleInfos[0]" :key="index" :label="value" :value="Number(key)"></el-option>
      </el-select>
    </div>
    <el-form ref="contractSupplymentForm" label-position="right" :rules="rules" label-width="120px" :model="contractSupplymentForm">
      <el-form-item label="发票类型:" prop="invoiceType">
        <el-select  v-model="contractSupplymentForm.invoiceType" placeholder="">
          <el-option label="增值税普通发票" value="增值税普通发票"></el-option>
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
        <el-date-picker
          v-model="contractSupplymentForm.invoiceTime"
          type="date"
          value-format="yyyy-MM-dd 00:00:00"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="金额:" prop="finalPrice">
        <el-input v-model="contractSupplymentForm.finalPrice"></el-input>
      </el-form-item>
      <el-form-item label="校验码:" prop="checkCode">
        <el-input v-model="contractSupplymentForm.checkCode"></el-input>
      </el-form-item>
      <el-form-item label="验真状态:">
        <div>
          <span v-if="verifiedInvoiceItems.verification === 1">验真通过</span>
          <span v-else-if="verifiedInvoiceItems.verification === 0">验真失败</span>
          <span v-else></span>
        </div>
      </el-form-item>
    </el-form>
    <div class="btn-list" v-if="isAddInvoice">
      <el-button class="verify-btn" disabled>无法识别</el-button>
      <el-button class="verify-btn" disabled>验真不通过</el-button>
      <el-button class="submit-btn" type="primary" @click="handleAddInvoiceClick">确认</el-button>
    </div>
    <div class="btn-list" v-else>
      <el-button class="verify-btn"  @click.native="contRecognize">无法识别</el-button>
      <el-button class="verify-btn" :disabled="!verifiedInvoiceItems.verification"  @click.native="contRecognize">验真不通过</el-button>
      <el-button class="submit-btn" type="primary" @click="handleVerifyClick">提交验真</el-button>
    </div>
  </div>
</template>
<script>
import { supplyInvoice, verifyInvoice } from '@/rest/realEstateUploadApi';
import {USERID} from '@/global/global';
import {dateFormat} from '@/helpers/dateHelper';

export default {
  data() {
    return {
      isAddInvoice: false,
      paymentRequestOrderId: 1,
      isFiledFormEdit: false,
      contractSupplymentForm: {
        invoiceType: '',
        invoiceNo: '',
        invoiceCode: '',
        invoiceTime: '',
        checkCode: '',
        finalPrice: '',
        outputLocation: this.outputImg,
        inputLocation: this.inputImg,
        originalFileId: this.originalFileId
      },
      rules: {
        invoiceType: [
          { required: true, message: '请选择发票类型', trigger: 'blur' }
        ],
        invoiceNo: [
          { required: true, message: '请输入发票号码', trigger: 'blur' },
          { pattern: /^\d{8}$/, message: '发票号码为8位数字', trigger: 'blur' }
        ],
        invoiceCode: [
          { required: true, message: '请输入发票代码', trigger: 'blur' },
          { pattern: /^\d{10,12}$/, message: '发票代码为10~12位数字', trigger: 'blur' }
        ],
        checkCode: [
          { required: true, message: '请输入校验码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '校验码位为6位数字', trigger: 'blur' }
        ],
        finalPrice: [
          { required: true, message: '请输入金额', trigger: 'blur' },
          { pattern: /^(?=\d+.?\d+$)[\d.]{0,20}$/, message: '金额为20位以内数字', trigger: 'blur' }
        ]
      },
      verifiedInvoiceItems: {},
      propsData: {
        isShowContractMsg: true,
        singleFieldPosition: []
      }
    }
  },
  props: {
    titleInfos: {
      type: Array
    },
    outputImg: {
      type: String
    },
    inputImg: {
      type: String
    },
    originalFileId: {
      type: Number
    }
  },
  methods: {
    handleNotVerifyClick() {},
    handleVerifyClick() {
      const invoiceItems = this.contractSupplymentForm;
      invoiceItems.paymentRequestOrderId = this.paymentRequestOrderId;
      const params = {
        invoice: invoiceItems,
        userId: USERID
      }
      this.requestVerifyInvoice(params);
    },
    requestVerifyInvoice(params) {
      this.$refs.contractSupplymentForm.validate(valid => {
        if(valid) {
          verifyInvoice(params).then((res) => {
            if(res.status === 200) {
              this.verifiedInvoiceItems = res.data;
              this.isAddInvoice = true;
              this.$message({
                message: '验真成功',
                type: 'success'
              })
            } else {
              this.$message.error('验真错误');
            }
          })
        }
      })
    },
    handleAddInvoiceClick() {
      const mapData = this.verifiedInvoiceItems;
      mapData.createTime = dateFormat(mapData.createTime);
      mapData.invoiceTime = dateFormat(mapData.invoiceTime);
      mapData.lastUpdateTime = dateFormat(mapData.lastUpdateTime);
      mapData.paymentRequestOrderId = this.paymentRequestOrderId;
      const invoicesItem = mapData.estateInvoiceItems;
      this.$delete(mapData, 'estateInvoiceItems');
      const params = {
        invoice: mapData,
        userId: USERID,
        invoiceItems: invoicesItem ? invoicesItem.map(item => {
          return {
            createTime : dateFormat(item.createTime),
            lastUpdateTime : dateFormat(item.lastUpdateTime),
            id: item.id,
            itemName: item.itemName,
            spec : item.spec,
            unit : item.unit,
            counts : item.counts,
            unitPrice : item.unitPrice,
            totalPrice : item.totalPrice,
            taxRate : item.taxRate,
            taxPrice : item.taxPrice,
            invoiceId : item.invoiceId,
            createUser : item.createUser,
            lastUpdateUser : item.lastUpdateUser
          }
        }) : []
      };
      this.addInvoice(params);
    },
    addInvoice(params) {
      supplyInvoice(params).then(() => {
        this.$message({
          message: '补录成功',
          type: 'success'
        });
        this.propsData.isShowContractMsg = true;
        this.$emit('change', this.propsData);
      }, () => {
        this.$message({
          message: '补录失败',
          type: 'failed'
        })
      })
    },
    // 无法识别,验证不通过
    contRecognize() {
      const params = {
        invoice: {
          paymentRequestOrderId: this.paymentOrderId,
          inputLocation: this.inputImg,
          outputLocation: this.outputImg,
          originalFileId: this.originalFileId
        },
        invoiceItems: [],
        userId: USERID
      };
      supplyInvoice(params).then(() => {
        this.$message({
          message: '补录成功',
          type: 'success'
        });
        this.propsData.isShowContractMsg = true;
        this.$emit('change', this.propsData);
      }, () => {
        this.$message({
          message: '补录失败',
          type: 'success'
        });
      })
    }
  },
  mounted() {
    this.paymentOrderId = this.$route.query.paymentOrderId;
  }
}
</script>
<style lang="scss" scoped>
@import '@/scss/mixin.scss';

.contract-supplyment {
  display: flex;
  flex-direction: column;
  height: 100%;
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
        width: 100%;
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
      // height: 300px;
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
          .el-date-editor {
            // width: 100%;
            .el-input__prefix {
              .el-input__icon {
                line-height: 30px;
              }
            }
            .el-input__suffix {
              .el-input__suffix-inner {
                .el-input__icon {
                  line-height: 30px;
                }
              }
            }
            &.el-input {
              width: 100%;
            }
          }
        }
      }
    }
  }
  .btn-list {
    display: flex;
    justify-content: space-around;
    margin-top: auto;
    padding: 30px 0;
    .el-button {
      &.verify-btn {
        @include buttonStyle;
        margin: 0;
        padding: 10px 20px;
      }
      &.submit-btn {
        @include buttonStyle;
        margin: 0;
        padding: 10px 20px;
      }
      &.is-disabled, &.is-disabled:hover {
        @include disbaledButtonStyle;
      }
    }
  }
}
</style>
