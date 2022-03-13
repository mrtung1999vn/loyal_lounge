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
    app.get('/App/ThuVien/:page', async(req,res)=>{
        try {
            const TotalPage = await pool.query(
                `select count(*) from thu_vien`
            )
        } catch (error) {
            
        }
    })
}