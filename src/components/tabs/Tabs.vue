<template>
    <div class="tabs">
        <slot></slot>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        name:'guluTabs',
        props:{
            selected:{
                type:String,
                require:true
            },
            direction:{
                type:String,
                default:'horizontal',
                validator(value){
                    return ['horizontal','vertical'].indexOf(value) >= 0
                }
            }
        },
        //依赖注入
        provide:function(){
            return {
                eventBus:new Vue()
            }
        },
        created() {
            // this.$emit('update:selected','tab3') //触发.sync
        }
    }
</script>

<style lang="scss" scoped>

</style>