<template>
<div>
    <nav-bar class="cart-nav clearfix" ><div slot='center'>购物车({{length}})</div></nav-bar>
    <cart-list class="list"></cart-list>
    <cart-bottom-bar ></cart-bottom-bar>
</div>
</template>
<script >
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComponents/CartList'
import CartBottomBar from './childComponents/CartBottomBar'
export default{
    data(){
        return{

        }
    },
    components:{
        NavBar,
        CartList,
        CartBottomBar
    },
    computed:{
        length(){
            // this.$store.commit('addCart',this.$store.state.cartList.length)
           return  this.$store.getters.length
        }
    },
    methods:{
        payFor(){

        }
    }
}
</script> 
<style scoped>
.cart-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
   height: 100vh;
   z-index: 999;
}
.list{
    margin-bottom: 89px;
}
</style>