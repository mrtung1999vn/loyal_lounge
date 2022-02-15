const { lib } = require('crypto-js')
const fetch = require('node-fetch')
const { SendMailGoogle, checkRequest, SaveError, FunctionSqlInjection, FunctionSqlInjectionText } = require('../../../libs')

const jwt = require('jsonwebtoken');

const pool = require('../../../pgconnect')
const encode_decode = require('../../../assets/encode_decode')
const { timeNowDB } = require('../../../assets/TimeLibary')

module.exports = function (app) {

    app.get(`/WebDash/DanhSachCustomer`, async (req, res) => {
        try {

            if (checkRequest(req.headers.origin)) {

                const ExcuteQuery = await pool.query(`
                    select * from tai_khoan
                `)

                res.json({
                    status: 1,
                    data: encode_decode.EncodeJson(ExcuteQuery.rows)
                })

            }
        } catch (error) {
            SaveError('web-dash-admin', '/WebDash/DanhSachCustomer', error, 'GET', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })

    app.post(`/WebDash/DanhSachCustomer`, async (req, res) => {
        try {

            const { email,mat_khau,created_at,updated_at,status,dia_chi,so_dt,mat_khau_hash,image } = req.body
            
            if (FunctionSqlInjection(email) ||
                FunctionSqlInjection(mat_khau) ||
                FunctionSqlInjectionText( dia_chi ) ||
                FunctionSqlInjectionText( so_dt ) ||
                FunctionSqlInjectionText( image )
                
            ) {
                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'Lỗi phiên người dùng',
                    msg_en: 'User version error!'
                })
            }else{

                const CheckQuery = await pool.query(`
                    select * from tai_khoan
                    where email = N'${email}'
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
                    insert into tai_khoan(email,mat_khau,created_at,updated_at,status,dia_chi,so_dt,mat_khau_hash,image)
                    values(  
                        N'${email}', N'${mat_khau}', now(), now() , true , N'${dia_chi}', N'${so_dt}',N'${encode_decode.EncodeString(email,mat_khau)}',N'${image}'
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
            console.log( error )
            SaveError('web-dash-admin', '/WebDash/DanhSachCustomer', error, 'POST', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })

    app.put(`/WebDash/DanhSachCustomer`, async (req, res) => {
        try {

            const { email, mat_khau, status, dia_chi, so_dt, image, id_kh} = req.body

            if (FunctionSqlInjection(email) ||
                FunctionSqlInjection(mat_khau) ||
                FunctionSqlInjectionText( status ) ||
                FunctionSqlInjectionText( dia_chi ) ||
                FunctionSqlInjectionText( so_dt ) ||
                FunctionSqlInjectionText( image )
                
            ) {
                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'Lỗi phiên người dùng',
                    msg_en: 'User version error!'
                })
            }else{
                const ExcuteQuery = await  pool.query(`
                    update tai_khoan set email = N'${email}',mat_khau = N'${mat_khau}',status = ${status},
                    dia_chi = N'${dia_chi}',so_dt = N'${so_dt}', mat_khau_hash = N'${encode_decode.EncodeString( email,mat_khau  ) }', image = N'${image}'
                    where id_kh = ${id_kh}
                `)
                res.json({
                    status: 1,
                    data: [],
                    msg_vn: 'Sửa thành công!',
                    msg_en: 'Success!'
                })
            }
        } catch (error) {
            console.log(error)
            SaveError('web-dash-admin', '/WebDash/DanhSachCustomer', error, 'PUT', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })


    app.delete(`/WebDash/DanhSachCustomer`, async (req, res) => {
        try {

            const { email,mat_khau,created_at,updated_at,status,dia_chi,so_dt,mat_khau_hash,image,id_kh } = req.body

            if (
                FunctionSqlInjection(id_kh) ||
                FunctionSqlInjection(email) ||
                FunctionSqlInjection(mat_khau) 
            ) {
                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'Lỗi phiên người dùng',
                    msg_en: 'User version error!'
                })
            }else{
                const ExcuteQuery = await  pool.query(`
                    delete from tai_khoan where id_kh = ${id_kh}
                `)
                res.json({
                    status: 1,
                    data: [],
                    msg_vn: 'Xóa thành công!',
                    msg_en: 'Success!'
                })
            }
        } catch (error) {
            SaveError('web-dash-admin', '/WebDash/DanhSachCustomer', error, 'DELETE', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })


}