<template>
  <div class="content-panel">
    <div class="search">
      <div class="item">
        <div class="label">其他选项：</div>
        <div class="sw">
          <label>编号：</label>
          <el-input size="mini" style="width: 200px" placeholder="不限" v-model="searchForm.Id"></el-input>
          <label>部署地址：</label>
          <el-input size="mini" style="width: 200px" placeholder="不限" v-model="searchForm.IpAddress"></el-input>
          <label style="margin-left: 20px">备用地址：</label>
          <el-input size="mini" style="width: 200px" placeholder="不限" v-model="searchForm.IpBackup"></el-input>
          <el-button size="mini" type="primary" @click="getData(1)">查询</el-button>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="tip">
        系统管理
        <el-button size="mini" @click="openSystemDialog({})">新增系统</el-button>
      </div>
      <div class="list-table">
        <el-table
          :header-cell-style="{background:'#F0F0F0',color:'black',padding:'8px 0px',fontWeight:'100',borderBottom:'solid 2px #e2e2e2',fontWeight:'800',fontSize:'12px'}"
          :cell-style="{color:'black',paddingTop:'0px',paddingBottom:'0px',fontWeight:'500',fontSize:'12px'}"
          :data="list.list">
          <el-table-column label="编号" prop="Id"></el-table-column>
          <el-table-column label="名称" prop="Name"></el-table-column>
          <el-table-column label="描述" prop="Notes"></el-table-column>
          <el-table-column label="部署地址" prop="IpAddress"></el-table-column>
          <el-table-column label="备用地址" prop="IpBackup"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="openSystemDialog(scope.row)">编辑</el-button>
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
    <!--系统编辑-->
    <el-dialog title="系统编辑" :visible.sync="showSystemEditDialog">
      <el-form ref="systemForm" :model="systemForm" :rules="rules" label-width="100px">
        <el-form-item label="编号" prop="Id">
          <el-input placeholder="请输入编号" v-model="systemForm.Id"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="Name">
          <el-input placeholder="请输入名称" v-model="systemForm.Name"></el-input>
        </el-form-item>
        <el-form-item label="部署地址" prop="IpAddress">
          <el-input placeholder="请输入部署地址" v-model="systemForm.IpAddress"></el-input>
        </el-form-item>
        <el-form-item label="备用地址" prop="IpBackup">
          <el-input placeholder="请输入备用地址" v-model="systemForm.IpBackup"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="Notes">
          <el-input placeholder="请输入描述" v-model="systemForm.Notes"></el-input>
        </el-form-item>
      </el-form>
      <el-button size="mini" @click="openSystemDialog({})">取消</el-button>
      <el-button size="mini" @click="confirm" type="primary">保存</el-button>
    </el-dialog>
  </div>
</template>

<script src="../../assets/js/platform/ptsystem.js"></script>

<style scoped>
  @import "../../assets/css/platform/common.css";
  @import "../../assets/css/platform/ptsystem.css";
</style>
