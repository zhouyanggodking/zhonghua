<template>
  <div class="elec-batch-info-indentify-page-details">
    <div class="identify-page-title">
      <div class="top-box">
        <bread-crumb :data="breadCrumbList" :currentTitle="currentTitle"></bread-crumb>
      </div>
    </div>
    <div class="elect-batch-container">
      <div class="elect-batch-row">
        <div class="elect-batch-row_item">
          <div class="elect-batch-row_item_header">
            <div class="title">Excel提取信息</div>
          </div>
          <div class="content">
            <el-row class="item" :gutter="10" v-for="(item,index) in excelInfoItems" :key="index">
              <el-col class="item-title" :span="10">
                <div>{{item}}</div>
              </el-col>
              <el-col class="item_num" :span="14">
                <div class="bg-purple"></div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="elect-batch-row_item">
          <div class="elect-batch-row_item_header">
            <div class="title">电子文件识别结果</div>
            <div class="look-origin" @click="lookOriginElect">查看原件</div>
          </div>

          <div class="content">
            <el-row class="item" :gutter="10" v-for="(item,index) in excelInfoItems" :key="index">
              <el-col class="item-title" :span="10">
                <div>{{item}}</div>
              </el-col>
              <el-col class="item_num" :span="14">
                <div class="bg-purple"></div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="elect-batch-row">
        <div class="elect-batch-row_item">
          <div class="elect-batch-row_item_header">
            <div class="title">智罗盘信息</div>
            <div class="look-origin" @click="lookCompanyInfo">查看企业详细信息</div>
          </div>
          <div class="content">
            <el-row class="item" :gutter="10" v-for="(item,index) in excelInfoItems" :key="index">
              <el-col class="item-title" :span="10">
                <div>{{item}}</div>
              </el-col>
              <el-col class="item_num" :span="14">
                <div class="bg-purple"></div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="elect-batch-row_item">
          <div class="elect-batch-row_item_header">
            <div class="title">纸质文件信息匹配</div>
            <div class="look-origin" @click="lookOriginPaper">查看原件</div>
          </div>
          <div class="content">
            <el-row class="item" :gutter="10" v-for="(item,index) in excelInfoItems" :key="index">
              <el-col class="item-title" :span="10">
                <div>{{item}}</div>
              </el-col>
              <el-col class="item_num" :span="14">
                <div class="bg-purple"></div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="review-opinion">
        <div class="review-opinion_title">审批意见</div>
        <div class="review-opinion_content">
          <div class="question-classify">
            <div class="text">问题分类:</div>
            <el-select v-model="question" placeholder="请选择">
              <el-option
                v-for="item in questionClassificationList"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </div>
          <div class="question-describe">
            <div class="text">其他问题描述:</div>
            <el-input type="textarea" placeholder="请输入内容" v-model="questionDescrible" :rows="5"></el-input>
          </div>
          <div class="review-btn-group">
            <el-button class="cancel-btn" @click="previous">返回</el-button>
            <el-button @click="reviewPass">审核通过</el-button>
            <el-button @click="reviewReject">驳回</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      class="dialog-common"
      title
      :visible.sync="isDialogVisible"
      width="30%"
      :before-close="handleClose"
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
          @click="rejectOpinionOperate"
        >{{dialogHintOperate}}</el-button>
        <el-button
          v-if="dialogHintOperate==='审核通过'"
          type="primary"
          @click="reviewPassOpearte"
        >{{dialogHintOperate}}</el-button>
        <el-button
          v-if="dialogHintOperate==='批量通过'"
          type="primary"
          @click="batchReviewPass"
        >{{dialogHintOperate}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import BreadCrumb from "@/components/common/BreadCrumb";

export default {
  data() {
    return {
      payTheme: "",
      contractNum: "",
      payer: "",
      questionDescrible: "",
      questionClassificationList: ["1", "2"],
      question: "",
      isDialogVisible: false,
      rejectContent: "",
      collector: "",
      dialogTitle: "",
      dialogHintText: "请确认是否驳回",
      dialogHintOperate: "驳回",
      dialogVisible: false,
      reviewStatus: "全部",
      excelInfoItems: [
        "公司名称：",
        "营业执照：",
        "授权书提交日期：",
        "申请日期：",
        "部门：",
        "序号："
      ],
      currentTitle: "20190404批次-金茂",
      breadCrumbList: [
        "征信查询授权书",
        "识别结果",
        "电子版批次信息",
        "查询清单"
      ]
    };
  },
  methods: {
    goBack() {},
    search() {},
    reviewPass() {
      this.isDialogVisible = true;
      this.dialogHintText = "请确认是否审核通过";
      this.dialogHintOperate = "审核通过";
    },
    previous() {
      this.$router.go(-1);
    },
    rejectOpinionOperate() {},
    reviewPassOpearte() {},
    reviewReject() {
      this.isDialogVisible = true;
      this.dialogHintText = "请确认是否驳回";
      this.dialogHintOperate = "驳回";
    },
    //智罗盘 查看企业详细信息
    lookCompanyInfo() {
      this.$router.push({ name: "look-company-info" });
    },
    //查看原件
    lookOriginPaper() {
      this.$router.push({ name: "look-origin" });
    },
    lookOriginElect() {
      this.$router.push({ name: "look-origin" });
    }
  },
  components: {
    BreadCrumb
  }
};
</script>

<style lang="scss" scoped>
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
  .elect-batch-container {
    margin-top: 30px;
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
            color: #9a8b7b;
          }
          .look-origin {
            font-size: 16px;
            color: #4a90e2;
            text-align: left;
            cursor: pointer;
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
    }
    .review-opinion {
      background: #fff;
      padding: 30px;
      border-radius: 2px;
      .review-opinion_title {
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        color: #9a8b7b;
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
            margin-left: 30px;
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
.btn {
  margin-right: 30px;
}
.el-button + .el-button {
  margin-left: 0;
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
    border-color: #c1b071;
  }
  &:active {
    border-color: #c1b071;
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
