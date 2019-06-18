import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Main from '@/components/Main'
// 首页
import Index from '@/components/Index'
// 平台资源
import PtFunc from '@/components/platform/PtFunc'
import PtFuncType from '@/components/platform/PtFuncType'
import PtLog from '@/components/platform/PtLog'
import PtNotice from '@/components/platform/PtNotice'
import PtRole from '@/components/platform/PtRole'
import PtRoleGroup from '@/components/platform/PtRoleGroup'
import PtSystem from '@/components/platform/PtSystem'
import PtUser from '@/components/platform/PtUser'
import PtUserGroup from '@/components/platform/PtUserGroup'
// 仪器
import InstList from '@/components/instrument/List'
import InstDetail from '@/components/instrument/Detail'
import InstSubscribe from '@/components/instrument/Subscribe'
// 耗材
import ConList from '@/components/consumables/List'
import ConCollar from '@/components/consumables/Collar'
// 课程
import CurList from '@/components/curriculum/List'
import CurDetail from '@/components/curriculum/Detail'
import CurRecord from '@/components/curriculum/Record'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {path: '/index', name: 'Index', component: Index},
        // 仪器
        {path: '/inst/list', name: 'InstList', component: InstList},
        {path: '/inst/detail', name: 'InstDetail', component: InstDetail},
        {path: '/inst/subscribe', name: 'InstSubscribe', component: InstSubscribe},
        // 耗材
        {path: '/con/list', name: 'ConList', component: ConList},
        {path: '/con/collar', name: 'ConCollar', component: ConCollar},
        // 课程
        {path: '/cur/list', name: 'CurList', component: CurList},
        {path: '/cur/detail', name: 'CurDetail', component: CurDetail},
        {path: '/cur/record', name: 'CurRecord', component: CurRecord},
        // 平台资源
        {path: '/platform/ptfunc', name: 'PtFunc', component: PtFunc},
        {path: '/platform/ptfunctype', name: 'PtFuncType', component: PtFuncType},
        {path: '/platform/ptlog', name: 'PtLog', component: PtLog},
        {path: '/platform/ptnotice', name: 'PtNotice', component: PtNotice},
        {path: '/platform/ptrole', name: 'PtRole', component: PtRole},
        {path: '/platform/ptrolegroup', name: 'PtRoleGroup', component: PtRoleGroup},
        {path: '/platform/ptsystem', name: 'PtSystem', component: PtSystem},
        {path: '/platform/ptuser', name: 'PtUser', component: PtUser},
        {path: '/platform/ptusergroup', name: 'PtUserGroup', component: PtUserGroup}
      ]
    }
  ]
})
