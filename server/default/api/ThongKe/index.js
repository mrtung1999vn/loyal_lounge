const pool = require('../../pgconnect')
const express = require('express')
var fs = require("fs")
var jwt = require('jsonwebtoken');
var encode_decode = require("../../assets/encode_decode")


module.exports = function(app) {

        app.post(`/ThongKeTienDonHang/:page`, async(req, res) => {
                    try {
                        const { token,trangthai } = req.body
                        console.log(token,trangthai)
                        console.log("==========TESST")
                        fs.readFile('TenShop.txt', 'utf8', async(err, data) => {
                            
                                    if (err) throw res.json({
                                        status: 0,
                                        message: 'Hết phiên thao tác người dùng',
                                        data: []
                                    })
                                    console.log(token.split("*")[0])
                                    const checkToken = await pool.query(`select token_te from token where token_te = N'${token.split("*")[0]}'`)
                                        console.log(checkToken.rowCount)
                                    if (token.split("*")[1] === data && checkToken.rowCount > 0) {

                                 
                                        console.log("tesst")
                                        

                                        const {
                                            tim_theo_ten,
                                            tim_theo_ma,
                                            tim_theo_van,
                                            tu_ngay,
                                            den_ngay,
                                            trangthai
                                        } = req.body
                                            console.log({
                                                tim_theo_ten,
                                                tim_theo_ma,
                                                tim_theo_van,
                                                tu_ngay,
                                                den_ngay,
                                                trangthai
                                            })

                                        // 2021-08-01 pg
                                        const { page } = req.params
                                        console.log(page==='-1')
                                        const newQuery = await pool.query(`
                        select don_hang.ma_don,don_hang.van_don,khachhang.ten_kh,don_hang.ngay,
                        SUM(tong_tien)"tong_tien",
                        SUM(phi_noi_dia+phi_dich_vu+phu_phi)"chi_phi",
                        SUM(
                        so_khoi*tien_can+so_khoi*tien_khoi
                        )"tien_can_khoi"
                        from don_hang,khachhang
                        where don_hang.id_kh = khachhang.id_kh
                        ${tu_ngay === undefined ||  tu_ngay === null || tu_ngay === ''  ? '' : `and ngay >= '${tu_ngay}'`}
                        ${den_ngay === undefined || den_ngay === null || den_ngay === '' ? '' : `and ngay <= '${den_ngay}'`}
                        ${tim_theo_van === undefined || tim_theo_van === null || tim_theo_van === '' ? '' : `and don_hang.ma_don like N'%${tim_theo_ma}%'`}
                        ${trangthai === undefined || trangthai === "Tất cả" || trangthai === '' ? '' : `and don_hang.trangthai =N'${trangthai}'`}
                        ${tim_theo_van === undefined || tim_theo_van === null  || tim_theo_van === ''? '' : `and don_hang.van_don like N'%${tim_theo_van}%'`}
                        ${tim_theo_ten === undefined || tim_theo_ten === null || tim_theo_ten === '' ? '' : `and LOWER(convertTVkdau(khachhang.ten_kh)) LIKE LOWER(convertTVkdau('%${tim_theo_ten}%'))`}
                        GROUP BY khachhang.ten_kh,don_hang.ngay, don_hang.ma_don,don_hang.van_don
                        ORDER BY don_hang.ngay DESC
                        ${page==='-1' ? "": `LIMIT 10 OFFSET ${page === 1 ? 0 : parseInt((page-1)*10)}`}
                        
                    `)

                    // window.localStorage.setItem("tong_tien",)
                    // toi dang vao dc moi cai nay :)))
                    // Link kia đi bro =))
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
            console.log(error)
            res.json({
                status:0,
                message:'Hết phiên thao tác người dùng',
                data:[]
            })
        }
    })

    app.get("/TotalPageThongKeTienDon", async(req,res)=>{
        try {
            const newQuery = await pool.query(`
                select khachhang.ten_kh,
                SUM(tong_tien)"tong_tien",
                SUM(phi_noi_dia+phi_dich_vu+phu_phi)"chi_phi",
                SUM(
                    so_khoi*tien_can+so_khoi*tien_khoi
                )"tien_can_khoi"
                from don_hang,khachhang
                where
                don_hang.id_kh = khachhang.id_kh
                group by khachhang.ten_kh
            `)  
            res.json({
                status: newQuery.rowCount > 0 ? 1 : 0,
                data : Math.ceil(parseInt(newQuery.rowCount) /10),
                message :  newQuery.rowCount > 0 ? "Thành công!" : "Thất bại!"
            })


         
        } catch (error) {
            
        }
    })
}