<template>
  <div class="contract-box">
    <div class="payment-order-theme">
      <label>关联付款主题:</label>
      <el-select v-if="!isFiledFormEdit" :disabled="isFiledFormEdit" v-model="paymentRequestOrderId" placeholder="">
        <el-option v-for="(value, key, index) of titleInfos[0]" :key="index" :label="value" :value="key"></el-option>
      </el-select>
      <el-input v-else :disabled="isFiledFormEdit" v-model="paymentOrderTheme"></el-input>
    </div>
    <el-form ref="filedResultForm" label-position="right" :rules="rules" label-width="120px" :model="filedResultForm">
      <el-form-item label="发票类型:" @click.native="filedFocus('发票类型')" prop="invoiceType">
        <el-select v-if="!isFiledFormEdit" :disabled="isFiledFormEdit" v-model="filedResultForm.invoiceType" placeholder="">
          <el-option label="专票" value="专票"></el-option>
          <el-option label="普票" value="普票"></el-option>
        </el-select>
        <el-input v-else :disabled="isFiledFormEdit" v-model="filedResultForm.invoiceType"></el-input>
      </el-form-item>
      <el-form-item label="验真状态:" @click.native="filedFocus('验真状态')">
        <el-select v-if="!isFiledFormEdit" :disabled="isFiledFormEdit" v-model="filedResultForm.verification" placeholder="">
          <el-option v-for="(item, index) in this.verification" :key="index" :label="item" :value="index"></el-option>
        </el-select>
        <el-input v-else :disabled="isFiledFormEdit" v-model="this.verification[filedResultForm.verification]"></el-input>
      </el-form-item>
      <el-form-item label="是否盖章:" @click.native="filedFocus('是否盖章')">
        <el-select v-if="!isFiledFormEdit" :disabled="isFiledFormEdit" v-model="filedResultForm.stamped" placeholder="">
          <el-option v-for="(item, index) in this.stamped" :key="index" :label="item" :value="index"></el-option>
        </el-select>
        <el-input v-else :disabled="isFiledFormEdit" v-model="this.stamped[filedResultForm.stamped]"></el-input>
      </el-form-item>
      <el-form-item label="发票号码:" @click.native="filedFocus('发票号码')" prop="invoiceNo">
        <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.invoiceNo"></el-input>
      </el-form-item>
      <el-form-item label="发票代码:" @click.native="filedFocus('发票代码')" prop="invoiceCode">
        <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.invoiceCode"></el-input>
      </el-form-item>
      <el-form-item label="开票日期:" @click.native="filedFocus('开票日期')">
        <el-date-picker
          v-if="!isFiledFormEdit"
          v-model="filedResultForm.invoiceTime"
          type="date"
          value-format="yyyy-MM-dd 00:00:00"
          placeholder="选择日期">
        </el-date-picker>
        <el-input disabled v-else v-model="filedResultForm.invoiceTime"></el-input>
      </el-form-item>
      <el-form-item label="购买方:" @click.native="filedFocus('购买方')">
        <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.buyyerName"></el-input>
      </el-form-item>
      <el-form-item label="购买方税号:" @click.native="filedFocus('购买方税号')">
        <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.buyyerIndentification"></el-input>
      </el-form-item>
      <el-form-item label="销售方:" @click.native="filedFocus('销售方')">
        <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.salerName"></el-input>
      </el-form-item>
      <el-form-item label="销售方税号:" @click.native="filedFocus('销售方税号')">
        <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.salerIndentification"></el-input>
      </el-form-item>
      <div class="goods-list" v-for="(item, index) in filedResultForm.estateInvoiceItems" :key="index">
        <el-form-item label="货物或服务名称:" @click.native="filedFocus('货物或服务名称')">
          <el-input :disabled="isFiledFormEdit" v-model="item.itemName"></el-input>
        </el-form-item>
        <el-form-item label="规格型号:" @click.native="filedFocus('规格型号')">
          <el-input :disabled="isFiledFormEdit" v-model="item.spec"></el-input>
        </el-form-item>
        <el-form-item label="单位:" @click.native="filedFocus('单位')">
          <el-input :disabled="isFiledFormEdit" v-model="item.unit"></el-input>
        </el-form-item>
        <el-form-item label="数量:" @click.native="filedFocus('数量')">
          <el-input :disabled="isFiledFormEdit" v-model="item.counts"></el-input>
        </el-form-item>
        <el-form-item label="单价:" @click.native="filedFocus('单价')">
          <el-input :disabled="isFiledFormEdit" v-model="item.unitPrice"></el-input>
        </el-form-item>
        <el-form-item label="金额:" @click.native="filedFocus('金额')">
          <el-input :disabled="isFiledFormEdit" v-model="item.totalPrice"></el-input>
        </el-form-item>
        <el-form-item label="税率:" @click.native="filedFocus('税率')">
          <el-input :disabled="isFiledFormEdit" v-model="item.taxRate"></el-input>
        </el-form-item>
        <el-form-item label="税额:" @click.native="filedFocus('税额')">
          <el-input :disabled="isFiledFormEdit" v-model="item.taxPrice"></el-input>
        </el-form-item>
      </div>
      <el-form-item label="价税合计:" @click.native="filedFocus('价税合计')">
        <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.finalPrice"></el-input>
      </el-form-item>
      <el-form-item label="累积已用金额:" @click.native="filedFocus('累积已用金额')">
        <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.usedPrice"></el-input>
      </el-form-item>
      <el-form-item label="本次使用金额:" @click.native="filedFocus('本次使用金额')" prop="usePrice">
        <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.usePrice"></el-input>
      </el-form-item>
      <el-form-item label="凭证联:" @click.native="filedFocus('凭证联')">
        <el-select v-if="!isFiledFormEdit" :disabled="isFiledFormEdit" v-model="filedResultForm.certification" placeholder="">
          <el-option label="发票联" value="0"></el-option>
          <el-option label="抵扣联" value="1"></el-option>
          <el-option label="记账联" value="2"></el-option>
        </el-select>
        <el-input v-else :disabled="isFiledFormEdit" v-model="filedResultForm.certification"></el-input>
      </el-form-item>
      <el-form-item label="备注信息:" @click.native="filedFocus('备注信息')">
        <el-input type="textarea" maxlength="100" show-word-limit :disabled="isFiledFormEdit" v-model="filedResultForm.remarkInfo"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn-list">
      <el-button class="back-btn" @click="goBack">返回</el-button>
      <el-button class="verify-btn" @click="invoiceSupply">发票补录</el-button>
      <el-button v-if="isFiledFormEdit" class="submit-btn" type="primary" @click="handleClickModify">修改</el-button>
      <el-button v-else class="submit-btn" type="primary" @click="handleClickSave">保存</el-button>
    </div>
  </div>
</template>
<script>
import { modifyInvoice } from '@/rest/realEstateUploadApi';
import {USERID} from '@/global/global';
import {dateFormat} from '@/helpers/dateHelper';

export default {
  data() {
    return {
      imagesSrc: 
        "http://www.pptbz.com/pptpic/UploadFiles_6909/201201/20120101182704481.jpg"
      ,
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
      currentTitle: "付款公司名称-合同编号-付款主题",
      propsData: {
        isShowContractMsg: true,
        singleFieldPosition: []
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
        usePrice: [
          { required: true, message: '请输入金额', trigger: 'blur' },
          { pattern: /^(?=\d+.?\d+$)[\d.]{0,20}$/, message: '金额为20位内数字', trigger: 'blur' }
        ]
      }
    };
  },
  props: {
    contractData: {
      type: Object
    },
    titleInfos: {
      type: Array
    },
    index: {
      type: Number
    },
    positionInfos: {
      type: Array
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onImgPageChange(pageNum) {
      this.$refs.carousel.setActiveItem(pageNum-1);
    },
    handleClickModify() {
      this.isFiledFormEdit = !this.isFiledFormEdit;
    },
    handleClickSave() {
      // this.isFiledFormEdit = !this.isFiledFormEdit;
      this.$refs.filedResultForm.validate(valid => {
        if(valid) {
          this.modifyInvoice();
        }
      })
    },
    carouselChange(index) {
      this.currentPage = index + 1;
    },
    invoiceSupply() {
      this.propsData.isShowContractMsg = false;
      this.$emit('change', this.propsData);
    },
    modifyInvoice() {
      const mapData = this.filedResultForm;
      mapData.createTime = dateFormat(mapData.createTime);
      mapData.invoiceTime = dateFormat(mapData.invoiceTime);
      mapData.lastUpdateTime = dateFormat(mapData.lastUpdateTime);
      mapData.paymentRequestOrderId = this.paymentRequestOrderId;
      const invoicesItem = mapData.estateInvoiceItems;
      this.$delete(mapData, 'estateInvoiceItems');
      const params = {
        invoice: mapData,
        userId: USERID,
        invoiceItems: invoicesItem.map(item => {
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
        });
        this.isFiledFormEdit = !this.isFiledFormEdit;
      }, () => {
        this.$message({
          message: '修改失败',
          type: 'failed'
        })
      })
    },
    filedFocus(item) {
      const location_info = JSON.parse(this.positionInfos[this.index]).position_info[item];
      const location = location_info ? (location_info.hasOwnProperty('filePath') ? [{
        'imgUrl': this.imagesSrc,
        'x': location_info.left,
        'y': location_info.top,
        'width': location_info.width,
        'height': location_info.height,
        borderColor: 'red',
      }] : [{
        'x': location_info.left,
        'y': location_info.top,
        'width': location_info.width,
        'height': location_info.height,
        borderColor: 'red',
      }]) : [];
      let imageUrl = location.length ? location[0].imgUrl : '';
      if (imageUrl && imageUrl != 'undefined') {
        this.propsData.singleImagePosition = location;
        this.$emit('change', this.propsData);
      }
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
          .el-textarea {
            &.is-disabled {
              .el-textarea__inner {
                border: none !important;
                color: #333333;
                background-color: #FAFAFA !important;
                cursor: default;
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
