const { lib } = require('crypto-js')
const fetch = require('node-fetch')
const { EncodeJson, DecodeString_AES, DecodeJson, DecodeJsonRequest, EncodeString, EncodeString_AES, DecodeString } = require('../../assets/encode_decode')
const { SendMailGoogle, checkRequest } = require('../../libs')

const jwt = require('jsonwebtoken');

const pool = require('../../pgconnect')
const encode_decode = require('../../assets/encode_decode')
const { timeNowDB } = require('../../assets/TimeLibary')

const moment = require('moment')

module.exports = function(app) {

    app.post(`/WebDuDoan/DangNhap`, async(req, res) => {
        try {
            const { email, mat_khau, subject, text } = req.body
            if (checkRequest(req.headers.origin)) {
                // console.log({ email, mat_khau, subject, text })
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
                        // token:'',
                    })
                } else {
                    res.json({
                        status: 0,
                        data: []
                    })
                }
            }
        } catch (error) {
            console.log(error)
            res.json({
                status: 0,
                data: []
            })
        }
    })

    app.post(`/WebDuDoan/DangKyTaiKhoan`, async(req, res) => {
        try {
            if (checkRequest(req.headers.origin)) {
                const { email, mat_khau, dia_chi, so_dt } = req.body
                console.log(email, mat_khau, dia_chi, so_dt)
                const checkData = await pool.query(`
                    select email from tai_khoan
                    where email = N'${email}'
                `)
                console.log(checkData.rows)
                if (checkData.rowCount > 0) {
                    res.json({
                        status: 0,
                        data: [],
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
                    })
                }
            }
        } catch (error) {
            res.json({
                status: 0,
                data: [],
            })
        }
    })

    app.get(`/a/:idd`, async(req, res) => {
        try {

        } catch (error) {

        }
    })
}