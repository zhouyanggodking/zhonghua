<template>
  <el-container>
    <el-aside>
      <div class="sign-in-logo">
        <span class="iconfont">&#xe60b;</span>
      </div>
      <div class="company-logo">
        <img src="../../assets/imgs/Wmxt.png" alt="">
        <div class="company-text">财务公司</div>
      </div>
      <left-menu></left-menu>
    </el-aside>
    <el-container class="content">
      <el-header>
        <div class="system-name">智鉴通-财务公司</div>
        <user-account></user-account>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <Footer></Footer>
    </el-container>
  </el-container>
</template>
<script>
import '../../assets/iconfont/iconfont.css';
import UserAccount from '@/components/common/UserAccount';
import Footer from '@/components/common/Footer';
import LeftMenu from '@/components/common/LeftMenu';

export default {
  data() {
    return {
      footerItems: ['关于我们', '联系我们', '关注微信', '免责声明']
    };
  },
  components: {
    Footer,
    LeftMenu,
    UserAccount
  }
}
</script>

<style lang="scss" scoped>
  body > .el-container {
    height: 100%;
    .content{
      // width: calc( 100% -236px);
      // min-width: 1200px;
      overflow: auto;
    }
    .el-header {
      display: flex;
      align-items: center;
      height: 88px !important;
      padding: 0 40px 0 30px;
      background-color: #ffffff;
      color: #333333;
      // text-align: center;
      // line-height: 60px;
      .system-name {
        margin-right: auto;
        font-size: 26px;
        font-weight: bold;
        color: #C0AF70;
      }
    }

    .el-aside {
      width: 236px !important;
      background-color: #333333;
      text-align: center;
      .sign-in-logo {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 88px;
        background-color: #000000;
        .iconfont {
          display: inline-block;
          width: 172px;
          height: 52px;
          font-size: 40px;
          color: #fff;
        }
      }
      .company-logo {
        padding: 26px 0;
        margin-bottom: 72px;
        background-color: #333333;
        border-bottom: 2px solid #ffffff;
        >img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          margin-bottom: 16px;
        }
        .company-text {
          font-size: 18px;
          color: #ffffff;
        }
      }
    }
  
    .el-main {
      // min-width: 1200px;
      height: calc(100vh - 240px);
      padding: 20px 50px 0 30px;
      background-color: #f5f7f9;
      color: #333;
      overflow: auto;
    }
  }
</style>

