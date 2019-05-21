<template>
  <div class="real-estate-upload">
    <bread-crumb :data="breadCrumbList" currentTitle="文件上传"></bread-crumb>
    <div class="upload-main">
      <file-upload class="file-upload-box"></file-upload>
      <div class="filed-edit">
        <div class="title">提取字段编辑</div>
        <div class="add-filed-btn">
          <el-button @click="addNewFiled">新增字段</el-button>
        </div>
        <div class="collapse down" v-if="!isShowFiledList" @click="toggleFiledList">
          <div class="collapse-text">点击展开查看或编辑提取字段</div>
          <div class="collapse-icon"></div>
        </div>
        <el-collapse-transition>
          <div v-show="isShowFiledList">
            <div class="filed-list">
              <div class="filed-box-title">
                <div class="text-one">标准字段</div>
                <div class="text-two">本次提取字段</div>
                <div class="text-three">操作</div>
              </div>
              <div class="filed-box-content">
                <div class="filed-item" v-for="(item, index) in filedList" :key="index">
                  <div class="filed-edit-name">
                    {{item.standardName}}
                  </div>
                  <div class="input-box">
                    <el-input :placeholder="item.editName" v-model="item.editName"></el-input>
                  </div>
                  <div class="del-btn" @click="removeItem(item)">删除</div>
                </div>
              </div>
            </div>
            <div class="add-filed" :class="{'add-filed-disabled': filedList.length >= 15}" @click="addNewFiled">
              +&nbsp;新增字段
            </div>
            <div class="filed-option">
              <el-button class="cancle-btn" @click="cancleEditFileds">返回</el-button>
              <el-button class="submit-btn" @click="handleUpdateFiledsClick">提交</el-button>
            </div>
          </div>
        </el-collapse-transition>
        <div class="collapse up" v-if="isShowFiledList" @click="toggleFiledList">
          <div class="collapse-text">点击收起</div>
          <div class="collapse-icon"></div>
        </div>
        <el-dialog class="dialog-form" title="新增字段" :visible.sync="dialogFormVisible">
          <el-form :model="addFiledform" :rules="rules" ref="addFiledform">
            <el-form-item label="标准字段" :label-width="formLabelWidth" prop="standardName">
              <el-input placeholder="请输入标准字段(必填)" v-model="addFiledform.standardName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="本次提取字段" :label-width="formLabelWidth" prop="editName">
              <el-input placeholder="请输入提取字段(必填)" v-model="addFiledform.editName" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button class="cancle-btn" @click="dialogFormVisible = false">取 消</el-button>
            <el-button class="goon-btn" :disabled="filedList.length >= 15" type="primary" @click="handleSubmitClick('goonBtn')">继续新增</el-button>
            <el-button class="submit-btn" :disabled="filedList.length >= 15" type="primary" @click="handleSubmitClick('sureBtn')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="upload-history">
        <div class="title">上传记录</div>
        <el-table
          v-loading="isLoading"
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            align="center"
            label="文件名"
            prop="filename">
          </el-table-column>
          <el-table-column
            align="center"
            label="识别状态"
            prop="status">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 0">未开始</span>
              <span v-else-if="scope.row.status === 1" style="color: #4A90E2;">识别中</span>
              <span v-else-if="scope.row.status === 2" style="color: #417505;">识别成功</span>
              <span v-else-if="scope.row.status === -1" style="color: #D0021B;">识别失败</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="审核状态"
            prop="audit_status">
            <template slot-scope="scope">
              <span v-if="scope.row.audit_status === 0">未审核</span>
              <span v-else-if="scope.row.audit_status === 1" style="color: #4A90E2;">已审核</span>
              <span v-else-if="scope.row.audit_status === 2" style="color: #D0021B;">驳回</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="上传日期"
            prop="uploadTime">
          </el-table-column>
        </el-table>
        <Pagination @change="onHistoryPageNumChange" :totalCount="totalCount" class="history-pagination"></Pagination>
      </div>
    </div>
    <el-dialog
      :visible.sync="delDialogVisiable"
      :show-close="false"
      class="confirmDialog"
      width="520px"
      center>
      <div class="icon"></div>
      <div class="text">请确认是否删除</div>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancle-btn" @click="delDialogVisiable = false">取 消</el-button>
        <el-button class="submit-btn" type="primary" @click="handleDeleteClick">确 定</el-button>
      </span>
    </el-dialog>
    <div class="real-estate-upload-footer">
      <el-button class="return-back">返回</el-button>
      <el-button class="start-identify">开始识别 </el-button>
    </div>
  </div>
</template>
<script>
import BreadCrumb from '@/components/common/BreadCrumb';
import FileUpload from '@/components/common/FileUpload';
import Pagination from "@/components/common/Pagination";
import {getOcrExtractTemplateFields, updateOcrExtractTemplateFields, deleteTemplateField, getUploadHistory} from '@/rest/realEstateUploadApi';

const PAGE_SIZE = 10;

export default {
  data() {
    return {
      isLoading: false,
      isShowFiledList: false,
      delDialogVisiable: false,
      currentPage: 1,
      totalCount: 0,
      pageSize: PAGE_SIZE,
      pageSizes: [PAGE_SIZE],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      activeName: 'filedEdit',
      breadCrumbList: [
        '动产项目承兑', '文件上传'
      ],
      addFiledform: {
        standardName: '',
        editName: '',
        businessTypeId: 1,
        standardType: 1,
        createUserId: 1,
        status: 1
      },
      filedList: [],
      rules: {
        name: [
          { required: true, message: '请输入标准字段(必填)', trigger: 'blur' }
        ],
        text: [
          { required: true, message: '请输入提取字段(必填)', trigger: 'blur' }
        ],
      },
      tableData: [],
      readyDeleteItem: null,
      deleteFiledId: null
    };
  },
  methods: {
    toggleFiledList() {
      this.isShowFiledList = !this.isShowFiledList;
    },
    removeItem(item) {
      this.delDialogVisiable  = true;
      this.readyDeleteItem = item;
      if (item.id) {
        this.deleteFiledId = item.id;
      }
    },
    handleDeleteClick() {
      const index = this.filedList.indexOf(this.readyDeleteItem);
      if (index !== -1 && this.deleteFiledId) {
        this.deleteTemplateField(this.deleteFiledId);
      } else {
        this.filedList.splice(index, 1);
        this.delDialogVisiable = false;
      }
    },
    addNewFiled() {
      if (this.filedList.length < 15) {
        this.dialogFormVisible = true;
      }
    },
    cancleEditFileds() {
      this.fetchTemplateFileds();
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
          standardName: '',
          editName: '',
          businessTypeId: 1,
          standardType: 1,
          createUserId: 1,
          status: 1
        }
      });
    },
    handleUpdateFiledsClick() {
      this.updateTemplateFileds(this.filedList);
    },
    onHistoryPageNumChange(res) {
      this.pageSize = res.pageSize;
      this.currentPage = res.pageNum;
      this.fetchHistoryList();
    },
    fetchHistoryList() {
      const params = {
        businessTypeId: 1,
        pageSize: this.pageSize,
        pageNum: this.currentPage,
        type: 1,
        userId: 1
      }
      getUploadHistory(params)
      .then((res) => {
        this.tableData = res.data.data;
        this.totalCount = res.data.total;
      })
    },
    fetchTemplateFileds() {
      this.filedList = [];
      this.isLoading = true;
      getOcrExtractTemplateFields(1, 1, '')
      .then((res) => {
        this.filedList = res.data;
        this.isLoading = false;
      });
    },
    updateTemplateFileds(data) {
      updateOcrExtractTemplateFields(data)
      .then(() => {
        this.fetchTemplateFileds();
      })
    },
    deleteTemplateField(id) {
      deleteTemplateField(id)
      .then(() => {
        this.delDialogVisiable  = false;
        this.fetchTemplateFileds();
        this.$message({
          message: '删除字段成功',
          type: 'success'
        });
      }, () => {
        this.$message({
          message: '删除字段失败',
          type: 'warning'
        });
      })
    }
  },
  mounted() {
    this.fetchTemplateFileds();
    this.fetchHistoryList();
  },
  components: {
    BreadCrumb,
    FileUpload,
    Pagination
  }
}
</script>
<style lang="scss" scoped>
@import '@/scss/mixin.scss';

.real-estate-upload {
  display: flex;
  flex-direction: column;
  padding-bottom: 200px;
  .bread-crumb {
    background-color: #ffffff;
    padding: 14px 20px 30px 20px;
  }
  .upload-main {
    padding: 20px 30px 0  30px;
    margin-top: 20px;
    background-color: #ffffff;
    .file-upload-box {
      margin-bottom: 40px;
    }
    .filed-edit {
      padding-bottom: 60px;
      border-top: 1px solid #ebebeb;
      .title {
        margin: 30px 0 10px;
        font-size: 18px;
        font-weight: bold;
        color: #9A8B7B;
      }
      .add-filed-btn {
        /deep/ {
          .el-button {
            @include buttonStyle;
            padding: 10px  36px;
            margin: 0 0 20px 0;
          }
        }
      }
      .collapse {
        height: 60px;
        padding: 20px 0;
        text-align: center;
        background: #FAFAFA;
        border-radius: 4px;
        font-size: 14px;
        color: #4A90E2;
        cursor: pointer;
        &.down {
          .collapse-icon {
            width: 28px;
            height: 28px;
            margin: 10px auto;
            background: url('../../../assets/imgs/arrow-down.png') no-repeat;
            background-size: cover;
          }
        }
        &.up {
          .collapse-icon {
            width: 28px;
            height: 28px;
            margin: 10px auto;
            background: url('../../../assets/imgs/arrow-up.png') no-repeat;
            background-size: cover;
          }
        }
      }
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
              &.filed-edit-name {
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
        &.add-filed-disabled {
          cursor: not-allowed;
          &:hover {
            border-color: #666666;
            color: #666666;
          }
        }
      }
      .filed-option {
        display: flex;
        padding-top: 30px;
        margin: 40px 0;
        justify-content: flex-end;
        border-top: 1px solid #EBEBEB;
        .submit-btn {
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
    .upload-history {
      border-top: 1px solid #ebebeb;
      .title {
        margin: 30px 0 10px;
        font-size: 18px;
        font-weight: bold;
        color: #9A8B7B;
      }
      .history-pagination {
        padding: 10px 0 50px;
      }
    }
  }
  .real-estate-upload-footer {
    position: fixed;
    bottom: 0;
    left: 236px;
    width: calc(100vw - 236px);
    padding: 24px  0;
    background-color: #ffffff;
    text-align: right;
    z-index: 999;
    /deep/ {
      .el-button {
        &.return-back {
          @include cancleBtnStyle;
          margin: 0;
        }
        &.start-identify {
          @include buttonStyle;
          margin: 0 110px 0 30px;
        }
      }
    }
  }
  .dialog-form {
    .cancle-btn {
      width: 136px;
      height: 40px;
      @include cancleBtnStyle;
      margin: 0 10px;
    }
    .submit-btn {
      width: 136px;
      height: 40px;
      @include buttonStyle;
      margin: 0 10px;
    }
    .goon-btn {
      width: 136px;
      height: 40px;
      @include buttonStyle;
      margin: 0 10px;
    }
  }
}
</style>
