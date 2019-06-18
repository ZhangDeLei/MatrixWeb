<template>
  <div class="content-panel">
    <div class="name"><label>课程名称：7650</label></div>
    <div class="subinfo">
      <el-row>
        <el-col :span="8">
          <div class="price line">
            <div class="label">标题</div>
            <div class="money">XXXXXXXXXXXXXXXXXXXX</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="price line">
            <div class="label">关联仪器</div>
            <div class="money">仪器XXXX</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="price" style="color: #57b846">
            <div class="label" style="color: #57b846">课程状态</div>
            <div class="money">有效</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="list">
      <div class="tip">
        培训记录
        <el-button size="mini">新增合同</el-button>
      </div>
      <div class="list-table">
        <el-table
          :header-cell-style="{background:'#F0F0F0',color:'black',padding:'8px 0px',fontWeight:'100',borderBottom:'solid 2px #e2e2e2',fontWeight:'800',fontSize:'12px'}"
          :cell-style="{color:'black',paddingTop:'0px',paddingBottom:'0px',fontWeight:'500',fontSize:'12px'}"
          :data="list">
          <el-table-column label="开始时间">仪器一</el-table-column>
          <el-table-column label="结束时间">XXXX</el-table-column>
          <el-table-column label="人数上限">XXXX</el-table-column>
          <el-table-column label="参训人数">机构一</el-table-column>
          <el-table-column label="培训人">张XX</el-table-column>
          <el-table-column label="培训地点">100元/5劵</el-table-column>
          <el-table-column label="合同状态">待审批</el-table-column>
          <el-table-column label="操作" width="150px">
            <template slot-scope="scope">
              <el-button type="text">报名</el-button>
              <el-button type="text">编辑</el-button>
              <el-button type="text">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script src="../../assets/js/curriculum/detail.js"></script>

<style scoped>
  @import "../../assets/css/curriculum/detail.css";
</style>
