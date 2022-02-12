//#region API

const appMobile = require("../api/app-mobile")
const ApiApp = require("../api/app-mobile")
const webDashAdmin = require("../api/web-dash-admin")
const webDuDoan = require("../api/web-du-doan")



//#region ENDAPI

//#region SOCKET IO




//#endregion
function Controller(app, io) {
    ApiApp(app)
    webDuDoan(app)
    appMobile(app)
    webDashAdmin(app)
}

module.exports = {
    Controller
}