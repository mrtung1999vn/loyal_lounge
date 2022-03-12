//#region API

const appMobile = require("../api/app-mobile")
const ApiApp = require("../api/app-mobile")
const webDashAdmin = require("../api/web-dash-admin") // quan tri
const webDuDoan = require("../api/web-du-doan")
const webNightClub = require("../api/web-night-club")



//#region ENDAPI

//#region SOCKET IO




//#endregion
function Controller(app, io) {
    ApiApp(app)
    webDuDoan(app)
    appMobile( app)
    webDashAdmin( app )
    webNightClub(app)
}

module.exports = {
    Controller
}