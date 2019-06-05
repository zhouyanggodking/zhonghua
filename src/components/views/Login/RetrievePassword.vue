<template>
  <div class="retrieve-password">
    <div class="retrieve-pwd-content">
      <div class="sign-in-logo"> 
         <span class="iconmoon">&#xe62d;</span>
      </div>
      <div class="retrieve-pwd-box">
        <div class="login-logo">
            <img src="../../../assets/imgs/loginLogo.png" alt>
        </div>
        <div class="retrieve-pwd-text">
          <div class="text">忘记密码</div>
        </div>
        <div class="box-tags">
          <div :class="{'active': this.activeTag === 'signinTag'}" class="tag">
            <span class="span-index">1</span>填写验证信息<span class="span-dot">···</span>
          </div>
          <div :class="{'active': this.activeTag === 'resetPwdTag'}" class="tag">
            <span class="span-index">2</span>重新设置密码<span class="span-dot">···</span>
          </div>
          <div :class="{'active': this.activeTag === 'successTag'}" class="tag">
            <span class="span-index">3</span>成功
          </div>
        </div>
        <el-carousel ref="restPwdContainer" :autoplay="false" indicator-position="none" arrow="nerver">
          <el-carousel-item class="verify-message" name="signinTag" :key="1">
            <el-form class="signin-form" ref="signinForm" :rules="rules" :model="signinForm" label-width="80px">
              <el-form-item 
                v-bind:class="[mobileStyle ? 'sign-in-content-form-item-input-active' : '']"
                prop="telephone">
                <span class="iconmoon">&#xe620;</span>
                <el-input 
                  placeholder="请输入手机号"
                  @blur="leaveMobile"
                  @focus="enterMobile"
                  v-model="signinForm.telephone"></el-input>
              </el-form-item>
              <el-form-item 
                v-bind:class="['identify-code', imageurlStyle ? 'sign-in-content-form-item-input-active' : '']"
                class="identify-code" prop="identifyCode">
                <span class="iconmoon">&#xe62c;</span>
                <el-input 
                  placeholder="请输入图像验证码"
                  maxlength="4"
                  @focus="enterImageUrl"
                  @blur="leaveImageUrl"
                  v-model="signinForm.identifyCode"></el-input>
                <identify-code class="identify-code" @click.native="refreshCode" :identifyCode="identifyCode"></identify-code>
              </el-form-item>
              <el-form-item 
                v-bind:class="[ phoneCodeStyle ? 'sign-in-content-form-item-input-active' : '']"
                class="phone-identify-code" prop="phoneIentifyCode">
                <span class="iconmoon">&#xe62c;</span>
                <el-input 
                  placeholder="请输入手机验证码"
                  maxlength="4"
                  @focus="enterPhoneCode"
                  @blur="leavePhoneCode"
                  v-model="signinForm.phoneIentifyCode"></el-input>
                <span v-if="count<=0" class="phone-code" @click="getPhoneIdentifyCode">获取验证码</span>
                <span v-else class="count"><span>{{count}}</span>s后重新获取</span>
              </el-form-item>
              <el-form-item class="sign-in-btn">
                <el-button @click="handleNextStepClick">下一步</el-button>
              </el-form-item>
            </el-form>
          </el-carousel-item>
          <el-carousel-item class="reset-pwd" name="resetPwdTag" :key="2">
            <el-form class="reset-pwd-form" ref="resetPwdForm" :rules="pwdrules" :model="resetPwdForm" label-width="80px">
              <el-form-item 
                v-bind:class="[inputNewPwd ? 'sign-in-content-form-item-input-active' : '']"
                prop="password">
                <span class="iconmoon">&#xe626;</span>
                <el-input
                  placeholder="请输入新密码"
                  maxlength="6"
                  @focus="enterInputNewPwd"
                  @blur="leaveInputNewPwd"
                  type="password" v-model="resetPwdForm.password"></el-input>
              </el-form-item>
              <el-form-item 
                v-bind:class="[newPwdAgain ? 'sign-in-content-form-item-input-active' : '']"
                prop="identifyPassword">
                <span class="iconmoon">&#xe626;</span>
                <el-input 
                  placeholder="验证新密码"
                  maxlength="6"
                  @focus="enterNewPwdAgain"
                  @blur="leaveNewPwdAgain"
                  type="password" v-model="resetPwdForm.identifyPassword"></el-input>
              </el-form-item>
              <el-form-item class="sign-in-btn">
                <el-button @click="handleSigninClick">确定</el-button>
              </el-form-item>
            </el-form>
          </el-carousel-item>
          <el-carousel-item class="complete-done" name="successTag" :key="3">
            <div class="success-icon"></div>
            <div class="success-text">
              <span>密码设置成功</span>
            </div>
            <div class="to-login-btn">
              <el-button @click="toLoginPage">立即登陆</el-button>
            </div>
          </el-carousel-item>
        </el-carousel>
        <el-dialog
            :visible.sync="isErrorDialogVisible"
            :show-close="false"
            class="confirmDialog"
            width="520px"
            center>
            <div class="icon"></div>
            <div class="dialog-content">
              <div class="text-alert">提示</div>
              <div class="text-massage">手机验证码输入错误，请重新输入</div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button class="submit-btn"  type="primary" @click="isErrorDialogVisible = false">确定</el-button>
            </span>
          </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import '../../../assets/fonts/iconfont.css';
import IdentifyCode from '@/components/common/IdentifyCode';
import { clearInterval } from 'timers';
import { getPhoneVerifyCode, verifyTelephoneCode, resetPassword } from "@/rest/userManagmentPageApi";

export default {
  data() {
    const phoneReg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
    const phoneMatch = (rule, value, callback) => {
      if (!value) {
        this.checkTelephone = false;
        callback(new Error('请输入手机号码'));
      } else {
        if (!value.match(phoneReg)) {
          this.checkTelephone = false;
          callback(new Error('请输入正确手机号码'));
        } else {
          this.checkTelephone = true; // 手机号码验证成功
          callback();
        }
      }
    };
    const identifyCodeMatch = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else if (value !== this.identifyCode) {
        callback(new Error('请输入正确验证码'));
      } else {
        callback();
      }
    };
    const passwordMatch = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.resetPwdForm.password) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    return {
      mobileStyle: false,
      imageurlStyle: false,
      phoneCodeStyle: false,
      inputNewPwd: false,
      newPwdAgain: false,
      isErrorDialogVisible: false,
      activeTag: 'signinTag',
      count: 0,
      timer: null,
      // 单独验证电话号
      checkTelephone: false,
      // 验证信息
      signinForm: {
        telephone: '',
        phoneIentifyCode: '',
        identifyCode: ''
      },
      rules: {
        telephone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: phoneMatch, trigger: 'blur' }
        ],
        phoneIentifyCode: [
          { required: true, message: '请输入手机验证码', trigger: 'blur' },
          { pattern: /^\d{4}$/, message: '请输入正确验证码', trigger: 'blur' }
        ],
        identifyCode: [
          { required: true, message: '请输入图形验证码', trigger: 'blur' },
          { pattern: /^\d{4}$/, message: '请输入正确验证码', trigger: 'blur' },
          { validator: identifyCodeMatch, trigger: 'blur' }
        ],
      },
      identifyCodes: "1234567890",
      identifyCode: "",
      // 重设密码
      resetPwdForm: {
        password: '',
        identifyPassword: ''
      },
      pwdrules: {
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '密码为0~6位数字', trigger: 'blur' }
        ],
        identifyPassword: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '密码为0~6位数字', trigger: 'blur' },
          { validator: passwordMatch, trigger: 'blur' }
        ]
      }
    }; 
  },
  methods: {
    enterMobile() {
      this.mobileStyle = true
    },
    leaveMobile() {
      this.mobileStyle = false
    },
    enterImageUrl() {
      this.imageurlStyle = true
    },
    leaveImageUrl() {
      this.imageurlStyle = false
    },
    enterPhoneCode() {
      this.phoneCodeStyle = true
    },
    leavePhoneCode() {
      this.phoneCodeStyle = false
    },
    enterInputNewPwd() {
      this.inputNewPwd = true
    },
    leaveInputNewPwd() {
      this.inputNewPwd = false
    },
    enterNewPwdAgain() {
      this.newPwdAgain = true
    },
    leaveNewPwdAgain() {
      this.newPwdAgain = false
    },

    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.initCode(this.identifyCodes, 4);
    },
    initCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    // 获取手机验证码
    getPhoneIdentifyCode() {
      if (this.checkTelephone) {
        const params = {
          telephone: this.signinForm.telephone
        }
        getPhoneVerifyCode(params)
        .then((errorFlag) => {
          if (errorFlag) {
            this.$message({
              message: '该用户不存在!',
              type: 'error'
            })
          } else {
            this.interval(); //倒计时
          }
        })
      }
    },
    //下一步
    handleNextStepClick() {
      this.$refs.signinForm.validate((valid) => {
        if (valid) {
          const params = {
            messageCode: this.signinForm.phoneIentifyCode,
            telephone: this.signinForm.telephone
          }
          verifyTelephoneCode(params)
          .then((flag) => {
            if (flag) {
              //正常下一步
              this.$refs.restPwdContainer.setActiveItem('resetPwdTag');
              this.activeTag = 'resetPwdTag';
            } else {
              //手机验证码不正确
              this.isErrorDialogVisible = true;
            }
          })
        }
      })
    },
    //提交
    handleSigninClick() {
      this.$refs.resetPwdForm.validate((valid) => {
        if (valid) {
          const params = {
            telephone: this.signinForm.telephone,
            newPassword: this.resetPwdForm.password
          }
          resetPassword(params)
          .then((res) => {
            if (res) {
              this.$refs.restPwdContainer.setActiveItem('successTag');
              this.activeTag = 'successTag';
            } else {
              this.$message({
                message: '账号不存在!',
                type: 'error'
              })
            }
          })
        }
      })
    },
    interval() {
      this.count = 60;
      if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.count > 0) { 
            this.count--;
          } else {
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    toLoginPage() {
      this.$router.push('/login');
    }
  },
  mounted() {
    this.refreshCode();
  },
  components: {
    IdentifyCode
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<style lang="scss" scoped>
@import '../../../scss/mixin.scss';

.retrieve-password {
  width: 100%;
  height: 100%;
  background: url('../../../assets/imgs/loginBg_01.png') no-repeat;
  background-size: 100% 100%;
  .retrieve-pwd-content {
    display: flex;
    justify-content: center;
    .sign-in-logo {
      position: absolute;
      top: 30px;
      left: 30px;
      .iconmoon {
        color: #005BAC;
        font-size: 36px;
        cursor: pointer;
      }
    }
  }
  .retrieve-pwd-box {
    background: #FFFFFF ;
    min-height: 500px;
    margin-top: 50px ;
    padding: 30px 50px 0px;
    .login-logo {
      width: 50%;
      margin: 0px auto 20px;
      line-height: 24px;
      text-align: center;
    }
    .retrieve-pwd-text {
        display: flex;
        margin-bottom: 20px;
        .text {
          font-weight: bold;
          font-size: 30px;
          color: #333333;
          text-align: left;
        }
      }
    .box-tags {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #999999;
      .tag {
        display: flex;
        align-items: center;
        .span-index {
          display: inline-block;
          width: 20px;
          margin-right: 4px;
          color: #FFFFFF;
          background: #999999;
          border-radius: 50%;
          text-align: center;
        }
        .span-dot {
          margin-left: 8px;
          letter-spacing: 4px;
          color: #999999;
        }
      }
      .active {
        color: #4A90E2;
        .span-index {
          background: #4A90E2 ;
        }
        .span-dot {
          color: #4A90E2 ;
        }
      }
    }
    /deep/ {
      .el-carousel {
        .el-carousel__container {
          .el-carousel__arrow {
            display: none;
          }
          .el-carousel__item {
            &.complete-done {
              .success-icon {
                width: 80px;
                height: 86px;
                margin: 50px auto 0;
                background: url('../../../assets/imgs/success-colorful.svg') no-repeat;
                background-size: cover;
              }
              .success-text {
                margin: 20px auto 40px;
                text-align: center;
                font-size: 16px;
                >span {
                  color: #333333;
                  font-weight: bold;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
    /deep/ {
      .el-form {
        .sign-in-content-form-item-input-active {
            border-bottom: 2px #4a90e2 solid !important;
            .iconmoon {
              font-size: 30px;
              color: #4a90e2 !important;
            }
          }
        .el-form-item {
          border-bottom: 1px #D1D1D1 solid;
          .iconmoon {
            color: #D1D1D1;
            font-size: 30px;
            cursor: pointer;
          }
          .el-form-item__content {
            margin: 0px !important;
            display: flex;
            line-height: 36px;
            .el-input {
              .el-input__inner {
                height: 36px;
                line-height: 36px;
                border: none;
                background-color: transparent;
              }
            }
          }
        }
        &.signin-form {
          margin-top: 40px;
          .identify-code {
            .el-form-item__content {
              display: flex;
              align-items: center;
              .identify-code {
                height: 36px;
                margin-bottom: 5px;
              }
            }
          }
          .phone-identify-code {
            .el-form-item__content {
              display: flex;
              align-items: center;
              .phone-code {
                display: inline-block;
                width: 155px;
                height: 36px;
                margin: 0px 0px 5px;
                text-align: center;
                background: #0565FF;
                color: #FFFFFF ;
                cursor: pointer;
              }
              .count {
                display: inline-block;
                width: 150px;
                height: 36px;
                color: #FFFFFF;
                margin: auto 0px 5px;
                background: #6BA4FF;
                cursor: not-allowed;
                >span {
                  display: inline-block;
                  width: 16px;
                  text-align: center;
                }
              }
            }
          }
          .sign-in-btn {
            border: none;
            .el-form-item__content {
              margin-left: 0 !important;
            }
            /deep/ {
              .el-button {
                width: 100% !important;
                @include buttonStyle;
                color: #FFFFFF ;
                margin: 0;
              }
            }
          }
        }
        &.reset-pwd-form {
          margin-top: 40px;
          .sign-in-btn {
            border: none;
            .el-form-item__content {
              margin-left: 0 !important;
            }
            /deep/ {
              .el-button {
                margin-top:20px !important;
                width: 100% !important;
                @include buttonStyle;
                color: #FFFFFF  ;
                margin: 0;
              }
            }
          }
        }
      }
    }
    .to-login-btn {
      border: none;
      .el-form-item__content {
        margin-left: 0 !important;
      }
      /deep/ {
        .el-button {
          width: 100% !important;
          @include buttonStyle;
          color: #FFFFFF ;
          margin: 0;
        }
      }
    }
    .el-dialog{
      .dialog-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .text-alert {
        width: 40px;
        font-size: 20px;
        color: #666666;
        margin-top: 15px;
        margin-bottom: 6px;
      }
      .text-massage {
        width: 100%;
        font-size: 16px;
        font-weight: bold;
        color: #666666;
        text-align: center;
      }
    }
    
  }
}
</style>
