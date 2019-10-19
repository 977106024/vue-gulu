<template>
    <div class="tabs-item" @click="xxx" :class="{active:active}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name:'guluTabsItem',
        props:{
            disabled:{
                type:Boolean,
                default:false
            },
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
                console.log(name,'item组件')
                this.active = name === this.name
            })
        },
        methods:{
            xxx(){
                this.eventBus.$emit('update:selected',this.name)
            }
        }

    }
</script>

<style lang="scss" scoped>
    .tabs-item{
        &.active{
            background: orangered;
        }

        height: 100%;
        padding: 0 2em;
        display: flex;
        align-items: center;
    }
</style>