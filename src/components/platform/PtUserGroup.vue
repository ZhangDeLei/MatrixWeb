<template>
  <div class="content-panel">
    <div class="search">
      <div class="item">
        <div class="label">其他选项：</div>
        <div class="sw">
          <label>编号：</label>
          <el-input size="mini" style="width: 200px" placeholder="不限" v-model="searchForm.Id"></el-input>
          <label style="margin-left: 20px">父级：</label>
          <el-select size="mini" placeholder="父级" style="width:200px" v-model="searchForm.ParentId" clearable>
            <el-option v-for="item in allList" :value="item.Id" :label="item.Name" :key="item.Id"></el-option>
          </el-select>
          <el-button size="mini" type="primary" @click="getData(1)">查询</el-button>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="tip">
        用户组管理
        <el-button size="mini" @click="openEditDialog({})">新增用户组</el-button>
      </div>
      <div class="list-table">
        <el-table
          :header-cell-style="{background:'#F0F0F0',color:'black',padding:'8px 0px',fontWeight:'100',borderBottom:'solid 2px #e2e2e2',fontWeight:'800',fontSize:'12px'}"
          :cell-style="{color:'black',paddingTop:'0px',paddingBottom:'0px',fontWeight:'500',fontSize:'12px'}"
          :data="list.list"
          v-loading="loading">
          <el-table-column label="编号" prop="Id"></el-table-column>
          <el-table-column label="名称" prop="Name"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.State" disabled></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="openEditDialog(scope.row)">编辑</el-button>
              <el-button type="text" @click="deleteRow(scope.row.Id)">删除</el-button>
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
    <!--用户组编辑弹框-->
    <el-dialog title="用户组编辑" :visible.sync="showEditDialog">
      <el-form size="mini" label-width="100px" :model="userGroupForm" ref="userGroupForm">
        <el-form-item label="名称" prop="Name">
          <el-input placeholder="用户组名称" v-model="userGroupForm.Name"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="userGroupForm.State"/>
        </el-form-item>
        <el-form-item label="父级用户组">
          <el-select size="mini" placeholder="请选择父级用户组" style="width:200px" v-model="userGroupForm.ParentId" clearable>
            <el-option v-for="item in allList" :value="item.Id" :label="item.Name" :key="item.Id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button size="mini" @click="openEditDialog({})">取消</el-button>
      <el-button size="mini" type="primary" @click="confirm">保存</el-button>
    </el-dialog>
  </div>
</template>

<script src="../../assets/js/platform/ptusergroup.js"></script>

<style scoped>
  @import "../../assets/css/platform/common.css";
  @import "../../assets/css/platform/ptusergroup.css";
</style>
