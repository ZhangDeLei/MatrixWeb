<template>
  <div class="content-panel">
    <div class="search">
      <div class="item">
        <div class="label">其他选项：</div>
        <div class="sw">
          <label style="margin-left: 20px">编号：</label>
          <el-input size="mini" style="width: 200px" placeholder="不限" v-model="searchForm.Id"></el-input>
          <el-button size="mini" type="primary" @click="getData(1)">查询</el-button>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="tip">
        功能类型
        <el-button size="mini" @click="openFuncTypeDialog({})">新增功能类型</el-button>
      </div>
      <div class="list-table">
        <el-table
          :header-cell-style="{background:'#F0F0F0',color:'black',padding:'8px 0px',fontWeight:'100',borderBottom:'solid 2px #e2e2e2',fontWeight:'800',fontSize:'12px'}"
          :cell-style="{color:'black',paddingTop:'0px',paddingBottom:'0px',fontWeight:'500',fontSize:'12px'}"
          :data="list.list"
          v-loading="loading">
          <el-table-column label="编号" prop="Id"></el-table-column>
          <el-table-column label="名称" prop="Name"></el-table-column>
          <el-table-column label="操作" width="140px">
            <template slot-scope="scope">
              <el-button type="text" @click="openFuncTypeDialog(scope.row)">编辑</el-button>
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
    <!--编辑功能类型-->
    <el-dialog title="功能类型编辑" :visible.sync="showEditFuncTypeDialog">
      <el-form size="mini" :model="typeForm" :rules="rules" ref="typeForm" label-width="80px">
        <el-form-item label="编号" prop="Id">
          <el-input v-model="typeForm.Id" type="number" placeholder="请输入编号"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="Name">
          <el-input v-model="typeForm.Name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-button size="mini" @click="openFuncTypeDialog({})">取消</el-button>
        <el-button size="mini" @click="confirm()" type="primary">保存</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script src="../../assets/js/platform/ptfunctype.js"></script>

<style scoped>
  @import "../../assets/css/platform/common.css";
  @import "../../assets/css/platform/ptfunctype.css";
</style>
