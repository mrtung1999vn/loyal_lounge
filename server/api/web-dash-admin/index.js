const { lib } = require('crypto-js')
const fetch = require('node-fetch')
const { EncodeJson, DecodeString_AES, DecodeJson, DecodeJsonRequest, EncodeString, EncodeString_AES, DecodeString } = require('../../assets/encode_decode')
const { SendMailGoogle, checkRequest, SaveError, FunctionSqlInjection } = require('../../libs')

const jwt = require('jsonwebtoken');

const pool = require('../../pgconnect')
const encode_decode = require('../../assets/encode_decode')
const { timeNowDB } = require('../../assets/TimeLibary')

const moment = require('moment')

module.exports = function(app) {
    app.post('/WebDash/DangNhap', async(req, res) => {
        try {
            const { ten_tai_khoan, mat_khau, subject, text } = req.body

            if (checkRequest(req.headers.origin)) {

                if (FunctionSqlInjection(ten_tai_khoan) ||
                    FunctionSqlInjection(mat_khau)
                ) {
                    res.json({
                        status: 0,
                        data: [],
                        msg: "Ten dang nhap hoac password chua ky tu dac biet"
                    })
                } else {

                    const ExcuteQuery = await pool.query(`
                        select * from tai_khoan_admin
                        where ten_tai_khoan = N'${ten_tai_khoan}'
                        and mat_khau_hash = N'${EncodeString(ten_tai_khoan, mat_khau)}'
                    `)

                    if (ExcuteQuery.rowCount > 0) {

                        SendMailGoogle('quachthanhtung1999@gmail.com', subject, text)

                        res.json({
                            status: 1,
                            data: encode_decode.EncodeJson(ExcuteQuery.rows),
                            msg: "Thanh cong"
                        })
                    } else {
                        res.json({
                            status: 0,
                            data: [],
                            msg: "Sai ten tai khoan hoac mat khau"
                        })
                    }
                }
            }
        } catch (error) {
            SaveError('web-dash-admin', '/WebDash/DangNhap', error, 'POST', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg: "Loi he thong"
            })
        }
    })
}