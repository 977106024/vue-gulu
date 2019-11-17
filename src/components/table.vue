<template>
    <div>
        <table class="g-table" :class="{bordered,compact,noStripe:!stripeed}">
            <thead>
            <tr>
                <th><input type="checkbox" @click="onChangeCheckAll" ref="allChecked" :checked="areAllItemsSelected"></th>
                <th v-if="numberVisible">#</th>
                <th v-for="item in columns">{{item.title}}</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in data" :key="item.id">
                    <td @click="onChangeCheck(item,index,$event)">
                        <input type="checkbox" :checked="inSelectedItems(item)">
                    </td>
                    <td v-if="numberVisible">{{index+1}}</td>
                    <template v-for="column in columns">
                        <td :key="column.key">{{item[column.key]}}</td>
                    </template>
                </tr>
            </tbody>
        </table>
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
            }
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
                console.log( this.selectedItems.filter(n=>n.id === item.id),'啊啊')
                return this.selectedItems.filter(n=>n.id === item.id).length > 0
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
    .g-table{
            width: 100%;
            text-align: left;
            border-bottom: 1px solid #ccc;
            border-collapse: collapse;
            border-spacing: 0;
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
    }
</style>