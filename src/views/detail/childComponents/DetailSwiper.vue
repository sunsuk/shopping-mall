<template>
  <div>
      <swiper class="detail-swiper">
          <swiper-item v-for="item in topImages" :key="item.index">
              <img :src="item">
          </swiper-item>
      </swiper>

  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
    props:{
       topImages:{ 
        type:Array,
        default(){
            return []
         }
        }
    },
    data(){
        return{}
    },
    components:{
        Swiper,SwiperItem
    }
}
</script>

<style>
.detail-swiper{
    height: 300px;
    overflow: hidden;
}
</style>