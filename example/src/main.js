import Vue from 'vue'
import VueRouter from 'vue-router'
import Demo from './Demo.vue'
import VTree from '../../src/index';
import TreeView from '@ll931217/vue-treeview'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VTree)
Vue.use(TreeView)

new Vue({
  render: h => h(Demo),
}).$mount('#app')
