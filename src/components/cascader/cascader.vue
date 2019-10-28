<template>
    <div class="cascader">
        <div class="trigger" @click="popoverVisible = !popoverVisible">
            {{result}}
        </div>
        <div class="popover" v-if="popoverVisible">
            <cascader-item :items="source" :height="popoverHeight" :selected="selected" @update:selected="onUpdateSelected" :loadData="loadData"></cascader-item>
        </div>
    </div>
</template>

<script>
    import cascaderItem from './cascader-item'
    export default {
        name: "cascader",
        components:{cascaderItem},
        props:{
            source:Array,
            popoverHeight:String,
            selected:{
                type:Array,
                default:()=>[]
            },
            loadData:Function
        },
        data:()=>({
            popoverVisible:false,
        }),
        computed:{
            result(){
                return this.selected.map(item=>item.name).join('/')
            }
        },
        methods:{
            onUpdateSelected(newSelected){
                this.$emit('update:selected',newSelected)
                let lastItem = newSelected[newSelected.length -1]

                // source数据源 lastItem.id 用户选择项的id
                //从source中找出用户选择项 并且为其添加children数据

                //简单查找
                let simplest = (children,id) => {
                    return children.filter(item=>item.id === id)[0]
                }

                //深度查找
                let complex = (children,id) => {
                    let noChildren = []
                    let hasChildren = []
                    children.forEach(item=>{
                        if(item.children){
                            hasChildren.push(item)
                        }else{
                            noChildren.push(item)
                        }
                    })
                    let found = simplest(noChildren,id)//把没children的遍历一遍
                    if(found){
                        console.log('简单查找 找到了！')
                        return found
                    }else{
                        console.log('深度查找')
                        found = simplest(hasChildren,id)//把有children的遍历一遍
                        if(found){
                         return found
                        }else{//没有找到 就把他的children递归遍历 直到找到为止
                            for(let i=0;i<hasChildren.length;i++){
                                found = complex(hasChildren[i].children,id)
                                if(found){
                                    return found
                                }
                            }
                            return null
                        }
                    }
                }

                let update = (res)=>{
                    //...
                    let copy = JSON.parse(JSON.stringify(this.source))
                    let toUpdate = complex(copy,lastItem.id)
                    toUpdate.children = res
                    this.$emit('update:source',copy)
                }
                if(!lastItem.isLeaf){
                    this.loadData && this.loadData(lastItem,update)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../var';
    .cascader{
        position:relative;
        .trigger{
            width: 250px;
            height: 32px;
            border: 1px solid red;
        }
        .popover{
            display: flex;
            position:absolute;
            top: 100%;
            left: 0;
            background: white;
            @extend .box-shadow;
            overflow: auto;
        }
    }
</style>