<template>
  <div class="identify-result-detail-page">
    <div class="identify-page-title">
      <div class="top-box">
        <bread-crumb :data="breadCrumbList" :currentTitle="currentTitle"></bread-crumb>
      </div>
    </div>
    <div class="identify-pay-detail-page">
      <div class="content">
        <div class="left">
          <div class="title">征信授权书图像</div>
          <div class="result" id="result">
            <zoom-image :imagePosition="singleImagePosition" style="height:360px;" :img-src="imagesSrc" :imageRotate="rotateAngle" ref="img"></zoom-image>
          </div>
        </div>
        <div class="right">
          <div class="container">
            <div class="container-top">
              <div class="title">识别结果</div>
              <div class="result">
                <el-form label-position="right" label-width="40%" :model="fileMessageForm">
                  <el-form-item label="公司章:" @click.native="filedFocus('公司章')">
                    <el-input :disabled="isFiledFormEdit" v-model="fileMessageForm.companySeal"></el-input>
                  </el-form-item>
                  <el-form-item label="人名章:" @click.native="filedFocus('人名章')">
                    <el-input :disabled="isFiledFormEdit" v-model="fileMessageForm.personSeal"></el-input>
                  </el-form-item>
                  <el-form-item label="授权时间:" @click.native="filedFocus('授权时间')">
                    <el-date-picker
                      v-if="!isFiledFormEdit"
                      v-model="fileMessageForm.signTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                    </el-date-picker>
                    <el-input disabled v-else v-model="fileMessageForm.signTime"></el-input>
                  </el-form-item>
                  <el-form-item label="是否法人签章:" @click.native="filedFocus('是否法人签章')">
                    <el-select v-if="!isFiledFormEdit"  v-model="fileMessageForm.corporateStamp" placeholder="">
                      <el-option v-for="(item, index) in isStamp" :key="index" :label="item" :value="index"></el-option>
                    </el-select>
                    <el-input disabled v-else v-model="isStamp[fileMessageForm.corporateStamp]"></el-input>
                    <!-- <div v-else>{{isStamp[fileMessageForm.corporateStamp]}}</div> -->
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="container-bottom">
              <div class="title">存在问题</div>
              <div class="result">
                <el-form label-position="right" label-width="40%" :model="fileMessageForm">
                  <el-form-item label="问题分类:" @click.native="filedFocus('是否法人签章')">
                    <el-select v-if="!isFiledFormEdit && fileMessageForm.problemType"  v-model="fileMessageForm.problemType" placeholder="">
                      <el-option v-for="(item, index) in problemList" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-input disabled v-else v-model="problemMappingFun(fileMessageForm.problemType)[0].name"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="btn-group">
              <el-button class="cancel-btn" @click="previous">返回</el-button>
              <el-button v-if="isFiledFormEdit" class="modify-btn" @click="modifyFile">修改</el-button>
              <el-button v-else class="modify-btn" @click="saveFile">保存</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumb from "@/components/common/BreadCrumb";
import {getFileMessage, modifyFileMessage} from '@/rest/letterOfAuthorizationElecApi';
import {dateFormat} from '@/helpers/dateHelper';
import ZoomImage from '@/components/common/ZoomImage';
import {USERID, PROBLEM_LIST} from '@/global/global';

export default {
  data() {
    return {
      isFiledFormEdit: true,
      paymentOrderId: null,
      problemList: PROBLEM_LIST,
      tableData: [],
      isStamp: ['否', '是'],
      imagesSrc: 
        "http://www.pptbz.com/pptpic/UploadFiles_6909/201201/20120101182704481.jpg"
      ,
      positionInfo: null,
      rotateAngle: '',
      singleImagePosition: null,
      textarea: "",
      isSaveBtn: false,
      breadCrumbList: ["首页", "资产识别比对", "比对结果"],
      currentTitle: "付款公司名称-合同编号-付款主题",
      fileMessageForm: {},
      oldData: {},
      fileId: ''
    };
  },
  methods: {
    previous() {
      this.$router.go(-1);
    },
    problemMappingFun (target) {
      return this.problemList.filter(item => item.id === target);
    },
    modifyFile() {
      this.isFiledFormEdit = !this.isFiledFormEdit;
    },
    saveFile() {
      this.isFiledFormEdit = !this.isFiledFormEdit;
      const params = {
        file: {
          fileId: this.fileMessageForm.id,
          companySeal: this.fileMessageForm.companySeal,
          personSeal: this.fileMessageForm.personSeal,
          signTime: dateFormat(this.fileMessageForm.signTime),
          corporateStamp: this.fileMessageForm.corporateStamp,
          problemType: this.fileMessageForm.problemType,
          elecOrFile: this.fileMessageForm.elecOrFile,
          summaryId: this.fileMessageForm.summaryId,
          problemDescription: "",
          changed: ""
        },
        userId: USERID
      };
      if (this.oldData.companySeal === params.file.companySeal) {
        params.file.changed = 0;
      } else {
        params.file.changed = 1;
      }
      modifyFileMessage(params).then(() => {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      }, () => {
        this.$message({
          message: '修改失败',
          type: 'failed'
        })
      })
    },
    getFileDetailData(){
      const params = {
        userId: USERID,
        fileId: this.fileId
      }
      getFileMessage(params)
      .then(res => {
        this.fileMessageForm = res;
        this.oldData = JSON.parse(JSON.stringify(res));
      });
    },
    filedFocus(item) {
      const location_info = this.positionInfo[item];
      const location = location_info ? (location_info.hasOwnProperty('filePath') ? [{
          'imgUrl': this.imagesSrc,
          'x': location_info.left,
          'y': location_info.top,
          'width': location_info.width,
          'height': location_info.height,
          borderColor: 'red',
        }] : [{
          'x': location_info.left,
          'y': location_info.top,
          'width': location_info.width,
          'height': location_info.height,
          borderColor: 'red',
        }]) : [];
        let imageUrl = location.length ? location[0].imgUrl : '';
        if (imageUrl && imageUrl != 'undefined') {
          this.singleImagePosition  = location;
        }
    }
  },
  mounted() {
    this.fileId=this.$route.query.fileId;
    this.getFileDetailData();
  },
  components: {
    BreadCrumb,
    ZoomImage
  }
};
</script>

<style lang="scss" scoped>
.identify-result-detail-page {
  .top-box {
    height: 130px;
    background-color: #ffffff;
    .bread-crumb {
      padding: 14px 20px 0px;
    }
  }
  .identify-pay-detail-page {
    margin-top: 30px;
    background: #fff;
    padding: 30px;
    .content {
      display: flex;
      justify-content: center;
      .left {
        display: flex;
        flex-direction: column;
        width: 50%;
        height: 670px;
        border: 1px solid #ebebeb;
        padding: 20px 30px;
        .result {
          flex: 1;
          margin-top: 10px;
          padding-bottom: 20px;
          border: 1px solid #ebebeb;
          .result-img {
            width: 494px;
            height: 100%;
          }
          .img-src {
            display: none;
          }
         
        }
      }
      .right {
        width: 50%;
        margin-left: 20px;
        .container {
          display: flex;
          flex-direction: column;
          height: 670px;
          padding: 20px 30px;
          background: #fafafa;
          border: 1px solid #ebebeb;
          .result {
            overflow: auto;
            // height: 500px;
            padding: 20px 0;
            margin-top: 10px;
            border-top: 1px solid #ebebeb;
            /deep/ {
              .el-form {
                margin-top: 6px;
                padding:  0 20px;
                .el-form-item {
                  .el-form-item__label {
                    line-height: 30px;
                    font-size: 14px;
                    color: #333333;
                    font-weight: bold;
                  }
                  .el-form-item__content {
                    line-height: 30px;
                    .el-input {
                      height: 30px;
                      .el-input__inner {
                        height: 30px;
                      }
                    &.is-disabled {
                        .el-input__inner {
                          border: none;
                          color: #333333;
                          background-color: #FAFAFA;
                          cursor: default;
                        }
                      }
                    }
                    .el-date-editor {
                      // width: 100%;
                      .el-input__prefix {
                        .el-input__icon {
                          line-height: 30px;
                        }
                      }
                      .el-input__suffix {
                        display: none;
                      }
                      &.el-input {
                        width: 100%;
                      }
                    }
                    .el-select {
                      .el-input--suffix {
                        .el-input__suffix {
                          .el-icon-arrow-up {
                            line-height: 1;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            .item {
              margin-bottom: 20px;
              .item_title {
                display: flex;
                justify-content: flex-end;
                font-family: PingFangSC-Semibold;
                font-size: 14px;
                color: #333333;
              }
            }
            .item:last-child {
              margin-bottom: 0;
            }
          }
          .btn-group {
            display: flex;
            margin-top: auto;
            justify-content: flex-end;
            padding: 30px 0px;
            .modify-btn {
              margin-left: 40px;
            }
          }
        }
      }
    }
  }
}
/deep/ .el-button {
  width: 135px;
  background: #c1b071;
  border-radius: 4px;
  border-color: #c1b071;
  span {
    font-size: 14px;
    color: #ffffff;
  }
  &:hover {
    background-color: #e9d58b;
    border-color: #e9d58b;
  }
}
.el-button:active {
  border-color: #c1b071;
  color: #fff;
}
/deep/ .cancel-btn {
  background: #ffffff;
  border: 1px solid #d9d9d9;
  span {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #666666 !important;
  }
  &:hover {
    background-color: #fff;
    border-color: #d9d9d9;
  }
  &:active {
    border-color: #d9d9d9;
  }
}
.btn {
  margin-right: 30px;
}
.el-button + .el-button {
  margin-left: 0;
}
.title {
  font-family: PingFangSC-Semibold;
  font-size: 18px;
  color: #9a8b7b;
}
.red-text {
  color: #d0021b;
}
.divide-line {
  margin: 30px 0;
  height: 1px;
  background: #ebebeb;
}
</style>
