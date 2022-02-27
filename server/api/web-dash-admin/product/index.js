const { lib } = require('crypto-js')
const fetch = require('node-fetch')
const { SendMailGoogle, checkRequest, SaveError, FunctionSqlInjection, FunctionSqlInjectionText } = require('../../../libs')

const jwt = require('jsonwebtoken');

const pool = require('../../../pgconnect')
const encode_decode = require('../../../assets/encode_decode')
const { timeNowDB } = require('../../../assets/TimeLibary')

module.exports = function (app) {

    app.get(`/WebDash/DanhSachProduct`, async (req, res) => {
        try {

            if (checkRequest(req.headers.origin)) {

                const ExcuteQuery = await pool.query(`
                    select * from san_pham, loai_sp
                    where loai_sp.id_loai_sp = san_pham.id_loai_sp 
                `)

                const ExcuteQueryTypeProduct = await pool.query(`
                    select * from loai_sp
                `)

                // console.log( ExcuteQuery.rows )

                res.json({
                    status: 1,
                    data: encode_decode.EncodeJson(ExcuteQuery.rows),
                    dataTypeProduct: encode_decode.EncodeJson(ExcuteQueryTypeProduct.rows)
                })

            }
        } catch (error) {
            SaveError('web-dash-admin', '/WebDash/DanhSachProduct', error, 'GET', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })


    app.get(`/WebDash/DanhSachProduct/TypeProduct/:id`, async (req, res) => {
        try {
            if (checkRequest(req.headers.origin)) {
                const { id } = req.params

                const ExcuteQuery = await pool.query(`
                    select * from san_pham,loai_sp
                    where loai_sp.id_loai_sp = san_pham.id_loai_sp 
                    and loai_sp.id_loai_sp = ${id}
                `)

                const ExcuteQueryTypeProduct = await pool.query(`
                    select * from loai_sp
                `)

                res.json({
                    status: 1,
                    data: encode_decode.EncodeJson(ExcuteQuery.rows),
                    dataTypeProduct: encode_decode.EncodeJson(ExcuteQueryTypeProduct.rows)
                })
            }
        } catch (error) {
            console.log(error)
        }
    })

    app.post(`/WebDash/DanhSachProduct`, async (req, res) => {
        try {
            const { chooseTypeProduct, Description, Price, Amount, url, NameProduct } = req.body

            console.log({ chooseTypeProduct, Description, Price, Amount, url, NameProduct })

            if (
                !checkRequest(req.headers.origin) ||
                FunctionSqlInjectionText(chooseTypeProduct) ||
                FunctionSqlInjection(Price) ||
                FunctionSqlInjection(Amount) ||
                FunctionSqlInjectionText(Description) ||
                FunctionSqlInjectionText(NameProduct) ||
                FunctionSqlInjectionText(url)

            ) {
                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'Lỗi phiên người dùng',
                    msg_en: 'User version error!'
                })
            } else {
                const CheckQuery = await pool.query(`
                        select * from san_pham
                        where ten_sp = N'${NameProduct}'
                    `)
                if (CheckQuery.rowCount > 0) {
                    res.json({
                        status: 1,
                        data: [],
                        msg_vn: 'Đã có tên sản phẩm',
                        msg_en: 'Product has been created successfully!'
                    })
                } else {
                    const ExcuteQuery = await pool.query(`
                        insert into san_pham (ten_sp,created_at,updated_at,noi_dung,gia_sp,hinh_anh,so_luong,id_loai_sp)
                        values(
                            N'${NameProduct}',now(),now(),N'${Description}',${Price},N'${url}',${Amount},${chooseTypeProduct}
                        )
                        
                        `)
                    res.json({
                        status: 1,
                        data: [],
                        msg_vn: 'Sự kiện đã được tạo thành công!',
                        msg_en: 'Product has been created successfully!'
                    })

                }



            }
        } catch (error) {

            console.log(error)

            SaveError('web-dash-admin', '/WebDash/DanhSachProduct', error, 'POST', JSON.stringify(req.headers), req.socket.remoteAddress)

            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })

    app.put(`/WebDash/DanhSachProduct`, async (req, res) => {
        try {
            const { IDProduct, IDTypeProduct, Description, Price, Amount, image, NameProduct } = req.body

            console.log({ IDProduct, IDTypeProduct, Description, Price, Amount, image, NameProduct })
            if (
                !checkRequest(req.headers.origin) ||
                FunctionSqlInjectionText(Description) ||
                FunctionSqlInjection(Price) ||
                FunctionSqlInjection(Amount) ||
                FunctionSqlInjectionText(image) ||
                FunctionSqlInjectionText(NameProduct) ||
                FunctionSqlInjection(IDProduct) ||
                FunctionSqlInjection(IDTypeProduct) 
            ) {
                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'Lỗi phiên người dùng',
                    msg_en: 'User version error!'
                })
            } else {
                const ExcuteQuery = await pool.query(`
                    update san_pham set ten_sp = N'${NameProduct}',noi_dung = N'${Description}',
                    gia_sp = ${Price}, hinh_anh = N'${image}',so_luong = ${Amount},
                    id_loai_sp = ${IDTypeProduct}
                    where id_sp = ${IDProduct}
                
                `)

                res.json({
                    status: 1,
                    data: [],
                    msg_vn: 'Sửa thành công!',
                    msg_en: 'Success!'
                })
            }
        } catch (error) {
            SaveError('web-dash-admin', '/WebDash/DanhSachProduct', error, 'PUT', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })

    app.delete(`/WebDash/DanhSachProduct`, async (req, res) => {
        try {
            const { id_su_kien } = req.body
            if (
                !checkRequest(req.headers.origin) ||
                FunctionSqlInjection(id_su_kien)) {
                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'Lỗi phiên người dùng',
                    msg_en: 'User version error!'
                })
            } else {
                const ExcuteQuery = await pool.query(`
                    delete from su_kien where id_su_kien = ${id_su_kien}
                `)
                res.json({
                    status: 1,
                    data: [],
                    msg_vn: 'Xóa thành công!',
                    msg_en: 'Success!'
                })
            }
        } catch (error) {
            SaveError('web-dash-admin', '/WebDash/DanhSachProduct', error, 'DELETE', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })


}