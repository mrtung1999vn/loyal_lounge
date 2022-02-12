var randomstring = require("randomstring");
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const pool = require("../pgconnect");
const fetch = require('node-fetch')

require('dotenv').config()
    //#region Function
const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // user: 'mctop1.vn@gmail.com',
        // pass: 'thanhan2901',
        user: 'hethong3000@gmail.com',
        pass: 'TUng0936563013*',
    }
});
const SendMailGoogle = async(email, subject, text) => {
    try {
        const res = await fetch(process.env.URL_LINK_SEND_GMAIL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, subject, text })
        })
        const content = await res.JSON()
        if (content.status === 1) {
            return 1
        } else {
            return 0
        }
    } catch (error) {
        return 0
    }
}

// Hàm FunctionSqlInjection xử lý SQL Injection
const FunctionSqlInjection = (data) => {
    var SqlInjectionArray = ["'", "-", " "]
        // Check cái ' với cái - ( ' 1=1 -- ) check cả rỗng với underfined
    console.log(data)
    let checkSQLInjection = false
    if (data === undefined && data === null) {
        return true
    } else {
        for (let i = 0; i < SqlInjectionArray.length; i++) {
            if (data.indexOf(SqlInjectionArray[i]) > 0) {
                return true
            } else {
                checkSQLInjection = false
            }
        }
    }
    return checkSQLInjection
}

// Hàm xóa '
const FunctionRemoveCharacter = (data) => {
    try {
        return data.split("'").join("")
    } catch (error) {
        return data
    }
}

// SendMailGoogle('quachthanhtung1999@gmail.com','demo012','demo222')
const checkRequest = (value) => {
    const arrayRequest = process.env.checkRequest.split('|')
    let check = false
    for (let i = 0; i < arrayRequest.length; i++) {
        console.log(value.indexOf(arrayRequest[i]))
        if (value.indexOf(arrayRequest[i]) >= 0) {
            return true
        } else {
            check = false
        }
    }
    return check
}

const createGift = async() => {
        try {
            function makeid(length) {
                var dateNow = new Date()
                var result = '';
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for (var i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() *
                        charactersLength));
                }
                return `0${dateNow.getDate()}${dateNow.getFullYear()}${dateNow.getSeconds()}${result}`;
            }
            for (let i = 0; i <= 5; i++) {
                const newData = await pool.query(`
            insert into giam_gia(ma_giam,created_at,updated_at,gia_tri,check_bool)
            values(
              N'${makeid(5)}',NOW(),NOW(),N'500000',false
            )
          `)
            }
            console.log(makeid(5));
        } catch (error) {
            console.log(error)
        }
    }
    //#endregion Function

//#region Error
const SaveError = async(error, path_api, ghi_chu, method, request, ip_address) => {
    try {
        // console.log(error, path_api, ghi_chu, method, request)
        const ExcuteQuery = await pool.query(`
        insert into error (error,path_api,ghi_chu,created_at,updated_at,"method",request,ip_address)
        values(N'${error}',N'${path_api}',N'${FunctionRemoveCharacter(ghi_chu)}',now(),now(),N'${method}',N'${request}',N'${ip_address}')
        `

        )
    } catch (error) {
        console.log(error)
    }
}

//#endregion
module.exports = {
    SendMailGoogle,
    checkRequest,
    FunctionSqlInjection,
    FunctionRemoveCharacter,
    SaveError
}