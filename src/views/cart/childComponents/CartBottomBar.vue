<template>
  <div id="cart-bottom-bar">
      <div class="all-check-btn"> 
       <check-btn :isChecked='selectAll' @click.native='checkAll'></check-btn>
      <span>全选</span></div>
    <div class="total-price">
      合计 ：{{totalPrice}}
    </div>
    <div class="add-to" @click="goPay">
      去计算({{addTo}})
    </div>
  </div>
</template>

<script>
import CheckBtn from 'components/content/checkbtn/CheckBtn'
import {mapGetters} from 'vuex'
export default {
components:{
  CheckBtn
},
data(){
  return{
    message:'',
    length:''
  }
},
computed:{
  ...mapGetters(['product']),
  totalPrice(){
     //先将check=true的商品筛选出来 再计算

     return "￥"+this.$store.getters.product.filter(item=>{return item.checked}).reduce((price,item)=>{
       return price + item.newPrice *item.count
     },0).toFixed(2)  ////默认值 必须传
     //reduce((total,item),Value) total 相当于默认值 Value  item 当前元素  数组中的每个值（从左到右）开始缩减，最终计算为一个值。
  },
  addTo(){
     return this.length = this.$store.getters.product.filter(item=>{return item.checked}).length
  },
  
  selectAll(){
     if(this.product.length===0) return false
    return !(this.product.find(item=>{return (!item.checked)}))
},
},
methods:{
  checkAll(){  //如果是全部选中 就让它全部不选中
    if(this.selectAll){
     this.product.forEach(element => {
      element.checked =false
    })
    }else{//如果部分选中或者没有一个选中 就等于全部选中
      this.product.forEach(item=>{
        item.checked =true
      })
    }
    
  },
  goPay(){
    console.log(this.length)
  if(this.length===0){
    this.$toast.show('未选择任何商品',2000)                

  }
}
},

  
}
</script>

<style>
#cart-bottom-bar{
    background: #eee;
    width: 100%;
    position: fixed;
    bottom: 49px;
    display: flex;
    height: 40px;
    font-size: 14px;
    align-items: center
}
.all-check-btn{
  display: flex;
  margin-left: 4px;
  margin-right: 5px;
  width: 70px
}
.total-price{
  flex: 1;
}
.add-to{
  width: 100px;
  height: 40px;
  line-height: 40px;
  background-color: orangered;
  color: #fff;
  text-align: center;
}
</style>