 <template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.isEnd" >
        <a :href="item.link">
          <img :src="item.image" alt  @load="swiperLoad"/>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>
 
 <script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
    props:{
        banners:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
      return{
      isLoad:false //是否加载完成
      
      }
    },
    components:{
        Swiper,SwiperItem
    },
    methods:{
      swiperLoad(){
        if(!this.isLoad){
          //等待图片加载完成后再计算home 到tab-control的offsetTop
         this.$emit('swiperLoad')
          this.isLoad=true
        }
       
      }
    }
};
</script>
 
 <style>
</style>