
const pool = require('../../pgconnect')
var fs = require('fs')
var func = require('../../assets/func')
var encode_decode = require("../../assets/encode_decode")
module.exports = function(app) {



    app.post("/DSNganhHang/ThemNganhHang" , async (req,res)=>{
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

                    const {ten_nganh,mat_khau,ngay,ten_khach,loai_tk,vi_tien,email} = req.body    
                    const checkUser = await pool.query(`
                        select * from nganhhang where ten_nganh = N'${ten_nganh}'
                    `)

                    if(checkUser.rowCount > 0){
                        res.json({
                            status:0,
                            message:"Dữ liệu đã tồn tại",
                            data: []
                        })
                    }else{
                        const newQuery = await pool.query(`
                            insert into nganhhang (ten_nganh)
                            values(N'${ten_nganh}')
                        `)
                        
                        if(newQuery.rowCount > 0){
                            const newData = await pool.query(`
                            select * from nganhhang where ten_nganh = N'${ten_nganh}'
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
            res.json({
                status:0,
                message:'Hết phiên thao tác người dùng',
                data:[]
            })
        }
    })

    app.put("/DSNganhHang/SuaNganhHang" , async (req,res)=>{
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

                    const {ten_nganh,mat_khau,ngay,ten_khach,loai_tk,vi_tien,email} = req.body    
                    const checkUser = await pool.query(`
                        select * from nganhhang where ten_nganh = N'${ten_nganh}'
                    `)

                    if(checkUser.rowCount === 0){
                        res.json({
                            status:0,
                            message:"Lỗi phiên thao tác người dùng",
                            data: []
                        })
                    }else{
                        const newQuery = await pool.query(`
                            UPDATE ten_nganh set ten_khach=N'${ten_khach}',
                            mat_khau=N'${encode_decode.EncodeString(ten_nganh,mat_khau)}'
                            ,loai_tk=N'${loai_tk}',email=N'${email}'
                            Where ten_nganh = N'${ten_nganh}'
                        `)
                        
                        if(newQuery.rowCount > 0){
                            const newData = await pool.query(`
                            select * from nganhhang where ten_nganh = N'${ten_nganh}'
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
            res.json({
                status:0,
                message:'Hết phiên thao tác người dùng',
                data:[]
            })
        }
    })

    app.delete("/DSNganhHang/XoaNganhHang" , async (req,res)=>{
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

                    const {ten_nganh,mat_khau,ngay,ten_khach,loai_tk,vi_tien,email} = req.body    
                    const checkUser = await pool.query(`
                        select * from nganhhang where ten_nganh = N'${ten_nganh}'
                    `)

                    if(checkUser.rowCount === 0){
                        res.json({
                            status:0,
                            message:"Lỗi phiên thao tác người dùng",
                            data: []
                        })
                    }else{
                        const newQuery = await pool.query(`
                            DELETE from nganhhang where ten_nganh= N'${ten_nganh}'
                        `)
                        
                        if(newQuery.rowCount > 0){
                            res.json({
                                status:1,
                                message:'Thành công!',
                                data: ten_nganh
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

    app.post('/DSNganhHang/:page' , async (req,res)=>{
        try {
            const {token} = req.body
            
            fs.readFile('TenShop.txt', 'utf8', async (err, data)=>{
                if(err) throw res.json({
                    status:0,
                    message:'Hết phiên thao tác người dùng',
                    data:[]
                })
                const checkToken = await pool.query(`select token_te from token where token_te = N'${token.split("*")[0]}'`)
                // //console.log(data)
                if(token.split("*")[1] === data && checkToken.rowCount > 0){
                    const {page} = req.params
                    const newQuery = await pool.query(`select * from nganhhang LIMIT 10 OFFSET ${page === 1 ? 0 : parseInt(page - 1)*10}`)
                    res.json({
                        status:1,
                        message:'Thành công!',
                        data: newQuery.rows
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

    app.get(`/TotalPageNganhHang` , async(req,res)=>{
        try {
            const newQuery = await pool.query(`
                select count(*) from nganhhang
            `)

            res.json({
                status: newQuery.rowCount > 0 ? 1 : 0,
                data : Math.ceil(parseInt(newQuery.rows[0].count) /10),
                message :  newQuery.rowCount > 0 ? "Thành công!" : "Thất bại!"
            })
        } catch (error) {
            
        }
    })


}



