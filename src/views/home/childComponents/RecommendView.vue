<template>
  <div class="recommend">
      <div v-for="item in recommends" :key="item.isEnd" class="recommend-item">
          <a :href="item.link">
              <img :src="item.image" alt="">
          </a>
          <div>{{item.title}}</div>
      </div>
  </div>
</template>

<script>
export default {
   props:{
       recommends:{
           type:Array,
           default(){
               return []
           }
       }
   }
}
</script>

<style>
.recommend{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 15px 0px 20px 0px;
    border-bottom: 10px solid #eee
}
.recommend-item img{
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
.recommend-item{
    flex:1;
}
</style>