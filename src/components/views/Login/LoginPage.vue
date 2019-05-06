<template>
  <div class="login-page">
    <div class="sign-in-box">
      <div class="sign-in-logo">
        <span class="iconfont">&#xe60b;</span>
      </div>
      <div class="sign-in-form">
        <div class="sign-in-text">
          <div class="divide-line">
            <div class="line"></div>
          </div>
          <div class="text">登录</div>
          <div class="divide-line">
            <div class="line"></div>
          </div>
        </div>
        <el-form ref="signinForm" :model="signinForm" label-width="60px">
          <el-form-item label="手机号">
            <el-input v-model="signinForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="signinForm.name"></el-input>
          </el-form-item>
          <el-form-item class="identify-code" label="验证码">
            <el-input v-model="signinForm.name"></el-input>
            <identify-code class="identify-code" @click:native="refreshCode" :identifyCode="identifyCode"></identify-code>
          </el-form-item>
          <div class="forget-pwd">
            <span>忘记密码?</span>
          </div>
          <el-form-item class="sign-in-btn">
            <el-button>登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import '../../../assets/iconfont/iconfont.css';
import Footer from '@/components/common/Footer';
import IdentifyCode from '@/components/common/IdentifyCode';

export default {
  data() {
    return {
      signinForm: {
        name: ''
      },
      identifyCodes: "1234567890",
      identifyCode: ""
    };
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    }
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  components: {
    Footer,
    IdentifyCode
  }
}
</script>

<style lang="scss" scoped>
@import '../../../scss/mixin.scss';

.login-page {
  width: 100%;
  height: 100%;
  .sign-in-box {
    display: flex;
    justify-content: center;
    height: calc(100vh - 100px);
    background: url('../../../assets/imgs/signinBackground.jpg') no-repeat;
    background-size: 100% 100%;
    .sign-in-logo {
      position: absolute;
      top: 30px;
      left: 30px;
      .iconfont {
        color: #c1b071;
        font-size: 36px;
        cursor: pointer;
      }
    }
    .sign-in-form {
      width: 26%;
      padding-top: 50px;
      .sign-in-text {
        display: flex;
        margin-bottom: 20px;
        .divide-line {
          display: flex;
          align-items: center;
          width: 40%;
          .line {
            height: 1px;
            width: 100%;
            border: 0.5px rgba(255, 255, 255, 0.6) solid;
          }
        }
        .text {
          width: 80px;
          font-size: 22px;
          color: #ffffff;
          text-align: center;
        }
      }
      /deep/ {
        .el-form {
          .forget-pwd {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 20px;
            >span {
              font-size: 14px;
              color: #252525;
              cursor: pointer;
            }
          }
          .el-form-item {
            border-bottom: 1px rgba(255, 255, 255, 0.5) solid;
            .el-form-item__label {
              line-height: 36px;
              font-size: 12px;
              color: #ffffff;
              text-align: left;
            }
            .el-form-item__content {
              line-height: 36px;
              .el-input {
                .el-input__inner {
                  height: 36px;
                  line-height: 36px;
                  border: none;
                  background-color: transparent;
                  color: #ffffff;
                }
              }
            }
            &.identify-code {
              .el-form-item__content {
                display: flex;
                align-items: center;
                .identify-code {
                  height: 36px;
                }
              }
            }
            &.sign-in-btn {
              border: none;
              .el-form-item__content {
                margin-left: 0 !important;
              }
              /deep/ {
                .el-button {
                  width: 100%;
                  @include buttonStyle;
                  color: #000000;
                  margin: 0;
                }
              }
            }
          }
        }
      }
    }
  }
  /deep/ {
    .el-footer {
      height: 100px !important;
      background-color: #303030;
      .footer-items-group {
        padding: 26px 0 20px 0;
      }
    }
  }
}
</style>
