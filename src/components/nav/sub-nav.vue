<template>
    <div class="g-sub-nav" :class="{active}" v-click-outside="close">
        <span class="g-sub-nav-label" @click="onClick">
            <slot name="title"></slot>
            <span class="g-sub-nav-icon" :class="{open}">
                <g-icon name="right"></g-icon>
            </span>
        </span>
        <transition name="x">
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
           .g-sub-nav .g-sub-nav-popover {
                top: -20%;
                left: 100%;
            }
            &.vertical{
                position:static;
                box-shadow: none;
            }

        }
        &.active{
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
                &.open{
                    transform: rotate(180deg);
                }
            }
        }
        .x-enter,.x-leave-to{
            height: 100%;
        }
        .x-enter-active,.x-leave-active{
            transition: all 2s;
        }
    }
</style>