<template>
    <div class="tabs-head">
        <slot></slot>
        <div class="line" ref="line"></div>
        <div class="actions-wrap">
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name:'guluTabsHead',
        inject:['eventBus'],
        mounted() {
            this.eventBus.$on('update:selected',(item,vm)=>{
                let {width} = vm.$el.getBoundingClientRect() //这里的left是相对于视窗的有bug
                let left = vm.$el.offsetLeft
                this.$refs.line.style.width = `${width}px`
                this.$refs.line.style.left = `${left}px`
            })
        }
    }
</script>

<style lang="scss" scoped>
    $tabs-height:40px;
    $border-color:blue;
    .tabs-head{
        height: $tabs-height;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border: 1px solid red;
        position: relative;
        .line{
            position: absolute;
            left: 0;
            bottom: 0;
            border: 1px solid $border-color;
            /*翻译 翻转*/
            transition: all 350ms;
        }
        .actions-wrap{
            margin-left: auto;
        }
    }
</style>