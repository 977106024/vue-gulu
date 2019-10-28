<template>
    <div class="cascader-item" :style="{height:height}">
        <div class="left">
            <div class="label" v-for="item in items" @click="onClickLabel(item)">
                <span class="name">{{item.name}}</span>
                <span class="icons">
                    <template v-if="item.name === loadingItem.name">
                        <icon class="loading" name="loading"></icon>
                    </template>
                    <template v-else>
                        <icon class="icon" name="right" v-if="rightArrowVisible(item)"></icon>
                    </template>
                </span>
            </div>
        </div>
        <div class="right" v-if="rightItems"><!-- 等于null时停止 也就是没有children了-->
<!--            自己用自己 递归-->
            <cascader-item :items="rightItems" :height="height" :level="level+1" :selected="selected" @update:selected="onUpdateSelected" :load-data="loadData" :loading-item="loadingItem"></cascader-item>
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
            },
            loadData:Function,
            loadingItem:{
                type:Object,
                default:()=>({})
            }
        },
        computed:{
            rightItems(){
                if(this.selected && this.selected[this.level]){
                    let selected = this.items.filter(item=>item.name === this.selected[this.level].name)[0] //找出source中选中的当前项 return 其children
                    if(selected && selected.children && selected.children.length > 0){ //不是一个空children
                        return selected.children
                    }
                }
            }
        },
        methods:{
            rightArrowVisible(item){
                return this.loadData ? !item.isLeaf : item.children
            },
            onClickLabel(item){ //1.单向数据流 2.全拷贝
                let copy = JSON.parse(JSON.stringify(this.selected))
                copy[this.level] = item
                copy.splice(this.level+1)
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
            overflow: auto;
        }
        .right {
            height: 100%;
            border-left: 1px solid black;
        }
        .label{
            padding: .4em 1em;
            display: flex;
            align-items: center;
            white-space: nowrap;
            >.name{
                margin-right: 2em;
                user-select: none;
            }
            &:hover{
                background: #ddd;
            }
            .icons{
                margin-left:auto;
                .icon{
                    transform: scale(.5);
                }
                .loading{
                    animation: 1s spin infinite linear;
                }
            }
        }
        @keyframes spin {
            0%{
                transform: rotate(0deg);
            }
            100%{
                transform: rotate(360deg);
            }
        }
    }
</style>