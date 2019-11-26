<template>
    <div class="g-sticky-wrap" ref="wrap" :style="{height}"> <!-- height 解决滚动条bug -->
        <div class="g-sticky" :class="{sticky}" :style="{width,left,top}"> <!--width,left解决居中问题 -->
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "guluSticky",
        props:{
          distance:{ //距离顶部距离
              type:Number,
              default:0
          }
        },
        data:()=>({
            sticky:false,
            width:undefined,
            height:undefined,
            left:undefined,
            top:undefined
        }),
        mounted(){
            window.addEventListener('scroll',this.scrollHandler)
        },
        beforeDestroy(){
          window.removeEventListener('scroll',this.scrollHandler)
        },
        methods:{
            offsetTop(){
                let {top} = this.$refs.wrap.getBoundingClientRect()
                return top + window.scrollY //可能页面停留在已滚动状态 这个时候window.scrollY 有值 但top是负值
            },
            scrollHandler(){
                let top = this.offsetTop()
                if(window.scrollY > top - this.distance){ //滚动的距离 超过 滚动距离+离顶部距离 2.顶部距离-distance 还没到顶部就要sticky
                    let {width,height,left} = this.$refs.wrap.getBoundingClientRect()
                    this.width = width + 'px'
                    this.height = height + 'px'
                    this.left = left + 'px'
                    this.top = this.distance + 'px'
                    this.sticky = true
                }else{
                    this.width = undefined
                    this.height = undefined
                    this.left = undefined
                    this.top = undefined
                    this.sticky = false
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .g-sticky{
        &.sticky{
            background: red;
            position:fixed;
        }
    }
</style>