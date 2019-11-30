<template>
    <div>
        <g-popover position="bottom">
            <g-input></g-input>
            <template slot="content">
                <div class="g-date-picker-pop">
                    <div class="g-date-picker-nav">
                        <span> << </span>
                        <span @click="onClickYear">2020年</span>
                        <span @click="onClickMouth">8月</span>
                        <span> >> </span>
                    </div>
                    <div class="g-date-picker-panels">
                        <div v-if="mode === 'years'" class="g-date-picker-content">年</div>
                        <div v-else-if="mode === 'months'" class="g-date-picker-content">月</div>
                        <div v-else class="g-date-picker-content">
                            <div :class="c('weekdays')">
                                <span v-for="i in [1,2,3,4,5,6,0]">{{weekdays[i]}}</span>
                            </div>
                            <div :class="c('row')" v-for="i in helper.range(1,7)">
                                <span :class="c('col')" v-for="j in helper.range(1,8)">
                                    {{visibleDays[(i-1)*7+j-1].getDate()}}
<!--                                    i=1 j=1 0-->
<!--                                    i=1 j=2 1-->
<!--                                    i=1 j=3 2-->
<!--                                    i=1 j=4 3-->
<!--                                    i=1 j=5 4-->

<!--                                    i=2 j=1 7-->
<!--                                    i=2 j=2 8-->
<!--                                    i=2 j=3 9-->
<!--                                    i=2 j=4 10-->
<!--                                    i=2 j=5 11-->

                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="g-date-picker-actions">清除</div>
                </div>
            </template>
        </g-popover>
    </div>
</template>

<script>
    import helper from './helper'
    export default {
        name: "guluDatePicker",
        data:()=>({
            mode:'days',
            value:new Date(),
            helper:helper,
            weekdays:['日','一','二','三','四','五','六']
        }),
        mounted(){


        },
        computed:{
            visibleDays(){
                let date = this.value
                let first = helper.firstDayOfMonth(date) //Mon Jan 01 2018 00:00:00 GMT+0800 (中国标准时间)
                let last = helper.lastDayOfMonth(date)

                //当月 月初---月尾
                let arr = []
                let [year,month] = helper.getYearMonthDate(date)
                for(let i=first.getDate();i<=last.getDate();i++){
                    arr.push(new Date(year,month,i)) //年月是固定的 从date里获取的 日是for循环出来的
                }

                // 上月的几天
                let n = first.getDay() === 0 ? 6 : first.getDay() -1 //1.n-1 2.getDay()的7 等于 0
                let arr2 = []
                for(let i=0;i<n;i++){
                    arr2.push(new Date(year,month,-i))
                }
                arr2 = arr2.reverse()

                //下月的几天
                let m = 42 - arr.length - arr2.length //总数减去 等于剩下的
                let arr3 = []
                for(let i=1;i<=m;i++){ //跳过0 0就是当天    <=就是包括最后一位
                    arr3.push(new Date(year,month+1,i))
                }

                console.log('arr3')
                console.log(arr3)
                return [...arr2,...arr,...arr3]
            }
        },
        methods:{
            c(className){
                return `g-data-picker-${className}`
            },
            onBlurInput(){

            },
            onClickYear(){
                this.mode = 'years'
            },
            onClickMouth(){
                this.mode = 'months'
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>