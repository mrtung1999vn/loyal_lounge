
const pool = require('../../pgconnect')
const express = require('express')
var fs = require("fs")
var jwt = require('jsonwebtoken');
var encode_decode = require("../../assets/encode_decode");
const { timeNowDB } = require('../../assets/TimeLibary');
const { cat } = require('shelljs');


module.exports = function(app) {


    app.post("/NapTien/:tai_khoan_khach" , async (req,res)=>{
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

                    const {token,tai_khoan_khach,ghi_chu,so_tien} = req.body    
           
                    console.log({token,tai_khoan_khach,so_tien})
                    var so_dt = encode_decode.DecodeString("GIO_HANG",tai_khoan_khach)


                     const newQuery = await pool.query(`
                            insert into nap_tien(id_kh,noi_dung_nap,tien_nap,ngay_nap,trang_thai)
                            values(
                            (
                            select id_kh from khachhang
                            where so_dt = N'${so_dt}'
                            ),N'${ghi_chu}',${so_tien},'${timeNowDB}',false)
                        `)
                    if(newQuery.rowCount > 0 ){
                            const newTodo = await pool.query(`
                                select * from nap_tien,khachhang
                                where khachhang.id_kh = nap_tien.id_kh
                                and khachhang.so_dt = N'${so_dt}'
                                order by nap_tien.ngay_nap DESC
                            `)
                            res.json({
                                status:1,
                                message:"Thành công!",
                                data: newTodo.rows
                            })
                    }else{

                    }
                    // if(checkUser.rowCount > 0){
                    //     res.json({
                    //         status:0,
                    //         message:"Dữ liệu đã tồn tại",
                    //         data: []
                    //     })
                    // }else{
                    //     const newQuery = await pool.query(`
                    //         insert into nap_tien(id_kh,noi_dung_nap,tien_nap,ngay_nap,trang_thai)
                    //         values(
                    //         (
                    //         select id_kh from khachhang
                    //         where so_dt = N'0366262072'
                    //         ),N'${noi_dung_nap}',${tien_nap},'${timeNowDB}',false)
                    //     `)
                        
                    //     if(newQuery.rowCount > 0){
                    //         const newData = await pool.query(`
                    //         select * from nganhhang where ten_nganh = N'${ten_nganh}'
                    //         `)
                    //         res.json({
                    //             status:1,
                    //             message:'Thành công!',
                    //             data: newData.rows
                    //         })
                    //     }else{
                    //         res.json({
                    //             status:0,
                    //             message:'Lỗi phiên thao tác người dùng',
                    //             data:[]
                    //         })
                    //     }
                    // }



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
  

    // select * from nap_tien
    // where 
    // ngay >= '2021-01-01'
    // and ngay <= '2021-01-01'
    // id_kh 

    app.post("/LocDSNapTien", async(req,res)=>{
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
                    // console.log(page)
                    const {tu_ngay,den_ngay,tim_theo_ten,tim_theo_ma,tim_theo_van,token} = req.body
                    const newQuery = await pool.query(`
                        select * from nap_tien,khachhang
                        where khachhang.id_kh = nap_tien.id_kh
                        ${tu_ngay === '' ? ''  : `and nap_tien.ngay_nap >= '${tu_ngay}'`} 
                        ${den_ngay === '' ? ''  : `and nap_tien.ngay_nap <= '${den_ngay}'`} 
                        ${tim_theo_ten === '' ? ''  : `and LOWER(convertTVkdau(khachhang.ten_kh)) LIKE LOWER(convertTVkdau(N'%${tim_theo_ten}%'))`} 
                        order by nap_tien.ngay_nap DESC
            
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
    app.get("/TotalPageDSNapTien", async(req,res)=>{
        try {
            const newQuery = await pool.query(`
            select count(*)"count" from nap_tien
            `)
            res.json({
                status: newQuery.rowCount > 0 ? 1 : 0,
                data: newQuery.rowCount > 0 ? Math.ceil (parseInt(newQuery.rows[0].count)/10) : [],

            })
        } catch (error) {
            
        }
    })

    app.post("/DSNapTien/:page" , async(req,res)=>{
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
                        select * from nap_tien,khachhang
                        where khachhang.id_kh = nap_tien.id_kh
                        order by nap_tien.ngay_nap DESC
                        LIMIT 10 OFFSET ${page === 1 ? 0 : parseInt(page - 1)*10}
                    `)

                    if(newQuery.rowCount > 0){
                        res.json({
                            status: newQuery.rowCount > 0 ? 1 : 0,
                            data : newQuery.rowCount > 0 ? newQuery.rows : []
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

    // delete from nap_tien where
    // id_nap = 3
    app.delete("/XoaNapTien/:id_nap" , async (req,res)=>{
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
                    
                    const {id_nap} = req.params
                    
                    const newQuery = await pool.query(`
                        delete from nap_tien where
                        id_nap = ${id_nap}
                    `)

                    if(newQuery.rowCount > 0){
                        res.json({
                            status: newQuery.rowCount > 0 ? 1 : 0,
                            data : newQuery.rowCount > 0 ? id_nap : []
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


    app.put("/SuaNapTien/:id_nap" , async (req,res)=>{
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
                    
                    const {id_nap} = req.params
                    const {tien_nap} = req.body
                    console.log(tien_nap)
                    const newQuery = await pool.query(`
                            update nap_tien set tien_nap = ${tien_nap}
                            where
                            id_nap = ${id_nap}
                    `) 
                    // hang
                    const newData = await pool.query(`
                        select * from nap_tien,
                        khachhang
                        where nap_tien.id_kh = khachhang.id_kh
                        and id_nap = ${id_nap}
                    `)
                    if(newQuery.rowCount > 0){
                        res.json({
                            status: newQuery.rowCount > 0 ? 1 : 0,
                            data : newQuery.rowCount > 0 ? newData.rows : []
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











// insert into nap_tien(id_kh,noi_dung_nap,tien_nap,ngay_nap,trang_thai)
// values(
// (
// select id_kh from khachhang
// where so_dt = N'0366262072'
// ),N'noi_dung_nap',15000,'2020-01-01',false)