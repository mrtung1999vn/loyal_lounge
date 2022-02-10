
const pool = require('../../pgconnect')
const express = require('express')
var fs = require("fs")
var jwt = require('jsonwebtoken');
var encode_decode = require("../../assets/encode_decode")



module.exports = function(app) {
 
    
    app.get("/TotalPageDSThongBao", async(req,res)=>{
        try {
            const newQuery = await pool.query(`
                select count(*) from thong_bao
            `)
            res.json({
                status: newQuery.rowCount > 0 ? 1 : 0,
                data: newQuery.rowCount > 0 ? Math.ceil (parseInt(newQuery.rows[0].count)/15) : [],

            })
        } catch (error) {
            
        }
    })

    app.post("/DSThongBao/:page" , async(req,res)=>{
        try {
            const {token} = req.body
            
            fs.readFile('TenShop.txt', 'utf8', async (err, data)=>{
                if(err) throw res.json({
                    status:0,
                    message:'Hết phiên thao tác người dùng',
                    data:[]
                })
                const checkToken = await pool.query(`select token_te from token where token_te = N'${token.split("*")[0]}'`)
                //console.log(data)
                if(token.split("*")[1] === data && checkToken.rowCount > 0){
                    
                    const {page} = req.params
                    console.log(page)
                    const newQuery = await pool.query(`
                        select * from thong_bao,khachhang
                        where thong_bao.id_kh = khachhang.id_kh
                        order by thong_bao.ngay DESC
                        LIMIT 15 OFFSET ${page === 1 ? 0 : parseInt(page - 1)*15}
                    `)

                    if(newQuery.rowCount > 0){
                        res.json({
                            status: newQuery.rowCount > 0 ? 1 : 0,
                            data : newQuery.rowCount > 0 ? 
                            encode_decode.EncodeJson(newQuery.rows)
                             : []
                        })
                    }else{
                        res.json({
                            status: 0,
                            data :  []
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

    app.post("/DSThongBaoTrangThai/:stt" , async(req,res)=>{
        try {
            const {token} = req.body
            
            fs.readFile('TenShop.txt', 'utf8', async (err, data)=>{
                if(err) throw res.json({
                    status:0,
                    message:'Hết phiên thao tác người dùng',
                    data:[]
                })
                const checkToken = await pool.query(`select token_te from token where token_te = N'${token.split("*")[0]}'`)
                //console.log(data)
                if(token.split("*")[1] === data && checkToken.rowCount > 0){
                    
                    const {stt} = req.params
             
                    const newQuery = await pool.query(`
                        select * from thong_bao,khachhang
                        where thong_bao.id_kh = khachhang.id_kh
                        and thong_bao.trang_thai_xem = ${stt}
                        order by thong_bao.ngay DESC
                    `)

                    if(newQuery.rowCount > 0){
                        res.json({
                            status: newQuery.rowCount > 0 ? 1 : 0,
                            data : newQuery.rowCount > 0 ? 
                            encode_decode.EncodeJson(newQuery.rows)
                             : []
                        })
                    }else{
                        res.json({
                            status: 0,
                            data :  []
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

  
    app.get('/TotalDSThongBao' , async(req,res)=>{
        try {
            const newQuery = await pool.query(`
            select count(*)"count" from thong_bao
            `)
            const newQuery_chuadoc = await pool.query(`
                select count(*)"count" from thong_bao
                where trang_thai_xem = false
            `)
            const newQuery_dadoc = await pool.query(`
                select count(*)"count" from thong_bao
                where trang_thai_xem = true
            `)
        res.json({
            status: newQuery.rowCount >= 0 ? 1 : 0,
            data: newQuery.rowCount >= 0 ? parseInt(newQuery.rows[0].count) : 0,
            chua_doc: newQuery.rowCount >= 0 ? parseInt(newQuery_chuadoc.rows[0].count) : 0,
            da_doc: newQuery.rowCount >= 0 ? parseInt(newQuery_dadoc.rows[0].count) : 0,
        })
        } catch (error) {
            console.log(error)
        }
    })

    app.get(`/ChiTietThongBao/:id_tb/:id_don/:id_kh` , async (req,res)=>{
        try{    
            const {id_tb,id_don} = req.params

            const DonHang = await pool.query(`
                select trangthai from don_hang
                where id_don = ${id_don} 
            `)
            const UpdateTrangThaiXem = await pool.query(`
                update thong_bao set trang_thai_xem = true
                where id_tb = ${id_tb}
            `)
            res.json({
                status:DonHang.rowCount >= 0 ? 1 : 0,
                data : DonHang.rows[0].trangthai
            })
        }catch(error){

        }
    })


    app.post('/ThemThongBao' , async(req,res)=>{
        try {
            const {token} = req.body
            
            fs.readFile('TenShop.txt', 'utf8', async (err, data)=>{
                if(err) throw res.json({
                    status:0,
                    message:'Hết phiên thao tác người dùng',
                    data:[]
                })
                const checkToken = await pool.query(`select token_te from token where token_te = N'${token.split("*")[0]}'`)
                //console.log(data)
                if(token.split("*")[1] === data && checkToken.rowCount > 0){
                    
                    const {page} = req.params
                    console.log(page)
                    const newQuery = await pool.query(`
                        select * from thong_bao,khachhang
                        where thong_bao.id_kh = khachhang.id_kh
                        order by thong_bao.ngay DESC
                        LIMIT 15 OFFSET ${page === 1 ? 0 : parseInt(page - 1)*15}
                    `)

                    if(newQuery.rowCount > 0){
                        res.json({
                            status: newQuery.rowCount >= 0 ? 1 : 0,
                            data : newQuery.rowCount >= 0 ? 
                            encode_decode.EncodeJson(newQuery.rows)
                             : []
                        })
                    }else{
                        res.json({
                            status: 0,
                            data :  []
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








