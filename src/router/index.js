import Vue from 'vue'
import Router from 'vue-router'
// const _import = require('./_import_' + process.env.NODE_ENV);
const Home  = () => import('views/home/home')//首页
const Category = () => import('views/category/category') //分类
const Profile = () => import('views/profile/profile') //我的
const Cart= () => import('views/cart/cart')//购物车
const Detail= () => import('views/detail/Detail')//详情页
const Login = () =>import('views/login/index') //登录
const Register = () =>import('views/register/index')//注册
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
    },
    {
      path:'/detail/:iid',
      component:Detail
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/register',
      component:Register
    }
  ],
  mode:'history'
})
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)}
