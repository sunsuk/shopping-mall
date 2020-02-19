<template>
  <div id="category"> 
      <nav-bar class="cate-nav">
        <div slot="center">商品分类</div>
      </nav-bar>
      <div class="content">
      <tab-menu :categories='categories' @seletItem='itemClick' ></tab-menu>
       <scroll id="tab-content" :data='[categoryData]'>
          <div>
              <tab-content-category :subcategories='showsubcategories'></tab-content-category>
              <tab-control :titles="['综合','新品','销量']" @itemClick='tabClick'></tab-control>
              <tab-cotent-detail :cateDetailMsg='showCategoryDetail'></tab-cotent-detail>
          </div>
       </scroll>
      </div>
    分类
  </div>
</template>
<script >
import NavBar from 'components/common/navbar/NavBar'
import TabMenu from './childeComps/TabMenu'
import TabControl from 'components/content/tabControl/TabControl'
import TabContentCategory from './childeComps/TabContentCategory'
import TabCotentDetail from './childeComps/TabContentDetail'
import Scroll from 'components/common/scroll/Scroll'

import {getCategory, getSubcategory, getCategoryDetail} from "network/category";

export default{
 components:{
   NavBar,
   TabMenu,
   Scroll,
   TabContentCategory,
   TabControl,
   TabCotentDetail
 },
 data(){
   return{
     categories:[], //商品类别名称 
     categoryData:{}, //商品子类别
     currentIndex:-1,
     currentType:'pop',//当前默认显示的商品类型

   }
 },
 computed:{
   showsubcategories(){
     if(this.currentIndex===-1) return {}
     return this.categoryData[this.currentIndex].subcategories 
   },
   showCategoryDetail(){
     if(this.currentIndex ==-1) return {}
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
   }
 },
 created(){
   this._getCategory()
 },
 methods:{
   tabClick(index){
     switch(index){
       case 0:
       this.currentType='pop'
       break
       case 1:
       this.currentType='new'
       break
       case 2:
       this.currentType = 'sell'

     }
     console.log(index)
   },
   _getCategory(){
     //请求分类数据
     getCategory().then(res=>{
      this.categories = res.data.category.list
      //初始化每个类别的子数据
      for(let i=0;i<this.categories.length;i++){
        this.categoryData[i]={
          subcategories:{},
          categoryDetail:{
            'pop':[],
            'new':[],
            'sell':[]
          }

        }
      }
      this._getSubcategory(0)
     })
   },
   itemClick(index){
    this._getSubcategory(index)

   },
   _getSubcategory(index){
        this.currentIndex =index
        //类别每一个index的 maitkey
       const maitKey = this.categories[index].maitKey
       //获取每一类别的详情信息
        getSubcategory(maitKey).then(res=>{
          //每一类别对应的数据
         this.categoryData[index].subcategories =res.data
         this.categoryData = {...this.categoryData}
        //  console.log( typeof this.categoryData[index].subcategories)
        this._getCategoryDetail('pop')
        this._getCategoryDetail('new')
        this._getCategoryDetail('sell')

        })

   },
   _getCategoryDetail(type){
     //获取请求的minwallkey
     const miniWallkey = this.categories[this.currentIndex].miniWallkey
     //发送请求 传入type 和 minwallkey
     getCategoryDetail(miniWallkey,type).then(res=>{
      //  console.log(res) //每种类型的详情
      this.categoryData[this.currentIndex].categoryDetail[type] =res 
      console.log(...this.categoryData)
      this.categoryData = {...this.categoryData}

   
     })
   }

 }
}

</script> 
<style >

.cate-nav{
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
    z-index: 10;
}
#category{
   height: 100vh;
}
.content{
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  display: flex;
}
#tab-content{
  height: 100%;
  flex: 1
}
  </style>