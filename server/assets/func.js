const pool = require('../pgconnect')

const date = new Date()

var date_csdl = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` 

function sleep(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}

const GuiThongBao = async (tieu_de,noi_dung,ngay,loai_tb,id_don,image)=>{
        try{
            // console.log(tieu_de,noi_dung,ngay,loai_tb,id_don,image)
            const khachhang = await pool.query(`select id_kh from don_hang where id_don = ${id_don}`)

            const newQuery = await pool.query(`
            insert into thong_bao(tieu_de,noi_dung,ngay,loai_tb,id_kh,id_don,image,trang_thai_xem)
            values(
                N'${tieu_de}',N'${noi_dung}','${ngay}',N'${loai_tb}',${khachhang.rows[0].id_kh},${id_don},N'${image}',false
            )
        `)
        }catch(error){
            console.log(error)
        }
      
}

const CapNhapGiaTienDon = async (id_don)=>{
    try {
        const newData = await pool.query(`
            update don_hang set tong_tien = 
            (
                select sum(
                    qty*price*(select ti_gia_tinh from khachhang where id_kh = don_hang.id_kh) 
                ) from don_hang_ct,don_hang
                where don_hang.id_don = ${id_don}
                and don_hang.id_don = don_hang_ct.id_don
            )
            where don_hang.id_don = ${id_don}
        `)
        return newData.rowCount
    } catch (error) {
        console.log(error)
    }
}


//#region BlockChains

//#endregion

module.exports = {
    sleep,date_csdl,GuiThongBao,CapNhapGiaTienDon
}