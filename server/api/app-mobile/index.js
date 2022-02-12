const { lib } = require('crypto-js')
const fetch = require('node-fetch')
const { EncodeJson, DecodeString_AES, DecodeJson, DecodeJsonRequest, EncodeString, EncodeString_AES, DecodeString } = require('../../assets/encode_decode')
const { SendMailGoogle, FunctionSqlInjection, SaveError } = require('../../libs')

var token = "Token k0iI4jjVSEtdddZkIG4naDOW4kcZLbz0"
var token_01 = "Token ALfPoYpBJh1TUVilppJKCsgMX362Gtfx"


const pool = require('../../pgconnect')
const encode_decode = require('../../assets/encode_decode')
const { timeNowDB } = require('../../assets/TimeLibary')

const moment = require('moment')

module.exports = function(app) {
    app.post(`/DangNhap`, async(req, res) => {
        try {
            const { email, mat_khau, subject, text } = req.body

            if (FunctionSqlInjection(email) ||
                FunctionSqlInjection(mat_khau)) {

                res.json({
                    status: 0,
                    data: [],
                    msg: "Ten dang nhap hoac password chua ky tu dac biet"
                })
            }

            const ExcuteQuery = await pool.query(`
                select * from tai_khoan
                where email = N'${email}'
                and mat_khau_hash = N'${EncodeString(email, mat_khau)}'
            `)

            if (ExcuteQuery.rowCount > 0) {

                SendMailGoogle('quachthanhtung1999@gmail.com', subject, text)

                res.json({
                    status: 1,
                    data: ExcuteQuery.rows,
                    msg: "Thanh cong"
                })
            } else {
                res.json({
                    status: 0,
                    data: [],
                    msg: "Sai ten tai khoan hoac mat khau"
                })
            }
        } catch (error) {
            SaveError('app-mobile', '/DangNhap', error, 'POST', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg: "Loi he thong"
            })
        }
    })

    app.post(`/DangKyTaiKhoan`, async(req, res) => {
        try {

            const { email, mat_khau, dia_chi, so_dt } = req.body
            if (
                FunctionSqlInjection(email) ||
                FunctionSqlInjection(mat_khau)) {
                res.json({
                    status: 0,
                    data: [],
                    msg: 'Nguoi nhap dien ki tu dac biet'
                })
            }
            const checkData = await pool.query(`
                select email from tai_khoan
                where email = N'${email}'
            `)
            console.log(checkData.rows)
            if (checkData.rowCount > 0) {
                res.json({
                    status: 0,
                    data: [],
                    msg: 'Tai khoan da ton tai'
                })
            } else {
                await pool.query(`
                    insert into tai_khoan (
                        email ,created_at ,updated_at, status,dia_chi,so_dt,mat_khau_hash 
                    )
                    values(
                        N'${email}',now(),now(),true,N'${dia_chi}',N'${so_dt}',N'${EncodeString(email, mat_khau)}'
                    )
                `)

                res.json({
                    status: 1,
                    data: [],
                    msg: 'Them tai khoan thanh cong'
                })
            }
        } catch (error) {
            SaveError('app-mobile', '/DangKyTaiKhoan', error, 'POST', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg: 'Loi he thong'
            })
        }
    })

}