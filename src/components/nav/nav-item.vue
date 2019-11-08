<template>
    <div class="g-nav-item" :class="{selected}" @click="onClick">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "guluNavItem",
        inject:['root'],
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
          this.root(this)
        },
        methods:{
            onClick(){
                this.$emit('add:selected',this.name)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .g-nav-item{
        padding:10px 20px;
        &.selected{
            background: #aaa;
         }
    }
</style>