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


function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const SendMailGoogle = async (email, subject, text) => {
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
    try {
        var SqlInjectionArray = ["'", "-", " ",";"]
        // Check cái ' với cái - ( ' 1=1 -- ) check cả rỗng với underfined
        // console.log(data)
        let checkSQLInjection = false
        if (data === undefined && data === null) {
            return true
        } else {
            for (let i = 0; i < SqlInjectionArray.length; i++) {
                if (data.indexOf(SqlInjectionArray[i]) >= 0) {
                    return true
                } else {
                    checkSQLInjection = false
                }
            }
        }
        return checkSQLInjection
    } catch (error) {
        return false
    }
}

const FunctionSqlInjectionText = (data) => {
    try {
        var SqlInjectionArray = ["'", ";"]
        // Check cái ' với cái - ( ' 1=1 -- ) check cả rỗng với underfined
        // console.log(data)
        let checkSQLInjection = false
        // console.log(data)
        if (data === undefined && data === null) {
            return true
        } else {
            for (let i = 0; i < SqlInjectionArray.length; i++) {
                if (data.indexOf(SqlInjectionArray[i]) >= 0) {
                    return true
                } else {
                    checkSQLInjection = false
                }
            }
        }
        return checkSQLInjection
    } catch (error) {
        return false
    }
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
        if (value.indexOf(arrayRequest[i]) >= 0) {
            return true
        } else {
            check = false
        }
    }
    return check
}

const createGift = async () => {
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


//#region Token
const SignToken = async (email,token)=>{
    try {

        const CheckToken = await pool.query(`
            select * from "token"
            where email = N'${email}'
        `)

        if( CheckToken.rowCount > 0 ){
            const UpdateData = await pool.query(`
            update "token" set "token" = N'${token}',
            created_at = now(),updated_at= now(),
            request_time = N'0',
            email =N'${email}'
            where id_token = (
                select id_token from "token"
                where email = N'${email}'
                limit 1
            )
            `)
        }else{
            const newData = await pool.query(`
                insert into "token" (token,created_at,updated_at,email,request_time,request_again)
                values( N'${token}',now(),now(),N'${email}',N'0',N'0' )
            `)
        }
    } catch (error) {
        console.log(error )
    }
}

const SignAgainToken = async(email)=>{
    try {
        // Check User block
        const User = await pool.query(`
            select status from tai_khoan
            where email = N'${email}'
        `)
        
        // console.log( email )

        if( User.rows[0]?.status === true ){
            // Check Number Sign Again Token
                const DataNumber = await pool.query(`
                select * from "token"
                where email = N'${email}'
            `)

            // console.log( DataNumber.rows )
            let Number = DataNumber.rows[0].request_again === null ? 0 : 
            parseInt( DataNumber.rows[0].request_again )

            console.log( Number )

            //Gọi khởi tạo token lớn hơn hoặc = 2 là bị khóa
            if( Number >= parseInt( process.env.count_block_again_token ) ){

                await pool.query(`
                    update tai_khoan set status = false 
                    where email = N'${email}'
                `)

                // Nội dung block_user do người dùng sử dụng token trái phép quá >= 4 lần, ghi ngờ là sử dụng bot

                await pool.query(`
                    insert into block_user (noi_dung, email, created_at, updated_at, type_block)
                    values( N'Too many token initialization', N'${email}', now(), now(), N'1002. Sign Agian Token')
                `)

                return false
            }else{ 
                // Khởi tạo token thành công, không có dấu hiệu spam api
                await pool.query(`
                    update "token" set request_again = N'${parseInt( Number ) + 1 }',
                    request_time = N'0'
                    where email = '${email}'
                `)
                return true
            }

            // Check Number Sign Again Token
        }else{
            return false
        }

    } catch (error) {
        console.log( error )
    }
}

const CheckToken = async (email,token)=>{
    try {
        const User = await pool.query(`
            select * from tai_khoan
            where email = N'${email}'
        `)

        // Kiểm tra người dùng đã bị block hay chưa?
        if( User.rows[0]?.status === true ){
            //#region Active
            try{
                if( token.indexOf('Token') >= 0){
                    const CheckData = await pool.query(`
                        select * from "token"
                        where created_at + interval '${process.env.time_out_token} second' >= now() and 
                        "token" = N'${token.split(' ')[1]}'
                        and email = N'${email}'
                    `)
    
                    // console.log( CheckData.rows )
    
                    // Kiểm tra nếu có token còn hạn không
    
                    if( CheckData.rowCount > 0 ){ // Còn hạn
                        
                        // Gọi Token
                        const checkRequestTime = await pool.query(`
                            select * from "token"
                            where created_at + interval '${process.env.time_out_token} second' >= now()
                            and email = '${email}'
                            and "token" = '${token.split(' ')[1]}'
                        `)
                        // Request_Time
    
                        // console.log( checkRequestTime.rows )
                        try{
                            let Number = checkRequestTime.rows[0]?.request_time === null ? 0 : 
                            parseInt( checkRequestTime.rows[0]?.request_time )
                            
                            // Number request time === 4 block user
                            console.log("Number iss", Number )
                            if( Number === parseInt( process.env.count_block_token ) ){
                                await pool.query(`
                                    update tai_khoan set status = false 
                                    where email = N'${email}'
                                `)
        
                                // Nội dung block_user do người dùng sử dụng token trái phép quá >= 4 lần, ghi ngờ là sử dụng bot
        
                                await pool.query(`
                                    insert into block_user (noi_dung, email, created_at, updated_at, type_block)
                                    values( N'Accessing the api from another source and using the token illegally', N'${email}', now(), now(), N'1001. Token')
                                `)
        
                                return false
                            }else{
    
                                await pool.query(`
                                    
                                    update "token" set request_again = N'0'
                                    
                                    where email = N'${email}'
    
                                `)
                                
    
                                await pool.query(`
        
                                    update "token" set request_time = N'${parseInt( Number ) + 1 }',
                                    request_again = N'0'
                                    where created_at + interval '${process.env.time_out_token} second' >= now()
                                    and email = N'${email}'
                                    
                                `)
                                return true
                            }
                        }catch(error){
                            // Thay đổi token và restart lại request again token
                            await pool.query(`
                                update "token" set request_again = N'0'
                                where email = N'${email}'
                                and "token" = '${token.split(' ')[1]}'
                            `)
                            return false
                        }
                    }else{ // Hết hạn token
                        // Thay đổi token và restart lại request again token
                        await pool.query(`
                            update "token" set request_again = N'0'
                            where email = '${email}'
                            and "token" = '${token.split(' ')[1]}'
                        `)
                        return false
                    }
                }
            }catch(error){
                return false
            }
            //#endregion
        }else{
            // Block trị mấy đứa hacker =))
            //#region InActive
            return false
            //#endregion
        }

    } catch (error) {
        // Lỗi phiên
        console.log( error )
        return false
    }
}
//#endregion



//#region Error
const SaveError = async (error, path_api, ghi_chu, method, request, ip_address) => {
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
    SignAgainToken,
    SendMailGoogle,
    checkRequest,
    FunctionSqlInjection,
    FunctionRemoveCharacter,
    SaveError,
    FunctionSqlInjectionText,
    SignToken,CheckToken
}