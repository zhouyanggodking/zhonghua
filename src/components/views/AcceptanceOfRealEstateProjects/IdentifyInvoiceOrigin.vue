<template>
  <div class="identify-result-detail-page">
    <div class="top-box">
      <bread-crumb :data="breadCrumbList" :currentTitle="currentTitle"></bread-crumb>
    </div>
    <div class="original-invoice">
      <div class="result">
        <div class="left-img">
          <identify-result-top-banner title="发票图像" :currentPage="currentPage" @change="onImgPageChange"></identify-result-top-banner>
          <div class="img-group">
            <el-carousel ref="carousel" height="350px" :autoplay="imgAutoPlay" indicator-position="none" @change="carouselChange">
              <el-carousel-item v-for="item in 3" :key="item">
                <h3 class="small">{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="right-filed">
          <identify-result-top-banner title="识别结果" @change="onImgPageChange" :currentPage="currentPage"></identify-result-top-banner>
          <el-form label-position="right" label-width="120px" :model="filedResultForm">
            <el-form-item label="发票类型:">
              <el-select v-if="!isFiledFormEdit" :disabled="isFiledFormEdit" v-model="filedResultForm.name" placeholder="">
                <el-option label="专票" value="a"></el-option>
                <el-option label="普票" value="b"></el-option>
              </el-select>
              <el-input v-else :disabled="isFiledFormEdit" v-model="filedResultForm.name"></el-input>
            </el-form-item>
            <el-form-item label="验真状态:">
              <el-select v-if="!isFiledFormEdit" :disabled="isFiledFormEdit" v-model="filedResultForm.name" placeholder="">
                <el-option label="验证通过" value="a"></el-option>
                <el-option label="不通过" value="b"></el-option>
                <el-option label="识别中" value="c"></el-option>
              </el-select>
              <el-input v-else :disabled="isFiledFormEdit" v-model="filedResultForm.name"></el-input>
            </el-form-item>
            <el-form-item label="是否盖章:">
              <el-select v-if="!isFiledFormEdit" :disabled="isFiledFormEdit" v-model="filedResultForm.name" placeholder="">
                <el-option label="是" value="a"></el-option>
                <el-option label="否" value="b"></el-option>
              </el-select>
              <el-input v-else :disabled="isFiledFormEdit" v-model="filedResultForm.name"></el-input>
            </el-form-item>
            <el-form-item label="发票号吗:">
              <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.name"></el-input>
            </el-form-item>
            <el-form-item label="发票代码:">
              <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.name"></el-input>
            </el-form-item>
            <el-form-item label="开票日期:">
              <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.name"></el-input>
            </el-form-item>
            <el-form-item label="购买方:">
              <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.name"></el-input>
            </el-form-item>
            <el-form-item label="购买方税号:">
              <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.name"></el-input>
            </el-form-item>
            <el-form-item label="销售方:">
              <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.name"></el-input>
            </el-form-item>
            <el-form-item label="销售方税号:">
              <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.name"></el-input>
            </el-form-item>
            <el-form-item label="货物或服务名称:">
              <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.name"></el-input>
            </el-form-item>
            <el-form-item label="规格型号:">
              <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.name"></el-input>
            </el-form-item>
            <el-form-item label="规格型号:">
              <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.name"></el-input>
            </el-form-item>
            <el-form-item label="单位:">
              <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.name"></el-input>
            </el-form-item>
            <el-form-item label="数量:">
              <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.name"></el-input>
            </el-form-item>
            <el-form-item label="单价:">
              <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.name"></el-input>
            </el-form-item>
            <el-form-item label="金额:">
              <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.name"></el-input>
            </el-form-item>
            <el-form-item label="税率:">
              <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.name"></el-input>
            </el-form-item>
            <el-form-item label="税额:">
              <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.name"></el-input>
            </el-form-item>
            <el-form-item label="价税合计:">
              <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.name"></el-input>
            </el-form-item>
            <el-form-item label="累积已用金额:">
              <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.name"></el-input>
            </el-form-item>
            <el-form-item label="可用金额:">
              <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.name"></el-input>
            </el-form-item>
            <el-form-item label="凭证联:">
              <el-select v-if="!isFiledFormEdit" :disabled="isFiledFormEdit" v-model="filedResultForm.name" placeholder="">
                <el-option label="发票联" value="a"></el-option>
                <el-option label="抵扣联" value="b"></el-option>
                <el-option label="记账联" value="c"></el-option>
              </el-select>
              <el-input v-else :disabled="isFiledFormEdit" v-model="filedResultForm.name"></el-input>
            </el-form-item>
            <el-form-item label="备注信息:">
              <el-input :disabled="isFiledFormEdit" v-model="filedResultForm.name"></el-input>
            </el-form-item>
          </el-form>
          <div class="btn-list">
            <el-button class="back-btn">返回</el-button>
            <el-button v-if="isFiledFormEdit" class="submit-btn" type="primary" @click="handleClickModify">修改</el-button>
            <el-button v-else class="submit-btn" type="primary" @click="handleClickSave">保存</el-button>
          </div>
        </div>
      </div>
      <div class="footer-btn">
        <el-button>提交验真</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumb from "@/components/common/BreadCrumb";
import IdentifyResultTopBanner from '@/components/common/IdentifyResultTopBanner';

export default {
  data() {
    return {
      isFiledFormEdit: true,
      filedResultForm: {
        name: 'zh'
      },
      currentPage: 1,
      imgAutoPlay: false,
      tableData: [],
      textarea: "",
      breadCrumbList: ["首页", "资产识别比对", "比对结果"],
      currentTitle: "付款公司名称-合同编号-付款主题"
    };
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
    },
    carouselChange(index) {
      this.currentPage = index + 1;
    }
  },
  components: {
    BreadCrumb,
    IdentifyResultTopBanner
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/mixin.scss';

.identify-result-detail-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  .top-box {
    height: 130px;
    background-color: #ffffff;
    .bread-crumb {
      padding: 14px 20px;
    }
  }
  .original-invoice {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 30px;
    margin-top: 20px;
    background-color: #ffffff;
    .result {
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
      .left-img {
        width: 574px;
        padding: 10px 30px 76px 30px;
        margin-right: 10px;
        border: 1px solid #EBEBEB;
        .img-group {
          margin-top: 6px;
          /deep/ {
            .el-carousel {
              border: 1px solid #ededed;
            }
          }
        }
      }
      .right-filed {
        width: 390px;
        padding: 10px 30px 34px 30px;
        margin-left: 10px;
        border: 1px solid #EBEBEB;
        background-color: #FAFAFA;
        /deep/ {
          .el-form {
            height: 300px;
            overflow-y: scroll;
            margin-top: 6px;
            padding:  20px 27px 0 27px;
            border-top: 1px solid #ebebeb;
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
            width: 136px;
            &.back-btn {
              @include cancleBtnStyle;
              margin: 0;
            }
            &.submit-btn {
              @include buttonStyle;
              margin: 0;
            }
          }
        }
      }
    }
    .footer-btn {
      margin-top: auto;
      text-align: right;
      .el-button {
        @include buttonStyle;
        margin: 0;
      }
    }
  }
}
.btn {
  margin-right: 30px;
}
.el-button + .el-button {
  margin-left: 0;
}
.title {
  font-family: PingFangSC-Semibold;
  font-size: 18px;
  color: #9a8b7b;
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
