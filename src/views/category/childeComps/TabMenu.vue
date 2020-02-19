<template>
<Scroll id="tab-menu">
    <div class="menu-list" >
    <div class="menu-list-item" :class="{active:index===currentIndex}" v-for="(item,index) in categories"
     :key="index" @click="itemClick(index)">
        {{item.title}}
    </div>
  </div>
</Scroll>
  
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
export default {
components:{
    Scroll
},
props:{
    categories:{
        type:Array,
        default(){
            return []
        }
    }
},
data(){
  return{
      currentIndex:0
  }
},
methods:{
    itemClick(index){
       this.currentIndex = index
       this.$emit('seletItem',index)
    }
}
}
</script>

<style scoped>
#tab-menu{
    height: 100%;
    width: 100px;
    background-color: #f6f6f6;
    box-sizing: border-box;
}
.menu-list-item{
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
 }
.menu-list-item.active{
    border-left:  3px solid var(--color-high-text);
    font-weight: 700;
    background-color: #fff;
    color: var(--color-height-text)

}
</style>
