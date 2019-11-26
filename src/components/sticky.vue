<template>
    <div class="g-sticky-wrap" ref="wrap" :style="{height}">
        <div class="g-sticky" :class="{sticky}" :style="{width,left}">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "guluSticky",
        data:()=>({
            sticky:false,
            width:undefined,
            height:undefined,
            left:undefined
        }),
        mounted(){
            let top = this.top()
            window.addEventListener('scroll',()=>{
                if(window.scrollY > top){ //滚动的距离 超过 滚动距离+离顶部距离
                    let {width,height,left} = this.$refs.wrap.getBoundingClientRect()
                    this.width = width + 'px'
                    this.height = height + 'px'
                    this.left = left + 'px'
                    this.sticky = true
                }else{
                    this.sticky = false
                }
            })
        },
        methods:{
            top(){
                let {top} = this.$refs.wrap.getBoundingClientRect()
                return top + window.scrollY //可能页面停留在已滚动状态 这个时候window.scrollY 有值 但top是负值
            }
        }
    }
</script>

<style lang="scss" scoped>
    .g-sticky{
        &.sticky{
            background: red;
            position:fixed;
            top: 0;
            left: 0;
            width: 100%;
        }
    }
</style>