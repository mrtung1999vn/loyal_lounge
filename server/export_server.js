const express = require('express');
const https = require('https');
const http = require('http');
const fs = require("fs")
const cors = require('cors');
var bodyParser = require('body-parser')
const port = process.env.PORT || 3005;

// Create app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
    // Create Doc-API
var swaggerJsdoc = require("swagger-jsdoc")
var swaggerUi = require("swagger-ui-express")

app.use(cors());
app.use(express.json());


const document = require('./document');
const controller = require('./controller')

//#region OPTIONS
const options = {
    definition: document,
    apis: ["./routes/books.js"],
};

const optionsHTTPS = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt')
};
//#endregion


//#region DOC-API
const specs = swaggerJsdoc(options);
app.use(
    "/doc-api",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);
//#endregion

//#region CREATE_SERVER
const server =  https.createServer(optionsHTTPS,app)
// const server = http.createServer(app)
    //#endregion

//#region SOCKET IO
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
});

const transformTimeNumber = ( time )=>{
    return time.length === 1 ? `0${time}` : time
  }

//#region API & SOCKET-IO SERVER 
// controller.Controller(app, io)


//#endregion API SERVER
function convertTime(value){return value.length === 1 ? `0${value}` : value}





/** @format */

const Pool = require("pg").Pool;
var json2csv = require('json2csv');

require('dotenv').config()

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
});



app.get(`/ExportLuong` , async (req,res)=>{
        try {
            // Chốt bảng lương tháng
            console.log('TEST')
            const checkData = await pool.query(`
                select * from lich_su_hoat_dong where noi_dung = N'Lương tháng ${new Date().getMonth() + 1}'
            `)  
            if(checkData.rowCount > 0){
        
            }else{
                // 
                const newData = await pool.query(`select id_kh,so_tai_khoan,chu_tai_khoan,tien_chien_dich, tien_gioi_thieu,(tien_gioi_thieu+tien_chien_dich)"tien_chot"  from khachhang k
                order by tien_chot desc`)
                const data = []
                // Chốt bảng lương tháng
                newData.rows.map( x => data.push({
                    id_kh: x.id_kh,
                    so_tai_khoan: '*'+x.so_tai_khoan,
                    chu_tai_khoan: '*'+x.chu_tai_khoan,
                    tien_chien_dich: parseInt (x.tien_chien_dich).toLocaleString('vi', {style : 'currency', currency : 'VND'}),
                    tien_gioi_thieu: parseInt (x.tien_gioi_thieu).toLocaleString('vi', {style : 'currency', currency : 'VND'}),
                    tien_chot: parseInt (x.tien_chot).toLocaleString('vi', {style : 'currency', currency : 'VND'})
                }))
                // console.log(data)
                var csv = json2csv.parse(data);
                fs.writeFile(`../2/data/[MC-Top1] Bảng lương tháng ${new Date().getMonth() + 1 }.csv`, csv, { encoding: 'utf8' }, function(err) {
                  if (err) throw err;
                 console.log('file saved');
                });
        
                newData.rows.map( async (x,index) => {
                    const lichsu = await pool.query(`
                    insert into lich_su_hoat_dong (noi_dung,tien_thanh_toan,tien_chien_dich,tien_gioi_thieu,ngay,id_kh)
                    values(N'Lương tháng ${new Date().getMonth() + 1}', ${parseInt(x.tien_chien_dich + x.tien_gioi_thieu)},
                    ${parseInt(x.tien_chien_dich)},${parseInt(x.tien_gioi_thieu)},NOW(), ${x.id_kh} )
                    `)
        
                    const tien_nap = await pool.query(`
                        insert into nap_tien (id_kh,noi_dung_nap,tien_nap,ngay_nap,trang_thai)
                        values(${x.id_kh},N'Lương tháng ${new Date().getMonth() + 1}',${parseInt(x.tien_chien_dich + x.tien_gioi_thieu)},NOW(),true)
                    `)
                    if(index + 1 === newData.rowCount){
                        for (let i=0;i<2000;i++){}
                        var file = `../2/data/[MC-Top1] Bảng lương tháng ${new Date().getMonth() + 1 }.csv`
                        res.download(file,`[MC-Top1] Bảng lương tháng ${new Date().getMonth() + 1 }.csv`)
                    }
                })
         
        
        
                // 

            }
        
        
            // Lịch sử hoạt động
          } catch (error) {
            console.log(error)
          }
    
})

function numberTimeNow(n){return n.toString().length ===1 ? `0${n}`: n}

function preDays(dateObj, numDays) {
    dateObj.setDate(dateObj.getDate() - numDays);
    return dateObj;
}

function nextDays(dateObj, numDays) {
    dateObj.setDate(dateObj.getDate() + numDays);
    return dateObj;
}


const dateTimeNowDB01 = new Date()
const dateNowDB01 = `${(dateTimeNowDB01).getFullYear()}-${numberTimeNow((dateTimeNowDB01).getMonth()+1)}-${numberTimeNow((dateTimeNowDB01).getDate())} ${numberTimeNow((dateTimeNowDB01).getHours())}:${numberTimeNow((dateTimeNowDB01).getMinutes())}:${numberTimeNow((dateTimeNowDB01).getSeconds())}`


app.get(`/ExportTopNgay` , async (req,res)=>{
    try{
        const newData = await pool.query(`
            select t.utm_content,kh.chu_tai_khoan,kh.so_tai_khoan,kh.ngan_hang, 
            sum(t.hoa_hong)"hoa_hong" from "transaction" as t,khachhangViewCode as 
            kh where t.transaction_time > '${dateNowDB01.split(' ')[0]}'
            and kh.concat_ws = t.utm_content 
            and t.status = 1
            group by t.utm_content,kh.chu_tai_khoan,kh.so_tai_khoan,kh.ngan_hang
            order by "hoa_hong"  desc
        `)
        const data = []

        console.log(data)    
        newData.rows.map( (x,index)=>{
            data.push({
            id_kh: x.utm_content,
            chu_tai_khoan: x.chu_tai_khoan,
            so_tai_khoan:x.so_tai_khoan,
            ngan_hang:x.ngan_hang,
            hoa_hong: parseInt(x.hoa_hong).toLocaleString('vi', {style : 'currency', currency : 'VND'})})

            console.log(x)
            if(index + 1 === newData.rowCount){
                console.log(data)
                var csv = json2csv.parse(data);
                fs.writeFile(`../2/data_ngay/[MC-Top1] Bảng top ngày_${new Date().getDate()}_${new Date().getMonth() + 1}_${new Date().getFullYear()}.csv`, csv, { encoding: 'utf8' }, function(err) {
                    if (err) throw err;
                   console.log('file saved');
                   for (let i=0;i<=2000;i++){}
                   var file = `../2/data_ngay/[MC-Top1] Bảng top ngày_${new Date().getDate()}_${new Date().getMonth() + 1}_${new Date().getFullYear()}.csv`
                   res.download(file,`[MC-Top1] Bảng top ngày_${new Date().getDate()}_${new Date().getMonth() + 1}_${new Date().getFullYear()}.csv`)
                });
            }
        })
        
    }catch(error){
        console.log(error)
    }
})












// update khachhang set tien_chien_dich = 0,
// tien_gioi_thieu = 0,tien_chot = 0





app.get(`/CampsChienDichKhachHang/HomNay` , async (req,res)=>{
    try{
        const date = new Date()
        console.log(
            `
            select * from "transaction" 
            where transaction_time >= '${date.getFullYear()}-${
              transformTimeNumber(
                (date.getMonth()+1).toString()
              )}-${
                transformTimeNumber(date.getDate().toString())}'
            `
        )
        const newData = await pool.query(`
        select * from "transaction" 
        where transaction_time >= '${date.getFullYear()}-${
          transformTimeNumber(
            (date.getMonth()+1).toString()
          )}-${
            transformTimeNumber(date.getDate().toString())}'
        `)

        const KhachHang = await pool.query(`
            select * from khachhangviewcode
        `)

        console.log( KhachHang.rows )

        console.log( newData.rows )

        res.json( {
            khachhang: KhachHang.rows,
            donhang: newData.rows
        } )
    }catch(error){
        console.log( error )
    }
})


function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
      rv[i] = arr[i];
    return rv;
  }

app.get(`/ExportThangNhanVien/:Thang/:Nam`, async (req,res)=>{
    try{
        const { Thang, Nam } = req.params
        const date = new Date()
        //#region transaction
        var dateMonth = new Date(), y = Nam , m = convertTime(Thang);
        var firstDay = new Date(y, m, 1);
        var lastDay = new Date(y, m + 1, 0);
        const transaction = await pool.query(`
            select utm_content , product_id ,count(product_id)"dem" ,commission from "transaction" t 
            where transaction_time >= '01-${convertTime(Thang)}-${Nam}'
            and transaction_time <= '${convertTime(lastDay.getDate())}-${convertTime(Thang)}-${Nam}'
            and t.status = 1
            group by product_id ,utm_content,commission
            order by utm_content 
        `)
        //#region transaction
        const products = await pool.query(`
            select product_id, count( product_id )"dem" from "transaction"
            where transaction_time >= '01-${convertTime(Thang)}-${Nam}'
            and transaction_time <= '${convertTime(lastDay.getDate())}-${convertTime(Thang)}-${Nam}'
            and status = 1
            group by product_id 
            order by "dem" desc
        `)
        
        // console.log( transaction.rows )
        

        const users = await pool.query(`
            select * from khachhang_transaction kht,khachhangviewcode k
            where kht.utm_content = k.concat_ws 
            order by dem desc          
        `)

        const newData = []
        users.rows.map((x,index)=>{
            //
            let check = false
            // 
            //#region *** new obj products and profile user
            let objProducts = new Object()
            let arrayProducts = []

            //# profile user
            objProducts["id_kh"] = x.utm_content
            objProducts["chu_tai_khoan"] = x.chu_tai_khoan
            objProducts["so_tai_khoan"] = x.so_tai_khoan
            objProducts["ngan_hang"] = x.ngan_hang
            //# profile
            
            //#region transaction
            for( let i=0;i < products.rowCount;i++){
                objProducts[products.rows[i].product_id] = "0"
            }

            for (let i=0;i < transaction.rowCount;i++){
                if( transaction.rows[i].utm_content === x.utm_content ){
                    check = true
                    objProducts[ transaction.rows[i].product_id ] = transaction.rows[i].dem
                }
            }
            //#endregion

            
            //#endregion  ***
            if ( check === true ){
                newData.push(objProducts)
            }
            
            if( index + 1 === users.rowCount ){
                // console.log( newData )


                var csv = json2csv.parse( newData );

                fs.writeFile(`../2/data_ngay/[MC-Top1] Bảng thông kế chiến dịch tháng ${Thang} ${Nam}.csv`, csv, { encoding: 'utf8' }, function(err) {
                    if (err) throw err;
                   console.log('file saved');
                   for (let i=0;i<=2000;i++){}
                   var file = `../2/data_ngay/[MC-Top1] Bảng thông kế chiến dịch tháng ${Thang} ${Nam}.csv`
                   res.download(file,`[MC-Top1] Bảng thông kế chiến dịch tháng ${Thang} ${Nam}.csv`)
                });
            }
        })
    }catch(error){
        console.log( error )
    }
})

app.get('/ExportNhanVien' , async (req,res)=>{
    try{
        const date = new Date()
        //#region transaction
        const transaction = await pool.query(`
            select utm_content , product_id ,count(product_id)"dem" ,commission from "transaction" t 
            where transaction_time >= '${date.getFullYear()}-${
                transformTimeNumber(
                (date.getMonth()+1).toString()
                )}-${
                transformTimeNumber(date.getDate().toString())}'
            and t.status = 1
            group by product_id ,utm_content,commission
            order by utm_content 
        `)
        //#region transaction
        const products = await pool.query(`
            select product_id, count( product_id )"dem" from "transaction"
            where transaction_time >= '${date.getFullYear()}-${
                transformTimeNumber(
                (date.getMonth()+1).toString()
                )}-${
                transformTimeNumber(date.getDate().toString())}'
            and status = 1
            group by product_id 
            order by "dem" desc
        `)
        
        // console.log( transaction.rows )
        

        const users = await pool.query(`
            select * from khachhang_transaction kht,khachhangviewcode k
            where kht.utm_content = k.concat_ws 
            order by dem desc          
        `)

        const newData = []
        users.rows.map((x,index)=>{
            //
            let check = false
            // 
            //#region *** new obj products and profile user
            let objProducts = new Object()
            let arrayProducts = []

            //# profile user
            objProducts["id_kh"] = x.utm_content
            objProducts["chu_tai_khoan"] = x.chu_tai_khoan
            objProducts["so_tai_khoan"] = x.so_tai_khoan
            objProducts["ngan_hang"] = x.ngan_hang
            //# profile
            
            //#region transaction
            for( let i=0;i < products.rowCount;i++){
                objProducts[products.rows[i].product_id] = "0"
            }

            for (let i=0;i < transaction.rowCount;i++){
                if( transaction.rows[i].utm_content === x.utm_content ){
                    check = true
                    objProducts[ transaction.rows[i].product_id ] = transaction.rows[i].dem
                }
            }
            //#endregion

            
            //#endregion  ***
            if ( check === true ){
                newData.push(objProducts)
            }
            
            if( index + 1 === users.rowCount ){
                // console.log( newData )


                var csv = json2csv.parse( newData );

                fs.writeFile(`../2/data_ngay/[MC-Top1] Bảng thông kế chiến dịch ngày_${new Date().getDate()}_${new Date().getMonth() + 1}_${new Date().getFullYear()}.csv`, csv, { encoding: 'utf8' }, function(err) {
                    if (err) throw err;
                   console.log('file saved');
                   for (let i=0;i<=2000;i++){}
                   var file = `../2/data_ngay/[MC-Top1] Bảng thông kế chiến dịch ngày_${new Date().getDate()}_${new Date().getMonth() + 1}_${new Date().getFullYear()}.csv`
                   res.download(file,`[MC-Top1] Bảng thông kế chiến dịch ngày_${new Date().getDate()}_${new Date().getMonth() + 1}_${new Date().getFullYear()}.csv`)
                });
            }
        })
    }catch(error){
        console.log( error )
    }
})










// 








server.listen(port, () => console.log(`Listening on port ${port}`));