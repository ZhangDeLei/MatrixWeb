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
        耗材列表
        <el-button size="mini">新增耗材</el-button>
      </div>
      <div class="list-table">
        <el-table
          :header-cell-style="{background:'#F0F0F0',color:'black',padding:'8px 0px',fontWeight:'100',borderBottom:'solid 2px #e2e2e2',fontWeight:'800',fontSize:'12px'}"
          :cell-style="{color:'black',paddingTop:'0px',paddingBottom:'0px',fontWeight:'500',fontSize:'12px'}"
          :data="list">
          <el-table-column label="名称">仪器一</el-table-column>
          <el-table-column label="单位">XXXX</el-table-column>
          <el-table-column label="单价">XXXX</el-table-column>
          <el-table-column label="所属机构">机构一</el-table-column>
          <el-table-column label="负责人">张XX</el-table-column>
          <el-table-column label="剩余库存" width="200px">100元/5劵</el-table-column>
          <el-table-column label="操作" width="140px">
            <template slot-scope="scope">
              <el-button type="text">领用</el-button>
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script src="../../assets/js/consumables/list.js"></script>

<style scoped>
  @import "../../assets/css/consumables/list.css";
</style>
