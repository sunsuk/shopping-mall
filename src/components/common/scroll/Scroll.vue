<template>
<!-- ref 如果绑定在组件/元素上 那么通过this.refs.name拿到的是组件/元素对象 -->
  <div  ref='wrapper'>
     <div ><slot></slot></div> 
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    },
    data:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
      return{
          scroll:null
      }
  },
  mounted(){
      this.getScroll()
      this.getPosition()
      this.getPullLoad()
  },
  methods:{
      getScroll(){
          this.scroll = new BScroll(this.$refs.wrapper,{
              probeType:this.probeType,//监测屏幕滚动
              pullUpLoad:this.pullUpLoad,//上拉加载更多 到底部自动触发
              click:true //组件内部是否可以点击 button不论是否设置都可以点击
          })
      },
      backTop(x,y,time){
      this.scroll  &&  this.scroll.scrollTo(x,y,time)
      },
      getPosition(){
        this.scroll.on('scroll',(position)=>{
          this.$emit('scroll',position)
        })
      },
      getPullLoad(){
         // pullingUp 只会加载一次
          //如需多次发送网络请求 finishPullUp  请求更多数据  上拉加载更多
        this.scroll.on('pullingUp',()=>{ 
          this.$emit('pullingUp')
        })
      },
      getFinsh(){
       this.scroll  && this.scroll.finishPullUp()
      },
      refresh(){
       this.scroll  && this.scroll.refresh()
      },
      getSaveY(){
        //this.scroll.y scroll的y坐标
       return this.scroll.y ? this.scroll.y :0
      }
  },
  watch:{
    data(){
      setTimeout(this.refresh,20)
    }
  }
}
</script>

<style scoped>

</style>