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
const { localeData } = require('moment');
// const { response } = require('express');

const date = new Date()


module.exports = function (app) {

    app.post(`/App/NapTienKhachHang`, async (req, res) => {
        try {

            const { authorization } = req.headers
            const { id_kh, email, tien_nap, noi_dung } = req.body
            console.log({ id_kh, email, tien_nap, noi_dung })

            let check = await CheckToken(email, authorization)

            // let check = true

            console.log(check)

            if (check) {
                if (
                    FunctionSqlInjectionText(tien_nap) ||
                    FunctionSqlInjectionText(noi_dung) ||
                    FunctionSqlInjectionText(email)
                ) {
                    res.json({
                        status: 0,
                        data: [],
                        msg_vn: 'loi he thong',
                        msg_en: 'system error'
                    })
                } else {

                    // tien_nap : demo   +1000 // Parrams

                    // tien_nap : demo   -1000 // -200

                    await AddBlockChains(id_kh, noi_dung,
                        tien_nap, date.getDate().toString(),
                        (date.getMonth() + 1).toString(), date.getFullYear().toString(),
                        `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)

                    res.json({
                        status: 1,
                        msg_vn: 'them thanh cong',
                        msg_en: 'success'
                    })

                }

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




    app.post(`/App/GioHang`, async (req, res) => {
        try {
            const { authorization } = req.headers
            const { id_kh, email, tien_nap, noi_dung } = req.body

            let check = await CheckToken(email, authorization)

            if (
                FunctionSqlInjectionText(email)
            ) {
                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'loi he thong',
                    msg_en: 'system error'
                })
            } else {

                const GioHang = await pool.query(`
                    select * from tai_khoan
                    where email = N'${email}'
                `)

                res.json({
                    status: 1,
                    gio_hang: GioHang.rows[0].gio_hang,
                    msg_vn: 'them thanh cong',
                    msg_en: 'success'
                })
            }

        } catch (error) {

        }
    })

    const CheckArray = (array) => {
        try {

            if (array === '' || array === undefined || array === null) {
                return false
            }
            if (JSON.parse(array) >= 0) {
                return true
            } else {
                return true
            }
        } catch (error) {
            return false
        }
    }


    app.put(`/App/GioHang`, async (req, res) => {
        try {
            const { authorization } = req.headers
            // gio_hang string 
            const { id_kh, email, gio_hang } = req.body

            let check = await CheckToken(email, authorization)

            if (
                !check &&
                FunctionSqlInjectionText(email) &&
                !CheckArray(gio_hang)
            ) {
                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'loi he thong',
                    msg_en: 'system error'
                })
            } else {
                // console.log("a")
                // status 2 không cập nhập hàng được do dữ liệu gio_hang lớn hơn số tiền nạp

                try {
                    // [{"id_sp":"2","ten_sp":"Ace of Spades Gold","gia_sp":500,"hinh_anh":"","so_luong_sp":1}]

                    /*
                        `[{"id_sp":"2","ten_sp":"Ace of Spades Gold","gia_sp":500,"hinh_anh":"","so_luong_sp":1},{"id_sp":"3","ten_sp":"Ace of Spades Gold","gia_sp":500,"hinh_anh":"","so_luong_sp":4}]`
                    */


                    await pool.query(`

                        update tai_khoan set gio_hang = N'${gio_hang}'

                        where email = N'${email}'

                    `)

                    const SelectGioHang = await pool.query(`
                        select * from tai_khoan
                        where email = N'${email}'
                        `)

                    res.json({
                        status: 1,
                        gio_hang: gio_hang,
                        msg_vn: 'them thanh cong',
                        msg_en: 'success'
                    })

                } catch (error) {
                    console.log( error )
                    res.json({
                        status: 0,
                        msg_vn: 'that bai',
                        msg_en: 'fail'
                    })
                }
            }

        } catch (error) {
            console.log( error )
            res.json({
                status: 0,
                msg_vn: 'that bai',
                msg_en: 'fail'
            })
        }
    })

    
    app.post(`/App/DatHang`, async (req, res) => {
        try {
            const { authorization } = req.headers
            // gio_hang string 
            const { id_kh, email, gio_hang_kh } = req.body

            // console.log({ id_kh, email, gio_hang_kh })

            // Array => string ( Array ep kieu ve string )
            // gio_hang_kh : `[{"id_sp":"3","ten_sp":"Dom Perignon","gia_sp":300,"hinh_anh":"","so_luong_sp":"2"},{"id_sp":"7","ten_sp":"Belaire Gold","gia_sp":130,"hinh_anh":"","so_luong_sp":"3"}]`


            let check = await CheckToken(email, authorization)

            if (check) {

                if (

                    !FunctionSqlInjectionText(email) &&
                    CheckArray(gio_hang_kh)

                ) {

                    // console.log(`====  giỏ hàng  ====`)

                    console.log(gio_hang_kh)

                    const date = new Date()

                    function makeid(length) {
                        var result = '';
                        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                        var charactersLength = characters.length;
                        for (var i = 0; i < length; i++) {
                            result += characters.charAt(Math.floor(Math.random() *
                                charactersLength));
                        }
                        return result + `${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
                    }

                    // console.log(makeid(5));


                    let tong_tien = 0

                    let gio_hang = JSON.parse(gio_hang_kh)

                    // console.log(gio_hang)

                    for (let i = 0; i < gio_hang.length; i++) {
                        tong_tien += parseFloat(gio_hang[i].gia_sp) * parseFloat(gio_hang[i].so_luong_sp)
                    }
                    // console.log( tong_tien )

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

                    // console.log(CoinQuery.rows  )
                    
                    // console.log(tong_tien)

                    // console.log(parseFloat(CoinQuery.rows[0]?.coin))

                    if (
                        tong_tien >
                        parseFloat(CoinQuery.rows[0]?.coin)) {
                        res.json({
                            status: 1,
                            check: false,
                            gio_hang: gio_hang_kh,
                            msg_vn: 'Số tiền không đủ vui lòng nạp thêm',
                            msg_en: 'The amount is not enough, please add more'
                        })
                    } else {
                        // console.log('a')
                        let string_don = makeid(10)

                        await pool.query(`
                            
                                insert into don_hang ( tong_tien,created_at,updated_at,ghi_chu,id_kh,string_don,status)
                                values(
                                    ${tong_tien},now(),
                                    now(),N'',
                                    (select id_kh from tai_khoan where email=N'${email}'),
                                    N'${string_don}',
                                    false 
                                )
                
                            `)

                        let coin_tranfer = `-${tong_tien}`

                        await AddBlockChains(id_kh, `Cart ID Bill ${string_don}`,
                            coin_tranfer, date.getDate().toString(),
                            (date.getMonth() + 1).toString(), date.getFullYear().toString(),
                            `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
    


                        for (let i = 0; i < gio_hang.length; i++) {
                            // tong_tien += parseFloat(gio_hang[i].gia_sp) * parseFloat(gio_hang[i].so_luong_sp)

                            await pool.query(
                                `
                                    insert into don_hang_ct (id_sp,created_at,updated_at,so_luong,gia_tien,id_don)
                                    values( 
                                        ${gio_hang[i].id_sp}, now(),now(),${gio_hang[i].so_luong_sp},${gio_hang[i].gia_sp},
                                        (
                                            select id_don from don_hang
                                            where string_don = N'${string_don}'
                                        )
                                    )
                                    `
                            )
                        }

                        res.json({
                            status: 1,
                            check: true,
                            gio_hang: '[]',
                            msg_en: 'success',
                            msg_vn: 'thanh cong',
                        })

                    }



                } else {
                    res.json({
                        status: 0,
                        msg_en: 'fail',
                        msg_vn: 'loi du lieu nguoi dung',
                    })


                }
            } else {
                res.json({
                    status: 0,
                    msg_en: 'fail',
                    msg_vn: 'loi du lieu nguoi dung',
                })
            }

        } catch (error) {
            res.json({
                status: 0,
                msg_en: 'fail',
                msg_vn: 'loi du lieu nguoi dung',
            })
        }
    })


    app.get(`/App/LichSuDonHang/:email` , async(req,res)=>{
        try {

            const {email} = req.params

            const newData = await pool.query(`
                select 
                to_char(created_at, 'YYYY/MM/DD HH24:MI:SS')"day_time",* from don_hang
                where id_kh = (
                select id_kh from tai_khoan where email = N'${email}'
                )
                order by created_at desc
            `)

            res.json({
                status:1,
                data: newData.rows,
                msg_en:'success',
                msg_vn:'thanh cong',

            })

        } catch (error) {
            res.json({
                status:0,
                data: newData.rows,
                msg_en:'fail',
                msg_vn:'that bai',
            })

        }
    })

    app.get(`/App/ChiTietDonHang/:id_don` , async(req,res)=>{
        try {
            const {id_don} = req.params

            const newData = await pool.query(`
                select don_hang_ct.so_luong"so_luong_ct",* from don_hang_ct,san_pham
                where id_don = ${id_don}
                and don_hang_ct.id_sp = san_pham.id_sp 
            `)

            res.json({
                status:1,
                data: newData.rows,
                msg_en:'success',
                msg_vn:'thanh cong',

            })

        } catch (error) {
            res.json({
                status:0,
                data: newData.rows,
                msg_en:'fail',
                msg_vn:'that bai',
            })

        }
    })

    app.post(`/App/CoinEmail`, async (req, res) => {
        try {
            const { authorization } = req.headers
            const { email, id_loai_sp } = req.body


            let check = await CheckToken(email, authorization)
            // let check = true

            if (check) {
                if (
                    !FunctionSqlInjectionText(email)
                ) {

                    const ExcuteQuery = await pool.query(`
                        select * from tai_khoan
                        where email = N'${email}'
                    `)

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

                    // console.log(CoinQuery.rows)

                    if (CoinQuery.rows[0]?.coin === null) {
                        await DefautBlockChains(ExcuteQuery.rows[0].id_kh, '', '', '', '', '', '')
                        res.json({ status: 1, data: [{ coin: 0 }], dataUser: ExcuteQuery.rows })
                    } else {
                        res.json({ status: 1, data: CoinQuery.rows, dataUser: ExcuteQuery.rows })
                    }
                }
            } else {
                res.json({ status: 0, data: [] })
            }
        } catch (error) {
            res.json({ status: 0, data: [] })
            console.log(error)

        }
    })

    app.post(`/App/DoiMatKhau`, async (req, res) => {
        try {
            const { authorization } = req.headers
            const { email, password, password_confirm } = req.body


            let check = await CheckToken(email, authorization)
            // let check = true
            console.log({ email, password, password_confirm })
            if (check) {
                if (
                    !FunctionSqlInjectionText(email) ||
                    !FunctionSqlInjectionText(password) ||
                    !FunctionSqlInjectionText(password_confirm)
                ) {


                    await pool.query(`
                        update tai_khoan set mat_khau_hash = N'${EncodeString(email, password)}'
                        where email = N'${email}'
                    `)

                    res.json({
                        status: 1,
                        data: [],
                        msg_en: 'success',
                        msg_vn: 'thanh cong'
                    })
                    // console.log(CoinQuery.rows)


                }
            } else {
                res.json({ status: 0, data: [] })
            }

        } catch (error) {
            res.json({ status: 0, data: [] })
        }
    })


    app.get(`/App/ListCoinKhachHang`, async(req,res)=>{
        try {


            const ExcuteQuery = await pool.query(`
                select * from tai_khoan
            `)
            const newData = []
            for(let i=0 ; i < ExcuteQuery.rowCount ; i++){
                
                const CoinEmail = await pool.query(`
                    select 
                    (
                        select sum(coin_tranfer::float8)"coin" from coin_bc_loyal
                        where id_kh = (
                            select id_kh from tai_khoan where email = N'${ExcuteQuery.rows[i]?.email}'
                        )
                            and status = true
                    ) 
                    +
                    (
                        select sum(coin_tranfer::float8)"coin" from coin_bc_loyal
                        where id_kh = (
                            select id_kh from tai_khoan where email = N'${ExcuteQuery.rows[i]?.email}'
                        )
                        and coin_tranfer like N'%-%'
                    )
                    "coin"
           
                `)

                newData.push({
                    id_kh: ExcuteQuery.rows[i]?.id_kh,
                    coin: CoinEmail.rows[0]?.coin,
                    email: ExcuteQuery.rows[i]?.email,
                    email: ExcuteQuery.rows[i]?.status,
                    email: ExcuteQuery.rows[i]?.status,
                })
                console.log(
                    ExcuteQuery.rows[i]
                )
            }

        } catch (error) {
            res.json({
                status:1,
                data:[]
            })
        }
    })


    app.post(`/`)

}