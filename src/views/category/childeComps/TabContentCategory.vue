<template>
  <div class="tab-conten-category">
   
      <div class="item" v-for="(item,index) in subcategories.list" :key="index">
          <a :href="item.link">
              <img :src="item.image" alt="" class="item-img">
              <div class="item-text">{{item.title}}</div>
          </a>
      </div>
    
  </div>
</template>

<script>
export default {
    
props:{
   subcategories:{
       type:Object,
       default(){
           return {}
       }
   } 
},
components:{
}
}
</script>

<style scoped>
.tab-conten-category {
   display: flex;
    flex-wrap: wrap;
    padding: 10px 8px;
    justify-content: space-around;
  }

  .item {
   text-align: center;
    font-size: 3.2vw;
    /* display: flex; */
    width: 64px;
    margin-left: 10px;
    margin-top: 15px
  }

  .item-img {
    width: 80%;
  }

  .item-text {
    margin-top: 15px;
  }
</style>