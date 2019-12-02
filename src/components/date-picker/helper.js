export default {
    firstDayOfMonth(date){
        let [year,month,day] = getYearMonthDate(date)
        return new Date(year,month,1)
    },
    lastDayOfMonth(date){
        let [year,month,day] = getYearMonthDate(date)
        return new Date(year,month+1,0)
    },
    range(begin,end){
        let arr = []
        for(let i=begin;i<end;i++){
            arr.push(i)
        }
        return arr
    },
    addMonth(date,n){
        const [_1,month,_2] = getYearMonthDate(date) //获取月
        const copy = new Date(date) //拷贝
        const newMonth = month + n //月份加
        copy.setMonth(newMonth) //设置新月份 日期对象获取默认少一个月 如果是-1月 就会到去年12月
        return copy
    },
    addYear(date,n){
        const [year] = getYearMonthDate(date)
        const copy = new Date(date)
        const newYear = year + n
        copy.setFullYear(newYear)
        return copy
    },
    getYearMonthDate,
}

function getYearMonthDate(date){
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    return [year,month,day]
}