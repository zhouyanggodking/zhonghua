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
        <el-form ref="signinForm" :rules="rules" :model="signinForm" label-width="60px">
          <el-form-item label="手机号" prop="telephone">
            <el-input v-model="signinForm.telephone"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="signinForm.password"></el-input>
          </el-form-item>
          <el-form-item class="identify-code" label="验证码" prop="identifyCode">
            <el-input v-model="signinForm.identifyCode"></el-input>
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
          <div class="text">用户名或密码输入错误<span class="text-span">{{loginErrorCount}}</span>次</div>
          <div class="prompt-text">累计错误输入6次，本日将无法登录</div>
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
    <Footer></Footer>
  </div>
</template>
<script>
import '../../../assets/iconfont/iconfont.css';
import Footer from '@/components/common/Footer';
import IdentifyCode from '@/components/common/IdentifyCode';
import {login} from "@/rest/authQuery";

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
      this.isLoginDisabled = true;
      this.$refs.signinForm.validate((valid) => {
        if(valid) {
          const params = {
            telephone: this.signinForm.telephone,
            password: this.signinForm.password
          }
          login(params)
          .then((res) => {
            this.isLoginDisabled = false;
            if(res == '1'){
              this.dialogMassage = "用户处于冻结状态，无法登录";
              this.isMassageDialogVisible = true; //冻结状态无法登录
            }else if(res == '2'){
              this.$router.push('/'); //页面跳转
            }else{
              if(this.loginErrorCount < 6) {
                this.loginErrorCount ++,
                this.isErrorDialogVisible = true; //账号或密码错误
              }else {
                  this.isLoginDisabled = true; //输错6次无法登录
              }
            }
          }, () => {
            //登录失败
            this.isLoginDisabled = false;
            this.dialogMassage = "登录失败";
            this.isMassageDialogVisible = true; //登录失败
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
    this.identifyCode = "";
    this.initCode(this.identifyCodes, 4);
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
              color: rgba(255,255,255,0.85);
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
    .el-dialog {
      .prompt-text {
        width: 470px;
        font-size: 16px;
        text-align: center;
        margin-top: 10px;
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
