const { lib } = require('crypto-js')
const fetch = require('node-fetch')
const { EncodeJson, DecodeString_AES, DecodeJson, DecodeJsonRequest, EncodeString, EncodeString_AES, DecodeString } = require('../../../assets/encode_decode')
const { SendMailGoogle, FunctionSqlInjection, SaveError, SignToken, CheckToken, FunctionSqlInjectionText } = require('../../../libs')
var jwt = require('jsonwebtoken');

var token = "Token k0iI4jjVSEtdddZkIG4naDOW4kcZLbz0"
var token_01 = "Token ALfPoYpBJh1TUVilppJKCsgMX362Gtfx"


const pool = require('../../../pgconnect')
const encode_decode = require('../../../assets/encode_decode')
const { timeNowDB } = require('../../../assets/TimeLibary')

const moment = require('moment');
const { AddBlockChains } = require('../../../libs/block_chains');

const date = new Date()


module.exports = function (app) {

    app.post(`/App/NapTienKhachHang`, async (req, res) => {
        try {

            const { authorization } = req.headers
            const { id_kh, email, tien_nap, noi_dung } = req.body

            let check = await CheckToken(email, authorization)

            if (check) {
                if (
                    FunctionSqlInjectionText(tien_nap) ||
                    FunctionSqlInjectionText(noi_dung) ||
                    FunctionSqlInjectionText(email)
                ) {
                    res.json({
                        status: 0,
                        data: [],
                        msg_vn: 'loi he thong',
                        msg_en: 'system error'
                    })
                } else {

                    // tien_nap : demo   +1000
                    await AddBlockChains(id_kh, noi_dung, 
                        tien_nap, date.getDate().toString(), 
                        (date.getMonth() + 1).toString(), date.getFullYear().toString(), 
                        `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)

                    res.json({
                        status: 1,
                        msg_vn: 'them thanh cong',
                        msg_en: 'success'
                    })
                }

            } else {
                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'het phien',
                    msg_en: 'end of session'
                })
            }

        } catch (error) {
            console.log(error)
            SaveError('app-mobile', '/App/LoaiSanPham', error, 'POST', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg: 'Loi he thong'
            })
        }
    })


    app.post(`/App/GioHang`, async (req, res) => {
        try {
            const { authorization } = req.headers
            const { id_kh, email, tien_nap, noi_dung } = req.body

            let check = await CheckToken(email, authorization)

            if (
                FunctionSqlInjectionText(email)
            ) {
                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'loi he thong',
                    msg_en: 'system error'
                })
            } else {

                const GioHang = await pool.query(`
                    select * from tai_khoan
                    where email = N'${email}'
                `)

                res.json({
                    status: 1,
                    gio_hang: GioHang.rows[0].gio_hang,
                    msg_vn: 'them thanh cong',
                    msg_en: 'success'
                })
            }

        } catch (error) {

        }
    })


    app.put(`/App/GioHang`, async (req, res) => {
        try {
            const { authorization } = req.headers
            const { id_kh, email, gio_hang } = req.body

            let check = await CheckToken(email, authorization)

            if (
                !check &&
                FunctionSqlInjectionText(email)
            ) {
                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'loi he thong',
                    msg_en: 'system error'
                })
            } else {

                const GioHang = await pool.query(`

                    update from tai_khoan set gio_hang = N'${gio_hang}'

                    where email = N'${email}'
                `)

                res.json({
                    status: 1,
                    gio_hang: GioHang.rows[0].gio_hang,
                    msg_vn: 'them thanh cong',
                    msg_en: 'success'
                })
            }

        } catch (error) {

        }
    })


    app.post(`/App/CoinEmail`, async (req, res) => {
        try {
            const { authorization } = req.headers
            const { email, id_loai_sp } = req.body

            console.log({ email, id_loai_sp })
            console.log({ authorization })

            let check = await CheckToken(email, authorization)
            // let check = true

            if (check) {
                if (
                    !FunctionSqlInjectionText(email)
                ) {

                    const ExcuteQuery = await pool.query(`
                        select * from tai_khoan
                        where email = N'${email}'
                    `)

                    const CoinQuery = await pool.query(`
                        select sum(coin_tranfer::float8)"coin" from coin_bc_loyal
                        where id_kh = (
                        select id_kh from tai_khoan where email = N'${email}'
                        )
                        and status = true 
                        or coin_tranfer like N'%-%'
                    `)
                    console.log(CoinQuery.rows)

                    if (CoinQuery.rows[0]?.coin === null) {
                        await DefautBlockChains(ExcuteQuery.rows[0].id_kh, '', '', '', '', '', '')
                        res.json({ status: 1, data: [{ coin: 0 }], dataUser: ExcuteQuery.rows })
                    } else {
                        res.json({ status: 1, data: CoinQuery.rows, dataUser: ExcuteQuery.rows })
                    }
                }
            } else {
                res.json({ status: 0, data: [] })
            }
        } catch (error) {

            console.log(error)
            
        }
    })


    

}