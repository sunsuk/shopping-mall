<template>
<div id="home">
    <nav-bar class="home-nav"><div slot='center'>购物街</div></nav-bar>
    <tab-control :titles="['流行','潮流','精选']" :class="{topshow:isShowControl}" v-show="isShowControl" @itemClick='itemClick' ref="control2" ></tab-control>
    <!-- 通过ref得到scroll内部的 方法  -->
    <scroll class="content" ref="scroll" :probe-type='3' @scroll='homeScroll' :pull-up-load='true' @pullingUp='pullUpLoad'> 
    <home-swiper :banners='banners' @swiperLoad='controlLoad'></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行','潮流','精选']" class="tab-contorl" @itemClick='itemClick' ref="control" ></tab-control>
    <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- native修饰符 监听组件的点击事件 -->
    <back-top @click.native="backTopClick" v-show="isBackTop"></back-top>
    
</div>
</template>
<script >
import HomeSwiper from './childComponents/HomeSwiper'
import RecommendView from './childComponents/RecommendView'
import FeatureView from './childComponents/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home'
import {dobounce} from '../../common/utils'
export default{
    data(){
        return{
            banners:[],//轮播图
            recommends:[],//圆圈图
            goods:{ //商品图
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]}
            },
            currentType:'pop',//当前默认显示的商品类型
            isBackTop:false,//是否显示回到顶部图标
            tabOffsetTop:0, //tab-control组件距页面top的距离
            isShowControl:false ,//是否吸顶
            saveY :0 //设置离开后记录y轴的位置
        }
    },
    components:{
        HomeSwiper,
        RecommendView,
        FeatureView,
        NavBar,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    },
    created(){
       this.getBanners()
       this.getGoodsList('pop')
       this.getGoodsList('new')
       this.getGoodsList('sell')
      
    },
    mounted(){
        // const refresh =  dobounce(this.$refs.scroll.refresh,200)
         //监听goodlistitem 的图片是否加载完成了  $bus.$on 接收事件
       this.$bus.$on('loadScuess',()=>{
         this.$refs.scroll.refresh() //重新计算高度的refresh执行的次数过多 需要防抖函数
        //    refresh()
       })
       
       
       console.log()
       
    },
    computed:{
        showGoods(){
          return   this.goods[this.currentType].list //通过 currentType的index 决定展示哪一个商品列表
        }
    },
   
    activated(){
        //当处于当前页面就会执行的函数 activated 需要app.vue配合设置keepalive 才可以调用
        this.$refs.scroll.backTop(0,this.saveY,0)

        //滚动后 进行一次刷新 避免出现不能滚动的bug
        // this.$refs.scroll.refresh()
        console.log(this.saveY,'activated')

    },
    deactivated(){
        //离开当前页面后调用
        this.saveY = this.$refs.scroll.getSaveY()

    },
    methods:{
       
       //事件监听相关方法
       controlLoad(){
           //refs不能获取到组件的offsetTop $el才可以
           ////只有元素渲染完成才会计算入offsetTop，如有图片获取时间较长，会导致最终获取的offsetTop值偏小
          this.tabOffsetTop = this.$refs.control.$el.offsetTop
       },
       itemClick(index){
          console.log(index)
          switch(index){
              case 0:
              this.currentType='pop'
              break  
              case 1:
              this.currentType='new'
              break
              case 2:
              this.currentType='sell'         
          }
          this.$refs.control2.currentIndex =index
          this.$refs.control.currentIndex =index

       },
       backTopClick(){
           //scrollTo 回到顶部的方法
           //x 轴 y轴 时间
           //refs直接访问组件内部的方法
          this.$refs.scroll.backTop(0,0)
          
       },
       homeScroll(position){
           //判断backtop是否显示
           //position y轴大于1000的时候显示  position是一个负数
        this.isBackTop = -(position.y) > 1000
        this.isShowControl =-(position.y) > this.tabOffsetTop
       },
       pullUpLoad(){
           this.getGoodsList(this.currentType)
           // refresh重新计算需要滚动的高度 避免出现bug
           this.$refs.scroll.refresh()
       },
        /* 网络请求相关方法 */
        getBanners(){
           getHomeMultidata().then(res=>{
            // console.log(res)
            this.banners = res.data.banner.list 
            this.recommends=res.data.recommend.list
        })
        },
        getGoodsList(type){
            const page = this.goods[type].page+1
           getHomeGoods(type,page).then(res=>{
               //将结果添加进list (...为解构，可接受多个值）
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page+= 1
            //refs调取scroll组件的方法 请求更多数据  上拉加载更多
            this.$refs.scroll.getFinsh()
        })
        }
    }
}
</script> 
<style scoped>
#home{
    /* padding-top: 44px; */
    /* vh 视口高度 100vh =100% 视口高度 50vh =50% */
    height: 100vh;
    position: relative;
}
.home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /* 使用原生滚动需要定位  使用bs 后不需要了 */
    /* position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9; */
}
.tab-contorl{
    /* sticky 在距离top 44px的时候自动将position的值设置为fixed  */
    /* position: sticky; 
    top: 44px;
    z-index: 9; */
    background-color: #fff;
}
.topshow{
    background-color: #fff;
    /* 相当定位保持原来的位置 */
    position: relative; 
    z-index: 9;
}
/* .content{
    content的高度（需要滚动的高度） 等于屏幕高度减去 导航栏 底部的高度
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
} */
.content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    /* overflow: hidden; */
}
</style>