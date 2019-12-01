<template>
    <div class="g-date-picker" ref="wrap">
        <g-popover position="bottom" :container="wrapElement">
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
                                <span v-for="i in [1,2,3,4,5,6,0]" :key="i">{{weekdays[i]}}</span>
                            </div>
                            <div :class="c('row')" v-for="i in helper.range(1,7)" :key="i">
                                <span :class="c('col')" v-for="j in helper.range(1,8)" :key="j">
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
            weekdays:['日','一','二','三','四','五','六'],
            wrapElement:null
        }),
        mounted(){
            this.wrapElement = this.$refs.wrap

        },
        computed:{
            visibleDays(){
                let date = this.value
                let first = helper.firstDayOfMonth(date) //Mon Jan 01 2018 00:00:00 GMT+0800 (中国标准时间)
                let last = helper.lastDayOfMonth(date)
                let [year,month] = helper.getYearMonthDate(date)

                //1号是星期几 -1就是上月的n天
                let n = first.getDay() === 0 ? 6 : first.getDay() -1 //1.n-1 2.getDay()的7 等于 0
                //1号-上月的n天 = 42的第一天
                let x = first - n * 3600 * 24 * 1000

                let arr = []
                for(let i=0;i<42;i++){
                    arr.push(new Date(x + i * 3600 * 24 * 1000)) //3600秒 * 24小时 * 1000毫秒
                }
                return arr
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
    .g-date-picker{
        &-nav{
            background: red;
        }
        /deep/ .g-popover-content-wrap{
            padding: 0;
        }
    }
</style>