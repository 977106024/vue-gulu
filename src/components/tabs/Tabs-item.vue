<template>
    <div class="tabs-item" @click="xxx" :class="classes">
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
            active:false,
        }),
        computed:{
          classes(){
              return {
                  active:this.active,
                  disabled:this.disabled
              }
          }
        },
        //拿到tabs的注入
        inject:['eventBus'],
        created() {
            this.eventBus.$on('update:selected',(name)=>{
                this.active = name === this.name
            })
        },
        methods:{
            xxx(){
                if(this.disabled){return}
                this.eventBus.$emit('update:selected',this.name,this)//参数1.当前点击的name 2.当前组件实例 为了head能获取item的width left信息
            }
        }

    }
</script>

<style lang="scss" scoped>
    $blue:blue;
    $disabled-color:#ccc;
    .tabs-item{
        &.active{
            color: $blue;
        }
        &.disabled{
            color: $disabled-color;
            cursor: not-allowed;
        }

        height: 100%;
        padding: 0 2em;
        display: flex;
        align-items: center;
    }
</style>