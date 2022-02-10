
const timeNow = `${(new Date()).getDate()}-${(new Date()).getMonth()+1}-${(new Date()).getFullYear()} ${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`

const timeNowDB = `${(new Date()).getFullYear()}-${(new Date()).getMonth()+1}-${(new Date()).getDate()} ${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`

module.exports = {
    timeNow,timeNowDB
}