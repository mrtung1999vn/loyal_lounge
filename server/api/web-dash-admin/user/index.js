const { lib } = require('crypto-js')
const fetch = require('node-fetch')
const { SendMailGoogle, checkRequest, SaveError, FunctionSqlInjection } = require('../../../libs')

const jwt = require('jsonwebtoken');

const pool = require('../../../pgconnect')
const encode_decode = require('../../../assets/encode_decode')
const { timeNowDB } = require('../../../assets/TimeLibary')

module.exports = function (app) {

    app.get(`/WebDash/DanhSachUsers`, async (req, res) => {
        try {

            if (checkRequest(req.headers.origin)) {

                const ExcuteQuery = await pool.query(`
                    select id_tk_admin,mat_khau_hash,ten_tai_khoan,mat_khau from tai_khoan_admin
                `)

                res.json({
                    status: 1,
                    data: encode_decode.EncodeJson(ExcuteQuery.rows)
                })

            }
        } catch (error) {
            SaveError('web-dash-admin', '/WebDash/DanhSachUsers', error, 'GET', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })

    app.post(`/WebDash/DanhSachUsers`, async (req, res) => {
        try {
            const { ten_tai_khoan, mat_khau } = req.body
            if (
                !checkRequest(req.headers.origin) ||
                FunctionSqlInjection(ten_tai_khoan) ||
                FunctionSqlInjection(mat_khau)
            ) {
                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'Lỗi phiên người dùng',
                    msg_en: 'User version error!'
                })
            }else{
                console.log( { ten_tai_khoan, mat_khau } )
                const CheckQuery = await pool.query(`
                    select * from tai_khoan_admin
                    where ten_tai_khoan = N'${ten_tai_khoan}'
                `)
                if (CheckQuery.rowCount > 0) {
                    res.json({
                        status: 0,
                        data: [],
                        msg_vn: 'Tài khoản người dùng đã tồn tại',
                        msg_en: 'Account user already exists'
                    })
                } else {
                    const ExcuteQuery = await pool.query(`
                    insert into tai_khoan_admin (
                        ten_tai_khoan,mat_khau,mat_khau_hash,created_at,updated_at)
                        values(
                        N'${ten_tai_khoan}',N'${mat_khau}',N'${encode_decode.EncodeString(ten_tai_khoan, mat_khau)}',now(),now()
                        )
                    `)
                    res.json({
                        status: 1,
                        data: [],
                        msg_vn: 'Tài khoản đã được tạo thành công!',
                        msg_en: 'Account has been created successfully!'
                    })
                }
            }
        } catch (error) {
            SaveError('web-dash-admin', '/WebDash/DanhSachUsers', error, 'POST', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })

    app.put(`/WebDash/DanhSachUsers`, async (req, res) => {
        try {
            const { id_tk_admin,ten_tai_khoan, mat_khau } = req.body
            if (
                !checkRequest(req.headers.origin) ||
                FunctionSqlInjection(ten_tai_khoan) ||
                FunctionSqlInjection(mat_khau) ||
                FunctionSqlInjection(id_tk_admin)
            ) {
                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'Lỗi phiên người dùng',
                    msg_en: 'User version error!'
                })
            }else{
                const ExcuteQuery = await  pool.query(`
                    update tai_khoan_admin set ten_tai_khoan = N'${ten_tai_khoan}',
                    mat_khau = N'${mat_khau}',
                    mat_khau_hash = N'${encode_decode.EncodeString(ten_tai_khoan,mat_khau)}'
                    where id_tk_admin = ${id_tk_admin}
                `)
                res.json({
                    status: 1,
                    data: [],
                    msg_vn: 'Sửa thành công!',
                    msg_en: 'Success!'
                })
            }
        } catch (error) {
            SaveError('web-dash-admin', '/WebDash/DanhSachUsers', error, 'PUT', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })


    app.delete(`/WebDash/DanhSachUsers`, async (req, res) => {
        try {
            const { id_tk_admin,ten_tai_khoan, mat_khau } = req.body
            if (
                !checkRequest(req.headers.origin) ||
                FunctionSqlInjection(ten_tai_khoan) ||
                FunctionSqlInjection(mat_khau) ||
                FunctionSqlInjection(id_tk_admin)
            ) {
                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'Lỗi phiên người dùng',
                    msg_en: 'User version error!'
                })
            }else{
                const ExcuteQuery = await  pool.query(`
                    delete from tai_khoan_admin where id_tk_admin = ${id_tk_admin}
                `)
                res.json({
                    status: 1,
                    data: [],
                    msg_vn: 'Xóa thành công!',
                    msg_en: 'Success!'
                })
            }
        } catch (error) {
            SaveError('web-dash-admin', '/WebDash/DanhSachUsers', error, 'DELETE', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })


}