<template>
    <div class="cascader">
        <div class="trigger" @click="popoverVisible = !popoverVisible">
            <slot></slot>
        </div>
        <div class="popover" v-if="popoverVisible">
            <cascader-item :items="source"></cascader-item>
        </div>
    </div>
</template>

<script>
    import cascaderItem from './cascader-item'
    export default {
        name: "cascader",
        components:{cascaderItem},
        props:{
            source:Array
        },
        data:()=>({
            popoverVisible:false,
            levelSelected1:null,
            levelSelected2:null,
        }),
        computed:{
          lave2(){
              if(this.levelSelected1){//null
                  return this.levelSelected1.children
              }else{
                  return []
              }
          },
            lave3(){
                if(this.levelSelected2){
                    return this.levelSelected2.children
                }else{
                    return []
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .cascader{
        .trigger{
            width: 250px;
            height: 32px;
            border: 1px solid red;
        }
        .popover{
            height: 200px;
            border: 1px solid yellowgreen;
            display: flex;
        }
    }
</style>