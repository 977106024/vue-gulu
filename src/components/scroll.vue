<template>
    <div class="g-scroll" ref="parent">
        <div class="g-scroll-warp" ref="child">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "guluScroll",
        mounted() {
            const parent = this.$refs.parent
            const child = this.$refs.child
            let translateY = 0
            parent.addEventListener('wheel',(e)=>{
                //滑动的快与慢 一次滑的多就滚的多 大于20就算多
                if(e.deltaY > 20){
                    translateY -= 20 * 3
                }else if(e.deltaY < -20){
                    translateY -= -20 * 3
                }else {
                    translateY -= e.deltaY * 3
                }

                //滚动 不能穿过底部 顶部
                if(translateY > 0){
                    translateY = 0
                }else if(translateY < -maxHeight){
                    translateY = -maxHeight
                }
            })
        }
    }
</script>

<style lang="scss" scoped>
    .g-scroll{
        border: 1px solid red;
        transition:transform 1s ease;
        &-wrap{
            border: 1px solid yellowgreen;
        }
    }
</style>