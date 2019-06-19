<template>
  <div class="content-panel">
    <div class="search">
      <div class="item bottom_line">
        <div class="label">耗材类型：</div>
        <div class="types">
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type active">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type active">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type active">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type active">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type active">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
          <label class="type">全部</label>
        </div>
      </div>
      <div class="item">
        <div class="label">其他选项：</div>
        <div class="sw">
          <label>耗材编号：</label>
          <el-input size="mini" style="width: 200px" placeholder="不限"></el-input>
          <label style="margin-left: 20px">耗材名称：</label>
          <el-input size="mini" style="width: 200px" placeholder="不限"></el-input>
          <el-button size="mini" type="primary">查询</el-button>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="tip">
        耗材领用记录
      </div>
      <div class="list-table">
        <el-table
          :header-cell-style="{background:'#F0F0F0',color:'black',padding:'8px 0px',fontWeight:'100',borderBottom:'solid 2px #e2e2e2',fontWeight:'800',fontSize:'12px'}"
          :cell-style="{color:'black',paddingTop:'0px',paddingBottom:'0px',fontWeight:'500',fontSize:'12px'}"
          :data="list">
          <el-table-column label="名称">仪器一</el-table-column>
          <el-table-column label="单位">XXXX</el-table-column>
          <el-table-column label="单价">XXXX</el-table-column>
          <el-table-column label="数量">机构一</el-table-column>
          <el-table-column label="领取人">张XX</el-table-column>
          <el-table-column label="领取单位">张XX</el-table-column>
          <el-table-column label="申请时间" width="150px">2019-06-05 00:00:00</el-table-column>
          <el-table-column label="操作" width="140px">
            <template slot-scope="scope">
              <el-button type="text">审批</el-button>
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
  </div>
</template>

<script src="../../assets/js/consumables/collar.js"></script>

<style scoped>
  @import "../../assets/css/consumables/collar.css";
</style>
