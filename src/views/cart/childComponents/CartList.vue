<template>
  
     <div class="cart-list">
         <cart-list-item v-for="(item,index) in product " :key="index" :itemInfo='item'></cart-list-item>
     </div>
  
</template>

<script>
import CartListItem from './CartListItem'
export default { 
   data(){
       return{

       }
   },
   components:{
       CartListItem
   },
   computed:{
       product(){
           return this.$store.getters.product
       }
   }

}
</script>

<style scoped>

.content{
   height: 100%;

    overflow: hidden;
}
.cart-list{
    padding-top: 49px
}
</style>