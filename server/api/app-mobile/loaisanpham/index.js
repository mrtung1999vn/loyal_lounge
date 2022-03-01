const { lib } = require('crypto-js')
const fetch = require('node-fetch')
const { EncodeJson, DecodeString_AES, DecodeJson, DecodeJsonRequest, EncodeString, EncodeString_AES, DecodeString } = require('../../../assets/encode_decode')
const { SendMailGoogle, FunctionSqlInjection, SaveError, SignToken, CheckToken } = require('../../../libs')
var jwt = require('jsonwebtoken');

var token = "Token k0iI4jjVSEtdddZkIG4naDOW4kcZLbz0"
var token_01 = "Token ALfPoYpBJh1TUVilppJKCsgMX362Gtfx"


const pool = require('../../../pgconnect')
const encode_decode = require('../../../assets/encode_decode')
const { timeNowDB } = require('../../../assets/TimeLibary')

const moment = require('moment')




module.exports = function(app) {

    app.post(`/App/LoaiSanPham` , async(req,res)=>{
        try {
            
            const {authorization} = req.headers
            const {email} = req.body
            
            let check = await CheckToken( email, authorization)

            if( check ){
                const ExcuteQueryEventWeek = await pool.query(`
                    select * from su_kien 
                    where to_timestamp(thoi_gian_dien, 'YYYY-MM-DD hh24:mi:ss')::timestamp >= now()
                    order by thoi_gian_dien asc 
                `)
                const ExcuteQueryEventLimit = await pool.query(`
                    select * from su_kien 
                    where to_timestamp(thoi_gian_dien, 'YYYY-MM-DD hh24:mi:ss')::timestamp >= now()
                    order by thoi_gian_dien asc
                    limit 3 
                `)

                res.json({
                    status:1,
                    data_event_week: ExcuteQueryEventWeek.rows,
                    data_event_week_limit: ExcuteQueryEventLimit.rows,
                    msg_vn:'danh sach su kien trong tuan',
                    msg_en:'Events list in week'
                })
            }

        } catch (error) {
            SaveError('app-mobile', '/DangKyTaiKhoan', error, 'POST', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg: 'Loi he thong'
            })
        }
    })

}