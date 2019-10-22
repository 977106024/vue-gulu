<template>
    <div class="popover" @click="onClick" ref="popover">
        <div class="content-wrap" ref="contentWrap" v-if="visible" :class="`position-${position}`">
            <slot name="content"></slot>
        </div>
        <span class="trigeerWrap" ref="trigeerWrap" style="display: inline-block;">
            <slot></slot>
        </span>
    </div>
</template>

<script>
    export default {
        name: "guluPopover",
        props:{
            position:{
                type:String,
                default:'top',
                validator(value){
                    return ['top','left','bottom','right'].indexOf(value) >= 0
                }
            }
        },
        data:()=>({
            visible:false
        }),
        methods:{
            positionContent(){
                const {contentWrap,trigeerWrap} = this.$refs
                document.body.appendChild(contentWrap)
                let {top,left,height,width} = trigeerWrap.getBoundingClientRect()
                let {height:contentHeight} = contentWrap.getBoundingClientRect()
                const positions = { //表驱动编程 逻辑注释在commit中
                    top:{
                        top:top + window.scrollY,
                        left:left + window.scrollX
                    },
                    left:{
                        top:top + (height - contentHeight)/2 + window.scrollY,
                        left:left + window.scrollX
                    },
                    right:{
                        top:top + (height - contentHeight)/2 + window.scrollY,
                        left:left + width+ window.scrollX
                    },
                    bottom:{
                        top:top + height + window.scrollY,
                        left:left + window.scrollX
                    }
                }

                contentWrap.style.top = positions[this.position].top + 'px'
                contentWrap.style.left = positions[this.position].left + 'px'
            },
            onClickDocument (e){ //原本用bind绑定this 但是bind会生成一个新函数
                if(this.$refs.popover &&                                      //1.点击popover不会触发(点击按钮触发两次关闭bug) 2.点击content 就不会触发document的click
                    (this.$refs.popover === e.target || this.$refs.contentWrap.contains(e.target)))
                { return }
                this.close()
            },
            open(){ //打开时 先定位 然后绑定document事件 等下次点击时可以冒泡关闭 但是点击content不会触发
                this.visible = true
                // this.$nextTick(function(){ //err nextTick不知道为啥不行
                setTimeout(()=>{ //延时绑定时间 不然会一起触发click
                    this.positionContent()
                    document.addEventListener('click',this.onClickDocument)//绑定事件
                },0)
                // })
            },
            close(){ //关闭时 关闭和移出document上的点击事件
                this.visible = false
                document.removeEventListener('click',this.onClickDocument)//点击后删除事件
            },
            onClick(event){
                if(this.$refs.trigeerWrap.contains(event.target)){ //是否点击的是trigeer里面的元素(按钮)
                    if(!this.visible){
                        this.open()
                    }else{
                        this.close()
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    $border-color:#333;
    $border-radius:4px;
    .popover{
        display: inline-block;
        position: relative;
    }
    /*该元素在body中，不在.popover元素下 要拿出来写*/
    .content-wrap{
        max-width: 20em;
        position: absolute;
        border: 1px solid $border-color;
        border-radius: $border-radius;
        /*box-shadow: 0 0 3px rgba(0,0,0,.5);*/
        filter:drop-shadow(0 1px 1px rgba(0,0,0,.5));
        background: white;
        padding: .4em 1em;
        word-break: break-all;/*英文换行*/
        &::after,&::before{
            content: '';
            display: block;
            border: 10px solid transparent;
            width: 0px;
            height: 0px;
            position: absolute;
        }
        &.position-top{
            transform: translateY(-100%);
            margin-top: -10px;
            &::after,&::before{
                left: 10px;
            }
            &::before{
                border-top-color: black;
                top: 100%;
            }
            &::after{
                border-top-color: white;
                top: calc(100% - 1px);
            }
        }
        &.position-bottom{
            margin-top: 10px;
            &::after,&::before{
                left: 10px;
            }
            &::before{
                border-bottom-color: black;
                bottom: 100%;
            }
            &::after{
                border-bottom-color: white;
                bottom: calc(100% - 1px);
            }
        }
        &.position-left{
           transform: translateX(-100%);
            margin-left: -10px;
            &::after,&::before{
                top: 50%;
                transform: translateY(-50%);
            }
            &::before{
                border-left-color: black;
                left: 100%;
            }
            &::after{
                border-left-color: white;
                left: calc(100% - 1px);
            }
        }
        &.position-right{
            margin-left: 10px;
            &::after,&::before{
                top: 50%;
                transform: translateY(-50%);
            }
            &::before{
                border-right-color: black;
                right: 100%;
            }
            &::after{
                border-right-color: white;
                right: calc(100% - 1px);
            }
        }
    }
</style>