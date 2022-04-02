const { lib } = require('crypto-js')
const fetch = require('node-fetch')
const { EncodeJson, DecodeString_AES, DecodeJson, DecodeJsonRequest, EncodeString, EncodeString_AES, DecodeString } = require('../../../assets/encode_decode')
const { SendMailGoogle, FunctionSqlInjection, SaveError, SignToken, CheckToken, FunctionSqlInjectionText } = require('../../../libs')

const { AddBlockChains, CheckBlockChains } = require('../../../libs/block_chains')
var jwt = require('jsonwebtoken');

var token = "Token k0iI4jjVSEtdddZkIG4naDOW4kcZLbz0"
var token_01 = "Token ALfPoYpBJh1TUVilppJKCsgMX362Gtfx"


const pool = require('../../../pgconnect')
const encode_decode = require('../../../assets/encode_decode')
const { timeNowDB } = require('../../../assets/TimeLibary')

const moment = require('moment')

let date = new Date()


module.exports = function (app) {
    app.get(`/SuKienChiTiet/:id_ev`, async (req, res) => {
        try {
            // /
            const { id_ev } = req.params

            // console.log(id_ev)

            // console.log(`Su kien chi tiet`)

            if (!FunctionSqlInjectionText(id_ev)) {

                const newData = await pool.query(`
                    select * from su_kien
                    where id_su_kien = ${id_ev}
                `)

                // Xử lý còn bàn
                const BanDat = await pool.query(`
                    select * from booking_su_kien
                    where id_su_kien = ${id_ev}
                `)

                const Ban = await pool.query(`
                    select * from ban
                `)

                // console.log( Ban.rows )

                const SoLuongBanConLai = []


                for (let i = 0; i < Ban.rowCount; i++) {
                    if (BanDat.rows.findIndex(value => value.ten_ban === Ban.rows[i].ten_ban.toString() && value.ten_ban !== 'Entrance ticket') >= 0) {
                        // console.log( `dat vip 1` )
                    } else {
                        SoLuongBanConLai.push({
                            id_ban: Ban.rows[i].id_ban,
                            ten_ban: Ban.rows[i].ten_ban,
                            created_at: Ban.rows[i].created_at,
                            updated_at: Ban.rows[i].updated_at,
                        })
                    }
                }


                // Xử lý check_open

                const check_open = await pool.query(`
                    select       
                    ( select so_luong_tham_gia from su_kien where id_su_kien = ${id_ev})
                        >
                    ( 
                        select sum( so_luong_dat )"so_luong_dat" from booking_su_kien
                    where id_su_kien = ${id_ev}
                    )"check_open"
                `)

                console.log(SoLuongBanConLai)

                res.json({
                    status: 1,
                    data: newData.rows,
                    ban_booking: SoLuongBanConLai,
                    check_open: check_open.rows[0]?.check_open === null || check_open.rows[0]?.check_open === true ? true : false
                })

            }
        } catch (error) {
            console.log(error)
            res.json({
                status: 0,
                data: []
            })
        }
    })

    app.post(`/App/DatBooking`, async (req, res) => {
        try {
            // so_luong_dat : số lượng khách đặt sự kiện
            // choose_booking : khách chọn bàn đặt 
            // 
            const { email, so_luong_dat, choose_booking, id_su_kien, gia_dat, ten_su_kien, id_kh } = req.body

            const { authorization } = req.headers

            let check = await CheckToken(email, authorization)

            console.log(check)

            if (check) {
                if (
                    !FunctionSqlInjectionText(email) ||
                    !FunctionSqlInjectionText(so_luong_dat) ||
                    !FunctionSqlInjectionText(choose_booking) ||
                    !FunctionSqlInjectionText(id_su_kien) ||
                    !FunctionSqlInjectionText(gia_dat) ||
                    !FunctionSqlInjectionText(ten_su_kien) ||
                    !FunctionSqlInjectionText(id_kh)

                ) {


                    const checkBooking = await pool.query(`
                        select * from booking_su_kien
                        where id_kh = ( select id_kh  from tai_khoan where email = N'${email}')
                        and id_su_kien = ${id_su_kien}
                    `)

                    if (checkBooking.rowCount > 0) {
                        res.json({
                            status: 1,
                            msg_vn: 'Người dùng đã đặt lịch',
                            msg_en: 'User has successfully booked'
                        })
                    } else {


                        const CoinQuery = await pool.query(`
                            select 
                            (
                                select sum(coin_tranfer::float8)"coin" from coin_bc_loyal
                                where id_kh = (
                                    select id_kh from tai_khoan where email = N'${email}'
                                )
                                    and status = true
                            ) 
                            +(
                            
                                select
                                    case when (
                                            select sum(coin_tranfer::float8)"coin" from coin_bc_loyal
                                            where id_kh = (
                                                select id_kh from tai_khoan where email = N'${email}'
                                            )
                                            and coin_tranfer like N'%-%'
                                        ) is null then 0
                                        else (
                                            select sum(coin_tranfer::float8)"coin" from coin_bc_loyal
                                            where id_kh = (
                                                select id_kh from tai_khoan where email = N'${email}'
                                            )
                                            and coin_tranfer like N'%-%'
                                        )
                                end
                            ) "coin"
                        `)

                        // console.log({ email, so_luong_dat, choose_booking, id_su_kien, gia_dat,ten_su_kien })

                        if (
                            parseFloat(
                                parseInt(so_luong_dat) * parseFloat(gia_dat)
                            ) >
                            parseFloat(CoinQuery.rows[0]?.coin)) {
                            res.json({
                                status: 1,
                                msg_vn: 'Số tiền không đủ vui lòng nạp thêm',
                                msg_en: 'The amount is not enough, please add more'
                            })
                        } else {
                            const BanDat = await pool.query(`
                                select * from booking_su_kien
                                where id_su_kien = ${id_su_kien}
                                and ten_ban = N'${choose_booking}'
                            `)
                            if(BanDat.rowCount > 0  ){
                                // 

                                // Xử lý còn bàn
                                const BanDatNew = await pool.query(`
                                    select * from booking_su_kien
                                    where id_su_kien = ${id_ev}
                                `)

                                const Ban = await pool.query(`
                                    select * from ban
                                `)

                                // console.log( Ban.rows )

                                const SoLuongBanConLai = []


                                for (let i = 0; i < Ban.rowCount; i++) {
                                    if (BanDatNew.rows.findIndex(value => value.ten_ban === Ban.rows[i].ten_ban.toString() && value.ten_ban !== 'Entrance ticket') >= 0) {
                                        // console.log( `dat vip 1` )
                                    } else {
                                        SoLuongBanConLai.push({
                                            id_ban: Ban.rows[i].id_ban,
                                            ten_ban: Ban.rows[i].ten_ban,
                                            created_at: Ban.rows[i].created_at,
                                            updated_at: Ban.rows[i].updated_at,
                                        })
                                    }
                                }
                                // trang thai dong bo hoa
                                res.json({
                                    status: 2,
                                    msg_vn: 'Bàn này đã có người đặt mới',
                                    msg_en: 'This table has been booked',
                                    ban_con_lai: SoLuongBanConLai
                                })
                            }else{
                                // Check ban
                                let coin_tranfer = `-${parseFloat(
                                    parseInt(so_luong_dat) * parseFloat(gia_dat)
                                )}`

                                const checkBlock = await AddBlockChains(id_kh, `Booking ${ten_su_kien}`,
                                    coin_tranfer, date.getDate().toString(),
                                    (date.getMonth() + 1).toString(), date.getFullYear().toString(),
                                    `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)

                                if (checkBlock === true) {
                                    await pool.query(`
                                        insert into booking_su_kien (id_su_kien,ten_su_kien,gia,created_at,updated_at,id_kh,status,so_luong_dat,so_luong_quet,ten_ban,tong_tien)
                                        values( ${id_su_kien},
                                        (
                                            select ten_su_kien from su_kien where id_su_kien = ${id_su_kien}
                                        ),(
                                            select gia from su_kien where id_su_kien = ${id_su_kien}
                                        ),now(),now(),
                                        ( select id_kh  from tai_khoan where email = N'${email}')
                                        ,false,${so_luong_dat} ,0,N'${choose_booking}',${parseFloat(
                                        parseInt(so_luong_dat) * parseFloat(gia_dat)
                                    )})
                                    `)

                                    res.json({
                                        status: 1,
                                        msg_vn: 'Đặt lịch thành công!',
                                        msg_en: 'Booking success!'
                                    })

                                } else {
                                    res.json({
                                        status: 0,
                                        msg_vn: 'that bai',
                                        msg_en: 'fail'
                                    })
                                }
                            }
                        }
                    }
                } else {
                    res.json({
                        status: 0,
                        msg_vn: 'that bai',
                        msg_en: 'fail'
                    })
                }

            } else {
                res.json({
                    status: 0,
                    msg_vn: 'that bai',
                    msg_en: 'fail'
                })
            }


        } catch (error) {
            console.log(error)
            // res.json({
            //     status: 0,
            //     msg_vn: 'that bai',
            //     msg_en: 'fail'
            // })
        }
    })


    // app.post(`/App/LichSuDat`, async(req,res)=>{
    //     try{

    //     }catch(error)
    // } )


    // Lịch sử đặt bàn

    app.post(`/App/LichSuDatBan/:page`, async (req, res) => {
        try {
            const { page } = req.params
            const { email } = req.body

            const { authorization } = req.headers

            let check = await CheckToken(email, authorization)


            if (check) {
                if (!FunctionSqlInjectionText(email) ||
                    !FunctionSqlInjectionText(page)
                ) {
                    const TotalPage = await pool.query(
                        ` 
                        select count(*) from booking_su_kien
                        where id_kh = (
                        select id_kh from tai_khoan where email = N'${email}'
                        )`
                    )

                    let PageNumber = Math.ceil(TotalPage.rows[0].count / 12)

                    const ExcuteQuery = await pool.query(`
                        select * from booking_su_kien
                        where id_kh = (
                        select id_kh from tai_khoan where email = N'${email}'
                        )
                        order by created_at desc
                        limit ${page === '1' ? 12 : parseInt(page) * 12} offset 0
                        
                    `)

                    res.json({
                        status: 1,
                        page_number: PageNumber,
                        data: ExcuteQuery.rows
                    })

                } else {
                    res.json({
                        status: 0,
                        data: 0,
                        msg_en: 'data error',
                        msg_vn: 'sai du lieu'
                    })
                }

            } else {
                res.json({
                    status: 0,
                    data: 0,
                    msg_en: 'fail',
                    msg_vn: 'het han token'
                })
            }

        } catch (error) {
            res.json({
                status: 0,
                data: 0,
                msg_en: 'error',
                msg_vn: 'Lỗi hệ thống'
            })
        }
    })


    app.post(`/App/LichSuNapRut/:page`, async (req, res) => {
        try {
            const { page } = req.params
            const { email } = req.body

            const { authorization } = req.headers

            let check = await CheckToken(email, authorization)


            if (check) {
                if (!FunctionSqlInjectionText(email) ||
                    !FunctionSqlInjectionText(page)
                ) {
                    const TotalPage = await pool.query(
                        ` 
                        select * from cashmoney
                        where ten_nguoi_dung = N'${email}'
                        `
                    )

                    let PageNumber = Math.ceil(TotalPage.rows[0].count / 12)

                    const ExcuteQuery = await pool.query(`
                        select * from cashmoney
                        where ten_nguoi_dung = N'${email}'
                        order by created_at desc
                        limit ${page === '1' ? 12 : parseInt(page) * 12} offset 0
                        
                    `)

                    res.json({
                        status: 1,
                        page_number: PageNumber,
                        data: ExcuteQuery.rows
                    })

                } else {
                    res.json({
                        status: 0,
                        data: 0,
                        msg_en: 'data error',
                        msg_vn: 'sai du lieu'
                    })
                }

            } else {
                res.json({
                    status: 0,
                    data: 0,
                    msg_en: 'fail',
                    msg_vn: 'het han token'
                })
            }

        } catch (error) {
            res.json({
                status: 0,
                data: 0,
                msg_en: 'error',
                msg_vn: 'Lỗi hệ thống'
            })
        }
    })


    app.get(`/App/SuKienChinh`, async(req,res)=>{
        try {
            const newData = await pool.query(`
                select to_char(created_at, 'YYYY/MM/DD HH24:MI:SS')"day_time",* from su_kien
                where status = true
                order by created_at desc
            `)
            res.json({
                status:1,
                data: newData.rows
            })
        } catch (error) {
            
            res.json({
                status:0,
                data: []
            })
        }
    })











    // app.post(`/App/DatHang` , async(req,res)=>{
    //     try {
    //         // const { page } = req.params
    //         const { email } = req.body

    //         const { authorization, gio_hang_dat } = req.headers

    //         // let check = await CheckToken(email, authorization)

    //         console.log( "a" )
    //         // if( true ){
    //         //     console.log( gio_hang_dat )
    //         // }
    //     } catch (error) {
    //         console.log( error )
    //     }
    // })



    let ban = ['a', 'b', 'c']

}