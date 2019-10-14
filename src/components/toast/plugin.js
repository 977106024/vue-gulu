import toast from './Toast'
//vue插件写法
export default{
    install(Vue,options){
        Vue.prototype.$toast = function(message,toastOptions){
            let Constructor = Vue.extend(toast)
            let vm = new Constructor({ //创建toast
                propsData:toastOptions //props
            })
            vm.$slots.default = message //文字
            vm.$mount() //挂载到内存中
            document.body.appendChild(vm.$el) //挂到页面上
        }
    }
}