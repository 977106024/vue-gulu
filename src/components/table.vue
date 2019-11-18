<template>
    <div class="g-table-wrap" ref="wrap">
        <div :style="{height,overflow:'auto'}" ref="tableWrap">
            <table class="g-table" :class="{bordered,compact,noStripe:!stripeed}" ref="table">
                <thead>
                <tr>
                    <th :style="{width:'50px'}"><input type="checkbox" @click="onChangeCheckAll" ref="allChecked" :checked="areAllItemsSelected"></th>
                    <th :style="{width:'50px'}" v-if="numberVisible">#</th>
                    <th :style="{width:item.width + 'px'}" v-for="item in columns">
                        <div class="g-table-header">
                            {{item.title}}
                            <span v-if="item.key in orderBy" class="g-table-sorter" @click="changeOrder(item.key)">
                            <g-icon name="left" :class="{active:orderBy[item.key] === 'asc' ? true : false}"></g-icon>
                            <g-icon name="right" :class="{active:orderBy[item.key] === 'desc' ? true : false}"></g-icon>
                        </span>
                        </div>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in data" :key="item.id">
                    <td :style="{width:'50px'}" @click="onChangeCheck(item,index,$event)">
                        <input type="checkbox" :checked="inSelectedItems(item)">
                    </td>
                    <td :style="{width:'50px'}" v-if="numberVisible">{{index+1}}</td>
                    <template v-for="column in columns">
                        <td :style="{width:column.width + 'px'}" :key="column.key">{{item[column.key]}}</td>
                    </template>
                </tr>
                </tbody>
            </table>
        </div>

        <div v-if="loading" class="g-table-loading">
            <g-icon name="loading"></g-icon>
        </div>
    </div>
</template>

<script>
    export default {
        name: "guluTable",
        props:{
            columns:{
                type:Array,
                require:true
            },
            data:{
                type:Array,
                require: true,
                validator(array){
                    return !(array.filter(item=>item.id === undefined).length > 0) //必须有id 我们要通过id来判断是否选中
                }
            },
            numberVisible:{
                type:Boolean,
                default:false
            },
            bordered:{
                type:Boolean,
                default: false
            },
            compact:{
                type:Boolean,
                default:false
            },
            stripeed:{
                type:Boolean,
                default:false
            },
            selectedItems:{
                type:Array,
                default:()=>[]
            },
            orderBy:{
                type:Object,
                default:()=>({})
            },
            loading:{
                type:Boolean,
                default:false
            },
            height:{
                type:Number
            }
        },
        mounted(){
            let table2 = this.$refs.table.cloneNode(false)//false 不copy子元素
            this.table2 = table2
            table2.classList.add('g-table-copy')
            let tHead = this.$refs.table.children[0]
            let {height} = tHead.getBoundingClientRect()
            this.$refs.tableWrap.style.marginTop = height + 'px' //处理滚动条细节 上端滚动到里面去
            this.$refs.tableWrap.style.height = this.height - height + 'px' //height要减去滚动条处理的marginTop 才是用户传值的400px
            table2.appendChild(tHead)
            this.$refs.wrap.appendChild(table2)

        },
        beforeDestroy(){

            this.table2.remove()
        },
        computed:{
            areAllItemsSelected(){
                const data = this.data.map(item=>item.id).sort()
                const selectedItems = this.selectedItems.map(item=>item.id).sort()
                if(data.length !== selectedItems.length)return
                let equal = true
                for(let i = 0;i<data.length;i++){
                    if(data[i].id !== selectedItems[i].id){
                        equal = false
                        break
                    }
                }
                return equal
            }
        },
        methods:{
            onChangeCheck(val,index,e){
                let selected = e.target.checked
                let copy = JSON.parse(JSON.stringify(this.selectedItems))
                if(selected){
                    copy.push(val)
                }else{
                   copy = copy.filter(n=>n.id !== val.id) //把不等于这个id的值$emit 就相等于删除了该id
                }
               this.$emit('update:selectedItems',copy)
            },
            onChangeCheckAll(e){
                let selected = e.target.checked
                this.$emit('update:selectedItems',selected ? this.data : [])
            },
            inSelectedItems(item){
                return this.selectedItems.filter(n=>n.id === item.id).length > 0
            },
            changeOrder(key){
                let copy = JSON.parse(JSON.stringify(this.orderBy))
                let oldValue = copy[key]
                if(oldValue === 'asc'){//1.升序 2.降序 3.不排序
                    copy[key] = 'desc'
                }else if(oldValue === 'desc'){
                    copy[key] = true
                }else{
                    copy[key] = 'asc'
                }
                this.$emit('update:orderBy',copy)
            }
        },
        watch:{
            selectedItems(){
                if(this.selectedItems.length === this.data.length || this.selectedItems.length === 0){
                    this.$refs.allChecked.indeterminate = false
                }else{
                    this.$refs.allChecked.indeterminate = true
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import 'var';
    .g-table{
            width: 100%;
            text-align: left;
            border-bottom: 1px solid #ccc;
            border-collapse: collapse;
            border-spacing: 0;
            &-header{
                .g-table-sorter{
                    >.active{
                        color:red;
                    }
                }
            }
            &.bordered{
                border:1px solid #ccc;
                td,th{
                    border: 1px solid #ccc;
                }
            }
            &.compact{
                td,th{
                    padding: 4px;
                }
            }
            &.noStripe {
                tbody{
                    >tr{
                        &:nth-child(even){
                            background: #eee;
                        }
                    }
                }
            }

            td,th{
                border-bottom:1px solid #ccc;
                padding: 8px;
            }
        &-loading{
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(255,255,255,.8);
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            svg{
                @include spin;
            }
        }
    }
    .g-table-wrap{
        position: relative;
        overflow: auto;
        .g-table-copy{
            position: absolute;
            top: 0;
            left: 0;
            background: white;
        }
    }
</style>