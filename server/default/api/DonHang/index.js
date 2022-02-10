
const pool = require('../../pgconnect')
var fs = require('fs')
var func = require('../../assets/func')
var encode_decode = require("../../assets/encode_decode")
const { timeNow, timeNowDB } = require('../../assets/TimeLibary')
var randomstring = require("randomstring");
module.exports = function(app) {

    

    app.post('/DSDangXuLy/:page' , async (req,res)=>{
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

    app.post('/DSDaDatHang/:page' , async (req,res)=>{
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

    app.post('/DSDangPhatGiaoVan/:page' , async (req,res)=>{
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

                    const {page} = req.params
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


    app.post('/DSHangVeKho/:page' , async (req,res)=>{
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

    app.post("/DSTatCa/:page" , async(req,res)=>{
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

    app.get("/TotalPageTatCa", async(req,res)=>{
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

    app.post('/DSKhieuNai/:page' , async (req,res)=>{
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


    app.post('/DSThanhCong/:page' , async (req,res)=>{
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

    app.post('/DSShopHuy/:page' , async (req,res)=>{
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


    


    app.get(`/TotalPageDangXuLy` , async(req,res)=>{
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


    app.get(`/TotalPageDaDatHang` , async(req,res)=>{
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

    app.get(`/TotalPageDangPhatGiaoVan` , async(req,res)=>{
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

    app.get(`/TotalPageHangVeKho` , async(req,res)=>{
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


    app.get(`/TotalPageKhieuNai` , async(req,res)=>{
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

    app.get(`/TotalPageShopHuy` , async(req,res)=>{
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




    app.post("/GioHangChiTietKhach/:id_don" , async(req,res)=>{
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


    app.post("/TachDonHang/:id_don" , async(req,res)=>{
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
                // const checkToken = await pool.query(`select token_te from token where token_te = N'${token.split("*")[0]}'`)
                //console.log(data)
              

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
                    func.CapNhapGiaTienDon(id_don)
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

            const {id_don} = req.params
            const {stt} = req.body
            const newQuery = await pool.query(`
                update don_hang set trangthai = N'${stt}'
                where id_don = ${id_don}
            `)
            const ma_don = await pool.query(`
            select ma_don from don_hang where id_don = ${id_don}
            `)

            // func.GuiThongBao(`[Đơn hàng][${ma_don.map(x=>x.ma_don)}] Chuyển trạng thái`,`[${ma_don.map(x=>x.ma_don)}] Đã chuyển sang trạng thái ${stt}`,
            // timeNowDB,"Hệ thống", id_don
            // )
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
                    const ma_don_db = await pool.query(`
                    select ma_don from don_hang where id_don = ${id_don}
                    `)
                    
                    // func.GuiThongBao(`[Đơn hàng][${ma_don_db.map(x=>x.ma_don)}] Chuyển trạng thái`,`[${ma_don_db.map(x=>x.ma_don)}] Đã chuyển sang trạng thái ${stt}`,
                    // timeNowDB,"Hệ thống", id_don
                    // )
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


    app.post("/TimKiemDonHang" , async(req,res)=>{
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




    app.post(`/CapNhapTienSoCanSoKhoi/:id_don` , async(req,res)=>{
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
                    
                    const {so_can,so_khoi} = req.body
                    
                    const newQuery = await pool.query(`
                        update don_hang set so_khoi= ${so_khoi}
                        ,so_can = ${so_can}
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

    app.post(`/ThemSoCanKhoi` , async(req,res)=>{
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

                    // const {id_kh} = req.params
                    
                    const {so_can,so_khoi,ghi_chu,tai_khoan_khach} = req.body
                    var so_dt = encode_decode.DecodeString("GIO_HANG" , tai_khoan_khach)
                
                    const newQuery = await pool.query(`
                    insert into don_hang(
                        ma_don,van_don,so_can,so_khoi,id_kh,ghi_chu,tien_can,tien_khoi,phi_noi_dia,phi_dich_vu,phu_phi
                    )
                    values(N'',N'',${so_can},${so_khoi},
                    (select id_kh from khachhang where so_dt = N'${so_dt}')
                    ,N'${ghi_chu}',
                          (select tien_theo_can from khachhang where so_dt = N'${so_dt}'),
                          (select tien_theo_khoi from khachhang where so_dt = N'${so_dt}'),
                           0,0,0
                          )
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



}


