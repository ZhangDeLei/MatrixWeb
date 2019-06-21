<template>
  <el-container>
    <el-header height="50px">
      <img class="logo cv" src="../assets/img/img-01.png"/>
      <label class="title cv">{{systemName}}</label>
      <div class="user cv">
        <i class="el-icon-search"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <i class="el-icon-bell"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <i class="el-icon-s-custom"></i>
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
