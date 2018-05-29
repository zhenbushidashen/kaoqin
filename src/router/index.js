import Vue from 'vue'
import Router from 'vue-router'
import Entry from '@/components/Entry'
import Create from '@/components/Create'
import DataView from '@/components/DataView'
import Error from '@/components/Error'
import { getToken } from '@/auth'
Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'Entry',
      component: Entry
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
    },
    { 
      path: '/dataview/:ruleId',
      name: 'DataView',
      component: DataView
    },
    {
      
      path: '/modify/:ruleId',
      name: 'modify',
      component: Create
    },
    {
      path:'/error',
      name: 'error',
      component: Error
    }
  ]
})

router.beforeEach((to, from, next) => {
    if(!getToken(window.location.href).success && to.name !== 'error') {
      next('/error')
    } else {
     next()
    }
})
export default router