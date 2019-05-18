<template>
  <div class="identify-result-detail-page">
    <div class="top-box">
      <bread-crumb :data="breadCrumbList" :currentTitle="currentTitle"></bread-crumb>
    </div>
    <div class="original-invoice">
      <div class="result">
        <div class="left-img">
          <identify-result-top-banner title="发票图像" :currentPage="currentPage" :total="invoicesMessage.length" @change="onImgPageChange"></identify-result-top-banner>
          <div class="img-group">
            <el-carousel ref="imgCarousel" height="100%" :autoplay="imgAutoPlay" indicator-position="none" @change="carouselChange">
              <el-carousel-item v-for="item in invoicesMessage.length" :key="item">
                <img
                  :id="`img${item}`"
                  ref="image"
                  class="img-src"
                  :src="imagesSrc"
                  height="633"
                  width="494"
                >
                <!-- <img
                  id="img1"
                  ref="image"
                  class="img-src"
                  :src="imagesSrc"
                  height="633"
                  width="494"
                > -->
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="right-filed">
          <identify-result-top-banner title="识别结果" @change="onImgPageChange" :total="invoicesMessage.length" :currentPage="currentPage"></identify-result-top-banner>
          <el-carousel ref="invoiceCarousel" height="100%" :autoplay="imgAutoPlay" indicator-position="none" @change="carouselChange">
            <el-carousel-item v-for="(item, index) in invoicesMessage" :key="index">
              <contract-message v-if="isShowContractMsg" :titleInfos="simpleInfos" :contractData="item" @change="toggleInvoice"></contract-message>
              <contract-supplyment v-else :titleInfos="simpleInfos" @change="toggleInvoice"></contract-supplyment>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="footer-btn">
        <el-button>提交验真</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {USERID} from '@/global/global';
import Viewer from "viewerjs";
import {global_} from "@/global/global";
import { getTotalInvoices, getSimpleInfos } from "@/rest/realEstateUploadApi";
import BreadCrumb from "@/components/common/BreadCrumb";
import ContractSupplyment from "@/components/views/AcceptanceOfRealEstateProjects/ContractSupplyment";
import ContractMessage from "@/components/views/AcceptanceOfRealEstateProjects/ContractMessage";
import IdentifyResultTopBanner from '@/components/common/IdentifyResultTopBanner';

export default {
  data() {
    return {
      isShowContractMsg: true,
      // imagesSrc: "http://www.pptbz.com/pptpic/UploadFiles_6909/201201/20120101182704481.jpg",
      paymentOrderTheme: '',
      imagesSrc: "http://10.17.17.151:8080/opt/output/test.png",
      paymentRequestId: null,
      stamped: ['否', '是'],
      currentPage: 1,
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
      this.isShowContractMsg = res;
    },
    onImgPageChange(pageNum) {
      this.$refs.invoiceCarousel.setActiveItem(pageNum-1);
      this.$refs.imgCarousel.setActiveItem(pageNum-1);
    },
    handleClickModify() {
      this.isFiledFormEdit = !this.isFiledFormEdit;
    },
    handleClickSave() {
      this.isFiledFormEdit = !this.isFiledFormEdit;
    },
    carouselChange(index) {
      this.$refs.imgCarousel.setActiveItem(index);
      this.$refs.invoiceCarousel.setActiveItem(index);
      this.currentPage = index + 1;
      if (this.invoicesMessage.length) {
        this.imagesSrc = `${global_}${this.invoicesMessage[index].outputLocation}`;
      }
      // this.initInvoiceViewer();
    },
    fetchTotalInvoices() {
      const params = {
        paymentRequestId: this.paymentRequestId,
        userId: 1
      }
      getTotalInvoices(params).then(res => {
        this.invoicesMessage = res.data.data.invoices;
        this.infos = res.data.data.infos;
        this.initInvoiceViewer();
      })
    },
    // 获取付款主题
    getSimpleInfos() {
      getSimpleInfos(USERID).then(res => {
        this.simpleInfos = res.data.data;
      })
    },
    initInvoiceViewer() {
      this.invoicesMessage.map((item, index) => {
        console.log(index);
        console.log(document.getElementById("img1"));
        const viewer = new Viewer(document.getElementById(`img${index+1}`), {
        // const viewer = new Viewer(document.getElementById("image"), {
          inline: true,
          button: false, //右上角按钮
          navbar: false, //底部缩略图
          title: false, //当前图片标题
          toolbar: false, //底部工具栏
          tooltip: true, //显示缩放百分比
          movable: true, //是否可以移动
          zoomable: true, //是否可以缩放
          rotatable: true, //是否可旋转
          scalable: true, //是否可翻转
          transition: true, //使用 CSS3 过度
          fullscreen: false, //播放时是否全屏
          keyboard: true, //是否支持键盘
          viewed() {
            viewer.zoomTo(1);
          }
        });
      })
    }
  },
  mounted() {
    this.paymentRequestId = this.$route.query.paymentOrderId;
    this.paymentOrderTheme = this.$route.query.title;
    this.currentTitle = `${this.$route.query.payer}-${this.$route.query.contractNo}-${this.$route.query.title}`;
    this.fetchTotalInvoices();
    this.getSimpleInfos();
    // this.initInvoiceViewer();
    // const viewer = new Viewer(document.getElementById("image"), {
    //   inline: true,
    //   button: false, //右上角按钮
    //   navbar: false, //底部缩略图
    //   title: false, //当前图片标题
    //   toolbar: false, //底部工具栏
    //   tooltip: true, //显示缩放百分比
    //   movable: true, //是否可以移动
    //   zoomable: true, //是否可以缩放
    //   rotatable: true, //是否可旋转
    //   scalable: true, //是否可翻转
    //   transition: true, //使用 CSS3 过度
    //   fullscreen: false, //播放时是否全屏
    //   keyboard: true, //是否支持键盘
    //   viewed() {
    //     viewer.zoomTo(1);
    //   }
    // });
  },
  components: {
    BreadCrumb,
    IdentifyResultTopBanner,
    ContractSupplyment,
    ContractMessage
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
    min-height: 1000px;
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
        width: 574px;
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
            }
          }
        }
      }
      .right-filed {
        // width: 390px;
        width: 800px;
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
