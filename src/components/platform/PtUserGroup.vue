<template>
  <div class="content-panel">
    <div class="list">
      <div class="tip">
        用户组管理
      </div>
      <div class="list-table">
        <el-row>
          <el-col :span="8">
            <div class="grouptree">
              <el-tree :data="list" :props="defaultProps" @node-click="handleNodeClick" default-expand-all></el-tree>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="groupform">
              <el-form size="mini" label-width="100px" :model="userGroupForm" ref="userGroupForm">
                <el-form-item label="名称" prop="Name">
                  <el-input placeholder="用户组名称" v-model="userGroupForm.Name"/>
                </el-form-item>
                <el-form-item label="状态">
                  <el-switch v-model="userGroupForm.State"/>
                </el-form-item>
                <el-form-item label="父级用户组">
                  <el-cascader
                    :show-all-levels="false"
                    v-model="userGroupForm.ParentId"
                    :options="list"
                    :props="{ expandTrigger: 'hover' ,label:'Name',value:'Id',checkStrictly: true}"></el-cascader>
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

<script src="../../assets/js/platform/ptusergroup.js"></script>

<style scoped>
  @import "../../assets/css/platform/common.css";
  @import "../../assets/css/platform/ptusergroup.css";
</style>
