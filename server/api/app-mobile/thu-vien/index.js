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

    // app.get(`/SendGmail`)

    app.get('/App/ThuVien/:page', async(req,res)=>{
        try {

            const {page} = req.params

            // Thư viện

            const TotalPage = await pool.query(
                `select count(*) from thu_vien`
            )

            const ExcuteQuery = await pool.query(`
                select * from thu_vien 
                order by created_at desc
                limit ${ page === '1' ? 12 : parseInt( page )*12  } offset 0
            `)

            let PageNumber = Math.ceil( TotalPage.rows[0].count/12 )
            
            
            // Sự kiện 
            const ExcuteQueryEventWeek = await pool.query(`
                select * from su_kien 
                where to_timestamp(thoi_gian_dien, 'YYYY-MM-DD hh24:mi:ss')::timestamp >= now()
                order by thoi_gian_dien desc 
            `)
            const ExcuteQueryEventLimit = await pool.query(`
                select * from su_kien 
                where to_timestamp(thoi_gian_dien, 'YYYY-MM-DD hh24:mi:ss')::timestamp >= now()
                order by thoi_gian_dien desc
                limit 3 
            `)

            const TypeProduct = await pool.query(`
                select * from loai_sp
            `)

            // Sự kiện

            res.json({
                status:1,
                page_number: PageNumber,
                ExcuteQueryEventWeek:ExcuteQueryEventWeek.rows,
                ExcuteQueryEventLimit: ExcuteQueryEventLimit.rows,
                data: ExcuteQuery.rows,
                TypeProduct: TypeProduct.rows
            })



            // console.log( Math.ceil( TotalPage.rows[0].count/12 )   )


                

        } catch (error) {
            console.log(error)
        }
    })





    app.get(`/App/ThuVien/LoadMore/:page`, async(req,res)=>{
        try {

            const {page} = req.params

            // Thư viện

            const TotalPage = await pool.query(
                `select count(*) from thu_vien`
            )

            const ExcuteQuery = await pool.query(`
                select * from thu_vien 
                order by created_at asc
                limit 12 offset ${ page === '1' ? 0 : parseInt( parseInt(page) - 1 )*12  }
            `)


            // console.log(  ExcuteQuery.rows)

            let PageNumber = Math.ceil( TotalPage.rows[0].count/12 )
            
            
            // Sự kiện 
            const ExcuteQueryEventWeek = await pool.query(`
                select * from su_kien 
                where to_timestamp(thoi_gian_dien, 'YYYY-MM-DD hh24:mi:ss')::timestamp >= now()
                order by thoi_gian_dien desc 
            `)
            const ExcuteQueryEventLimit = await pool.query(`
                select * from su_kien 
                where to_timestamp(thoi_gian_dien, 'YYYY-MM-DD hh24:mi:ss')::timestamp >= now()
                order by thoi_gian_dien desc
                limit 3 
            `)

            const TypeProduct = await pool.query(`
                select * from loai_sp
            `)

            // Sự kiện

            res.json({
                status:1,
                page_number: PageNumber,
                ExcuteQueryEventWeek:ExcuteQueryEventWeek.rows,
                ExcuteQueryEventLimit: ExcuteQueryEventLimit.rows,
                data: ExcuteQuery.rows,
                TypeProduct: TypeProduct.rows
            })



            // console.log( Math.ceil( TotalPage.rows[0].count/12 )   )


                
        } catch (error) {
            
        }
    })



}