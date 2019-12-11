<template>
    <div class="g-scroll" ref="parent">
        <div class="g-scroll-warp" ref="child">
            <slot></slot>
        </div>
        <div class="g-scroll-track">
            <div class="g-scroll-bar" ref="bar" @mousedown="onMouseDownScrollBar"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "guluScroll",
        data:()=>({
            isScrolling:false,
            startPosition:undefined,
            endPosition:undefined,
            translateX:0,
            translateY:0,
        }),
        mounted() {
            document.addEventListener('mousemove',(e)=>{
                this.onMouseMoveScrollbar(e)
            })
            document.addEventListener('mouseup',()=>{
                this.onMouseUpScrollbar()
            })

            this.parent = this.$refs.parent
            this.child = this.$refs.child
            let translateY = 0

            let {height:parentHeight} = this.parent.getBoundingClientRect()
            let {height:childHeight} = this.child.getBoundingClientRect()

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
                this.updateScrollBar(parentHeight,childHeight,translateY)
            })
        },
        methods:{
            maxHeight(){
                let {height:parentHeight} = this.parent.getBoundingClientRect()
                let {height:childHeight} = this.child.getBoundingClientRect()
                let {borderTopWidth,borderBottomWidth,paddingTop,paddingBottom} = window.getComputedStyle(this.parent)
                //child高度减去第一屏
                return childHeight - parentHeight + (parseInt(borderTopWidth) + parseInt(borderBottomWidth) + parseInt(paddingTop) + parseInt(paddingBottom))
            },
            updateScrollBar(parentHeight,childHeight,translateY){
                const barHeight = parentHeight * parentHeight / childHeight
                let bar = this.$refs.bar
                bar.style.height = barHeight + 'px'
                let y = parentHeight * translateY / childHeight
                bar.style.transform = `translateY(${-y}px)`
            },
            onMouseDownScrollBar(e){
                this.isScrolling = true //准备开始移动
                const {screenX,screenY} = e
                this.startPosition = {x:screenX,y:screenY} //记录开始位置
            },
            onMouseMoveScrollbar(e){
                if(!this.isScrolling)return //只要鼠标移动就会触发move事件 所以在按下时才是true
                const {screenX,screenY} = e
                this.endPosition = {x:screenX,y:screenY}
                const delta = {x:this.endPosition.x - this.startPosition.x,y:this.endPosition.y - this.startPosition.y}
                this.translateX = parseInt(this.translateX) + delta.x
                this.translateY = parseInt(this.translateY) + delta.y
                this.startPosition = this.endPosition
                this.$refs.bar.style.transform = `translate(0px,${this.translateY}px)`
            },
            onMouseUpScrollbar(e){
                this.isScrolling = false
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
        &-bar{
            position: absolute;
            top: -1px;
            left: 50%;
            margin-left: -4px;
            height: 20px;
            width: 8px;
            border-radius: 4px;
            background: #C2C2C2;
            margin-top: 5px;
            &:hover{
                background: #7d7d7d;
            }
        }
    }
</style>