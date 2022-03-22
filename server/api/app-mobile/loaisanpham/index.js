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

const moment = require('moment')




module.exports = function (app) {


    app.post(`/App/LoaiSanPham`, async (req, res) => {
        try {

            const { authorization } = req.headers
            const { email } = req.body

            let check = await CheckToken(email, authorization)

            if (check) {
                const ExcuteQuery = await pool.query(`
                    select * from loai_sp
                `)

                res.json({
                    status: 1,
                    data: ExcuteQuery.rows,
                    msg_vn: 'loai san pham',
                    msg_en: 'type product'
                })
            } else {
                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'het phien',
                    msg_en: 'end of session'
                })
            }

        } catch (error) {
            console.log(error)
            SaveError('app-mobile', '/App/LoaiSanPham', error, 'POST', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg: 'Loi he thong'
            })
        }
    })

    app.post(`/App/SanPhamTheoLoai/:id_loai`, async (req, res) => {
        try {

            const { authorization } = req.headers

            const { email,onChange } = req.body

            const { id_loai } = req.params


            // onChange === 'onChangeSelect' Khách hàng có thể click nhiều để chọn đồ bỏ check Token
            

            if (!FunctionSqlInjectionText(id_loai)) {
                const ExcuteQuery = await pool.query(`
                select * from san_pham where id_loai_sp = ${id_loai}
            `)

                res.json({
                    status: 1,
                    data: ExcuteQuery.rows,
                    msg_vn: 'loai san pham',
                    msg_en: 'type product'
                })
            } else {
                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'het phien',
                    msg_en: 'end of session'
                })
            }

        } catch (error) {
            console.log(error)
            SaveError('app-mobile', '/App/SanPhamTheoLoai', error, 'POST', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg: 'Loi he thong'
            })
        }
    })

    app.post(`/App/TimKiemSanPham`, async (req, res) => {
        try {

            const { authorization } = req.headers

            const { email,query_search } = req.body

            let check = await CheckToken(email, authorization)

            if (check) {

                if (!FunctionSqlInjectionText(query_search)) {


                    const ExcuteQuery = await pool.query(`
                        select * from san_pham
                        where lower(convertTVkdau(ten_sp)) like lower( convertTVkdau(N'%${query_search}%'))
                    `)

                    res.json({
                        status: 1,
                        data: ExcuteQuery.rows,
                        msg_en:'success',msg_vn:'thanh cong'
                    })
                }else{
                    res.json({ status: 0, data: [],msg_en:'fail',msg_vn:'that bai' })
                }
            } else {
                res.json({ status: 0, data: [],
                    msg_en:'fail',msg_vn:'that bai' })
            }

        } catch (error) {
            console.log( error )
            res.json({
                status: 0,
                data: [],
                msg_en:'fail',msg_vn:'that bai'
            })
        }
    })

    app.post(`/App/TatCaSanPham` , async(req,res)=>{
        try {

            const { authorization } = req.headers
            const { email,query_search } = req.body


            let check = await CheckToken(email, authorization)

            if(check ){
                const ExcuteQuery = await pool.query(`
                    select * from san_pham
                `)

                res.json({status:1,data:ExcuteQuery.rows})
            }else{
                res.json({status:0,data:[],
                msg_vn:'that bai',
                msg_en:'fail'})
            }
        } catch (error) {
            res.json({
                status:0,data:[]
            })
        }
    })

    // app.post(`/App/`, async(req,res)=>{
    //     try {
            
    //     } catch (error) {
            
    //     }
    // })

}