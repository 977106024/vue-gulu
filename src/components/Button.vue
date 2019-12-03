<template>
    <button class="g-button" :class="{[`icon-${iconPosition}`]:true}" @click="$emit('click')">
        <div v-if="loading" class="loading icon">
            <g-icon name="loading"></g-icon>
        </div>

        <div class="icon" v-if="icon && !loading">
            <g-icon :name="icon"></g-icon>
        </div>

        <div class="content">
            <slot></slot>
        </div>
    </button>
</template>

<script>
    export default {
        props:{
            icon:{},
            loading:{
                type:Boolean,
                default: false
            },
            iconPosition:{
                type:String,
                default:"left",
                validator (value) {
                    // return !(value !== 'left' && value !== 'right')
                    //老师的写法很简洁
                    return value === 'left' || value === 'right'; // true || true 返回true 否则返回false webStorm可以优化代码
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @keyframes spin {
        0%{
            transform: rotate(0deg);
        }100%{
            transform: rotate(360deg)
                 }
    }
    .g-button {
        font-size: var(--font-size);
        height: var(--button-height);
        padding: 0 1em;
        border-radius: var(--border-radius);
        border: 1px solid var(--border-color);
        background: var(--button-bg);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        &:hover {
            border-color: var(--border-color-hover);
        }
        &:active {
            background-color: var(--button-active-bg);
        }
        &:focus {
            outline: none;
        }
        >.loading{
            /*无限转动 线性*/
            animation: 1s spin infinite linear;
        }
        >.icon{
            order: 1;
            margin-right: .1em;
        }
        >.content{
            order: 2;
        }
        &.icon-right{
            &>.icon{
                order: 2;
                margin-right: 0;
                margin-left: .1em;
            }
            &>.content{
                order: 1;
            }
        }
        & + &{
            margin-left: 4px;
        }
    }
</style>