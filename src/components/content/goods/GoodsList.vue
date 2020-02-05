<template>
  <div class="goods">
     <goods-list-item v-for="item in goods" :key="item.title" :goodsItem='item'></goods-list-item> 
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