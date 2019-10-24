<template>
    <div class="collapse">
        <slot></slot>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        name: "guluCollapse",
        props:{
          single:{
              type:Boolean,
              default:false
          },
            selected:Array
        },
        data:()=>({
            eventBus:new Vue()
        }),
        provide:function(){
            return {
                eventBus: this.eventBus
            }
        },
        mounted() {
            //通知所有子组件当前选中
            this.eventBus.$emit('update:selected',this.selected)

            //add
            this.eventBus.$on('update:addSelected',(name)=>{
                let selectedCopy = JSON.parse(JSON.stringify(this.selected))
                if(this.single){//不能多选 关闭其他
                    selectedCopy = [name]
                }else{
                    selectedCopy.push(name)
                }
                this.eventBus.$emit('update:selected',selectedCopy)
                this.$emit('update:selected',selectedCopy)
            })

            //remove
            this.eventBus.$on('update:removeSelected',(name)=>{
                let selectedCopy = JSON.parse(JSON.stringify(this.selected))
                let index = selectedCopy.indexOf(name)
                selectedCopy.splice(index,1)
                this.eventBus.$emit('update:selected',selectedCopy)
                this.$emit('update:selected',selectedCopy)
            })
        }
    }
</script>

<style lang="scss" scoped>
    .collapse{
        border:1px solid #ddd;
        border-radius: 5px;
    }
</style>