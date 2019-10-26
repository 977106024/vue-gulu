<template>
    <div class="cascader-item" :style="{height:height}">
        <div class="left">
            <div class="label" v-for="item in items" @click="onClickLabel(item)">
                {{item.name}}
                <icon class="icon" v-if="item.children" name="right"></icon>
            </div>
        </div>
        <div class="right" v-if="rightItems"><!-- 等于null时停止 也就是没有children了-->
<!--            自己用自己 递归-->
            <cascader-item :items="rightItems" :height="height" :level="level+1" :selected="selected" @update:selected="onUpdateSelected"></cascader-item>
        </div>
    </div>
</template>

<script>
    import icon from '../Icon'
    export default {
        name:'cascaderItem',
        components:{icon},
        props:{
            items:Array,//渲染的数据
            height:String,//样式
            selected:{ //选中的数据
                type:Array,
                default:()=>[]
            },
            level:{//层级
                type:Number,
                default:0
            }
        },
        computed:{
            rightItems(){
                let currentSelected = this.selected[this.level]
                if(currentSelected && currentSelected.children){ //点击了有值 并且有children
                    return currentSelected.children
                }else{
                    return null
                }
            }
        },
        methods:{
            onClickLabel(item){ //1.单向数据流 2.全拷贝
                let copy = JSON.parse(JSON.stringify(this.selected))
                copy[this.level] = item
                this.$emit('update:selected',copy)
            },
            onUpdateSelected(newSelected){//接收组件内的onClickLabel  this.$emit('update:selected',copy)  !递归组件接收自己的$emit
                this.$emit('update:selected',newSelected)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .cascader-item{
        display: flex;
        height: 100px;
        .left{
            height: 100%;
            padding: .3em 0;
        }
        .right {
            height: 100%;
            border-left: 1px solid black;
        }
        .label{
            padding: .3em 1em;
            display: flex;
            align-items: center;
            .icon{
                margin-left:1em;
                transform: scale(.5);
            }
        }
    }
</style>