<template>
    <div class="g-pager" :class="{hide:hideIfOnePage === true && totalPage <= 1}">
        <span class="g-pager-nav prev" :class="{disabled:currentPage === 1}"
        @click="onClickPage(currentPage-1)">
            <g-icon name="left"></g-icon>
        </span>
        <template v-for="page of pages">
            <template v-if="page === currentPage">
                <span class="g-pager-item current">{{page}}</span>
            </template>
            <template v-else-if="page === '...'">
<!--                <icon name="dian"></icon> 使用remplate来使用各种标签-->
                <span class="g-pager-item separator">...</span>
            </template>
            <template v-else>
                <a class="g-pager-item other" @click="onClickPage(page)">{{page}}</a>
            </template>
        </template>
        <span class="g-pager-nav next" :class="{disabled:currentPage === totalPage.length-1}"
              @click="onClickPage(currentPage+1)">
            <g-icon name="right"></g-icon>
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
        data:()=>({
            data:'',
            // pages:''
        }),
        created(){
            // //0.过滤(-1 0 最大数+1) 1.排序  2.去重 3.插入...
            // this.pages = this.unique([1, this.totalPage,
            //     this.currentPage,
            //     this.currentPage -1,this.currentPage -2,
            //     this.currentPage+1,this.currentPage+2]
            //     .filter(n=> n>=1 && n <= this.totalPage)
            //     .sort((a,b)=>a-b))
            //     .reduce((prev,current,index,array)=>{
            //         prev.push(current)
            //         array[index + 1] && array[index + 1] - array[index] > 1 && prev.push('...') //如果两个数字之间差值大于1 就插入...
            //         return prev
            //     },[])
        },
        computed:{
          pages(){
              //1.去重 2.过滤(-1 0 最大数+1) 3.排序 4.插入 ...
              return this.unique([1, this.totalPage,
                  this.currentPage,
                  this.currentPage -1,this.currentPage -2,
                  this.currentPage+1,this.currentPage+2]
                  .filter(n=> n>=1 && n <= this.totalPage)
                  .sort((a,b)=>a-b))
                  .reduce((prev,current,index,array)=>{
                      prev.push(current)
                      array[index + 1] && array[index + 1] - array[index] > 1 && prev.push('...') //如果两个数字之间差值大于1 就插入...
                      return prev
                  },[])
            }
        },
        methods:{
            unique(array){
                // return [...new Set(array)]
                let obj = {}
                array.map(n=>{
                    obj[n] = true
                })
                return Object.keys(obj).map(n=>parseInt(n))
            },
            onClickPage(n){
                if(n >=1 && n <= this.totalPage){
                    this.$emit('update:currentPage',n)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    $width:20px;
    $height:20px;
    .g-pager{
        user-select: none;
        &.hide{
            display: none;
        }
        display: flex;
        justify-content: center;
        align-items: center;
        &-item{
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 0 4px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            min-width: $width;
            height: $height;
            margin:0 4px;
            &.separator{
                border: none;
            }
            &.current,&:hover{
                border-color:blue;
                cursor: pointer;
            }
            &.current{
                cursor: default;
            }
        }
        &-nav{
            width: $width;
            height: $height;
            border-radius: 4px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            background: #ccc;
            &.disabled{
                svg{
                    fill:darken(#ccc,30%);
                }
            }
        }
    }
</style>