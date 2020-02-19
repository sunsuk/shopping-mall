<template>
  <div class="tab-detail">
     
      <good-list-item v-for="(item,index) in cateDetailMsg" :key="index" :goodsItem='item'></good-list-item>
  
  </div>
</template>

<script>

import GoodListItem from 'components/content/goods/GoodsListItem'
export default {
components:{
    GoodListItem,
},
props:{
    cateDetailMsg:{
        
        
    }
}
}
</script>

<style scoped>
.tab-detail{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>