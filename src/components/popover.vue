<template>
    <div class="popover" @click="onClick">
        <div class="content-wrap" ref="contentWrap" v-if="visible">
            <slot name="content"></slot>
        </div>
        <span class="trigeerWrap" ref="trigeerWrap">
            <slot></slot>
        </span>
    </div>
</template>

<script>
    export default {
        name: "guluPopover",
        data:()=>({
            visible:false
        }),
        methods:{
            onClick(event){
                if(this.$refs.trigeerWrap.contains(event.target)){ //是否点击的是trigeer里面的元素(按钮)
                    console.log('里面')
                    this.visible = !this.visible
                    //关闭popover
                    if(this.visible){
                        // this.$nextTick(function(){
                        setTimeout(()=>{ //延时绑定时间 不然会一起触发click
                            document.body.appendChild(this.$refs.contentWrap) //放到body中 不然会被父元素overflow：hidden遮挡

                            //内容定位在按钮上方
                            let {top,left } = this.$refs.trigeerWrap.getBoundingClientRect()           //----------->这里获取的距离是视窗距离 如果有页面较长 有滚动部分就会定位偏差
                            this.$refs.contentWrap.style.top = `${top + window.scrollY}px`  //可视窗口 + 滚动距离 因为trigeer(按钮)相对于视窗 而content(弹出的内容)是相对于document定位。(document包含超出视窗的滚动条距离)
                            this.$refs.contentWrap.style.left = `${left + window.scrollX}px`

                            let eventHandler = (e)=>{ //原本用bind绑定this 但是bind会生成一个新函数
                                console.log(e.target)
                                if(!this.$refs.contentWrap.contains(e.target)){ //不是点击content 就不会触发document的click
                                    this.visible = false
                                    document.removeEventListener('click',eventHandler)//点击后删除事件
                                    console.log('关闭？')
                                }
                            }
                            document.addEventListener('click',eventHandler)//绑定事件
                        })
                        // })
                    }
                }else{
                    console.log('外面')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .popover{
        display: inline-block;
        position: relative;
    }
    /*该元素在body中，不在.popover元素下 要拿出来写*/
    .content-wrap{
        width: 80px;
        position: absolute;
        border: 1px solid #ddd;
        box-shadow: 0 0 3px rgba(0,0,0,.5);
        transform: translateY(-100%);
    }
</style>