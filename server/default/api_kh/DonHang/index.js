
const pool = require('../../pgconnect')
var fs = require('fs')
var func = require('../../assets/func')
var encode_decode = require("../../assets/encode_decode")
const { timeNow, timeNowDB } = require('../../assets/TimeLibary')
var randomstring = require("randomstring");
module.exports = function(app) {

    

    app.post('/kh/DSDangXuLy/:page/:id_kh' , async (req,res)=>{
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

                    const {page,id_kh} = req.params
                    const {trangthai} = req.body
                    console.log(page,trangthai)
                    const newQuery = await pool.query(`
                        select 
                        (
                            don_hang.tong_tien+don_hang.phi_noi_dia+don_hang.phi_dich_vu+don_hang.phu_phi+
                            (select tien_theo_can from khachhang where khachhang.id_kh = don_hang.id_kh)*(CASE WHEN so_can IS NULL THEN 0 WHEN so_can >= 0 THEN so_can END )
                            +(select tien_theo_khoi from khachhang where khachhang.id_kh = don_hang.id_kh)*(CASE WHEN so_khoi IS NULL THEN 0 WHEN so_khoi >= 0 THEN so_khoi END )
                        )"thanhtien_CT"
                        ,*from don_hang,khachhang
                        where don_hang.id_kh = khachhang.id_kh
                        and don_hang.trangthai = N'${trangthai}'
                        ORDER BY don_hang.ngay DESC
                        LIMIT 10 OFFSET ${page === 1 ? 0 : parseInt(page - 1)*10}
                    `)

                    res.json({
                        status:1,
                        message:'Thành công!',
                        data: encode_decode.EncodeJson(newQuery.rows)
                    })

                }else{
                    res.json({
                        status:0,
                        message:'Hết phiên thao tác người dùng',
                        data:[]
                    })
                }
            });
        } catch (error) {
            res.json({
                status:0,
                message:'Hết phiên thao tác người dùng',
                data:[]
            })
        }
    })

    app.post('/kh/DSDaDatHang/:page/:id_kh' , async (req,res)=>{
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

                    const {page,id_kh} = req.params
                    const {trangthai} = req.body
                    console.log(page,trangthai)
                    const newQuery = await pool.query(`
                        select 
                        (
                            don_hang.tong_tien+don_hang.phi_noi_dia+don_hang.phi_dich_vu+don_hang.phu_phi+
                            (select tien_theo_can from khachhang where khachhang.id_kh = don_hang.id_kh)*(CASE WHEN so_can IS NULL THEN 0 WHEN so_can >= 0 THEN so_can END )
                            +(select tien_theo_khoi from khachhang where khachhang.id_kh = don_hang.id_kh)*(CASE WHEN so_khoi IS NULL THEN 0 WHEN so_khoi >= 0 THEN so_khoi END )
                        )"thanhtien_CT"
                        ,*from don_hang,khachhang
                        where don_hang.id_kh = khachhang.id_kh
                        and don_hang.trangthai = N'${trangthai}'
                        ORDER BY don_hang.ngay DESC
                        LIMIT 10 OFFSET ${page === 1 ? 0 : parseInt(page - 1)*10}
                    `)

                    res.json({
                        status:1,
                        message:'Thành công!',
                        data: encode_decode.EncodeJson(newQuery.rows)
                    })

                }else{
                    res.json({
                        status:0,
                        message:'Hết phiên thao tác người dùng',
                        data:[]
                    })
                }
            });
        } catch (error) {
            res.json({
                status:0,
                message:'Hết phiên thao tác người dùng',
                data:[]
            })
        }
    })

    app.post('/kh/DSDangPhatGiaoVan/:page/:id_kh' , async (req,res)=>{
        try {
            const {token} = req.body
            
            fs.readFile('TenShop.txt', 'utf8', async (err, data)=>{
                if(err) throw res.json({
                    status:0,
                    message:'Hết phiên thao tác người dùng',
                    data:[]
                })
                console.log(token)
                const checkToken = await pool.query(`select token_te from token where token_te = N'${token.split("*")[0]}'`)
                //console.log(data)
                if(token.split("*")[1] === data && checkToken.rowCount > 0){

                    const {page,id_kh} = req.params
                    const {trangthai} = req.body
                    console.log(page,trangthai)
                    const newQuery = await pool.query(`
                        select 
                        (
                            don_hang.tong_tien+don_hang.phi_noi_dia+don_hang.phi_dich_vu+don_hang.phu_phi+
                            (select tien_theo_can from khachhang where khachhang.id_kh = don_hang.id_kh)*(CASE WHEN so_can IS NULL THEN 0 WHEN so_can >= 0 THEN so_can END )
                            +(select tien_theo_khoi from khachhang where khachhang.id_kh = don_hang.id_kh)*(CASE WHEN so_khoi IS NULL THEN 0 WHEN so_khoi >= 0 THEN so_khoi END )
                        )"thanhtien_CT"
                        ,*from don_hang,khachhang
                        where don_hang.id_kh = khachhang.id_kh
                        and don_hang.trangthai = N'${trangthai}'
                        ORDER BY don_hang.ngay DESC
                        LIMIT 10 OFFSET ${page === 1 ? 0 : parseInt(page - 1)*10}
                    `)

                    res.json({
                        status:1,
                        message:'Thành công!',
                        data: encode_decode.EncodeJson(newQuery.rows)
                    })

                }else{
                    res.json({
                        status:0,
                        message:'Hết phiên thao tác người dùng',
                        data:[]
                    })
                }
            });
        } catch (error) {
            res.json({
                status:0,
                message:'Hết phiên thao tác người dùng',
                data:[]
            })
        }
    })


    app.post('/kh/DSHangVeKho/:page/:id_kh' , async (req,res)=>{
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

                    const {page,id_kh} = req.params
                    const {trangthai} = req.body
                    console.log(page,trangthai)
                    const newQuery = await pool.query(`
                        select 
                        (
                            don_hang.tong_tien+don_hang.phi_noi_dia+don_hang.phi_dich_vu+don_hang.phu_phi+
                            (select tien_theo_can from khachhang where khachhang.id_kh = don_hang.id_kh)*(CASE WHEN so_can IS NULL THEN 0 WHEN so_can >= 0 THEN so_can END )
                            +(select tien_theo_khoi from khachhang where khachhang.id_kh = don_hang.id_kh)*(CASE WHEN so_khoi IS NULL THEN 0 WHEN so_khoi >= 0 THEN so_khoi END )
                        )"thanhtien_CT"
                        ,*from don_hang,khachhang
                        where don_hang.id_kh = khachhang.id_kh
                        
                        and don_hang.trangthai = N'${trangthai}'
                        ORDER BY don_hang.ngay DESC
                        LIMIT 10 OFFSET ${page === 1 ? 0 : parseInt(page - 1)*10}
                    `)

                    res.json({
                        status:1,
                        message:'Thành công!',
                        data: encode_decode.EncodeJson(newQuery.rows)
                    })

                }else{
                    res.json({
                        status:0,
                        message:'Hết phiên thao tác người dùng',
                        data:[]
                    })
                }
            });
        } catch (error) {
            res.json({
                status:0,
                message:'Hết phiên thao tác người dùng',
                data:[]
            })
        }
    })

    app.post("/kh/DSTatCa/:page/:id_kh" , async(req,res)=>{
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

                    const {page,id_kh} = req.params
                    const {trangthai} = req.body
                    console.log(page,trangthai)
                    const newQuery = await pool.query(`
                        select 
                        (
                            don_hang.tong_tien+don_hang.phi_noi_dia+don_hang.phi_dich_vu+don_hang.phu_phi+
                            (select tien_theo_can from khachhang where khachhang.id_kh = don_hang.id_kh)*(CASE WHEN so_can IS NULL THEN 0 WHEN so_can >= 0 THEN so_can END )
                            +(select tien_theo_khoi from khachhang where khachhang.id_kh = don_hang.id_kh)*(CASE WHEN so_khoi IS NULL THEN 0 WHEN so_khoi >= 0 THEN so_khoi END )
                        )"thanhtien_CT"
                        ,*from don_hang,khachhang
                        where don_hang.id_kh = khachhang.id_kh
                        ORDER BY don_hang.ngay DESC
                        LIMIT 10 OFFSET ${page === 1 ? 0 : parseInt(page - 1)*10}
                    `)

                    res.json({
                        status:1,
                        message:'Thành công!',
                        data: encode_decode.EncodeJson(newQuery.rows)
                    })

                }else{
                    res.json({
                        status:0,
                        message:'Hết phiên thao tác người dùng',
                        data:[]
                    })
                }
            });
        } catch (error) {
            res.json({
                status:0,
                message:'Hết phiên thao tác người dùng',
                data:[]
            })
        }
    })

    app.get("/kh/TotalPageTatCa", async(req,res)=>{
        try {
            const newQuery = await pool.query(`
            select count(*) from don_hang
            
            `)

            res.json({
                status: newQuery.rowCount > 0 ? 1 : 0,
                data : Math.ceil(parseInt(newQuery.rows[0].count) /10),
                message :  newQuery.rowCount > 0 ? "Thành công!" : "Thất bại!"
            })
        } catch (error) {
            
        }
    })

    app.post('/kh/DSKhieuNai/:page/:id_kh' , async (req,res)=>{
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

                    const {page,id_kh} = req.params
                    const {trangthai} = req.body
                    console.log(page,trangthai)
                    const newQuery = await pool.query(`
                        select 
                        (
                            don_hang.tong_tien+don_hang.phi_noi_dia+don_hang.phi_dich_vu+don_hang.phu_phi+
                            (select tien_theo_can from khachhang where khachhang.id_kh = don_hang.id_kh)*(CASE WHEN so_can IS NULL THEN 0 WHEN so_can >= 0 THEN so_can END )
                            +(select tien_theo_khoi from khachhang where khachhang.id_kh = don_hang.id_kh)*(CASE WHEN so_khoi IS NULL THEN 0 WHEN so_khoi >= 0 THEN so_khoi END )
                        )"thanhtien_CT"
                        ,*from don_hang,khachhang
                        where don_hang.id_kh = khachhang.id_kh
                        and don_hang.trangthai = N'${trangthai}'
                        ORDER BY don_hang.ngay DESC
                        LIMIT 10 OFFSET ${page === 1 ? 0 : parseInt(page - 1)*10}
                    `)

                    res.json({
                        status:1,
                        message:'Thành công!',
                        data: encode_decode.EncodeJson(newQuery.rows)
                    })

                }else{
                    res.json({
                        status:0,
                        message:'Hết phiên thao tác người dùng',
                        data:[]
                    })
                }
            });
        } catch (error) {
            res.json({
                status:0,
                message:'Hết phiên thao tác người dùng',
                data:[]
            })
        }
    })


    app.post('/kh/DSThanhCong/:page/:id_kh' , async (req,res)=>{
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

                    const {page,id_kh} = req.params
                    const {trangthai} = req.body
                    console.log(page,trangthai)
                    const newQuery = await pool.query(`
                        select 
                        (
                            don_hang.tong_tien+don_hang.phi_noi_dia+don_hang.phi_dich_vu+don_hang.phu_phi+
                            (select tien_theo_can from khachhang where khachhang.id_kh = don_hang.id_kh)*(CASE WHEN so_can IS NULL THEN 0 WHEN so_can >= 0 THEN so_can END )
                            +(select tien_theo_khoi from khachhang where khachhang.id_kh = don_hang.id_kh)*(CASE WHEN so_khoi IS NULL THEN 0 WHEN so_khoi >= 0 THEN so_khoi END )
                        )"thanhtien_CT"
                        ,*from don_hang,khachhang
                        where don_hang.id_kh = khachhang.id_kh
                        and don_hang.trangthai = N'${trangthai}'
                        ORDER BY don_hang.ngay DESC
                        LIMIT 10 OFFSET ${page === 1 ? 0 : parseInt(page - 1)*10}
                    `)

                    res.json({
                        status:1,
                        message:'Thành công!',
                        data: encode_decode.EncodeJson(newQuery.rows)
                    })

                }else{
                    res.json({
                        status:0,
                        message:'Hết phiên thao tác người dùng',
                        data:[]
                    })
                }
            });
        } catch (error) {
            res.json({
                status:0,
                message:'Hết phiên thao tác người dùng',
                data:[]
            })
        }
    })

    app.post('/kh/DSShopHuy/:page/:id_kh' , async (req,res)=>{
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

                    const {page,id_kh} = req.params
                    const {trangthai} = req.body
                    console.log(page,trangthai)
                    const newQuery = await pool.query(`
                        select 
                        (
                            don_hang.tong_tien+don_hang.phi_noi_dia+don_hang.phi_dich_vu+don_hang.phu_phi+
                            (select tien_theo_can from khachhang where khachhang.id_kh = don_hang.id_kh)*(CASE WHEN so_can IS NULL THEN 0 WHEN so_can >= 0 THEN so_can END )
                            +(select tien_theo_khoi from khachhang where khachhang.id_kh = don_hang.id_kh)*(CASE WHEN so_khoi IS NULL THEN 0 WHEN so_khoi >= 0 THEN so_khoi END )
                        )"thanhtien_CT"
                        ,*from don_hang,khachhang
                        where don_hang.id_kh = khachhang.id_kh
                        and don_hang.trangthai = N'${trangthai}'
                        ORDER BY don_hang.ngay DESC
                        LIMIT 10 OFFSET ${page === 1 ? 0 : parseInt(page - 1)*10}
                    `)

                    res.json({
                        status:1,
                        message:'Thành công!',
                        data: encode_decode.EncodeJson(newQuery.rows)
                    })

                }else{
                    res.json({
                        status:0,
                        message:'Hết phiên thao tác người dùng',
                        data:[]
                    })
                }
            });
        } catch (error) {
            res.json({
                status:0,
                message:'Hết phiên thao tác người dùng',
                data:[]
            })
        }
    })


    


    app.get(`/kh/TotalPageDangXuLy` , async(req,res)=>{
        try {
            const newQuery = await pool.query(`
         
            select count(*) from don_hang
            where trangthai = N'Đang xử lý'
            `)

            res.json({
                status: newQuery.rowCount > 0 ? 1 : 0,
                data : Math.ceil(parseInt(newQuery.rows[0].count) /10),
                message :  newQuery.rowCount > 0 ? "Thành công!" : "Thất bại!"
            })
        } catch (error) {
            
        }
    })


    app.get(`/kh/TotalPageDaDatHang` , async(req,res)=>{
        try {
            const newQuery = await pool.query(`
         
            select count(*) from don_hang
            where trangthai = N'Đã đặt hàng'
            `)

            res.json({
                status: newQuery.rowCount > 0 ? 1 : 0,
                data : Math.ceil(parseInt(newQuery.rows[0].count) /10),
                message :  newQuery.rowCount > 0 ? "Thành công!" : "Thất bại!"
            })
        } catch (error) {
            
        }
    })

    app.get(`/kh/TotalPageDangPhatGiaoVan` , async(req,res)=>{
        try {
            const newQuery = await pool.query(`
         
            select count(*) from don_hang
            where trangthai = N'Đang phát giao vận'
            `)

            res.json({
                status: newQuery.rowCount > 0 ? 1 : 0,
                data : Math.ceil(parseInt(newQuery.rows[0].count) /10),
                message :  newQuery.rowCount > 0 ? "Thành công!" : "Thất bại!"
            })
        } catch (error) {
            
        }
    })

    app.get(`/kh/TotalPageHangVeKho` , async(req,res)=>{
        try {
            const newQuery = await pool.query(`
         
            select count(*) from don_hang
            where trangthai = N'Hàng về kho'
            `)

            res.json({
                status: newQuery.rowCount > 0 ? 1 : 0,
                data : Math.ceil(parseInt(newQuery.rows[0].count) /10),
                message :  newQuery.rowCount > 0 ? "Thành công!" : "Thất bại!"
            })
        } catch (error) {
            
        }
    })


    app.get(`/kh/TotalPageKhieuNai` , async(req,res)=>{
        try {
            const newQuery = await pool.query(`
         
            select count(*) from don_hang
            where trangthai = N'Khiếu nại'
            `)

            res.json({
                status: newQuery.rowCount > 0 ? 1 : 0,
                data : Math.ceil(parseInt(newQuery.rows[0].count) /10),
                message :  newQuery.rowCount > 0 ? "Thành công!" : "Thất bại!"
            })
        } catch (error) {
            
        }
    })

    app.get(`/kh/TotalPageShopHuy` , async(req,res)=>{
        try {
            const newQuery = await pool.query(`
         
            select count(*) from don_hang
            where trangthai = N'Shop huỷ'
            `)

            res.json({
                status: newQuery.rowCount > 0 ? 1 : 0,
                data : Math.ceil(parseInt(newQuery.rows[0].count) /10),
                message :  newQuery.rowCount > 0 ? "Thành công!" : "Thất bại!"
            })
        } catch (error) {
            
        }
    })




    app.post("/kh/GioHangChiTietKhach/:id_don/" , async(req,res)=>{
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

                    const {id_don} = req.params
                    const {stt} = req.body
                    // console.log(page,trangthai)
                    const newQuery = await pool.query(`
                        select * from don_hang,don_hang_ct
                        where don_hang.id_don = don_hang_ct.id_don
                        and don_hang.id_don = ${id_don}
                        and trangthai = N'${stt}'
                    `)

                    res.json({
                        status:1,
                        message:'Thành công!',
                        data: encode_decode.EncodeJson(newQuery.rows)
                    })

                }else{
                    res.json({
                        status:0,
                        message:'Hết phiên thao tác người dùng',
                        data:[]
                    })
                }
            });
        } catch (error) {
            res.json({
                status:0,
                message:'Hết phiên thao tác người dùng',
                data:[]
            })
        }
    })


    app.post("/TachDonHang/:id_don/" , async(req,res)=>{
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

                    const {id_don} = req.params
                    const {GioHangKHCT,ma_don} = req.body
                    const newData = []
                    const newDataSplit = []
                    GioHangKHCT.map(x=>x.status === true ? newDataSplit.push(x)  : newData.push(x))
                    // Dữ liệu mới
                
                    if(newDataSplit.length > 0){
                        var key_pr = randomstring.generate(5) + "_" + timeNow
                        const newQuery_INSERT_DH = await pool.query(`
                            insert into don_hang(key_pr,image,ma_don,ngay,id_kh,trangthai,so_khoi,so_can,phi_noi_dia,phi_dich_vu,phu_phi)
                            values(
                                N'${key_pr}',N'${newDataSplit[0].image}',N'${ma_don}','${timeNowDB}',(select id_kh from don_hang where id_don = ${id_don}),N'${"Đang xử lý"}',
                                0,0,0,0,0
                            )
                        `)
                        newDataSplit.map(async (x)=>{
                            const newQuery_INSERT_CT = await pool.query(`
                                update don_hang_ct set id_don = (select id_don from don_hang where key_pr = N'${key_pr}'),
                                qty=${x.qty},image=N'${x.image}',price=${x.price},
                                note =N'${x.note}'
                                where id_dhct = ${x.id_dhct}
                            `)
                        })
                        
                   
                        res.json({
                            status:1,
                            message:'Thành công!',
                            data: encode_decode.EncodeJson(newData)
                        })
                    }else{
                        res.json({
                            status:0,
                            message:'Hết phiên thao tác người dùng',
                            data:[]
                        })
                    }
                    
                    // console.log(page,trangthai)
                    // const newQuery = await pool.query(`
                    //     select * from don_hang,don_hang_ct
                    //     where don_hang.id_don = don_hang_ct.id_don
                    //     and don_hang.id_don = ${id_don}
                    //     and trangthai = N'${stt}'
                    // `)

               

                }else{
                    res.json({
                        status:0,
                        message:'Hết phiên thao tác người dùng',
                        data:[]
                    })
                }
            });
        } catch (error) {
            res.json({
                status:0,
                message:'Hết phiên thao tác người dùng',
                data:[]
            })
        }
    })



    app.post("/CapNhapDonHang/:id_don" , async(req,res)=>{
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

                    const {id_don} = req.params
                    const {GioHangKHCT,phi_noi_dia,phi_dich_vu,phu_phi,TienGioHang} = req.body
                    const ti_gia_tinh = await pool.query(`
                        select ti_gia_tinh from khachhang
                        where id_kh = (
                            select id_kh from don_hang where id_don = ${id_don}
                        )
                
                    `)
                    
                    console.log(phi_noi_dia)
                    let _phi_noi_dia = phi_noi_dia
                    const kiemtra_ = await pool.query(`
                        select trangthai from don_hang where id_don = ${id_don} LIMIT 1
                    `)
                    
                    let tgt = kiemtra_.rows[0].trangthai !== "Đang xử lý" ? 1 : parseInt(ti_gia_tinh.rows.map(x=>x.ti_gia_tinh))
             
                    if(GioHangKHCT.length > 0){
      
                        const UpdatePhi = await pool.query(`
                            update  don_hang set 
                            phu_phi= ${phu_phi === 0 || phu_phi === '' || phu_phi === null ? 0 : phu_phi},
                            phi_noi_dia = ${phi_noi_dia === 0 || phi_noi_dia === '' || phi_noi_dia === null ? 0 : parseInt(tgt*_phi_noi_dia).toString() },
                            phi_dich_vu=${phi_dich_vu === 0 || phi_dich_vu === '' || phi_dich_vu === null ? 0 : phi_dich_vu},
                            tong_tien=${TienGioHang === 0 || TienGioHang === '' || TienGioHang === null ? 0 : parseInt(tgt*TienGioHang).toString()} 
                            where id_don = ${id_don}
                        `)
                        GioHangKHCT.map(async(x)=>{
                            try {
                                const UpdateNewQuery = await pool.query(`
                                    update don_hang_ct set qty = ${x.qty},price=${x.price},web=N'${x.web}',note=N'${x.note}',title=N'${x.title}'
                                    where id_dhct = ${x.id_dhct}
                                `)
                            } catch (error) {
                                console.log(error)
                            }
                        })
                    res.json({
                        status:1,
                        message:'Thành công!',
                        data: ""
                    })
                        
                    }else{
                        res.json({
                            status:0,
                            message:'Hết phiên thao tác người dùng',
                            data:[]
                        })
                    }
                    
                    // console.log(page,trangthai)
                    // const newQuery = await pool.query(`
                    //     select * from don_hang,don_hang_ct
                    //     where don_hang.id_don = don_hang_ct.id_don
                    //     and don_hang.id_don = ${id_don}
                    //     and trangthai = N'${stt}'
                    // `)

           

                }else{
                    res.json({
                        status:0,
                        message:'Hết phiên thao tác người dùng',
                        data:[]
                    })
                }
            });
        } catch (error) {
            res.json({
                status:0,
                message:'Hết phiên thao tác người dùng',
                data:[]
            })
        }
    })

    app.post("/XacNhanTrangThai/:id_don",async (req,res)=>{
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

                    const {id_don} = req.params
                    const {stt} = req.body
                    const newQuery = await pool.query(`
                        update don_hang set trangthai = N'${stt}'
                        where id_don = ${id_don}
                    `)
                    
                    if(newQuery.rowCount > 0){
                        res.json({
                            status:1
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
            res.json({
                status:0,
                message:'Hết phiên thao tác người dùng',
                data:[]
            })
        }
    })





    app.post("/ThayDoiMaDonHang/:id_don" , async (req,res)=>{
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

                    const {id_don} = req.params
                    const {ma_don} = req.body
                    console.log(ma_don)
                    const newQuery = await pool.query(`
                        update don_hang set ma_don = N'${ma_don}'
                        where id_don = ${id_don}
                    `)
                    
                    if(newQuery.rowCount > 0){
                        res.json({
                            status:1
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
            res.json({
                status:0,
                message:'Hết phiên thao tác người dùng',
                data:[]
            })
        }
    })



    



    app.post("/GopGioHang" ,async (req,res)=>{
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

                    // const {id_don} = req.params
                    const {GopGioHang} = req.body
                    console.log(GopGioHang,"day la gop don");
                    var arrayID = ""
                    GopGioHang.map(async (x,index)=>{
                        if(x.status === true){
                            arrayID += `id_don = ${x.id} or `
                        }
                        if(index !== 0 && x.status === true){
                            const updateDonHangCT = await pool.query(` update don_hang_ct set id_don = ${GopGioHang[0].id} where id_don = ${x.id }`)
                            console.log(` update don_hang_ct set id_don = ${GopGioHang[0].id} where id_don = ${x.id }`)
                        }
                        if(index + 1 === GopGioHang.length){
                            var id_don = GopGioHang[0].id 
                            const newQuerry = await pool.query(`
                                select sum(tong_tien)"tong_tien",
                                sum(so_khoi)"so_khoi",
                                sum(so_can)"so_can",
                                sum(phi_noi_dia)"phi_noi_dia",
                                sum(phi_dich_vu)"phi_dich_vu",
                                sum(phu_phi)"phu_phi"
                                from don_hang where 
                                ${arrayID.substring(0,arrayID.length - 3)}
                            `)
                            const updateDonHang = await pool.query(`
                                update don_hang set 
                                tong_tien = ${newQuerry.rows[0].tong_tien === null ? 0 : newQuerry.rows[0].tong_tien},
                                so_khoi = ${newQuerry.rows[0].so_khoi === null ? 0 : newQuerry.rows[0].so_khoi},
                                so_can = ${newQuerry.rows[0].so_can === null ? 0 : newQuerry.rows[0].so_can},
                                phi_noi_dia = ${newQuerry.rows[0].phi_noi_dia === null ? 0 : newQuerry.rows[0].tong_tien},
                                phi_dich_vu = ${newQuerry.rows[0].phi_dich_vu === null ? 0 : newQuerry.rows[0].phi_dich_vu},
                                phu_phi = ${newQuerry.rows[0].phu_phi === null ? 0 : newQuerry.rows[0].phu_phi}
                                where id_don = ${id_don}
                            `)
                            
                            GopGioHang.map(async (z,index) =>{
                                if(index !== 0 && x.status === true){
                                    console.log(`delete from don_hang  where id_don = ${z.id}`)
                                    await pool.query(`delete from don_hang where  id_don = ${z.id}`)
                                }
                            })
                        }
    
                    },arrayID)
                    res.json({
                        status :1
                    })
                    
                    // const newQuery = await pool.query(`
                    //     update don_hang set ma_don = N'${ma_don}'
                    //     where id_don = ${id_don}
                    // `)
                    
                    // if(newQuery.rowCount > 0){
                    //     res.json({
                    //         status:1
                    //     })
                    // }else{
                    //     res.json({
                    //         status:0,
                    //         message:'Hết phiên thao tác người dùng',
                    //         data:[]
                    //     })
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
            res.json({
                status:0,
                message:'Hết phiên thao tác người dùng',
                data:[]
            })
        }
    })

    // app.post("/StatusGop" , async(req,res))


    // app.get('/Test01' , async (req,res)=>{
    //     try {
    //         const html = [{"tai_khoan_khach":"KH001.SA","mat_khau_khach":"Songanh1","doi_tuong_id":97,"tich_diem":0,
    //         "email":"mrprocute2018@gmail.com","id_tk_khach":37,
    //         "vi_tien":null,"tien_theo_khoi":3500000,
    //         "tien_theo_can":30000,"ti_gia_tinh":3750,
    //         "gio_hang":"[]","loai_doi_tuong_id":1,
    //         "ma_doi_tuong":"DT0024",
    //         "ten_doi_tuong":" Trần Song Anh","dia_chi":"32/51 đông khê","dien_thoai":"0866958678","ma_so_thue":"","no_mua_dau_ky":0,"no_ban_dau_ky":0,"no_mua":0,"no_ban":0,"kieu":null,"ghi_chu":"","ngay_tao":"2021-07-16T05:40:35.477Z","nguoi_tao":"","ngay_sua":"2021-07-16T05:40:35.477Z","nguoi_sua":"","cha":"","chan_doan":"","ngay_sinh":null,"ngay_bao_cong_no":0,"diem_dau_ky":0,"diem_thuong":0,"chiet_khau":0,"vip":0,"cmnd":null,"tien_khach_thanh_toan":null,"tien_no_mua":2250000,"tien_theo_can_khoi":0,"chi_phi_lien_quan":null},{"tai_khoan_khach":"KH004.THUONG","mat_khau_khach":"22062008","doi_tuong_id":92,"tich_diem":0,"email":"Baohanbaby.hp@gmail.com","id_tk_khach":32,"vi_tien":null,"tien_theo_khoi":3500000,"tien_theo_can":30000,"ti_gia_tinh":3750,"gio_hang":"[]","loai_doi_tuong_id":1,"ma_doi_tuong":"DT0019","ten_doi_tuong":" Nguyễn Thị Hoài Thương","dia_chi":"211 Nguyễn Đức Cảnh, Lê Chân, Hải Phòng","dien_thoai":"0904877809","ma_so_thue":"","no_mua_dau_ky":0,"no_ban_dau_ky":0,"no_mua":0,"no_ban":0,"kieu":null,"ghi_chu":"","ngay_tao":"2021-07-14T11:50:48.614Z","nguoi_tao":"","ngay_sua":"2021-07-14T11:50:48.614Z","nguoi_sua":"","cha":"","chan_doan":"","ngay_sinh":null,"ngay_bao_cong_no":0,"diem_dau_ky":0,"diem_thuong":0,"chiet_khau":0,"vip":0,"cmnd":null,"tien_khach_thanh_toan":null,"tien_no_mua":null,"tien_theo_can_khoi":null,"chi_phi_lien_quan":null},{"tai_khoan_khach":"Tom Meo","mat_khau_khach":"902086","doi_tuong_id":101,"tich_diem":0,"email":"Chienthuhp6789@gmail.com","id_tk_khach":40,"vi_tien":null,"tien_theo_khoi":3500000,"tien_theo_can":30000,"ti_gia_tinh":3750,"gio_hang":"[]","loai_doi_tuong_id":1,"ma_doi_tuong":"DT0026","ten_doi_tuong":" Ngô Thị Hoài Thu - Tom Meo","dia_chi":"Miếu Hai Xã","dien_thoai":"0936 902086","ma_so_thue":"","no_mua_dau_ky":0,"no_ban_dau_ky":0,"no_mua":0,"no_ban":0,"kieu":null,"ghi_chu":"","ngay_tao":"2021-07-17T02:40:36.651Z","nguoi_tao":"","ngay_sua":"2021-07-17T02:40:36.651Z","nguoi_sua":"","cha":"","chan_doan":"","ngay_sinh":null,"ngay_bao_cong_no":0,"diem_dau_ky":0,"diem_thuong":0,"chiet_khau":0,"vip":0,"cmnd":null,"tien_khach_thanh_toan":null,"tien_no_mua":918750,"tien_theo_can_khoi":18000,"chi_phi_lien_quan":48750},{"tai_khoan_khach":"0936888955","mat_khau_khach":"123456789","doi_tuong_id":104,"tich_diem":0,"email":"nguyenhongnhung2190@gmail.com","id_tk_khach":43,"vi_tien":null,"tien_theo_khoi":3500000,"tien_theo_can":30000,"ti_gia_tinh":3700,"gio_hang":"[]","loai_doi_tuong_id":1,"ma_doi_tuong":"DT0029","ten_doi_tuong":"DH005.NHUNG","dia_chi":"LE CHAN","dien_thoai":"0936888955","ma_so_thue":"","no_mua_dau_ky":0,"no_ban_dau_ky":0,"no_mua":0,"no_ban":0,"kieu":null,"ghi_chu":"","ngay_tao":"2021-07-19T04:21:59.699Z","nguoi_tao":"","ngay_sua":"2021-07-19T04:21:59.699Z","nguoi_sua":"","cha":"","chan_doan":"","ngay_sinh":null,"ngay_bao_cong_no":0,"diem_dau_ky":0,"diem_thuong":0,"chiet_khau":0,"vip":0,"cmnd":null,"tien_khach_thanh_toan":null,"tien_no_mua":null,"tien_theo_can_khoi":null,"chi_phi_lien_quan":null},{"tai_khoan_khach":"TaiKhoan","mat_khau_khach":"TaiKhoan","doi_tuong_id":89,"tich_diem":0,"email":"quachthanhtung1999@gmail.com","id_tk_khach":29,"vi_tien":null,"tien_theo_khoi":3500000,"tien_theo_can":30000,"ti_gia_tinh":3700,"gio_hang":"[{\"title\":\"1\",\"so_luong\":\"5\",\"TrangWeb\":\"3\",\"link_anh\":\"6\",\"ghi_chu\":\"4\",\"price\":\"2\",\"trang_thai\":false},{\"title\":\"1\",\"so_luong\":\"5\",\"TrangWeb\":\"3\",\"link_anh\":\"6\",\"ghi_chu\":\"4\",\"price\":\"2\",\"trang_thai\":false},{\"title\":\"12\",\"so_luong\":\"1\",\"TrangWeb\":\"2\",\"link_anh\":\"12\",\"ghi_chu\":\"3\",\"price\":\"2\",\"trang_thai\":false}]","loai_doi_tuong_id":1,"ma_doi_tuong":"DT0016","ten_doi_tuong":" Quach Thah Tung - TaiKhoan","dia_chi":"Bach dang hong bang Hai Phong","dien_thoai":"0366262072","ma_so_thue":"","no_mua_dau_ky":0,"no_ban_dau_ky":0,"no_mua":0,"no_ban":0,"kieu":null,"ghi_chu":"","ngay_tao":"2021-07-14T02:05:58.158Z","nguoi_tao":"","ngay_sua":"2021-07-14T02:05:58.158Z","nguoi_sua":"","cha":"","chan_doan":"","ngay_sinh":null,"ngay_bao_cong_no":0,"diem_dau_ky":0,"diem_thuong":0,"chiet_khau":0,"vip":0,"cmnd":null,"tien_khach_thanh_toan":1000,"tien_no_mua":112500,"tien_theo_can_khoi":8690000,"chi_phi_lien_quan":3},{"tai_khoan_khach":"Lethihue142","mat_khau_khach":"22072020","doi_tuong_id":106,"tich_diem":0,"email":"lethihue142@gmail.com","id_tk_khach":45,"vi_tien":null,"tien_theo_khoi":3500000,"tien_theo_can":30000,"ti_gia_tinh":3750,"gio_hang":"[]","loai_doi_tuong_id":1,"ma_doi_tuong":"DT0031","ten_doi_tuong":" Lê Thị Huế - Lethihue142","dia_chi":"242 chợ hàng cũ-dư hàng kênh-lê chân -hải phòng","dien_thoai":"0782186628","ma_so_thue":"","no_mua_dau_ky":0,"no_ban_dau_ky":0,"no_mua":0,"no_ban":0,"kieu":null,"ghi_chu":"","ngay_tao":"2021-07-25T13:42:48.263Z","nguoi_tao":"","ngay_sua":"2021-07-25T13:42:48.263Z","nguoi_sua":"","cha":"","chan_doan":"","ngay_sinh":null,"ngay_bao_cong_no":0,"diem_dau_ky":0,"diem_thuong":0,"chiet_khau":0,"vip":0,"cmnd":null,"tien_khach_thanh_toan":null,"tien_no_mua":null,"tien_theo_can_khoi":null,"chi_phi_lien_quan":null},{"tai_khoan_khach":"tuanloveanh1203@gmail.com","mat_khau_khach":"Tuan1203","doi_tuong_id":95,"tich_diem":0,"email":"tuanloveanh1203@gmail.com","id_tk_khach":35,"vi_tien":null,"tien_theo_khoi":3500000,"tien_theo_can":30000,"ti_gia_tinh":3750,"gio_hang":"[]","loai_doi_tuong_id":1,"ma_doi_tuong":"DT0022","ten_doi_tuong":" Bùi Quang Tuấn - tuanloveanh1203@gmail.com","dia_chi":"80 đường 7 khu dân cư An Trang, An Đồng","dien_thoai":"0775349499","ma_so_thue":"","no_mua_dau_ky":0,"no_ban_dau_ky":0,"no_mua":0,"no_ban":0,"kieu":null,"ghi_chu":"","ngay_tao":"2021-07-15T02:24:30.589Z","nguoi_tao":"","ngay_sua":"2021-07-15T02:24:30.589Z","nguoi_sua":"","cha":"","chan_doan":"","ngay_sinh":null,"ngay_bao_cong_no":0,"diem_dau_ky":0,"diem_thuong":0,"chiet_khau":0,"vip":0,"cmnd":null,"tien_khach_thanh_toan":null,"tien_no_mua":0,"tien_theo_can_khoi":0,"chi_phi_lien_quan":null},{"tai_khoan_khach":"0945374777","mat_khau_khach":"Nhemanh@030192","doi_tuong_id":105,"tich_diem":0,"email":"trantuyetnhihp2020@gmail.com","id_tk_khach":44,"vi_tien":null,"tien_theo_khoi":3500000,"tien_theo_can":30000,"ti_gia_tinh":3750,"gio_hang":"[]","loai_doi_tuong_id":1,"ma_doi_tuong":"DT0030","ten_doi_tuong":"DH006.TRANANH","dia_chi":"06/89 tôn đức thắng . Trần nguyên hãn . Lê chân . Hải phòng","dien_thoai":"0945374777","ma_so_thue":"","no_mua_dau_ky":0,"no_ban_dau_ky":0,"no_mua":0,"no_ban":0,"kieu":null,"ghi_chu":"","ngay_tao":"2021-07-20T05:14:25.212Z","nguoi_tao":"","ngay_sua":"2021-07-20T05:14:25.212Z","nguoi_sua":"","cha":"","chan_doan":"","ngay_sinh":null,"ngay_bao_cong_no":0,"diem_dau_ky":0,"diem_thuong":0,"chiet_khau":0,"vip":0,"cmnd":null,"tien_khach_thanh_toan":null,"tien_no_mua":0,"tien_theo_can_khoi":0,"chi_phi_lien_quan":null},{"tai_khoan_khach":"KH001.HUE","mat_khau_khach":"22072020","doi_tuong_id":93,"tich_diem":0,"email":"Lethihue142@gmail.com","id_tk_khach":33,"vi_tien":null,"tien_theo_khoi":3500000,"tien_theo_can":30000,"ti_gia_tinh":3750,"gio_hang":"[]","loai_doi_tuong_id":1,"ma_doi_tuong":"DT0020","ten_doi_tuong":" Lê Thị Huế","dia_chi":"242 chợ hàng cũ - lê chân-hp","dien_thoai":"0782186628","ma_so_thue":"","no_mua_dau_ky":0,"no_ban_dau_ky":0,"no_mua":0,"no_ban":0,"kieu":null,"ghi_chu":"","ngay_tao":"2021-07-14T12:31:00.800Z","nguoi_tao":"","ngay_sua":"2021-07-14T12:31:00.800Z","nguoi_sua":"","cha":"","chan_doan":"","ngay_sinh":null,"ngay_bao_cong_no":0,"diem_dau_ky":0,"diem_thuong":0,"chiet_khau":0,"vip":0,"cmnd":null,"tien_khach_thanh_toan":null,"tien_no_mua":85500,"tien_theo_can_khoi":0,"chi_phi_lien_quan":0},{"tai_khoan_khach":"pmdhoee","mat_khau_khach":"123456","doi_tuong_id":102,"tich_diem":0,"email":"phanmemdathangoee@gmail.com","id_tk_khach":41,"vi_tien":null,"tien_theo_khoi":3500000,"tien_theo_can":30000,"ti_gia_tinh":3750,"gio_hang":"[{\"title\":\"夏天迷你小包包2021新款潮高级感斜挎洋气女包百搭链条手提小方包\",\"so_luong\":1,\"TrangWeb\":\"https://item.taobao.com/item.htm?spm=a2141.241046-global.feeds.d_2_0.41ca6f11LEAVLV&country=GLOBAL&pvid=4168beee-8662-4ce9-8456-035c2ae71016&id=623026814156&scm=1007.35313.223891.0&utLogMap=%7B%22card_subtype%22%3A%22auction%22%2C%22up_pvid%22%3A%22a4246a9a-3a3a-4acc-a509-f5b1447904d7%22%2C%22x_object_type%22%3A%22item%22%2C%22matrix_score%22%3A0.0%2C%22x_extend%22%3A%22matchtype%3Arhot%23adCtr%3A0.0%23e1%3A0.0%23e0%3A0.0%23e3%3A0.0%23e2%3A0.0%23a1%3A0.0%23e5%3A0.0%23a0%3A0.0%23e4%3A0.0%23a3%3A0.0%23a2%3A0.0%23a5%3A0.0%23a4%3A0.0%23b0%3A0.0%23b1%3A0.0%23a7%3A0.0%23a6%3A0.0%23a9%3A0.0%23a8%3A0.0%23c6%3Arhot-be%23c7%3Arhot%5Cu001Dbe%23f7%3Arhot%23f8%3Arhot%23itm_assets_dis_p%3A9.9%23isNovel0%23oriMatchType%3Arhot%23sts%3A0%23NewauctionLevel%3A%23deepRecallRankScore%3A0.0203%23matchTypeList%3Arhot%23mind_similar_score%3A0.0%23triggerKeys%3Arhot_trigger_list*80000001060%24%23lts%3A12%23final__score__%3A0.0203%23NewauctionSource%3A%23BoostStage%3A%23rtcis%3A0.95%23gcvr%3A0.0%23lsrs%3A0.0%23triggerQ%3A0.0%23ltrscore%3A0.0%23ecpm%3A0.0%23exp_type%3Aexp1%23benefit%3A%23mega_id%3A31%23virtual_cate%3A33%23cat%3A50012010%23wp%3AF%23sl%3AT%22%2C%22x_monitor_info%22%3A%22rhot-be%23%2380000001060%230.036288%230.029858%239.9%230.296091%230%23be%230%23%231.000000%231.000000%23802747447%22%2C%22miniapp_score%22%3A0.0%2C%22hybrid_score%22%3A0.015646803648294447%2C%22sessionid%22%3A%224168beee-8662-4ce9-8456-035c2ae71016%22%2C%22card_type%22%3A%22auction%22%2C%22tpp_buckets%22%3A%22%22%2C%22x_ts%22%3A1626708975133%2C%22miniapphc_score%22%3A0.0%2C%22pvid%22%3A%224168beee-8662-4ce9-8456-035c2ae71016%22%2C%22x_item_ids%22%3A623026814156%2C%22auction_score%22%3A0.29609072158903843%2C%22x_sytab%22%3A-1%2C%22x_object_id%22%3A623026814156%7D\",\"link_anh\":\"https%3A%2F%2Fgd3.alicdn.com%2Fimgextra%2Fi1%2F802747447%2FO1CN01igvqjD24sm6sD6DHc_!!802747447.jpg_150x150.jpg\",\"ghi_chu\":\"蓝色;\",\"price\":39,\"trang_thai\":false},{\"title\":\"2021新款儿童太阳镜时尚猫耳朵墨镜小孩装饰眼镜可爱宝宝太阳眼镜\",\"so_luong\":1,\"TrangWeb\":\"https://detail.1688.com/offer/638373020450.html?spm=a260j.18362.1996471337.3.45e97fa29mkrmw\",\"link_anh\":\"https://cbu01.alicdn.com/img/ibank/O1CN01373WAy1IGfehC2O62_!!2731710866-0-cib.jpg\",\"ghi_chu\":\"亮黑框全灰;亮黑框全灰\",\"price\":\"3.80\",\"trang_thai\":false},{\"title\":\"2021新款儿童太阳镜时尚猫耳朵墨镜小孩装饰眼镜可爱宝宝太阳眼镜\",\"so_luong\":1,\"TrangWeb\":\"https://detail.1688.com/offer/638373020450.html?spm=a260j.18362.1996471337.3.45e97fa29mkrmw\",\"link_anh\":\"https://cbu01.alicdn.com/img/ibank/O1CN01RMXf9A1IGfebrgKTX_!!2731710866-0-cib.jpg\",\"ghi_chu\":\"透明蓝框蓝水银;透明蓝框蓝水银\",\"price\":\"3.80\",\"trang_thai\":false},{\"title\":\"智能手环手表运动男女学生防水电子5代适用小米4苹果oppo华为手机\",\"so_luong\":1,\"TrangWeb\":\"https://item.taobao.com/item.htm?spm=a2141.241046-global.feeds.d_8_0.41ca6f11LEAVLV&country=GLOBAL&pvid=4168beee-8662-4ce9-8456-035c2ae71016&id=641533045575&scm=1007.35313.223891.0&utLogMap=%7B%22card_subtype%22%3A%22auction%22%2C%22up_pvid%22%3A%22a4246a9a-3a3a-4acc-a509-f5b1447904d7%22%2C%22x_object_type%22%3A%22item%22%2C%22matrix_score%22%3A0.0%2C%22x_extend%22%3A%22matchtype%3Arhot%23adCtr%3A0.0%23e1%3A0.0%23e0%3A0.0%23e3%3A0.0%23e2%3A0.0%23a1%3A0.0%23e5%3A0.0%23a0%3A0.0%23e4%3A0.0%23a3%3A0.0%23a2%3A0.0%23a5%3A0.0%23a4%3A0.0%23b0%3A0.0%23b1%3A0.0%23a7%3A0.0%23a6%3A0.0%23a9%3A0.0%23a8%3A0.0%23c6%3Arhot-be%23c7%3Arhot%5Cu001Dbe%23f7%3Arhot%23f8%3Arhot%23itm_assets_dis_p%3A9.9%23isNovel0%23oriMatchType%3Arhot%23sts%3A0%23NewauctionLevel%3A%23deepRecallRankScore%3A0.0192%23matchTypeList%3Arhot%23mind_similar_score%3A0.0%23triggerKeys%3Arhot_trigger_list*80000001060%24%23lts%3A12%23final__score__%3A0.0192%23NewauctionSource%3A%23BoostStage%3A%23rtcis%3A0.95%23gcvr%3A0.0%23lsrs%3A0.0%23triggerQ%3A0.0%23ltrscore%3A0.0%23ecpm%3A0.0%23exp_type%3Aexp1%23benefit%3A%23mega_id%3A40%23virtual_cate%3A894%23cat%3A201159808%23wp%3AF%23sl%3AT%22%2C%22x_monitor_info%22%3A%22rhot-be%23%2380000001060%230.027066%230.009120%239.9%230.164972%230%23be%230%23%231.000000%231.000000%233411382222%22%2C%22miniapp_score%22%3A0.0%2C%22hybrid_score%22%3A0.012815843680709838%2C%22sessionid%22%3A%224168beee-8662-4ce9-8456-035c2ae71016%22%2C%22card_type%22%3A%22auction%22%2C%22tpp_buckets%22%3A%22%22%2C%22x_ts%22%3A1626708975133%2C%22miniapphc_score%22%3A0.0%2C%22pvid%22%3A%224168beee-8662-4ce9-8456-035c2ae71016%22%2C%22x_item_ids%22%3A641533045575%2C%22auction_score%22%3A0.16497163474559784%2C%22x_sytab%22%3A-1%2C%22x_object_id%22%3A641533045575%7D\",\"link_anh\":\"https%3A%2F%2Fgd1.alicdn.com%2Fimgextra%2Fi3%2F3411382222%2FO1CN01V37wU01SHijEB2uYQ_!!3411382222.jpg_150x150.jpg\",\"ghi_chu\":\"尊贵蓝【豪华版】电池增强;官方标配;\",\"price\":66,\"trang_thai\":false},{\"title\":\"智能手环手表运动男女学生防水电子5代适用小米4苹果oppo华为手机\",\"so_luong\":1,\"TrangWeb\":\"https://item.taobao.com/item.htm?spm=a2141.241046-global.feeds.d_8_0.41ca6f11LEAVLV&country=GLOBAL&pvid=4168beee-8662-4ce9-8456-035c2ae71016&id=641533045575&scm=1007.35313.223891.0&utLogMap=%7B%22card_subtype%22%3A%22auction%22%2C%22up_pvid%22%3A%22a4246a9a-3a3a-4acc-a509-f5b1447904d7%22%2C%22x_object_type%22%3A%22item%22%2C%22matrix_score%22%3A0.0%2C%22x_extend%22%3A%22matchtype%3Arhot%23adCtr%3A0.0%23e1%3A0.0%23e0%3A0.0%23e3%3A0.0%23e2%3A0.0%23a1%3A0.0%23e5%3A0.0%23a0%3A0.0%23e4%3A0.0%23a3%3A0.0%23a2%3A0.0%23a5%3A0.0%23a4%3A0.0%23b0%3A0.0%23b1%3A0.0%23a7%3A0.0%23a6%3A0.0%23a9%3A0.0%23a8%3A0.0%23c6%3Arhot-be%23c7%3Arhot%5Cu001Dbe%23f7%3Arhot%23f8%3Arhot%23itm_assets_dis_p%3A9.9%23isNovel0%23oriMatchType%3Arhot%23sts%3A0%23NewauctionLevel%3A%23deepRecallRankScore%3A0.0192%23matchTypeList%3Arhot%23mind_similar_score%3A0.0%23triggerKeys%3Arhot_trigger_list*80000001060%24%23lts%3A12%23final__score__%3A0.0192%23NewauctionSource%3A%23BoostStage%3A%23rtcis%3A0.95%23gcvr%3A0.0%23lsrs%3A0.0%23triggerQ%3A0.0%23ltrscore%3A0.0%23ecpm%3A0.0%23exp_type%3Aexp1%23benefit%3A%23mega_id%3A40%23virtual_cate%3A894%23cat%3A201159808%23wp%3AF%23sl%3AT%22%2C%22x_monitor_info%22%3A%22rhot-be%23%2380000001060%230.027066%230.009120%239.9%230.164972%230%23be%230%23%231.000000%231.000000%233411382222%22%2C%22miniapp_score%22%3A0.0%2C%22hybrid_score%22%3A0.012815843680709838%2C%22sessionid%22%3A%224168beee-8662-4ce9-8456-035c2ae71016%22%2C%22card_type%22%3A%22auction%22%2C%22tpp_buckets%22%3A%22%22%2C%22x_ts%22%3A1626708975133%2C%22miniapphc_score%22%3A0.0%2C%22pvid%22%3A%224168beee-8662-4ce9-8456-035c2ae71016%22%2C%22x_item_ids%22%3A641533045575%2C%22auction_score%22%3A0.16497163474559784%2C%22x_sytab%22%3A-1%2C%22x_object_id%22%3A641533045575%7D\",\"link_anh\":\"https%3A%2F%2Fgd1.alicdn.com%2Fimgextra%2Fi3%2F3411382222%2FO1CN01V37wU01SHijEB2uYQ_!!3411382222.jpg_150x150.jpg\",\"ghi_chu\":\"尊贵蓝【豪华版】电池增强;官方标配;\",\"price\":66,\"trang_thai\":false},{\"title\":\"智能手环手表运动男女学生防水电子5代适用小米4苹果oppo华为手机\",\"so_luong\":1,\"TrangWeb\":\"https://item.taobao.com/item.htm?spm=a2141.241046-global.feeds.d_8_0.41ca6f11LEAVLV&country=GLOBAL&pvid=4168beee-8662-4ce9-8456-035c2ae71016&id=641533045575&scm=1007.35313.223891.0&utLogMap=%7B%22card_subtype%22%3A%22auction%22%2C%22up_pvid%22%3A%22a4246a9a-3a3a-4acc-a509-f5b1447904d7%22%2C%22x_object_type%22%3A%22item%22%2C%22matrix_score%22%3A0.0%2C%22x_extend%22%3A%22matchtype%3Arhot%23adCtr%3A0.0%23e1%3A0.0%23e0%3A0.0%23e3%3A0.0%23e2%3A0.0%23a1%3A0.0%23e5%3A0.0%23a0%3A0.0%23e4%3A0.0%23a3%3A0.0%23a2%3A0.0%23a5%3A0.0%23a4%3A0.0%23b0%3A0.0%23b1%3A0.0%23a7%3A0.0%23a6%3A0.0%23a9%3A0.0%23a8%3A0.0%23c6%3Arhot-be%23c7%3Arhot%5Cu001Dbe%23f7%3Arhot%23f8%3Arhot%23itm_assets_dis_p%3A9.9%23isNovel0%23oriMatchType%3Arhot%23sts%3A0%23NewauctionLevel%3A%23deepRecallRankScore%3A0.0192%23matchTypeList%3Arhot%23mind_similar_score%3A0.0%23triggerKeys%3Arhot_trigger_list*80000001060%24%23lts%3A12%23final__score__%3A0.0192%23NewauctionSource%3A%23BoostStage%3A%23rtcis%3A0.95%23gcvr%3A0.0%23lsrs%3A0.0%23triggerQ%3A0.0%23ltrscore%3A0.0%23ecpm%3A0.0%23exp_type%3Aexp1%23benefit%3A%23mega_id%3A40%23virtual_cate%3A894%23cat%3A201159808%23wp%3AF%23sl%3AT%22%2C%22x_monitor_info%22%3A%22rhot-be%23%2380000001060%230.027066%230.009120%239.9%230.164972%230%23be%230%23%231.000000%231.000000%233411382222%22%2C%22miniapp_score%22%3A0.0%2C%22hybrid_score%22%3A0.012815843680709838%2C%22sessionid%22%3A%224168beee-8662-4ce9-8456-035c2ae71016%22%2C%22card_type%22%3A%22auction%22%2C%22tpp_buckets%22%3A%22%22%2C%22x_ts%22%3A1626708975133%2C%22miniapphc_score%22%3A0.0%2C%22pvid%22%3A%224168beee-8662-4ce9-8456-035c2ae71016%22%2C%22x_item_ids%22%3A641533045575%2C%22auction_score%22%3A0.16497163474559784%2C%22x_sytab%22%3A-1%2C%22x_object_id%22%3A641533045575%7D\",\"link_anh\":\"https%3A%2F%2Fgd1.alicdn.com%2Fimgextra%2Fi3%2F3411382222%2FO1CN01V37wU01SHijEB2uYQ_!!3411382222.jpg_150x150.jpg\",\"ghi_chu\":\"尊贵蓝【豪华版】电池增强;官方标配;\",\"price\":66,\"trang_thai\":false},{\"title\":\"夏天迷你小包包2021新款潮高级感斜挎洋气女包百搭链条手提小方包\",\"so_luong\":1,\"TrangWeb\":\"https://item.taobao.com/item.htm?spm=a2141.241046-global.feeds.d_2_0.41ca6f11LEAVLV&country=GLOBAL&pvid=4168beee-8662-4ce9-8456-035c2ae71016&id=623026814156&scm=1007.35313.223891.0&utLogMap=%7B%22card_subtype%22%3A%22auction%22%2C%22up_pvid%22%3A%22a4246a9a-3a3a-4acc-a509-f5b1447904d7%22%2C%22x_object_type%22%3A%22item%22%2C%22matrix_score%22%3A0.0%2C%22x_extend%22%3A%22matchtype%3Arhot%23adCtr%3A0.0%23e1%3A0.0%23e0%3A0.0%23e3%3A0.0%23e2%3A0.0%23a1%3A0.0%23e5%3A0.0%23a0%3A0.0%23e4%3A0.0%23a3%3A0.0%23a2%3A0.0%23a5%3A0.0%23a4%3A0.0%23b0%3A0.0%23b1%3A0.0%23a7%3A0.0%23a6%3A0.0%23a9%3A0.0%23a8%3A0.0%23c6%3Arhot-be%23c7%3Arhot%5Cu001Dbe%23f7%3Arhot%23f8%3Arhot%23itm_assets_dis_p%3A9.9%23isNovel0%23oriMatchType%3Arhot%23sts%3A0%23NewauctionLevel%3A%23deepRecallRankScore%3A0.0203%23matchTypeList%3Arhot%23mind_similar_score%3A0.0%23triggerKeys%3Arhot_trigger_list*80000001060%24%23lts%3A12%23final__score__%3A0.0203%23NewauctionSource%3A%23BoostStage%3A%23rtcis%3A0.95%23gcvr%3A0.0%23lsrs%3A0.0%23triggerQ%3A0.0%23ltrscore%3A0.0%23ecpm%3A0.0%23exp_type%3Aexp1%23benefit%3A%23mega_id%3A31%23virtual_cate%3A33%23cat%3A50012010%23wp%3AF%23sl%3AT%22%2C%22x_monitor_info%22%3A%22rhot-be%23%2380000001060%230.036288%230.029858%239.9%230.296091%230%23be%230%23%231.000000%231.000000%23802747447%22%2C%22miniapp_score%22%3A0.0%2C%22hybrid_score%22%3A0.015646803648294447%2C%22sessionid%22%3A%224168beee-8662-4ce9-8456-035c2ae71016%22%2C%22card_type%22%3A%22auction%22%2C%22tpp_buckets%22%3A%22%22%2C%22x_ts%22%3A1626708975133%2C%22miniapphc_score%22%3A0.0%2C%22pvid%22%3A%224168beee-8662-4ce9-8456-035c2ae71016%22%2C%22x_item_ids%22%3A623026814156%2C%22auction_score%22%3A0.29609072158903843%2C%22x_sytab%22%3A-1%2C%22x_object_id%22%3A623026814156%7D\",\"link_anh\":\"https%3A%2F%2Fgd4.alicdn.com%2Fimgextra%2Fi4%2F802747447%2FO1CN01Towilt24sm6zwSHVN_!!802747447.jpg_150x150.jpg\",\"ghi_chu\":\"桔色;\",\"price\":39,\"trang_thai\":false},{\"title\":\"适用宝马E46汽车进气管燃油连接器进气管，油门连接处空气管\",\"so_luong\":1,\"TrangWeb\":\"https://detail.tmall.com/item.htm?id=607720188353&ut_sk=1.XaO0PG%20OXDUDAB/TI9xdOmIi_21380790_1606138712273.Copy.1&sourceType=item&price=100&origin_price=%E7%BA%A6%20USD%2015.28&suid=33C3E89B-7568-45C1-8925-57FC18BCA730&shareUniqueId=5645238111&un=d85988ca6863ba9d862a58ce32fa627c&share_crt_v=1&spm=a2159r.13376460.0.0&sp_tk=amthUmNOaW9XbEs=&cpp=1&shareurl=true&short_name=h.4e0JBEv&bxsign=scdaavqeRM6yaM1afQ0BfNFeoIbmiH2buqUnbNnuroMsuuBlgjcHYMUX0GHXqZDU8i_C6spwAv6dU10RJcSbtStk9ibvPrmyyQWhFE0_TjVLo8&sm=364942&app=chrome&skuId=4441250419564\",\"link_anh\":\"%2F%2Fimg.alicdn.com%2Fimgextra%2Fi2%2F4278931923%2FO1CN01kCTiRu1Q4mCkI9NM0_!!4278931923.jpg_150x150q90.jpg\",\"ghi_chu\":\":燃油连接器进气管+油门连接处空气管;\",\"price\":100,\"trang_thai\":false},{\"title\":\"宝宝帽子春秋男童女童薄款字母可爱超萌儿童防晒帽渔夫遮阳盆帽\",\"so_luong\":1,\"TrangWeb\":\"https://detail.1688.com/offer/614983216650.html?spm=a260k.dacugeneral.home2019rec.99.6633436cdAb8m1&resourceId=850343&udsPoolId=1026341&scm=1007.21237.114566.0&pvid=f513cff2-7097-4e85-8232-4de22c63249a&tpp_trace=212c649e16267357786736395e3e1a\",\"link_anh\":\"https://cbu01.alicdn.com/img/ibank/2020/586/215/14307512685_889888043.400x400.jpg\",\"ghi_chu\":\"黑色;52cm\",\"price\":\"10.50\",\"trang_thai\":false},{\"title\":\"宝宝帽子春秋男童女童薄款字母可爱超萌儿童防晒帽渔夫遮阳盆帽\",\"so_luong\":1,\"TrangWeb\":\"https://detail.1688.com/offer/614983216650.html?spm=a260k.dacugeneral.home2019rec.99.6633436cdAb8m1&resourceId=850343&udsPoolId=1026341&scm=1007.21237.114566.0&pvid=f513cff2-7097-4e85-8232-4de22c63249a&tpp_trace=212c649e16267357786736395e3e1a\",\"link_anh\":\"https://cbu01.alicdn.com/img/ibank/2020/843/725/14307527348_889888043.400x400.jpg\",\"ghi_chu\":\"黄色;52cm\",\"price\":\"10.50\",\"trang_thai\":false},{\"title\":\"宝宝帽子春秋男童女童薄款字母可爱超萌儿童防晒帽渔夫遮阳盆帽\",\"so_luong\":2,\"TrangWeb\":\"https://detail.1688.com/offer/614983216650.html?spm=a260k.dacugeneral.home2019rec.99.6633436cdAb8m1&resourceId=850343&udsPoolId=1026341&scm=1007.21237.114566.0&pvid=f513cff2-7097-4e85-8232-4de22c63249a&tpp_trace=212c649e16267357786736395e3e1a\",\"link_anh\":\"https://cbu01.alicdn.com/img/ibank/2020/355/815/14307518553_889888043.400x400.jpg\",\"ghi_chu\":\"绿色;52cm\",\"price\":\"10.50\",\"trang_thai\":false},{\"title\":\"宝宝帽子春秋男童女童薄款字母可爱超萌儿童防晒帽渔夫遮阳盆帽\",\"so_luong\":2,\"TrangWeb\":\"https://detail.1688.com/offer/614983216650.html?spm=a260k.dacugeneral.home2019rec.99.6633436cdAb8m1&resourceId=850343&udsPoolId=1026341&scm=1007.21237.114566.0&pvid=f513cff2-7097-4e85-8232-4de22c63249a&tpp_trace=212c649e16267357786736395e3e1a\",\"link_anh\":\"https://cbu01.alicdn.com/img/ibank/2020/425/051/14257150524_889888043.400x400.jpg\",\"ghi_chu\":\"橙色;52cm\",\"price\":\"10.50\",\"trang_thai\":false},{\"title\":\"日系古着满印 韩版短袖美式复古T恤男女宽松半袖情侣炸街体恤上衣\",\"so_luong\":17,\"TrangWeb\":\"https://detail.tmall.com/item.htm?id=643573245789&spm=a2141.241046-global.feeds.d_14_0.41ca6f11spK79L&country=GLOBAL&pvid=89e4cf02-6359-46ed-a68d-424076248a51&scm=1007.35313.223891.0&utLogMap=%7B%22card_subtype%22:%22auction%22,%22up_pvid%22:%226f44eabd-9d30-4761-94cf-dc2dd478a63f%22,%22x_object_type%22:%22item%22,%22matrix_score%22:0.0,%22x_extend%22:%22matchtype:rhot#adCtr:0.0#e1:0.0#e0:0.0#e3:0.0#e2:0.0#a1:0.0#e5:0.0#a0:0.0#e4:0.0#a3:0.0#a2:0.0#a5:0.0#a4:0.0#b0:0.0#b1:0.0#a7:0.0#a6:0.0#a9:0.0#a8:0.0#c6:rhot-be#c7:rhot%5Cu001Dbe#f7:rhot#f8:rhot#itm_assets_dis_p:9.9#isNovel0#oriMatchType:rhot#sts:0#NewauctionLevel:#deepRecallRankScore:0.0264#matchTypeList:rhot#mind_similar_score:0.0#triggerKeys:rhot_trigger_list*80000001060$#lts:12#final__score__:0.0264#NewauctionSource:#BoostStage:#rtcis:0.95#gcvr:0.0#lsrs:0.0#triggerQ:0.0#ltrscore:0.0#ecpm:0.0#exp_type:exp1#benefit:#mega_id:24#virtual_cate:396#cat:50000436#wp:F#sl:T%22,%22x_monitor_info%22:%22rhot-be##80000001060#0.034947#0.047686#9.9#0.224936#0#be#0##1.000000#1.000000#2211184789760%22,%22miniapp_score%22:0.0,%22hybrid_score%22:0.014456191712615012,%22sessionid%22:%22e60e0f87-1462-402a-88d2-279cdc5cdc66%22,%22card_type%22:%22auction%22,%22tpp_buckets%22:%22%22,%22x_ts%22:1626735745224,%22miniapphc_score%22:0.0,%22pvid%22:%2289e4cf02-6359-46ed-a68d-424076248a51%22,%22x_item_ids%22:643573245789,%22auction_score%22:0.22493606805801392,%22x_sytab%22:-1,%22x_object_id%22:643573245789%7D&skuId=4804533058844\",\"link_anh\":\"//img.alicdn.com/imgextra/i4/2211184789760/O1CN01IJAF0B2Ly8HMnHgWh_!!2211184789760.jpg_150x150q90.jpg\",\"ghi_chu\":\"XL;绿色;\",\"price\":99,\"trang_thai\":false},{\"title\":\"日系古着满印 韩版短袖美式复古T恤男女宽松半袖情侣炸街体恤上衣\",\"so_luong\":18,\"TrangWeb\":\"https://detail.tmall.com/item.htm?id=643573245789&spm=a2141.241046-global.feeds.d_14_0.41ca6f11spK79L&country=GLOBAL&pvid=89e4cf02-6359-46ed-a68d-424076248a51&scm=1007.35313.223891.0&utLogMap=%7B%22card_subtype%22:%22auction%22,%22up_pvid%22:%226f44eabd-9d30-4761-94cf-dc2dd478a63f%22,%22x_object_type%22:%22item%22,%22matrix_score%22:0.0,%22x_extend%22:%22matchtype:rhot&skuId=4804533058847\",\"link_anh\":\"//img.alicdn.com/imgextra/i2/2211184789760/O1CN01DTDhXm2Ly8HH9g6zH_!!2211184789760.jpg_150x150q90.jpg\",\"ghi_chu\":\"XXL;黑色;\",\"price\":9.9,\"trang_thai\":false},{\"title\":\"清仓男女运动跑步手机臂包清库存苹果 健身臂带华为手臂套\",\"so_luong\":1,\"TrangWeb\":\"https://detail.1688.com/offer/627328241505.html?spm=a260j.18362.1996471337.4.45e97fa2z15bg5\",\"link_anh\":\"https://cbu01.alicdn.com/img/ibank/2020/700/051/21203150007_1725940383.jpg\",\"ghi_chu\":\"绿色;绿色\",\"price\":\"3.99\",\"trang_thai\":false},{\"title\":\"清仓男女运动跑步手机臂包清库存苹果 健身臂带华为手臂套\",\"so_luong\":1,\"TrangWeb\":\"https://detail.1688.com/offer/627328241505.html?spm=a260j.18362.1996471337.4.45e97fa2z15bg5\",\"link_anh\":\"https://cbu01.alicdn.com/img/ibank/2020/320/470/21043074023_1725940383.jpg\",\"ghi_chu\":\"蓝色;蓝色\",\"price\":\"3.99\",\"trang_thai\":false},{\"title\":\"清仓男女运动跑步手机臂包清库存苹果 健身臂带华为手臂套\",\"so_luong\":1,\"TrangWeb\":\"https://detail.1688.com/offer/627328241505.html?spm=a260j.18362.1996471337.4.45e97fa2z15bg5\",\"link_anh\":\"https://cbu01.alicdn.com/img/ibank/2020/700/051/21203150007_1725940383.jpg\",\"ghi_chu\":\"绿色;绿色\",\"price\":\"3.99\",\"trang_thai\":false},{\"title\":\"清仓男女运动跑步手机臂包清库存苹果 健身臂带华为手臂套\",\"so_luong\":1,\"TrangWeb\":\"https://detail.1688.com/offer/627328241505.html?spm=a260j.18362.1996471337.4.45e97fa2z15bg5\",\"link_anh\":\"https://cbu01.alicdn.com/img/ibank/2020/320/470/21043074023_1725940383.jpg\",\"ghi_chu\":\"蓝色;蓝色\",\"price\":\"3.99\",\"trang_thai\":false}]","loai_doi_tuong_id":1,"ma_doi_tuong":"DT0027","ten_doi_tuong":" Mai Le - pmdhoee","dia_chi":"Ha Noi","dien_thoai":"0984959341","ma_so_thue":"","no_mua_dau_ky":0,"no_ban_dau_ky":0,"no_mua":0,"no_ban":0,"kieu":null,"ghi_chu":"","ngay_tao":"2021-07-17T02:45:05.581Z","nguoi_tao":"","ngay_sua":"2021-07-17T02:45:05.581Z","nguoi_sua":"","cha":"","chan_doan":"","ngay_sinh":null,"ngay_bao_cong_no":0,"diem_dau_ky":0,"diem_thuong":0,"chiet_khau":0,"vip":0,"cmnd":null,"tien_khach_thanh_toan":null,"tien_no_mua":null,"tien_theo_can_khoi":null,"chi_phi_lien_quan":null},{"tai_khoan_khach":"thaobold","mat_khau_khach":"tha0bOld","doi_tuong_id":107,"tich_diem":0,"email":"thaobold@gmail.com","id_tk_khach":46,"vi_tien":null,"tien_theo_khoi":3500000,"tien_theo_can":30000,"ti_gia_tinh":3750,"gio_hang":"[]","loai_doi_tuong_id":1,"ma_doi_tuong":"DT0032","ten_doi_tuong":" Thảo Bold - thaobold","dia_chi":"","dien_thoai":"0936822292","ma_so_thue":"","no_mua_dau_ky":0,"no_ban_dau_ky":0,"no_mua":0,"no_ban":0,"kieu":null,"ghi_chu":"","ngay_tao":"2021-07-30T16:01:35.351Z","nguoi_tao":"","ngay_sua":"2021-07-30T16:01:35.351Z","nguoi_sua":"","cha":"","chan_doan":"","ngay_sinh":null,"ngay_bao_cong_no":0,"diem_dau_ky":0,"diem_thuong":0,"chiet_khau":0,"vip":0,"cmnd":null,"tien_khach_thanh_toan":null,"tien_no_mua":null,"tien_theo_can_khoi":null,"chi_phi_lien_quan":null},{"tai_khoan_khach":"KH003.YENDN","mat_khau_khach":"Yen11111/","doi_tuong_id":103,"tich_diem":0,"email":"Yennguyen100602@gmail.com","id_tk_khach":42,"vi_tien":null,"tien_theo_khoi":3500000,"tien_theo_can":30000,"ti_gia_tinh":3750,"gio_hang":"[]","loai_doi_tuong_id":1,"ma_doi_tuong":"DT0028","ten_doi_tuong":" Nguyễn Thị Hồng Yến","dia_chi":"1910/41,tổ 9,ấp 1c-xã Phước Thái-Long thành-Đồng Nai","dien_thoai":"0794474620","ma_so_thue":"","no_mua_dau_ky":0,"no_ban_dau_ky":0,"no_mua":0,"no_ban":0,"kieu":null,"ghi_chu":"","ngay_tao":"2021-07-17T14:46:26.943Z","nguoi_tao":"","ngay_sua":"2021-07-17T14:46:26.943Z","nguoi_sua":"","cha":"","chan_doan":"","ngay_sinh":null,"ngay_bao_cong_no":0,"diem_dau_ky":0,"diem_thuong":0,"chiet_khau":0,"vip":0,"cmnd":null,"tien_khach_thanh_toan":null,"tien_no_mua":1743750,"tien_theo_can_khoi":0,"chi_phi_lien_quan":null},{"tai_khoan_khach":"0901568693","mat_khau_khach":"Tung1234","doi_tuong_id":94,"tich_diem":0,"email":"tung.tlschool@gmail.com","id_tk_khach":34,"vi_tien":null,"tien_theo_khoi":3500000,"tien_theo_can":30000,"ti_gia_tinh":3750,"gio_hang":"[]","loai_doi_tuong_id":1,"ma_doi_tuong":"DT0021","ten_doi_tuong":" tùng - 0901568693","dia_chi":"haiphong","dien_thoai":"0901568693","ma_so_thue":"","no_mua_dau_ky":0,"no_ban_dau_ky":0,"no_mua":0,"no_ban":0,"kieu":null,"ghi_chu":"","ngay_tao":"2021-07-14T12:33:12.744Z","nguoi_tao":"","ngay_sua":"2021-07-14T12:33:12.744Z","nguoi_sua":"","cha":"","chan_doan":"","ngay_sinh":null,"ngay_bao_cong_no":0,"diem_dau_ky":0,"diem_thuong":0,"chiet_khau":0,"vip":0,"cmnd":null,"tien_khach_thanh_toan":null,"tien_no_mua":null,"tien_theo_can_khoi":null,"chi_phi_lien_quan":null}]

    //         // console.log(html)
    //         html.map(async (x)=>{
    //             const checkData = await pool.query(`select * from khachhang where ten_kh = N'${x.ten_doi_tuong}'`)
    //             if(checkData.rowCount > 0 ){

    //             }else{
    //                 const newData = await pool.query(`
    //                 insert into khachhang
    //                 (ten_kh,dia_chi,so_dt,email,gio_hang,password)
    //                 values(N'${x.ten_doi_tuong}',N'${x.dia_chi}',N'${x.dien_thoai}',N'${x.email}',N'[]',N'${x.dien_thoai}')
    //             `)
    //             }

    //         })
    //         // html



    //     } catch (error) {
    //         console.log(error)
    //     }
    // })

    app.get("/DSVanDon/:id_don",async (req,res)=>{
        try {
            const {id_don} = req.params
            const newQuery = await pool.query(`
                select van_don from don_hang
                where id_don = ${id_don}
            `)
            res.json({
                status : newQuery.rowCount > 0 ? 1 : 0,
                data : newQuery.rowCount > 0 ? newQuery.rows[0].van_don : [],
            })
        } catch (error) {
            
        }
    })

    app.post("/ThemVanDon/:id_don" , async (req,res)=>{
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

                    const {id_don} = req.params
                    const {van_don} = req.body
                    
                    console.log(van_don)
                    const newQueryVanDon = await pool.query(`select van_don from don_hang where id_don = ${id_don}`)
                    var list_van_don = newQueryVanDon.rows[0].van_don === '' ||
                                newQueryVanDon.rows[0].van_don === null || newQueryVanDon.rows[0].van_don === undefined ? "" : newQueryVanDon.rows[0].van_don

                    list_van_don += "_" + van_don
                    console.log(list_van_don)
                    const newQuery = await pool.query(`
                        update don_hang set van_don = N'${list_van_don}'
                        where id_don = ${id_don}
                    `)
                    
                    if(newQuery.rowCount > 0){
                        res.json({
                            status:1
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
            res.json({
                status:0,
                message:'Hết phiên thao tác người dùng',
                data:[]
            })
        }
    })


 





    app.put("/CapNhapVanDon/:id_don" , async (req,res)=>{
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

                    const {id_don} = req.params
                    const {newData} = req.body
                    var list_van_don = newData.join("_")
                    console.log(newData)
        
                    const newQuery = await pool.query(`
                        update don_hang set van_don = N'${list_van_don}'
                        where id_don = ${id_don}
                    `)
                    
                    if(newQuery.rowCount > 0){
                        res.json({
                            status:1
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
            res.json({
                status:0,
                message:'Hết phiên thao tác người dùng',
                data:[]
            })
        }
    })


    app.put("/CapNhapSoCanSoKhoi/:id_don" , async (req,res)=>{
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

                    const {id_don} = req.params
                    const {so_khoi,so_can} = req.body
        
                    const newQuery = await pool.query(`
                        update don_hang set so_khoi = ${so_khoi}, so_can = ${so_can}
                        where id_don = ${id_don}
                    `)
                    
                    if(newQuery.rowCount > 0){
                        res.json({
                            status:1
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
            res.json({
                status:0,
                message:'Hết phiên thao tác người dùng',
                data:[]
            })
        }
    })


    app.post("/kh/TimKiemDonHang" , async(req,res)=>{
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

                    // const {trangthai} = req.params
                    const {tim_theo_ten,
                        tim_theo_ma,
                        tim_theo_van,tu_ngay,den_ngay,trangthai} = req.body
                    console.log({tim_theo_ten,
                        tim_theo_ma,
                        tim_theo_van,tu_ngay,den_ngay,trangthai})
                    const newQuery = await pool.query(`
                        select ten_kh,* from don_hang,khachhang
                        where don_hang.id_kh = khachhang.id_kh
                        ${tu_ngay === null || tu_ngay === ''  ? '' : `and ngay >= '${tu_ngay}'`}
                        ${den_ngay === null || den_ngay === '' ? '' : `and ngay <= '${den_ngay}'`}
                        ${tim_theo_van === null || tim_theo_van === '' ? '' : `and don_hang.ma_don like N'%${tim_theo_ma}%'`}
                        ${trangthai === "Tất cả" || trangthai === '' ? '' : `and don_hang.trangthai =N'${trangthai}'`}
                        ${tim_theo_van === null  || tim_theo_van === ''? '' : `and don_hang.van_don like N'%${tim_theo_van}%'`}
                        ${tim_theo_ten === null || tim_theo_ten === '' ? '' : `and LOWER(convertTVkdau(khachhang.ten_kh)) LIKE LOWER(convertTVkdau('%${tim_theo_ten}%'))`}
                        ORDER BY don_hang.ngay DESC
                    `)
                    /* 
                        PGadmin function
                        Create OR replace function convertTVkdau(x text) returns text as
                        $$
                        DECLARE
                        codau text; kdau text; r text;
                        BEGIN
                        codau = 'áàảãạâấầẩẫậăắằẳẵặđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶĐÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ';
                        kdau = 'aaaaaaaaaaaaaaaaadeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyAAAAAAAAAAAAAAAAADEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYY';
                        r =x;
                        FOR i IN 0..length(codau)
                        LOOP
                        r = replace(r,substr(codau,i,1),substr(kdau,i,1));
                        END LOOP;
                        RETURN r;
                        END
                        $$ LANGUAGE plpgsql;
                    */
                    console.log(newQuery.rows)
                    if(newQuery.rowCount > 0){
                        res.json({
                            status:1,
                            data: encode_decode.EncodeJson(newQuery.rows)
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
            res.json({
                status:0,
                message:'Hết phiên thao tác người dùng',
                data:[]
            })
        }
    })
}




