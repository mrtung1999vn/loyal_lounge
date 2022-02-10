const { lib } = require('crypto-js')
const fetch = require('node-fetch')
const { EncodeJson, DecodeString_AES, DecodeJson, DecodeJsonRequest, EncodeString, EncodeString_AES, DecodeString } = require('../../assets/encode_decode')
const { SendMailGoogle } = require('../../libs')

var token = "Token k0iI4jjVSEtdddZkIG4naDOW4kcZLbz0"
var token_01 = "Token ALfPoYpBJh1TUVilppJKCsgMX362Gtfx"


const pool = require('../../pgconnect')
const encode_decode = require('../../assets/encode_decode')
const {timeNowDB} = require('../../assets/TimeLibary')
const moment = require('moment')
function getUrlDeep(url,user){
    var url_deep = "https://go.isclix.com/deep_link/5703534921071602576?utm_source=facebook&utm_content=user-01"
    return url_deep + `&url=${encodeURIComponent(url)}`
}



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



console.log(getUrlDeep("https://vaytienloi.com/"))

// Id ten ten hoangtochp
// Mk Thanhan-2901
// Access  hoangtochp
// Mk thanhan2901
// Top1mmo Hoangtochp
// Mk thanhan2901 or Thanhan2901


module.exports = function(app){
    function numberTimeNow(n){return n.toString().length ===1 ? `0${n}`: n}

    function preDays(dateObj, numDays) {
        dateObj.setDate(dateObj.getDate() - numDays);
        return dateObj;
    }

    function nextDays(dateObj, numDays) {
        dateObj.setDate(dateObj.getDate() + numDays);
        return dateObj;
    }

    const date = new Date(nextDays(new Date(),2))
    // const timeNow = `${(date).getDate()}-${(date).getMonth()+1}-${(date).getFullYear()} ${(date).getHours()}:${(date).getMinutes()}:${(date).getSeconds()}`
    const timeNowDBTRANED = `${(date).getFullYear()}-${numberTimeNow((date).getMonth()+1)}-${numberTimeNow((date).getDate())} ${numberTimeNow((date).getHours())}:${numberTimeNow((date).getMinutes())}:${numberTimeNow((date).getSeconds())}`

    const datePre = new Date(preDays(new Date(),2))

    const timeDayPre = `${(datePre).getDate()}-${(datePre).getMonth()+1}-${(datePre).getFullYear()} ${(datePre).getHours()}:${(datePre).getMinutes()}:${(datePre).getSeconds()}`
    const timeDayPreDB = `${(datePre).getFullYear()}-${numberTimeNow((datePre).getMonth()+1)}-${numberTimeNow((datePre).getDate())} ${numberTimeNow((datePre).getHours())}:${numberTimeNow((datePre).getMinutes())}:${numberTimeNow((datePre).getSeconds())}`
    const dateTimeNowDB01 = new Date()
    const dateNowDB01 = `${(dateTimeNowDB01).getFullYear()}-${numberTimeNow((dateTimeNowDB01).getMonth()+1)}-${numberTimeNow((dateTimeNowDB01).getDate())} ${numberTimeNow((dateTimeNowDB01).getHours())}:${numberTimeNow((dateTimeNowDB01).getMinutes())}:${numberTimeNow((dateTimeNowDB01).getSeconds())}`

    function convertTime(str){
        const date = new Date(str)
        // console.log()
        return `${(date).getDate()}-${(date).getMonth()+1}-${(date).getFullYear()} ${(date).getHours()}:${(date).getMinutes()}:${(date).getSeconds()}`
    }
    function convertTimeDateTime(time){
        return `${time.split(" ")[0].split("-")[2]}-${time.split(" ")[0].split("-")[1].length === 1 ? "0" : ""}${time.split(" ")[0].split("-")[1]}-${time.split(" ")[0].split("-")[0].length === 1 ? "0" : ""}${time.split(" ")[0].split("-")[0]}`
    }

    // Trạng thái 2 Đã bị huỷ (status)
    // Trạng thái 1 Được duyệt (status) ||  is_confirmed = 1 
    // Trạng thái 1 Tạm duyệt (status)  ||  is_confirmed = 0
    // Trạng thái 0 Chờ xử lý (status)
    // 
    const engineUpdateGiaoDich = async (token)=>{
        try {
            // console.log(`https://api.accesstrade.vn/v1/transactions?update_time_start=${timeDayPreDB.split(' ')[0]}T00:00:00Z&update_time_end=${timeNowDBTRANED.split(' ')[0]}T00:00:00Z&limit=1000&page=1`)
            const response = await fetch(`https://api.accesstrade.vn/v1/transactions?update_time_start=${timeDayPreDB.split(' ')[0]}T00:00:00Z&update_time_end=${timeNowDBTRANED.split(' ')[0]}T00:00:00Z&limit=1000&page=1`,
            {
                headers: { "Content-Type": "application/json" ,
                            "Authorization": token},
            })
            const JsonData = await response.json()
            // console.log(JsonData)
            let totalPage = JsonData.total_page
            console.log(totalPage)
            for(let i=0;i<=parseInt(totalPage);i++){
                console.log(`https://api.accesstrade.vn/v1/transactions?update_time_start=${timeDayPreDB.split(' ')[0]}T00:00:00Z&update_time_end=${timeNowDBTRANED.split(' ')[0]}T00:00:00Z&limit=1000&page=${i+1}`)
                const response = await fetch(`https://api.accesstrade.vn/v1/transactions?update_time_start=${timeDayPreDB.split(' ')[0]}T00:00:00Z&update_time_end=${timeNowDBTRANED.split(' ')[0]}T00:00:00Z&limit=1000&page=${i+1}`,
                {
                    headers: { "Content-Type": "application/json" ,
                                "Authorization": token},
                })
                const JsonData = await response.json()
                // 
                JsonData.data.map(async (x)=>{
                    const checkData = await pool.query(`
                        select * from transaction where transaction_id = N'${x.transaction_id}'
                    `)
                    if(checkData.rowCount > 0){
                        // console.log( x.is_confirmed)
                        // console.log(checkData.rows[0].status !== x.status || checkData.rows[0].is_confirmed !== x.is_confirmed)
                        // if( checkData.rows[0].status !== x.status || checkData.rows[0].is_confirmed !== x.is_confirmed){
                            // console.log(checkData.rows[0].status !== x.status || checkData.rows[0].is_confirmed !== x.is_confirmed)
                            const Update = await pool.query(`UPDATE transaction set status= ${x.status},
                            is_confirmed = ${x.is_confirmed}
                            where transaction_id = N'${x.transaction_id}'
                            `)
                        // }
                    }else{
                     
                        try{
                            const newData = await pool.query(`
                            insert into transaction(
                                transaction_id,product_name,transaction_time,commission,product_quantity,
                                status,is_confirmed,product_id,product_price,device_type,utm_campaign,product_category,
                                utm_content,transaction_value,utm_source,click_url,merchant,price_value_kh,ngay,trang_thai_chot
                            )
                            values(
                                N'${x.transaction_id}',N'${x.product_name}',N'${x.transaction_time}',${x.commission},${x.product_quantity},${x.status},
                                ${x.is_confirmed},N'${x.product_id}',${x.product_price},N'${x._extra.device_type}',N'${x.utm_campaign}',N'${x.product_category}',
                                N'${x.utm_content}',${x.transaction_value},N'${x.utm_source}',N'${x.click_url}',N'${x.merchant}',${0},'${x.transaction_time.split('T')[0] + " " + x.transaction_time.split('T')[1]}',
                                false
                            )
                            `)
                        }catch(error){
    
                        }
                         
                      
                    }
                })
                // 
            }
            
        
        } catch (error) {
            console.log(error)
        }
    }
    const UPDATEDSGiaoDich = async (req,res)=>{
        // ACCESSTRANDE
        engineUpdateGiaoDich(token)
        engineUpdateGiaoDich(token_01)
        engineUpdateFindo()
        // ACCESSTRANDE
    }
    const convertFin = data =>{
        return `${data.split(" ")[0].split('-')[2]}-${data.split(" ")[0].split('-')[1]}-${data.split(" ")[0].split('-')[0]} ${data.split(" ")[1]}`
      }
    const engineUpdateFindo = async ()=>{
        try{
            const response = await fetch(`https://publisher-api.riofintech.net/v1/conversions?publisher_id=hoangtochp&token=%2F2UMOawI4iodzRM6AwMvbw%3D%3D&date_from=01-12-2021%2000%3A00%3A00&date_to=31-12-2021%2023%3A59%3A59`)

            const JsonData= await response.json()

            if( JsonData.status === 1){
                JsonData.data.map( async ( x )=>{
                    // console.log(x)
                    const checkData = await pool.query(`
                    select * from transaction where transaction_id = N'${x.conversion_id}'
                    `)
                    if( checkData.rowCount > 0 ){
                        const Update = await pool.query(`UPDATE transaction set status= ${x.conversion_status_code === 1 ? 1 : 0},
                        is_confirmed = ${1}
                        where transaction_id = N'${x.conversion_id}'
                        `)
                    }else{
                        
                        try{
                            // console.log( `
                            // insert into transaction(
                            //     transaction_id,product_name,transaction_time,commission,product_quantity,
                            //     status,is_confirmed,product_id,product_price,device_type,utm_campaign,product_category,
                            //     utm_content,transaction_value,utm_source,click_url,merchant,price_value_kh,ngay,trang_thai_chot
                            // )
                            // values(
                            //     N'${x.conversion_id}',N'${x.offer_id}',N'${convertFin(x.conversion_date)}',${x.conversion_publisher_payout},${x.conversion_time},${x.conversion_status_code},
                            //     ${x.conversion_status_code},N'${x.offer_id}',${x.conversion_publisher_payout},N'${'mobile'}',N'${x.offer_id}',N'${x.offer_id}',
                            //     N'${x.aff_sub1}',${x.conversion_id},N'${x.aff_sub1}',N'${x.click_id}',N'${x.offer_id}',${0},'${convertFin(x.conversion_date)}',
                            //     false
                            // )
                            // ` )
                            const newData = await pool.query(`
                            insert into transaction(
                                transaction_id,product_name,transaction_time,commission,product_quantity,
                                status,is_confirmed,product_id,product_price,device_type,utm_campaign,product_category,
                                utm_content,transaction_value,utm_source,click_url,merchant,price_value_kh,ngay,trang_thai_chot
                            )
                            values(
                                N'${x.conversion_id}',N'${x.offer_id}',N'${convertFin(x.conversion_date)}',${x.conversion_publisher_payout},${x.conversion_time},${x.conversion_status_code},
                                ${x.conversion_status_code},N'${x.offer_id}',${x.conversion_publisher_payout},N'${'mobile'}',N'${x.offer_id}',N'${x.offer_id}',
                                N'${x.aff_sub1}',${x.conversion_time},N'${x.aff_sub1}',N'${x.click_id}',N'${x.offer_id}',${0},'${convertFin(x.conversion_date)}',
                                false
                            )
                            `)
                        }catch(error){
                            // console.log(error)
                        }
                    }
                })
            }

        }catch(error){
            console.log(error)
        }
    }
    // engineUpdateFindo()
    const engigeDSGiaoDich = async (token)=>{
        try{
            // console.log(`https://api.accesstrade.vn/v1/transactions?since=${timeDayPreDB.split(' ')[0]}T00:00:00Z&until=${timeNowDBTRANED.split(' ')[0]}T00:00:00Z&limit=1000&page=1`)
            const response = await fetch(`https://api.accesstrade.vn/v1/transactions?since=${timeDayPreDB.split(' ')[0]}T00:00:00Z&until=${timeNowDBTRANED.split(' ')[0]}T00:00:00Z&limit=1000&page=1`,
            {
                headers: { "Content-Type": "application/json" ,
                            "Authorization": token},
            })
            
            
            const JsonData = await response.json()
            let totalPage = JsonData.total_page
            // console.log(totalPage)
            for(let i=0;i<=parseInt(totalPage);i++){
                // console.log(`https://api.accesstrade.vn/v1/transactions?since=${timeDayPreDB.split(' ')[0]}T00:00:00Z&until=${timeNowDBTRANED.split(' ')[0]}T00:00:00Z&limit=1000&page=${i+1}`)
                const response = await fetch(`https://api.accesstrade.vn/v1/transactions?since=${timeDayPreDB.split(' ')[0]}T00:00:00Z&until=${timeNowDBTRANED.split(' ')[0]}T00:00:00Z&limit=1000&page=${i+1}`,
                {
                    headers: { "Content-Type": "application/json" ,
                                "Authorization": token},
                })
                

                // 
                JsonData.data.map(async (x)=>{
                    const checkData = await pool.query(`
                        select * from transaction where transaction_id = N'${x.transaction_id}'
                    `)
                    if(checkData.rowCount > 0){
                        // if( checkData.rows[0].status !== x.status || checkData.rows[0].is_confirmed !== x.is_confirmed){
                            const Update = await pool.query(`UPDATE transaction set status= ${x.status},
                            is_confirmed = ${x.is_confirmed}
                            where transaction_id = N'${x.transaction_id}'
                            `)
                        // }
                    }else{
                     
                        try{
                            const newData = await pool.query(`
                            insert into transaction(
                                transaction_id,product_name,transaction_time,commission,product_quantity,
                                status,is_confirmed,product_id,product_price,device_type,utm_campaign,product_category,
                                utm_content,transaction_value,utm_source,click_url,merchant,price_value_kh,ngay,trang_thai_chot
                            )
                            values(
                                N'${x.transaction_id}',N'${x.product_name}',N'${x.transaction_time}',${x.commission},${x.product_quantity},${x.status},
                                ${x.is_confirmed},N'${x.product_id}',${x.product_price},N'${x._extra.device_type}',N'${x.utm_campaign}',N'${x.product_category}',
                                N'${x.utm_content}',${x.transaction_value},N'${x.utm_source}',N'${x.click_url}',N'${x.merchant}',${0},'${x.transaction_time.split('T')[0] + " " + x.transaction_time.split('T')[1]}',
                                false
                            )
                            `)
                        }catch(error){
    
                        }
                         
                      
                    }
                })
                // 
            }
            UPDATEDSGiaoDich()
        }catch(error){

        }
    }


    app.get(`/DanhSachGiaoDich`,async(req,res)=>{
        try{
            // ACCESSTRANDE
            engigeDSGiaoDich(token)
            engigeDSGiaoDich(token_01)
            res.json("")
            // ACCESSTRANDE
        }catch(error){  
            console.log(error)
        }
    })
    // approval : successful : Đă đăng ký
    //  successful : Đă đăng ký
    
    app.get(`/DanhSachDoiTac` , async(req,res)=>{
        try {
            const response = await fetch(`https://api.accesstrade.vn/v1/campaigns?limit=50&page=1&approval=successful`,
            {
                headers: { "Content-Type": "application/json" ,
                            "Authorization": token},
            })
            
        
            const JsonData = await response.json()
            let totalPage = JsonData.total_page

            for(let i=0;i<=parseInt(totalPage);i++){
                const _response = await fetch(`https://api.accesstrade.vn/v1/campaigns?limit=50&page=${i+1}&approval=successful`,
                {
                    headers: { "Content-Type": "application/json" ,
                                "Authorization": token},
                })
                const _JsonData = await _response.json()
                _JsonData.data.map(async (data)=>{
                    var x = data
                    
                    setTimeout(async ()=>{
                        try{
                            const CheckData = await pool.query(`
                                select * from campaigns 
                                where id = '${x.id}'
                            `)
                            if(CheckData.rowCount > 0){
                                if(CheckData.rows[0].status !== x.status && CheckData.rows[0].approval !== x.approval){
                                    const CapNhap = await pool.query(`
                                        update campaigns
                                        set approval = N'${x.approval}',
                                        status = ${x.status},
                                        max_com = '${x.max_com}'
                                        where id = ${x.id}
                                    `)
                                }
                            }else{
                                const newData = await pool.query(`
                                insert into campaigns(
                                    approval,category,id,logo,merchant,name,scope,start_time,status,sub_category,url,
                                    action_point,commission_policy,cookie_policy,introduction,other_notice,rejected_reason,traffic_building_policy,
                                    price,trang_thai_chot
                                )
                                values(
                                    N'${x.approval}',
                                    N'${x.category}',${x.id},N'${x.logo}',N'${x.merchant}',N'${x.name}',N'${x.scope}',N'${x.start_time}',${x.status},N'${x.sub_category}',N'${x.url}',
                                    N'${x.description.action_point}',N'${x.description.commission_policy}',N'${x.description.cookie_policy}',N'${x.description.introduction}',N'${x.description.other_notice}'
                                    ,N'${x.description.rejected_reason}',
                                    N'${x.description.traffic_building_policy}', 0,false
                                )
                                `)
                            }
                        } catch(error){
    
                        }
                    },1000)
                 
                })
            }
            
            // console.log(JsonData.data.length)
            res.json("")
        } catch (error) {
            console.log(error)
        }
    })







    // Trạng thái 2 Đã bị huỷ (status)
    // Trạng thái 1 Được duyệt (status) &&  is_confirmed = 1 
    // Trạng thái 1 Tạm duyệt (status)  &&  is_confirmed = 0
    // Trạng thái 0 Chờ xử lý (status)
    // HienThiDSGiaoDich
    app.get(`/HienThiDSGiaoDich` , async (req,res)=>{
        try {
            // commission
            // Xử lý
            const newData = await pool.query(`
                select *,(commission*chiet_khau/100)"hoa_hong" from "transaction"
                order by transaction_time desc
            `)
            // 
            // status
            
            // JsonData = newData.rows
            res.json(newData.rows)
            // 
        } catch (error) {
            
        }
    })


    app.post(`/TimKiemLocDSGiaoDich` ,async (req,res)=>{
        try {
            const {ngay_bat_dau,ngay_ket_thuc} = req.body
            console.log({ngay_bat_dau,ngay_ket_thuc})
            console.log(`
            select *,(commission*chiet_khau/100)"hoa_hong" from "transaction"
            where true 
            ${ngay_bat_dau === undefined ||
                ngay_bat_dau === undefined ||
                ngay_bat_dau === undefined  ? '' : ` and transaction_time >= '${ngay_bat_dau}'`
            }

            ${ngay_ket_thuc === undefined ||
                ngay_ket_thuc === undefined ||
                ngay_ket_thuc === undefined  ? '' : ` and transaction_time <= '${ngay_ket_thuc}'`
            }
                order by transaction_time desc
            `)
            const newData = await pool.query(`
            select *,(commission*chiet_khau/100)"hoa_hong" from "transaction"
            where true 
            ${ngay_bat_dau === undefined ||
                ngay_bat_dau === undefined ||
                ngay_bat_dau === undefined  ? '' : ` and transaction_time >= '${ngay_bat_dau}'`
            }

            ${ngay_ket_thuc === undefined ||
                ngay_ket_thuc === undefined ||
                ngay_ket_thuc === undefined  ? '' : ` and transaction_time <= '${ngay_ket_thuc}'`
            }
                order by transaction_time desc
            `)

            res.json(newData.rows)
        } catch (error) {
            
        }
    })

    app.get(`/HienThiDanhSachDoiTac` , async (req,res)=>{
        try {
            const newData = await pool.query(`
                select * from campaigns
            `)
            res.json(newData.rows)
        } catch (error) {
            
        }
    })

    app.get(`/HienThiDanhSachDoiTac/LocNganh/:nganh` , async (req,res)=>{
        try {
            
            const {nganh} = req.params
            const newData = await pool.query(`
                select * from campaigns
                where nganh = N'${nganh}'
            `)

            res.json(newData.rows)
        } catch (error) {
            console.log(error)
        }
    })



    // https://go.isclix.com/deep_link/5703534921071602576/5567176079083000596?utm_content=user-01&url=https%3A%2F%2Ftienoi.com.vn%2F

    app.get(`/Loc/DanhSachDoiTac/:trangthai` , async(req,res)=>{
        try {   
            const {trangthai} = req.params

            const newData = await pool.query(`
                select * from campaigns
                where approval = '${trangthai}'
            `)
            res.json({
                status : newData.rowCount >= 0 ? 1 : 0,
                data : newData.rowCount >= 0 ? newData.rows : []
            })

        } catch (error) {
            
        }
    })

    app.get(`/Loc/DanhSachDoiTac/Ten/:ten` , async(req,res)=>{
        try {
            const {ten} = req.params
            const newData = await pool.query(`
                select * from campaigns
                where LOWER(convertTVkdau(name)) LIKE LOWER(convertTVkdau('%${ten}%'))
            `)

            res.json({
                status : newData.rowCount >= 0 ? 1 : 0,
                data : newData.rowCount >= 0 ? newData.rows : []
            })
        } catch (error) {
            
        }
    })







    //#region Dashboard

    app.get(`/DSGiaoDich/KH/:id_kh`, async(req,res)=>{
        try {
            const {id_kh} = req.params

            const newQuery = await pool.query(`
                select * from "transaction"
                where utm_content = N'user-${id_kh}'
                order by transaction_time desc
            `)
		//res.json(newQuery.rows)
            res.json({
                status: newQuery.rowCount >= 0 ? 1 : 0,
                data : newQuery.rowCount >= 0 ? newQuery.rows : []
            })

        } catch (error) {
            console.log(error)
        }
    })

    //#endregion


    //#region Hệ thống giới thiệu
    
    app.get(`/DanhSachHeThong/:id_kh` , async(req,res)=>{
        try {
            const {id_kh} = req.params

            const newquery_F1 = await pool.query(`
                select * from khachhang where
                "references" = N'${id_kh}'
            `)
            // F1

            const hoaHongNow = await pool.query(`
                select utm_content,SUM(hoa_hong)"hoa_hong" from "transaction" t
                where t.ngay >= CURRENT_DATE
                and t.hoa_hong is not null
                group by utm_content
            `)

            // console.log( 
            //     hoaHongNow.rows[
            //         hoaHongNow.rows.findIndex( dl => dl.utm_content === `user-123` )   
            //     ]
            // )
            const hoaHongHomQua = await pool.query(`
                select utm_content,SUM(hoa_hong)"hoa_hong" from "transaction" t
                where t.ngay >= CURRENT_DATE - 1
                and t.ngay < CURRENT_DATE
                and t.hoa_hong is not null
                group by utm_content
            `)
            const newData = []
             
            newquery_F1.rows.map(async (x,index)=>{

                // Check F1
                newData.push({
                    id_kh:x.id_kh,
                    ten_kh:x.ten_kh,
                    so_dt:x.so_dt,
                    tien_chot:x.tien_chot,
                    loai_tk:'F1',

                    doanh_thu_hom_nay: hoaHongNow.rows.findIndex( dl => dl.utm_content === `user-${x.id_kh}` ) >= 0 
                    ?    
                    hoaHongNow.rows[
                        hoaHongNow.rows.findIndex( dl => dl.utm_content === `user-${x.id_kh}` )   
                    ].hoa_hong
                    : 0,

                    doanh_thu_hom_qua: hoaHongHomQua.rows.findIndex( dl => dl.utm_content === `user-${x.id_kh}` ) >= 0 
                    ?    
                    hoaHongHomQua.rows[
                        hoaHongHomQua.rows.findIndex( dl => dl.utm_content === `user-${x.id_kh}` )   
                    ].hoa_hong
                    : 0
                })
                // console.log( newData )
                const newQuery = await pool.query(`
                    select * from khachhang where "references" = N'${x.id_kh}'
                `)

                // Check F2
                newQuery.rows.map(async (y)=>
                newData.findIndex(dl=>dl.so_dt === y.so_dt) >= 0 ? "" :
                newData.push({
                    id_kh:y.id_kh,
                    ten_kh:y.ten_kh,
                    so_dt:y.so_dt,
                    tien_chot:y.tien_chot,
                    loai_tk:'F2',


                    doanh_thu_hom_nay: hoaHongNow.rows.findIndex( dl => dl.utm_content === `user-${x.id_kh}` ) >= 0 
                    ?    
                    hoaHongNow.rows[
                        hoaHongNow.rows.findIndex( dl => dl.utm_content === `user-${x.id_kh}` )   
                    ].hoa_hong
                    : 0,

                    doanh_thu_hom_qua: hoaHongHomQua.rows.findIndex( dl => dl.utm_content === `user-${x.id_kh}` ) >= 0 
                    ?    
                    hoaHongHomQua.rows[
                        hoaHongHomQua.rows.findIndex( dl => dl.utm_content === `user-${x.id_kh}` )   
                    ].hoa_hong
                    : 0

                }))
                if(index + 1 === newquery_F1.rowCount){
                    // console.log(newData)
                    let tien_gioi_thieu = 0 
                    // console.log(newData)

                    

                    newData.map(x=>tien_gioi_thieu += (x.loai_tk === 'F1' ? (x.tien_chot*0.1) : (x.tien_chot*0.09)) )
                    
                    // console.log(tien_gioi_thieu)
                    const update_tien_gioi_thieu = await pool.query(`
                        update khachhang set tien_gioi_thieu = ${tien_gioi_thieu}
                        where id_kh = ${id_kh}
                    `)
                    const DataTong = [...newData] 


                    const DataKH = await pool.query(`select * from khachhang`)

                    const DataDoanhThu = []

                    DataKH.rows.map( x=> DataDoanhThu.push({
                        id_kh: x.id_kh,
                        loai_kh: x.loai_kh,
                        ten_kh: x.ten_kh,
                        tien_chot: x.tien_chot,
                        doanh_thu_hom_nay: hoaHongNow.rows.findIndex( dl => dl.utm_content === `user-${x.id_kh}` ) >= 0 
                        ?    
                        hoaHongNow.rows[
                            hoaHongNow.rows.findIndex( dl => dl.utm_content === `user-${x.id_kh}` )   
                        ].hoa_hong
                        : 0,
    
                        doanh_thu_hom_qua: hoaHongHomQua.rows.findIndex( dl => dl.utm_content === `user-${x.id_kh}` ) >= 0 
                        ?    
                        hoaHongHomQua.rows[
                            hoaHongHomQua.rows.findIndex( dl => dl.utm_content === `user-${x.id_kh}` )   
                        ].hoa_hong
                        : 0
                    }) )

                    res.json({
                        status: newData.length > 0 ? 1 : 0,
                        data: newData.length > 0 ? newData : [],
                        data_QT : DataDoanhThu.length > 0 ? DataDoanhThu : []
                        
                    })
                } 
            })
            // F2

        } catch (error) {
            console.log(error)
        }
    })
    //#endregion



    //#region Nạp tiền

    app.get(`/ThongTinKhachHang/:id_kh` , async(req,res)=>{
        try {
            const {id_kh} = req.params
            const newQuery = await pool.query(`
            select * from khachhang
            where id_kh = ${id_kh}
            `)

            res.json({
                status: newQuery.rowCount > 0 ? 1 : 0,
                data: newQuery.rowCount > 0 ? 
                EncodeJson(newQuery.rows)
                 : []
            })
        } catch (error) {
            
        }
    })

    const _DecodeRequest = (string)=>{
        return DecodeJsonRequest(DecodeString_AES("0366262072",string))
    }
    app.get(`/GuiMaOTPThanhToan/:id_kh` , async(req,res)=>{
        try {   
            const {id_kh} = req.params
            console.log(_DecodeRequest(req.headers.token))
            const token = _DecodeRequest(req.headers.token)
            // console.log(res)
            if(token[0].key === 'ABCXYZ'){
                console.log("GUI OTP")
                const newQuery = await pool.query(`
                    select * from khachhang where id_kh = ${id_kh}
                `)
                if(newQuery.rowCount > 0){
                    var randomNumber = getRandomInt(9999)
                    SendMailGoogle(newQuery.rows.map(x=>x.email)[0],'[NEW] Dịch vụ MCTOP 1',`Nhập mã OTP : ${randomNumber}`)
                    // console.log(EncodeString('0366262072', randomNumber))
                    var encode_otp = EncodeString('0366262072', randomNumber.toString())
                    // console.log(encode_otp)
                    res.json({
                        status:1,
                        otp: encode_otp,
                        // OTP: randomNumber
                    })
                }else{
                    res.json({
                        status: 0,
                        message:"Bạn xem API như thế này thì hiếp tôi luôn đi =))"
                    })
                }
            }else{

                res.json({
                    status: 0,
                    message:"Bạn xem API như thế này thì hiếp tôi luôn đi =))"
                })
            }   
        } catch (error) {
            res.json({
                status: 0,
                message:"Bạn xem API như thế này thì hiếp tôi luôn đi =))"
            })
            console.log(error)
        }
    })

    app.get(`/MC_TOP1/DSNapTienKhachHang` ,async (req,res)=>{
        try {
            const newQuery = await pool.query(`
                select * from nap_tien,khachhang
                where nap_tien.id_kh  = khachhang.id_kh 
            `)
          
            res.json(newQuery.rows)
        } catch (error) {
            
        }
    })

    app.get(`/MC_TOP1/DSNapTienKhachHang/KH/:id_kh`, async (req,res)=>{
        try {
            const {id_kh} = req.params
            const newQuery = await pool.query(`
                select * from nap_tien,khachhang
                where nap_tien.id_kh  = khachhang.id_kh 
                and khachhang.id_kh = ${id_kh}
                order by nap_tien.ngay_nap desc
            `)

            res.json(newQuery.rows)
        } catch (error) {
            console.log(error)
        }
    })


    app.get('/TongTienKH/KH/:id_kh' , async (req,res)=>{
        try{
            const {id_kh} = req.params
            const newQuery = await pool.query(
                `select sum(tien_nap)'sum' from nap_tien
                where id_kh  = ${id_kh}`
            )
            res.json(newQuery.rows)
        }catch(error){

        }
    })


    app.post(`/MC_TOP1/GuiYeuCauNap/:id_kh` , async (req,res)=>{
        try {
            const {noi_dung_nap,tien_nap} = req.body
            const {id_kh} = req.params
            console.log({noi_dung_nap,tien_nap})
            console.log({id_kh})
            const newQuery = await pool.query(`
                insert into nap_tien(
                    id_kh,noi_dung_nap,tien_nap,ngay_nap,trang_thai,trang_thai_chot
                )
                values(
                    ${id_kh},N'${noi_dung_nap}',${tien_nap},'${timeNowDB}',false,false
                )
            `)
            if(newQuery.rowCount > 0 ){
                const dlkh = await pool.query(`select * from khachhang where id_kh = ${id_kh}`)
                const tien_cho_duyet_cu = 
                dlkh.rows[0].tien_cho_duyet === '' ||
                dlkh.rows[0].tien_cho_duyet === undefined ||
                dlkh.rows[0].tien_cho_duyet === null  ? 0 : dlkh.rows[0].tien_cho_duyet

                const cap_nhap = await pool.query(`
                update khachhang set tien_cho_duyet = ${
                    parseInt(tien_cho_duyet_cu)+
                    parseInt(tien_nap)}
                where id_kh = ${id_kh}
                `)
                res.json({
                    status : cap_nhap.rowCount > 0 ? 1 : 0,
                    data : cap_nhap.rowCount > 0 ? 1 : 0
                })
            }else{
                res.json({status:0})
            }

        } catch (error) {
            res.json({status:0})
        }
    })


    app.put(`/XacNhanNapTienKhachHang/:id_nap/:id_kh` , async (req,res)=>{
        try {
            const {id_nap,id_kh} = req.params
            // const {id_kh} = req.body


            /*
            -- UPDATE tien_thanh_toan
            update khachhang set tien_thanh_toan =
            (
                (select tien_thanh_toan from khachhang where id_kh = 27 ) +
                (select tien_nap from nap_tien where id_nap = 5)
            )
            where id_kh = 27;
            -- UPDATE tien_cho_duyet
            update khachhang set tien_cho_duyet =
            (
                (select tien_cho_duyet from khachhang where id_kh = 27) -
                (select tien_nap from nap_tien where id_nap = 5)
            )
            where id_kh = 27;
            -- UPDATE trang_thai
            update nap_tien set trang_thai = true where id_nap = 5


            -- UPDATE tien_thanh_toan
            update khachhang set tien_thanh_toan =
            (
                (select tien_thanh_toan from khachhang where id_kh = 24 ) +
                (select tien_nap from nap_tien where id_nap = 6)
            )
            where id_kh = 24;
            -- UPDATE tien_cho_duyet
            update khachhang set tien_cho_duyet =
            (
                (select tien_cho_duyet from khachhang where id_kh = 24) -  
                (select tien_nap from nap_tien where id_nap = 6)
            )
            where id_kh = 24;
            -- UPDATE trang_thai
            update nap_tien set trang_thai = true where id_nap = 6
            */

            console.log(`
            -- UPDATE tien_thanh_toan
            update khachhang set tien_thanh_toan = 
            (
                (select tien_thanh_toan from khachhang where id_kh = ${id_kh} ) +
                (select tien_nap from nap_tien where id_nap = ${id_nap})
            )
            where id_kh = ${id_kh};
            -- UPDATE tien_cho_duyet
            update khachhang set tien_cho_duyet = 
            (
                (select tien_cho_duyet from khachhang where id_kh = ${id_kh}) -
                (select tien_nap from nap_tien where id_nap = ${id_nap})
            )
            where id_kh = ${id_kh};
            -- UPDATE trang_thai
            update nap_tien set trang_thai = true where id_nap = ${id_nap}
            `)

            const newQuery = await pool.query(`
                -- UPDATE tien_thanh_toan
                update khachhang set tien_thanh_toan = 
                (
                    (select tien_thanh_toan from khachhang where id_kh = ${id_kh} ) +
                    (select tien_nap from nap_tien where id_nap = ${id_nap})
                )
                where id_kh = ${id_kh};
                -- UPDATE tien_cho_duyet
                update khachhang set tien_cho_duyet = 
                (
                    (select tien_cho_duyet from khachhang where id_kh = ${id_kh}) -
                    (select tien_nap from nap_tien where id_nap = ${id_nap})
                )
                where id_kh = ${id_kh};
                -- UPDATE trang_thai
                update nap_tien set trang_thai = true where id_nap = ${id_nap}

            `)
            
            res.json({
                status: 1,
            })
        } catch (error) {
            res.json({
                status: 0,
            })
        }
    })




    // app.get('/DSGiaoDichKhachHang' , async (req,res)=>{
    //     try {
            
    //     } catch (error) {
            
    //     }
    // })
    // app.get(`/DSNapTienKhachHang/:id_nap` , async(req,res)=>{
    //     try {
            
    //         const newQuery = await pool.query(`

    //         `)
    //     } catch (error) {
            
    //     }
    // })
    //#endregion



    app.get('/DSChienDich/Admin' , async(req,res)=>{
        try{
            const newData = await pool.query(`
                select * from campaigns c 
            `)
            res.json(newData.rows)
        }catch(error){

        }
    })

    app.put('/CapNhapNoiDungChienDich' , async (req,res)=>{
        try{
            const {id,noi_dung}  = req.body
            console.log({id,noi_dung})
            const newData = await pool.query(`
                update campaigns set noi_dung = N'${noi_dung}'
                where id = N'${id}'
            `)
            res.json({
                status : 1
            })
        }catch(error){
            res.json({
                status : 0
            })
        }
    })


    app.get('/LichSuHoatDongAdmin' , async (req,res)=>{
        try{
            const newQuery = await pool.query(`
                select * from lich_su_hoat_dong,khachhang
                where khachhang.id_kh = lich_su_hoat_dong.id_kh
            `)
            res.json(newQuery.rows)
        }catch(error){

        }
    })


    app.get('/LichSuHoatDongKH/:id_kh' , async (req,res)=>{
        try{
            const {id_kh} = req.params 
            const newQuery = await pool.query(`
                select * from lich_su_hoat_dong,khachhang
                where khachhang.id_kh = lich_su_hoat_dong.id_kh
                and khachhang.id_kh = ${id_kh}
                order by lich_su_hoat_dong.ngay desc
            `)
            res.json(newQuery.rows)
        }catch(error){

        }
    })




    app.put(`/CapNhapAnhChienDich/:id` , async (req,res)=>{
        try{
            const {id} = req.params
            const {url} = req.body
            console.log(id)
            console.log(url)
            const newquery = await pool.query(`
                update campaigns set logo = N'${url}'
                where id = N'${id}'
            `)
            res.json(
                {status:newquery.rows >= 0 ? 1 : 0}
            )
        }catch(error){

        }
    })

    const timeNow = `${(date).getDate()}-${(date).getMonth()+1}-${(date).getFullYear()} ${(date).getHours()}:${(date).getMinutes()}:${(date).getSeconds()}`
    function convertTime(str){
        const date = new Date(str)
        // console.log()
        return `${(date).getDate()}-${(date).getMonth()+1}-${(date).getFullYear()} ${(date).getHours()}:${(date).getMinutes()}:${(date).getSeconds()}`
      }
      

	app.post('/ThemKhachHangSPA' , async(req,res)=>{
        try{
            const {data}=req.body
            console.log(data)
            const noewData = await pool.query(`
                insert into khachhang_botanic(data) values(N'${JSON.stringify(data)}')
            `)
            data.map(x=>{
                SendMailGoogle('botanic.spa.hp@gmail.com',`[Liên hệ khách hàng][${timeNow}] ${x.ho_va_ten}`,`
                =============Tin nhắn hệ thống=============
                
                Họ và tên: ${x.ho_va_ten}
                Số điện thoại: ${x.so_dt}
                Email: ${x.email}
                Dịch vụ: ${x.dich_vu === undefined ? 'Tư vấn chăm sóc' : x.dich_vu}
                Nội dung liên hệ: ${x.noi_dung_lien_he}
                Hẹn lịch: ${convertTime(x.hen_lich).split(' ')[0]}
                Thời gian: ${x.thoi_gian}
    
                `)
            })
         
            res.json("")
        }catch(error){
            console.log(error)
        }
    })


    app.get(`/Reports/KH/:id_kh` ,async(req,res)=>{
        try{
            const {id_kh} = req.params
            var date = new Date()
            console.log(id_kh)
            console.log(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)
      
            const newData = await pool.query(`
                select * from "transaction"
                where utm_content = N'user-${id_kh}'
                and transaction_time >= '2021-09-12'
            `)
            res.json(
                {
                    data: encode_decode.EncodeJson(newData.rows)
                }
                )
        }catch(error){

        }
    })

    app.post(`/Reports/Ngay/KH/:id_kh` ,async(req,res)=>{
        try{
            
        }catch(error){

        }
    })



    app.get('/ChienDichReport/:id_kh' , async (req,res)=>{
        try{
            const {id_kh} = req.params 
            const date = new Date()

            const newData =await pool.query(`
                select transaction_time,transaction_id,utm_content ,merchant, status ,is_confirmed ,count(merchant)"count",sum(hoa_hong)"hoa_hong" from "transaction" t
                where utm_content = N'user-${id_kh}'
                and transaction_time >= '${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}'
                group by merchant,utm_content,status ,is_confirmed,transaction_id, transaction_time
            `)
            // console.log(newData.rows)

            let thanh_cong = 0 
            let da_huy = 0 
            let cho_duyet = 0 
            const count_ThanhCong = await pool.query(
                `
                select count(*)"dem" from "transaction" t 
                where status = 1
                and transaction_time >= '${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}'
                and utm_content = N'user-${id_kh}'
                group by merchant,utm_content,status ,is_confirmed,transaction_id
                `
            )
            
            const count_DaHuy = await pool.query(
                `
                select count(*)"dem" from "transaction" t 
                where status = 2
                and transaction_time >= '${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}'
                and utm_content = N'user-${id_kh}'
                group by merchant,utm_content,status ,is_confirmed,transaction_id
                `
            )

            const count_ChoDuyet = await pool.query(
                `
                select count(*)"dem" from "transaction" t 
                where status = 0
                and transaction_time >= '${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}'
                and utm_content = N'user-${id_kh}'
                group by merchant,utm_content,status ,is_confirmed,transaction_id
                `
            )


            const tien_thanh_cong = await pool.query(`
                select sum(hoa_hong)"tien_hong" from "transaction"
                where status = 1 
                and transaction_time >= '${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}'
                and utm_content = N'user-${id_kh}'
            `)
            const tien_huy = await pool.query(`
                select sum(hoa_hong)"tien_hong" from "transaction"
                where status = 2 
                and transaction_time >= '${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}'
                and utm_content = N'user-${id_kh}'
             `)

            count_ThanhCong.rows.map(x=>thanh_cong += parseInt(x.dem))
            count_DaHuy.rows.map(x=>da_huy += parseInt(x.dem))
            count_ChoDuyet.rows.map(x=>cho_duyet += parseInt(x.dem))
            res.json(
                {
                    data: encode_decode.EncodeJson(newData.rows),
                    thanh_cong:  thanh_cong,
                    da_huy:  da_huy,
                    cho_duyet:  cho_duyet,
                    tien_hong_thanh_cong: tien_thanh_cong.rows[0].tien_hong === null ? 0 : tien_thanh_cong.rows[0].tien_hong,
                    tien_hong_huy: tien_huy.rows[0].tien_hong === null ? 0 : tien_huy.rows[0].tien_hong
                })
            
        }catch(error){
            console.log(error)
        }
    })


    
    app.post('/ChienDichReport/Ngay/:id_kh' , async (req,res)=>{
        try{
            const {id_kh} = req.params 
            const {ngay_bat_dau,ngay_ket_thuc} = req.body 
            console.log(id_kh)
            let thanh_cong = 0 
            let da_huy = 0 
            let cho_duyet = 0 
            const newData =await pool.query(`
                select transaction_time,transaction_id,utm_content ,merchant, status ,is_confirmed ,count(merchant),sum(hoa_hong)"hoa_hong" from "transaction" t
                where utm_content = N'user-${id_kh}'
                ${
                    ngay_bat_dau === '' || ngay_bat_dau === null || ngay_bat_dau === undefined ? '' : ` and transaction_time >= '${ngay_bat_dau}' ` 
                } 
                ${
                    ngay_ket_thuc === '' || ngay_ket_thuc === null || ngay_ket_thuc === undefined ? '' : ` and transaction_time <= '${ngay_ket_thuc}' ` 
                } 
                group by merchant,utm_content,status ,is_confirmed,transaction_id,transaction_time
            `)


 
        const count_ThanhCong = await pool.query(
            `
            select count(*)"dem" from "transaction" t 
            where status = 1
            ${
                ngay_bat_dau === '' || ngay_bat_dau === null || ngay_bat_dau === undefined ? '' : ` and transaction_time >= '${ngay_bat_dau}' ` 
            } 
            ${
                ngay_ket_thuc === '' || ngay_ket_thuc === null || ngay_ket_thuc === undefined ? '' : ` and transaction_time <= '${ngay_ket_thuc}' ` 
            } 
            and utm_content = N'user-${id_kh}'
            group by merchant,utm_content,status ,is_confirmed,transaction_id
            `
        )

        const count_DaHuy = await pool.query(
            `
            select count(*)"dem" from "transaction" t 
            where status = 2
               ${
                    ngay_bat_dau === '' || ngay_bat_dau === null || ngay_bat_dau === undefined ? '' : ` and transaction_time >= '${ngay_bat_dau}' ` 
                } 
                ${
                    ngay_ket_thuc === '' || ngay_ket_thuc === null || ngay_ket_thuc === undefined ? '' : ` and transaction_time <= '${ngay_ket_thuc}' ` 
                } 
            and utm_content = N'user-${id_kh}'
            group by merchant,utm_content,status ,is_confirmed,transaction_id
            `
        )

        const count_ChoDuyet = await pool.query(
            `
            select count(*)"dem" from "transaction" t 
            where status = 0
               ${
                    ngay_bat_dau === '' || ngay_bat_dau === null || ngay_bat_dau === undefined ? '' : ` and transaction_time >= '${ngay_bat_dau}' ` 
                } 
                ${
                    ngay_ket_thuc === '' || ngay_ket_thuc === null || ngay_ket_thuc === undefined ? '' : ` and transaction_time <= '${ngay_ket_thuc}' ` 
                } 
            and utm_content = N'user-${id_kh}'
            group by merchant,utm_content,status ,is_confirmed,transaction_id
            `
        )

        const tien_thanh_cong = await pool.query(`
        select sum(hoa_hong)"tien_hong" from "transaction"
        where status = 1 
               ${
                    ngay_bat_dau === '' || ngay_bat_dau === null || ngay_bat_dau === undefined ? '' : ` and transaction_time >= '${ngay_bat_dau}' ` 
                } 
                ${
                    ngay_ket_thuc === '' || ngay_ket_thuc === null || ngay_ket_thuc === undefined ? '' : ` and transaction_time <= '${ngay_ket_thuc}' ` 
                } 
        and utm_content = N'user-${id_kh}'

    `)

    const tien_huy = await pool.query(`
        select sum(hoa_hong)"tien_hong" from "transaction"
        where status = 2 
               ${
                    ngay_bat_dau === '' || ngay_bat_dau === null || ngay_bat_dau === undefined ? '' : ` and transaction_time >= '${ngay_bat_dau}' ` 
                } 
                ${
                    ngay_ket_thuc === '' || ngay_ket_thuc === null || ngay_ket_thuc === undefined ? '' : ` and transaction_time <= '${ngay_ket_thuc}' ` 
                } 
        and utm_content = N'user-${id_kh}'
    
     `)



        count_ThanhCong.rows.map(x=>thanh_cong += parseInt(x.dem))
        count_DaHuy.rows.map(x=>da_huy += parseInt(x.dem))
        count_ChoDuyet.rows.map(x=>cho_duyet += parseInt(x.dem))

        res.json(
            {
                data: encode_decode.EncodeJson(newData.rows),
                thanh_cong:  thanh_cong,
                da_huy:  da_huy,
                cho_duyet:  cho_duyet,
                tien_hong_thanh_cong: tien_thanh_cong.rows[0].tien_hong === null ? 0 : tien_thanh_cong.rows[0].tien_hong,
                tien_hong_huy: tien_huy.rows[0].tien_hong === null ? 0 : tien_huy.rows[0].tien_hong
            })
            
        }catch(error){
            console.log(error)
        }
    })

    app.get('/RankTienChienDich' , async (req,res)=>{
        try{
            const newData = await pool.query(`
                select id_kh,ten_kh,tien_chien_dich from khachhang k
                order by k.tien_chien_dich desc
            `)

            res.json(
                {data:encode_decode.EncodeJson(newData.rows)})
        }catch(error){
            console.log(error)
        }
    })


    app.get('/RankGioiThieu' , async(req,res)=>{
        try{
            const KhachHang = await pool.query(`select * from view_khachhang`)
        }catch(error){

        }
    })


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
    
    console.log(makeid(15));

    
    app.post('/ChienDichNgoai' , async (req,res)=>{
        try{
            const {ten_kh,so_dt,email,dia_chi,ghi_chu,user_parser,merchant,cam_id} = req.body
            const id_ramdom = makeid(15)
            console.log({ten_kh,so_dt,email,dia_chi,ghi_chu,user_parser,merchant})
            const khachhang = await pool.query(`
                insert into campaigns_new (ten_kh,so_dt,email,dia_chi,ghi_chu,created_at,id_kh,tran_id,check_kh)
                values(N'${ten_kh}',N'${so_dt}',N'${email}',N'${dia_chi}',N'${ghi_chu}',NOW(),N'${user_parser}',N'${id_ramdom}',false)
            `)
            console.log(`select email from campaigns
            where id = N'${cam_id}'`)
            const ChienDich = await pool.query(`select email from campaigns
            where id = N'${cam_id}'`) // cam_id
            console.log(ChienDich.rows.map(x=>x.email))
            SendMailGoogle(ChienDich.rows.map(x=>x.email),`Email Hệ thống chiến dịch`,`
            Chiến dịch ${merchant}\n
            ===Thông tin khách hàng===
            Chiến dịch: ${merchant}\n
            Tran_id:  ${id_ramdom}\n
            Số điện thoại: ${so_dt}\n
            Tên khách hàng: ${ten_kh}\n
            Địa chỉ: ${dia_chi}\n
            Ghi chú: ${ghi_chu}\n
            `)
            const newData = await pool.query(
                `
                    insert into "transaction"(transaction_id, transaction_time,commission,trang_thai_chot,hoa_hong,merchant,utm_content,don_ngoai,status,is_confirmed)
                    values(N'${id_ramdom}' , NOW() , 0 , false , 0 ,N'${merchant}','${user_parser}',true,0,0)
                `
            )
            res.json("Thêm thành công!")
        }catch(error){
            console.log(error)
        }
    })



    app.get('/NganhHangChienDich' , async(req,res)=>{
        try{
            const newData = await pool.query(`
                select nganh from campaigns
                group by nganh
            `)
            res.json(newData.rows)
        }catch(errror){

        }
    })







    app.post(`/DonChienDichNgoai/v01` , async (req,res)=>{
        try{
            const {user, checkTrue} =  req.body 
            console.log(dateNowDB01)
            const newTodo = await pool.query(`
                select * from "transaction"
                where transaction_time >= '2021-09-24'
                and utm_content = N'user-130'
            `)
            res.json()
        }catch(error){
            
        }
    })
    const TimeRankNgayHomQua = new Date(preDays(new Date(),1))
    const function_convert_time = (value)=>{
        var d = new Date(value);
        return `${d.getUTCFullYear()}-${numberTimeNow(d.getUTCMonth()+1)}-${numberTimeNow(d.getUTCDate())} ${numberTimeNow((d).getUTCHours())}:${numberTimeNow((d).getUTCMinutes())}:${numberTimeNow((d).getUTCSeconds())}`
        
    } 
    const dateNowHomQua = `${(TimeRankNgayHomQua).getFullYear()}-${numberTimeNow((TimeRankNgayHomQua).getMonth()+1)}-${numberTimeNow((TimeRankNgayHomQua).getDate())} ${numberTimeNow((TimeRankNgayHomQua).getHours())}:${numberTimeNow((TimeRankNgayHomQua).getMinutes())}:${numberTimeNow((TimeRankNgayHomQua).getSeconds())}`
    
    const convertArray = (array)=>{
        if(array.length > 0){
            const newData = []
            array.map(x=>newData.push({
                utm_content:x.utm_content,
                id_kh: x.utm_content.split('-')[1],
                hoa_hong_01:x.hoa_hong_01
            }))
            return newData
        }else{
            return []
        }
    }
    app.get('/RankTongHienTai/:idUser', async(req,res)=>{
        try{
            const {idUser} = req.params
            // Rank hôm qua (check true)
            const RankHomQua = await pool.query(`
                select utm_content ,sum(hoa_hong)"hoa_hong_01" from "transaction" t 
                where transaction_time < '${dateNowDB01.split(' ')[0]}'
                and transaction_time >= '${dateNowHomQua.split(' ')[0]}'
                group by utm_content 
                order by "hoa_hong_01" desc
            `)

            // Rank hôm nay (Check true)
            const RankHomNay = await pool.query(`
                select utm_content ,sum(hoa_hong)"hoa_hong_01" from "transaction" t 
                where transaction_time >= '${dateNowDB01.split(' ')[0]}'
                group by utm_content 
                order by "hoa_hong_01" desc
            `)
            var startOfWeek = moment().startOf('week').toDate();
            var endOfWeek   = moment().endOf('week').toDate();
            // console.log(function_convert_time(startOfWeek))
            // console.log(function_convert_time(endOfWeek))
            // Rank Tuần Tối Thứ 7 Hàng tuần (check True)

            const RankTuan = await pool.query(`
                select utm_content ,sum(hoa_hong)"hoa_hong_01" from "transaction" t 
                where transaction_time < '${function_convert_time(endOfWeek).split(' ')[0]}'
                and transaction_time >= '${function_convert_time(startOfWeek).split(' ')[0]}'
                group by utm_content 
                order by "hoa_hong_01" desc
            `)

            const datetimeNowCheckMonth = new Date()
            var startDateMonth = moment( datetimeNowCheckMonth.getUTCFullYear()+'-'+numberTimeNow((datetimeNowCheckMonth).getUTCMonth()+1)+'-'+'01' + ' 00:00:00' );
            var endDateMonth = startDateMonth.endOf('month');
            // Rank trong tháng (check true)
            const RankThang = await pool.query(`
                select utm_content ,sum(hoa_hong)"hoa_hong_01" from "transaction" t 
                where transaction_time >= '${datetimeNowCheckMonth.getUTCFullYear()+'-'+numberTimeNow((datetimeNowCheckMonth).getUTCMonth()+1)+'-'+'01'}'
                and transaction_time <= '${function_convert_time(startDateMonth.toDate()).split(' ')[0]}'
                group by utm_content 
                order by "hoa_hong_01" desc
            `)

            // Rank trong năm (check True)

            const RankNam = await pool.query(`
                select utm_content ,sum(hoa_hong)"hoa_hong_01" from "transaction" t 
                where transaction_time <= '${datetimeNowCheckMonth.getFullYear()}-${"12"}-${"31"}'
                and transaction_time >= '${datetimeNowCheckMonth.getFullYear()}-${"01"}-${"01"}'
                group by utm_content 
                order by "hoa_hong_01" desc
            `)

            const KhachHang = await pool.query(`
                select * from khachhang
            `)
            const ChienDich = await pool.query(`
            select hoa_hong,device_type,merchant,status,ngay from "transaction" t
            where t.transaction_time >= '${dateNowDB01.split(' ')[0]}'
            and t.utm_content = N'user-${idUser}'
            order by t.transaction_time desc
            `)
            // console.log(ChienDich.rows)
            // // Danh sách chiến dịch tổng 

            const ChienDichTong = await pool.query(`
            select hoa_hong,device_type,merchant,status,ngay from "transaction" t
            where t.transaction_time >= '${dateNowDB01.split(' ')[0]}'
            order by t.transaction_time desc
            `)
            res.json({
                RankHomQua: encode_decode.EncodeJson( convertArray(RankHomQua.rows)   ),
                RankHomNay: encode_decode.EncodeJson( convertArray(RankHomNay.rows) ) ,
                RankTuan: encode_decode.EncodeJson( convertArray(RankTuan.rows) ),
                RankThang: encode_decode.EncodeJson( convertArray(RankThang.rows) ),
                RankNam: encode_decode.EncodeJson( convertArray(RankNam.rows) ),
                KhachHang: encode_decode.EncodeJson( KhachHang.rows ),
                dataChienDich:  ChienDich.rows,
                dataChienDichTong:  ChienDichTong.rows
            })
        }catch(error){
            console.log(error)
        }
    })



    app.get(`/HienThiChienDichDash/:idUser` , async(req,res)=>{
        try{
            const {idUser} = req.params
            // Danh sách chiến dịch
            // console.log(dateNowDB01.split(' ')[0])
        
            const ChienDich = await pool.query(`
                select hoa_hong,device_type,merchant,status,ngay from "transaction" t
                where t.transaction_time >= '${dateNowDB01.split(' ')[0]}'
                and t.utm_content = N'user-${idUser}'
                order by t.transaction_time desc
            `)
            // console.log(ChienDich.rows)
            // // Danh sách chiến dịch tổng 

            const ChienDichTong = await pool.query(`
            select hoa_hong,device_type,merchant,status,ngay from "transaction" t
            where t.transaction_time >= '${dateNowDB01.split(' ')[0]}'
            order by t.transaction_time desc
            `)

            res.json({
                status: ChienDich.rowCount > 0 || ChienDichTong.rowCount > 0 ? 1 : 0,
                dataChienDich: ChienDich.rowCount > 0 ? ChienDich.rows  : [],
                dataChienDichTong: ChienDichTong.rowCount > 0 ?  ChienDichTong.rows : [], 
                message: "Bạn vô xem API làm gì vậy ^^ ! Liên hệ 0366262072 để được cung cấp data nhé hihi"
            })
        }catch(error){
            console.log(error)
        }
    })





    app.get(`/TongTienChienDich/v1/:id_kh` , async (req,res)=>{
        try{
            const {id_kh} = req.params
            const newData = await pool.query(`
                select id_kh,sum(tien_nap)"tong_tien" from nap_tien
                where id_kh = ${id_kh}
                group by id_kh 
            `)
            const ChienDich = await pool.query(`
            select hoa_hong,device_type,merchant,status,ngay from "transaction" t
            where t.transaction_time >= '${dateNowDB01.split(' ')[0]}'
            and t.utm_content = N'user-${id_kh}'
            order by t.transaction_time desc
            `)
            // console.log(ChienDich.rows)
            // // Danh sách chiến dịch tổng 

            const ChienDichTong = await pool.query(`
            select hoa_hong,device_type,merchant,status,ngay from "transaction" t
            where t.transaction_time >= '${dateNowDB01.split(' ')[0]}'
            order by t.transaction_time desc
            `)
            res.json({
                data: newData.rows,
                dataChienDich:  ChienDich.rows,
                dataChienDichTong:  ChienDichTong.rows
            })
            res.json(newData.rows)
        }catch(error){

        }
    })


    app.post(`/CheckIPConnections` , async(req,res)=>{
        try{
            // 43 , 18 , 13 , 2,47 , 11,31
            const banner = ['43' , '18' , '13' , '2','47' , '11', '31']

            const { ip, id_kh, id_campains,type } = req.body
            // console.log( { ip, id_kh, id_campains,type } )
            
            const bannerQuery = await pool.query(`
                select id_campaigns from campaigns
                where id = N'${id_campains}'
            `)
            if( ip === undefined){
                res.json({
                    status:0,
                    message: "Không cho phép truy cập"
                })
            }else{
                const newTodo = await pool.query(`
                select * from connections_ip
                    where ip_address = N'${ip}' and id_kh = ${id_kh}
                    and ip_campains = N'${id_campains}' and "type" = N'${type}'
                `)
                const camp = await pool.query(`
                    select merchant, url from campaigns
                    where id = N'${id_campains}'
                `)

                if ( bannerQuery.rowCount > 0 ){
                    // console.log( bannerQuery.rows )
                    // console.log( " DEMO" )
                    // console.log( banner.indexOf( bannerQuery.rows[0].id_campaigns ) >= 0 )
                    if ( banner.indexOf( bannerQuery.rows[0].id_campaigns ) >= 0) {
                        res.json({
                            status:1,
                            data: camp.rowCount > 0 ? {'merchant': camp.rows[0].merchant, 'url': camp.rows[0].url} : {},
                            message:"Cho phép truy cập"
                        })
                    }
                }
                if(newTodo.rows.length > 0){
                    const checkTodo = await pool.query(`
                        select created_at + interval '1 hour' as "next_time" ,* from connections_ip
                        where id_connections = 1
                        and created_at + interval '1 hour' < NOW()
                    `)
                    if( checkTodo.rows.length > 0){
                        const cleanConnections = await pool.query(`
                            delete from connections_ip 
                            where id_connections = ${checkTodo.rows[0].id_connections}
                        `)
                        // CREATE NOW()
                        const newQuery = await pool.query(`
                        insert into connections_ip(
                            ip_address,created_at ,updated_at ,"type",id_kh,ip_campains
                        )
                        values(
                            N'${ip}',NOW(),NOW(),N'${type}',${id_kh},N'${id_campains}' 
                        )
                        `)
                        res.json({
                            status:1,
                            data: camp.rowCount > 0 ? {'merchant': camp.rows[0].merchant, 'url': camp.rows[0].url} : {},
                            message:"Cho phép truy cập"
                        })
                    }else{
                        res.json({
                            status:0,
                            message: "Không cho phép truy cập"
                        })
                    }
                }else{
                    // CREATE NOW()
                    const newQuery = await pool.query(`
                        insert into connections_ip(
                            ip_address,created_at ,updated_at ,"type",id_kh,ip_campains
                        )
                        values(
                            N'${ip}',NOW(),NOW(),N'${type}',${id_kh},N'${id_campains}'
                        )
                    `)
                    res.json({
                        status:1,
                        data: camp.rowCount > 0 ? {'merchant': camp.rows[0].merchant, 'url': camp.rows[0].url} : {},
                        message:"Cho phép truy cập"
                    })
                }
            }
        }catch(error){
            res.json({
                status:0,
                message: "Không cho phép truy cập"
            })
            console.log(error)
        }
    })

    app.post('/BaoCaoDon' , async(req,res)=>{
        try{
            const {hovatenKH, chiendich,link, sodt , cmnd , ngaydk, user} =  req.body
    
            console.log( {hovatenKH, chiendich,link, sodt , cmnd , ngaydk, user} )

            const newTodo = await pool.query(`
                insert into bao_cao_don(
                    chien_dich,ten_kh,so_dt,cmnd,ngay_dk,
                    created_at , updated_at , link ,id_kh 
                )
                values( 
                    N'${chiendich}', N'${hovatenKH}' , N'${sodt}' , N'${cmnd}', '${ngaydk} 00:00:00',NOW(),NOW(),
                    N'${link}' , ${user[0].id_kh}
                )
            `)
            res.json({
                status: 1,
                message: "Báo cáo thành công!"
            })
        }catch(error){
            console.log( error )
            res.json({
                status: 0,
                message: "Báo cáo không thành công!"
            })
        }
    })





    

const arrayCamps = {
"avay": "https://riofin.asia/v2/whoJBl-1VUuitQ2wJrGRyQ?lp=avay",
"tima": "https://riofin.asia/v2/z3rCJ4thJxmiAcl376gymg?lp=Xe máy",
"f88": "https://riofin.asia/v2/-Q7C_bDuVz2RSqTJNIX-5g?lp=f88",
"robocash": "https://riofin.asia/v2/1_7V0htvVjs4a_4fSwLmR26CiesMDC1LYtywKXlOERw?lp=default",
"dcredit-2": "https://riofin.asia/v2/0ZEDITporutViZNw0P7Dbf6jZ0CWgTkrHFda43j3bBo?lp=vaynhanh",
"atmonline": "https://riofin.asia/v2/zc-YqIxmTRMzmSJfeIrdBSf_-VSc0E1NPjmyffiAJQI?lp=atm2",
"mafc2": "https://riofin.asia/v2/-VdBheWK89raJT5soICk12IcXwVgWrsfT-KrQ5kdqhE?lp=vaytinchap",
"tamo": "https://riofin.asia/v2/YEgSX3c7Il7-ctbzMzpOXQ?lp=tamovn",
"f88-new": "https://riofin.asia/v2/OT8SDkAf-GJaY7IgBXvtyyCuggTZIXNHJ2DLWM6EIqo?lp=vayonline",
"oncredit": "https://riofin.asia/v2/AnFIrkdW_dQ9R0UcU-DE0Yr4rXLJd_yp4lvNncF45E4?lp=oncredit.vn",
"moneycat-cpl": "https://riofin.asia/v2/HH5MmtgLH5hDkIF2QxxB9Y8gcVX8LcuxrzP4Tr-5Emw?lp=moneycat-cps",
"senmo": "https://riofin.asia/v2/2aJ8nYlQ9feKLZXbhiT7vf9ZTJ8cbEcnTUl7nDQKUfo?lp=senmo",
"cash24-cps": "https://riofin.asia/v2/g5dTMDNInMmBPlmz9szQMaQM8NWZERqHxW3P7iuWklM?lp=cash24-cps",
"senmo-2": "https://riofin.asia/v2/da4mLUFMfO8SmpX9awzWZegbp9RUeA1vgFmBEPQruEI?lp=senmocpl",
"moneyveo": "https://riofin.asia/v2/XQmuZuiMungC1f4AA6YIk5J6KkAobYMCcVDNTwVr3wc?lp=moneyveo",
"oncredit-web-2": "https://riofin.asia/v2/MJwmVNgaKt-VKtty_kKjTksQMnZVenpZOwnkRQBCqG8?lp=oncredit-web-2",
"tima-2": "https://riofin.asia/v2/2FYzjJZTHPKy5XTHP26ypk-Vzco0X8IvozNTdlGniYo?lp=vayxemay",
"tamo-2": "",

}

//  
app.get('/DoiTacFin' , async (req,res)=>{
    try{
        // https://publisher-api.riofintech.net/offer/all?pub_id=hoangtochp&token=%2F2UMOawI4iodzRM6AwMvbw%3D%3D



        const response = await fetch(`https://publisher-api.riofintech.net/offer/all?pub_id=hoangtochp&token=%2F2UMOawI4iodzRM6AwMvbw%3D%3D` )

        const JsonData = await response.json()
        
        // console.log( JsonData )
        

        if( JsonData.status === 1 ){
            JsonData.data.map(async (x,index)=>{
                const checkData = await pool.query(`
                    select * from campaigns c 
                    where nganh = N'Vay tiền 02'
                    and "name" = N'${x.name}'
                `)
                if( checkData.rowCount > 0 ){
                    const updateData = await pool.query(`

                    `)
                }else{
                    var randomString = Math.floor(100000 + Math.random() * 9000000000000000000)
                    const insertData = await pool.query(`
                        insert into campaigns(id,category,approval,logo,merchant,"name","scope",sub_category,url,nganh,start_time)
                        values(
                            N'${randomString}',
                            N'category',
                            N'successful',
                            N'${x.avatar}',N'merchant',
                            N'${x.name}',N'public',
                            'sub_category', N'${arrayCamps[x.offer_id]}',
                            N'Vay tiền 02',
                            N'2021-11-03T14:57:20.449000'
                        )
                    `)
                    
                    // console.log( x.name )
                    // console.log( x.domain )
                    // console.log( x.offer_id )
                    // console.log( x.address )
                    // console.log( x.product_type )
                    // console.log( x.commission_rate )
                    // console.log( x.commission_rule )
                    // console.log( x.about )
                    // console.log( x.avatar )
                    // console.log( x.cover )
                }
  
            })
        }   

        res.json(JsonData)


    }catch(error){
        console.log( error )
    }
})


// 



}








