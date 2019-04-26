<template>
  <el-menu
    :default-active="activeMenu"
    background-color="#333333"
    :router="userRouter"
    :unique-opened="uniqueOpened"
    text-color="rgba(255,255,255,0.60)"
    active-text-color="#ffffff"
    class="el-menu-vertical-demo">
    <div class="level-one" v-for="(item, index) in menuList" :key="index">
      <el-submenu v-if="item.children.length" :index="item.index">
        <span slot="title">{{item.name}}</span>
        <div class="level-two" v-for="(child, idx) in item.children" :key="idx">
          <el-submenu v-if="child.children.length" :index="child.index">
            <template slot="title">{{child.name}}</template>
            <el-menu-item v-for="(item, index) in child.children" :key="index" :index="item.index">{{item.name}}</el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="child.index">{{child.name}}</el-menu-item>
        </div>
      </el-submenu>
      <el-menu-item v-else :index="item.index">
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </div>
  </el-menu>
</template>
<script>
export default {
  data() {
    return {
      activeMenu: '',
      uniqueOpened: true,
      userRouter: true,
      menuList:[
        {
          name: '首页',
          index: 'index',
          children: []
        },
        {
          name: '承兑业务单据',
          index: '2',
          children: []
        },
        {
          name: '地产项目承兑',
          index: 'realEstate',
          children: [
            {
              name: '文件上传',
              index: 'realEstateUpload',
              children: []
            },
            {
              name: '识别结果',
              index: 'realEstateIdentifyResult',
              children: []
            }
          ]
        },
        {
          name: '征信查询授权书',
          index: 'credit',
          children: [
            {
              name: '文件上传',
              index: 'creditUpload',
              children: []
            },
            {
              name: '文件补录',
              index: 'creditReupload',
              children: []
            },
            {
              name: '识别结果',
              index: 'creditIdentifyResult',
              children: [
                {
                  name: '电子版批次信息',
                  index: 'creditElectronicBatchInformation'
                },
                {
                  name: '纸质版批次信息',
                  index: 'creditPaperBatchInformation'
                }
              ]
            }
          ]
        },
        {
          name: '用户管理',
          index: 'userManagement',
          children: []
        },
      ]
    };
  },
  watch: {
    'this.$route.name'(newval) {
      console.log(newval);
      this.activeMenu = newval;
    }
  },
  mounted() {
    this.activeMenu = this.$route.name;
  }
}
</script>
<style lang="scss">
.el-menu {
  font-size: 14px;
  border-right: none;
  .level-one {
    .el-submenu {
      >.el-submenu__title {
        height: 36px !important;
        line-height: 36px !important;
        padding-left: 60px !important;
        text-align: left;
      }
      >.el-menu--inline {
        >.el-menu-item {
          height: 36px !important;
          line-height: 36px !important;
          padding-left: 100px !important;
          text-align: left;
          &.is-active {
            background: #C1B071 !important;
            color: #ffffff !important;
          }
        }
        .level-two {
          .el-submenu {
            .el-submenu__title {
              color: rgba(255, 255, 255, 0.6) !important;
              background-color: rgb(51, 51, 51) !important;
            }
            &.is-opened {
              .el-submenu__title {
                color: #C1B071 !important;
              }
              .el-menu--inline {
                >.el-menu-item {
                  &.is-active {
                    background: #C1B071 !important;
                    color: #ffffff !important;
                  }
                }
              }
            }
          }
        }
      }
      &.is-opened {
        .el-submenu__title {
          color: #C1B071 !important;
        }
        .el-menu--inline {
          >.el-menu-item {
            &.is-active {
              background: #C1B071 !important;
              color: #ffffff !important;
            }
          }
        }
      }
    }
  }
  
  .el-menu-item {
    height: 36px !important;
    line-height: 36px !important;
    padding-left: 60px !important;
    text-align: left;
    &.is-active {
      background: #C1B071 !important;
      color: #ffffff !important;
    }
  }
}
</style>

