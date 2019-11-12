<template>
    <div class="g-sub-nav" :class="{active,vertical}" v-click-outside="close">
        <span class="g-sub-nav-label" @click="onClick">
            <slot name="title"></slot>
            <span class="g-sub-nav-icon" :class="{open,vertical}">
                <g-icon name="right"></g-icon>
            </span>
        </span>
        <transition name="x" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
            <div class="g-sub-nav-popover" :class="{vertical}" v-show="open">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
    import ClickOutside from '@/assets/click-outside'
    export default {
        name: "guluSubNav",
        directives:{ClickOutside},
        inject:['root','vertical'],
        props:{
          name:{
              type:String,
              require:true
          }
        },
        data:()=>({
            open:false,
        }),
        computed:{
          active(){
              return this.root.namePath.indexOf(this.name) >= 0 ? true : false
          }
        },
        methods:{
            onClick(){
                this.open = !this.open
            },
            updateNamePath(){
                this.root.namePath.unshift(this.name)
                this.$parent.updateNamePath && this.$parent.updateNamePath()
            },
            close(){
                this.open = false
            },
            enter(el,done){
                let {height} = el.getBoundingClientRect()
                el.style.height = 0 //获取完初始化0
                el.getBoundingClientRect() //迫使浏览器渲染
                el.style.height = `${height}px` //设置高度 打开
                el.addEventListener('transitionend',()=>{ //等动画结束再done
                    done()
                })
            },
            afterEnter(el) {
                el.style.height = 'auto'
            },
            leave(el,done){
                    let {height} = el.getBoundingClientRect()
                    el.style.height = `${height}px`
                    el.getBoundingClientRect()
                    el.style.height = 0
                    el.addEventListener('transitionend',()=>{
                        done()
                    })
            },
            afterLeave(el){
                el.style.height = 'auto'
            }

        }
    }
</script>

<style lang="scss" scoped>
    .g-sub-nav{
        position:relative;
        >.g-sub-nav-label{
            padding: 10px 20px;
            display: inline-block;
            vertical-align: top;
            >.g-sub-nav-icon{
                display: none;
            }
        }
        &-popover{
            position: absolute;
            top: 100%;
            left: 0;
            white-space: nowrap;
            margin-top: 1px;
            box-shadow: 0 0 3px fade_out(black,.8);
            border-radius:4px;
            transition:height 1s;
            &.vertical{
                position:static;
                box-shadow: none;
                overflow: hidden;
            }

        }
        .g-sub-nav-popover {
            top: 0;
            left: 100%;
        }
        &.active:not(.vertical){
            &::after{
                content: '';
                width: 100%;
                position: absolute;
                bottom: 0;
                left: 0;
                border-bottom: 2px solid blue;
            }
        }
        .g-sub-nav{
            &::after{
                display: none;
            }
            .g-sub-nav-icon{
                display: inline-block;
                transition:transform 250ms;
                &.vertical{
                    transform: rotate(90deg);
                    &.open{
                        transform: rotate(270deg);
                    }
                }
                &.open{
                    transform: rotate(180deg);
                }
            }
        }
    }
</style>