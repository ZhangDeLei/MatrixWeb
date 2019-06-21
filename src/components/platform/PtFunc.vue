<template>
  <div class="content-panel">
    <div class="list">
      <div class="tip">
        功能列表
      </div>
      <div class="list-table">
        <el-row>
          <el-col :span="8">
            <el-select placeholder="请选择系统编号" v-model="searchForm.SystemId" @change="handlerChangeSystemSearch" style="width: 100%">
              <el-option v-for="item in systemList" :value="item.Id" :label="item.Name"
                         :key="item.Id"></el-option>
            </el-select>
            <div class="grouptree">
              <el-tree :data="list" :props="defaultProps" @node-click="handleNodeClick" default-expand-all></el-tree>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="groupform">
              <el-form ref="funcForm" :rules="rules" :model="funcForm" label-width="100px">
                <el-form-item label="编号" prop="Id">
                  <el-input placeholder="请输入编号" v-model="funcForm.Id"></el-input>
                </el-form-item>
                <el-form-item label="调用标志" prop="Code">
                  <el-input placeholder="请输入调用标志" v-model="funcForm.Code"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="Name">
                  <el-input placeholder="请输入名称" v-model="funcForm.Name"></el-input>
                </el-form-item>
                <el-form-item label="图标">
                  <el-input placeholder="请输入图标" v-model="funcForm.Icon"></el-input>
                </el-form-item>
                <el-form-item label="上级功能">
                  <el-cascader
                    :show-all-levels="false"
                    v-model="funcForm.ParentId"
                    :options="list"
                    :props="{ expandTrigger: 'hover' ,label:'Name',value:'Id',checkStrictly: true}"></el-cascader>
                </el-form-item>
                <el-form-item label="系统编号" prop="SystemId">
                  <el-select placeholder="请选择系统编号" v-model="funcForm.SystemId" @change="handlerChangeSystem">
                    <el-option v-for="item in systemList" :value="item.Id" :label="item.Name"
                               :key="item.Id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="功能类型" prop="FuncTypeId">
                  <el-select placeholder="请选择功能类型" v-model="funcForm.FuncTypeId" @change="handlerChangeType">
                    <el-option v-for="item in funcTypeList" :value="item.Id" :label="item.Name"
                               :key="item.Id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="状态">
                  <el-switch v-model="funcForm.State"></el-switch>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input placeholder="请输入图标" v-model="funcForm.Notes"></el-input>
                </el-form-item>
              </el-form>
              <el-button size="mini" @click="update">保存</el-button>
              <el-button size="mini" @click="confirm" type="primary">新增</el-button>
              <el-button size="mini" @click="deleteRow" type="danger">删除</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script src="../../assets/js/platform/ptfunc.js"></script>

<style scoped>
  @import "../../assets/css/platform/common.css";
  @import "../../assets/css/platform/ptfunc.css";
</style>
