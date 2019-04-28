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
          <div class="result">
            <img
              id="image"
              class="img-src"
              :src="imagesSrc"
              height="633"
              width="494"
            >
          </div>
        </div>
        <div class="right">
          <div class="container">
            <div class="title">识别结果</div>
            <div class="result">
              <el-row class="item" v-for="(item,index) in itemResult" :key="index" :gutter="10">
                <el-col :span="10" class="item_title col-6">{{item}}</el-col>
                <el-col :span="14" class="item_num col-18"></el-col>
              </el-row>
            </div>
            <div class="btn-group">
              <el-button class="cancel-btn" @click="previous">返回</el-button>
              <el-button v-if="!isSaveBtn" class="modify-btn" @click="modifyFile">修改</el-button>
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
import Viewer from "viewerjs";
import BreadCrumb from "@/components/common/BreadCrumb";

export default {
  data() {
    return {
      tableData: [],
      imagesSrc: 
        "http://www.pptbz.com/pptpic/UploadFiles_6909/201201/20120101182704481.jpg"
      ,
      textarea: "",
      isSaveBtn: false,
      itemResult: [
        "合同名称：",
        "合同编号：",
        "付款主题：",
        "申请日期：",
        "付款单位：",
        "收款单位：",
        "本次应付金额（大写）：",
        "合同动态金额（¥）：",
        "累计已付金额（¥）：",
        "应付未付金额（¥）："
      ],
      breadCrumbList: ["首页", "资产识别比对", "比对结果"],
      currentTitle: "付款公司名称-合同编号-付款主题"
    };
  },
  methods: {
    previous() {
      this.$router.go(-1);
    },
    modifyFile() {
      this.isSaveBtn = true;
    },
    saveFile() {
      this.isSaveBtn = false;
    }
  },
  mounted() {
    const viewer = new Viewer(document.getElementById("image"), {
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
  },
  components: {
    BreadCrumb
  }
};
</script>

<style lang="scss" scoped>
.identify-result-detail-page {
  .top-box {
    height: 130px;
    background-color: #ffffff;
    .bread-crumb {
      padding: 14px 20px 0px;
    }
  }
  .identify-pay-detail-page {
    margin-top: 30px;
    background: #fff;
    padding: 30px;
    .content {
      display: flex;
      justify-content: center;
      .left {
        width: 494px;
        height: 670px;
        border: 1px solid #ebebeb;
        padding: 20px 30px;
        .result {
          width: 494px;
          height: 633px;
          margin-top: 10px;
          border: 1px solid #ebebeb;
          .result-img {
            width: 494px;
            height: 633px;
          }
          .img-src {
            display: none;
          }
         
        }
      }
      .right {
        margin-left: 20px;
        width: 530px;
        height: 780px;
        .container {
          padding: 20px 30px;
          width: 470px;
          height: 670px;
          background: #fafafa;
          border: 1px solid #ebebeb;
          .result {
            overflow: auto;
            height: 540px;
            padding-top: 30px;
            padding-bottom: 20px;
            margin-top: 10px;
            border-top: 1px solid #ebebeb;

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
            display: flex;
            justify-content: flex-end;
            height: 40px;
            .modify-btn {
              margin-left: 40px;
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
/deep/ .el-button {
  width: 135px;
  background: #c1b071;
  border-radius: 4px;
  border-color: #c1b071;
  span {
    font-size: 14px;
    color: #ffffff;
  }
  &:hover {
    background-color: #e9d58b;
    border-color: #e9d58b;
  }
}
.el-button:active {
  border-color: #c1b071;
  color: #fff;
}
/deep/ .cancel-btn {
  background: #ffffff;
  border: 1px solid #d9d9d9;
  span {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #666666 !important;
  }
  &:hover {
    background-color: #fff;
    border-color: #d9d9d9;
  }
  &:active {
    border-color: #d9d9d9;
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
