<template>
<div>
    <tab-bar>
     
     <tab-bar-item path='/home' activeColor='deeppink'>
        <img src="~img/tabbar/home.png" alt="" slot='tab-icon'>
        <img src="~img/tabbar/active-home.png" alt="" slot='tab-active-icon'>

       <div slot="tab-text"> 首页</div>
     </tab-bar-item>
     <tab-bar-item path='/category' activeColor='deeppink'>
        <img src="~img/tabbar/class.png" alt="" slot='tab-icon'>
        <img src="~img/tabbar/active-class.png" alt="" slot='tab-active-icon'>

       <div slot="tab-text">分类</div>
     </tab-bar-item>
     <tab-bar-item path='/cart' activeColor='deeppink'>
        <img src="~img/tabbar/car.png" alt="" slot='tab-icon'>
        <img src="~img/tabbar/active-car.png" alt="" slot='tab-active-icon'>

       <div slot="tab-text">购物车</div>
     </tab-bar-item>
     <tab-bar-item path='profile' activeColor='deeppink'> 
        <img src="~img/tabbar/mine.png" alt="" slot='tab-icon'>
        <img src="~img/tabbar/active-mine.png" alt="" slot='tab-active-icon'>

       <div slot="tab-text">我的</div>
     </tab-bar-item>

   </tab-bar>
</div>
</template>
<script >
import TabBar from '../../common//tabBar/tabBar'
import TabBarItem from '../../common/tabBar/tabBarItem'
export default{
    components:{
    TabBar,
    TabBarItem
    
  },
    data(){
        return{

        }
    }
}
</script> 