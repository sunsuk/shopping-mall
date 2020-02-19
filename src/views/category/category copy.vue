<template>
  
      <div class="wrapper" ref="aaa">
    <ul class="content">
        <button @click="btnClick">按钮</button>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
      <li>分类列表</li>
    </ul>
    </div>
  
</template>
<script >
import BScroll from 'better-scroll'
export default {
  data() {
    return {
        bscroll:null
    };
  },
  mounted(){
    //   console.log(document.querySelector('.wrapper')) 
    //   //better-scroll 需要通过一个大的div元素包裹起来 并设置高度
    //  this.scroll= new BScroll(document.querySelector('.wrapper'),{

    //   })
    //   this.scroll.on('scroll',(position)=>{
    //       console.log(position)
    //   })
    this.getPosition()
  },
  methods:{
     getPosition(){
         //默认情况下bs是无法实时监听滚动位置
         //probeType 监测 默认值是0 不监听 1 不监听
         // 2 在手指滚动过程中监测，手指离开的惯性滚动过程中不检测
         // 3 只要是滚动都监测
         //pullUpLoad 上拉加载更多
      this.bscroll = new BScroll(document.querySelector('.wrapper'),{
          probeType:3,
          pullUpLoad:true
      })
      this.bscroll.on('scroll',(positon)=>{
        //   console.log(positon)
      })
      this.bscroll.on('pullingUp',()=>{
          console.log('上拉加载') //只会打印一次
          //如需多次发送网络请求 请求更多数据 
          setTimeout(()=>{
              this.bscroll.finishPullUp()
          },2000)

      })
  },
  btnClick(){
    console.log('哈哈哈哈')
  }
 }
 
};
</script> 
<style >
.wrapper{
    height: 300px;
    background: red;


}
.content{
}
</style>