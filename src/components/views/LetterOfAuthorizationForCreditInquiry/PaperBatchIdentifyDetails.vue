<template>
  <div class="elec-batch-info-indentify-page-details">
    <div class="identify-page-title">
      <div class="top-box">
        <bread-crumb :data="breadCrumbList" :currentTitle="currentTitle"></bread-crumb>
      </div>
    </div>
    <div class="paper-batch-container">
      <div class="paper-batch-row">
        <div class="paper-batch-row_item">
          <div class="paper-batch-row_item_header">
            <div class="title">Excel提取信息</div>
          </div>
          <div class="content" v-if="excelMsg">
            <el-row class="item" :gutter="10" v-for="(item,index) in excelInfoItems" :key="index">
              <el-col class="item-title" :span="10">
                <div>{{item.value}}</div>
              </el-col>
              <el-col class="item_num" :span="14">
                <div class="bg-purple">{{excelMsg[item.key]}}</div>
              </el-col>
            </el-row>
          </div>
          <div class="no-data" v-else>
            暂无数据
          </div>
        </div>
        <div class="paper-batch-row_item">
          <div class="paper-batch-row_item_header">
            <div class="title">电子文件识别结果</div>
            <!-- <div class="look-origin" @click="lookOriginElect">查看原件</div> -->
            <el-button class="look-origin" :disabled="elecMsg === null" @click="lookOriginElect">查看原件</el-button>
          </div>
          <div class="content" v-if="elecMsg">
            <el-row class="item" :gutter="10" v-for="(item,index) in elecInfoItems" :key="index">
              <el-col class="item-title" :span="10">
                <div>{{item.value}}</div>
              </el-col>
              <el-col class="item_num" :span="14">
                <div class="bg-purple">{{elecMsg[item.key]}}</div>
              </el-col>
            </el-row>
          </div>
          <div class="no-data" v-else>
            暂无数据
          </div>
        </div>
      </div>
      <div class="paper-batch-row">
        <div class="paper-batch-row_item paper-result">
          <div class="paper-batch-row_item_header">
            <div class="title">纸质文件识别结果</div>
            <!-- <div class="look-origin" @click="lookOriginPaper">查看原件</div> -->
            <el-button class="look-origin" :disabled="paperFileForm === null" @click="lookOriginPaper">查看原件</el-button>
          </div>
          <div class="content" v-if="paperFileForm">
            <el-form label-position="right" label-width="40%" :model="paperFileForm">
              <div class="paper-file-form">
                <div class="part">
                  <el-form-item label="公司章:">
                    <el-input :disabled="isPaperFiledFormEdit" v-model="paperFileForm.companySeal"></el-input>
                  </el-form-item>
                  <el-form-item label="签署时间:">
                    <el-date-picker
                      v-if="!isPaperFiledFormEdit"
                      v-model="paperFileForm.signTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                    </el-date-picker>
                    <el-input disabled v-else v-model="paperFileForm.signTime"></el-input>
                  </el-form-item>
                </div>
                <div class="part">
                  <el-form-item label="人名章:">
                    <el-input :disabled="isPaperFiledFormEdit" v-model="paperFileForm.personSeal"></el-input>
                  </el-form-item>
                  <el-form-item label="是否法人签章:">
                    <el-select v-if="!isPaperFiledFormEdit"  v-model="paperFileForm.corporateStamp" placeholder="">
                      <el-option v-for="(item, index) in isStamp" :key="index" :label="item" :value="index"></el-option>
                    </el-select>
                    <el-input disabled v-else v-model="isStamp[paperFileForm.corporateStamp]"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-form>
            <div class="elec-btn-group">
              <el-button v-if="isPaperFiledFormEdit" class="modify-btn" @click="paperModifyFile">修改</el-button>
              <el-button v-else class="modify-btn" @click="paperSaveFile">保存</el-button>
            </div>
          </div>
          <div class="no-data" v-else>
            暂无数据
          </div>
        </div>
      </div>
      <div class="review-opinion">
        <div class="review-opinion_title">审批意见</div>
        <div class="review-opinion_content">
          <div class="question-classify">
            <div class="text">问题分类:</div>
            <el-select v-model="rejectForm.problemType" placeholder="请选择">
              <el-option
                v-for="(item, index) in questionClassificationList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="question-describe">
            <div class="text">其他问题描述:</div>
            <el-input type="textarea" maxlength="100" show-word-limit placeholder="请输入内容" v-model="rejectForm.problemDescription" :rows="5"></el-input>
          </div>
          <div class="review-btn-group">
            <el-button class="cancel-btn" @click="previous">返回</el-button>
            <el-button class="submit-btn" :disabled="auditState === 1 && paperFileForm === null" @click="reviewPass">审核通过</el-button>
            <el-button class="submit-btn" :disabled="auditState === 0 && paperFileForm === null" @click="reviewReject">驳回</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      class="dialog-common confirmDialog"
      title
      :visible.sync="isDialogVisible"
      width="30%"
    >
      <div class="dialog-content">
        <div
          class="dialog-content_icon"
          :class="{'review-icon':dialogHintOperate==='审核通过','reject-icon':dialogHintOperate==='驳回'}"
        ></div>
        <div class="dialog-content_text">{{dialogHintText}}</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-btn" @click="isDialogVisible = false">取消</el-button>
        <el-button
          class="submit-btn"
          v-if="dialogHintOperate==='驳回'"
          type="primary"
          @click="rejectOpinionOperate"
        >{{dialogHintOperate}}</el-button>
        <el-button
          class="submit-btn"
          v-if="dialogHintOperate==='审核通过'"
          type="primary"
          @click="reviewPassOpearte"
        >{{dialogHintOperate}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import BreadCrumb from "@/components/common/BreadCrumb";
import { getEstateAuthorizationExcelInfo, checkAuthRecord, modifyFileMessage } from "@/rest/letterOfAuthorizationElecApi";
import {USERID, PROBLEM_LIST} from "@/global/global";
import {dateFormat} from '@/helpers/dateHelper';

const ELEORFILE = 1;
const CHECK = 1;
const REJECT = 0;

export default {
  data() {
    return {
      isStamp: ['否', '是'],
      isPaperFiledFormEdit: true,
      questionClassificationList: PROBLEM_LIST,
      questionDescrible: "",
      isDialogVisible: false,
      rejectContent: "",
      collector: "",
      dialogTitle: "",
      dialogHintText: "请确认是否驳回",
      dialogHintOperate: "驳回",
      auditState: '',
      excelInfoItems: [
        {key: 'companyName', value: "公司名称："},
        {key: 'licenseNo', value: "营业执照："},
        {key: 'submitDate', value: "授权书提交日期："},
        {key: 'applyDate', value: "申请日期："},
        {key: 'depart', value: "部门："},
        {key: 'seqNo0', value: "序号："}
      ],
      elecInfoItems: [
        {key: 'databusCompanyName', value: "公司名称："},
        {key: 'databusPerson', value: "法人姓名："},
        {key: 'databusLicenseNo', value: "营业执照号："},
        {key: 'signTime', value: "签署时间："},
        {key: 'authorizationValidDate', value: "授权有效期："},
        {key: 'fileNo', value: "档案编号："},
        {key: 'submitDate', value: "提交时间："}
      ],
      currentTitle: "20190404批次-金茂",
      breadCrumbList: [
        "征信查询授权书",
        "识别结果",
        "电子版批次信息",
        "查询清单"
      ],
      excelMsg: null,
      elecMsg: true,
      rejectForm: {
        problemType: '',
        problemDescription: ''
      },
      paperFileForm: {},
      oldData: {}
    };
  },
  methods: {
    goBack() {},
    search() {},
    // 返回
    previous() {
      this.$router.go(-1);
    },
    // 审核通过
    reviewPass() {
      this.isDialogVisible = true;
      this.dialogHintText = "请确认是否审核通过";
      this.dialogHintOperate = "审核通过";
    },
    // 审核通过，确定
    reviewPassOpearte() {
      this.isDialogVisible = false;
      this.checkOrRejectFun(CHECK, '', '');
      this.elecMsg.problemType = 0;
      this.elecMsg.problemDescription = '';
      this.auditState = 1;
    },
    // 驳回
    reviewReject() {
      this.isDialogVisible = true;
      this.dialogHintText = "请确认是否驳回";
      this.dialogHintOperate = "驳回";
    },
    // 驳回，确定
    rejectOpinionOperate() {
      this.isDialogVisible = false;
      if (this.elecMsg) {
        if (this.elecMsg.problemType !== '' && this.elecMsg.problemDescription !== '') {
          this.checkOrRejectFun(REJECT, this.elecMsg.problemType, this.elecMsg.problemDescription);
          this.auditState = 0;
        } else {
          this.$message({
            message: '请选择问题分类并填写问题描述!',
            type: 'warning'
          })
        }
      }
    },
    // 驳回、审核
    checkOrRejectFun(state, problemType, problemDescription) {
      const msg = state === 1 ? '审核' : '驳回';
      const params = {
        excel: {
          id: this.excelMsg.id,
          fileId: this.paperFileForm.id,
          rowkey: "",
          auditState: state,
          problemType: problemType,
          problemDescription: problemDescription,
          elecOrFile: ELEORFILE
        },
        userId: USERID
      };
      checkAuthRecord(params).then(() => {
        this.$message({
          message: `${msg}完成`,
          type: 'success'
        });
        this.dialogVisible = false;
      }, (err) => {
        this.$message({
          // message: `${msg}失败`,
          message: err.message,
          type: 'warning'
        })
      })
    },
    // 纸质信息，修改
    paperModifyFile() {
      this.isPaperFiledFormEdit = !this.isPaperFiledFormEdit;
    },
    // 纸质信息，保存
    paperSaveFile() {
      this.isPaperFiledFormEdit = !this.isPaperFiledFormEdit;
      const params = {
        file: {
          fileId: this.paperFileForm.id,
          companySeal: this.paperFileForm.companySeal,
          personSeal: this.paperFileForm.personSeal,
          signTime: dateFormat(this.paperFileForm.signTime),
          corporateStamp: this.paperFileForm.corporateStamp,
          problemType: this.rejectForm.problemType,
          elecOrFile: this.paperFileForm.elecOrFile,
          summaryId: this.paperFileForm.summaryId,
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
    //电子，查看原件
    lookOriginElect() {
      this.$router.push({ name: "look-origin-paper", query: {fileId: this.paperFileForm.id} });
    },
    //纸质，查看原件
    lookOriginPaper() {
      this.$router.push({ name: "look-origin-paper", query: {fileId: this.paperFileForm.id} });
    },
    fetchEstateAuthorizationExcelInfo() {
      const params = {
        excelId: this.excelId,
        userId: USERID,
        elecOrFile: ELEORFILE
      };
      getEstateAuthorizationExcelInfo(params)
      .then(res => {
        this.excelMsg = res.excel;
        this.elecMsg = res.elecFile;
        this.paperFileForm = res.file;
        this.oldData = JSON.parse(JSON.stringify(res.file));
        if (res.file !== null) {
          this.rejectForm.problemType = res.file.problemType;
          this.rejectForm.problemDescription = res.file.problemDescription;
        } else {
          this.rejectForm.problemType = '';
          this.rejectForm.problemDescription = '';
        }
      })
    }
  },
  mounted() {
    this.excelId = this.$route.query.id;
    this.auditState = Number(this.$route.query.auditState);
    this.fetchEstateAuthorizationExcelInfo();
  },
  components: {
    BreadCrumb
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/mixin.scss';

.elec-batch-info-indentify-page-details {
  .top-box {
    height: 130px;
    background-color: #ffffff;
    .bread-crumb {
      padding: 14px 20px 0px;
    }
  }
  .identify-page-title {
    background-color: #ffffff;
    height: 129px;
    .uploadTitle {
      padding: 20px 0px 0 14px;
      font-size: 12px;
      color: #151515;
      .backToIndex {
        color: #999999;
      }
      .backBorder {
        padding: 2px 0;
        font-size: 12px;
        border: 1px solid #999999;
        border-radius: 3px;
        color: #999999;
        margin-right: 5px;
      }
    }

    .title-name {
      font-family: "PingFangSC-Regular";
      font-size: 12px;
      color: #999999;
      padding-top: 33px;
      margin-left: 30px;
    }
  }
  .paper-batch-container {
    margin-top: 30px;
    font-size: 14px;
    .no-data {
      padding: 30px 30px;
      text-align: center;
      font-size: 30px;
      font-weight: bold;
    }
    .paper-batch-row {
      display: flex;
      justify-content: space-between;
      width: 100%;
      //   height: 368px;
      margin-bottom: 20px;
      .paper-batch-row_item {
        width: 49%;
        min-width: 400px;
        background: #ffffff;
        border-radius: 2px;
        .paper-batch-row_item_header {
          display: flex;
          justify-content: space-between;
          height: 56px;
          padding-left: 30px;
          padding-right: 30px;
          line-height: 56px;
          border-bottom: 1px solid #e8e8e8;
          .title {
            font-family: PingFangSC-Semibold;
            font-size: 18px;
            color: #333333;
          }
          .look-origin {
            padding: 0;
            font-size: 16px;
            color: #4a90e2;
            text-align: left;
            border: none;
            cursor: pointer;
            &:hover {
              background-color: #ffffff;
            }
            &.is-disabled {
              cursor: not-allowed;
            }
          }
        }
        .content {
          padding: 30px;
          .item {
            margin-bottom: 20px;
            .item-title {
              display: flex;
              justify-content: flex-end;
              font-family: PingFangSC-Semibold;
              font-size: 14px;
              color: #666666;
            }
            .item-num {
              font-size: 14px;
              color: #333;
            }
          }
          .item:last-child {
            margin-bottom: 0;
          }
        }
      }
      .paper-result {
        width: 100%;
        .content {
          /deep/ {
            .el-form {
              padding:  0 20px;
              .el-form-item {
                .el-form-item__label {
                  line-height: 30px;
                  font-size: 14px;
                  color: #666666;
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
                        background-color: #ffffff;
                        cursor: default;
                      }
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
                  .el-date-editor {
                    // width: 100%;
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
                }
              }
            }
          }
          .item-result {
              margin-bottom: 20px;
            .item-title {
              display: flex;
              justify-content: center;
              font-family: PingFangSC-Semibold;
              font-size: 14px;
              color: #666666;
            }
            .item-num {
              display: flex ;
               justify-content: center;
              font-size: 14px;
              color: #333;
            }
          }
          .item:last-child {
            margin-bottom: 0;
          }
          .paper-file-form {
            width: 100%;
            display: flex;
            .part {
              width: 50%;
            }
          }
          .elec-btn-group {
            display: flex;
            justify-content: flex-end;
            margin-top: 30px;
            .modify-btn {
              @include buttonStyle;
              margin-left: 40px;
            }
            // .submit-btn {
            //   @include buttonStyle;
            //   margin-left: 40px;
            // }
            // .cancel-btn {
            //   @include cancelBtnStyle;
            // }
          }
        }
      }
    }
    .review-opinion {
      background: #fff;
      padding: 30px;
      border-radius: 2px;
      .review-opinion_title {
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        color: #333333;
        margin-bottom: 10px;
      }
      .review-opinion_content {
        padding: 20px 30px;
        background: #fafafa;
        .question-classify {
          display: flex;
          align-items: center;
        }
        .question-describe {
          display: flex;
          margin-top: 20px;
          .el-textarea {
            width: calc(100% - 100px);
          }
        }
        .review-btn-group {
          display: flex;
          justify-content: flex-end;
          margin-top: 30px;
          .el-button {
            &.cancel-btn {
              @include cancelBtnStyle;
            }
            &.submit-btn {
              @include buttonStyle;
              margin-left: 40px;
            }
          }
        }
      }
    }
  }
}
.dialog-common {
  /deep/ .el-dialog {
    width: 521px !important;
    height: 228px !important;
    border-radius: 0;
    .el-dialog__header {
      padding-top: 0;
      padding-bottom: 4px;
      .el-dialog__headerbtn {
        display: none;
      }
    }
    .el-dialog__body {
      padding-bottom: 30px;
    }
    .el-dialog__footer {
      border: none;
      .dialog-footer {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        .el-button {
          width: 135px;
          height: 40px;
        }
      }
    }

    .dialog-footer {
      .cancel-btn {
        margin-right: 40px;
        background: #ffffff;
        border: 1px solid #d9d9d9;
        span {
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #666666 !important;
        }
      }
    }
  }

  .dialog-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .dialog-content_icon {
    width: 36px;
    height: 36px;
    background: red;
  }
  .review-icon {
    width: 36px;
    height: 37px;
    background: url("./../../../assets/imgs/9.png") no-repeat;
    background-size: cover;
  }
  .reject-icon {
    background: url("./../../../assets/imgs/8.png") no-repeat;
    background-size: cover;
  }
  .dialog-content_text {
    margin-top: 20px;
    font-family: PingFangSC-Semibold;
    font-size: 20px;
    color: #666666;
  }
}
.text {
  width: 90px;
  margin-right: 10px;
  font-family: PingFangSC-Semibold;
  font-size: 14px;
  color: #666666;
  text-align: right;
}
</style>
