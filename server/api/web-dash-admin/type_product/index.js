const { lib } = require('crypto-js')
const fetch = require('node-fetch')
const { SendMailGoogle, checkRequest, SaveError, FunctionSqlInjection, FunctionSqlInjectionText } = require('../../../libs')

const jwt = require('jsonwebtoken');

const pool = require('../../../pgconnect')
const encode_decode = require('../../../assets/encode_decode')
const { timeNowDB } = require('../../../assets/TimeLibary')

module.exports = function (app) {

    app.get(`/WebDash/DanhSachTypeProduct`, async (req, res) => {
        try {

            if (checkRequest(req.headers.origin)) {

                const ExcuteQuery = await pool.query(`
                    select * from loai_sp
                `)

                res.json({
                    status: 1,
                    data: encode_decode.EncodeJson(ExcuteQuery.rows)
                })

            }
        } catch (error) {
            SaveError('web-dash-admin', '/WebDash/DanhSachTypeProduct', error, 'GET', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })

    app.post(`/WebDash/DanhSachTypeProduct`, async (req, res) => {
        try {
            const { NameTypeProduct } = req.body

            if (
                !checkRequest(req.headers.origin) ||
                FunctionSqlInjectionText(NameTypeProduct)

            ) {

                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'Lỗi phiên người dùng',
                    msg_en: 'User version error!'
                })
            } else {
                    const ExcuteQuery = await pool.query(`
                        insert into loai_sp (ten_loai_sp,created_at,updated_at,status)
                        values( N'${NameTypeProduct}' , now(), now(), false )
                    `)
                    res.json({
                        status: 1,
                        data: [],
                        msg_vn: 'Loại sản phẩm đã được tạo thành công!',
                        msg_en: 'TypeProduct has been created successfully!'
                    })
   
            }
        } catch (error) {

            console.log( error )

            SaveError('web-dash-admin', '/WebDash/DanhSachTypeProduct', error, 'POST', JSON.stringify(req.headers), req.socket.remoteAddress)

            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })

    app.put(`/WebDash/DanhSachTypeProduct`, async (req, res) => {
        try {
            const { NameTypeProduct, IDTypeProduct,Status } = req.body

            console.log( { NameTypeProduct, IDTypeProduct,Status } )
            if (
                !checkRequest(req.headers.origin) ||
                FunctionSqlInjectionText(NameTypeProduct) ||
                FunctionSqlInjectionText(IDTypeProduct) ||
                FunctionSqlInjectionText(Status)
            ) {
                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'Lỗi phiên người dùng',
                    msg_en: 'User version error!'
                })
            } else {
                const ExcuteQuery = await pool.query(`
                    update loai_sp set ten_loai_sp = N'${NameTypeProduct}', status = ${Status} where id_loai_sp = ${IDTypeProduct}
                `)

                res.json({
                    status: 1,
                    data: [],
                    msg_vn: 'Sửa thành công!',
                    msg_en: 'Success!'
                })
            }
        } catch (error) {
            SaveError('web-dash-admin', '/WebDash/DanhSachTypeProduct', error, 'PUT', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })

    app.delete(`/WebDash/DanhSachTypeProduct`, async (req, res) => {
        try {
            const { IDTypeProduct } = req.body
            if (
                !checkRequest(req.headers.origin) ||
                FunctionSqlInjection(IDTypeProduct)) {
                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'Lỗi phiên người dùng',
                    msg_en: 'User version error!'
                })
            } else {
                const ExcuteQuery = await pool.query(`
                    delete from loai_sp where id_loai_sp = ${IDTypeProduct}
                `)
                res.json({
                    status: 1,
                    data: [],
                    msg_vn: 'Xóa thành công!',
                    msg_en: 'Success!'
                })
            }
        } catch (error) {
            SaveError('web-dash-admin', '/WebDash/DanhSachTypeProduct', error, 'DELETE', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })


}