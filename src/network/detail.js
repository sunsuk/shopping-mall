//商品详情
import {request} from './request'
export function getDetail (iid){
   return  request({
         url:'/detail',
         params:{
             iid
         }
    })
}
export class Goods{
    constructor(itemInfo,columns,services){
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrcice = itemInfo.oldPrcice
        this.discount = itemInfo.discountDesc
        this.services = services
        this.columns = columns
        this.realPrice =itemInfo.lowNowPrice
        this.nowPrice = itemInfo.highNowPrice;


    }
}
export class Shop {
    constructor(shopInfo) {
      this.logo = shopInfo.shopLogo;
      this.name = shopInfo.name;
      this.fans = shopInfo.cFans;
      this.sells = shopInfo.cSells;
      this.score = shopInfo.score;
      this.goodsCount = shopInfo.cGoods
    }
  }
  export class GoodsParam {
    constructor(info, rule) {
      // 注: images可能没有值(某些商品有值, 某些没有值)
      this.image = info.images ? info.images[0] : '';
      this.infos = info.set;
      this.sizes = rule.tables;
    }
  }
  //推荐商品
  export function getRecomend(){
    return request({
      url:'/recommend'
    })
  }