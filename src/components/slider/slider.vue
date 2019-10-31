<template>
    <div class="g-slides">
        <div class="g-slides-window">
            <div class="g-slides-wrap">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            selected:String
        },
        mounted() {
           this.updateChildren()
        },
        updated(){
            this.updateChildren()
        },
        methods:{
            updateChildren(){
                let first = this.$children[0]
                let selected = this.selected || first.name
                this.$children.forEach(vm=>{
                    vm.visible = selected === vm.name
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .g-slides{
        display:inline-block;
        border:2px solid green;
        &-window{

        }
        &-wrap{
           position: relative;
        }
    }
</style>