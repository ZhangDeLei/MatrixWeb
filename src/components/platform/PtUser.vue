<template>
  <div class="content-panel">
    <div class="search">
      <div class="item">
        <el-form size="mini" :inline="true" label-width="100px">
          <el-form-item label="编号">
            <el-input placeholder="编号" style="width:150px" v-model="searchForm.Id"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input placeholder="用户名" style="width:150px" v-model="searchForm.UserName"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input placeholder="昵称" style="width:150px" v-model="searchForm.NickName"></el-input>
          </el-form-item>
          <el-form-item label="用户组">
            <el-cascader
              style="width:150px"
              v-model="searchForm.UserGroupId"
              :options="groupList"
              :props="{ expandTrigger: 'hover' ,label:'Name',value:'Id',checkStrictly: true}"></el-cascader>
          </el-form-item>
          <el-form-item label="状态">
            <el-select placeholder="状态" v-model="searchForm.State" clearable style="width:150px">
              <el-option label="可用" value="true"></el-option>
              <el-option label="不可用" value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="来源系统">
            <el-select placeholder="来源系统" style="width:150px" v-model="searchForm.SystemId" clearable>
              <el-option v-for="item in systemList" :value="item.Id" :label="item.Name" :key="item.Id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机">
            <el-input placeholder="手机" style="width:150px" v-model="searchForm.Tel"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input placeholder="真实姓名" style="width:150px" v-model="searchForm.RealName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getData(1)">查询</el-button>
          </el-form-item>
        </el-form>
        <el-form size="mini" :inline="true" label-width="100px">
          <el-form-item label="注册时间">
            <el-date-picker
              v-model="begEndDate"
              type="daterange"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="地址">
            <el-input placeholder="地址" style="width:400px" v-model="searchForm.Address"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input placeholder="邮箱" style="width:150px" v-model="searchForm.Email"></el-input>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input placeholder="证件号码" style="width:150px" v-model="searchForm.IdNumber"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="list">
      <div class="tip">
        用户管理
        <el-button size="mini" @click="openUserDialog({})">新增用户</el-button>
      </div>
      <div class="list-table">
        <el-table
          :header-cell-style="{background:'#F0F0F0',color:'black',padding:'8px 0px',fontWeight:'100',borderBottom:'solid 2px #e2e2e2',fontWeight:'800',fontSize:'12px'}"
          :cell-style="{color:'black',paddingTop:'0px',paddingBottom:'0px',fontWeight:'500',fontSize:'12px'}"
          :data="list.list"
          v-loading="loading">
          <el-table-column label="头像">
            <template slot-scope="scope">
              <img src="" style="height: 30px;width: 30px;border-radius: 30px;background-color: gray"/>
            </template>
          </el-table-column>
          <el-table-column label="编号" prop="Id"></el-table-column>
          <el-table-column label="用户名" prop="UserName"></el-table-column>
          <el-table-column label="昵称" prop="NickName"></el-table-column>
          <el-table-column label="手机" prop="Tel"></el-table-column>
          <el-table-column label="区域" prop="Country"></el-table-column>
          <el-table-column label="真实姓名" prop="RealName"></el-table-column>
          <el-table-column label="分组" prop="UserGroupName"></el-table-column>
          <el-table-column label="来源" prop="SystemName"></el-table-column>
          <el-table-column label="账户余额" prop="Balance"></el-table-column>
          <el-table-column label="操作" width="160px">
            <template slot-scope="scope">
              <el-button type="text" @click="openUserDialog(scope.row)">详细</el-button>
              <el-button type="text" @click="openPowerDialog(scope.row)">权限管理</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          @size-change="getData"
          @current-change="getData"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="list.RecordCount">
        </el-pagination>
      </div>
    </div>
    <!--权限管理-->
    <el-dialog title="权限管理" :visible.sync="showPowerDialog">
      <el-select placeholder="请选择来源系统" style="margin-bottom: 10px" @change="handlerChangePower" v-model="systemId">
        <el-option v-for="item in systemList" :label="item.Name" :value="item.Id" :key="item.Id"></el-option>
      </el-select>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="角色" name="first">
          <el-transfer v-model="checkRoleData" :data="roleData" :titles="['角色列表','已选角色']"
                       @change="handlerRoleChange"></el-transfer>
        </el-tab-pane>
        <el-tab-pane label="角色组" name="second">
          <el-transfer v-model="checkRoleGroupData" :data="roleGroupData" :titles="['角色组列表','已选角色组']"></el-transfer>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <!--用户编辑-->
    <el-dialog :visible.sync="showEditUserDialog" width="80%">
      <div class="user-content">
        <div class="base">
          <el-row>
            <el-col :span="12">
              <div class="tip">基本信息</div>
              <el-form ref="userForm" :model="userForm" label-width="100px" size="mini" :rules="rules">
                <el-form-item label="用户名" prop="UserName">
                  <el-input v-model="userForm.UserName"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="NickName">
                  <el-input v-model="userForm.NickName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="Password">
                  <el-input v-model="userForm.Password"></el-input>
                </el-form-item>
                <el-form-item label="用户组" prop="UserGroupId">
                  <el-cascader
                    v-model="userForm.UserGroupId"
                    :options="groupList"
                    :props="{ expandTrigger: 'hover' ,label:'Name',value:'Id',checkStrictly: true}"
                    @change="handleUserGroupChange"></el-cascader>
                </el-form-item>
                <el-form-item label="来源系统" prop="SystemId">
                  <el-select placeholder="请选择来源系统" v-model="userForm.SystemId" @change="handlerChangeSystem">
                    <el-option v-for="item in systemList" :label="item.Name" :value="item.Id"
                               :key="item.Id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="State">
                  <el-switch v-model="userForm.State"></el-switch>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="12">
              <div class="headpic">
                <div><img src=""/></div>
                <el-button>点击上传</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="other">
          <el-row>
            <el-col :span="12">
              <div class="tip">详细信息</div>
              <el-form ref="userForm" :model="userForm" label-width="100px" size="mini">
                <el-form-item label="性别">
                  <el-radio-group v-model="userForm.Sex">
                    <el-radio label="男士">男士</el-radio>
                    <el-radio label="女士">女士</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="出生年月">
                  <el-date-picker
                    v-model="userForm.Birth"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="手机">
                  <el-input type="手机" v-model="userForm.Tel"></el-input>
                </el-form-item>
                <el-form-item
                  label="邮箱"
                  prop="Email"
                  :rules="[{ type: 'Email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
                  <el-input v-model="userForm.Email"></el-input>
                </el-form-item>
                <el-form-item label="区域">
                  <el-select v-model="userForm.Country" placeholder="国家" style="width:30%">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                  <el-select v-model="userForm.Province" placeholder="省" style="width:30%">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                  <el-select v-model="userForm.City" placeholder="市" style="width:30%">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="详细地址">
                  <el-input v-model="userForm.Address"></el-input>
                </el-form-item>
                <el-form-item label="邮编">
                  <el-input v-model="userForm.ZipCode"></el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="12">
              <div class="tip">认证信息</div>
              <el-form ref="userForm" :model="userForm" label-width="110px" size="mini">
                <el-form-item label="真实姓名">
                  <el-input v-model="userForm.RealName"></el-input>
                </el-form-item>
                <el-form-item label="证件类型">
                  <el-select v-model="userForm.IdType" placeholder="证件类型">
                    <el-option label="身份证" value="身份证"></el-option>
                    <el-option label="学生证" value="学生证"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="证件号码">
                  <el-input v-model="userForm.IdNumber"></el-input>
                </el-form-item>
                <el-form-item label="支付宝账号">
                  <el-input v-model="userForm.AlipayAccount"></el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-button type="primary" size="mini" @click="confirm">保存</el-button>
      <el-button type="danger" size="mini" @click="deleteRow">删除</el-button>
      <el-button size="mini" @click="openUserDialog({})">返回</el-button>
    </el-dialog>
  </div>
</template>

<script src="../../assets/js/platform/ptuser.js"></script>

<style scoped>
  @import "../../assets/css/platform/common.css";
  @import "../../assets/css/platform/ptuser.css";
</style>
