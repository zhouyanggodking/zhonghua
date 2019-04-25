<template>
  <div class="real-estate-upload">
    <bread-crumb :data="breadCrumbList"></bread-crumb>
    <div class="tags">
      <el-tabs v-model="activeName">
        <el-tab-pane label="提取字段编辑" name="filedEdit">
          <div class="filed-edit">
            <div class="filed-list">
              <div class="filed-box-title">
                <div class="text-one">标准字段</div>
                <div class="text-two">本次提取字段</div>
                <div class="text-three">操作</div>
              </div>
              <div class="filed-box-content">
                <div class="filed-item" v-for="(item, index) in filedList" :key="index">
                  <div class="title">
                    {{item.name}}
                  </div>
                  <div class="input-box">
                    <el-input :placeholder="item.name"></el-input>
                  </div>
                  <div class="del-btn" @click="removeItem(item)">删除</div>
                </div>
              </div>
            </div>
            <div class="add-filed" @click="addNewFiled">
              +&nbsp;新增字段
            </div>
            <div class="filed-option">
              <el-button class="cancle-btn">取消</el-button>
              <el-button class="submit-btn">提交</el-button>
              <el-button class="save-btn">保存</el-button>
            </div>
            <el-dialog title="新增字段" :visible.sync="dialogFormVisible">
              <el-form :model="addFiledform" :rules="rules" ref="addFiledform">
                <el-form-item label="标准字段" :label-width="formLabelWidth" prop="name">
                  <el-input placeholder="请输入标准字段(必填)" v-model="addFiledform.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="本次提取字段" :label-width="formLabelWidth" prop="text">
                  <el-input placeholder="请输入提取字段(必填)" v-model="addFiledform.text" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button class="cancle-btn" @click="dialogFormVisible = false">取 消</el-button>
                <el-button class="goon-btn" type="primary" @click="handleSubmitClick('goonBtn')">继续新增</el-button>
                <el-button class="submit-btn" type="primary" @click="handleSubmitClick('sureBtn')">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </el-tab-pane>
        <el-tab-pane label="选择文件上传" name="fileUpload">配置管理</el-tab-pane>
      </el-tabs>
    </div>  
  </div>
</template>
<script>
import BreadCrumb from '@/components/common/BreadCrumb';

export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      activeName: 'filedEdit',
      breadCrumbList: [
        '动产项目承兑', '文件上传'
      ],
      addFiledform: {
        name: '',
        text: ''
      },
      filedList: [
        {
          name: '合同名称',
          text: ''
        },
        {
          name: '合同编号',
          text: ''
        },
        {
          name: '申请日期',
          text: ''
        },
        {
          name: '合同名称',
          text: ''
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入标准字段(必填)', trigger: 'blur' }
        ],
        text: [
          { required: true, message: '请输入提取字段(必填)', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    removeItem(item) {
      const index = this.filedList.indexOf(item);
      if (index !== -1) {
        this.filedList.splice(index, 1);
      }
    },
    addNewFiled() {
      this.dialogFormVisible = true;
    },
    handleSubmitClick(btnType) {
      this.$refs.addFiledform.validate((valid) => {
        if (valid) {
          this.filedList.push(this.addFiledform);
          if (btnType === 'goonBtn') {
            this.dialogFormVisible = true;
          } else {
            this.dialogFormVisible = false;
          }
        }
        this.addFiledform = {
          name: '',
          text: ''
        }
      });
    }
  },
  components: {
    BreadCrumb
  }
}
</script>
<style lang="scss" scoped>
@import '@/scss/mixin.scss';

.real-estate-upload {
  display: flex;
  flex-direction: column;
  .bread-crumb {
    background-color: #ffffff;
    padding: 14px 20px 0px;
  }
  .tags {
    /deep/ {
      .el-tabs {
        display: flex;
        flex-direction: column;
        height: 100%;
        .el-tabs__header {
          background-color: #ffffff;
          .el-tabs__nav-wrap {
            padding: 20px 0 0 34px;
            &::after {
              content: '';
              height: 0px;
            }
            .el-tabs__nav-scroll {
              .el-tabs__nav {
                .el-tabs__active-bar {
                  background-color: #9B8B7C;
                }
                .el-tabs__item {
                  font-weight: normal;
                  &:hover {
                    color: #9B8B7C;
                  }
                  &.is-active {
                    color: #9B8B7C;
                  }
                }
              }
            }
          }
        }
        .el-tabs__content {
          background-color: #ffffff;
          .el-tab-pane {
            .filed-edit {
              padding: 60px 30px;
              .filed-list {
                .filed-box-title {
                  display: flex;
                  // justify-content: center;
                  align-items: center;
                  background: #FAFAFA;
                  >div {
                    height: 44px;
                    line-height: 44px;
                    font-size: 14px;
                    font-weight: bold;
                    color: #333333;
                    border: 1px solid #EBEBEB;
                    text-align: center;
                    &.text-one {
                      width: 200px;
                      border-right: none;
                    }
                    &.text-two {
                      flex: 1;
                      border-right: none;
                    }
                    &.text-three {
                      width: 150px;
                    }
                  }
                }
                .filed-box-content {
                  .filed-item {
                    display: flex;
                    >div {
                      height: 56px;
                      line-height: 56px;
                      font-size: 14px;
                      color: #666666;
                      text-align: center;
                      border: 1px solid #EBEBEB;
                      border-top: none;
                      &.title {
                        width: 200px;
                        border-right: none;
                      }
                      &.input-box {
                        flex: 1;
                        padding: 0px 40px;
                        border-right: none;
                        /deep/ {
                          .el-input {
                            .el-input__inner {
                              height: 44px;
                              line-height: 44px;

                            }
                          }
                        }
                      }
                      &.del-btn {
                        width: 150px;
                        color: #4A90E2;
                        cursor: pointer;
                      }
                    }
                  }
                }
              }
              .add-filed {
                height: 44px;
                line-height: 44px;
                margin-top: 20px;
                border: 2px dashed #EBEBEB;
                text-align: center;
                cursor: pointer;
                &:hover {
                  border-color: #C1B071;
                  color: #C1B071;
                }
              }
              .filed-option {
                display: flex;
                padding-top: 30px;
                margin-top: 40px;
                justify-content: flex-end;
                border-top: 1px solid #EBEBEB;
                .submit-btn, .save-btn {
                  width: 136px;
                  height: 40px;
                  @include buttonStyle;
                  margin: 0 14px;
                }
                .cancle-btn {
                  width: 136px;
                  height: 40px;
                  @include cancleBtnStyle;
                  margin: 0 14px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
@import '@/scss/mixin.scss';

.el-dialog__wrapper {
  .el-dialog {
    border-radius: 6px;
    .el-dialog__footer {
      border-top: 1px solid #e8eaec;
      padding: 20px 20px;
      .el-button {
        width: 84px;
        height: 30px;
        &.cancle-btn {
          @include cancleBtnStyle;
          padding: 4px 20px;
          margin: 0 16px;
        }
        &.submit-btn {
          @include buttonStyle;
          padding: 4px 20px;
          margin: 0 16px;
        }
        &.goon-btn {
          @include buttonStyle;
          padding: 4px 10px;
          margin: 0 16px;
        }
      }
    }
  }
}
</style>
