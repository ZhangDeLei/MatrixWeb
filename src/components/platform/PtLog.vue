<template>
  <div class="content-panel">
    <div class="search">
      <div class="item">
        <el-form size="mini" :inline="true" label-width="80px">
          <el-form-item label="编号">
            <el-input placeholder="编号" style="width:200px" v-model="searchForm.Id"></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-select placeholder="分类" v-model="searchForm.LogTypeId" clearable>
              <el-option value="重置密码" label="重置密码"></el-option>
              <el-option value="群发通知" label="群发通知"></el-option>
              <el-option value="系统异常" label="系统异常"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容">
            <el-input placeholder="内容" v-model="searchForm.Content"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getData(1)">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="list">
      <div class="tip">
        日志查看
      </div>
      <div class="list-table">
        <el-table
          :header-cell-style="{background:'#F0F0F0',color:'black',padding:'8px 0px',fontWeight:'100',borderBottom:'solid 2px #e2e2e2',fontWeight:'800',fontSize:'12px'}"
          :cell-style="{color:'black',paddingTop:'0px',paddingBottom:'0px',fontWeight:'500',fontSize:'12px'}"
          :data="list.list"
          v-loading="loading">
          <el-table-column label="创建时间" width="150px" prop="CreateTime"></el-table-column>
          <el-table-column label="编号" prop="Id"></el-table-column>
          <el-table-column label="类型" prop="LogTypeName"></el-table-column>
          <el-table-column label="内容" prop="Content"></el-table-column>
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
  </div>
</template>

<script src="../../assets/js/platform/ptlog.js"></script>

<style scoped>
  @import "../../assets/css/platform/common.css";
  @import "../../assets/css/platform/ptlog.css";
</style>
