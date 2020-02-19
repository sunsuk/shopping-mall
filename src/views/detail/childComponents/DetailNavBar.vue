<template>
  <div>
    <nav-bar >
      <div slot='left' class="back" @click="backHome">
          <img src="~assets/img/common/back.svg" alt="" class="back">
     </div>  
     <div slot='center' class="title">
         <div v-for="(item,index) in goodsTitle" @click="itemClick(index)" :key="item.id" :class="{acitve:index===currentIndex}" >
           {{item.name}}
         </div>
     </div>
    </nav-bar>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  data(){
      return{
        goodsTitle:[
        {name:'商品',id:1},
        {name:'参数',id:2},
        {name:'评论',id:3},
        {name:'推荐',id:4}
         ],
         currentIndex:0
            
        
      }
  },
  components:{
      NavBar
  },
  mounted(){
      console.log(this.goodsTitle[1].name)
  },
  methods:{
      itemClick(index){
          this.currentIndex =index
          this.$emit('itemClick',index)
      },
      backHome(){
          this.$router.back()
      }
  }
}
</script>

<style scoped>
.title{
    display: flex;
    font-size: 12px;
}
.title div{
    flex: 1
}
.acitve{
    color:var(--color-high-text);
}
.back{
    vertical-align: middle;
}
</style>