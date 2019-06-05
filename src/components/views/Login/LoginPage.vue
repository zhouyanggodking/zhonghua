<template>
  <div class="login-page">
    <div class="sign-in-box">
      <div class="sign-in-logo"> 
         <span class="iconmoon">&#xe62d;</span>
      </div>
      <div class="sign-in-form">
        <div class="login-logo">
          <img src="../../../assets/imgs/loginLogo.png" alt>
        </div>
        <div class="sign-in-text">
          <div class="text">登录</div>
        </div>
        <el-form ref="signinForm" :rules="rules" :model="signinForm" label-width="60px">
          <el-form-item 
            :class="[mobileStyle ? 'sign-in-content-form-item-input-active' : '']"
            prop="telephone">
            <span class="iconmoon">&#xe620;</span>
            <el-input 
              placeholder="请输入手机号"
              @blur="leaveMobile"
              @focus="enterMobile"
              v-model="signinForm.telephone"></el-input>
          </el-form-item>
          <el-form-item 
            :class="[passwordStyle ? 'sign-in-content-form-item-input-active' : '']"
            prop="password">
            <span class="iconmoon">&#xe626;</span>
            <el-input type="password" 
              placeholder="请输入密码"
              @blur="leavePassword"
              @focus="enterPassword"
              v-model="signinForm.password"></el-input>
          </el-form-item>
          <el-form-item 
            :class="['identify-code', imageurlStyle ? 'sign-in-content-form-item-input-active' : '']"
            prop="identifyCode">
            <span class="iconmoon">&#xe62c;</span>
            <el-input 
              placeholder="请输入验证码"
              maxlength="4"
              @focus="enterImageUrl"
              @blur="leaveImageUrl"
              v-model="signinForm.identifyCode"></el-input>
            <identify-code class="identify-code" @click.native="refreshCode" :identifyCode="identifyCode"></identify-code>
          </el-form-item>
          <div class="forget-pwd">
            <span @click="toResetPwdPage">忘记密码?</span>
          </div>
          <el-form-item class="sign-in-btn">
            <el-button :disabled="isLoginDisabled" @click="handleLoginClick">登 录</el-button>
          </el-form-item>
        </el-form>
        <el-dialog
          :visible.sync="isErrorDialogVisible"
          :show-close="false"
          class="confirmDialog"
          width="520px"
          center>
          <div class="icon"></div>
          <div v-if="loginErrorCount < 6">
            <div class="text">用户名或密码输入错误<span class="text-span">{{loginErrorCount}}</span>次</div>
            <div class="prompt-text">累计错误输入6次，本日将无法登录</div>
          </div>
          <div v-if="loginErrorCount >=6">
            <div class="prompt-text">该用户已锁定，今日无法登录</div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button class="cancle-btn" @click="isErrorDialogVisible = false">取 消</el-button>
            <el-button class="submit-btn" type="primary" @click="handleForgetPwdClick">忘记密码</el-button>
          </span>
        </el-dialog>
        <el-dialog
          :visible.sync="isMassageDialogVisible"
          :show-close="false"
          class="confirmDialog"
          width="520px"
          center>
          <div class="icon"></div>
          <div class="text">{{dialogMassage}}</div>
          <span slot="footer" class="dialog-footer">
            <el-button class="submit-btn" type="primary" @click="isMassageDialogVisible = false">确定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import '../../../assets/iconfont/iconfont.css';
import '../../../assets/fonts/iconfont.css';
import IdentifyCode from '@/components/common/IdentifyCode';
import { login } from "@/rest/authQuery";

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
    return {
      mobileStyle: false,
      passwordStyle: false,
      imageurlStyle: false,
      isLoginDisabled: false,
      loginErrorCount: 0,
      isErrorDialogVisible: false,
      isMassageDialogVisible: false,
      dialogMassage: '',
      signinForm: {
        telephone: '',
        password: '',
        identifyCode: ''
      },
      rules: {
        telephone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: phoneMatch, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '密码为0~6位数字', trigger: 'blur' }
        ],
        identifyCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: identifyCodeMatch, trigger: 'blur' }
        ],
      },
      identifyCodes: "1234567890",
      identifyCode: ""
    };
  },
  methods: {
    enterMobile() {
      this.mobileStyle = true
    },
    leaveMobile() {
      this.mobileStyle = false
    },
    enterPassword() {
      this.passwordStyle = true
    },
    leavePassword() {
      this.passwordStyle = false
    },
    enterImageUrl() {
      this.imageurlStyle = true
    },
    leaveImageUrl() {
      this.imageurlStyle = false
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
    handleLoginClick() {
      this.$refs.signinForm.validate((valid) => {
        if (valid) {
          const params = {
            telephone: this.signinForm.telephone,
            password: this.signinForm.password
          }
          login(params)
          .then((res) => {
            let type = res.type;
            let data = res.data;
            switch(type) {
              case 'phoneError':
                this.$message({
                  message: '账号不存在!',
                  type: 'error'
                })
                break;
              case 'locked':
                this.loginErrorCount = 6
                this.isErrorDialogVisible = true; //账号或密码错误6次
                break;
              case 'numerror':
                this.loginErrorCount = data.num;
                this.isErrorDialogVisible = true; //账号或密码错误小于6次
                break;
              case 'freeze':
                this.dialogMassage = "用户处于冻结状态，无法登录";
                this.isMassageDialogVisible = true; //冻结状态无法登录
                break;
              case 'success':
                this.$router.push('/'); //正常登录，页面跳转
                break;
            }
            this.refreshCode();
          })
        }
      })
    },
    handleForgetPwdClick() {
      this.isErrorDialogVisible = false;
      this.$router.push('/retrievePassword');
    },
    toResetPwdPage() {
      this.$router.push('/retrievePassword');
    }
  },
  mounted() {
    this.refreshCode();
  },
  components: {
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
    min-width: 500px;
    min-height: 500px;
    background: url('../../../assets/imgs/loginBg_01.png') no-repeat;
    background-size: cover;
    .sign-in-logo {
      position: absolute;
      left: 30px;
      top: 30px;
      .iconmoon {
        font-size: 36px;
        color: #005BAC;
        cursor: pointer;
      }
    }
    .sign-in-form {
      min-height: 500px;
      margin: 50px auto;
      padding: 30px 50px 0px;
      background: #FFFFFF;
      .login-logo {
        display: flex;
        justify-content: center;
        padding-bottom: 20px;
        .img {
          width: 202.5px;
        }
      }
      .sign-in-text {
        display: flex;
        margin-bottom: 18px;
        .text {
          width: 80px;
          font-size: 30px;
          font-weight: bold;
          color: #333333;
          text-align: left;
        }
      }
      /deep/ {
        .el-form {
          .forget-pwd {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 20px;
            >span {
              font-size: 16px;
              color: #999999 ;
              cursor: pointer;
            }
          }
          .sign-in-content-form-item-input-active {
            border-bottom: 2px #4a90e2 solid !important;
            .iconmoon {
              font-size: 30px;
              color: #4a90e2 !important;
            }
          }
          .el-form-item {
            border-bottom: 1px #D1D1D1 solid;
            .el-form-item__label {
              font-size: 12px;
              text-align: left;
              line-height: 36px;
              &::before {
                content: '';
              }
            }
            .iconmoon {
              font-size: 30px;
              color: #D1D1D1;
              cursor: pointer;
            }
            .el-form-item__content {
              display: flex;
              margin: 0px !important;
              line-height: 50px;
              .el-input {
                .el-input__inner {
                  height: 36px;
                  line-height: 36px;
                  border: none;
                  background-color: transparent;
                  font-size: 16px;
                  color: #333333;
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
                  width: 100% !important;
                  margin: 0;
                  @include buttonStyle;
                  color:  #FFFFFF;
                }
              }
            }
          }
        }
      }
    }
    .el-dialog {
      .prompt-text {
        width: 470px;
        margin-top: 10px;
        font-size: 16px;
        text-align: center;
      }
      .text-span {
        margin: 3px;
        color: red !important;
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
