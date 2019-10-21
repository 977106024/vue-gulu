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
            this.checkChildren()
            this.selectTab()
        },
        methods:{
            checkChildren(){
                if(this.$children.length === 0){
                    console && console.warn &&
                    console.warn('tabs子组件应该是tabs-head和tabs-body,但你没写子组件。')
                }
            },
            selectTab(){
                this.$children.forEach(vm=>{
                    if(vm.$options.name === 'guluTabsHead'){ //tabs的子元素是head
                        vm.$children.forEach(itemVm=>{
                            if(itemVm.$options.name === 'guluTabsItem' && itemVm.name === this.selected){ //head的子元素是item 并且name是选中的这个
                                this.eventBus.$emit('update:selected',this.selected,itemVm) //通知事件中心 用户默认选中
                            }
                        })
                    }
                })
            }
        }

    }
</script>

<style lang="scss" scoped>

</style>