<template>
    <div class="toast">
        <slot v-if="!enableHtml"></slot>
        <div v-else v-html="$slots.default"></div>
        <div class="line"></div>
        <span class="close" v-if="closeButton" @click="clickClose">
            {{closeButton.text}}
        </span>
    </div>
</template>
<script>
    export default{
        name:'guluToast',
        props:{
            autoClose:{
               type:Boolean,
               default:true
            },
            autoCloseDelay:{
                type:Number,
                default: 20

            },
            closeButton:{
                type:Object,
                default(){
                    return {
                        text:'关闭',
                        callback:undefined
                    }
                }
            },
            enableHtml:{ //支持html
                type:Boolean,
                default:false
            }
        },
        mounted(){
            if(this.autoClose){
                setTimeout(()=>{
                    this.close()
                },this.autoCloseDelay * 1000)
            }
        },
        methods:{
            close(){
                this.$el.remove()
                this.$destroy()
            },
            log(){
              console.log('内部方法')
            },
            clickClose(){
                this.close()
                //callback存在 并且是个函数
                if(this.closeButton && typeof this.closeButton.callback === 'function'){
                    this.closeButton.callback(this) //this === toast实例 传出去可以让开发者调用toast内部方法
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    $font-size: 14px;
    $toast-height: 40px;
    $toast-bg: rgba(0, 0, 0, 0.75);
    .toast {
        font-size: $font-size; height: $toast-height; line-height: 1.8;
        position: fixed; top: 0; left: 50%; transform: translateX(-50%);
        display: flex;
        color: white;
        align-items: center;
        background: $toast-bg;
        border-radius: 4px;
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.50);
        padding: 0 16px;
    }
    .close{
        padding-left: 10px;
        flex-shrink: 0;
    }
    .line{
        height: 100%;
        border-left: 1px solid #ccc;
        margin-left: 10px;
    }
</style>