
const pool = require('../../pgconnect')
var fs = require('fs')
var func = require('../../assets/func')
var encode_decode = require("../../assets/encode_decode")
module.exports = function(app) {
    app.post('/DSMatHang' , async (req,res)=>{
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
                    const newQuery = await pool.query("select * from MatHang")
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


    app.post("/DSMatHang/ThemMatHang" , async (req,res)=>{
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

                    const {id_lh,ten_hang,ghi_chu,hinh_anh_nb,ds_hinhanh,so_luong
                        ,gia_ban,gia_goc,trang_thai,gia_giam} = req.body    
                    const checkUser = await pool.query(`
                        select * from MatHang where ten_hang = N'${ten_hang}'
                    `)

                    if(checkUser.rowCount > 0){
                        res.json({
                            status:0,
                            message:"Dữ liệu đã tồn tại",
                            data: []
                        })
                    }else{
                        const newQuery = await pool.query(`
                        insert into mathang(id_lh,ten_hang,ghi_chu,hinh_anh_nb,ds_hinhanh,so_luong
                            ,gia_ban,gia_goc,trang_thai,gia_giam)
         
                        values(${id_lh},N'${ten_hang}',N'${ghi_chu}',N'${hinh_anh_nb}',N'${ds_hinhanh}',${so_luong},
                            N'${gia_ban}',N'${gia_goc}',true,${gia_giam})
                        `)
                        
                        if(newQuery.rowCount > 0){
                            const newData = await pool.query(`
                            select * from MatHang where ten_hang = N'${ten_hang}'
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

    app.put("/DSMatHang/SuaMatHang" , async (req,res)=>{
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

                    const {ten_hang,loai_tk,email} = req.body    
                    const checkUser = await pool.query(`
                        select * from MatHang where ten_hang = N'${ten_hang}'
                    `)

                    if(checkUser.rowCount === 0){
                        res.json({
                            status:0,
                            message:"Lỗi phiên thao tác người dùng",
                            data: []
                        })
                    }else{
                        const {id_lh,ten_hang,ghi_chu,hinh_anh_nb,ds_hinhanh,so_luong
                            ,gia_ban,gia_goc,trang_thai,gia_giam,id_mh} = req.body    
                        const newQuery = await pool.query(`
                            update mathang set id_lh = ${id_lh},
                            ten_hang = N'${ten_hang}',
                            ghi_chu = N'${ghi_chu}',
                            hinh_anh_nb = N'${hinh_anh_nb}',
                            ds_hinhanh = N'${ds_hinhanh}',
                            so_luong = ${so_luong},
                            gia_ban = ${gia_ban},
                            gia_goc = ${gia_goc},
                            trang_thai = ${trang_thai},
                            gia_giam = ${gia_giam}
                            where id_mh = ${id_mh}
                        `)
                        
                        if(newQuery.rowCount > 0){
                            const newData = await pool.query(`
                            select * from MatHang where ten_hang = N'${ten_hang}'
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

    app.delete("/DSMatHang/XoaMatHang" , async (req,res)=>{
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

                    const {ten_hang} = req.body    
                    const checkUser = await pool.query(`
                        select * from MatHang where ten_hang = N'${ten_hang}'
                    `)

                    if(checkUser.rowCount === 0){
                        res.json({
                            status:0,
                            message:"Lỗi phiên thao tác người dùng",
                            data: []
                        })
                    }else{
                        const newQuery = await pool.query(`
                            DELETE from MatHang where ten_hang= N'${ten_hang}'
                        `)
                        
                        if(newQuery.rowCount > 0){
                            res.json({
                                status:1,
                                message:'Thành công!',
                                data: ten_hang
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



