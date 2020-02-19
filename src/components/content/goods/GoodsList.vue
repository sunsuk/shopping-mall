<template>
  <div class="goods">
     <goods-list-item v-for="(item,index) in goods"  :goodsItem='item' :key="index" @imgLoad='loadOk'></goods-list-item> 
     <!-- {{goods}} -->
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
props:{
  goods:{
    type:Array,
    default(){
      return []
    }
  }
},
components:{
  GoodsListItem
},
methods:{
  loadOk(){
    this.$emit('loadOk')
  }
}
}
</script>

<style>
.goods{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 2px;
}
</style>