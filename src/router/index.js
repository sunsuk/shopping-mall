import Vue from 'vue'
import Router from 'vue-router'
// const _import = require('./_import_' + process.env.NODE_ENV);
const Home  = () => import('views/home/home')//首页
const Category = () => import('views/category/category') //分类
const Profile = () => import('views/profile/profile') //我的
const Cart= () => import('views/cart/cart')//购物车
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/home',
      component:Home
    },
    {
      path:'/category',
      component:Category
    },
    {
      path:'/cart',
      component:Cart
    },
    {
      path:'/profile',
      component:Profile
    }
  ],
  mode:'history'
})
