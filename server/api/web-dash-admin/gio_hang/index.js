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

    app.get(`/WebDash/DanhSachCartTheoSuKien/:id_su_kien`,async(req,res)=>{
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

                const ExcuteQueryTypeCart = await pool.query(`
                    select * from loai_sp
                `)

                // console.log( ExcuteQuery.rows )

                res.json({
                    status: 1,
                    data: encode_decode.EncodeJson(ExcuteQuery.rows),
                    dataTypeCart: encode_decode.EncodeJson(ExcuteQueryTypeCart.rows)
                })
            }
        } catch (error) {
            res.json({status:0,data:[]})
        }
    })
 
    app.get(`/WebDash/DanhSachCart`, async (req, res) => {
        try {

            if (checkRequest(req.headers.origin)) {

                // const ExcuteQuery = await pool.query(`
                //     select don_hang_ct.so_luong"so_luong_ct",* from don_hang,don_hang_ct,
                //     san_pham,tai_khoan
                //     where don_hang.id_don = don_hang_ct.id_don
                //     and san_pham.id_sp = don_hang_ct.id_sp 
                //     and tai_khoan.id_kh = don_hang.id_kh 
                //     order by don_hang.created_at desc
                // `)

                const ExcuteQuery = await pool.query(`
                    select  to_char(don_hang.created_at, 'YYYY/MM/DD HH24:MI:SS')"day_time",*,don_hang.status"status_don_hang" from don_hang,
                    tai_khoan
                    where tai_khoan.id_kh = don_hang.id_kh 
                    order by don_hang.created_at desc
                `)

                const ExcuteQueryTypeCart = await pool.query(`
                    select * from loai_sp
                `)

                // console.log( ExcuteQuery.rows )

                res.json({
                    status: 1,
                    data: encode_decode.EncodeJson(ExcuteQuery.rows),
                    dataTypeCart: encode_decode.EncodeJson(ExcuteQueryTypeCart.rows)
                })

            }
        } catch (error) {
            SaveError('web-dash-admin', '/WebDash/DanhSachCart', error, 'GET', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })


    app.get(`/WebDash/ChiTietDanhSachCart/:id_don` , async(req,res)=>{
        try {
            if( checkRequest( req.headers.origin ) ){
                
                const {id_don} = req.params

                const ExcuteQuery = await pool.query(`
                    select don_hang_ct.so_luong"so_luong_ct",* from don_hang,don_hang_ct,
                    san_pham
                    where don_hang.id_don = don_hang_ct.id_don
                    and san_pham.id_sp = don_hang_ct.id_sp 
                    and don_hang.id_don = ${id_don}
                    order by don_hang.created_at desc
                `)

                const ExcuteQueryTypeCart = await pool.query(`
                    select * from loai_sp
                `)

                // console.log( ExcuteQuery.rows )

                res.json({
                    status: 1,
                    data: encode_decode.EncodeJson(ExcuteQuery.rows),
                    dataTypeCart: encode_decode.EncodeJson(ExcuteQueryTypeCart.rows)
                })
            }
        } catch (error) {
            
        }
    })


    app.get(`/ChooseCheckDon/:check` , async(req,res)=>{
        try {
            if( checkRequest( req.headers.origin ) ){
                const {check} = req.params

                const ExcuteQuery = await pool.query(`
                    select  to_char(don_hang.created_at, 'YYYY/MM/DD HH24:MI:SS')"day_time",*,don_hang.status"status_don_hang" from don_hang,
                    tai_khoan
                    where tai_khoan.id_kh = don_hang.id_kh 
                    and don_hang.status = ${check}
                    order by don_hang.created_at desc
                `)
    
                const ExcuteQueryTypeCart = await pool.query(`
                    select * from loai_sp
                `)
                res.json({
                    status: 1,
                    data: encode_decode.EncodeJson(ExcuteQuery.rows),
                    dataTypeCart: encode_decode.EncodeJson(ExcuteQueryTypeCart.rows)
                })
            }


        } catch (error) {
            res.json({stauts:0,data:[]})
        }
    })

    app.put(`/WebDash/ChiTietDanhSachCart/:id_don`, async(req,res)=>{
        try {

            if( checkRequest( req.headers.origin ) ){
                
                const {id_don} = req.params

                const ExcuteQuery = await pool.query(`
                    update don_hang set status = true 
                    where id_don = ${id_don}
                `)

                const ExcuteQueryTypeCart = await pool.query(`
                    select * from loai_sp
                `)

                // console.log( ExcuteQuery.rows )

                res.json({
                    status: 1,
                    data: encode_decode.EncodeJson(ExcuteQuery.rows),
                    dataTypeCart: encode_decode.EncodeJson(ExcuteQueryTypeCart.rows)
                })
            }

        } catch (error) {
            
        }
    })

    app.get(`/WebDash/DanhSachCart/TypeCart/:id`, async (req, res) => {
        try {
            if (checkRequest(req.headers.origin)) {
                const { id } = req.params

                const ExcuteQuery = await pool.query(`
                    select * from san_pham,loai_sp
                    where loai_sp.id_loai_sp = san_pham.id_loai_sp 
                    and loai_sp.id_loai_sp = ${id}
                `)

                const ExcuteQueryTypeCart = await pool.query(`
                    select * from loai_sp
                `)

                res.json({
                    status: 1,
                    data: encode_decode.EncodeJson(ExcuteQuery.rows),
                    dataTypeCart: encode_decode.EncodeJson(ExcuteQueryTypeCart.rows)
                })
            }
        } catch (error) {
            console.log(error)
        }
    })

    app.post(`/WebDash/DanhSachCart`, async (req, res) => {
        try {
            const { TypeCart, Description, Price, userName } = req.body

            console.log({ TypeCart, Description, Price, userName })

            if (
                !checkRequest(req.headers.origin) ||
                FunctionSqlInjectionText(TypeCart) ||
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
                                N'${TypeCart.value}',N'${userName}',false,N'${parseInt(Price)*21000}'
                            )
                        `)
                    res.json({
                        status: 1,
                        data: [],
                        msg_vn: 'Sự kiện đã được tạo thành công!',
                        msg_en: 'Cart has been created successfully!'
                    })
            }
        } catch (error) {

            console.log(error)

            SaveError('web-dash-admin', '/WebDash/DanhSachCart', error, 'POST', JSON.stringify(req.headers), req.socket.remoteAddress)

            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })

    app.put(`/WebDash/DanhSachCart`, async (req, res) => {
        try {
            const { IDCart, Description, TypeStatus, PriceVND, userName } = req.body
            // console.log("Babababab")
            // console.log({ IDCart, Description, TypeStatus, PriceVND, userName })
            if (
                !checkRequest(req.headers.origin) ||
                FunctionSqlInjectionText(Description) ||
                FunctionSqlInjection(IDCart) ||
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
                    where id_cash = ${IDCart}
                `)

                if( TypeStatus === 'Success' ){
                    await pool.query(`
                    update coin_bc_loyal set status = true 
                    where id_coin_bc = (
                        select id_coin from cashmoney where id_cash = ${IDCart}
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
            SaveError('web-dash-admin', '/WebDash/DanhSachCart', error, 'PUT', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })

    app.delete(`/WebDash/DanhSachCart`, async (req, res) => {
        try {
            const { IDCart } = req.body

            console.log(  IDCart ) 
            if (
                !checkRequest(req.headers.origin) ||
                FunctionSqlInjection(IDCart)) {
                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'Lỗi phiên người dùng',
                    msg_en: 'User version error!'
                })
            } else {
                const ExcuteQuery = await pool.query(`
                    delete from cashmoney
                    where id_cash = ${IDCart}
                `)
                res.json({
                    status: 1,
                    data: [],
                    msg_vn: 'Xóa thành công!',
                    msg_en: 'Success!'
                })
            }
        } catch (error) {
            SaveError('web-dash-admin', '/WebDash/DanhSachCart', error, 'DELETE', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })


    
    app.post(`/App/QuetKhachHang` , async(req,res)=>{
        try {
            if( checkRequest(req.headers.origin ) ){
                
                const {id_su_kien,id_kh} = req.body

                console.log(  )
                console.log( {id_su_kien,id_kh} )

                const newData = await pool.query(`
                    select * from booking_su_kien,tai_khoan
                    where booking_su_kien.id_su_kien = ${id_su_kien}
                    and booking_su_kien.id_kh = ${id_kh}
                    and booking_su_kien.id_kh = tai_khoan.id_kh 
                `)

                

                res.json({
                    status:1,
                    data: newData.rows,
                    msg_en:'',
                    msg_vn:'',
                })
            }
        } catch (error) {
            
        }
    })

        
    app.post(`/App/QuetKhachHang/CheckForm` , async(req,res)=>{
        try {
            console.log("a")
            if( checkRequest(req.headers.origin ) ){
                
                const {id_su_kien,id_kh,FormKhachHang} = req.body

                console.log( "Check form" )
                // console.log( {id_su_kien,id_kh,FormKhachHang} )
                
                // const newData = await pool.query(`
                //     select * from booking_su_kien,tai_khoan
                //     where booking_su_kien.id_su_kien = ${id_su_kien}
                //     and booking_su_kien.id_kh = ${id_kh}
                //     and booking_su_kien.id_kh = tai_khoan.id_kh 
                // `)

                const check_form = await pool.query(`
                    select (so_luong_quet) < (so_luong_dat)"check_form" from booking_su_kien
                    where id_booking = ${FormKhachHang[0]?.id_booking}
                `)

                if( check_form.rowCount > 0 ){
                    if( check_form.rows[0]?.check_form === true ){

                        const number = await pool.query(`
                            select so_luong_quet from booking_su_kien
                            where id_booking = ${FormKhachHang[0]?.id_booking}
                        `)
                        const sum_count = parseInt( number.rows[0]?.so_luong_quet ) + 1

                        await pool.query(`
                            update booking_su_kien set so_luong_quet = ${sum_count}
                            where id_booking = ${FormKhachHang[0]?.id_booking}
                        `)
                        res.json({
                            status:1,
                            msg_en:'success',
                            msg_vn:'thanh cong',
                        })
                        console.log("success")
                    }else{
                        res.json({
                            status:0,
                            msg_en:'error',
                            msg_vn:'loi',
                        })
                        console.log("error")
                    }
                }else{
                    res.json({
                        status:0,
                        msg_en:'error',
                        msg_vn:'loi',
                    })
                }

                // console.log( FormKhachHang )

                // if(  )
                // await pool.query(`
                //     insert into booking_chi_tiet(
                //         id_booking,created_at,updated_at)
                //     values( ${FormKhachHang[0]?.id_su_kien},now(),now() )
                // `)
            }else{
                res.json({
                    status:0,
                    msg_en:'error',
                    msg_vn:'loi',
                })
            }
        } catch (error) {
            console.log( error )
            res.json({
                status:0,
                msg_en:'error',
                msg_vn:'loi',
            })
        }
    })



}