<template>

   <div class="tab-bar-item" @click="itemClick">
       <!-- 插槽需要包装一层div防止替换后不是对应的东西 -->
 <!-- <slot v-if="!isActive" name='tab-icon'></slot> -->
    <div v-if="!isActive"><slot  name='tab-icon'></slot></div>
    <div v-else><slot name='tab-active-icon'></slot></div> 

   <div :style="activeStyle"><slot name='tab-text'></slot></div> 
<!-- 动态绑定style -->
   </div>     

</template>
<script >
export default{
    props:{
        path:String,
        activeColor:{
            type:String,
            default:'red'
        }
    },
    data(){
        return{
        }
    },
    computed:{
      isActive(){
            //   this.$route.path 当前处于活跃的路由路径
             return this.$route.path.indexOf(this.path) !== -1
         },
      activeStyle(){
          //如果处于活跃就绑定上默认的style
          return this.isActive? {color:this.activeColor} :{}
      }
      
    },
    methods:{
        itemClick(){
            this.$router.push(this.path)
            //   console.log(this.$route)

        }
    }
}
</script> 
<style>
.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px

}
.tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
    
}
.active{
    color: red;
}
</style>