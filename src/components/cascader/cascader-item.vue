<template>
    <div class="cascader-item">
        <div class="left">
            <div class="label" v-for="item in items" @click="leftSelected = item">{{item.name}}</div>
        </div>
        <div class="right" v-if="rightItems"><!-- 等于null时停止 也就是没有children了-->
<!--            自己用自己 递归-->
            <cascader-item :items="rightItems"></cascader-item>
        </div>
    </div>
</template>

<script>
    export default {
        name:'cascaderItem',
        props:{
            items:Array
        },
        data:()=>({
            leftSelected:null,
        }),
        computed:{
            rightItems(){
                if(this.leftSelected && this.leftSelected.children){ //点击了有值 并且有children
                    return this.leftSelected.children
                }else{
                    return null
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .cascader-item{
        display: flex;
        .left{
            border: 1px solid red;
        }
        .right{
            margin-top: -1px;
        }
    }
</style>