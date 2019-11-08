<template>
    <div class="g-sub-nav">
        <span @click="onClick">
            <slot name="title"></slot>
        </span>
        <div class="g-sub-nav-popover" v-show="open">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "guluSubNav",
        data:()=>({
            open:false
        }),
        methods:{
            onClick(){
                this.open = !this.open
            }
        }
    }
</script>

<style lang="scss" scoped>
    .g-sub-nav{
        position:relative;
        >span{
            padding: 10px 20px;
            display: inline-block;
            vertical-align: top;
        }
        &-popover{
            position: absolute;
            top: 100%;
            left: 0;
            border: 1px solid black;
            white-space: nowrap;
        }
    }
</style>