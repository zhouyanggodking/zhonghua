<template>
  <div class="elec-batch-info-indentify-page-details">
    <div class="identify-page-title">
      <div class="top-box">
        <bread-crumb :data="breadCrumbList" :currentTitle="`${batchNo}批次-${(excelMsg && excelMsg.companyName !== null) ? excelMsg.companyName : ''}`"></bread-crumb>
      </div>
    </div>
    <div class="elect-batch-container">
      <div class="elect-batch-row" v-loading="isLoading">
        <div class="elect-batch-row_item">
          <div class="elect-batch-row_item_header">
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
          <div class="content no-data" v-else>暂无数据</div>
        </div>
        <div class="elect-batch-row_item">
          <div class="elect-batch-row_item_header">
            <div class="title">电子文件识别结果</div>
            <el-button class="look-origin" :disabled="elecFileForm === null" @click="lookOriginElect">查看原件</el-button>
          </div>
          <div class="content" v-if="elecFileForm">
            <el-form label-position="right" label-width="40%" :model="elecFileForm">
              <el-form-item label="公司章：">
                <p>{{elecFileForm.companySeal}}</p>
              </el-form-item>
              <el-form-item label="人名章：">
                <p>{{elecFileForm.personSeal}}</p>
              </el-form-item>
              <el-form-item label="签署时间：">
                <p>{{elecFileForm.signTime}}</p>
              </el-form-item>
              <el-form-item label="是否法人签章：">
                <p>{{elecFileForm.corporateStamp ? '是' : '否'}}</p>
              </el-form-item>
              <el-form-item label="授权有效期：">
                <el-date-picker
                  v-if="!isEleFiledFormEdit"
                  v-model="elecFileForm.authorizationValidDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
                <el-input disabled v-else :value="elecFileForm.authorizationValidDate"></el-input>
              </el-form-item>
            </el-form>
            <div class="btn-group">
              <el-button v-if="isEleFiledFormEdit" :disabled="isExpired" class="modify-btn" @click="eleModifyFile">修改</el-button>
              <el-button v-else class="modify-btn" @click="eleSaveFile">保存</el-button>
            </div>
          </div>
          <div class="content no-data" v-else>暂无数据</div>
        </div>
      </div>
      <div class="elect-batch-row" v-loading="isLoading">
        <div class="elect-batch-row_item">
          <div class="elect-batch-row_item_header">
            <div class="title">智罗盘信息</div>
            <el-button class="look-origin" :disabled="dataBusData === null" @click="lookCompanyInfo">查看企业详细信息</el-button>
          </div>
          <div class="content" v-if="dataBusData">
            <el-row class="item" :gutter="10" v-for="(item,index) in dataBusInfoItems" :key="index">
              <el-col class="item-title" :span="10">
                <div>{{item.value}}</div>
              </el-col>
              <el-col class="item_num" :span="14">
                <div class="bg-purple">{{dataBusData[item.key]}}</div>
              </el-col>
            </el-row>
          </div>
          <div class="content no-data" v-else>对不起，未查询到该企业信息</div>
        </div>
        <div class="elect-batch-row_item">
          <div class="elect-batch-row_item_header">
            <div class="title">纸质文件信息匹配</div>
            <el-button :disabled="paperFileForm === null" class="look-origin" @click="lookOriginPaper">查看原件</el-button>
          </div>
          <div class="content" v-if="paperFileForm">
             <el-form label-position="right" label-width="40%" :model="paperFileForm">
              <el-form-item label="文件提交时间:">
                <el-date-picker
                  v-if="!isPaperFiledFormEdit"
                  v-model="paperFileForm.submitDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
                <el-input disabled v-else v-model="paperFileForm.submitDate"></el-input>
              </el-form-item>
              <el-form-item label="档案编号:">
                <el-input :disabled="isPaperFiledFormEdit" v-model="paperFileForm.fileNo"></el-input>
              </el-form-item>
            </el-form>
            <div class="btn-group">
              <el-button v-if="isPaperFiledFormEdit" :disabled="isExpired" class="modify-btn" @click="paperModifyFile">修改</el-button>
              <el-button v-else class="modify-btn" @click="paperSaveFile">保存</el-button>
            </div>
          </div>
          <div class="content no-data" v-else>暂无数据</div>
        </div>
      </div>
      <div class="review-opinion">
        <div class="review-opinion_title">审批意见</div>
        <div class="review-opinion_content">
          <div class="question-classify">
            <div class="text">问题分类:</div>
            <el-select v-model="problemForm.problemType" placeholder="请选择">
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
            <el-input type="textarea" maxlength="100" show-word-limit placeholder="请输入内容" v-model="problemForm.problemDescription" :rows="5"></el-input>
          </div>
          <div class="review-btn-group">
            <el-button class="cancel-btn" @click="previous">返回</el-button>
            <el-button class="submit-btn" :disabled="auditState === 1 || elecFileForm === null || isExpired" @click="reviewPass">审核通过</el-button>
            <el-button class="submit-btn" :disabled="auditState === 0 || elecFileForm === null" @click="reviewReject">驳回</el-button>
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
          v-if="dialogHintOperate==='驳回'"
          type="primary"
          class="submit-btn"
          @click="rejectOpinionOperate"
        >{{dialogHintOperate}}</el-button>
        <el-button
          v-if="dialogHintOperate==='审核通过'"
          type="primary"
          class="submit-btn"
          @click="reviewPassOpearte"
        >{{dialogHintOperate}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import BreadCrumb from "@/components/common/BreadCrumb";
import {getEstateAuthorizationExcelInfo, checkAuthRecord, modifyEleFileDate, modifyPaperFile} from "@/rest/letterOfAuthorizationElecApi";
import { PROBLEM_LIST} from "@/global/global";
import { dateFormat } from '@/helpers/dateHelper';
import localStorageHelper from '@/helpers/localStorageHelper';

let USERID = null;
const ELEORFILE = 0;
const CHECK = 1;
const REJECT = 0;

export default {
  data() {
    return {
      isLoading: false,
      isEleFiledFormEdit: true,
      isPaperFiledFormEdit: true,
      questionClassificationList: PROBLEM_LIST,
      question: "",
      isDialogVisible: false,
      rejectContent: "",
      collector: "",
      dialogTitle: "",
      dialogHintText: "请确认是否驳回",
      dialogHintOperate: "驳回",
      dialogVisible: false,
      reviewStatus: "全部",
      auditState: '',
      excelInfoItems: [
        {key: 'companyName', value: "公司名称："},
        {key: 'licenseNo', value: "营业执照："},
        {key: 'submitDate', value: "授权书提交日期："},
        {key: 'applyDate', value: "申请日期："},
        {key: 'depart', value: "部门："},
        {key: 'seqNo', value: "序号："}
      ],
      dataBusInfoItems: [
        {key: 'databusCompanyName', value: "公司名称："},
        {key: 'databusLicenseNo', value: "营业执照："},
        {key: 'databusPerson', value: "法人代表："}
      ],
      currentTitle: "20190404批次-金茂",
      breadCrumbList: [
        "首页",
        "征信查询授权书",
        "识别结果",
        "电子版批次详情",
        "查询清单",
        "详情"
      ],
      excelMsg: null,
      elecFileForm: {},
      paperFileForm: {},
      dataBusData: {},
      problemForm: {
        problemType: null,
        problemDescription: ''
      },
      batchNo: '',
      timeNowStamp: 0,
      isExpired: false,
    };
  },
  methods: {
    reviewPass() {
      if (USERID === this.elecFileForm.createUser) {
        this.isDialogVisible = true;
        this.dialogHintText = "请确认是否审核通过";
        this.dialogHintOperate = "审核通过";
      } else {
        this.$message.error('没有审核权限!');
      }
    },
    previous() {
      this.$router.push({path: `/creditElectronicBatchInformation/electronicBatchInformationDetails?id=${this.$route.query.summaryId}&pageNum=${this.$route.query.pageNum}&batchNo=${this.$route.query.batchNo}`});
    },
    rejectOpinionOperate() {
      this.isDialogVisible = false;
      this.dialogVisible = true;
      this.checkOrRejectFun(REJECT, this.problemForm.problemType, this.problemForm.problemDescription);
      this.auditState = 0;
    },
    reviewPassOpearte() {
      this.isDialogVisible = false;
      this.dialogVisible = true;
      this.checkOrRejectFun(CHECK, '', '');
      this.problemForm.problemType = '';
      this.problemForm.problemDescription = '';
      this.auditState = 1;
    },
    reviewReject() {
      if (USERID === this.elecFileForm.createUser) {
        if (this.problemForm) {
          if (this.problemForm.problemType && this.problemForm.problemType !== '' && this.problemForm.problemDescription && this.problemForm.problemDescription !== '') {
            this.isDialogVisible = true;
            this.dialogHintText = "请确认是否驳回";
            this.dialogHintOperate = "驳回";
          } else {
            this.$message({
              message: '请选择问题分类并填写问题描述!',
              type: 'warning'
            })
          }
        }
      } else {
        this.$message.error('没有驳回权限!');
      }
    },
    checkOrRejectFun(state, problemType, problemDescription) {
      const msg = state === 1 ? '审核' : '驳回';
      const params = {
        excel: {
          id: this.excelMsg.id,
          fileId: this.elecFileForm.id,
          rowkey: "",
          auditState: state,
          problemType: problemType,
          problemDescription: problemDescription,
          elecOrFile: ELEORFILE
        },
        userId: USERID
      };
      checkAuthRecord(params).then((res) => {
        if (res.data.status === 200) {
          this.$message({
            message: `${msg}完成`,
            type: 'success'
          });
          this.dialogVisible = false;
        } else {
          this.$message({
            // message: `${msg}失败`,
            message: res.data.message,
            type: 'warning'
          });
        }
      })
    },
    //智罗盘 查看企业详细信息
    lookCompanyInfo() {
      this.$router.push({ name: "look-company-info", query: { companyName: this.dataBusData.databusCompanyName, batch: this.$route.query.batchNo}});
    },
    // 电子识别
    eleModifyFile() {
      if (USERID === this.elecFileForm.createUser) {
        this.isEleFiledFormEdit = !this.isEleFiledFormEdit;
      } else {
        this.$message.error('没有修改权限!');
      }
    },
    eleSaveFile() {
      this.isEleFiledFormEdit = !this.isEleFiledFormEdit;
      const params = {
        file: {
          fileId: this.elecFileForm.id,
          authorizationValidDate: dateFormat(this.elecFileForm.authorizationValidDate)
        },
        userId: USERID
      }
      modifyEleFileDate(params).then((res) => {
        if (res.data.status === 200) {
          this.$message({
            message: '电子文件识别结果修改成功',
            type: 'success'
          })
        } else {
          this.$message.error('电子文件识别结果修改失败');
        }
      })
    },
    // 纸质信息匹配
    paperModifyFile() {
      if (USERID === this.elecFileForm.createUser) {
        this.isPaperFiledFormEdit = !this.isPaperFiledFormEdit;
      } else {
        this.$message.error('没有修改权限!');
      }
    },
    paperSaveFile() {
      this.isPaperFiledFormEdit = !this.isPaperFiledFormEdit;
      const params = {
        file: {
          fileId: this.paperFileForm.id,
          fileNo: this.paperFileForm.fileNo,
          submitDate: dateFormat(this.paperFileForm.submitDate)
        },
        userId: USERID
      }
      modifyPaperFile(params).then((res) => {
        if (res.data.status === 200) {
          this.$message({
            message: '纸质文件信息修改成功',
            type: 'success'
          })
        } else {
          this.$message.error('纸质文件信息修改失败');
        }
      })
    },
    lookOriginElect() {
      this.$router.push({ name: "look-origin", query: {fileId: this.elecFileForm.id, type: 'elec-match', batchNo: this.$route.query.batchNo} });
    },
    //查看原件
    lookOriginPaper() {
      this.$router.push({ name: "look-origin", query: {fileId: this.paperFileForm.id, type: 'elec-match', batchNo: this.$route.query.batchNo} });
    },
    fetchEstateAuthorizationExcelInfo() {
      this.isLoading = true;
      const params = {
        excelId: this.excelId,
        userId: USERID,
        elecOrFile: ELEORFILE
      };
      getEstateAuthorizationExcelInfo(params)
      .then(res => {
        this.excelMsg = res.excel;
        this.elecFileForm = res.elecFile;
        if (this.elecFileForm) {
          this.isExpired = (this.timeNowStamp > Number(this.elecFileForm.authorizationValidDate));
          this.elecFileForm.authorizationValidDate = this.getNowFormatDate(this.elecFileForm.authorizationValidDate);
        }
        this.dataBusData = res.databusInfo;
        this.paperFileForm = res.file;
        if (res.elecFile !== null) {
          this.problemForm.problemType = res.elecFile.problemType;
          this.problemForm.problemDescription = res.elecFile.problemDescription;
        } else {
          this.problemForm.problemType = '';
          this.problemForm.problemDescription = '';
        }
        this.isLoading = false;
      })
    },
    getNowFormatDate(timeStamp) {
      const date = new Date(timeStamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const strDate = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${strDate}`
    }
  },
  beforeCreate() {
    USERID = Number(localStorageHelper.getItem('USERID'));
  },
  mounted() {
    this.timeNowStamp = new Date().valueOf();
    this.excelId = this.$route.query.id;
    this.batchNo = this.$route.query.batchNo;
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
  .elect-batch-container {
    margin-top: 30px;
    font-size: 14px;
    .elect-batch-row {
      display: flex;
      justify-content: space-between;
      width: 100%;
      //   height: 368px;
      margin-bottom: 20px;
      .elect-batch-row_item {
        width: 49%;
        min-width: 400px;
        background: #ffffff;
        border-radius: 2px;
        .elect-batch-row_item_header {
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
          .bg-purple {
            padding: 0 15px;
          }
          &.no-data {
            font-size: 24px;
            color: #333333;
            font-weight: bold;
            text-align: center;
          }
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
                  p {
                    padding: 0 15px;
                    margin: 0;
                  }
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
                  .el-textarea {
                    .el-textarea__inner {
                      font-family: inherit;
                      border: none;
                      color: #333333;
                    }
                  }
                  .el-date-editor {
                    &.el-date-editor--date {
                      .el-input__inner {
                        padding-left: 30px;
                      }
                    }
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
          .btn-group {
            padding: 30px 0px;
            display: flex;
            justify-content: flex-end;
            .modify-btn {
              margin-left: 40px;
              @include buttonStyle;
              &.is-disabled, &.is-disabled:hover {
                @include disbaledButtonStyle
              }
            }
          }
          .item {
            height: 30px;
            line-height: 30px;
            margin-bottom: 22px;
            .item-title {
              display: flex;
              justify-content: flex-end;
              font-weight: bold;
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
          .submit-btn {
            @include buttonStyle;
            margin-left: 40px;
            &.is-disabled, &.is-disabled:hover {
              @include disbaledButtonStyle
            }
          }
          .cancel-btn {
            @include cancelBtnStyle;
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
