const { lib } = require('crypto-js')
const fetch = require('node-fetch')
const { SendMailGoogle, checkRequest, SaveError, FunctionSqlInjection, FunctionSqlInjectionText } = require('../../../libs')

const jwt = require('jsonwebtoken');

const pool = require('../../../pgconnect')
const encode_decode = require('../../../assets/encode_decode')
const { timeNowDB } = require('../../../assets/TimeLibary')

module.exports = function (app) {

    app.get(`/WebDash/DanhSachCashMoney`, async (req, res) => {
        try {

            if (checkRequest(req.headers.origin)) {

                const ExcuteQuery = await pool.query(`
                    select * from cashmoney where status = false
                    order by created_at desc
                `)

                const ExcuteQueryTypeCashMoney = await pool.query(`
                    select * from loai_sp
                `)

                // console.log( ExcuteQuery.rows )

                res.json({
                    status: 1,
                    data: encode_decode.EncodeJson(ExcuteQuery.rows),
                    dataTypeCashMoney: encode_decode.EncodeJson(ExcuteQueryTypeCashMoney.rows)
                })

            }
        } catch (error) {
            SaveError('web-dash-admin', '/WebDash/DanhSachCashMoney', error, 'GET', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })


    app.get(`/WebDash/DanhSachCashMoney/TypeCashMoney/:id`, async (req, res) => {
        try {
            if (checkRequest(req.headers.origin)) {
                const { id } = req.params

                const ExcuteQuery = await pool.query(`
                    select * from san_pham,loai_sp
                    where loai_sp.id_loai_sp = san_pham.id_loai_sp 
                    and loai_sp.id_loai_sp = ${id}
                `)

                const ExcuteQueryTypeCashMoney = await pool.query(`
                    select * from loai_sp
                `)

                res.json({
                    status: 1,
                    data: encode_decode.EncodeJson(ExcuteQuery.rows),
                    dataTypeCashMoney: encode_decode.EncodeJson(ExcuteQueryTypeCashMoney.rows)
                })
            }
        } catch (error) {
            console.log(error)
        }
    })

    app.post(`/WebDash/DanhSachCashMoney`, async (req, res) => {
        try {
            const { TypeCashMoney, Description, Price, userName } = req.body

            console.log({ TypeCashMoney, Description, Price, userName })

            if (
                !checkRequest(req.headers.origin) ||
                FunctionSqlInjectionText(TypeCashMoney) ||
                FunctionSqlInjectionText(Description) ||
                FunctionSqlInjectionText(userName) ||
                FunctionSqlInjection(Price)
            ) {
                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'Lỗi phiên người dùng',
                    msg_en: 'User version error!'
                })
            } else {
                    const ExcuteQuery = await pool.query(`
                            insert into cashmoney (
                                money,ghi_chu,trang_thai,created_at,updated_at,kieu_thanh_toan,ten_nguoi_dung,status,money_vnd 
                            )
                            values(
                                N'${Price}',N'${Description}',N'Waiting for progressing',now(),now(),
                                N'${TypeCashMoney.value}',N'${userName}',false,N'${parseInt(Price)*21000}'
                            )
                        `)
                    res.json({
                        status: 1,
                        data: [],
                        msg_vn: 'Sự kiện đã được tạo thành công!',
                        msg_en: 'CashMoney has been created successfully!'
                    })
            }
        } catch (error) {

            console.log(error)

            SaveError('web-dash-admin', '/WebDash/DanhSachCashMoney', error, 'POST', JSON.stringify(req.headers), req.socket.remoteAddress)

            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })

    app.put(`/WebDash/DanhSachCashMoney`, async (req, res) => {
        try {
            const { IDCashMoney, Description, TypeStatus, PriceVND, userName } = req.body
            // console.log("Babababab")
            // console.log({ IDCashMoney, Description, TypeStatus, PriceVND, userName })
            if (
                !checkRequest(req.headers.origin) ||
                FunctionSqlInjectionText(Description) ||
                FunctionSqlInjection(IDCashMoney) ||
                FunctionSqlInjectionText(TypeStatus) ||
                FunctionSqlInjectionText(PriceVND) ||
                FunctionSqlInjectionText(userName) 
            ) {
                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'Lỗi phiên người dùng',
                    msg_en: 'User version error!'
                })
            } else {

                // console.log( TypeStatus )
                const ExcuteQuery = await pool.query(`
                    update cashmoney set ghi_chu = N'${Description}',
                    trang_thai = N'${TypeStatus}',
                    ten_nguoi_dung = N'${userName}'
                    where id_cash = ${IDCashMoney}
                `)

                if( TypeStatus === 'Success' ){
                    await pool.query(`
                    update coin_bc_loyal set status = true 
                    where id_coin_bc = (
                        select id_coin from cashmoney where id_cash = ${IDCashMoney}
                    )
                    `)
                }
                res.json({
                    status: 1,
                    data: [],
                    msg_vn: 'Sửa thành công!',
                    msg_en: 'Success!'
                })
            }
        } catch (error) {
            console.log( error )
            SaveError('web-dash-admin', '/WebDash/DanhSachCashMoney', error, 'PUT', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })

    app.delete(`/WebDash/DanhSachCashMoney`, async (req, res) => {
        try {
            const { IDCashMoney } = req.body

            console.log(  IDCashMoney ) 
            if (
                !checkRequest(req.headers.origin) ||
                FunctionSqlInjection(IDCashMoney)) {
                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'Lỗi phiên người dùng',
                    msg_en: 'User version error!'
                })
            } else {
                const ExcuteQuery = await pool.query(`
                    delete from cashmoney
                    where id_cash = ${IDCashMoney}
                `)
                res.json({
                    status: 1,
                    data: [],
                    msg_vn: 'Xóa thành công!',
                    msg_en: 'Success!'
                })
            }
        } catch (error) {
            SaveError('web-dash-admin', '/WebDash/DanhSachCashMoney', error, 'DELETE', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })


}