// import Toast from './Toast.vue'
// const obj ={}
// obj.install=function(Vue){
//     //1 创建组件构造器
//     const toastCounstrctor  = Vue.extend(Toast)
//     //2用new的方式 根据组件构建器 创建出一个组件对象
//     const  toast = new toastCounstrctor()
//     //3将组件对象挂载到某个元素上
//     toast.$mount(document.createElement('div'))
//     //将toast 添加到body
//     document.body.appendChild(toast.$el)
//     //将toast的原型设置为Toast
//     Vue.prototype.$toast =Toast
// }
// //导出obj

// export default obj


import Toast  from './Toast.vue'

const obj = {}

obj.install = function(Vue){
	// 1.创建组件构造器
	const toastContrustor = Vue.extend(Toast)
	// 2.new的方式，根据组件构造器，创建组件对象
	const toast = new toastContrustor()
	// 3.需要将组件对象手动挂载到某一元素上
	toast.$mount(document.createElement('div'))
	// 4.toast.$el对应的就是div
	document.body.appendChild(toast.$el)
	
	
	Vue.prototype.$toast = toast
}

export default obj