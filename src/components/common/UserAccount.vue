<template>
  <div class="user-account-container">
    <el-dropdown trigger="hover" placement="bottom" @command="handleCommand">
      <div>{{userName}}<span class="el-icon-arrow-down"></span></div>
      <el-dropdown-menu class="user-account" slot="dropdown">
        <el-dropdown-item class="logout" command="resetPassword"><span class="name">修改密码</span></el-dropdown-item>
        <el-dropdown-item class="logout" command="logout"><span class="name">退出登录</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog class="dialog-form" title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="resetPwdForm" :rules="rules" ref="resetPwdForm">
        <el-form-item label="原始密码" :label-width="formLabelWidth" prop="oldPassword">
          <el-input type="password" v-model="resetPwdForm.oldPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassword">
          <el-input type="password" v-model="resetPwdForm.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth" prop="confirmPassword">
          <el-input type="password" v-model="resetPwdForm.confirmPassword" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancle-btn" @click="cancelEditFileds">取 消</el-button>
        <el-button class="submit-btn" type="primary" @click="handleSubmitClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { logout } from '@/rest/authQuery';
import { changePassword } from "@/rest/userManagmentPageApi";

export default {
  name: 'userAccount',
  data() {
    const passwordMatch = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.resetPwdForm.newPassword) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };
    return {
      userName: '',
      dialogFormVisible: false,
      formLabelWidth: '80px',
      resetPwdForm: {
        oldPassword: '',
        newPassword: '',
        comfirmPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '密码为0~6位数字', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '密码为0~6位数字', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '密码为0~6位数字', trigger: 'blur' },
          { validator: passwordMatch, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        logout().finally(() => {
          this.$router.push({
            path: '/login'
          });
        });
      } else if (command === 'resetPassword') {
        this.dialogFormVisible = true;
      }
    },
    handleSubmitClick() {
      this.$refs.resetPwdForm.validate((valid) => {
        if (valid) {
          const params = {
            password: this.resetPwdForm.oldPassword,
            newpassword: this.resetPwdForm.newPassword,
            telephone: localStorage.getItem("TELEPHONE")
          }
          changePassword(params)
            .then((res) => {
              if (res) {
                this.$message({
                  message: '密码修改成功!',
                  type: 'success'
                })
                this.clearResetPwdForm();
              } else {
                this.$message({
                  message: '原始密码错误，请重新输入!',
                  type: 'error'
                })
              }
            })
        }
      })
    },
    // 取消
    cancelEditFileds() {
      this.$refs['resetPwdForm'].resetFields();
      this.clearResetPwdForm();
    },
    clearResetPwdForm() {
      this.dialogFormVisible = false;
      this.resetPwdForm = {
        oldPassword: '',
        newPassword: '',
        comfirmPassword: ''
      }
    },
  },
  mounted() {
    this.userName = localStorage.getItem("USERNAME");
  }
};
</script>

<style lang="scss" scoped>
@import '../../scss/mixin.scss';

.user-account-container {
  display: flex;
  align-items: center;
  margin-left: 24px;
  margin-right: 24px;
  cursor: pointer;
  /deep/ {
    .dialog-form {
      .cancle-btn {
        width: 136px;
        height: 40px;
        @include cancleBtnStyle;
        margin: 0 16px;
      }
      .submit-btn {
        width: 136px;
        height: 40px;
        @include buttonStyle;
        margin: 0 16px;
      }
    }
  }
}
</style>

<style lang="scss">
.el-dropdown-menu.user-account {
  padding: 0;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0.6875rem 2.5rem 0 rgba(5, 69, 92, 0.1);
  border: solid 0.0625rem rgba(220, 225, 227, 0.9);
  border-radius: 0.25rem;
  .el-dropdown-menu__item { 
    display: flex;
    align-items: center;   
    padding: 0 0.75rem;
    &:hover {      
      color: #C0AF70;  
      background-color: rgba(239, 243, 245, 0.5);
    }
    &.logout {
      height: 2.5rem;
      // .icon {
      //   display: inline-block;
      //   margin-left: 0.1875rem;
      //   width: 0.875rem;
      //   height: 0.875rem;
      //   background-image: url('../../assets/imgs/logout.svg');
      //   background-size: 100% 100%;
      // }
      .name {
        display: inline-block;
        height: 1.25rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
      }
    }
  }
}
</style>
