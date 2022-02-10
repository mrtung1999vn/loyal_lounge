
const pool = require('../../pgconnect')
var fs = require('fs')
var func = require('../../assets/func')
var encode_decode = require("../../assets/encode_decode")
const { timeNow, timeNowDB } = require('../../assets/TimeLibary')
var randomstring = require("randomstring");

module.exports = function (app){
    app.post('/GioHangKhach/:id_kh' , async (req,res)=>{
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

                    const {id_kh} = req.params
                    const newQuery = await pool.query(`select * from khachhang where id_kh = ${id_kh}`)
                    res.json({
                        status:1,
                        message:'Thành công!',
                        data:  encode_decode.EncodeJson(newQuery.rows)
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
            console.log(error)
            res.json({
                status:0,
                message:'Hết phiên thao tác người dùng',
                data:[]
            })
        }
    })

    // Đặt hàng 
    app.post(`/UpdateGioHang/:id_kh` , async (req,res)=>{
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

                    const {id_kh} = req.params
                    const {NEW_GioHangKH,TienGioHang} = req.body
                    const newData = []
                    const GioHangDat = []
                    // console.log(NEW_GioHangKH)
                    NEW_GioHangKH.map(x=>x.status === false ? newData.push(x) : GioHangDat.push(x))
                    // UPDATE CẬP NHẬP GIỎ HÀNG
                    console.log(GioHangDat)
                    const newQuery = await pool.query(`select * from khachhang where id_kh = ${id_kh} LIMIT 1`)
                    const UpdateGioHang = await pool.query(`
                    update khachhang set gio_hang = N'${JSON.stringify(newData)}'
                    where id_kh = ${id_kh} 
                    `)
                    console.log(UpdateGioHang)
                    // ĐẨY DỮ LIỆU ĐẶT 
                    // Tạo đơn hàng
                    var key_pr = randomstring.generate(5) + "_" + timeNow
                    console.log(timeNowDB)

                    const newQuery_TAODON = await pool.query(`
                        insert into don_hang(ngay,thanhtien,trangthai,key_pr,id_kh,image,so_can,so_khoi,phi_dich_vu,phu_phi,phi_noi_dia,tien_can,tien_khoi)
                        values('${timeNowDB}',0,N'Đang xử lý',N'${key_pr}',${id_kh},N'${GioHangDat[0].image}',0,0,0,0,0,${ newQuery.rows[0].tien_theo_can},${newQuery.rows[0].tien_theo_khoi})
                    `)
                    GioHangDat.map(async (x)=>{
                        console.log(x)
                        const newQuery_DATHANG = await pool.query(`
                            insert into don_hang_ct(
                                id_don,qty,price,image,web,note,ngay,title,status
                            )
                            values(
                                (select id_don from don_hang where key_pr = N'${key_pr}'),
                                ${x.qty},${x.price},N'${x.image}',N'${x.web}',N'${x.note}','${timeNowDB}',N'${x.title}',false
                            )
                        `)
                    },key_pr)
                    console.log(key_pr)
                    console.log(newData)
                    // Thông báo
                    const ten_KH = await pool.query(`
                        select ten_kh from khachhang
                        where id_kh = ${id_kh} LIMIT 1
                    `)
                    console.log(ten_KH.rows)
                    const newQuery_THONGBAO = await pool.query(`
                        insert into thong_bao(tieu_de,noi_dung,ngay,trang_thai_xem,loai_tb,id_kh)
                        values(N'[Đơn hàng chờ xử lý] ${ten_KH.rows[0].ten_kh}' ,N'Hiện tại đơn hàng khách ${ten_KH.rows[0].ten_kh} chờ xử lý','${timeNowDB}',false,N'Hệ thống',${id_kh})
                    `)
                    
                    
                    res.json({
                        status:1,
                        message:'Thành công!',
                        data:  encode_decode.EncodeJson(newData)
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
            console.log(error)
            res.json({
                status:0,
                message:'Hết phiên thao tác người dùng',
                data:[]
            })
        }
    })


   
}