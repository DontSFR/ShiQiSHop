import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
Vue.use(Router)

const routes =  [
  {
    path: '/',
    name: '主界面',
    component: index,
    children: [
      {
        path: 'index',
        name:'index',
        component: r => require.ensure([], () => r(require('../view/index/index.vue')), 'index')
      },
      {
        path:'skincare',
        name:'skincare',
        component: r => require.ensure([], () => r(require('../view/skincare/index.vue')), 'newBook')
      },
      {
        path:'makeUp',
        name:'makeUp',
        component: r => require.ensure([], () => r(require('../view/makeUp/index.vue')), 'recommend')
      },
      {
        path:'special',
        name:'special',
        component: r => require.ensure([], () => r(require('../view/special/index.vue')), 'special')
      },
      {
        path:'details',
        name:'details',
        component: r => require.ensure([], () => r(require('../view/details/index.vue')), 'details')
      },
      {
        path:'search',
        name:'search',
        component: r => require.ensure([], () => r(require('../view/searchGood/index.vue')), 'search')
      },
      {
        path:'category',
        name:'category',
        component: r => require.ensure([], () => r(require('../view/category/index.vue')), 'category')
      },
      {
        path:'center',
        name:'center',
        component: r => require.ensure([], () => r(require('../view/center/index.vue')), 'center')
      },
      {
        path:'news',
        name:'news',
        component: r => require.ensure([], () => r(require('../view/news/index.vue')), 'news')
      },
      {
        path:'brand',
        name:'brand',
        component: r => require.ensure([], () => r(require('../view/brand/index.vue')), 'news')
      },
      {
        path:'testDetails',
        name:'testDetails',
        component: r => require.ensure([], () => r(require('../view/testDetails/index.vue')), 'testDetails')
      },
      
      
    ]
  },
  {
    path: '/login',
    component: r => require.ensure([], () => r(require('../view/login.vue')), 'login')
  },
  {
    path: '/regist',
    component: r => require.ensure([], () => r(require('../view/regist.vue')), 'regist')
  }
  
];

const router = new Router({
  routes
});
export default router
