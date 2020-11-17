import TreeView from './treeview.vue';

const Tree = {
  install(Vue) {
    Vue.component('VTree', TreeView);
  },
};

export default Tree;
