<template>
    <div class="row" :style="rowStyle" :class="rowClass">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name:'guluRow',
        props:{
            gutter:[Number,String],
            ailgn:{
                type:String,
                validator(value){
                    return ['left','center','right'].includes(value)
                }
            }
        },
        data:(vm)=>({

        }),
        computed:{
          rowStyle(){ //布局-px 消除两边多余空隙
              let {gutter} = this
              return {
                  marginLeft:-gutter/2 + 'px',
                  marginRight:-gutter/2 + 'px'
              }
          },
            rowClass(){
                let {ailgn} = this
                return [ailgn && `ailgn-${ailgn}`]
            }
        },
        mounted() { //把gutter传给子组件
            this.$children.forEach((vm)=>{
                vm.gutter = this.gutter
            })
        }
    }
</script>

<style lang="scss" scoped>
    .row{
        display: flex;
        flex-wrap: wrap;
        &.ailgn-left{
            justify-content: flex-start;
        }
        &.ailgn-center{
            justify-content: center;
        }
        &.ailgn-right{
            justify-content: flex-end;
        }
    }
</style>