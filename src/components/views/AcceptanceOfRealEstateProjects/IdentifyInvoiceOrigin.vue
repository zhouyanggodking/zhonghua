<template>
  <div class="identify-result-detail-page">
    <div class="top-box">
      <bread-crumb :data="breadCrumbList" :currentTitle="currentTitle"></bread-crumb>
    </div>
    <div class="original-invoice">
      <div class="result">
        <div class="left-img" v-loading="isLoading">
          <identify-result-top-banner title="发票图像" :currentPage="currentPage" :total="invoicesMessage.length" @change="onImgPageChange"></identify-result-top-banner>
          <div class="img-group">
            <el-carousel ref="imgCarousel" height="100%" :autoplay="imgAutoPlay" indicator-position="none" :initial-index="currentPage - 1" @change="imgCarouselChange">
              <el-carousel-item v-for="item in invoicesMessage.length" :key="item">
                <zoom-image :imagePosition="singleImagePosition" style="height:100%;" :imgSrc="invoicesMessage[item-1].outputLocation" :imageRotate="String(rotateAngleList[item-1])" ref="img"></zoom-image>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="right-filed" v-loading="isLoading">
          <identify-result-top-banner title="识别结果" @change="onImgPageChange" :total="invoicesMessage.length" :currentPage="currentPage"></identify-result-top-banner>
          <el-carousel ref="invoiceCarousel" height="100%" :autoplay="imgAutoPlay" indicator-position="none" :initial-index="currentPage - 1">
            <el-carousel-item v-for="(item, index) in invoicesMessage" :key="index">
              <contract-message v-if="isShowContractMsg" :titleInfos="simpleInfos" :contractData="item" :index="index" :positionInfos="infos"  @change="toggleInvoice"></contract-message>
              <contract-supplyment :originalFileId="item.originalFileId" :outputImg="item.outputLocation" :inputImg="item.inputLocation" v-else :titleInfos="simpleInfos" @change="toggleInvoice"></contract-supplyment>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <!-- <div class="footer-btn">
        <el-button>提交验真</el-button>
      </div> -->
    </div>
  </div>
</template>
<script>
import { getTotalInvoices, getSimpleInfos } from "@/rest/realEstateUploadApi";
import BreadCrumb from "@/components/common/BreadCrumb";
import ContractSupplyment from "@/components/views/AcceptanceOfRealEstateProjects/ContractSupplyment";
import ContractMessage from "@/components/views/AcceptanceOfRealEstateProjects/ContractMessage";
import IdentifyResultTopBanner from '@/components/common/IdentifyResultTopBanner';
import ZoomImage from '@/components/common/ZoomImage';
import localStorageHelper from '@/helpers/localStorageHelper';

let USERID = null;

export default {
  data() {
    return {
      isLoading: false,
      singleImagePosition: null,
      rotateAngle: null,
      locationInfos: null,
      isShowContractMsg: true,
      imagesSrc: "",
      paymentOrderTheme: '',
      paymentRequestId: null,
      stamped: ['否', '是'],
      currentPage: 2,
      imgAutoPlay: false,
      tableData: [],
      textarea: "",
      breadCrumbList: ["首页", "资产识别比对", "识别结果"],
      currentTitle: "付款公司名称-合同编号-付款主题",
      invoicesMessage: [],
      infos: [],
      simpleInfos: []
    };
  },
  methods: {
    toggleInvoice(res) {
      this.isShowContractMsg = res.isShowContractMsg;
      this.singleImagePosition = res.singleImagePosition;
    },
    onImgPageChange(pageNum) {
      this.$refs.invoiceCarousel.setActiveItem(pageNum-1);
      this.$refs.imgCarousel.setActiveItem(pageNum-1);
      this.currentPage = Number(pageNum);
    },
    handleClickModify() {
      this.isFiledFormEdit = !this.isFiledFormEdit;
    },
    handleClickSave() {
      this.isFiledFormEdit = !this.isFiledFormEdit;
    },
    imgCarouselChange(index) {
      this.$refs.imgCarousel.setActiveItem(index);
      this.$refs.invoiceCarousel.setActiveItem(index);
      this.currentPage = (index + 1);
      this.singleImagePosition = [];
    },
    fetchTotalInvoices() {
      this.isLoading = true;
      this.invoicesMessage = [];
      const params = {
        paymentRequestId: this.paymentRequestId,
        userId: USERID
      }
      getTotalInvoices(params).then(res => {
        this.invoicesMessage = res.data.data.invoices;
        this.infos = res.data.data.infos;
        const rotateAngleList = res.data.data.infos.map(item => {
          return JSON.parse(item).rotation_angle
        });
        this.rotateAngleList = rotateAngleList;
        this.isLoading = false;
      })
    },
    // 获取付款主题
    getSimpleInfos() {
      getSimpleInfos(USERID).then(res => {
        this.simpleInfos = res.data.data;
      })
    }
  },
  watch: {
    isShowContractMsg() {
      this.fetchTotalInvoices();
    }
  },
  beforeCreate() {
    USERID = Number(localStorageHelper.getItem('USERID'));
  },
  mounted() {
    this.currentPage = Number(this.$route.query.index);
    this.paymentRequestId = this.$route.query.paymentOrderId;
    this.paymentOrderTheme = this.$route.query.title;
    this.currentTitle = `${this.$route.query.payer}-${this.$route.query.contractNo}-${this.$route.query.title}`;
    this.fetchTotalInvoices();
    this.getSimpleInfos();
  },
  components: {
    BreadCrumb,
    IdentifyResultTopBanner,
    ContractSupplyment,
    ContractMessage,
    ZoomImage
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
    min-height: 600px;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 30px;
    margin-top: 20px;
    background-color: #ffffff;
    .result {
      display: flex;
      height: 100%;
      justify-content: center;
      margin-bottom: 30px;
      .left-img {
        flex-shrink: 0;
        width: 50%;
        padding: 10px 30px 76px 30px;
        margin-right: 10px;
        border: 1px solid #EBEBEB;
        .img-group {
          height: 100%;
          margin-top: 6px;
          /deep/ {
            .el-carousel {
              height: 100%;
              border: 1px solid #ededed;
              .el-carousel__item {
                .viewer-backdrop {
                  background-color: #ffffff;
                }
              }
            }
          }
        }
      }
      .right-filed {
        // width: 390px;
        flex-shrink: 0;
        width: 50%;
        padding: 10px 30px 34px 30px;
        margin-left: 10px;
        border: 1px solid #EBEBEB;
        background-color: #FAFAFA;
        .top-pagination {
          padding-bottom: 6px;
          border-bottom: 1px solid #eee;
        }
        /deep/ {
          .el-carousel {
            height: 100%;
            .el-carousel__container {
              height: 100%;
              .el-carousel__arrow {
                display: none;
              }
            }
          }
        }
      }
    }
    // .footer-btn {
    //   margin-top: auto;
    //   text-align: right;
    //   .el-button {
    //     @include buttonStyle;
    //     margin: 0;
    //   }
    // }
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
