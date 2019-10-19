import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'


Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      namw:'home',
      meta: { // 在路由配置中加入meta:{requireAuth: true}
      requireAuth: true
     },
      component: () => import('./components/login/Login.vue')
    },
    {
      path: '/about',
      name: 'about',
      meta: { // 在路由配置中加入meta:{requireAuth: true}
      requireAuth: true
     },
      component: () => import('./views/About.vue')
    },
    {
      path:'/login',
      name:'login',
      component: () => import('./components/login/Login.vue')
    },
    {
      path:'/index',
      name:'index',
      meta: { // 在路由配置中加入meta:{requireAuth: true}
      requireAuth: true
     },
      component: () => import('./components/index/index.vue')
    }
  ]
});
export default router;

router.beforeEach((to, from, next) => {
  let islogin = localStorage.getItem("islogin");
  islogin = Boolean(Number(islogin));

  if(to.path == "/login"){
    if(islogin){
      next("/index");
    }else{
      next();
    }
  }else{
    // requireAuth:可以在路由元信息指定哪些页面需要登录权限
    if(to.meta.requireAuth && islogin) {
      next();
    }else{
      next("/login");
    }
  }
})

