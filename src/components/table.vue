<template>
    <div class="g-table-wrap" ref="wrap">
        <div :style="{height,overflow:'auto'}" ref="tableWrap">
            <table class="g-table" :class="{bordered,compact,noStripe:!stripeed}" ref="table">
                <thead>
                <tr>
                    <th v-if="expendKey" :style="{width:'50px'}"></th>
                    <th v-if="checkable" :style="{width:'50px'}"><input type="checkbox" @click="onChangeCheckAll" ref="allChecked" :checked="areAllItemsSelected"></th>
                    <th :style="{width:'50px'}" v-if="numberVisible">#</th>
                    <th :style="{width:item.width + 'px'}" v-for="item in columns">
                        <div class="g-table-header">
                            {{item.title}}
                            <span v-if="item.field in orderBy" class="g-table-sorter" @click="changeOrder(item.field)">
                            <g-icon name="left" :class="{active:orderBy[item.field] === 'asc' ? true : false}"></g-icon>
                            <g-icon name="right" :class="{active:orderBy[item.field] === 'desc' ? true : false}"></g-icon>
                        </span>
                        </div>
                    </th>
                    <th v-if="$scopedSlots.default" ref="actionsHeader"></th>
                </tr>
                </thead>
                <tbody>
                <template v-for="(item,index) in data">
                    <tr :key="item.id">
                        <td v-if="expendKey"  :style="{width:'50px'}">
                            <g-icon class="expend-icon" name="right" @click="expend(item.id)"></g-icon>
                        </td>
                        <td v-if="checkable" :style="{width:'50px'}" @click="onChangeCheck(item,index,$event)">
                            <input type="checkbox" :checked="inSelectedItems(item)">
                        </td>
                        <td :style="{width:'50px'}" v-if="numberVisible">{{index+1}}</td>
                        <template v-for="column in columns">
                            <td :style="{width:column.width + 'px'}" :key="column.field">
                                <template v-if="column.render">
                                    <vnodes :vnodes="column.render({value:item[column.field]})"></vnodes>
                                </template>
                                <template v-else>
                                    {{item[column.field]}}
                                </template>
                            </td>
                        </template>
                        <td v-if="$scopedSlots.default">
                            <div ref="actions">
                                <slot :item="item"></slot>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="inExpendIds(item.id)" :key="`expend-${item.id}`">
                        <td :colspan="expendCellColspan">
                            {{item[expendKey] || '空'}}
                        </td>
                    </tr>
                </template>
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
        components:{
            vnodes:{
                functional:true,
                render:(h,ctx) => ctx.props.vnodes
            }
        },
        props:{
            // columns:{
            //     type:Array,
            //     require:true
            // },
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
            },
            expendKey:{
                type:String
            },
            checkable:{
                type:Boolean,
                default:false
            }
        },
        data:()=>({
            expendIds:[],
            columns:[]
        }),
        mounted(){
            this.columns = this.$slots.default.map(node=>{
                console.log(node.componentOptions,'ssssssqqq');
                let {title,field,width} = node.componentOptions.propsData
                let render = node.data.scopedSlots && node.data.scopedSlots.default //(template <a></a>) 就是render
                return {title,field,width,render}
            })

            let table2 = this.$refs.table.cloneNode(false)//false 不copy子元素
            this.table2 = table2
            table2.classList.add('g-table-copy')
            let tHead = this.$refs.table.children[0]
            let {height} = tHead.getBoundingClientRect()
            this.$refs.tableWrap.style.marginTop = height + 'px' //处理滚动条细节 上端滚动到里面去
            this.$refs.tableWrap.style.height = this.height - height + 'px' //height要减去滚动条处理的marginTop 才是用户传值的400px
            table2.appendChild(tHead)
            this.$refs.wrap.appendChild(table2)

            if (this.$scopedSlots.default) {
                let div = this.$refs.actions[0]
                let {width} = div.getBoundingClientRect()
                let parent = div.parentNode //父元素
                let styles = getComputedStyle(parent) //所有css
                let paddingLeft = styles.getPropertyValue('padding-left') //某个css
                let paddingRight = styles.getPropertyValue('padding-right')
                let borderLeft = styles.getPropertyValue('border-left-width')
                let borderRight = styles.getPropertyValue('border-right-width')
                let width2 = width + parseInt(paddingRight) + parseInt(paddingLeft) + parseInt(borderLeft) + parseInt(borderRight) + 'px'
                this.$refs.actionsHeader.style.width = width2
                this.$refs.actions.map(div => {
                    div.parentNode.style.width = width2
                })
            }

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
            },
            expendCellColspan(){
                let result = 0
                if(this.checkable){result += 1}
                if(this.expendKey){result += 1}
                return this.columns.length + result
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
            },
            expend(id){
                if(this.inExpendIds(id)){
                    let index = this.expendIds.indexOf(id)
                    this.expendIds.splice(index,1)
                }else{
                    this.expendIds.push(id)
                }
            },
            inExpendIds(id){
                return this.expendIds.indexOf(id) >= 0
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
        .expend-icon{
            width: 10px;
            height: 10px;
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