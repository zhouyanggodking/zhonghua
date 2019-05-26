<template>
  <div class="index-page">
    <div class="index-logo">
      某某某，欢迎登录智鉴通系统!
    </div>
    <div class="files-count-group">
      <div class="single-file" :class="{'upload': item.type==='upload', 'download': item.type==='download'}" v-for="(item, index) in filesCountList" :key="index">
        <img src="../../assets/imgs/payApply.png" alt="" v-if="index === 0">
        <img src="../../assets/imgs/fkxz.png" alt="" v-if="index === 1">
        <img src="../../assets/imgs/zxsc.png" alt="" v-if="index === 2">
        <img src="../../assets/imgs/fkxz.png" alt="" v-if="index === 3">
        <img src="../../assets/imgs/fksc.png" alt="" v-if="index === 4">
        <img src="../../assets/imgs/fkxz.png" alt="" v-if="index === 5">
        <div class="text">
          <p class="title">{{item.title}}</p>
          <p class="count" v-if="item.type === 'upload'">已上传资料<span>{{item.count}}</span>份</p>
          <p class="count" v-else>已提取完成资料<span>{{item.count}}</span>份</p>
        </div>
        <div v-if="item.type === 'upload'">
          <router-link v-if="index === 0" to="/realEstateUpload">
            <el-button class="upload" v-if="item.type === 'upload'">
              去上传
            </el-button>
          </router-link>
          <router-link v-if="index === 2" to="/creditUpload">
            <el-button class="upload" v-if="item.type === 'upload'">
              去上传
            </el-button>
          </router-link>
          <router-link v-if="index === 4" to="/creditUpload">
            <el-button class="upload" v-if="item.type === 'upload'">
              去上传
            </el-button>
          </router-link>
        </div>
        <div v-else>
          <router-link v-if="index === 1" to="/realEstateIdentifyResult">
            <el-button class="download">
              去下载
            </el-button>
          </router-link>
          <router-link v-if="index === 3" to="/creditElectronicBatchInformation">
            <el-button class="download">
              去下载
            </el-button>
          </router-link>
          <router-link v-if="index === 5" to="/creditPaperBatchInformation">
            <el-button class="download">
              去下载
            </el-button>
          </router-link>
        </div>
        
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
      ]
    };
  }
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
    background: url('../../assets/imgs/home-first.png') no-repeat right bottom;
    background-size: cover;
  }
  .files-count-group {
    // display: flex;
    // justify-content: space-around;
    // flex-wrap: wrap;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 10px;
    .single-file {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 200px;
      // width: 572px;
      margin: 20px 0 0 0;
      img {
        width: 78px;
        height: 78px;
        flex-shrink: 0;
        margin-left: 30px;
        border-radius: 50%;
      }
      &.upload {
        background: url('../../assets/imgs/bg-sc.png') no-repeat;
        background-position: bottom right;
        background-color: #ffffff;
      }
      &.download {
        background: url('../../assets/imgs/bg-xz.png') no-repeat;
        background-position: bottom right;
        background-color: #ffffff;
      }
      .text {
        // width: 180px;
        margin-left: 20px;
        .title {
          font-size: 22px;
          font-weight: bold;
          color: #666666;
        }
        .count {
          font-size: 22px;
          color:#666666;
        }
      }
      .el-button {
        // width: 134px;
        height: 44px;
        @include buttonStyle;
        a {
          color: #ffffff;
          text-decoration: none;
          &:active {
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
