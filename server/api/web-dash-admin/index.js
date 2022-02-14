const { lib } = require('crypto-js')
const fetch = require('node-fetch')
const { EncodeJson, DecodeString_AES, DecodeJson, DecodeJsonRequest, EncodeString, EncodeString_AES, DecodeString } = require('../../assets/encode_decode')
const { SendMailGoogle, checkRequest, SaveError, FunctionSqlInjection } = require('../../libs')

const jwt = require('jsonwebtoken');

const pool = require('../../pgconnect')
const encode_decode = require('../../assets/encode_decode')
const { timeNowDB } = require('../../assets/TimeLibary')

const moment = require('moment');
const user = require('./user');

module.exports = function(app) {


    // Dash

    user(app)

    // API get, post, put, delete
    // get hien thi du lieu
    // post them du lieu vao co so du lieu
    // put sua du lieu trong co so du lieu
    // delete xoa du lieu trong co so du lieu

    app.get('/DanhSachNguoiDung', async (req,res)=>{
        try{
            // Chay cau lenh query trong co so du lieu

            const ExcuteQuery = await pool.query(`select * from tai_khoan_admin`) 

            // Hien thi lien server // trinh duyet

            res.json({
                status:1,
                data: ExcuteQuery.rows
            })
            
        }catch(error){}
    })

    app.post('/WebDash/DangNhap', async(req, res) => {
        try {
            const { ten_tai_khoan, mat_khau, subject, text } = req.body
            
            if (checkRequest(req.headers.origin)) {

                if (FunctionSqlInjection(ten_tai_khoan) ||
                    FunctionSqlInjection(mat_khau)
                ) {
                    // console.log( { ten_tai_khoan, mat_khau, subject, text } )
                    res.json({
                        status: 0,
                        data: [],
                        msg_vn: "Ten dang nhap hoac password chua ky tu dac biet",
                        msg_en: "Username or password contains special characters"
                    })
                } else {
                    console.log( { ten_tai_khoan, mat_khau, subject, text } )
                    const ExcuteQuery = await pool.query(`
                        select * from tai_khoan_admin
                        where ten_tai_khoan = N'${ten_tai_khoan}'
                        and mat_khau_hash = N'${EncodeString(ten_tai_khoan, mat_khau)}'
                    `)
                    // console.log( ExcuteQuery.rows )
                    if (ExcuteQuery.rowCount > 0) {

                        SendMailGoogle('quachthanhtung1999@gmail.com', subject, text)

                        res.json({
                            status: 1,
                            data: encode_decode.EncodeJson(ExcuteQuery.rows),
                            msg_vn: "Thanh cong",
                            msg_en: "Success!"
                        })
                    } else {
                        res.json({

                            status: 0,
                            data: [],
                            msg: "Sai ten tai khoan hoac mat khau",
                            msg_en:"Wrong username and password"
                        })
                    }
                }
            }
        } catch (error) {
            console.log( error )
            SaveError('web-dash-admin', '/WebDash/DangNhap', error, 'POST', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg: "Loi he thong"
            })
        }
    })
}