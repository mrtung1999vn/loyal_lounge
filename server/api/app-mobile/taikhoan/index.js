const { lib } = require('crypto-js')
const fetch = require('node-fetch')
const { EncodeJson, DecodeString_AES, DecodeJson, DecodeJsonRequest, EncodeString, EncodeString_AES, DecodeString } = require('../../../assets/encode_decode')
const { SendMailGoogle, FunctionSqlInjection, SaveError, SignToken, CheckToken, FunctionSqlInjectionText } = require('../../../libs')
var jwt = require('jsonwebtoken');

var token = "Token k0iI4jjVSEtdddZkIG4naDOW4kcZLbz0"
var token_01 = "Token ALfPoYpBJh1TUVilppJKCsgMX362Gtfx"


const pool = require('../../../pgconnect')
const encode_decode = require('../../../assets/encode_decode')
const { timeNowDB } = require('../../../assets/TimeLibary')

const moment = require('moment');
const { AddBlockChains } = require('../../../libs/block_chains');

const date = new Date()


module.exports = function(app) {

    app.post(`/App/NapTienKhachHang` , async(req,res)=>{
        try {
            
            const {authorization} = req.headers
            const {id_kh, email, tien_nap,noi_dung } = req.body
            
            let check = await CheckToken( email, authorization)
            
            if( check ){
                if( 
                    FunctionSqlInjectionText( tien_nap ) || 
                    FunctionSqlInjectionText( noi_dung ) ||
                    FunctionSqlInjectionText( email )
                ){
                    res.json({
                        status:0,
                        data: [],
                        msg_vn:'loi he thong',
                        msg_en:'system error'
                    })
                }else{

                    await AddBlockChains(id_kh, noi_dung, tien_nap, date.getDate().toString(), (date.getMonth() + 1).toString(), date.getFullYear().toString(), `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`  )

                    res.json({
                        status:1,
                        msg_vn:'them thanh cong',
                        msg_en:'success'
                    })
                }
            }else{
                res.json({
                    status:0,
                    data:[],
                    msg_vn:'het phien',
                    msg_en:'end of session'
                })
            }

        } catch (error) {
            console.log( error)
            SaveError('app-mobile', '/App/LoaiSanPham', error, 'POST', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg: 'Loi he thong'
            })
        }
    })

}