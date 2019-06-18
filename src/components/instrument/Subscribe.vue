<template>
  <div class="content-panel">
    <div class="search">
      <div class="item bottom_line">
        <div class="label">可约仪器：</div>
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
      <div class="desc">7650 此处为仪器简介信息</div>
      <div class="tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="2019年06月01日" name="first">
            <el-table :data="times">
              <el-table-column><div class="time">00:00</div></el-table-column>
              <el-table-column><div class="time">00:00</div></el-table-column>
              <el-table-column><div class="time active">00:00</div></el-table-column>
              <el-table-column><div class="time">00:00</div></el-table-column>
              <el-table-column><div class="time active">00:00</div></el-table-column>
              <el-table-column><div class="time active">00:00</div></el-table-column>
              <el-table-column><div class="time active">00:00</div></el-table-column>
              <el-table-column><div class="time">00:00</div></el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="2019年06月01日" name="second">2019年06月01日</el-tab-pane>
          <el-tab-pane label="2019年06月01日" name="third">2019年06月01日</el-tab-pane>
        </el-tabs>
      </div>
      <div class="commit">
        <el-button type="primary" size="mini">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script src="../../assets/js/instrument/subscribe.js"></script>

<style scoped>
  @import "../../assets/css/instrument/subscribe.css";
</style>
