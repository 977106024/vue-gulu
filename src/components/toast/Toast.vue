<template>
    <div class="toast" ref="toast" :class="toastClass">
        <div class="message">
            <slot v-if="!enableHtml"></slot>
            <div v-else v-html="$slots.default"></div>
        </div>
        <div class="line" ref="line"></div>
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
                default: 2

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
            },
            position:{
                type:String,
                default:'top',
                validator(value){
                    return ['top','bottom','middle'].indexOf(value) >= 0 //indexOf 兼容性好
                }
            }
        },
        mounted(){
            this.updateStyle()
            this.execAutoClose()
        },
        computed:{
            toastClass(){
                return [this.position && `position-${this.position}`]
            }
        },
        methods:{
            updateStyle(){
                this.$nextTick(()=>{
                    this.$refs.line.style.height =
                        this.$refs.toast.getBoundingClientRect().height + 'px'
                    //.style 只能取内联样式  getBoundingClientRect()取css样式 ->集合中有top, right, bottom, left,height,width等属性。
                })
            },
            execAutoClose(){
                if(this.autoClose){
                    setTimeout(()=>{
                        this.close()
                    },this.autoCloseDelay * 1000)
                }
            },
            close(){
                this.$el.remove()
                this.$emit('close')
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
    $toast-min-height: 40px;
    $toast-bg: rgba(0, 0, 0, 0.75);

    @keyframes fade_in {
        0%{opacity: 0;margin-bottom:-100px}
        100%{opacity: 1;margin-bottom: 0}
    }

    .toast {
        animation: fade_in 1s;
        font-size: $font-size; min-height: $toast-min-height; line-height: 1.8;
        position: fixed; left: 50%; transform: translateX(-50%);/*位置*/
        display: flex;
        color: white;
        align-items: center;
        background: $toast-bg;
        border-radius: 4px;
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.50);
        padding: 0 16px;
        &.position-top{ /*props 默认top*/
            top: 0;
        }
        &.position-middle{
            top: 50%;
            transform: translate(-50%,-50%);
        }
        &.position-bottom{
            bottom: 0;
        }
        .message{
            padding: 4px 0;
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
    }
</style>