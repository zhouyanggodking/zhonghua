<template>
  <div class="identify-result-detail-page">
    <div class="identify-page-title">
      <div class="top-box">
        <bread-crumb :data="breadCrumbList" :currentTitle="currentTitle"></bread-crumb>
      </div>
    </div>
    <div class="identify-pay-detail-page">
      <div class="content">
        <div class="left">
          <div class="title">付款申请原件</div>
          <div class="result" id="result">
            <zoom-image v-if="imagesSrc" :imagePosition="singleImagePosition" style="height:100%;" :imgSrc="imagesSrc" :imageRotate="rotateAngle" ref="img"></zoom-image>
          </div>
        </div>
        <div class="right">
          <div class="container">
            <div class="title">识别结果</div>
            <div class="result">
              <el-form ref="paymentOrderForm" :rules="rules" label-position="right" label-width="160px" :model="paymentOrderForm">
                <el-form-item label="合同名称:" @click.native="filedFocus('合同名称')">
                  <el-input :disabled="isFiledFormEdit" v-model="paymentOrderForm.contractName"></el-input>
                </el-form-item>
                <el-form-item label="合同编号:" @click.native="filedFocus('合同编号')">
                  <el-input :disabled="isFiledFormEdit" v-model="paymentOrderForm.contractNo"></el-input>
                </el-form-item>
                <el-form-item label="付款主题:" @click.native="filedFocus('付款主题')">
                  <el-input :disabled="isFiledFormEdit" v-model="paymentOrderForm.paymentTitle"></el-input>
                </el-form-item>
                <el-form-item label="申请日期:" @click.native="filedFocus('申请日期')">
                  <el-date-picker
                    v-if="!isFiledFormEdit"
                    v-model="paymentOrderForm.requestDate"
                    type="date"
                    value-format="yyyy-MM-dd 00:00:00"
                    placeholder="选择日期">
                  </el-date-picker>
                  <el-input disabled v-else v-model="paymentOrderForm.requestDate"></el-input>
                </el-form-item>
                <el-form-item label="付款单位:" @click.native="filedFocus('付款单位')">
                  <el-input :disabled="isFiledFormEdit" v-model="paymentOrderForm.payer"></el-input>
                </el-form-item>
                <el-form-item label="收款单位:" @click.native="filedFocus('收款单位')">
                  <el-input :disabled="isFiledFormEdit" v-model="paymentOrderForm.receiver"></el-input>
                </el-form-item>
                <el-form-item label="本次应付金额(大写):" @click.native="filedFocus('本次应付金额(大写)')" prop="acountPayable">
                  <el-input :disabled="isFiledFormEdit" v-model="paymentOrderForm.acountPayableUpcase"></el-input>
                </el-form-item>
                <el-form-item label="合同动态金额(¥):" @click.native="filedFocus('合同动态金额')" prop="contractDynamicAmount">
                  <el-input :disabled="isFiledFormEdit" v-model="paymentOrderForm.contractDynamicAmount"></el-input>
                </el-form-item>
                <el-form-item label="累计已付金额(¥):" @click.native="filedFocus('累计已付金额')" prop="paidAmount">
                  <el-input :disabled="isFiledFormEdit" v-model="paymentOrderForm.paidAmount"></el-input>
                </el-form-item>
                <el-form-item label="应付未付金额(¥):" @click.native="filedFocus('应付未付金额')" prop="unpaidAmount">
                  <el-input :disabled="isFiledFormEdit" v-model="paymentOrderForm.unpaidAmount"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="btn-group">
              <el-button class="cancel-btn" @click="previous">返回</el-button>
              <el-button v-if="isFiledFormEdit" class="modify-btn" @click="modifyFile">修改</el-button>
              <el-button v-else class="modify-btn" @click="saveFile">保存</el-button>
            </div>
          </div>
          <div class="save-btn"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumb from "@/components/common/BreadCrumb";
import resourceWrapper from "@/rest/resourceWrapper";
import {dateFormat} from '@/helpers/dateHelper';
import ZoomImage from '@/components/common/ZoomImage';
import localStorageHelper from '@/helpers/localStorageHelper';

let USERID = null;

export default {
  data() {
    return {
      isFiledFormEdit: true,
      paymentOrderId: null,
      tableData: [],
      imagesSrc: '',
      positionInfo: null,
      rotateAngle: '',
      singleImagePosition: [],
      textarea: "",
      isSaveBtn: false,
      paymentOrderForm: {
        id: '',
        contractName: ''
      },
      breadCrumbList: ["首页", "资产识别比对", "比对结果"],
      currentTitle: "付款公司名称-合同编号-付款主题",
      rules: {
        acountPayable: [
          { required: true, message: '请输入金额', trigger: 'blur' },
          { pattern: /^(?=\d+.?\d+$|0)[\d.]{0,20}$/, message: '金额为20位以内数字', trigger: 'blur' }
        ],
        contractDynamicAmount: [
          { required: true, message: '请输入金额', trigger: 'blur' },
          { pattern: /^(?=\d+.?\d+$|0)[\d.]{0,20}$/, message: '金额为20位以内数字', trigger: 'blur' }
        ],
        paidAmount: [
          { required: true, message: '请输入金额', trigger: 'blur' },
          { pattern: /^(?=\d+.?\d+$|0)[\d.]{0,20}$/, message: '金额为20位以内数字', trigger: 'blur' }
        ],
        unpaidAmount: [
          { required: true, message: '请输入金额', trigger: 'blur' },
          { pattern: /^(?=\d+.?\d+$|0)[\d.]{0,20}$/, message: '金额为20位以内数字', trigger: 'blur' }
        ]
      }
      // /(^(?=\d+.?\d+$)[\d.] | 0){0,20}$/
    };
  },
  methods: {
    previous() {
      this.$router.go(-1);
    },
    modifyFile() {
      if (USERID === this.paymentOrderForm.createUser) {
        this.isFiledFormEdit = !this.isFiledFormEdit;
      } else {
        this.$message.error('没有修改权限!');
      }
    },
    saveFile() {
      this.$refs.paymentOrderForm.validate(valid => {
        if(valid) {
          const mapData = {
          id: this.paymentOrderForm.id,
          contractName: this.paymentOrderForm.contractName,
          contractNo: this.paymentOrderForm.contractNo,
          paymentTitle: this.paymentOrderForm.paymentTitle,
          payer: this.paymentOrderForm.payer,
          receiver: this.paymentOrderForm.receiver,
          acountPayable: this.paymentOrderForm.acountPayable,
          contractDynamicAmount: this.paymentOrderForm.contractDynamicAmount,
          paidAmount: this.paymentOrderForm.paidAmount,
          unpaidAmount: this.paymentOrderForm.unpaidAmount,
          requestDate: dateFormat(this.paymentOrderForm.requestDate)
        };
        const params = {
          order: mapData,
          userId: USERID
        }
        resourceWrapper.modifyPaymentOrder(params).then((res) => {
          if (res.status === 200) {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.isFiledFormEdit = !this.isFiledFormEdit;
          } else {
            this.$message({
              message: '修改失败',
              type: 'failed'
            })
          }})
        }
      })
    },
    getPaymentDetailData(){
      const params = {
        userId: USERID,
        id: this.paymentOrderId
      }
      resourceWrapper.getPaymentOrderDetail(params).then(res => {
          this.paymentOrderForm = res.data.order;
          this.paymentOrderForm.paidAmount = this.toDecimal2(res.data.order.paidAmount);this.paymentOrderForm.contractDynamicAmount = this.toDecimal2(res.data.order.contractDynamicAmount);
          this.paymentOrderForm.unpaidAmount = this.toDecimal2(res.data.order.unpaidAmount);
          this.imagesSrc = res.data.order.outputLocation;
          this.positionInfo = JSON.parse(res.data.infos) ? JSON.parse(res.data.infos).position : {};
          this.rotateAngle = JSON.parse(res.data.infos) ? String(JSON.parse(res.data.infos).rotation_angle) : '';
          this.currentTitle = `${res.data.order.payer}-${res.data.order.contractNo}-${res.data.order.paymentTitle}`;
      })
    },
    filedFocus(item) {
      const location_info = this.positionInfo[item];
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
      this.singleImagePosition  = location;
    },
    // 保留两位小数
    toDecimal2(val) {
      let s = val.toString();
      let rs = s.indexOf('.');if (rs < 0) {
        rs = s.length;
        s += '.';
      } while (s.length <= rs + 2)
      { s += '0';}
      return s;
    }
  },
  beforeCreate() {
    USERID = Number(localStorageHelper.getItem('USERID'));
  },
  mounted() {
    this.paymentOrderId=this.$route.query.id;
    this.getPaymentDetailData();
  },
  components: {
    BreadCrumb,
    ZoomImage
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/mixin.scss';

.identify-result-detail-page {
  display: -webkit-box;
  flex: 1;
  flex-direction: column;
  .top-box {
    height: 130px;
    background-color: #ffffff;
    .bread-crumb {
      padding: 14px 20px 0px;
    }
  }
  .identify-pay-detail-page {
    flex: 1;
    margin-top: 30px;
    background: #fff;
    padding: 30px;
    .content {
      display: flex;
      justify-content: center;
      .left {
        display: flex;
        flex-direction: column;
        width: 50%;
        height: 670px;
        border: 1px solid #ebebeb;
        padding: 20px 30px;
        .result {
          // width: 494px;
          flex: 1;
          margin-top: 10px;
          padding-bottom: 20px;
          border: 1px solid #ebebeb;
          .result-img {
            width: 494px;
            height: 100%;
          }
          .img-src {
            display: none;
          }
         
        }
      }
      .right {
        width: 50%;
        margin-left: 20px;
        .container {
          padding: 20px 30px;
          height: 670px;
          background: #fafafa;
          border: 1px solid #ebebeb;
          .result {
            overflow: auto;
            height: 500px;
            padding-top: 30px;
            padding-bottom: 20px;
            margin-top: 10px;
            border-top: 1px solid #ebebeb;
            /deep/ {
              .el-form {
                width: 600px;
                margin-top: 6px;
                padding:  0 20px;
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
            .item {
              margin-bottom: 20px;
              .item_title {
                display: flex;
                justify-content: flex-end;
                font-family: PingFangSC-Semibold;
                font-size: 14px;
                color: #333333;
              }
            }
            .item:last-child {
              margin-bottom: 0;
            }
          }
          .btn-group {
            padding: 30px 0px;
            display: flex;
            justify-content: flex-end;
            .cancel-btn {
              @include cancelBtnStyle;
            }
            .modify-btn {
              margin-left: 40px;
              @include buttonStyle;
            }
          }
        }
        .save-btn {
          margin-top: 30px;
          margin-left: 70%;
        }
      }
    }
  }
}
.title {
  font-family: PingFangSC-Semibold;
  font-size: 18px;
  color: #333333;
}
.red-text {
  color: #d0021b;
}
.divide-line {
  margin: 30px 0;
  height: 1px;
  background: #ebebeb;
}
</style>
