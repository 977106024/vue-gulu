<template>
    <div class="popover" @click="onClick">
        <div class="content-wrap" v-if="visible" @click.stop>
            <slot name="content"></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "guluPopover",
        data:()=>({
            visible:false
        }),
        methods:{
            onClick(){
                this.visible = !this.visible
                console.log('onClick');
                //关闭popover
                if(this.visible === true){
                    // this.$nextTick(function(){
                    setTimeout(()=>{ //延时绑定时间 不然会一起触发click
                        let eventHandler = ()=>{ //原本用bind绑定this 但是bind会生成一个新函数
                            this.visible = false
                            document.removeEventListener('click',eventHandler)//点击后删除事件
                            console.log('事件')
                        }
                        document.addEventListener('click',eventHandler)//绑定事件
                    })
                    // })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .popover{
        display: inline-block;
        position: relative;
        .content-wrap{
            width: 80px;
            position: absolute;
            left: 0;
            bottom: 100%;
            border: 1px solid #ddd;
            box-shadow: 0 0 3px rgba(0,0,0,.5);
        }
    }
</style>