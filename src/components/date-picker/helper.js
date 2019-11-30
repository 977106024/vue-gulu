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
    getYearMonthDate,
}

function getYearMonthDate(date){
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    return [year,month,day]
}