<template>
  <div class="content-panel">
    <div class="search">
      <div class="item">
        <div class="label">其他选项：</div>
        <div class="sw">
          <label>编号：</label>
          <el-input size="mini" style="width: 200px" placeholder="不限" v-model="searchForm.Id"></el-input>
          <label style="margin-left: 20px">系统编号：</label>
          <el-select size="mini" placeholder="系统编号" style="width:200px" v-model="searchForm.SystemId" clearable>
            <el-option v-for="item in systemList" :value="item.Id" :label="item.Name" :key="item.Id"></el-option>
          </el-select>
          <el-button size="mini" type="primary" @click="getData(1)">查询</el-button>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="tip">
        角色管理
        <el-button size="mini" @click="openRoleDialog({})">新增角色</el-button>
      </div>
      <div class="list-table">
        <el-table
          :header-cell-style="{background:'#F0F0F0',color:'black',padding:'8px 0px',fontWeight:'100',borderBottom:'solid 2px #e2e2e2',fontWeight:'800',fontSize:'12px'}"
          :cell-style="{color:'black',paddingTop:'0px',paddingBottom:'0px',fontWeight:'500',fontSize:'12px'}"
          :data="list.list"
          v-loading="loading">
          <el-table-column label="编号" prop="Id"></el-table-column>
          <el-table-column label="名称" prop="Name"></el-table-column>
          <el-table-column label="系统名称" prop="SystemName"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch disabled v-model="scope.row.State"/>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="Notes"></el-table-column>
          <el-table-column label="操作" width="180px">
            <template slot-scope="scope">
              <el-button type="text" @click="openRoleDialog(scope.row)">详细</el-button>
              <el-button type="text" @click="openRoleDataDialog(scope.row)">自定义数据</el-button>
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
    <!--角色详情-->
    <el-dialog title="角色详情" :visible.sync="showRoleDataDialog" width="60%">
      <el-row>
        <el-col :span="8">
          <div class="jsonlist">
            <div class="item" v-for="item in roleDataList.list" @click="checkJsonData(item)">{{item.Code}}</div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="jsondetail">
            <textarea style="height: 85%; width: 100%;border: none;" placeholder="请输入JsonData" v-model="roleDataForm.JsonData"></textarea>
            <el-button type="primary" @click="openRoleDataEditDialog">新增</el-button>
            <el-button @click="updateRoleData">保存</el-button>
            <el-button type="info" @click="resetRoleData">重置</el-button>
            <el-button type="danger" @click="deleteRoleData">删除</el-button>
          </div>
        </el-col>
      </el-row>
      <el-dialog
        width="50%"
        title="角色详情编辑"
        :visible.sync="showRoleDataEditDialog"
        append-to-body>
        <el-form :model="roleDataForm" ref="roleDataForm" :rules="roleDataRules" label-width="100px" size="mini">
          <el-form-item label="编码" prop="Code">
            <el-input placeholder="请输入编码" v-model="roleDataForm.Code"></el-input>
          </el-form-item>
          <el-form-item label="JsonData" prop="JsonData">
            <el-input placeholder="JsonData" v-model="roleDataForm.JsonData" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <el-button size="mini" @click="openRoleDataEditDialog({})">取消</el-button>
        <el-button size="mini" @click="confirmRoleData" type="primary">保存</el-button>
      </el-dialog>
    </el-dialog>
    <!--角色编辑-->
    <el-dialog title="角色编辑" :visible.sync="showRoleDialog">
      <el-row>
        <el-col :span="12">
          <el-form label-width="100px" ref="roleFrom" :model="roleFrom" :rules="rules" size="mini">
            <el-form-item label="名称" prop="Name">
              <el-input placeholder="请输入名称" v-model="roleFrom.Name"></el-input>
            </el-form-item>
            <el-form-item label="系统编号" prop="SystemId">
              <el-select placeholder="请选择系统编号" v-model="roleFrom.SystemId" @change="handlerChangeSystem">
                <el-option v-for="item in systemList" :value="item.Id" :label="item.Name" :key="item.Id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态">
              <el-switch v-model="roleFrom.State"></el-switch>
            </el-form-item>
            <el-form-item label="描述" prop="Notes">
              <el-input placeholder="请输入描述" v-model="roleFrom.Notes"></el-input>
            </el-form-item>
          </el-form>
          <el-button size="mini" @click="openRoleDialog({})">返回</el-button>
          <el-button size="mini" @click="confirm" type="primary">保存</el-button>
          <el-button size="mini" type="danger" @click="deleteRole">删除</el-button>
        </el-col>
        <el-col :span="12">
          <div class="roleTree">
            <el-tree
              default-expand-all
              :data="funcdata"
              show-checkbox
              node-key="Id"
              :default-checked-keys="defaultCheckKeys"
              :props="defaultProps"
              @check-change="handlerChangeCheckNode">
            </el-tree>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script src="../../assets/js/platform/ptrole.js"></script>

<style scoped>
  @import "../../assets/css/platform/common.css";
  @import "../../assets/css/platform/ptrole.css";
</style>
