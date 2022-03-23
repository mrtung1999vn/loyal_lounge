const { lib } = require('crypto-js')
const fetch = require('node-fetch')
const { EncodeJson, DecodeString_AES, DecodeJson, DecodeJsonRequest, EncodeString, EncodeString_AES, DecodeString } = require('../../../assets/encode_decode')
const { SendMailGoogle, FunctionSqlInjection, SaveError, SignToken, CheckToken,FunctionSqlInjectionText } = require('../../../libs')

const { AddBlockChains,CheckBlockChains } = require('../../../libs/block_chains')
var jwt = require('jsonwebtoken');

var token = "Token k0iI4jjVSEtdddZkIG4naDOW4kcZLbz0"
var token_01 = "Token ALfPoYpBJh1TUVilppJKCsgMX362Gtfx"


const pool = require('../../../pgconnect')
const encode_decode = require('../../../assets/encode_decode')
const { timeNowDB } = require('../../../assets/TimeLibary')

const moment = require('moment')




module.exports = function(app) {
    app.get(`/SuKienChiTiet/:id_ev`,async(req,res)=>{
        try {
            const { id_ev } = req.params
            
            console.log( id_ev )

            if( !FunctionSqlInjectionText( id_ev ) ){

                const newData = await pool.query(`
                    select * from su_kien
                    where id_su_kien = ${id_ev}
                `)

                const Ban = await pool.query(`
                    select * from ban
                `)

                res.json({
                    status:1,
                    data: newData.rows,
                    ban_booking: Ban.rows
                })

            }
        } catch (error) {
            console.log( error )
            res.json({
                status:0,
                data:[]
            })
        }
    })

    app.post(`/DatBooking` , async(req,res)=>{
        try {
            // so_luong_dat : số lượng khách đặt sự kiện
            // choose_booking : khách chọn bàn đặt
            const { email, so_luong_dat, choose_booking,id_su_kien,gia_dat } = req.body

            const { authorization } = req.headers

            let check = await CheckToken(email, authorization)

            if( check ){
                if( !FunctionSqlInjectionText(email) ||
                !FunctionSqlInjectionText(so_luong_dat) ||
                !FunctionSqlInjectionText(choose_booking) ||
                !FunctionSqlInjectionText(id_su_kien) 
                ){
                    const checkBooking = await pool.query(`
                        select * from booking_su_kien
                        where id_kh = ( select id_kh  from tai_khoan where email = N'${email}')
                        and id_su_kien = ${id_su_kien}
                    `)
                    if( checkBooking.rowCount > 0 ){
                        res.json({
                            status:1,
                            msg_vn:'Người dùng đã đặt lịch',
                            msg_en:'User has successfully booked'
                        })
                    }else{
                    
                    let coin = 0 
                    console.log( 
                      parseFloat(  
                        parseInt(so_luong_dat) *parseFloat(gia_dat)
                      )  
                     )
                    let coin_tranfer = ``
                        // await AddBlockChains(id_kh, noi_dung, 
                        //     tien_nap, date.getDate().toString(), 
                        //     (date.getMonth() + 1).toString(), date.getFullYear().toString(), 
                        //     `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
                    //     await pool.query(`
                    //     insert into booking_su_kien (id_su_kien,ten_su_kien,gia,created_at,updated_at,id_kh,status,so_luong_dat,so_luong_quet,ten_ban)
                    //     values( ${id_su_kien},
                    //     (
                    //         select ten_su_kien from su_kien where id_su_kien = ${id_su_kien}
                    //     ),(
                    //         select gia from su_kien where id_su_kien = ${id_su_kien}
                    //     ),now(),now(),
                    //     ( select id_kh  from tai_khoan where email = N'${email}')
                    //     ,false,so_luong_dat ,0,N'${choose_booking}')
                    // `)
                    }
                }else{
                    res.json({
                        status:0,
                        msg_vn:'that bai',
                        msg_en:'fail'
                    })
                }

            }else{
                res.json({
                    status:0,
                    msg_vn:'that bai',
                    msg_en:'fail'
                })
            }

            
        } catch (error) {
            res.json({
                status:0,
                msg_vn:'that bai',
                msg_en:'fail'
            })
        }
    })

}