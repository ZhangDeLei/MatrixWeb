<template>
  <div class="content-panel">
    <div class="search">
      <div class="item">
        <el-form size="mini" :inline="true" label-width="80px">
          <el-form-item label="系统编号">
            <el-select placeholder="系统编号" style="width:200px" v-model="searchForm.SystemId" clearable>
              <el-option v-for="item in systemList" :value="item.Id" :label="item.Name" :key="item.Id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题">
            <el-input placeholder="标题" style="width:200px" v-model="searchForm.Title"></el-input>
          </el-form-item>
          <el-form-item label="用户编号">
            <el-input placeholder="用户编号" style="width:200px" v-model="searchForm.UserId"></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
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
          <el-form-item label="发送者">
            <el-input placeholder="发送者" style="width:200px" v-model="searchForm.Author"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getData(1)">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="list">
      <div class="tip">
        通知管理
        <el-button size="mini" @click="openEditDialog({})">新增通知</el-button>
      </div>
      <div class="list-table">
        <el-table
          :header-cell-style="{background:'#F0F0F0',color:'black',padding:'8px 0px',fontWeight:'100',borderBottom:'solid 2px #e2e2e2',fontWeight:'800',fontSize:'12px'}"
          :cell-style="{color:'black',paddingTop:'0px',paddingBottom:'0px',fontWeight:'500',fontSize:'12px'}"
          :data="list.list"
          v-loading="loading">
          <el-table-column label="用户编号" prop="UserId"></el-table-column>
          <el-table-column label="系统" prop="SystemName"></el-table-column>
          <el-table-column label="标题" prop="Title"></el-table-column>
          <el-table-column label="发送者" prop="Author"></el-table-column>
          <el-table-column label="创建时间" width="150px" prop="CreateTime"></el-table-column>
          <el-table-column label="置顶">
            <template slot-scope="scope">
              <el-switch disabled v-model="scope.row.Post"/>
            </template>
          </el-table-column>
          <el-table-column label="已读">
            <template slot-scope="scope">
              <el-switch disabled v-model="scope.row.Read"/>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140px">
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
    <!--通知编辑-->
    <el-dialog title="通知编辑" :visible.sync="showNoticDialog">
      <el-form ref="noticeForm" :rules="rules" :model="noticeForm" label-width="80px" size="mini">
        <el-form-item label="用户编号" prop="Id">
          <el-input placeholder="请输入用户编号" v-model="noticeForm.UserId"></el-input>
        </el-form-item>
        <el-form-item label="系统编号" prop="SystemId">
          <el-select placeholder="请选择系统编号" v-model="noticeForm.SystemId" @change="handlerChangeSystem">
            <el-option v-for="item in systemList" :value="item.Id" :label="item.Name" :key="item.Id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="Title">
          <el-input placeholder="请输入标题" v-model="noticeForm.Title"></el-input>
        </el-form-item>
        <el-form-item label="发送者" prop="Author">
          <el-input placeholder="请输入发送者" v-model="noticeForm.Author"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="Content">
          <el-input placeholder="请输入内容" v-model="noticeForm.Content" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="源链接">
          <el-input placeholder="请输入源链接" v-model="noticeForm.Url"></el-input>
        </el-form-item>
        <el-form-item label="置顶">
          <el-row>
            <el-col :span="4"><el-switch v-model="noticeForm.Post"></el-switch></el-col>
            <el-col :span="4">已读&nbsp;&nbsp;<el-switch v-model="noticeForm.Read"></el-switch></el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <el-button size="mini" @click="openEditDialog({})">取消</el-button>
      <el-button size="mini" @click="confirm" type="primary">保存</el-button>
    </el-dialog>
  </div>
</template>

<script src="../../assets/js/platform/ptnotice.js"></script>

<style scoped>
  @import "../../assets/css/platform/common.css";
  @import "../../assets/css/platform/ptnotice.css";
</style>
