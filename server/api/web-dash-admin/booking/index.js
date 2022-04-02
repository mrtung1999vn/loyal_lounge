const { lib } = require('crypto-js')
const fetch = require('node-fetch')
const { SendMailGoogle, checkRequest, SaveError, FunctionSqlInjection, FunctionSqlInjectionText } = require('../../../libs')

const jwt = require('jsonwebtoken');

const pool = require('../../../pgconnect')
const encode_decode = require('../../../assets/encode_decode')
const { timeNowDB } = require('../../../assets/TimeLibary')

module.exports = function (app) {

    app.get(`/WebDash/suKienHienTai`,async(req,res)=>{
        try {
            const newData = await pool.query(`
                select * from su_kien
                where status = true
                order by created_at desc
            `)
            res.json({status:1,data:newData.rows})
        } catch (error) {
            res.json({status:0,data:[]})
        }
    })

    app.get(`/WebDash/DanhSachBookingTheoSuKien/:id_su_kien`,async(req,res)=>{
        try {

            if( checkRequest( req.headers.origin ) ){
                
                const {id_su_kien} = req.params

                const ExcuteQuery = await pool.query(`
                    select * from booking_su_kien,
                    tai_khoan
                    where booking_su_kien.id_kh = tai_khoan.id_kh 
                    and booking_su_kien.id_su_kien = ${id_su_kien}
                    order by booking_su_kien.created_at desc 
                `)

                const ExcuteQueryTypeBooking = await pool.query(`
                    select * from loai_sp
                `)

                // console.log( ExcuteQuery.rows )

                res.json({
                    status: 1,
                    data: encode_decode.EncodeJson(ExcuteQuery.rows),
                    dataTypeBooking: encode_decode.EncodeJson(ExcuteQueryTypeBooking.rows)
                })
            }
        } catch (error) {
            res.json({status:0,data:[]})
        }
    })
 
    app.get(`/WebDash/DanhSachBooking`, async (req, res) => {
        try {

            if (checkRequest(req.headers.origin)) {

                const ExcuteQuery = await pool.query(`
                    select * from booking_su_kien,
                    tai_khoan
                    where booking_su_kien.id_kh = tai_khoan.id_kh 
                    order by booking_su_kien.created_at desc 
                `)

                const ExcuteQueryTypeBooking = await pool.query(`
                    select * from loai_sp
                `)

                // console.log( ExcuteQuery.rows )

                res.json({
                    status: 1,
                    data: encode_decode.EncodeJson(ExcuteQuery.rows),
                    dataTypeBooking: encode_decode.EncodeJson(ExcuteQueryTypeBooking.rows)
                })

            }
        } catch (error) {
            SaveError('web-dash-admin', '/WebDash/DanhSachBooking', error, 'GET', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })


    app.get(`/WebDash/DanhSachBooking/TypeBooking/:id`, async (req, res) => {
        try {
            if (checkRequest(req.headers.origin)) {
                const { id } = req.params

                const ExcuteQuery = await pool.query(`
                    select * from san_pham,loai_sp
                    where loai_sp.id_loai_sp = san_pham.id_loai_sp 
                    and loai_sp.id_loai_sp = ${id}
                `)

                const ExcuteQueryTypeBooking = await pool.query(`
                    select * from loai_sp
                `)

                res.json({
                    status: 1,
                    data: encode_decode.EncodeJson(ExcuteQuery.rows),
                    dataTypeBooking: encode_decode.EncodeJson(ExcuteQueryTypeBooking.rows)
                })
            }
        } catch (error) {
            console.log(error)
        }
    })

    app.post(`/WebDash/DanhSachBooking`, async (req, res) => {
        try {
            const { TypeBooking, Description, Price, userName } = req.body

            console.log({ TypeBooking, Description, Price, userName })

            if (
                !checkRequest(req.headers.origin) ||
                FunctionSqlInjectionText(TypeBooking) ||
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
                                N'${TypeBooking.value}',N'${userName}',false,N'${parseInt(Price)*21000}'
                            )
                        `)
                    res.json({
                        status: 1,
                        data: [],
                        msg_vn: 'Sự kiện đã được tạo thành công!',
                        msg_en: 'Booking has been created successfully!'
                    })
            }
        } catch (error) {

            console.log(error)

            SaveError('web-dash-admin', '/WebDash/DanhSachBooking', error, 'POST', JSON.stringify(req.headers), req.socket.remoteAddress)

            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })

    app.put(`/WebDash/DanhSachBooking`, async (req, res) => {
        try {
            const { IDBooking, Description, TypeStatus, PriceVND, userName } = req.body
            // console.log("Babababab")
            // console.log({ IDBooking, Description, TypeStatus, PriceVND, userName })
            if (
                !checkRequest(req.headers.origin) ||
                FunctionSqlInjectionText(Description) ||
                FunctionSqlInjection(IDBooking) ||
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
                    where id_cash = ${IDBooking}
                `)

                if( TypeStatus === 'Success' ){
                    await pool.query(`
                    update coin_bc_loyal set status = true 
                    where id_coin_bc = (
                        select id_coin from cashmoney where id_cash = ${IDBooking}
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
            SaveError('web-dash-admin', '/WebDash/DanhSachBooking', error, 'PUT', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })

    app.delete(`/WebDash/DanhSachBooking`, async (req, res) => {
        try {
            const { IDBooking } = req.body

            console.log(  IDBooking ) 
            if (
                !checkRequest(req.headers.origin) ||
                FunctionSqlInjection(IDBooking)) {
                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'Lỗi phiên người dùng',
                    msg_en: 'User version error!'
                })
            } else {
                const ExcuteQuery = await pool.query(`
                    delete from cashmoney
                    where id_cash = ${IDBooking}
                `)
                res.json({
                    status: 1,
                    data: [],
                    msg_vn: 'Xóa thành công!',
                    msg_en: 'Success!'
                })
            }
        } catch (error) {
            SaveError('web-dash-admin', '/WebDash/DanhSachBooking', error, 'DELETE', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })



    app.post(`/Webapp/ChinhSuaBooking` , async(req,res)=>{
        try {
            

            

        } catch (error) {
            res.json({
                status: 0,
                data:[]
            })
        }
    })

}