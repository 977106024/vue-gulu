<template>
    <div class="g-date-picker" ref="wrap">
        <g-popover position="bottom" :container="wrapElement" ref="popover" @open="onOpen">
            <g-input ref="input" :value="formattedValue" @input="onInput" @change="onChange"></g-input>
            <template slot="content">
                <div class="g-date-picker-pop" @selectstart.prevent>
                    <div class="g-date-picker-nav">
                        <span :class="c('prevYear','navItem')" @click="onClickPrevYear"> << </span>
                        <span :class="c('prevMonth','navItem')" @click="onClickPrevMonth"> < </span>
                        <span :class="c('yearAndMonth')" @click="onClickMouth">
                            <span>{{display.year}}年</span>
                            <span>{{display.month+1}}月</span>
                        </span>
                        <span :class="c('nextYear','navItem')" @click="onClickNextMonth"> > </span>
                        <span :class="c('nextMonth','navItem')" @click="onClickNextYear"> >> </span>
                    </div>
                    <div class="g-date-picker-panels">
                        <div class="g-date-picker-content">
                            <template v-if="mode === 'month'">
                                <div :class="c('selectMonth')">
                                    <div :class="c('selects')">
                                        <select name="" id="" @change="onSelectYear" :value="display.year">
                                            <option :value="year" v-for="year in years" :key="year">{{year}}</option>
                                        </select>年
                                        <select name="" id="" @change="onSelectMonth" :value="display.month">
                                            <option :value="month" v-for="month in helper.range(0,12)" :key="month">{{month+1}}</option>
                                        </select>月
                                    </div>
                                    <div :class="c('returnToDayMode')"><button @click="x">返回</button></div>
                                </div>
                            </template>
                            <template v-else>
                                <div :class="c('weekdays')">
                                    <span :class="c('weekday')" v-for="i in [1,2,3,4,5,6,0]" :key="i">{{weekdays[i]}}</span>
                                </div>
                                <div :class="c('row')" v-for="i in helper.range(1,7)" :key="i">
                                <span :class="[c('cell'),{
                                currentMonth:isCurrentMonth(getVisibleDay(i,j)),
                                selected:isSelected(getVisibleDay(i,j)),
                                today:isToday(getVisibleDay(i,j))
                                }]" v-for="j in helper.range(1,8)" :key="j"
                                      @click="onClickCell(getVisibleDay(i,j))">
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
                            </template>
                        </div>
                    </div>
                    <div class="g-date-picker-actions">
                        <g-button @click="onClickToday">今天</g-button>
                        <g-button @click="onClickClear">清除</g-button>
                    </div>
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
          },
            scoped:{
              type:Array,
                default:()=>[new Date(1900,0,1),helper.addYear(new Date(),100)]
            }
        },
        data:()=>({
            mode:'day',
            helper:helper,
            weekdays:['日','一','二','三','四','五','六'],
            wrapElement:null,
            display:{
                year:undefined,
                month:undefined
            }
        }),
        created(){
            let [year,month] = helper.getYearMonthDate(this.value || new Date())
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
                if(!this.value){return ''}
                let [year,month,day] = helper.getYearMonthDate(this.value)
                return `${helper.pad2(year)}-${helper.pad2(month+1)}-${helper.pad2(day)}`
            },
            years(){
                return helper.range(
                    this.scoped[0].getFullYear(),
                    this.scoped[1].getFullYear() + 1
                )
            }
        },
        methods:{
            x(){
                setTimeout(()=>{
                    this.mode = 'day'
                },0)
            },
            onInput(value){
                const regex = /^\d{4}-\d{2}-\d{2}$/g
                if(value.match(regex)){
                    let [year,month,day] = value.split("-")
                    month = month -1 //上面加1了
                    year = year - 0 //变成number
                    this.display = {year,month}
                    this.$emit("update:value",new Date(year,month,day))
                }
            },
            onChange(){
                this.$refs.input.setRawValue(this.formattedValue)
            },
            isSelected(date){
                if(!this.value)return
                const [year,month,day] = helper.getYearMonthDate(date)
                const [year2,month2,day2,] = helper.getYearMonthDate(this.value)
                return year === year2 && month === month2 && day === day2
            },
            isToday(date){
                const today = new Date()
                const [year,month,day] = helper.getYearMonthDate(today)
                const [year2,month2,day2] = helper.getYearMonthDate(date)
                return year === year2 && month === month2 && day === day2
            },
            onSelectYear(e){
                const year = e.target.value - 0
                const d = new Date(year,this.display.month)
                if(d >= this.scoped[0] && d <= this.scoped[1]){
                    this.display.year = year
                }else{
                    alert('不在范围内')
                    e.target.value = this.display.year
                }
            },
            onSelectMonth(e){
                const month = e.target.value - 0
                const d = new Date(this.display.year,month)
                if(d >= this.scoped[0] && d <= this.scoped[1]){
                    this.display.month = month
                }else{
                    alert('不在范围内')
                    e.target.value = this.display.month
                }
            },
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
                    this.$refs.popover.close()
                }
            },
            getVisibleDay(row,col){
                return this.visibleDays[(row-1)*7+col-1]
            },
            onClickMouth(){
                if(this.mode !== 'month'){
                    this.mode = 'month'
                }else{
                    this.mode = 'year'
                }
            },
            onClickToday(){
                const now = new Date()
                const [year,month] = helper.getYearMonthDate(now)
                this.display = {year,month}
                this.$emit('update:value',now)
            },
            onClickClear(){
                this.$emit('update:value',undefined)
                this.$refs.popover.close()
            },
            onOpen(){
                this.mode = 'day'
            }
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
            display: inline-flex;
            justify-content: center;
            align-items: center;
        }
        &-cell{
            color: #ddd;
            cursor: not-allowed;
            border-radius: 4px;
            &.currentMonth{
                color: black;
                &:hover{
                    color: #fff;
                    background: blueviolet;
                    cursor: pointer;
                }
            }
            &.selected{
                border:1px solid blueviolet;
            }
            &.today{
                background: #eee;
            }
        }
        &-selectMonth{
            width: 224px;
            height: 224px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        &-returnToDayMode{
            margin-top: 8px;
        }
        /deep/ .g-popover-content-wrap{
            padding: 0;
        }
        &-actions{
            padding:8px;
            text-align: right;
        }
    }
</style>