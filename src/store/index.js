import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
   state:{
       //购物车的商品
       cartList:[]
   },
   mutations:{//mutations 的目的是为了修改state的状态 每个事件尽量完成的事情单一
      
   },
   getters:{
       length(state){ //计算属性 
          return state.cartList.length
       },
       product(state){
           return state.cartList
       }
   },
   actions:{
    addCart(context,payload){ //context 上下文 
            //    state.cartList.push(payload)
            //查找购物车的商品的iid是否是一样的
            return new Promise((resolve,reject)=>{ //Promise 后页面可监听
                let nowGoods = context.state.cartList.find(item=>item.iid === payload.iid )
            if(nowGoods){//如果有一样的商品就数量加一
                nowGoods.count += 1
                resolve('加入购物车成功')
            }else{//如果没有就数量等于1
                payload.count =1
                payload.checked =true
                context.state.cartList.push(payload)
                // resolve('成功加入购物车')
            }

            })
            
        }
   }
})
export default store