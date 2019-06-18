<template>
  <div>
    <el-row>
      <el-col :span="6">
        <div class="tables">
          <div class="use_rate_title">仪器使用率<i class="el-icon-warning-outline"></i></div>
          <div class="tip">60%</div>
          <div class="table">
            <div id="use_rate"></div>
          </div>
          <div class="desc">
            <label>周同比<i class="el-icon-caret-top" style="color: greenyellow"></i> <label style="color: black">12%</label></label>
            <label>日环比<i class="el-icon-caret-bottom" style="color: red"></i> <label style="color: black">12%</label></label>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="tables">
          <div class="use_rate_title">仪器使用时间<i class="el-icon-warning-outline"></i></div>
          <div class="tip">157</div>
          <div class="table">
            <div id="use_time"></div>
          </div>
          <div class="desc">
            <label>周同比<i class="el-icon-caret-top" style="color: greenyellow"></i> <label style="color: black">12%</label></label>
            <label>日环比<i class="el-icon-caret-bottom" style="color: red"></i> <label style="color: black">12%</label></label>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="tables">
          <div class="use_rate_title">耗材库存<i class="el-icon-warning-outline"></i></div>
          <div class="tip">6560</div>
          <div class="table">
            <div id="store"></div>
          </div>
          <div class="desc">
            <label>耗材库存总量 <label style="color: black">12423</label></label>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="tables">
          <div class="use_rate_title">培训次数<i class="el-icon-warning-outline"></i></div>
          <div class="tip">2658420</div>
          <div class="table">
            <el-progress :stroke-width="10" :percentage="70" :show-text="false"></el-progress>
          </div>
          <div class="desc">
            <label>培训通过率 <label style="color: black">80%</label></label>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="total">
      <div class="title">
        <div class="tabs">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="使用率" name="first">
              <div class="tab-content">
                <div class="charts">
                  <div id="big-charts" style="width: 100%;height: 100%;"></div>
                </div>
                <div class="list">
                  <div class="title">仪器使用排名</div>
                  <div class="item">
                    <el-row>
                      <el-col :span="3">
                        <el-badge :value="1" class="item" type="info">
                        </el-badge>
                      </el-col>
                      <el-col :span="13">
                        <div>用户1</div>
                      </el-col>
                      <el-col :span="8">
                        <div>323,234</div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="3">
                        <el-badge :value="1" class="item" type="info">
                        </el-badge>
                      </el-col>
                      <el-col :span="13">
                        <div>用户1</div>
                      </el-col>
                      <el-col :span="8">
                        <div>323,234</div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="3">
                        <el-badge :value="1" class="item" type="info">
                        </el-badge>
                      </el-col>
                      <el-col :span="13">
                        <div>用户1</div>
                      </el-col>
                      <el-col :span="8">
                        <div>323,234</div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="3">
                        <el-badge :value="1" class="item" type="info">
                        </el-badge>
                      </el-col>
                      <el-col :span="13">
                        <div>用户1</div>
                      </el-col>
                      <el-col :span="8">
                        <div>323,234</div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="3">
                        <el-badge :value="1" class="item" type="info">
                        </el-badge>
                      </el-col>
                      <el-col :span="13">
                        <div>用户1</div>
                      </el-col>
                      <el-col :span="8">
                        <div>323,234</div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="3">
                        <el-badge :value="1">
                        </el-badge>
                      </el-col>
                      <el-col :span="13">
                        <div>用户1</div>
                      </el-col>
                      <el-col :span="8">
                        <div>323,234</div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="费用" name="second">

            </el-tab-pane>
          </el-tabs>
          <div class="tab-right">
            <label>今日</label>
            <label>本周</label>
            <label>本月</label>
            <label>全年</label>
            <el-date-picker
              size="mini"
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../assets/js/index.js"></script>

<style scoped>
  @import "../assets/css/common.css";
  @import "../assets/css/index.css";
</style>
<style>
  .tab-content>.list>.el-row{
    margin: 5px 0px;
  }
</style>
