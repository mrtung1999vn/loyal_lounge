const { lib } = require('crypto-js')
const fetch = require('node-fetch')
const { EncodeJson, DecodeString_AES, DecodeJson, DecodeJsonRequest, EncodeString, EncodeString_AES, DecodeString } = require('../../assets/encode_decode')
const { SendMailGoogle, FunctionSqlInjection, SaveError, SignToken, CheckToken, FunctionSqlInjectionText, SignAgainToken } = require('../../libs')
var jwt = require('jsonwebtoken');

var token = "Token k0iI4jjVSEtdddZkIG4naDOW4kcZLbz0"
var token_01 = "Token ALfPoYpBJh1TUVilppJKCsgMX362Gtfx"


const pool = require('../../pgconnect')
const encode_decode = require('../../assets/encode_decode')
const { timeNowDB } = require('../../assets/TimeLibary')

const moment = require('moment');
const manchinh = require('./manchinh');
const loaisanpham = require('./loaisanpham');
const taikhoan = require('./taikhoan');
const { DefautBlockChains } = require('../../libs/block_chains');
const thuVien = require('./thu-vien');
const sanpham = require('./sanpham');
const dat_ban = require('./dat_ban');



module.exports = function (app) {
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

    // Lỗi phiên gọi lại Sign Token
    app.post('/SignAgainToken', async (req, res) => {
        try {
            const { email, token, subject, text } = req.body
            // console.log( { email, token, subject, text } )

            let checkAgainToken = await SignAgainToken(email)
            if (
                !FunctionSqlInjection(email)
                && checkAgainToken === true
                ) {
                let token_sign = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: email + makeid(10)
                }, 'secret');
                SignToken(email, token_sign)

                res.json({
                    status:1,
                    token_sign: token_sign 
                })
            }else{
                res.json({
                    status:0,
                    data:[]
                })
            }
        } catch (error) {
            res.json({
                status:0,
                data:[]
            })
        }
    })

    app.post(`/DangNhap`, async (req, res) => {
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
                and status = true
            `)

            if (ExcuteQuery.rowCount > 0) {

                SendMailGoogle(email, subject, text)
                let token_sign = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: email + makeid(10)
                }, 'secret');
                SignToken(email, token_sign)

                res.json({
                    status: 1,
                    data: ExcuteQuery.rows,
                    token: token_sign,
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
            console.log(error)
            SaveError('app-mobile', '/DangNhap', error, 'POST', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg: "Loi he thong"
            })
        }
    })

    app.post(`/DangKyTaiKhoan`, async (req, res) => {
        try {

            const { email, mat_khau, dia_chi, so_dt } = req.body
            if (
                FunctionSqlInjection(email) ||
                FunctionSqlInjection(mat_khau)) {
                res.json({
                    status: 0,
                    data: [],
                    msg: 'Nguoi nhap dien ki tu dac biet',
                    msg_en: 'error'
                })
            } else {

                const checkData = await pool.query(`
                    select email from tai_khoan
                    where email = N'${email}'
                `)

                if (checkData.rowCount > 0) {
                    res.json({
                        status: 0,
                        data: [],
                        msg: 'Tai khoan da ton tai',
                        msg_en: 'Account already exists'
                    })
                } else {
                    await pool.query(`
                    insert into tai_khoan (
                        email ,created_at ,updated_at, status,dia_chi,so_dt,mat_khau_hash,gio_hang
                    )
                    values(
                        N'${email}',now(),now(),true,N'${dia_chi}',N'${so_dt}',N'${EncodeString(email, mat_khau)}',
                        N'[]'
                    )
                `)

                    const ExcuteQuery = await pool.query(`
                        select * from tai_khoan where email = N'${email}'
                `)

                await DefautBlockChains(ExcuteQuery.rows[0].id_kh,'','','','','','')

                    res.json({
                        status: 1,
                        data: [],
                        msg: 'Them tai khoan thanh cong',
                        msg_en: 'Success'
                    })
                }
            }

        } catch (error) {
            SaveError('app-mobile', '/DangKyTaiKhoan', error, 'POST', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg: 'Loi he thong',
                msg_en: 'error'
                
            })
        }
    })

    app.post(`/TestToken`, async (req, res) => {
        try {
            const { authorization } = req.headers
            const { email } = req.body

            let check = await CheckToken(email, authorization)
            if (check) {
                const newData = await pool.query(`
                    select * from "token"
                `)
                res.json({
                    status: 1,
                    data: newData.rows
                })
            } else {
                res.json({
                    status: 0,
                    msg_vn: 'loi phien token',
                    msg_en: 'session expires'
                })
            }


        } catch (error) {

        }
    })


    manchinh(app)
    loaisanpham(app)
    sanpham(app)
    taikhoan(app)
    thuVien(app)

    dat_ban( app)

}