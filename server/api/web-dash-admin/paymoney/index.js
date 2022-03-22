const { lib } = require('crypto-js')
const fetch = require('node-fetch')
const { SendMailGoogle, checkRequest, SaveError, FunctionSqlInjection, FunctionSqlInjectionText } = require('../../../libs')

const jwt = require('jsonwebtoken');

const pool = require('../../../pgconnect')
const encode_decode = require('../../../assets/encode_decode')
const { timeNowDB } = require('../../../assets/TimeLibary')

module.exports = function (app) {

    app.get(`/WebDash/DanhSachPayMoney`, async (req, res) => {
        try {

            if (checkRequest(req.headers.origin)) {

                const ExcuteQuery = await pool.query(`
                    select * from cashmoney where status = true
                    order by created_at desc
                `)

                const ExcuteQueryTypePayMoney = await pool.query(`
                    select * from loai_sp
                `)

                // console.log( ExcuteQuery.rows )

                res.json({
                    status: 1,
                    data: encode_decode.EncodeJson(ExcuteQuery.rows),
                    dataTypePayMoney: encode_decode.EncodeJson(ExcuteQueryTypePayMoney.rows)
                })

            }
        } catch (error) {
            SaveError('web-dash-admin', '/WebDash/DanhSachPayMoney', error, 'GET', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })


    app.get(`/WebDash/DanhSachPayMoney/TypePayMoney/:id`, async (req, res) => {
        try {
            if (checkRequest(req.headers.origin)) {
                const { id } = req.params

                const ExcuteQuery = await pool.query(`
                    select * from san_pham,loai_sp
                    where loai_sp.id_loai_sp = san_pham.id_loai_sp 
                    and loai_sp.id_loai_sp = ${id}
                `)

                const ExcuteQueryTypePayMoney = await pool.query(`
                    select * from loai_sp
                `)

                res.json({
                    status: 1,
                    data: encode_decode.EncodeJson(ExcuteQuery.rows),
                    dataTypePayMoney: encode_decode.EncodeJson(ExcuteQueryTypePayMoney.rows)
                })
            }
        } catch (error) {
            console.log(error)
        }
    })

    app.post(`/WebDash/DanhSachPayMoney`, async (req, res) => {
        try {
            const { TypePayMoney, Description, Price, userName,PriceVND } = req.body

            console.log({ TypePayMoney, Description, Price, userName,PriceVND })

            if (
                !checkRequest(req.headers.origin) ||
                FunctionSqlInjectionText(TypePayMoney) ||
                FunctionSqlInjectionText(Description) ||
                FunctionSqlInjectionText(userName) ||
                FunctionSqlInjectionText(PriceVND) ||
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
                                N'${(parseInt(PriceVND)/21000)}',N'${Description}',N'Waiting for progressing',now(),now(),
                                N'${TypePayMoney.value}',N'${userName}',true,N'${PriceVND}'
                            )
                        `)
                    res.json({
                        status: 1,
                        data: [],
                        msg_vn: 'Sự kiện đã được tạo thành công!',
                        msg_en: 'PayMoney has been created successfully!'
                    })
            }
        } catch (error) {

            console.log(error)

            SaveError('web-dash-admin', '/WebDash/DanhSachPayMoney', error, 'POST', JSON.stringify(req.headers), req.socket.remoteAddress)

            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })

    app.put(`/WebDash/DanhSachPayMoney`, async (req, res) => {
        try {
            const { IDPayMoney, Description, TypeStatus, PriceVND, userName } = req.body

            console.log({ IDPayMoney, Description, TypeStatus, PriceVND, userName })
            if (
                !checkRequest(req.headers.origin) ||
                FunctionSqlInjectionText(Description) ||
                FunctionSqlInjection(IDPayMoney) ||
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
                const ExcuteQuery = await pool.query(`
                    update cashmoney set ghi_chu = N'${Description}',
                    trang_thai = N'${TypeStatus}',
                    ten_nguoi_dung = N'${userName}'
                    where id_cash = ${IDPayMoney}
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
            SaveError('web-dash-admin', '/WebDash/DanhSachPayMoney', error, 'PUT', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })

    app.delete(`/WebDash/DanhSachPayMoney`, async (req, res) => {
        try {
            const { IDPayMoney } = req.body
            if (
                !checkRequest(req.headers.origin) ||
                FunctionSqlInjection(IDPayMoney)) {
                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'Lỗi phiên người dùng',
                    msg_en: 'User version error!'
                })
            } else {
                const ExcuteQuery = await pool.query(`
                    delete from cashmoney
                    where id_cash = ${IDPayMoney}
                `)
                res.json({
                    status: 1,
                    data: [],
                    msg_vn: 'Xóa thành công!',
                    msg_en: 'Success!'
                })
            }
        } catch (error) {
            SaveError('web-dash-admin', '/WebDash/DanhSachPayMoney', error, 'DELETE', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })


}