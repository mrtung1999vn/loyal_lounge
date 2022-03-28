const { lib } = require('crypto-js')
const fetch = require('node-fetch')
const { EncodeJson, DecodeString_AES, DecodeJson, DecodeJsonRequest, EncodeString, EncodeString_AES, DecodeString } = require('../../assets/encode_decode')
const { SendMailGoogle, FunctionSqlInjection, FunctionSqlInjectionText, SaveError, SignToken, CheckToken, SignAgainToken, checkRequest } = require('../../libs')
var jwt = require('jsonwebtoken');

var token = "Token k0iI4jjVSEtdddZkIG4naDOW4kcZLbz0"
var token_01 = "Token ALfPoYpBJh1TUVilppJKCsgMX362Gtfx"


const pool = require('../../pgconnect')
const encode_decode = require('../../assets/encode_decode')
const { timeNowDB } = require('../../assets/TimeLibary')

const moment = require('moment');
const { DefautBlockChains, AddBlockChains } = require('../../libs/block_chains');

module.exports = function (app) {
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    app.get('/WebNightClub/HomeCenter', async (req,res)=>{
        try {
            
        } catch (error) {
            
        }
    })
 

    app.post('/WebNightClub/SignAgainToken', async (req, res) => {
        try {
            const { email, token, subject, text } = req.body
            // console.log( { email, token, subject, text } )

            let checkAgainToken = await SignAgainToken(email)
            
            if (
                !FunctionSqlInjection(email)
                && checkAgainToken === true
                ) {
                let token_sign = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: email + makeid(10)
                }, 'secret');
                SignToken(email, token_sign)

                res.json({
                    status:1,
                    token_sign: encode_decode.EncodeJson( token_sign )
                })
            }else{
                res.json({
                    status:0,
                    data:[]
                })
            }
        } catch (error) {
            
            res.json({
                status:0,
                data:[]
            })
            console.log(  error )
        }
    })

    app.get(`/WebNightClub/SuKien`, async (req, res) => {
        try {

            console.log(req.headers)


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

            res.json({
                status: 1,
                dataEventWeek: ExcuteQueryEventWeek.rows,
                dataEventWeekLimit: ExcuteQueryEventLimit.rows
            })

        } catch (error) {
            console.log(error)
        }
    })

    app.post(`/WebNightClub/DangNhap`, async (req, res) => {
        try {
            const { email, mat_khau, subject, text } = req.body

            console.log({ email, mat_khau, subject, text })

            if (FunctionSqlInjection(email) ||
                FunctionSqlInjection(mat_khau)) {

                res.json({
                    status: 0,
                    data: [],
                    msg: "Ten dang nhap hoac password chua ky tu dac biet"
                })
            }

            const ExcuteQuery = await pool.query(`
                select * from tai_khoan
                where email = N'${email}'
                and mat_khau_hash = N'${EncodeString(email, mat_khau)}'
                and status = true
            `)

            if (ExcuteQuery.rowCount > 0) {

                SendMailGoogle(email, subject, text)
                let token_sign = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: email + makeid(10)
                }, 'secret');
                SignToken(email, token_sign)

                res.json({
                    status: 1,
                    data: encode_decode.EncodeJson(ExcuteQuery.rows),
                    token: encode_decode.EncodeJson(token_sign),
                    msg: "Thanh cong"
                })
            } else {
                res.json({
                    status: 0,
                    data: [],
                    msg: "Sai ten tai khoan hoac mat khau"
                })
            }


        } catch (error) {
            console.log(error)
        }
    })


    app.post(`/WebNightClub/DangKyTaiKhoan`, async (req, res) => {
        try {

            const { email, mat_khau, dia_chi, so_dt } = req.body

            
            console.log( { email, mat_khau, dia_chi, so_dt } )
            if (
                FunctionSqlInjectionText(email) ||
                FunctionSqlInjectionText(mat_khau) ||
                FunctionSqlInjectionText(so_dt)
            ) {
                res.json({
                    status: 0,
                    data: [],
                    msg: 'Nguoi nhap dien ki tu dac biet'
                })
                console.log( { email, mat_khau, dia_chi, so_dt } )
            } else {
                console.log('run')
                console.log( { email, mat_khau, dia_chi, so_dt } )
                const checkData = await pool.query(`
                    select email from tai_khoan
                    where email = N'${email}'
                `)

                if (checkData.rowCount > 0) {
                    res.json({
                        status: 0,
                        data: [],
                        msg: 'Tai khoan da ton tai'
                    })
                } else {
                    await pool.query(`
                        insert into tai_khoan (
                            email ,created_at ,updated_at, status,dia_chi,so_dt,mat_khau_hash,gio_hang
                        )
                        values(
                            N'${email}',now(),now(),true,N'${dia_chi}',N'${so_dt}',N'${EncodeString(email, mat_khau)}',
                            N'[]'
                        )
                    `)

                    const ExcuteQuery = await pool.query(`
                        select * from tai_khoan where email = N'${email}'
                    `)

                    await DefautBlockChains(ExcuteQuery.rows[0].id_kh,'','','','','','')

                    res.json({
                        status: 1,
                        data: [],
                        msg: 'Them tai khoan thanh cong'
                    })
                }
            }
        } catch (error) {
            console.log(error)
            SaveError('web-night-club', '/DangKyTaiKhoan', error, 'POST', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg: 'Loi he thong'
            })
        }
    })

    app.post(`/WebNightClub/CoinEmail`, async (req,res)=>{
        try {
            const {authorization} = req.headers
            const {email,id_loai_sp} = req.body

            console.log( {email,id_loai_sp} )
            console.log( {authorization} )

            let check = await CheckToken( email, authorization)
            // let check = true

            if( check ){
                if (
                    checkRequest(req.headers.origin) 
                    && !FunctionSqlInjectionText(email) 
                    ) {
                    
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
                    
                    console.log( CoinQuery.rows )

                    if(  CoinQuery.rows[0]?.coin === null){
                        await DefautBlockChains(ExcuteQuery.rows[0].id_kh,'','','','','','')
                        res.json({status:1,data:encode_decode.EncodeJson([{coin:0}]),dataUser: encode_decode.EncodeJson(  ExcuteQuery.rows )  })
                    }else{
                        res.json({status:1,data:encode_decode.EncodeJson(CoinQuery.rows),dataUser: encode_decode.EncodeJson(  ExcuteQuery.rows )  })
                    }
                    
                }
            }else{
                res.json({status:0,data:[]})
            }
        } catch (error) {
            console.log(error)
            // res.json({status:0,data:[]})
        }
    })

    app.get(`/WebNightClub/LoaiDanhMuc` , async (req,res)=>{
        try {
            
            const newData = await pool.query(`
                select * from loai_sp
            `)

            res.json({
                status: 1,
                data: newData.rows
            })
        } catch (error) {
            res.json({
                status:0,
                data: []
            })
        }
    })



    app.post(`/WebNightClub/LichSuDatBan` , async(req,res)=>{
        try{
            const { email } = req.body

            const { authorization } = req.headers

            let check = await CheckToken(email, authorization)

            
            if( check ){
                if( !FunctionSqlInjectionText(email) ){
                    const ExcuteQuery = await pool.query(`
                        select to_date(to_char(created_at, 'YYYY/MM/DD'), 'YYYY/MM/DD')"day_time",* from booking_su_kien
                        where id_kh = (
                        select id_kh from tai_khoan where email = N'${email}'
                        )
                        order by created_at desc
                    `)
                    res.json({
                        status:1,
                        data: ExcuteQuery.rows
                    })
                }else{
                    res.json({
                        status:0,
                        data:0,
                        msg_en:'data error',
                        msg_vn:'sai du lieu'
                    })
                }
            }else{
                res.json({
                    status:0,
                    data:0,
                    msg_en:'fail',
                    msg_vn:'het han token'
                })
            }

        }catch(error){
            res.json({
                status:0,
                data:0,
                msg_en:'error',
                msg_vn:'Lỗi hệ thống'
            })
        }
    })


    app.post(`/WebNightClub/LichSuNapRut` , async(req,res)=>{
        try{
            const { email } = req.body

            const { authorization } = req.headers

            let check = await CheckToken(email, authorization)

            
            if( check ){
                if( !FunctionSqlInjectionText(email) ){
                    const ExcuteQuery = await pool.query(`
                        select to_date(to_char(created_at, 'YYYY/MM/DD'), 'YYYY/MM/DD')"day_time",* from cashmoney
                        where ten_nguoi_dung = N'${email}'
                        order by created_at desc
                    `)
                    res.json({
                        status:1,
                        data: ExcuteQuery.rows
                    })
                }else{
                    res.json({
                        status:0,
                        data:0,
                        msg_en:'data error',
                        msg_vn:'sai du lieu'
                    })
                }
            }else{
                res.json({
                    status:0,
                    data:0,
                    msg_en:'fail',
                    msg_vn:'het han token'
                })
            }

        }catch(error){
            res.json({
                status:0,
                data:0,
                msg_en:'error',
                msg_vn:'Lỗi hệ thống'
            })
        }
    })










}


