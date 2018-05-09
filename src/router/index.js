import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Create from '@/components/Create'
import DataView from '@/components/DataView'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
    },
    { 
      path: '/dataview',
      name: 'DataView',
      component: DataView
    },
    {
      
      path: '/modify',
      name: 'Create',
      component: Create
    }
  ]
})
