<template>
  <div class="index-page">
    <div class="index-logo">
      {{userName}}，欢迎登录智鉴通系统!
    </div>
    <div class="files-count-group">
      <div class="count-box payment-box">
        <div class="icon payment-icon"></div>
        <div class="type">付款申请</div>
        <div class="file-count">已上传资料{{paymentFilesCount.fileCountTotal || 0}}份</div>
        <div class="btn-group">
          <router-link to="/realEstateIdentifyResult">
            <el-button class="download-btn">去下载</el-button>
          </router-link>
          <router-link to="/realEstateUpload">
            <el-button class="upload-btn">去上传</el-button>
          </router-link>
        </div>
      </div>
      <div class="count-box ele-file-box">
        <div class="icon ele-file-icon"></div>
        <div class="type">电子版征信授权书</div>
        <div class="file-count">已上传资料{{eleFilesCount.fileCountTotal || 0}}份</div>
        <div class="btn-group">
          <router-link to="/creditElectronicBatchInformation">
            <el-button class="download-btn">去下载</el-button>
          </router-link>
          <router-link to="/creditUpload">
            <el-button class="upload-btn">去上传</el-button>
          </router-link>
        </div>
      </div>
      <div class="count-box paper-file-box">
        <div class="icon paper-file-icon"></div>
        <div class="type">纸质版征信授权书</div>
        <div class="file-count">已上传资料{{paperFilesCount.fileCountTotal || 0}}份</div>
        <div class="btn-group">
          <router-link to="/creditPaperBatchInformation">
            <el-button class="download-btn">去下载</el-button>
          </router-link>
          <router-link to="/creditUpload">
            <el-button class="upload-btn">去上传</el-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LocalStorageHelper from '@/helpers/localStorageHelper'; 
import {getFileCounts} from '@/rest/indexApi';
import {USERID} from '@/global/global';

const USERNAME = 'USERNAME';

export default {
  data() {
    return {
      userName: '',
      filesCountList: [
        {
          title: '付款申请上传',
          type: 'upload',
          count: 10
        },
        {
          title: '付款申请提取结果下载',
          type: 'download',
          count: 10
        },
        {
          title: '电子版征信授权书上传',
          type: 'upload',
          count: 10
        },
        {
          title: '征信授权书结果下载',
          type: 'download',
          count: 10
        },
        {
          title: '纸质版征信授权书上传',
          type: 'upload',
          count: 10
        },
        {
          title: '征信授权书结果下载',
          type: 'download',
          count: 10
        }
      ],
      paymentFilesCount: {},
      eleFilesCount: {},
      paperFilesCount: {}
    };
  },
  methods: {
    fetFilesCounts() {
      const params = {
        userId: USERID,
        businessTypeId: ''
      };
      getFileCounts(params).then(res => {
        this.paymentFilesCount = res.filter(item => item.businessTypeId === 1)[0];
        this.eleFilesCount = res.filter(item => item.businessTypeId === 3)[0];
        this.paperFilesCount = res.filter(item => item.businessTypeId === 4)[0];
      })
    }
  },
  mounted() {
    this.userName = LocalStorageHelper.getItem(USERNAME);
    this.fetFilesCounts();
  },
}
</script>
<style lang="scss" scoped>
@import '@/scss/mixin.scss';

p {
  padding: 0;
  margin: 0;
}
.index-page {
  .index-logo {
    height: 110px;
    line-height: 110px;
    padding-left: 30px;
    font-size: 26px;
    font-weight: bold;
    color: #666666;
    background: url('../../assets/imgs/logo-bg.svg') #ffffff no-repeat right bottom;
    background-size: 100%;
    background-position: bottom;
  }
  .files-count-group {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 10px;
    .count-box {
      display: flex;
      margin: 20px 0 0 0;
      padding: 50px 20px 80px;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      background: url('../../assets/imgs/file-bg.svg') no-repeat;
      background-position: bottom right;
      background-color: #ffffff;
      &>.icon {
        width: 78px;
        height: 78px;
        &.payment-icon {
          background: url('../../assets/imgs/payment-icon.svg') no-repeat;
        }
        &.ele-file-icon {
          background: url('../../assets/imgs/ele-file-icon.svg') no-repeat;
        }
        &.paper-file-icon {
          background: url('../../assets/imgs/paper-file-icon.svg') no-repeat;
        }
      }
      &>.type {
        margin-top: 40px;
        font-family: PingFangSC-Semibold;
        font-size: 22px;
        color: #666666;
      }
      &>.file-count {
        margin-top: 10px;
        font-family: PingFangSC-Regular;
        font-size: 20px;
        color: #666666;
      }
      &>.btn-group {
        display: flex;
        width: 100%;
        margin-top: 40px;
        justify-content: space-around;
        flex-wrap: wrap;
        .download-btn {
          @include cancelBtnStyle;
          margin: 10px 0;
        }
        .upload-btn {
          @include buttonStyle;
          margin: 10px 0;
        }
      }
    }
  }
}
</style>
