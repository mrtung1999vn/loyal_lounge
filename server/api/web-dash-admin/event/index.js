const { lib } = require('crypto-js')
const fetch = require('node-fetch')
const { SendMailGoogle, checkRequest, SaveError, FunctionSqlInjection, FunctionSqlInjectionText } = require('../../../libs')

const jwt = require('jsonwebtoken');

const pool = require('../../../pgconnect')
const encode_decode = require('../../../assets/encode_decode')
const { timeNowDB } = require('../../../assets/TimeLibary')

module.exports = function (app) {

    app.get(`/WebDash/DanhSachEvent`, async (req, res) => {
        try {

            if (checkRequest(req.headers.origin)) {

                const ExcuteQuery = await pool.query(`
                    select * from su_kien
                `)

                res.json({
                    status: 1,
                    data: encode_decode.EncodeJson(ExcuteQuery.rows)
                })

            }
        } catch (error) {
            SaveError('web-dash-admin', '/WebDash/DanhSachEvent', error, 'GET', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })

    app.post(`/WebDash/DanhSachEvent`, async (req, res) => {
        try {
            const { NameEvent, Type, Price, Actors, Description, DateValue, Time, image, url } = req.body

            if (
                
                FunctionSqlInjectionText(NameEvent) ||
                FunctionSqlInjectionText(Type) ||
                FunctionSqlInjection(Price) ||
                FunctionSqlInjectionText(Actors) ||
                FunctionSqlInjectionText(Description) ||
                FunctionSqlInjectionText(DateValue) ||
                FunctionSqlInjectionText(Time) ||
                FunctionSqlInjectionText(url)

            ) {
                // console.log( "NameEvent", FunctionSqlInjectionText(NameEvent) )
                // console.log( "Type", FunctionSqlInjection(Type) )
                // console.log( "Price", FunctionSqlInjection(Price) )
                // console.log( "Actors", FunctionSqlInjection(Actors) )
                // console.log( "Description", FunctionSqlInjection(Description) )
                // console.log( "DateValue", FunctionSqlInjectionText(DateValue) )
                // console.log( "Time", FunctionSqlInjectionText(Time) )
                // console.log( "url", FunctionSqlInjectionText(url) )


                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'Lỗi phiên người dùng',
                    msg_en: 'User version error!'
                })
            } else {
                    const ExcuteQuery = await pool.query(`
                    insert into su_kien (ten_su_kien, thoi_gian_dien, created_at, updated_at, gia, the_loai, nguoi_tham_gia, noi_dung, status,link_anh)
                    values( N'${NameEvent}', N'${DateValue} ${Time}:00',now(),now(),${Price},N'${Type}',N'${Actors}',N'${Description}', false , N'${url}' )
                    `)
                    res.json({
                        status: 1,
                        data: [],
                        msg_vn: 'Sự kiện đã được tạo thành công!',
                        msg_en: 'Event has been created successfully!'
                    })
   



            }
        } catch (error) {

            console.log( error )

            SaveError('web-dash-admin', '/WebDash/DanhSachEvent', error, 'POST', JSON.stringify(req.headers), req.socket.remoteAddress)

            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })

    app.put(`/WebDash/DanhSachEvent`, async (req, res) => {
        try {
            const { NameEvent, Type, Price, Actors, Description, DateValue, Time, image, url, id_su_kien,status } = req.body

            console.log( { NameEvent, Type, Price, Actors, Description, DateValue, Time, image, url, id_su_kien,status } )
            if (
                FunctionSqlInjectionText(id_su_kien) ||
                FunctionSqlInjectionText(status) ||
                FunctionSqlInjectionText(NameEvent) ||
                FunctionSqlInjectionText(Type) ||
                FunctionSqlInjection(Price) ||
                FunctionSqlInjectionText(Actors) ||
                FunctionSqlInjectionText(Description) ||
                FunctionSqlInjectionText(DateValue) ||
                FunctionSqlInjectionText(Time) ||
                FunctionSqlInjectionText(url)

            ) {
                res.json({
                    status: 0,
                    data: [],
                    msg_vn: 'Lỗi phiên người dùng',
                    msg_en: 'User version error!'
                })
            } else {
                const ExcuteQuery = await pool.query(`
                    update su_kien set ten_su_kien = N'${NameEvent}',thoi_gian_dien = N'${DateValue} ${Time}:00',
                    updated_at = now(),gia = ${Price},
                    the_loai = N'${Type}', nguoi_tham_gia = N'${Actors}',noi_dung = N'${Description}',
                    status = ${status}, link_anh = N'${url}'
                    where id_su_kien = ${id_su_kien}
                `)

                res.json({
                    status: 1,
                    data: [],
                    msg_vn: 'Sửa thành công!',
                    msg_en: 'Success!'
                })
            }
        } catch (error) {
            SaveError('web-dash-admin', '/WebDash/DanhSachEvent', error, 'PUT', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })

    app.delete(`/WebDash/DanhSachEvent`, async (req, res) => {
        try {
            const { id_su_kien } = req.body
            if (FunctionSqlInjection(id_su_kien)) {
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
            SaveError('web-dash-admin', '/WebDash/DanhSachEvent', error, 'DELETE', JSON.stringify(req.headers), req.socket.remoteAddress)
            res.json({
                status: 0,
                data: [],
                msg_vn: 'Lỗi hệ thống',
                msg_en: 'System error'
            })
        }
    })


}