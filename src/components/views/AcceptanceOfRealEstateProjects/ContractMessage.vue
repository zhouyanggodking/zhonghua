<template>
  <div class="contract-box">
    <div class="payment-order-theme">
      <label>关联付款主题:</label>
      <el-select v-if="!isFiledFormEdit" :disabled="isFiledFormEdit" v-model="paymentRequestOrderId" placeholder="">
        <el-option v-for="(value, key, index) of titleInfos[0]" :key="index" :label="value" :value="key"></el-option>
      </el-select>
      <el-input v-else :disabled="isFiledFormEdit" v-model="paymentOrderTheme"></el-input>
    </div>
    <el-form label-position="right" label-width="120px" :model="filedResultForm">
      <el-form-item label="发票类型:">
        <el-select v-if="!isFiledFormEdit" :disabled="isFiledFormEdit" v-model="filedResultForm.invoiceType" placeholder="">
          <el-option label="专票" value="专票"></el-option>
          <el-option label="普票" value="普票"></el-option>
        </el-select>
        <el-input v-else :disabled="isFiledFormEdit" v-model="filedResultForm.invoiceType"></el-input>
      </el-form-item>
      <el-form-item label="验真状态:">
        <el-select v-if="!isFiledFormEdit" :disabled="isFiledFormEdit" v-model="filedResultForm.verification" placeholder="">
          <el-option v-for="(item, index) in this.verification" :key="index" :label="item" :value="index"></el-option>
        </el-select>
        <el-input v-else :disabled="isFiledFormEdit" v-model="this.verification[filedResultForm.verification]"></el-input>
      </el-form-item>
      <el-form-item label="是否盖章:">
        <el-select v-if="!isFiledFormEdit" :disabled="isFiledFormEdit" v-model="filedResultForm.stamped" placeholder="">
          <el-option v-for="(item, index) in this.stamped" :key="index" :label="item" :value="index"></el-option>
        </el-select>
        <el-input v-else :disabled="isFiledFormEdit" v-model="this.stamped[filedResultForm.stamped]"></el-input>
      </el-form-item>
      <el-form-item label="发票号码:">
        <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.invoiceNo"></el-input>
      </el-form-item>
      <el-form-item label="发票代码:">
        <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.invoiceCode"></el-input>
      </el-form-item>
      <el-form-item label="开票日期:">
        <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.invoiceTime"></el-input>
      </el-form-item>
      <el-form-item label="购买方:">
        <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.buyyerName"></el-input>
      </el-form-item>
      <el-form-item label="购买方税号:">
        <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.buyyerIndentification"></el-input>
      </el-form-item>
      <el-form-item label="销售方:">
        <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.salerName"></el-input>
      </el-form-item>
      <el-form-item label="销售方税号:">
        <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.salerIndentification"></el-input>
      </el-form-item>
      <div class="goods-list" v-for="(item, index) in filedResultForm.estateInvoiceItems" :key="index">
        <el-form-item label="货物或服务名称:">
          <el-input :disabled="isFiledFormEdit" v-model="item.itemName"></el-input>
        </el-form-item>
        <el-form-item label="规格型号:">
          <el-input :disabled="isFiledFormEdit" v-model="item.spec"></el-input>
        </el-form-item>
        <el-form-item label="单位:">
          <el-input :disabled="isFiledFormEdit" v-model="item.unit"></el-input>
        </el-form-item>
        <el-form-item label="数量:">
          <el-input :disabled="isFiledFormEdit" v-model="item.counts"></el-input>
        </el-form-item>
        <el-form-item label="单价:">
          <el-input :disabled="isFiledFormEdit" v-model="item.unitPrice"></el-input>
        </el-form-item>
        <el-form-item label="金额:">
          <el-input :disabled="isFiledFormEdit" v-model="item.totalPrice"></el-input>
        </el-form-item>
        <el-form-item label="税率:">
          <el-input :disabled="isFiledFormEdit" v-model="item.taxRate"></el-input>
        </el-form-item>
        <el-form-item label="税额:">
          <el-input :disabled="isFiledFormEdit" v-model="item.taxPrice"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="价税合计:">
        <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.finalPriceUpcase"></el-input>
      </el-form-item>
      <el-form-item label="累积已用金额:">
        <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.usedPrice"></el-input>
      </el-form-item>
      <el-form-item label="本次使用金额:">
        <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.usePrice"></el-input>
      </el-form-item>
      <el-form-item label="凭证联:">
        <el-select v-if="!isFiledFormEdit" :disabled="isFiledFormEdit" v-model="filedResultForm.certification" placeholder="">
          <el-option label="发票联" value="0"></el-option>
          <el-option label="抵扣联" value="1"></el-option>
          <el-option label="记账联" value="2"></el-option>
        </el-select>
        <el-input v-else :disabled="isFiledFormEdit" v-model="filedResultForm.certification"></el-input>
      </el-form-item>
      <el-form-item label="备注信息:">
        <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.remarkInfo"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn-list">
      <el-button class="back-btn">返回</el-button>
      <el-button class="verify-btn" @click="invoiceSupply">发票补录</el-button>
      <el-button v-if="isFiledFormEdit" class="submit-btn" type="primary" @click="handleClickModify">修改</el-button>
      <el-button v-else class="submit-btn" type="primary" @click="handleClickSave">保存</el-button>
    </div>
  </div>
</template>
<script>
import { modifyInvoice } from '@/rest/realEstateUploadApi';
// import {USERID} from '@/global/global';
import {dateFormat} from '@/helpers/dateHelper';

export default {
  data() {
    return {
      paymentOrderTheme: '',
      paymentRequestOrderId: 1,
      invoiceId: null,
      stamped: ['否', '是'],
      verification: ['未通过', '通过', '未验真'],
      isFiledFormEdit: true,
      goodsList: [],
      filedResultForm: {},
      currentPage: 1,
      imgAutoPlay: false,
      tableData: [],
      textarea: "",
      breadCrumbList: ["首页", "资产识别比对", "识别结果"],
      currentTitle: "付款公司名称-合同编号-付款主题"
    };
  },
  props: {
    contractData: {
      type: Object
    },
    titleInfos: {
      type: Array
    }
  },
  methods: {
    onImgPageChange(pageNum) {
      this.$refs.carousel.setActiveItem(pageNum-1);
    },
    handleClickModify() {
      this.isFiledFormEdit = !this.isFiledFormEdit;
    },
    handleClickSave() {
      this.isFiledFormEdit = !this.isFiledFormEdit;
      this.modifyInvoice();
    },
    carouselChange(index) {
      this.currentPage = index + 1;
    },
    invoiceSupply() {
      this.$emit('change', false);
    },
    modifyInvoice() {
      const mapData = this.filedResultForm;
      mapData.createTime = dateFormat(mapData.createTime);
      mapData.invoiceTime = dateFormat(mapData.invoiceTime);
      mapData.lastUpdateTime = dateFormat(mapData.lastUpdateTime);
      const invoicesItem = mapData.estateInvoiceItems;
      this.$delete(mapData, 'estateInvoiceItems');
      const params = {
        invoice: mapData,
        paymentRequestOrderId: this.paymentRequestOrderId,
        estateInvoiceItems: invoicesItem.map(item => {
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
        })
      };
      modifyInvoice(params).then(() => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      }, () => {
        this.$message({
          message: '修改失败',
          type: 'failed'
        })
      })
    }
  },
  mounted() {
    this.invoiceId = this.$route.query.id;
    this.paymentOrderTheme = this.$route.query.title;
    this.filedResultForm = JSON.parse(JSON.stringify(this.contractData));
    this.paymentRequestOrderId = this.$route.query.paymentOrderId;
  }
};
</script>
<style lang="scss" scoped>
@import '@/scss/mixin.scss';

.contract-box {
  display: flex;
  flex-direction: column;
  height: 100%;
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
    margin-top: auto;
    padding: 30px 0px;
    .el-button {
      width: 136px;
      &.back-btn {
        @include cancleBtnStyle;
        margin: 0;
      }
      &.submit-btn {
        @include buttonStyle;
        margin: 0;
      }
      &.verify-btn {
        @include verifyBtnStyle;
        margin: 0;
        padding: 10px 20px;
      }
    }
  }
}
</style>
