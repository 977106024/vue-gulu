<template>
    <div class="collapse-item" @click="tggle">
        <div class="title">
            {{title}}
        </div>
        <div class="content" v-if="isShow">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name:'collapseItem',
        props:{
            title:{
                type:String,
            },
            name:String
        },
        inject:['eventBus'],
        data:()=>({
            isShow:false
        }),
        mounted(){
            this.eventBus && this.eventBus.$on('update:selected',(names)=>{
              // console.log(this === vm); 两个对象引用地址是一样的
              if(names.indexOf(this.name) >= 0){
                  this.isShow = true
              }else{
                  this.isShow = false
              }
          })
        },
        methods:{
            tggle(){
                if(this.isShow){
                    this.eventBus && this.eventBus.$emit('update:removeSelected',this.name)
                }else{
                    this.eventBus && this.eventBus.$emit('update:addSelected',this.name)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .collapse-item{
        .title{
            border: 1px solid #ddd;
            margin-top: -1px;
            margin-left: -1px;
            margin-right: -1px;
        }
        &:first-child{
            .title{
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
            }
        }
        &:last-child{
            .title{
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
            }
        }

    }
</style>