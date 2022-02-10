//#region API

const ApiApp = require("../api/app-mobile")
const webDuDoan = require("../api/web-du-doan")



//#region ENDAPI

//#region SOCKET IO




//#endregion
function Controller(app,io){
    ApiApp(app)
    webDuDoan(app)
}

module.exports = {
    Controller
}
