<template>
  <div class="identify-result-detail-page">
    <div class="identify-page-title">
      <div class="top-box">
        <bread-crumb :data="breadCrumbList" :currentTitle="`${batchNo}批次-${fileMessageForm.companySeal && fileMessageForm.companySeal !== null ? fileMessageForm.companySeal : ''}`"></bread-crumb>
      </div>
    </div>
    <div class="identify-pay-detail-page">
      <div class="content">
        <div class="left">
          <div class="title">征信授权书图像</div>
          <div class="result" id="result">
            <el-carousel ref="imgCarousel" height="100%" :autoplay="false" indicator-position="none" :initial-index="imagesSrc.length - 1" @change="onCarouselChange">
              <el-carousel-item v-for="(imgPath, index) in imagesSrc" :key="index">
                <zoom-image :imagePosition="index === (imagesSrc.length - 1) ? singleImagePosition : []" style="height:100%;" :img-src="imgPath" :imageRotate="rotateAngle" ref="img"></zoom-image>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="right">
          <div class="container">
            <div class="container-top">
              <div class="title">识别结果</div>
              <div class="result">
                <el-form label-position="right" label-width="40%" :model="fileMessageForm">
                  <el-form-item label="公司章:" @click.native="filedFocus('公司章位置')">
                    <el-input :disabled="isFiledFormEdit" v-model="fileMessageForm.companySeal"></el-input>
                  </el-form-item>
                  <el-form-item label="人名章:" @click.native="filedFocus('人名章位置')">
                    <el-input :disabled="isFiledFormEdit" v-model="fileMessageForm.personSeal"></el-input>
                  </el-form-item>
                  <el-form-item label="签署时间:" @click.native="filedFocus('日期位置')">
                    <el-date-picker
                      v-if="!isFiledFormEdit"
                      v-model="fileMessageForm.signTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                    </el-date-picker>
                    <el-input disabled v-else v-model="fileMessageForm.signTime"></el-input>
                  </el-form-item>
                  <el-form-item label="是否法人签章:" @click.native="filedFocus('是否法人签章位置')">
                    <el-select v-if="!isFiledFormEdit"  v-model="fileMessageForm.corporateStamp" placeholder="">
                      <el-option v-for="(item, index) in isStamp" :key="index" :label="item" :value="index"></el-option>
                    </el-select>
                    <el-input disabled v-else v-model="isStamp[fileMessageForm.corporateStamp]"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="container-bottom">
              <div class="title">存在问题</div>
              <div class="result">
                <el-form label-position="right" label-width="40%" :model="fileMessageForm">
                  <el-form-item label="问题分类:" @click.native="filedFocus('是否法人签章位置')">
                    <el-select v-if="!isFiledFormEdit"  v-model="fileMessageForm.problemType" placeholder="">
                      <el-option v-for="(item, index) in problemList" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-input disabled v-else :value="problemMappingFun(fileMessageForm.problemType)"></el-input>
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
import { PROBLEM_LIST} from '@/global/global';
import localStorageHelper from '@/helpers/localStorageHelper';

let USERID = null;
export default {
  data() {
    return {
      isFiledFormEdit: true,
      paymentOrderId: null,
      problemList: PROBLEM_LIST,
      tableData: [],
      isStamp: ['否', '是'],
      imagesSrc: '',
      positionInfo: null,
      rotateAngle: '',
      singleImagePosition: [],
      textarea: "",
      isSaveBtn: false,
      breadCrumbList: [],
      currentTitle: "",
      fileMessageForm: {},
      oldData: {},
      fileId: '',
      fileType: '',
      batchNo: ''
    };
  },
  methods: {
    onCarouselChange() {
      this.singleImagePosition = [];
    },
    previous() {
      this.$router.go(-1);
    },
    problemMappingFun (target) {
      if (this.problemList.filter(item => item.id === target).length) {
        return this.problemList.filter(item => item.id === target)[0].name;
      } return '暂无'
    },
    modifyFile() {
      if (USERID === this.fileMessageForm.createUser) {
        this.isFiledFormEdit = !this.isFiledFormEdit;
      } else {
        this.$message.error('您没有修改权限!');
      }
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
      modifyFileMessage(params).then((res) => {
        if (res.status === 200 || res.status === 202) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          this.$message.error('修改失败');
        }
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
        this.fileMessageForm.problemType = this.fileMessageForm.problemType !== null ? this.fileMessageForm.problemType : 0;
        this.fileMessageForm.corporateStamp = this.fileMessageForm.corporateStamp !== null ? this.fileMessageForm.corporateStamp : '';
        this.positionInfo = JSON.parse(res.info);
        this.imagesSrc = res.locations;
        this.oldData = JSON.parse(JSON.stringify(res));
      });
    },
    filedFocus(item) {
      const location_info = this.positionInfo[item];
      const location = location_info ? (location_info.hasOwnProperty('filePath') ? [{
          'imgUrl': this.imagesSrc,
          'x': Number(location_info.x0),
          'y': Number(location_info.y0),
          'width': Number(location_info.x1) - Number(location_info.x0),
          'height': Number(location_info.y1) - Number(location_info.y0),
          borderColor: 'red',
        }] : [{
          'x': Number(location_info.x0),
          'y': Number(location_info.y0),
          'width': Number(location_info.x1) - Number(location_info.x0),
          'height': Number(location_info.y1) - Number(location_info.y0),
          borderColor: 'red',
        }]) : [];
        // let imageUrl = location.length ? location[0].imgUrl : '';
        // if (imageUrl && imageUrl != 'undefined') {
        //   this.singleImagePosition  = location;
        // }
        this.singleImagePosition  = location;
    },
    formatFileType(tar) {
      if (tar === 'elec-match') {
        return [ "首页", "征信查询授权书", "识别结果", "电子版批次详情", "查询清单", "详情" ]
      } else if (tar === 'elec-notMatch') {
        return [ "首页", "征信查询授权书", "识别结果", "电子版批次详情", "未匹配查询清单授权书", "详情" ]
      } else if (tar === 'paper-match') {
        return [ "首页", "征信查询授权书", "识别结果", "纸质版批次详情", "查询清单", "详情" ]
      } else if (tar === 'paper-notMatch') {
        return [ "首页", "征信查询授权书", "识别结果", "纸质版批次详情", "未匹配查询清单授权书", "详情" ]
      }
    }
  },
  beforeCreate() {
    USERID = Number(localStorageHelper.getItem('USERID'));
  },
  mounted() {
    this.fileId=this.$route.query.fileId;
    this.batchNo = this.$route.query.batchNo;
    this.breadCrumbList = this.formatFileType(this.$route.query.type);
    this.getFileDetailData();
  },
  components: {
    BreadCrumb,
    ZoomImage
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/mixin.scss';

.identify-result-detail-page {
  display: -webkit-box;
  flex: 1;
  flex-direction: column;
  .top-box {
    height: 130px;
    background-color: #ffffff;
  }
  .identify-pay-detail-page {
    flex: 1;
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
          .el-carousel {
            height: 100%;
          }
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
                      .el-input__prefix {
                        .el-input__icon {
                          line-height: 30px;
                        }
                      }
                      .el-input__suffix {
                        .el-input__suffix-inner {
                          .el-input__icon {
                            line-height: 30px;
                          }
                        }
                      }
                      &.el-input {
                        width: 100%;
                      }
                    }
                    .el-select {
                      width: 100%;
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
              @include buttonStyle;
              margin-left: 40px;
            }
            .cancel-btn {
              @include cancelBtnStyle;
            }
          }
        }
      }
    }
  }
}
.title {
  font-family: PingFangSC-Semibold;
  font-size: 18px;
  color: #333333;
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
