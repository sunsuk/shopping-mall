<template>
  <div class="toast" v-show="isShow">
      <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  data(){
      return {
          message:'加入购物车成功',
          isShow:false
      }
  },
methods:{
  show(mes,time=2000){
    this.message= mes
    this.isShow = true
    setTimeout(()=>{
      this.isShow=false
      this.message=''
    },time)
  }
}
}
</script>

<style>
.toast{
   	position: fixed;
		top:50%;
		left: 50%;
		padding: 8px 10px;
		/* 文字偏移 */
		
		transform: translate(-50%, -50%);
		background-color: rgba(0,0,0,.7);
		color: white;
		font-family: "微软雅黑";
		font-size: 15px;
		z-index: 999;
}
</style>