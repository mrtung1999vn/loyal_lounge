
const pool = require('../../pgconnect')
var fs = require('fs')
var func = require('../../assets/func')
var encode_decode = require("../../assets/encode_decode")
module.exports = function(app) {
    app.post('/DSLoaiHang' , async (req,res)=>{
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
                    const newQuery = await pool.query("select * from loaihang")
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


    app.post("/DSLoaiHang/ThemLoaiHang" , async (req,res)=>{
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

                    const {ten_lh,ghi_chu,id_nh} = req.body    
                    const checkUser = await pool.query(`
                        select * from loaihang where ten_lh = N'${ten_lh}'
                    `)

                    if(checkUser.rowCount > 0){
                        res.json({
                            status:0,
                            message:"Dữ liệu đã tồn tại",
                            data: []
                        })
                    }else{
                        const newQuery = await pool.query(`
                            insert into loaihang (ten_lh,id_nh,ghi_chu)
                            values(N'${ten_lh}',${id_nh},N'${ghi_chu}')
                        `)
                        
                        if(newQuery.rowCount > 0){
                            const newData = await pool.query(`
                            select * from loaihang where ten_lh = N'${ten_lh}'
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

    app.put("/DSLoaiHang/SuaLoaiHang" , async (req,res)=>{
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

                    const {ten_lh,loai_tk,email} = req.body    
                    const checkUser = await pool.query(`
                        select * from loaihang where ten_lh = N'${ten_lh}'
                    `)

                    if(checkUser.rowCount === 0){
                        res.json({
                            status:0,
                            message:"Lỗi phiên thao tác người dùng",
                            data: []
                        })
                    }else{
                        const {ten_lh,ghi_chu,id_nh} = req.body
                        const newQuery = await pool.query(`
                            UPDATE ten_lh set ten_lh=N'${ten_lh}',
                            ghi_chu=N'${ghi_chu}',id_nh=${id_nh}
                            Where ten_lh = N'${ten_lh}'
                        `)
                        
                        if(newQuery.rowCount > 0){
                            const newData = await pool.query(`
                            select * from loaihang where ten_lh = N'${ten_lh}'
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

    app.delete("/DSLoaiHang/XoaLoaiHang" , async (req,res)=>{
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

                    const {ten_lh} = req.body    
                    const checkUser = await pool.query(`
                        select * from loaihang where ten_lh = N'${ten_lh}'
                    `)

                    if(checkUser.rowCount === 0){
                        res.json({
                            status:0,
                            message:"Lỗi phiên thao tác người dùng",
                            data: []
                        })
                    }else{
                        const newQuery = await pool.query(`
                            DELETE from loaihang where ten_lh= N'${ten_lh}'
                        `)
                        
                        if(newQuery.rowCount > 0){
                            res.json({
                                status:1,
                                message:'Thành công!',
                                data: ten_lh
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

    
}



