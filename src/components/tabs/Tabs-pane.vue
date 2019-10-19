<template>
    <div class="tabs-pane" v-if="active">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name:'guluTabsPane',
        props:{
          name:{
              type:String,
              require:true
          }
        },
        data:()=>({
           active:false
        }),
        //拿到tabs的注入
        inject:['eventBus'],
        created() {
            this.eventBus.$on('update:selected',(name)=>{
                console.log(name,'pane组件')
                this.active = name === this.name
            })
        },

    }
</script>

<style lang="scss" scoped>
    .tabs-pane{
    }
</style>