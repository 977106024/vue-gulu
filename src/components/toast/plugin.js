import toast from './Toast'

let currentToast
//vue插件写法
export default{
    install(Vue,options){
        Vue.prototype.$toast = function(message,toastOptions){
            if(currentToast){
                currentToast.close() //存在toast实列 就调用toast本身的销毁函数
            }
            currentToast = createdToast({
                Vue,
                message,
                propsData:toastOptions,
                onClose:()=>{ //点击关闭时 不需要重复调用currentToast.close()
                    currentToast = null
                }
            })
        }
    }
}



function createdToast({Vue,message,propsData,onClose}){
    let Constructor = Vue.extend(toast)
    let vm = new Constructor({ //创建toast
        propsData //props
    })
    vm.$slots.default = message //文字
    vm.$mount() //挂载到内存中
    vm.$on('close',onClose) //监听toast的$emit
    document.body.appendChild(vm.$el) //挂到页面上
    return vm
}