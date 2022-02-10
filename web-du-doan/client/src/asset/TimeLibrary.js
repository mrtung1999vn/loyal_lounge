// const date = new Date("2021-07-02T06:52:09.000Z")
// const timeNow = `${(date).getDate()}-${(date).getMonth()+1}-${(date).getFullYear()} ${(date).getHours()}:${(date).getMinutes()}:${(date).getSeconds()}`
// const timeNowDB = `${(date).getFullYear()}-${(date).getMonth()+1}-${(date).getDate()} ${(date).getHours()}:${(date).getMinutes()}:${(date).getSeconds()}`
// function convertTime(str){
//     const date = new Date(str)
//     // console.log()
//     return `${(date).getDate()}-${(date).getMonth()+1}-${(date).getFullYear()} ${(date).getHours()}:${(date).getMinutes()}:${(date).getSeconds()}`
// }
// function convertTimeDateTime(time){
//     return `${time.split(" ")[0].split("-")[2]}-${time.split(" ")[0].split("-")[1].length === 1 ? "0" : ""}${time.split(" ")[0].split("-")[1]}-${time.split(" ")[0].split("-")[0].length === 1 ? "0" : ""}${time.split(" ")[0].split("-")[0]}`
// }




// 

function numberTimeNow(n){return n.toString().length ===1 ? `0${n}`: n}

function preDays(dateObj, numDays) {
    dateObj.setDate(dateObj.getDate() - numDays);
    return dateObj;
 }
 function nextDays(dateObj, numDays) {
    dateObj.setDate(dateObj.getDate() + numDays);
    return dateObj;
 }

const date = new Date(nextDays(new Date(),1))
const timeNow = `${(date).getDate()}-${(date).getMonth()+1}-${(date).getFullYear()} ${(date).getHours()}:${(date).getMinutes()}:${(date).getSeconds()}`
const timeNowDB = `${(date).getFullYear()}-${numberTimeNow((date).getMonth()+1)}-${numberTimeNow((date).getDate())} ${numberTimeNow((date).getHours())}:${numberTimeNow((date).getMinutes())}:${numberTimeNow((date).getSeconds())}`

const datePre = new Date(preDays(new Date(),1))

const timeDayPre = `${(datePre).getDate()}-${(datePre).getMonth()+1}-${(datePre).getFullYear()} ${(datePre).getHours()}:${(datePre).getMinutes()}:${(datePre).getSeconds()}`
const timeDayPreDB = `${(datePre).getFullYear()}-${numberTimeNow((datePre).getMonth()+1)}-${numberTimeNow((datePre).getDate())} ${numberTimeNow((datePre).getHours())}:${numberTimeNow((datePre).getMinutes())}:${numberTimeNow((datePre).getSeconds())}`


function convertTime(str){
    const date = new Date(str)
    // console.log()
    return `${(date).getDate()}-${(date).getMonth()+1}-${(date).getFullYear()} ${(date).getHours()}:${(date).getMinutes()}:${(date).getSeconds()}`
}
function convertTimeDateTime(time){
    return `${time.split(" ")[0].split("-")[2]}-${time.split(" ")[0].split("-")[1].length === 1 ? "0" : ""}${time.split(" ")[0].split("-")[1]}-${time.split(" ")[0].split("-")[0].length === 1 ? "0" : ""}${time.split(" ")[0].split("-")[0]}`
}


// 















export default {convertTime,convertTimeDateTime,timeNow,timeNowDB,timeDayPre,timeDayPreDB}