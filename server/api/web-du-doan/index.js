const { lib } = require('crypto-js')
const fetch = require('node-fetch')
const { EncodeJson, DecodeString_AES, DecodeJson, DecodeJsonRequest, EncodeString, EncodeString_AES, DecodeString } = require('../../assets/encode_decode')
const { SendMailGoogle, checkRequest, FunctionSqlInjectionText } = require('../../libs')

const jwt = require('jsonwebtoken');

const pool = require('../../pgconnect')
const encode_decode = require('../../assets/encode_decode')
const { timeNowDB } = require('../../assets/TimeLibary')

const moment = require('moment');
const { AddBlockChains, AddBlockChainsBetting } = require('../../libs/block_chains');

let date = new Date()
module.exports = function (app) {

    app.post(`/WebDuDoan/DangNhap`, async (req, res) => {
        try {
            const { email, mat_khau, subject, text } = req.body
            if (checkRequest(req.headers.origin)) {
                // console.log({ email, mat_khau, subject, text })
                const ExcuteQuery = await pool.query(`
                    select * from tai_khoan
                    where email = N'${email}'
                    and mat_khau_hash = N'${EncodeString(email, mat_khau)}'
                `)

                if (ExcuteQuery.rowCount > 0) {

                    SendMailGoogle(email, subject, text)
                    const CoinQuery = await pool.query(`
                        select sum(coin_tranfer::int8)"coin" from coin_bc_loyal
                        where status = true and id_kh = (
                        select id_kh from tai_khoan where email = N'${email}'
                        )
                    `)

                    const DataCoin = await pool.query(`
                    select * from coin_bc_loyal
                        where id_kh = (
                        select id_kh from tai_khoan where email = N'${email}'
                    )
                    `)
                    res.json({
                        status: 1,
                        data: encode_decode.EncodeJson(ExcuteQuery.rows),
                        data_j_coin: encode_decode.EncodeJson(CoinQuery.rows),
                        data_coin: encode_decode.EncodeJson(DataCoin.rows),
                        // token:'',
                    })
                } else {
                    res.json({
                        status: 0,
                        data: []
                    })
                }
            }
        } catch (error) {
            console.log(error)
            res.json({
                status: 0,
                data: []
            })
        }
    })

    app.post(`/WebDuDoan/DangKyTaiKhoan`, async (req, res) => {
        try {
            if (checkRequest(req.headers.origin)) {
                const { email, mat_khau, dia_chi, so_dt } = req.body
                console.log(email, mat_khau, dia_chi, so_dt)
                const checkData = await pool.query(`
                    select email from tai_khoan
                    where email = N'${email}'
                `)
                console.log(checkData.rows)
                if (checkData.rowCount > 0) {
                    res.json({
                        status: 0,
                        data: [],
                    })
                } else {
                    await pool.query(`
                        insert into tai_khoan (
                            email ,created_at ,updated_at, status,dia_chi,so_dt,mat_khau_hash 
                        )
                        values(
                            N'${email}',now(),now(),true,N'${dia_chi}',N'${so_dt}',N'${EncodeString(email, mat_khau)}'
                        )
                    `)

                    res.json({
                        status: 1,
                        data: [],
                    })
                }
            }
        } catch (error) {
            res.json({
                status: 0,
                data: [],
            })
        }
    })


    app.get('/WebDuDoan/CoinEmail/:email' , async (req,res)=>{
        try{
            if (
                checkRequest(req.headers.origin)
                || !FunctionSqlInjectionText(email)
                ) {
                const {email} = req.params
                
                const ExcuteQuery = await pool.query(`
                    select * from tai_khoan
                    where email = N'${email}'
                `)

                const CoinQuery = await pool.query(`
                    select sum(coin_tranfer::float8)"coin" from coin_bc_loyal
                    where id_kh = (
                    select id_kh from tai_khoan where email = N'${email}'
                    )
                `)
                res.json({status:1,data:encode_decode.EncodeJson(CoinQuery.rows),dataUser: encode_decode.EncodeJson(  ExcuteQuery.rows )  })
            }
        }catch(error){
            console.log(error)
            res.json({
                status:0,
                data:[]
            })
        }
    })

    app.get(`/WebDuDoan/Match`, async (req, res) => {
        try {
            if (checkRequest(req.headers.origin)) {

                const newDataFooball = await pool.query(`
                    select * from "match"
                    where created_at > now() - interval '2 day'
                    and coast_result = '-'
                    and name_01 != '' and name_02 != ''
                    order by created_at desc
                `)

                const newDataBasketball = await pool.query(`
                    select * from "match"
                    where created_at > now() - interval '2 day'
                    and coast_result = '-'
                    order by created_at desc
                `)

                res.json({ status: 1, newDataFooball: encode_decode.EncodeJson(newDataFooball.rows) })
            }
        } catch (error) {
            console.log(error)
        }
    })


    app.post('/WebDuDoan/Match' ,async (req,res)=>{
        try{

        }catch(error){

        }
    })

    app.post('/WebDuDoan/NapTienKhachHang' ,async (req,res)=>{
        try{
            if (checkRequest(req.headers.origin)) {
                const {id_kh, email, tien_nap,noi_dung } = req.body
                console.log( {id_kh, email, tien_nap,noi_dung } )

                if( FunctionSqlInjectionText(id_kh) ||
                    FunctionSqlInjectionText(email) ||
                    FunctionSqlInjectionText(tien_nap) ||
                    FunctionSqlInjectionText(noi_dung) 
                ){
                    res.json({
                        status:0,
                        data:[],
                        msg_vn:'het phien',
                        msg_en:'end of session'
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
        }catch(error){
            console.log( error )
            res.json({
                status:0,
                data:[],
                msg_vn:'het phien',
                msg_en:'end of session'
            })
        }
    })


    app.get(`/WebDuDoan/NapTienKhachHang/:id_kh` , async (req,res)=>{
        try {
            if (checkRequest(req.headers.origin)) {
                const {id_kh} = req.params

                if(  FunctionSqlInjectionText(id_kh) ){
                    res.json({
                        status:0,
                        data:[],
                        msg_vn:'het phien',
                        msg_en:'end of session'
                    })
                }else{
                    const ExcuteQuery = await pool.query(`
                        select * from coin_bc_loyal 
                        where id_kh = ${id_kh}
                        order by created_at desc
                    `)

                    res.json({
                        status:1,
                        data: encode_decode.EncodeJson( ExcuteQuery.rows )
                    })
                }

            }
        } catch (error) {
            
        }
    })


    app.post(`/WebDuDoan/DuDoanKetQua` , async(req,res)=>{
        try {
            if (checkRequest(req.headers.origin)) {
                
            }
        } catch (error) {
            
        }
    })
    // app.get(`/WebDuDoan/APINBA` , async (req,res)=>{
    //     try {
    //         const res = await fetch(`https://api-basketball.p.rapidapi.com/timezone`,{
    //             method:'GET',
    //             headers: {
    //                 'x-rapidapi-host': 'api-basketball.p.rapidapi.com',
    //                 'x-rapidapi-key': '01646dd5bfmsh1192931205fde26p199d4djsn8e1d2a68bf59'
    //             }
    //         })
    //         const content = await res.json()

    //         console.log( content )
    //     } catch (error) {
    //         console.log( error )
    //     }
    // })
    // app.get(`/a/:idd`, async(req, res) => {
    //     try {
    //         const res = await 
    //         var options = {
    //             method: 'GET',
    //             url: 'https://api-basketball.p.rapidapi.com/timezone',
    //             headers: {
    //               'x-rapidapi-host': 'api-basketball.p.rapidapi.com',
    //               'x-rapidapi-key': '01646dd5bfmsh1192931205fde26p199d4djsn8e1d2a68bf59'
    //             }
    //           };

    //     } catch (error) {

    //     }
    // })


    app.post('/WebDuDoan/DuDoanMatch' , async (req,res)=>{
        try {
            
            const {array,email,date} = req.body

            if (checkRequest(req.headers.origin) && !FunctionSqlInjectionText( email ) ) {

                // Check Match
                
                if( array.length > 0 ){

                    const CheckArray = await pool.query(`
                        select * from "match"
                        where id_match = ${array[0].id_match}
                    `)

                    if( CheckArray.rows[0].coast_result === '-' ){

                        // console.log( array )
                        
                        const DataKhachHang = await pool.query(`
                            select * from tai_khoan
                            where email = N'${email}'
                        `)

                        array.map(async x=>{
                            try{

                                let date_now = new Date(date)
                                // console.log( date_now.getHours() )
                                await AddBlockChainsBetting(x.id_match,x.type_betting,DataKhachHang.rows[0].id_kh,'Betting Match',`-${x.money}`,date_now.getDate().toString(),(date_now.getMonth() + 1).toString(),date_now.getFullYear(),
                                `${date_now.getHours()}:${date_now.getMinutes()}:${date_now.getSeconds()}`
                                )
                                // const Betting = await pool.query(``)
                            }catch(error){
                                res.json({status:0,data:[]})
                            }
                        })
                        res.json({
                            status:1,
                            msg_en:'Success!'
                        })

                    }else{
                        const newDataFooball = await pool.query(`
                            select * from "match"
                            where created_at > now() - interval '2 day'
                            and coast_result = '-'
                            and name_01 != '' and name_02 != ''
                            order by created_at desc
                        `)
                        res.json({
                            status:2,
                            newDataFooball: encode_decode.EncodeJson(newDataFooball.rows),
                            msg_en:'The match has already taken place, no bets can be placed'
                        })
                    }
                }
            }else{
                res.json({status:0,data:[]})  
            }


        } catch (error) {
            console.log( error )
            res.json({status:0,data:[]})
        }
    })


}