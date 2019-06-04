<template>
  <el-menu
    :default-active="activeMenu"
    :router="userRouter"
    :unique-opened="uniqueOpened"
    text-color="rgba(255,255,255,0.60)"
    active-text-color="#ffffff"
    class="el-menu-vertical-demo">
    <div class="level-one" v-for="(item, index) in menuList" :key="index">
      <el-submenu v-if="item.children.length" :index="item.index">
        <span slot="title">{{item.name}}</span>
        <div class="level-two" v-for="(child, idx) in item.children" :key="idx">
          <el-submenu  v-if="child.children.length" :index="child.index">
            <template slot="title">{{child.name}}</template>
            <el-menu-item v-for="(item, index) in child.children" :key="index" :index="item.index">
              {{item.name}}
            </el-menu-item>
          </el-submenu>
          <el-menu-item :disabled="child.index === '/creditReupload'" v-else :index="child.index">
            {{child.name}}
          </el-menu-item>
        </div>
      </el-submenu>
      <el-menu-item  :disabled="item.index === '2'" v-else :index="item.index">
        {{item.name}}
      </el-menu-item>
    </div>
  </el-menu>
</template>
<script>
import totalMenu from '@/helpers/roleMenu';
import LocalStorageHelper from '@/helpers/localStorageHelper';
export default {
  data() {
    return {
      activeMenu: '/',
      uniqueOpened: true,
      userRouter: true,
      menuList: []
    };
  },
  watch:{
    $route(to){
      this.activeMenu = `/${to.path.split('/')[1]}`;
    }
  },
  mounted() {
    const roleId = Number(LocalStorageHelper.getItem('ROLE_ID'));
    const roleList = JSON.parse(LocalStorageHelper.getItem('ROLE_LIST'));
    const formatRoleList = roleList.map(item => item.aclName);
    if(roleId === 1) {
      this.menuList = totalMenu;
    } else {
      if (formatRoleList.indexOf('地产承兑') > -1 && formatRoleList.indexOf('征信查询') > -1) {
        this.menuList = totalMenu.filter(item => item.name !== '用户管理');
      } else if (formatRoleList.indexOf('地产承兑') > -1 && formatRoleList.indexOf('征信查询') < 0) {
        this.menuList = totalMenu.filter(item => item.name !== '用户管理' && item.name !== '征信查询授权书');
      } else if (formatRoleList.indexOf('地产承兑') < 0 && formatRoleList.indexOf('征信查询') > -1) {
        this.menuList = totalMenu.filter(item => item.name !== '用户管理' && item.name !== '地产项目承兑');
      } else {
        this.menuList = totalMenu.filter(item => item.name !== '用户管理' && item.name !== '地产项目承兑' && item.name !== '征信查询授权书');
      }
    }
    this.activeMenu = `/${this.$route.path.split('/')[1]}`;
  }
}
</script>
<style lang="scss">
.el-menu {
  font-size: 14px;
  border-right: none;
  background-color: #0F1322;
  .level-one {
    .el-submenu {
      >.el-submenu__title {
        height: 36px !important;
        line-height: 36px !important;
        padding-left: 60px !important;
        text-align: left;
        &:hover {
          background-color: #121213;
        }
      }
      >.el-menu--inline {
        >.el-menu-item {
          height: 36px !important;
          line-height: 36px !important;
          padding-left: 100px !important;
          text-align: left;
          &.is-active {
            background: #094D84 !important;
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
                color: #ffffff !important;
              }
              .el-menu--inline {
                >.el-menu-item {
                  &.is-active {
                    background: #094D84 !important;
                    color: #ffffff !important;
                  }
                }
              }
            }
          }
        }
      }
      &.is-opened {
        background-color: #121213 !important; 
        .el-submenu__title {
          color: #ffffff !important;
        }
        .el-menu--inline {
          background-color: #121213 !important;
          >.el-menu-item {
            &.is-active {
              background: #094D84 !important;
              color: #ffffff !important;
            }
          }
        }
        .level-two {
          .el-submenu {
            .el-submenu__title {
              background-color: #121213 !important;
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
      background: #094D84 !important;
      color: #ffffff !important;
    }
    &:hover {
      background-color: #121213;
    }
  }
}
</style>

