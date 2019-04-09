import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const router = new Router({
  mode: 'history', 
  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve => require(['@/components/login'], resolve),//懒加载
    },
    {
      path: '/',
      component: resolve => require(['@/components/home'], resolve),//懒加载
      children:[
        {
          path: '/404',
          name: '404',
          component: resolve => require(['@/components/404/404'], resolve),//懒加载
        },
        {
          path:"/user",
          name:'user',
          component:resolve=>require(['@/components/user/user'], resolve)
        },
        {
          path:"/order",
          name:'order',
          component:resolve=>require(['@/components/order/order'], resolve)
        },
        {
          path:"/menu",
          name:'menu',
          component:resolve=>require(['@/components/menu/menu'], resolve)
        },
        {
          path:"/user",
          name:'*',
          component:resolve=>require(['@/components/user/user'], resolve)
        }
      ]
    }
  ]
})



router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) { 
    from.name ? next({
      name: from.name
    }) : next('/404'); 
  } else {
    next(); //如果匹配到正确跳转
  }
})

export default router;
