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

    app.post(`/App/SanPham` , async(req,res)=>{
        try {
            
            const { authorization } = req.headers
            const {email , id_loai_sp} = req.body

            let check = await CheckToken( email, authorization)
            
            if( check ){
                const ExcuteQuery = await pool.query(`
                    select * from san_pham where id_loai_sp = ${id_loai_sp}
                `)

                res.json({
                    status:1,
                    data: ExcuteQuery.rows,
                    msg_vn:'san pham',
                    msg_en:'product'
                })
            }else{
                res.json({
                    status:0,
                    data:[],
                    msg_vn:'het phien',
                    msg_en:'end of session'
                })
            }

        } catch (error) {

            SaveError('app-mobile', '/App/SanPham', error, 'POST', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg: 'Loi he thong'
            })
        }
    })

}