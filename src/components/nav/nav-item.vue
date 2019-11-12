<template>
    <div class="g-nav-item" :class="{selected,vertical}" @click="onClick">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "guluNavItem",
        inject:['root','vertical'],
        props:{
            name:{
                type:[String,Number],
                require:true
            },
        },
        data:()=>({
            selected:false
        }),
        created(){
          this.root.addItem(this)
        },
        methods:{
            onClick(){
                this.root.namePath = []
                this.$parent.updateNamePath && this.$parent.updateNamePath()
                this.$emit('update:selected',this.name)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .g-nav-item{
        padding:10px 20px;
        position: relative;
        &:not(.vertical){
            &.selected{
                &::after{
                    content: '';
                    width: 100%;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    border-bottom: 2px solid blue;
                }
            }
        }
        &.vertical{
            &.selected{
                color: red;
            }
        }
    }
    .g-sub-nav .g-nav-item:not(.vertical){
        &.selected{
            background: #aaa;
            &::after{
                display: none;
            }
        }
    }
</style>