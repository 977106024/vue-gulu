<template>
    <div class="g-date-picker" ref="wrap">
        <g-popover position="bottom" :container="wrapElement">
            <g-input :value="formattedValue"></g-input>
            <template slot="content">
                <div class="g-date-picker-pop">
                    <div class="g-date-picker-nav">
                        <span :class="c('prevYear','navItem')" @click="onClickPrevYear"> << </span>
                        <span :class="c('prevMonth','navItem')" @click="onClickPrevMonth"> < </span>
                        <span :class="c('yearAndMonth')">
                            <span @click="onClickYear">{{display.year}}年</span>
                            <span @click="onClickMouth">{{display.month+1}}月</span>
                        </span>
                        <span :class="c('nextYear','navItem')" @click="onClickNextMonth"> > </span>
                        <span :class="c('nextMonth','navItem')" @click="onClickNextYear"> >> </span>
                    </div>
                    <div class="g-date-picker-panels">
                        <div v-if="mode === 'years'" class="g-date-picker-content">年</div>
                        <div v-else-if="mode === 'months'" class="g-date-picker-content">月</div>
                        <div v-else class="g-date-picker-content">
                            <div :class="c('weekdays')">
                                <span :class="c('weekday')" v-for="i in [1,2,3,4,5,6,0]" :key="i">{{weekdays[i]}}</span>
                            </div>
                            <div :class="c('row')" v-for="i in helper.range(1,7)" :key="i">
                                <span :class="[c('cell'),{currentMonth:isCurrentMonth(getVisibleDay(i,j))}]" v-for="j in helper.range(1,8)" :key="j" @click="onClickCell(getVisibleDay(i,j))">
                                    {{getVisibleDay(i,j).getDate()}}
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
        props:{
          value:{
              type:Date,
              default:new Date()
          }
        },
        data:()=>({
            mode:'days',
            helper:helper,
            weekdays:['日','一','二','三','四','五','六'],
            wrapElement:null,
            display:{
                year:undefined,
                month:undefined
            }
        }),
        created(){
            let [year,month] = helper.getYearMonthDate(this.value)
            this.display.year = year
            this.display.month = month

        },
        mounted(){
            this.wrapElement = this.$refs.wrap
        },
        computed:{
            visibleDays(){
                let date = new Date(this.display.year,this.display.month,1)
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
            },
            formattedValue(){
                let [year,month,day] = helper.getYearMonthDate(this.value)
                return `${year}-${month+1}-${day}`
            }
        },
        methods:{
            onClickPrevYear(){
                const oldDate = new Date(this.display.year,this.display.month)
                const newDate = helper.addYear(oldDate,-1)
                const [year,month] = helper.getYearMonthDate(newDate)
                this.display = {year,month}
            },
            onClickPrevMonth(){
                const oldDate = new Date(this.display.year,this.display.month)//旧的时间
                const newDate = helper.addMonth(oldDate,-1)//月份减一
                const [year,month] = helper.getYearMonthDate(newDate) //减一后获取新的年月
                this.display = {year,month}
1             },
            onClickNextYear(){
                const oldDate = new Date(this.display.year,this.display.month)
                const newDate = helper.addYear(oldDate,1)
                const [year,month] = helper.getYearMonthDate(newDate)
                this.display = {year,month}
            },
            onClickNextMonth(){
                const oldDate = new Date(this.display.year,this.display.month)
                const newDate = helper.addMonth(oldDate,1)
                const [year,month] = helper.getYearMonthDate(newDate)
                this.display = {year,month}
            },
            isCurrentMonth(date){
                let [year1,month1] = helper.getYearMonthDate(date)
                return year1 === this.display.year && month1 === this.display.month
            },
            c(...classNames){
                return classNames.map(className=>`g-date-picker-${className}`)
            },
            onClickCell(date){
                if(this.isCurrentMonth(date)){
                    this.$emit('update:value',date)
                }
            },
            getVisibleDay(row,col){
                return this.visibleDays[(row-1)*7+col-1]
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
            display: flex;
        }
        &-yearAndMonth{
            margin: auto;
        }
        &-navItem,
        &-cell,
        &-weekday{
            width: 32px;
            height: 32px;
            border:1px solid red;
            display: inline-flex;
            justify-content: center;
            align-items: center;
        }
        &-cell{
            color: #ddd;
            &.currentMonth{
                color: black;
            }
        }
        /deep/ .g-popover-content-wrap{
            padding: 0;
        }
    }
</style>