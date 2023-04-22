import Vue from 'vue'
import Router from 'vue-router'
import ControllerDapp from '@/components/controller-dapp'
Vue.use(Router)
export default new Router({
  routes: [{
    path: '/',
    name: 'controller-dapp',
    component: ControllerDapp
  }]
})
