<template>
<div class="goods-detail">
    <child-nav-bar class="goods-nav" @itemClick='itemClick' ref="nav"></child-nav-bar>
   <scroll class="content" ref="scroll"   :probeType=3 @scroll='contentPositon'  >
       <!-- <div>
           {{this.$store.state.cartList.length}}
       </div> -->
    <detail-swiper :topImages='topImages'></detail-swiper>
    <detail-base-info :goods='goods'></detail-base-info>
    <detail-shop-info :shop='shop'></detail-shop-info>
    <!-- <detail-goods-info :detailInfo='detailInfo' @imgLoad='imgLoad'></detail-goods-info> -->
    <detail-param-info :paramInfo='paramInfo' ref="param" > </detail-param-info>
    <detail-comment-info :commentInfo='commentInfo' ref="comment" ></detail-comment-info>
    <goods-list :goods='recommend' ref="recommend" @loadOk='imgScuess'></goods-list>
   </scroll>

    <detail-bottom-nav @addToCart='addCart'></detail-bottom-nav>
    <back-top @click.native="backTopClick" v-show="isBackTop" ></back-top>
</div>
</template>
<script >
import ChildNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
import DetailBaseInfo from './childComponents/DetailbaseInfo'
import DetailShopInfo from './childComponents/DetailShopInfo'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo'
import DetailParamInfo from './childComponents/DetailParamInfo'
import DetailCommentInfo from './childComponents/DetailCommentInfo'
import DetailBottomNav from './childComponents/DetailBottomBar'
import GoodsList from 'components/content/goods/GoodsList'

import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getDetail,Goods,Shop,GoodsParam,getRecomend} from 'network/detail'
import {mapActions} from 'vuex'
export default{
    name:'Detail',//如果并设置name keepalive就找不到
    data(){
        return{
          iid:null,
          topImages:[],  //顶部轮播图
           goods:{},//商品信息
           shop:{},//店铺信息
           detailInfo:{},//图片信息
           paramInfo:{},//参数信息
           commentInfo:{},//评论信息
           recommend:[],//推荐信息
           detailLink:[],//点击切换主题
           currentI:0,
           isBackTop:false//是否显示回到顶部
        }
    },
    components:{
        ChildNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        Scroll,
        GoodsList,
        DetailBottomNav,
        BackTop
        

    },
    mounted(){
        // $route 获取到的是路由携带的的路径/参数/params
        //1 保存iid
        this.iid =this.$route.params.iid
        this.getData()
        this._getRecomend()
        
        console.log(this.$refs.scroll.getSaveY(),'详情页的y值')    
    //     this.$bus.$on('loadScuess',()=>{
    //        this.$refs.scroll.refresh() //重新计算高度的refresh执行的次数过多 需要防抖函数
        
    //          this.detailLink =[]
    //            this.detailLink.push(0) 
    //            this.detailLink.push(this.$refs.param.$el.offsetTop) 
    //            this.detailLink.push(this.$refs.comment.$el.offsetTop) 
    //            this.detailLink.push(this.$refs.recommend.$el.offsetTop) 
    //             console.log(this.detailLink)
    //    })
        
    },
    methods:{
        ...mapActions({
            ToCart:'addCart'
        }),
        //2 根据iid请求数据
       getData(){
            getDetail(this.iid).then(res=>{
            // console.log(res)
            const datas = res.result
            this.topImages = datas.itemInfo.topImages
            //3 获取商品信息
            this.goods =  new Goods(datas.itemInfo,datas.columns,datas.shopInfo.services)
            //4 获取店铺信息
            this.shop = new Shop(datas.shopInfo)
            //5 获取详情页图片信息
            this.detailInfo = datas.detailInfo
            // 6 获取商品参数
            this.paramInfo = new GoodsParam(datas.itemParams.info, datas.itemParams.rule)
            // 7 获取评论
            if(datas.rate.list){
            this.commentInfo = datas.rate.list[0]

            }
            //根据最新的数据 对应的dom 已经加载出来了 但是图片没有加载出来 所以值不准确
            // this.$nextTick(()=>{
            //     this.detailLink =[]
            //    this.detailLink.push(0) 
            //    this.detailLink.push(this.$refs.param.$el.offsetTop) 
            //    this.detailLink.push(this.$refs.comment.$el.offsetTop) 
            //    this.detailLink.push(this.$refs.recommend.$el.offsetTop) 
            //     console.log(this.detailLink)
            // })

        })
       } ,
       imgLoad(){
        //    console.log('+++++++++')
           this.$refs.scroll.refresh()
       },
       _getRecomend(){
           getRecomend().then(res=>{
              this.recommend = res.data.list
           })
       },
       itemClick(index){
           this.$refs.scroll.backTop(0,-this.detailLink[index],200)
           console.log(this.detailLink[index])
       },
       imgScuess(){
           this.$refs.scroll.refresh()
                this.detailLink =[]
               this.detailLink.push(0) 
               this.detailLink.push(this.$refs.param.$el.offsetTop) 
               this.detailLink.push(this.$refs.comment.$el.offsetTop) 
               this.detailLink.push(this.$refs.recommend.$el.offsetTop) 
                // console.log(this.detailLink)
            
       },
       //监听navbar 的position 
       contentPositon(position){
           const postionY  = -position.y
            let length = this.detailLink.length
            // console.log(length) //
            for(let i=0; i<length;i++){
                // console.log(length-1) //3
            //    console.log(this.detailLink[i+1]) 
                 if(this.currentI!== i&&((i<length-1 && postionY >=this.detailLink[i] && postionY< this.detailLink[i+1] )||
                  (i === length-1 && postionY>=this.detailLink[i] ))){
                     this.currentI = i
                     console.log(this.currentI)
                     this.$refs.nav.currentIndex  =  this.currentI

                 }
            }

          this.isBackTop = (postionY)>1000
       },
       backTopClick(){
          this.$refs.scroll.backTop(0,0,200)
       }
       ,
       //加入购物车
       addCart(){
           const goodsInfo ={}

           goodsInfo.image = this.topImages[0]
           goodsInfo.title = this.goods.title
           goodsInfo.desc = this.goods.desc
        goodsInfo.newPrice = this.goods.nowPrice;

           goodsInfo.iid = this.iid
           this.$store.dispatch('addCart',goodsInfo).then(res=>{
            //    console.log(res)
             this.$toast.show(res,2000)                
           })
        
       }
           
        
    }
}
</script> 
<style scoped>
.goods-detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
}
.content{
    height: calc(100% - 44px);
}
/* .content{
    position: absolute;
    top: 44px;
    bottom: 0px;
    left: 0;
    right: 0;
    overflow: hidden;
} */
.goods-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
}
</style>