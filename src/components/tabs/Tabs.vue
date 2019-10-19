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
        data:()=>({
           eventBus: new Vue()
        }),
        //依赖注入
        provide:function(){
            return {
                eventBus:this.eventBus
            }
        },
        mounted() {
            this.eventBus.$emit('update:selected',this.selected) //通知事件中心 用户默认选中
        }

    }
</script>

<style lang="scss" scoped>

</style>