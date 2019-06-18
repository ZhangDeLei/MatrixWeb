<template>
  <div class="content-panel">
    <div class="name"><label>仪器信息：7650</label></div>
    <div class="subinfo">
      <el-row>
        <el-col :span="8">
          <div class="price line">
            <div class="label">价格（半小时）</div>
            <div class="money">100元</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="price line">
            <div class="label">价格（半小时）</div>
            <div class="money">100元</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="price" style="color: #57b846">
            <div class="label" style="color: #57b846">仪器状态</div>
            <div class="money">可预约</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="list">
      <div class="tip">
        预约记录
      </div>
      <div class="list-table">
        <el-table
          :header-cell-style="{background:'#F0F0F0',color:'black',padding:'8px 0px',fontWeight:'100',borderBottom:'solid 2px #e2e2e2',fontWeight:'800',fontSize:'12px'}"
          :cell-style="{color:'black',paddingTop:'0px',paddingBottom:'0px',fontWeight:'500',fontSize:'12px'}"
          :data="list"
          height="400px">
          <el-table-column label="预约人">仪器一</el-table-column>
          <el-table-column label="预约时长（小时）">XXXX</el-table-column>
          <el-table-column label="预约总价（元）">XXXX</el-table-column>
          <el-table-column label="起始时间">机构一</el-table-column>
          <el-table-column label="结束时间">张XX</el-table-column>
          <el-table-column label="预约时间">100元/5劵</el-table-column>
          <el-table-column label="操作" width="100px">
            <template slot-scope="scope">
              <el-button type="text">编辑</el-button>
              <el-button type="text">详情</el-button>
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

<script src="../../assets/js/instrument/detail.js"></script>

<style scoped>
  @import "../../assets/css/instrument/detail.css";
</style>
