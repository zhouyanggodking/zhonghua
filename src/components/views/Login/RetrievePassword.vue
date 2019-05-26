<template>
  <div class="retrieve-password">
    <div class="title">
      <div class="divide-line">
        <div class="line"></div>
      </div>
      <div class="text">忘记密码</div>
      <div class="divide-line">
        <div class="line"></div>
      </div>
    </div>
    <div class="login-btn">
      已有账号? <span @click="toLoginPage">请登录</span>
    </div>
    <div class="retrieve-pwd-box">
      <div class="box-tags">
        <div :class="{'active': this.activeTag === 'signinTag'}" class="tag">
          <span>1</span>填写验证信息
        </div>
        <div :class="{'active': this.activeTag === 'resetPwdTag'}" class="tag">
          <span>2</span>重新设置密码
        </div>
        <div :class="{'active': this.activeTag === 'successTag'}" class="tag">
          <span>3</span>修改完成
        </div>
      </div>
      <el-carousel ref="restPwdContainer" :autoplay="false" indicator-position="none" arrow="nerver">
        <el-carousel-item class="verify-message" name="signinTag" :key="1">
          <el-form class="signin-form" ref="signinForm" :rules="rules" :model="signinForm" label-width="80px">
            <el-form-item label="手机号" prop="telephone">
              <el-input v-model="signinForm.telephone"></el-input>
            </el-form-item>
            <el-form-item class="identify-code" label="图形验证码" prop="identifyCode">
              <el-input v-model="signinForm.identifyCode"></el-input>
              <identify-code class="identify-code" @click.native="refreshCode" :identifyCode="identifyCode"></identify-code>
            </el-form-item>
            <el-form-item class="phone-identify-code" label="手机验证码" prop="phoneIentifyCode">
              <el-input v-model="signinForm.phoneIentifyCode"></el-input>
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
            <el-form-item label="输入新密码" prop="password">
              <el-input type="password" v-model="resetPwdForm.password"></el-input>
            </el-form-item>
            <el-form-item label="验证新密码" prop="identifyPassword">
              <el-input type="password" v-model="resetPwdForm.identifyPassword"></el-input>
            </el-form-item>
            <el-form-item class="sign-in-btn">
              <el-button @click="handleSigninClick">提交</el-button>
            </el-form-item>
          </el-form>
        </el-carousel-item>
        <el-carousel-item class="complete-done" name="successTag" :key="3">
          <div class="success-icon"></div>
          <div class="success-text">
            密码修改成功, <span @click="toLoginPage">立即登录</span>
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
</template>
<script>
import IdentifyCode from '@/components/common/IdentifyCode';
import { clearInterval } from 'timers';
import { getPhoneVerifyCode, verifyTelephoneCode, resetPassword } from "@/rest/userManagmentPageApi";

export default {
  data() {
    const phoneReg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
    const phoneMatch = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号码'));
      } else {
        if (!value.match(phoneReg)) {
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
    
    //验证手机验证码是否正确
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
  background: url('../../../assets/imgs/WechatIMG10.jpeg') no-repeat;
  background-size: 100% 100%;
  .title {
    display: flex;
    width: 50%;
    margin: 0px auto 20px;
    padding-top: 86px;
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
      width: 196px;
      font-size: 22px;
      color: #ffffff;
      text-align: center;
    }
  }
  .login-btn {
    width: 50%;
    margin: 0px auto 20px;
    line-height: 24px;
    font-size: 14px;
    text-align: center;
    color: rgba(255,255,255,0.85);
    >span {
      color:#C1B071;
      cursor: pointer;
    }
  }
  .retrieve-pwd-box {
    width: 866px;
    margin: 0 auto;
    color: #ffffff;
    .box-tags {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .tag {
        display: flex;
        align-items: center;
        padding: 0 46px 10px;
        color: rgba(255,255,255,0.85);
        >span {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-right: 4px;
          font-size: 13px;
          border: 1px solid rgba(255,255,255,0.85);
          border-radius: 50%;
          text-align: center;
        }
        &.active {
          color: rgba(255,255,255,0.85);
          border-bottom: 2px solid rgba(255,255,255,0.85);
          >span {
            border-color: rgba(255,255,255,0.85);
          }
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
                background: url('../../../assets/imgs/success.png') no-repeat;
                background-size: cover;
              }
              .success-text {
                margin-top: 30px;
                text-align: center;
                font-size: 14px;
                >span {
                  color: #C1B071;
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
        width: 360px;
        margin: 0 auto;
        .el-form-item {
          border-bottom: 1px rgba(255, 255, 255, 0.5) solid;
          .el-form-item__label {
            line-height: 36px;
            font-size: 12px;
            color: #ffffff;
            text-align: left;
            &::before {
              content: '';
            }
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
        }
        &.signin-form {
          margin-top: 50px;
          .identify-code {
            .el-form-item__content {
              display: flex;
              align-items: center;
              .identify-code {
                height: 36px;
              }
            }
          }
          .phone-identify-code {
            .el-form-item__content {
              display: flex;
              align-items: center;
              .phone-code {
                display: inline-block;
                width: 120px;
                height: 36px;
                color: #C1B071;
                cursor: pointer;
              }
              .count {
                display: inline-block;
                width: 144px;
                height: 36px;
                color: #C1B071;
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
                width: 100%;
                @include buttonStyle;
                color: #000000;
                margin: 0;
              }
            }
          }
        }
        &.reset-pwd-form {
          margin-top: 50px;
          .sign-in-btn {
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
        color: #9A8B7B;
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
