<template>
    <div class="wrap" :class="toastClass">
        <div class="toast" ref="toast">
            <div class="message">
                <slot v-if="!enableHtml"></slot>
                <div v-else v-html="$slots.default"></div>
            </div>
            <div class="line" ref="line"></div>
            <span class="close" v-if="closeButton" @click="clickClose">
            {{closeButton.text}}
            </span>
        </div>
    </div>
</template>
<script>
    export default{
        name:'guluToast',
        props:{
            autoClose:{
               type:[Boolean,Number],
               default:2,
                validator(value){ //默认是2s 所以只能是false或者是数字
                   return value === false || typeof value === 'number'
                }
            },
            // autoCloseDelay:{ //合并到autoClose
            //     type:Number,
            //     default: 2
            //
            // },
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
                    },this.autoClose * 1000)
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

    @keyframes slide_top {
        0%{opacity: 0;transform: translateY(-100%);}
        100%{opacity: 1;transform: translateY(0);}
    }
    @keyframes slide_middle {
        0%{opacity: 0;}
        100%{opacity: 1;}
    }
    @keyframes slide_bottom {
        0%{opacity: 0;transform: translateY(100%);}
        100%{opacity: 1;transform: translateY(0);}
    }

    .wrap{
        position: fixed; left: 50%; transform: translateX(-50%);/*位置*/
        $animation-duration:300ms;
        &.position-top{ /*props 默认top*/
            top: 0;
            >.toast{
                border-top-left-radius: 0;
                border-top-right-radius: 0;
                animation: slide_top $animation-duration;
            }
        }
        &.position-middle{
            top: 50%;
            transform: translate(-50%,-50%);
            .toast{
                animation: slide_middle $animation-duration;
            }
        }
        &.position-bottom{
            bottom: 0;
            >.toast{
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
                animation: slide_bottom $animation-duration;
            }
        }
    }

    .toast {
        font-size: $font-size; min-height: $toast-min-height; line-height: 1.8;
        display: flex;
        color: white;
        align-items: center;
        background: $toast-bg;
        border-radius: 4px;
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.50);
        padding: 0 16px;
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