
const pool = require('../../pgconnect')
var fs = require('fs')
var func = require('../../assets/func')
var encode_decode = require("../../assets/encode_decode")
var libs = require("../../libs")
var randomstring = require("randomstring");

function getRandomInt(max) {
    return Math.floor(Math.random() * max).toString();
  }
  

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

const DEFAULT_ID = "18"

module.exports = function(app) {

    // CRUD Tài khoản (Thêm, sửa, xóa, tìm kiếm)
    app.post('/DSTaiKhoan' , async (req,res)=>{
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
                    //console.log(data)
                    const newQuery = await pool.query("select * from tai_khoan")
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

    app.post("/DSTaiKhoan/ThemTaiKhoan" , async (req,res)=>{
        try {
            const {token} = req.body
            console.log(token)
            fs.readFile('TenShop.txt', 'utf8', async (err, data)=>{
                if(err) throw res.json({
                    status:0,
                    message:'Hết phiên thao tác người dùng',
                    data:[]
                })
                const checkToken = await pool.query(`select token_te from token where token_te = N'${token.split("*")[0]}'`)
                //console.log(data)
                if(token.split("*")[1] === data && checkToken.rowCount > 0){

                    const {tai_khoan,mat_khau,ten_nguoi_dung,loai_tk,email,trangthai} = req.body    
                    const checkUser = await pool.query(`
                        select * from tai_khoan where tai_khoan = N'${tai_khoan}'
                    `)

                    if(checkUser.rowCount > 0){
                        res.json({
                            status:0,
                            message:"Dữ liệu đã tồn tại",
                            data: []
                        })
                    }else{
                        const newQuery = await pool.query(`
                            insert into tai_khoan(tai_khoan,mat_khau,ngay,trangthai,ten_nguoi_dung,loai_tk,vi_tien,email)
                            values(N'${tai_khoan}',N'${encode_decode.EncodeString(tai_khoan,mat_khau)}','${func.date_csdl}',${trangthai},N'${ten_nguoi_dung}',N'${loai_tk}',0,N'${email}')
                        `)
                        
                        if(newQuery.rowCount > 0){
                            const newData = await pool.query(`
                            select * from tai_khoan where tai_khoan = N'${tai_khoan}'
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

    app.put("/DSTaikhoan/SuaTaiKhoan" , async (req,res)=>{
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

                    const {id_tk,tai_khoan,mat_khau,ngay,ten_nguoi_dung,loai_tk,vi_tien,email,trangthai} = req.body    
                    const checkUser = await pool.query(`
                        select * from tai_khoan where id_tk = ${id_tk}
                    `)

                    if(checkUser.rowCount === 0){
                        res.json({
                            status:0,
                            message:"Lỗi phiên thao tác người dùng",
                            data: []
                        })
                    }else{
                        const newQuery = await pool.query(`
                            UPDATE tai_khoan set ten_nguoi_dung=N'${ten_nguoi_dung}',
                            mat_khau=N'${encode_decode.EncodeString(tai_khoan,mat_khau)}'
                            ,loai_tk=N'${loai_tk}',email=N'${email}',
                            trangthai=${trangthai},tai_khoan=N'${tai_khoan}'
                            Where id_tk = ${id_tk}
                        `)
                        
                        if(newQuery.rowCount > 0){
                            const newData = await pool.query(`
                            select * from tai_khoan where id_tk = ${id_tk}
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

    app.delete("/DSTaikhoan/XoaTaiKhoan" , async (req,res)=>{
        try {
            const {token,tai_khoan} = req.body
            console.log(token,tai_khoan)
            fs.readFile('TenShop.txt', 'utf8', async (err, data)=>{
                if(err) throw res.json({
                    status:0,
                    message:'Hết phiên thao tác người dùng',
                    data:[]
                })
                const checkToken = await pool.query(`select token_te from token where token_te = N'${token.split("*")[0]}'`)
                //console.log(data)
                if(token.split("*")[1] === data && checkToken.rowCount > 0){

                    const {tai_khoan,mat_khau,ngay,ten_nguoi_dung,loai_tk,vi_tien,email} = req.body    
                    const checkUser = await pool.query(`
                        select * from tai_khoan where tai_khoan = N'${tai_khoan}'
                    `)

                    if(checkUser.rowCount === 0){
                        res.json({
                            status:0,
                            message:"Lỗi phiên thao tác người dùng",
                            data: []
                        })
                    }else{
                        const newQuery = await pool.query(`
                            DELETE FROM tai_khoan where tai_khoan= N'${tai_khoan}'
                        `)
                        
                        if(newQuery.rowCount > 0){
                            res.json({
                                status:1,
                                message:'Thành công!',
                                data: tai_khoan
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


    // Xử lý đăng nhập
    app.post('/DangNhap' , async (req,res)=>{
        try {
            
            const {token} = req.body
            fs.readFile('TenShop.txt', 'utf8', async (err, data)=>{
                if(err) throw res.json({
                    status:0,
                    message:'Hết phiên thao tác người dùng',
                    data:[]
                })
                const checkToken = await pool.query(`select token_te from token where token_te = N'${token.split("*")[0]}'`)
                
                if(token.split("*")[1] === data && checkToken.rowCount > 0){
                    const {TaiKhoan,MatKhau} = req.body
                    console.log(TaiKhoan,MatKhau)
                    const newQuery = await pool.query(`
                        select * from khachhang
                        where so_dt = N'${TaiKhoan}' and password = N'${encode_decode.EncodeString(
                            TaiKhoan,MatKhau
                            
                        )}'
                    `)
                    console.log(newQuery.rows)
                    const OTP = getRandomInt(10000)

                    var subject = `[Hệ thống ${data.split('_')[0]}] Mã OTP đăng nhập`
                    var text = `Mã OTP đăng nhập người dùng\n\n\nOTP: ${OTP}`
                    if(newQuery.rowCount > 0) {
                        // console.log(newQuery.rows.map(x=>x.email).toString())
                        libs.SendMailGoogle(newQuery.rows.map(x=>x.email).toString(),subject,text)
                        res.json({
                            status: newQuery.rowCount > 0 ? 1 : 0 ,
                            OTP: encode_decode.EncodeString_AES("0366262072",OTP).toString(),
                            message:  newQuery.rowCount > 0 ? 'Thành công!' : 'Đăng nhập thất bại!',
                            data: newQuery.rows
                        })
                    }else{
                        res.json({
                            status:0,
                            message:'Người dùng nhập sai tài khoản & mật khẩu',
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

    
    app.post('/DangKyTaiKhoan' , async (req,res)=>{
        try {
            console.log("TESST")
            const {token} = req.body
            fs.readFile('TenShop.txt', 'utf8', async (err, data)=>{
                if(err) throw res.json({
                    status:0,
                    message:'Hết phiên thao tác người dùng',
                    data:[]
                })
                const checkToken = await pool.query(`select token_te from token where token_te = N'${token.split("*")[0]}'`)
                const dl_tk = ['F1','F2','F3','F4','F5','F6']
                if(token.split("*")[1] === data && checkToken.rowCount > 0){
                    const {ten_kh,so_dt,password,ngay_sinh,dia_chi,gioi_tinh,ngan_hang,so_tai_khoan,chu_tai_khoan,loai_tk,references,email} = req.body
                    console.log({ten_kh,so_dt,password,ngay_sinh,dia_chi,gioi_tinh,ngan_hang,so_tai_khoan,chu_tai_khoan,loai_tk,references,email})
                    const checkQuery = await pool.query(`
                        select * from khachhang
                        where so_dt = '${so_dt}'
                    `)
                    if(checkQuery.rowCount > 0){
                        res.json({
                            status:0,
                            message:"Đã có tài khoản trên hệ thống!"
                        })
                    }else{
                        const checkGioiThieu = await pool.query(`
                            select * from khachhang
                            where id_kh = ${ references === undefined || references === null || references === '' ? DEFAULT_ID : references}
                        `)
                        if(checkGioiThieu.rowCount > 0){
                            // references

                            const newQuery = await pool.query(`
                            insert into khachhang (ten_kh,so_dt,password,ngay_sinh,dia_chi,gioi_tinh,ngan_hang,so_tai_khoan,chu_tai_khoan,"references",loai_kh,chiet_khau,email,tien_chien_dich,tien_chot,tien_gioi_thieu,tien_cho_duyet,created_at)
                            values(
                                '${ten_kh}','${so_dt}','${encode_decode.EncodeString(so_dt,password)}','${ngay_sinh}','${dia_chi}',
                                '${gioi_tinh}','${ngan_hang}','${so_tai_khoan}','${chu_tai_khoan}',
                                N'${ references === undefined || references === null || references === '' ? DEFAULT_ID : references}',
                                N'${ 

                                (references === undefined || references === null || references === '') || 
                                checkGioiThieu.rows[0].id_kh === 18
                                ? 'F1' : 
                                (checkGioiThieu.rows[0].loai_kh === 'F6' ? 'F6' : dl_tk[parseInt(dl_tk.indexOf(checkGioiThieu.rows[0].loai_kh)) +1] )
                                
                                }',50,N'${email}',0,0,0,0,NOW()
                            )
                            `)
                            if(newQuery.rowCount > 0){
                                res.json({
                                    status:1,
                                    message:"Đăng ký thành công!"
                                })
                            }else{
                                res.json({
                                    status:0,
                                    message:"Đã có tài khoản trên hệ thống!"
                                })
                            }
                        }else{
                            res.json({
                                status:0,
                                message:"Mã giới thiệu không hợp lệ!"
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
    

    // Xử lý quên mật khẩu

    app.post('/QuenMatKhau'  , async (req,res)=>{
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
                    const {TaiKhoan} = req.body
                    console.log(TaiKhoan)
                    const newQuery = await pool.query(`
                        select * from khachhang
                        where so_dt = N'${TaiKhoan}'
                    `)
                    const MatKhau = randomstring.generate(15)
                    const updateUser = await pool.query(`
                    update khachhang
                    set password = N'${encode_decode.EncodeString(TaiKhoan,MatKhau)}'
                    where so_dt = N'${TaiKhoan}'`)
                    if(updateUser.rowCount > 0 ){
                        console.log(`[NEW][Hệ thống ${data.split('_')[0]}] Mật khẩu khôi phục tài khoản`)
                        var subject = `[NEW] [Hệ thống ${data.split('_')[0]}] Mật khẩu khôi phục tài khoản`
                        var text = `Tài khoản khôi phục của bạn\nTài khoản: ${newQuery.rows.map(x=>x.so_dt).toString()}\n Mật khẩu: ${MatKhau}`
                        
                        libs.SendMailGoogle(newQuery.rows.map(x=>x.email).toString(),subject,text)
                        
                        res.json({
                            status: newQuery.rowCount > 0 ? 1 : 0,
                            message:newQuery.rowCount > 0 ? 'Thành công!' : 'Dữ liệu không có trong hệ thống!',
                            data: newQuery.rowCount > 0 ? newQuery.rows: []
                        })
                    }else{
                        res.json({
                            status:0,
                            message:"Lỗi cập nhập tài khoản"
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




    app.post('/DSTaiKhoan/:page' , async(req,res)=>{
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
                    // //console.log(data)
                    const {page} = req.params
                    const newQuery = await pool.query(`select * from tai_khoan LIMIT 10 OFFSET ${page === 1 ? 0 : parseInt(page - 1)*10}`)
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

    app.get(`/TotalPageTaiKhoan` , async(req,res)=>{
        try {
            const newQuery = await pool.query(`
                select count(*) from tai_khoan
            `)

            res.json({
                status: newQuery.rowCount > 0 ? 1 : 0,
                data : Math.ceil(parseInt(newQuery.rows[0].count) /10),
                message :  newQuery.rowCount > 0 ? "Thành công!" : "Thất bại!"
            })
        } catch (error) {
            
        }
    })

























    // Tài khoản admin

        // Xử lý đăng nhập
        app.post('/DangNhap/Admin' , async (req,res)=>{
            try {
                
                const {token} = req.body
                fs.readFile('TenShop.txt', 'utf8', async (err, data)=>{
                    if(err) throw res.json({
                        status:0,
                        message:'Hết phiên thao tác người dùng',
                        data:[]
                    })
                    const checkToken = await pool.query(`select token_te from token where token_te = N'${token.split("*")[0]}'`)
                    
                    if(token.split("*")[1] === data && checkToken.rowCount > 0){
                        const {TaiKhoan,MatKhau} = req.body
                        console.log(TaiKhoan,MatKhau)
                        const newQuery = await pool.query(`
                            select * from tai_khoan
                            where tai_khoan = N'${TaiKhoan}' and mat_khau = N'${encode_decode.EncodeString(
                                TaiKhoan,MatKhau
                                
                            )}'
                        `)
                        console.log(newQuery.rows)
                        const OTP = getRandomInt(10000)
    
                        var subject = `[Hệ thống ${data.split('_')[0]}] Mã OTP đăng nhập`
                        var text = `Mã OTP đăng nhập trang quản trị\n\n\nOTP: ${OTP}`
                        if(newQuery.rowCount > 0) {
                            // console.log(newQuery.rows.map(x=>x.email).toString())
                            libs.SendMailGoogle(newQuery.rows.map(x=>x.email).toString(),subject,text)
                            res.json({
                                status: newQuery.rowCount > 0 ? 1 : 0 ,
                                OTP: encode_decode.EncodeString_AES("0366262072",OTP).toString(),
                                message:  newQuery.rowCount > 0 ? 'Thành công!' : 'Đăng nhập thất bại!',
                                data: newQuery.rows
                            })
                        }else{
                            res.json({
                                status:0,
                                message:'Người dùng nhập sai tài khoản & mật khẩu',
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
    
    
        // app.post('/DangKyTaiKhoan' , async (req,res)=>{
        //     try {
        //         console.log("TESST")
        //         const {token} = req.body
        //         fs.readFile('TenShop.txt', 'utf8', async (err, data)=>{
        //             if(err) throw res.json({
        //                 status:0,
        //                 message:'Hết phiên thao tác người dùng',
        //                 data:[]
        //             })
        //             const checkToken = await pool.query(`select token_te from token where token_te = N'${token.split("*")[0]}'`)
                    
        //             if(token.split("*")[1] === data && checkToken.rowCount > 0){
        //                 const {ten_kh,so_dt,password,ngay_sinh,dia_chi,gioi_tinh,ngan_hang,so_tai_khoan,chu_tai_khoan,loai_tk,references,email} = req.body
        //                 console.log({ten_kh,so_dt,password,ngay_sinh,dia_chi,gioi_tinh,ngan_hang,so_tai_khoan,chu_tai_khoan,loai_tk,references,email})
        //                 const checkQuery = await pool.query(`
        //                     select * from khachhang
        //                     where so_dt = '${so_dt}'
        //                 `)
        //                 if(checkQuery.rowCount > 0){
        //                     res.json({
        //                         status:0,
        //                         message:"Đã có tài khoản trên hệ thống!"
        //                     })
        //                 }else{
        //                     const checkGioiThieu = await pool.query(`
        //                         select * from khachhang
        //                         where id_kh = ${ references === undefined || references === null || references === '' ? DEFAULT_ID : references}
        //                     `)
        //                     if(checkGioiThieu.rowCount > 0){
        //                         // references
        //                         const newQuery = await pool.query(`
        //                         insert into khachhang (ten_kh,so_dt,password,ngay_sinh,dia_chi,gioi_tinh,ngan_hang,so_tai_khoan,chu_tai_khoan,"references",loai_kh,chiet_khau,email)
        //                         values(
        //                             '${ten_kh}','${so_dt}','${encode_decode.EncodeString(so_dt,password)}','${ngay_sinh}','${dia_chi}',
        //                             '${gioi_tinh}','${ngan_hang}','${so_tai_khoan}','${chu_tai_khoan}',
        //                             N'${ references === undefined || references === null || references === '' ? DEFAULT_ID : references}',
        //                             N'${ references === undefined || references === null || references === '' ? 'F1' : 'F2'}',50,N'${email}'
        //                         )
        //                         `)
        //                         if(newQuery.rowCount > 0){
        //                             res.json({
        //                                 status:1,
        //                                 message:"Đăng ký thành công!"
        //                             })
        //                         }else{
        //                             res.json({
        //                                 status:0,
        //                                 message:"Đã có tài khoản trên hệ thống!"
        //                             })
        //                         }
        //                     }else{
        //                         res.json({
        //                             status:0,
        //                             message:"Mã giới thiệu không hợp lệ!"
        //                         })
        //                     }
        //                 }
               
        //             }else{
        //                 res.json({
        //                     status:0,
        //                     message:'Hết phiên thao tác người dùng',
        //                     data:[]
        //                 })
        //             }
        //         });
        //     } catch (error) {
        //         res.json({
        //             status:0,
        //             message:'Hết phiên thao tác người dùng',
        //             data:[]
        //         })
        //     }
        // })
        
    
        // Xử lý quên mật khẩu
    
        app.post('/QuenMatKhau/Admin'  , async (req,res)=>{
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
                        const {TaiKhoan} = req.body
                        console.log(TaiKhoan)
                        const newQuery = await pool.query(`
                            select * from tai_khoan
                            where tai_khoan = N'${TaiKhoan}'
                        `)
                        const MatKhau = randomstring.generate(15)
                        const updateUser = await pool.query(`
                        update tai_khoan
                        set mat_khau = N'${encode_decode.EncodeString(TaiKhoan,MatKhau)}'
                        where tai_khoan = N'${TaiKhoan}'`)
                        if(updateUser.rowCount > 0 ){
                            console.log(`[NEW][Hệ thống ${data.split('_')[0]}] Mật khẩu khôi phục tài khoản`)
                            var subject = `[NEW] [Hệ thống ${data.split('_')[0]}] Mật khẩu khôi phục tài khoản`
                            var text = `Tài khoản khôi phục của bạn\nTài khoản: ${newQuery.rows.map(x=>x.tai_khoan).toString()}\n Mật khẩu: ${MatKhau}`
                            
                            libs.SendMailGoogle(newQuery.rows.map(x=>x.email).toString(),subject,text)
        
                            res.json({
                                status: newQuery.rowCount > 0 ? 1 : 0,
                                message:newQuery.rowCount > 0 ? 'Thành công!' : 'Dữ liệu không có trong hệ thống!',
                                data: newQuery.rowCount > 0 ? newQuery.rows: []
                            })
                        }else{
                            res.json({
                                status:0,
                                message:"Lỗi cập nhập tài khoản"
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

    // 




        







}


