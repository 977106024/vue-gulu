document.addEventListener('click',({target})=>{ //只绑定一个事件
    directives.forEach(item=>{
        if(item.el === target ||item.el.contains(target)){return} //关闭其他的组件指定
        item.callback()
    })
})

let directives = []
export default {
    bind:function(el,binding,vnode){
        directives.push({el,callback:binding.value})//把所有的这个指令放到数组中
    }
}