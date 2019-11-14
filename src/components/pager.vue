<template>
    <div class="g-pager">
        <span v-for="page of pages" class="g-pager-item"
        :class="{active:page === currentPage,separator: page === '...'}">
            {{page}}
        </span>
    </div>
</template>

<script>
    export default {
        name: "guluPager",
        props:{
            totalPage:{
                type:Number,
                required:true
            },
            currentPage:{
                type:Number,
                required:true
            },
            hideIfOnePage:{
                type:Boolean,
                default:true
            }
        },
        data:(vm)=>({
            data:'',
            pages:''
        }),
        created(){
            //1.排序 2.去重 3.插入...
            this.pages = this.unique([1, this.totalPage,
                this.currentPage,
                this.currentPage -1,this.currentPage -2,
                this.currentPage+1,this.currentPage+2]
                .sort((a,b)=>a-b))
                .reduce((prev,current,index,array)=>{
                    prev.push(current)
                    array[index + 1] && array[index + 1] - array[index] > 1 && prev.push('...') //如果两个数字之间差值大于1 就插入...
                    return prev
                },[])
        },
        methods:{
            unique(array){
                return [...new Set(array)]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .g-pager{
        &-item{
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 0 4px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            min-width: 20px;
            height: 20px;
            margin:0 4px;
            &.separator{
                border: none;
            }
            &.active,&:hover{
                border-color:blue;
            }
        }
    }
</style>