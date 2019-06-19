<template>
  <div class="content-panel">
    <div class="search">
      <div class="item">
        <div class="label">其他选项：</div>
        <div class="sw">
          <label>账号：</label>
          <el-input size="mini" style="width: 200px" placeholder="不限"></el-input>
          <label style="margin-left: 20px">昵称：</label>
          <el-input size="mini" style="width: 200px" placeholder="不限"></el-input>
          <label style="margin-left: 20px">注册系统：</label>
          <el-select placeholder="请选择注册系统" size="mini">
            <el-option></el-option>
          </el-select>
          <el-button size="mini" type="primary">查询</el-button>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="tip">
        用户管理
        <el-button size="mini">新增用户</el-button>
      </div>
      <div class="list-table">
        <el-table
          :header-cell-style="{background:'#F0F0F0',color:'black',padding:'8px 0px',fontWeight:'100',borderBottom:'solid 2px #e2e2e2',fontWeight:'800',fontSize:'12px'}"
          :cell-style="{color:'black',paddingTop:'0px',paddingBottom:'0px',fontWeight:'500',fontSize:'12px'}"
          :data="list">
          <el-table-column label="账号">仪器一</el-table-column>
          <el-table-column label="昵称">2XXXXXX</el-table-column>
          <el-table-column label="用户组">XXXX</el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.state" disabled></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="注册系统">张XX</el-table-column>
          <el-table-column label="操作" width="190px">
            <template slot-scope="scope">
              <el-button type="text">授权</el-button>
              <el-button type="text">角色</el-button>
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div>
    </div>
    <!--用户编辑-->
    <el-dialog title="用户编辑" :visible.sync="showEditUserDialog"></el-dialog>
    <!--用户授权弹框-->
    <el-dialog title="用户授权列表" :visible.sync="showPowerDialog"></el-dialog>
    <!--用户角色-->
    <el-dialog title="角色管理" :visible.sync="showRoleDialog">
    </el-dialog>
  </div>
</template>

<script src="../../assets/js/platform/ptuser.js"></script>

<style scoped>
  @import "../../assets/css/platform/common.css";
  @import "../../assets/css/platform/ptuser.css";
</style>
