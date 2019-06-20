<template>
  <div class="content-panel">
    <div class="search">
      <div class="item">
        <el-form size="mini" :inline="true" label-width="80px">
          <el-form-item label="用户编号">
            <el-input placeholder="用户编号" style="width:200px" v-model="searchForm.UserId"></el-input>
          </el-form-item>
          <!--<el-form-item label="昵称">-->
            <!--<el-input placeholder="昵称" style="width:200px" v-model="searchForm.NickName"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="分组">-->
            <!--<el-cascader-->
              <!--clearable-->
              <!--:options="groupList"-->
              <!--:props="{ expandTrigger: 'hover' ,label:'Name',value:'Id',checkStrictly: true}"-->
              <!--@change="handleUserGroupChange"></el-cascader>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="创建时间">-->
            <!--<el-date-picker-->
              <!--v-model="begEndDate"-->
              <!--type="daterange"-->
              <!--value-format="yyyy-MM-dd"-->
              <!--format="yyyy-MM-dd"-->
              <!--range-separator="至"-->
              <!--start-placeholder="开始日期"-->
              <!--end-placeholder="结束日期">-->
            <!--</el-date-picker>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="项目">-->
            <!--<el-input placeholder="项目" style="width:200px" v-model="searchForm.Item"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="getData(1)">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="list">
      <div class="tip">
        消费记录
      </div>
      <div class="list-table">
        <el-table
          :header-cell-style="{background:'#F0F0F0',color:'black',padding:'8px 0px',fontWeight:'100',borderBottom:'solid 2px #e2e2e2',fontWeight:'800',fontSize:'12px'}"
          :cell-style="{color:'black',paddingTop:'0px',paddingBottom:'0px',fontWeight:'500',fontSize:'12px'}"
          :data="list.list"
          v-loading="loading">
          <el-table-column label="创建时间" width="150px" prop="CreateTime"></el-table-column>
          <el-table-column label="用户名" prop="UserId"></el-table-column>
          <el-table-column label="分组" prop="UserGroupName"></el-table-column>
          <el-table-column label="昵称" prop="NickName"></el-table-column>
          <el-table-column label="项目" prop="Item"></el-table-column>
          <el-table-column label="金额" prop="Price"></el-table-column>
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

<script src="../../assets/js/platform/ptbill.js"></script>

<style scoped>
  @import "../../assets/css/platform/common.css";
  @import "../../assets/css/platform/ptbill.css";
</style>
