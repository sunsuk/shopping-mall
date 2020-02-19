 //防抖函数
 export function dobounce(func,delay){
    let timer = null 
    return function(...args){
        //阻止 setTimeout() 方法执行函数 
        if (timer) clearTimeout (timer)
        //在事件执行N毫秒后 再执行函数 如果没有N毫秒就触发事件  则重新计时
        timer = setTimeout(()=>{
            //用apply指向调用debounce的对象 是scroll里面的refresh函数
        },delay)
    } 

}
//时间格式化函数
export function formatDate(date, fmt) {
  //获取年份 y+ = 1个或者多个 
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  };
  //补零操作
  function padLeftZero (str) {
    return ('00' + str).substr(str.length);
  };