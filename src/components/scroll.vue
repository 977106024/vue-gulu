<template>
    <div class="g-scroll" ref="parent">
        <div class="g-scroll-warp" ref="child">
            <slot></slot>
        </div>
        <div class="g-scroll-track">
            <div class="g-scroll-bar"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "guluScroll",
        mounted() {
            this.parent = this.$refs.parent
            this.child = this.$refs.child
            let translateY = 0
            this.parent.addEventListener('wheel',(e)=>{
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
                }else if(translateY < -this.maxHeight()){
                    translateY = -this.maxHeight()
                }else{
                    //只有在中间的时候 阻止滚动
                    e.preventDefault()
                }

                this.child.style.transform = `translateY(${translateY}px)`
            })
        },
        methods:{
            maxHeight(){
                let {height:parentHeight} = this.parent.getBoundingClientRect()
                let {height:childHeight} = this.child.getBoundingClientRect()
                let {borderTopWidth,borderBottomWidth,paddingTop,paddingBottom} = window.getComputedStyle(this.parent)
                //child高度减去第一屏
                return childHeight - parentHeight + (parseInt(borderTopWidth) + parseInt(borderBottomWidth) + parseInt(paddingTop) + parseInt(paddingBottom))
            }
        }
    }
</script>

<style lang="scss" scoped>
    .g-scroll{
        border: 1px solid red;
        transition:transform 1s ease;
        position: relative;
        &-wrap{
            border: 1px solid yellowgreen;
        }
        &-track{
            position: absolute;
            top: 0;
            right: 0;
            width: 14px;
            height: 100%;
            background: #fafafa;
            border-left: 1px solid #e8e7e8;
        }
    }
</style>