import Vue from 'vue'
import Router from 'vue-router'
import Entry from '@/components/Entry'
import Create from '@/components/Create'
import DataView from '@/components/DataView'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Entry',
      component: Entry
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
    },
    { 
      path: '/dataview/:locationId',
      name: 'DataView',
      component: DataView
    },
    {
      
      path: '/modify/:locationId',
      name: 'modify',
      component: Create
    }
  ]
})
