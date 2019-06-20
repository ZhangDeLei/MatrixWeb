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
              <el-form ref="funcForm" :rules="rules" :model="funcForm" label-width="80px">
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
        <!--<el-table-->
          <!--:header-cell-style="{background:'#F0F0F0',color:'black',padding:'8px 0px',fontWeight:'100',borderBottom:'solid 2px #e2e2e2',fontWeight:'800',fontSize:'12px'}"-->
          <!--:cell-style="{color:'black',paddingTop:'0px',paddingBottom:'0px',fontWeight:'500',fontSize:'12px'}"-->
          <!--:data="list.list"-->
          <!--v-loading="loading">-->
          <!--<el-table-column label="编号" prop="Id"></el-table-column>-->
          <!--<el-table-column label="名称" prop="Name"></el-table-column>-->
          <!--<el-table-column label="调用标志" prop="Code"></el-table-column>-->
          <!--<el-table-column label="图标" prop="Icon"></el-table-column>-->
          <!--<el-table-column label="描述" prop="Notes"></el-table-column>-->
          <!--<el-table-column label="系统编号" prop="SystemName"></el-table-column>-->
          <!--<el-table-column label="类型编号" prop="FuncTypeName"></el-table-column>-->
          <!--<el-table-column label="状态">-->
            <!--<template slot-scope="scope">-->
              <!--<el-switch disabled v-model="scope.row.State"></el-switch>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column label="操作" width="140px">-->
            <!--<template slot-scope="scope">-->
              <!--<el-button type="text" @click="openFuncEditDialog(scope.row,true)">添加</el-button>-->
              <!--<el-button type="text" @click="openFuncEditDialog(scope.row,false)">编辑</el-button>-->
              <!--<el-button type="text" @click="deleteRow(scope.row.Id)">删除</el-button>-->
            <!--</template>-->
          <!--</el-table-column>-->
        <!--</el-table>-->
      <!--</div>-->
      <!--<div class="page">-->
        <!--<el-pagination-->
          <!--@size-change="getData"-->
          <!--@current-change="getData"-->
          <!--:page-size="pageSize"-->
          <!--layout="prev, pager, next, jumper"-->
          <!--:total="list.RecordCount">-->
        <!--</el-pagination>-->
      </div>
    </div>
    <!--功能编辑弹框-->
    <!--<el-dialog title="功能编辑" :visible.sync="showEditFuncDialog">-->
      <!--<el-form ref="funcForm" :rules="rules" :model="funcForm" label-width="80px">-->
        <!--<el-form-item label="编号" prop="Id">-->
          <!--<el-input placeholder="请输入编号" v-model="funcForm.Id"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="调用标志" prop="Code">-->
          <!--<el-input placeholder="请输入调用标志" v-model="funcForm.Code"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="名称" prop="Name">-->
          <!--<el-input placeholder="请输入名称" v-model="funcForm.Name"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="图标">-->
          <!--<el-input placeholder="请输入图标" v-model="funcForm.Icon"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="系统编号" prop="SystemId">-->
          <!--<el-select placeholder="请选择系统编号" v-model="funcForm.SystemId" @change="handlerChangeSystem">-->
            <!--<el-option v-for="item in systemList" :value="item.Id" :label="item.Name" :key="item.Id"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="功能类型" prop="FuncTypeId">-->
          <!--<el-select placeholder="请选择功能类型" v-model="funcForm.FuncTypeId" @change="handlerChangeType">-->
            <!--<el-option v-for="item in funcTypeList" :value="item.Id" :label="item.Name" :key="item.Id"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="状态">-->
          <!--<el-switch v-model="funcForm.State"></el-switch>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="备注">-->
          <!--<el-input placeholder="请输入图标" v-model="funcForm.Notes"></el-input>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <!--<el-button size="mini" @click="openFuncEditDialog({})">取消</el-button>-->
      <!--<el-button size="mini" @click="confirm" type="primary">保存</el-button>-->
    <!--</el-dialog>-->
  </div>
</template>

<script src="../../assets/js/platform/ptfunc.js"></script>

<style scoped>
  @import "../../assets/css/platform/common.css";
  @import "../../assets/css/platform/ptfunc.css";
</style>
