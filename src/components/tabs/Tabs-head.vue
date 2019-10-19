<template>
    <div class="tabs-head">
        <slot></slot>
        <div class="line"></div>
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
                console.log(item,vm.$el,'header组件')
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
            width: 100px;
            border: 1px solid $border-color;
        }
        .actions-wrap{
            margin-left: auto;
        }
    }
</style>