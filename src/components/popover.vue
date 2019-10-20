<template>
    <div class="popover" @click="onClick">
        <div class="content-wrap" v-if="visible">
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
                    this.$nextTick(()=>{
                        document.body.addEventListener('click',()=>{
                            this.visible = false
                            console.log('事件')
                        })
                    })

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