<template>
  <div id="app">
    
    <main-tab-bar></main-tab-bar>
   
    <!-- keep-alive 保证页面不被destroyed -->
    <keep-alive exclude="Detail">
    <router-view></router-view>

    </keep-alive>

  </div>
</template>

<script>
import MainTabBar from 'components/content/MainTabBar/MainTabBar'
export default {
  name: 'App',
  components:{
    MainTabBar
    
  }

}
</script>

<style >
@import 'assets/css/base.css'</style>



