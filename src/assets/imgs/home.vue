<style lang="less">
  @import "./home.less";
</style>
<template>
  <div id="homenew-page">
    <div class="homenew-login">
      {{userName}}, 欢迎登录外贸信托铁幕真系统!
    </div>
    <div class="homenew-text">
      <div class="homenew-text-ttt">
        <img class="homenew-img" src="../../../assets/images/zlsc.png"/>
        <div class="homenew-title">资产资料上传</div>
        <div class="homenew-text-tent">已上传资料 <span style="color: blue">{{uploadCount == null ?  0 : uploadCount.zc == null || uploadCount.zc == 'null' ? 0 : uploadCount.zc}} </span>份。
        </div>
        <div class="homenew-btn" @click="handleUpload">去上传</div>
      </div>

      <div class="homenew-text-ttt">
        <img class="homenew-img" src="../../../assets/images/lssc.png"/>
        <div class="homenew-title">回款流水上传</div>
        <div class="homenew-text-tent">已上传资料 <span style="color: blue">{{uploadCount == null ? 0 : uploadCount.ls == null || uploadCount.ls == 'null' ? 0 : uploadCount.ls}} </span>份。
        </div>
        <div class="homenew-btn" @click="handleUpload">去上传</div>
      </div>

      <div class="homenew-text-ttt">
        <img class="homenew-img" src="../../../assets/images/zcxz.png"/>
        <div class="homenew-title">资产比对结果下载</div>
        <div class="homenew-text-tent">已比对完成资料 <span style="color: blue">{{downloadCount == null ? 0 : downloadCount.zc == null || downloadCount.zc == 'null' ? 0 : downloadCount.zc}} </span>份。
        </div>
        <div class="homenew-btn" @click="handleHomeComparisonDown">去下载</div>
      </div>

      <div class="homenew-text-ttt">
        <img class="homenew-img" src="../../../assets/images/lsxz.png"/>
        <span class="homenew-title">回款流水比对结果下载</span>
        <div class="homenew-text-tent">已比对完成回款流水 <span style="color: blue">{{downloadCount == null ? 0 : downloadCount.ls == null || downloadCount.ls == 'null' ? 0 : downloadCount.ls}} </span>份。
        </div>
        <div class="homenew-btn" @click="handleHomeFlowingDown">去下载</div>
      </div>
    </div>

    <div class="warning-text">
      <div class="zcwarning">
        <div class="zctitle">资产到期预警</div>
        <!--allarmStatus  1 预警状态   2  回款失效    3 过期失效 4 手动取消预警 -->
        <div v-if="warnigInfo.asset_warning.length > 0">
          <div class="zcwarninglist" v-for="(item, index) in warnigInfo.asset_warning" :key="index" @click="itemClick(item.relatedProjectRecordId)">
            <img v-if="item.allarmStatus == '1' && item.expireDays <= 5" class="warning-img"
                 src="../../../assets/images/warning1.png"/>
            <img v-else-if="item.allarmStatus == '1' && item.expireDays <= 10" class="warning-img"
                 src="../../../assets/images/warning2.png"/>
            <img v-else-if="item.allarmStatus == '1' && item.expireDays > 10" class="warning-img"
                 src="../../../assets/images/warning3.png"/>
            <img v-else-if="item.allarmStatus == '2'" class="warning-img"
                 src="../../../assets/images/no_warning.png"/>
            <img v-else-if="item.allarmStatus == '3'" class="warning-img"
                 src="../../../assets/images/warnig_shixiao.png"/>
            <img v-else-if="item.allarmStatus == '4'" class="warning-img"
                 src="../../../assets/images/warnig_shixiao.png"/>
            <div class="list-content" v-if="item.allarmStatus == '1'">
              信托计划{{item.foticName}}{{item.uploadDate}}批次共计{{item.totalCount}}笔资产将于{{item.expireDays}}天后到期，请注意！
            </div>
            <div class="list-content" v-if="item.allarmStatus == '2'">
              信托计划{{item.foticName}}{{item.uploadDate}}批次截止目前共计{{item.totalCount}}笔资产完成回款，预警解除！！
            </div>
            <div class="list-content" v-if="item.allarmStatus == '3'">
              信托计划{{item.foticName}}{{item.uploadDate}}批次截止目前共计{{item.totalCount}}笔资产未完成回款，资产失效！
            </div>
            <div class="list-content" v-if="item.allarmStatus == '4'">
              信托计划{{item.foticName}}{{item.uploadDate}}批次截止目前共计{{item.totalCount}}笔资产于{{item.udpTime}}日手动解除预警。
            </div>
            <div class="list-time">{{item.crtTime}}</div>
          </div>

          <div style="display: flex; justify-content: center">
            <div class="morelistbtn" @click="handleMoreMsg(1)">查看更多</div>
          </div>
        </div>

        <div style="height: 228px; display: flex; justify-content: center;align-items: center" v-else>
          <img style="width: 57px; height: 66px" src="../../../assets/images/warningno.png"/>
        </div>
      </div>

      <div class="billwarning">
        <div class="billtitle">备案登记到期预警</div>
        <!-- allarmStatus  1 预警状态   2  回款失效    3 过期失效 4 手动取消预警-->
        <div v-if="warnigInfo.record_warning.length > 0">
          <div class="billwarninglist" v-for="(item, index) in warnigInfo.record_warning" :key="index" @click="itemClick(item.relatedProjectRecordId)">
            <img v-if="item.allarmStatus == '1' && item.expireDays <= 5" class="warning-img"
                 src="../../../assets/images/warning1.png"/>
            <img v-else-if="item.allarmStatus == '1' && item.expireDays <= 10" class="warning-img"
                 src="../../../assets/images/warning2.png"/>
            <img v-else-if="item.allarmStatus == '1' && item.expireDays > 10" class="warning-img"
                 src="../../../assets/images/warning3.png"/>
            <img v-else-if="item.allarmStatus == '2'" class="warning-img"
                 src="../../../assets/images/no_warning.png"/>
            <img v-else-if="item.allarmStatus == '3'" class="warning-img"
                 src="../../../assets/images/warnig_shixiao.png"/>
            <img v-else-if="item.allarmStatus == '4'" class="warning-img"
                 src="../../../assets/images/warnig_shixiao.png"/>
            <div class="list-content" v-if="item.allarmStatus =='1' ">
              信托计划{{item.foticName}}{{item.uploadDate}}批次共计{{item.totalCount}}笔资产将于{{item.expireDays}}天后到期，请注意！
            </div>
            <div class="list-content" v-if="item.allarmStatus =='2' ">
              信托计划{{item.foticName}}{{item.uploadDate}}批次截止目前共计{{item.totalCount}}笔资产完成备案登记的补录，预警解除！
            </div>
            <div class="list-content" v-if="item.allarmStatus =='3' ">
              信托计划{{item.foticName}}{{item.uploadDate}}批次截止目前共计{{item.totalCount}}笔资产未完成备案登记的补录，资产失效！
            </div>
            <div class="list-content" v-if="item.allarmStatus =='4' ">
              信托计划{{item.foticName}}{{item.uploadDate}}批次截止目前共计{{item.totalCount}}笔资产于{{item.udpTime}}日手动解除预警。
            </div>
            <div class="list-time">{{item.crtTime}}</div>
          </div>

          <div style="display: flex; justify-content: center">
            <div class="morelistbtn" @click="handleMoreMsg(2)">查看更多</div>
          </div>
        </div>

        <div style="height: 228px; display: flex; justify-content: center;align-items: center" v-else>
          <img style="width: 57px; height: 66px" src="../../../assets/images/warningno.png"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'home',
    data() {
      return {
        userName: '',
      }
    },
    computed: {
      ...mapState({
        uploadCount: state => state.homeNew.uploadCount,
        downloadCount: state => state.homeNew.downloadCount,
        warnigInfo: state => state.homeNew.warnigInfo
      })
    },
    mounted() {
      this.userName = localStorage.getItem('userRole')
      this.getHomeUploadCount({relatedUserId: localStorage.getItem('userId')}).then(res => {

      }).catch(() => {
      })
      this.getHomeDownloadCount({relatedUserId: localStorage.getItem('userId')}).then(res => {

      }).catch(() => {
      })
      this.getWarnigInfo({relatedUserId: localStorage.getItem('userId')}).then(res => {

      }).catch(() => {
      })
    },
    methods: {
      ...mapActions([
        'getHomeUploadCount',
        'getHomeDownloadCount',
        'getWarnigInfo'
      ]),

      itemClick(relatedProjectRecordId){
        this.$router.push({path: 'comparison_result_page/batch-detail/batch_detail_page', query: {id: relatedProjectRecordId}})
      },
      handleMoreMsg(type) {
        this.$router.push({path: '/msg', query: {type: type}})
      },

      handleUpload() {
        this.$router.push({path: '/fileUploads', query: {activeName: 'second'}})
      },

      handleHomeComparisonDown() {
        this.$router.push({path: '/comparison_result_page'})
      },

      handleHomeFlowingDown() {
        this.$router.push({path: '/payback_runingwater_page'})
      }
    }
  }
</script>
