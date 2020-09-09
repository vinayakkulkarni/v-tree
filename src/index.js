import TreeView from './treeview.vue';

const Tree = {
  install(Vue) {
    Vue.component('v-tree', TreeView);
  },
};

export default Tree;
