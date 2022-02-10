
const pool = require('../../pgconnect')
const express = require('express')
var jwt = require('jsonwebtoken');
var encode_decode = require("../../assets/encode_decode")
var fs = require('fs')
var func = require('../../assets/func')
const { timeNow, timeNowDB } = require('../../assets/TimeLibary')
var randomstring = require("randomstring");

module.exports = function (app) {


    app.get('/Token/:key', async (req, res) => {
        try {
            const { key } = req.params

            if (key === "0366262072") {
                const newQuery = await pool.query(`SELECT * from token`)
                // console.log(encode_decode.EncodeString_AES("0366262072", newQuery.rows[0].token_te).toString())
                res.json({
                    status: 1,
                    message: "Thành công",
                    data: encode_decode.EncodeString_AES("0366262072", newQuery.rows[0].token_te).toString()
                })
            } else {
                res.json({
                    status: 0,
                    message: 'Hết phiên thao tác người dùng',
                    data: []
                })
            }
        } catch (error) {
            // console.log(error)
            res.json({
                status: 0,
                message: 'Hết phiên thao tác người dùng',
                data: []
            })
        }
    })


    app.post("/ExtensionCart/PriceChina", async (req, res) => {
        try {
            const { tai_khoan_khach } = req.body

            const newQuery = await pool.query(`select ti_gia_tinh from khachhang where so_dt = N'${tai_khoan_khach}'`)

            res.json({
                "status": newQuery.rowCount > 0 ? 1 : 0,
                "data": newQuery.rowCount > 0 ? newQuery.rows[0].ti_gia_tinh : 3750
            })
        } catch (error) {
            console.log(error)
        }
    })

    app.post("/ExtensionCart/ArrayItem", async (req, res) => {
        try {
            const { token, Cart, tai_khoan_khach } = req.body
            // console.log(Cart)
            const _so_st = encode_decode.DecodeString("GIO_HANG",tai_khoan_khach)
            if (token === "order0phi") {
                const newQuery = await pool.query(`select gio_hang from khachhang where so_dt = N'${_so_st}'`)
                if(newQuery.rowCount >= 0){
                    const GioHang = newQuery.rows[0].gio_hang === '' || newQuery.rows[0].gio_hang === null || newQuery.rows[0].gio_hang === '[]' ? [] :
                    JSON.parse(newQuery.rows[0].gio_hang)
                    ArrayCart = JSON.parse(Cart)
                    ArrayCart.map(x=>
                        GioHang.push({
                            "title" : x.title,
                            "price" : x.price,
                            "web" : x.web,
                            "note" : x.note,
                            "qty" : x.qty,
                            "image" : x.image,
                            "status" : false
                        })
                    )
                        console.log(GioHang)
                    const updateData = await pool.query(`
                        UPDATE khachhang set gio_hang = N'${JSON.stringify(GioHang)}'
                        WHERE so_dt = N'${_so_st}'
                    `)
                    
                    res.json({
                        status: 1,
                        message: "SUCCESS",
                        data: []
                    })
                }else{
                    res.json({
                        status: 0,
                        message: "ERROR",
                        data: []
                    })
                }
                
            } else {
                res.json({
                    status: 0,
                    message: "ERROR",
                    data: []
                })
            }
        } catch (error) {
            console.log(error)
        }
    })

    app.post("/ExtensionCart/AddItem", async (req, res) => {
        try {
            const { token, title, price, web, note, tai_khoan_khach, qty, image } = req.body
            var _so_st = encode_decode.DecodeString("GIO_HANG",tai_khoan_khach)
            if (token === "order0phi") {
                const newQuery = await pool.query(`select gio_hang from khachhang where so_dt = N'${_so_st}'`)
                
                if(newQuery.rowCount >= 0){ 
                    const GioHang = newQuery.rows[0].gio_hang === null || newQuery.rows[0].gio_hang === '[]' ? [] :
                    JSON.parse(newQuery.rows[0].gio_hang)
                    GioHang.push({
                        "title" : title,
                        "price" : price,
                        "web" : web,
                        "note" : note,
                        "qty" : qty,
                        "image" : image,
                        "status" : false
                    })
                    const updateData = await pool.query(`
                        UPDATE khachhang set gio_hang = N'${JSON.stringify(GioHang)}'
                        WHERE so_dt = N'${_so_st}'
                    `)
                    
                    res.json({
                        status: 1,
                        message: "SUCCESS",
                        data: []
                    })
                }else{
                    res.json({
                        status: 0,
                        message: "ERROR",
                        data: []
                    })
                }
                
            } else {
                res.json({
                    status: 0,
                    message: "ERROR",
                    data: []
                })
            }
        } catch (error) {

        }
    })


    app.get("/TestGioHang/:SoDT", async(req,res)=>{
        try {
            const {SoDT} = req.params

            const newQuery = await pool.query(`
                select gio_hang from khachhang where so_dt = N'${SoDT}'
            `)
            res.json({
                status:newQuery.rowCount > 0 ? 1 : 0,
                message:`AHihi giỏ hàng bạn Số ĐT đáng yếu :3 ${SoDT}`,
                data:newQuery.rows
            })
        } catch (error) {
            
        }
    })


    app.get("/KhachHang/:ten_kh" , async(req,res)=>{
        try{
            const {ten_kh} = req.params
            // console.log(ten_kh)
            const newQuery = await pool.query(`
                select so_dt, ten_kh from khachhang
                where LOWER(convertTVkdau(khachhang.ten_kh)) LIKE LOWER(convertTVkdau(N'%${ten_kh}%'))
            `)
            const newData = []
            newQuery.rows.map(x=>newData.push({
                // so_dt:x.so_dt,
                ten_kh:x.ten_kh,
                tai_khoan_khach: encode_decode.EncodeString("GIO_HANG",x.so_dt)
            }))
            // console.log(tai_khoan_khach)
            console.log(newData)
            res.json({
                status : newQuery.rowCount > 0 ? 1 : 0,
                data : newQuery.rowCount > 0 ? 
                encode_decode.EncodeJson(newData)
                : [],
                
            })
        }catch (error){
            console.log(error)
        }
    })









    app.post("/CapNhapGioHang/:id_kh",async (req,res)=>{
        try {
            const {token} = req.body
            // console.log(token)
            console.log("TEST")
            fs.readFile('TenShop.txt', 'utf8', async (err, data)=>{
                if(err) throw res.json({
                    status:0,
                    message:'Hết phiên thao tác người dùng',
                    data:[]
                })
                const checkToken = await pool.query(`select token_te from token where token_te = N'${token.split("*")[0]}'`)
                //console.log(data)
                if(token.split("*")[1] === data && checkToken.rowCount > 0){

                    const {id_kh} = req.params
                    const {newGioHang} = req.body

                    const newQuery = await pool.query(`select * from khachhang where id_kh = ${id_kh} LIMIT 1`)
                    if(newQuery.rowCount > 0){
                            const UpdateGioHang = await pool.query(`
                            update khachhang set gio_hang = N'${JSON.stringify(newGioHang)}'
                            where id_kh = ${id_kh} 
                    `)
                        res.json({
                            status:1,
                            message:'Thành công!',
                        // data:  encode_decode.EncodeJson(newData)
                        })
                    }else{
                    res.json({
                        status:0,
                        message:'Hết phiên thao tác người dùng',
                        data:[]
                    })
                    }
                
                    
                  

                }else{
                    res.json({
                        status:0,
                        message:'Hết phiên thao tác người dùng',
                        data:[]
                    })
                }
            });
        } catch (error) {
            console.log(error)
            res.json({
                status:0,
                message:'Hết phiên thao tác người dùng',
                data:[]
            })
        }
    })

}


