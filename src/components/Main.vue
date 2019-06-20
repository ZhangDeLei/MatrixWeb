<template>
  <el-container>
    <el-header height="50px">
      <img class="logo cv" src="../assets/img/img-01.png"/>
      <label class="title cv">{{systemName}}</label>
      <div class="user cv">
        <i class="el-icon-search"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <i class="el-icon-bell"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <i class="el-icon-user-solid"></i>
        <el-dropdown @command="handlerUserDropdown">
          <span class="el-dropdown-link" style="color: white;">
            {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-switch-button" command="exit">退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container class="container">
      <el-aside width="200px">
        <el-menu
          :collapse="false"
          default-active="1"
          class="el-menu-vertical-demo">
          <!--<el-menu-item v-for="item in menuList" :index="item.Id" @click="gotoPage(item.Code)" :key="item.Id">-->
          <!--<i class="el-icon-menu"></i>-->
          <!--<span slot="title">{{item.Name}}</span>-->
          <!--</el-menu-item>-->
          <div v-for="item in menuList" :key="item.Id">
            <el-menu-item v-if="item.children.length===0" :index="item.Id" @click="gotoPage(item.Code)">
              <i class="el-icon-menu"></i>
              <span slot="title">{{item.Name}}</span>
            </el-menu-item>
            <el-submenu v-if="item.children.length>0" :index="item.Id">
              <template slot="title">
                <i :class="item.Icon"></i>
                <span>{{item.Name}}</span>
              </template>
              <el-menu-item v-for="ch in item.children" :key="ch.Id" :index="ch.Id" @click="gotoPage(ch.Code)">{{ch.Name}}</el-menu-item>
            </el-submenu>
          </div>
          <!--<el-submenu index="2">-->
          <!--<template slot="title">-->
          <!--<i class="el-icon-cpu"></i>-->
          <!--<span>耗材管理</span>-->
          <!--</template>-->
          <!--<el-menu-item index="2-1" @click="gotoPage('/con/list')">耗材列表</el-menu-item>-->
          <!--<el-menu-item index="2-2" @click="gotoPage('/con/collar')">耗材领用</el-menu-item>-->
          <!--<el-menu-item index="2-3" @click="gotoPage('/con/collar')">耗材类型</el-menu-item>-->
          <!--</el-submenu>-->
          <!--<el-submenu index="3">-->
          <!--<template slot="title">-->
          <!--<i class="el-icon-school"></i>-->
          <!--<span>课程培训</span>-->
          <!--</template>-->
          <!--<el-menu-item index="3-1" @click="gotoPage('/cur/list')">课程列表</el-menu-item>-->
          <!--<el-menu-item index="3-2" @click="gotoPage('/cur/detail')">课程详情</el-menu-item>-->
          <!--<el-menu-item index="3-3" @click="gotoPage('/cur/record')">培训记录</el-menu-item>-->
          <!--<el-menu-item index="3-4" @click="gotoPage('/cur/record')">课程类型</el-menu-item>-->
          <!--</el-submenu>-->
          <!--<el-submenu index="5">-->
          <!--<template slot="title">-->
          <!--<i class="el-icon-user"></i>-->
          <!--<span>用户管理</span>-->
          <!--</template>-->
          <!--<el-menu-item index="5-1" @click="gotoPage('/cur/list')">用户列表</el-menu-item>-->
          <!--<el-menu-item index="5-2" @click="gotoPage('/cur/detail')">用户级别管理</el-menu-item>-->
          <!--<el-menu-item index="5-3" @click="gotoPage('/cur/record')">用户充值记录</el-menu-item>-->
          <!--</el-submenu>-->
          <!--<el-submenu index="6">-->
          <!--<template slot="title">-->
          <!--<i class="el-icon-setting"></i>-->
          <!--<span>系统设置</span>-->
          <!--</template>-->
          <!--<el-menu-item index="6-1" @click="gotoPage('/cur/list')">机构列表</el-menu-item>-->
          <!--</el-submenu>-->
          <!--<el-submenu index="4">-->
          <!--<template slot="title">-->
          <!--<i class="el-icon-s-platform"></i>-->
          <!--<span>平台资源</span>-->
          <!--</template>-->
          <!--<el-menu-item-group title="用户管理">-->
          <!--<el-menu-item index="4-1" @click="gotoPage('/platform/ptuser')">用户列表</el-menu-item>-->
          <!--<el-menu-item index="4-2" @click="gotoPage('/platform/ptusergroup')">用户分组</el-menu-item>-->
          <!--</el-menu-item-group>-->
          <!--<el-menu-item-group title="角色管理">-->
          <!--<el-menu-item index="4-3" @click="gotoPage('/platform/ptrole')">角色列表</el-menu-item>-->
          <!--<el-menu-item index="4-4" @click="gotoPage('/platform/ptrolegroup')">角色分组</el-menu-item>-->
          <!--</el-menu-item-group>-->
          <!--<el-menu-item-group title="功能管理">-->
          <!--<el-menu-item index="4-5" @click="gotoPage('/platform/ptfunc')">功能列表</el-menu-item>-->
          <!--<el-menu-item index="4-6" @click="gotoPage('/platform/ptfunctype')">功能类型</el-menu-item>-->
          <!--</el-menu-item-group>-->
          <!--<el-menu-item-group title="系统管理">-->
          <!--<el-menu-item index="4-7" @click="gotoPage('/platform/ptsystem')">系统列表</el-menu-item>-->
          <!--<el-menu-item index="4-8" @click="gotoPage('/platform/ptlog')">日志管理</el-menu-item>-->
          <!--<el-menu-item index="4-9" @click="gotoPage('/platform/ptnotice')">通知管理</el-menu-item>-->
          <!--<el-menu-item index="4-10" @click="gotoPage('/platform/ptbill')">消费</el-menu-item>-->
          <!--</el-menu-item-group>-->
          <!--</el-submenu>-->
        </el-menu>
      </el-aside>
      <el-main>
        <div class="content">
          <router-view/>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script src="../assets/js/main.js"></script>

<style scoped>
  @import "../assets/css/common.css";

  .el-header {
    background-color: #409EFF;
  }

  .el-aside {
    height: 100%;
  }

  ::-webkit-scrollbar {
    width: 0px;
  }

  .el-main {
    background-color: #f2f2f2;
    color: #333;
    height: 100%;
  }

  .logo {
    width: 40px;
    height: 40px;
    float: left;
  }

  .title {
    color: black;
    float: left;
    left: 10px;
    color: white;
    font-weight: 600;
  }

  .user {
    float: right;
    color: white;
    font-weight: 400;
    font-size: 12px;
  }

  .content {
    width: 100%;
    height: 100%;
  }
</style>
