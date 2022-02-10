
const pool = require('../../pgconnect')
var fs = require('fs')
var func = require('../../assets/func')
var encode_decode = require("../../assets/encode_decode")

module.exports = function(app) {

    app.post("/DSKhachHang/ThemKhachHang" , async (req,res)=>{
        try {
            const {token} = req.body
            fs.readFile('TenShop.txt', 'utf8', async (err, data)=>{
                const {ten_kh,dia_chi,so_dt,cmnd,ngay_sinh,email} = req.body 
                // console.log({ten_kh,dia_chi,so_dt,cmnd,ngay_sinh,email})   
                if(err) throw res.json({
                    status:0,
                    message:'Hết phiên thao tác người dùng',
                    data:[]
                })
                const checkToken = await pool.query(`select token_te from token where token_te = N'${token.split("*")[0]}'`)
                
                if(token.split("*")[1] === data && checkToken.rowCount > 0){

                    const {ten_kh,dia_chi,so_dt,cmnd,ngay_sinh,email} = req.body 
                    // console.log({ten_kh,dia_chi,so_dt,cmnd,ngay_sinh,email})   
                    // //console.log(data)
                    const checkUser = await pool.query(`
                        select * from khachhang where ten_kh = N'${ten_kh}'
                    `)

                    if(checkUser.rowCount > 0){
                        res.json({
                            status:0,
                            message:"Dữ liệu đã tồn tại",
                            data: []
                        })
                    }else{
                        console.log(`
                        insert into khachhang(ten_kh,dia_chi,so_dt,email,cmnd,ngay_sinh,password,created_at)
                        values(N'${ten_kh}',N'${dia_chi}',N'${so_dt}',N'${email}',N'${cmnd}','${ngay_sinh} 00:00:00',N'${so_dt}',NOW())
                        `)
                        const newQuery = await pool.query(`
                        insert into khachhang(ten_kh,dia_chi,so_dt,email,cmnd,ngay_sinh,password,created_at)
                        values(N'${ten_kh}',N'${dia_chi}',N'${so_dt}',N'${email}',N'${cmnd}','${ngay_sinh} 00:00:00',N'${so_dt}',NOW())
                        `)
                        
                        if(newQuery.rowCount > 0){
                            const newData = await pool.query(`
                            select * from khachhang where ten_kh = N'${ten_kh}'
                            `)
                            res.json({
                                status:1,
                                message:'Thành công!',
                                data: newData.rows
                            })
                        }else{
                            res.json({
                                status:0,
                                message:'Lỗi phiên thao tác người dùng',
                                data:[]
                            })
                        }
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

    app.put("/DSKhachHang/SuaKhachHang" , async (req,res)=>{
        try {
            const {token} = req.body
            console.log("TESST _!@#!@#@!")
            const {ten_kh,so_dt,password,ngay_sinh,dia_chi,gioi_tinh,ngan_hang,so_tai_khoan,chu_tai_khoan,email,id_kh,chiet_khau} = req.body
            
            // 
            console.log(ngay_sinh)
            // 
   
            fs.readFile('TenShop.txt', 'utf8', async (err, data)=>{
                if(err) throw res.json({
                    status:0,
                    message:'Hết phiên thao tác người dùng',
                    data:[]
                })
                const checkToken = await pool.query(`select token_te from token where token_te = N'${token.split("*")[0]}'`)
                //console.log(data)
                if(token.split("*")[1] === data && checkToken.rowCount > 0){
                    const {ten_kh,so_dt,password,ngay_sinh,dia_chi,gioi_tinh,ngan_hang,so_tai_khoan,chu_tai_khoan,email,id_kh,token,chiet_khau} = req.body
                    console.log({ten_kh,so_dt,password,ngay_sinh,dia_chi,gioi_tinh,ngan_hang,so_tai_khoan,chu_tai_khoan,email,id_kh,token,chiet_khau})
                    const checkUser = await pool.query(`
                        select * from khachhang where id_kh = ${id_kh}
                    `)
                    
                    if(checkUser.rowCount === 0){
                        res.json({
                            status:0,
                            message:"Lỗi phiên thao tác người dùng",
                            data: []
                        })
                    }else{

                        if(chiet_khau === undefined){
                            const chiet_khau = await pool.query(`
                                select chiet_khau from khachhang where id_kh = ${id_kh} 
                            `)
                            const newQuery = await pool.query(`
                            update khachhang set ten_kh = N'${ten_kh}',
                            dia_chi = N'${dia_chi}', so_dt = N'${so_dt}',
                            email = N'${email}',ngan_hang=N'${ngan_hang}',so_tai_khoan=N'${so_tai_khoan}',
                            chiet_khau=${chiet_khau.rows[0].chiet_khau},
                            chu_tai_khoan=N'${chu_tai_khoan}',
                            ngay_sinh = '${ngay_sinh.split('T')[0]} 00:00:00'
                            where id_kh = ${id_kh}                        
                            `)
                            if(newQuery.rowCount > 0){
                                const newData = await pool.query(`
                                select * from khachhang where id_kh = ${id_kh}
                                `)
                                
                                res.json({
                                    status:1,
                                    message:'Thành công!',
                                    data: encode_decode.EncodeJson(newData.rows)
                                })
                            }else{
                                res.json({
                                    status:0,
                                    message:'Lỗi phiên thao tác người dùng',
                                    data:[]
                                })
                            }
                        }else{
                            const newQuery = await pool.query(`
                            update khachhang set ten_kh = N'${ten_kh}',
                            dia_chi = N'${dia_chi}', so_dt = N'${so_dt}',
                            email = N'${email}',ngan_hang=N'${ngan_hang}',so_tai_khoan=N'${so_tai_khoan}',
                            chiet_khau=${chiet_khau},
                            chu_tai_khoan=N'${chu_tai_khoan}',
                            ngay_sinh = '${ngay_sinh.split('T')[0]} 00:00:00'
                            where id_kh = ${id_kh}                        
                            `)
                            if(newQuery.rowCount > 0){
                                const newData = await pool.query(`
                                select * from khachhang where id_kh = ${id_kh}
                                `)
                                
                                res.json({
                                    status:1,
                                    message:'Thành công!',
                                    data: encode_decode.EncodeJson(newData.rows)
                                })
                            }else{
                                res.json({
                                    status:0,
                                    message:'Lỗi phiên thao tác người dùng',
                                    data:[]
                                })
                            }
                        }
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


    

    app.put(`/DSKhachHang/ThayMatKhau` , async (req,res)=>{
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
                    const {mat_khau_moi,id_kh,so_dt} = req.body
                    console.log({mat_khau_moi,id_kh,so_dt})
                    const checkUser = await pool.query(`
                        select * from khachhang where id_kh = ${id_kh}

                    `)
                    
                    if(checkUser.rowCount === 0){
                        res.json({
                            status:0,
                            message:"Lỗi phiên thao tác người dùng",
                            data: []
                        })
                    }else{
                        const newQuery = await pool.query(`
                        update khachhang set password = N'${encode_decode.EncodeString(so_dt,mat_khau_moi)}'
                        where id_kh = ${id_kh}                        
                        `)
                        if(newQuery.rowCount > 0){
                            const newData = await pool.query(`
                            select * from khachhang where id_kh = ${id_kh}
                            `)
                            
                            res.json({
                                status:1,
                                message:'Thành công!',
                                data: encode_decode.EncodeJson(newData.rows)
                            })
                        }else{
                            res.json({
                                status:0,
                                message:'Lỗi phiên thao tác người dùng',
                                data:[]
                            })
                        }
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

    app.delete("/DSKhachHang/XoaKhachHang" , async (req,res)=>{
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

                    const {id_kh,ten_kh,mat_khau,ngay,ten_khach,loai_tk,vi_tien,email} = req.body    
                    const checkUser = await pool.query(`
                        select * from khachhang where id_kh = ${id_kh}
                    `)

                    if(checkUser.rowCount === 0){
                        res.json({
                            status:0,
                            message:"Lỗi phiên thao tác người dùng",
                            data: []
                        })
                    }else{
                        const newQuery = await pool.query(`
                            DELETE from khachhang where id_kh = ${id_kh}
                        `)
                        
                        if(newQuery.rowCount > 0){
                            res.json({
                                status:1,
                                message:'Thành công!',
                                data: id_kh
                            })
                        }else{
                            res.json({
                                status:0,
                                message:'Lỗi phiên thao tác người dùng',
                                data:[]
                            })
                        }
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

    app.post('/DSKhachHang/:page' , async (req,res)=>{
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
                    const newQuery = await pool.query(`select * from khachhang LIMIT 10 OFFSET ${page === 1 ? 0 : parseInt(page - 1)*10}`)
                    res.json({
                        status:1,
                        message:'Thành công!',
                        data: 
                        encode_decode.EncodeJson(newQuery.rows)
                        
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

    

    app.get(`/TotalPageKhachHang` , async(req,res)=>{
        try {
            const newQuery = await pool.query(`
                select count(*) from khachhang
            `)

            res.json({
                status: newQuery.rowCount > 0 ? 1 : 0,
                data : Math.ceil(parseInt(newQuery.rows[0].count) /10),
                message :  newQuery.rowCount > 0 ? "Thành công!" : "Thất bại!"
            })
        } catch (error) {
            
        }
    })



    app.post(`/DLLocKhachHang` , async(req,res)=>{
        try {
            const {tu_ngay,den_ngay,tim_theo_ten,tim_theo_ma,tim_theo_van,so_dt} = req.body


            console.log({tu_ngay,den_ngay,tim_theo_ten,tim_theo_ma,tim_theo_van,so_dt})
            const newQuery = await pool.query(`
            select * from khachhang
            where true
            ${tim_theo_ten === "" ? "" : ` and LOWER(convertTVkdau(khachhang.ten_kh)) LIKE LOWER(convertTVkdau(N'%${tim_theo_ten}%'))`}  
            ${so_dt === "" ? "" : ` and so_dt like N'%${so_dt}%'`}  
            
            `)
            res.json({
                status : newQuery.rowCount > 0 ? 1 : 0,
                data: newQuery.rowCount > 0 ? encode_decode.EncodeJson(newQuery.rows) : []
           })
        } catch (error) {
            console.log(error)
        }
    })
    
}



