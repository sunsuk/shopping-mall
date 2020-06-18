
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store'
import toast from './components/common/toast'
import fastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import axios from 'axios'
Vue.prototype.$axios = axios
//vue原型链挂载总线
Vue.prototype.$bus = new Vue()
Vue.use(toast)
Vue.use(VueLazyLoad,{
  //添加一张默认的图片
  loading:require('./assets/img/common/lazyImg.png')
})
fastClick.attach(document.body)
/* eslint-disable no-new */
// router.afterEach((to,from,next)=>{
//     window.scrollTo(0,0)
// })
new Vue({
  render:h =>h(App),

  router,
  store,
 
}).$mount('#app')