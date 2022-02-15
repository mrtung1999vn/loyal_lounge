var randomstring = require("randomstring");
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const pool = require("../pgconnect");
const fetch = require('node-fetch');
const { EncodeJson, DecodeJson } = require("../assets/encode_decode");

require('dotenv').config()

const AddBlockChains = async (id_kh, noi_dung, coin_tranfer, ngay, thang, nam, thoi_gian) => {
    try {
        var next_string = '_string_next'
        var block_hash = EncodeJson({ id_kh, noi_dung, coin_tranfer, ngay, thang, nam, thoi_gian })
        console.log(block_hash)
        var json_hash = JSON.stringify({ id_kh, noi_dung, coin_tranfer, ngay, thang, nam, thoi_gian })
        console.log(json_hash)
        var next_hash = EncodeJson({ id_kh, noi_dung, coin_tranfer, next_string, ngay, thang, nam, thoi_gian })
        console.log(next_hash)

        // Tạo mặc định coin demo
        const CheckCoin = await pool.query(`
            select * from tai_khoan
        `)

        for (let i = 0; i < CheckCoin.rowCount; i++) {
            try {
                const CoinUser = await pool.query(`
                select * from coin_bc_loyal
                where id_kh = ${CheckCoin.rows[i].id_kh}
            `)
                if (CoinUser.rowCount === 0) {
                    var id_kh = CheckCoin.rows[i].id_kh
                    var noi_dung = ''
                    var coin_tranfer = 0
                    var block_hash = EncodeJson({ id_kh, noi_dung, coin_tranfer, ngay, thang, nam, thoi_gian })
                    var json_hash = JSON.stringify({ id_kh, noi_dung, coin_tranfer, ngay, thang, nam, thoi_gian })
                    var next_hash = EncodeJson({ id_kh, noi_dung, coin_tranfer, next_string, ngay, thang, nam, thoi_gian })
                    await pool.query(
                        `
                insert into coin_bc_loyal (
                    id_kh,block_hash,json_hash,created_at,updated_at,noi_dung,coin_tranfer,pre_hash,next_hash,ngay,thang,nam,thoi_gian,status
                )values(
                    ${CheckCoin.rows[i].id_kh},N'${block_hash}',N'${json_hash}',now(),now(),N'',N'0',N'pre_hash',N'${next_hash}',N'${ngay}',N'${thang}',N'${nam}',N'${thoi_gian}',true
                )
                `
                    )
                }
            } catch (error) {
                console.log(error)
            }
        }

        // Tạo mặc định coin demo
        
        // Tạo block-chains
        const CheckAddBlockChains = await pool.query(`
            select * from tai_khoan where id_kh = ${id_kh}
        `)

        
        if( CheckAddBlockChains.rowCount > 0 ){
            const ExcuteQuery = await pool.query(
                `
                insert into coin_bc_loyal (
                    id_kh,block_hash,json_hash,created_at,updated_at,noi_dung,coin_tranfer,pre_hash,next_hash,ngay,thang,nam,thoi_gian,status
                )values(
                    ${id_kh},N'${block_hash}',N'${json_hash}',now(),now(),N'${noi_dung}',N'${coin_tranfer}',(
                        select block_hash from coin_bc_loyal
                        where id_kh = ${id_kh}
                        order by created_at desc
                        limit 1
                    ),N'${next_hash}',N'${ngay}',N'${thang}',N'${nam}',N'${thoi_gian}',false
                )
                `
            )
            return true
        }else{
            return false
        }
        // Tạo block-chains
    } catch (error) {
        console.log(error)
    }
}

const CheckBlockChains = async ({ id_kh }) => {
    try {
        // Check block-chains bao gồm :

        // var next_string = '_string_next'
        // var block_hash = EncodeJson({ id_kh, noi_dung, coin_tranfer, ngay, thang, nam, thoi_gian })
        // console.log(block_hash)
        // var json_hash = JSON.stringify({ id_kh, noi_dung, coin_tranfer, ngay, thang, nam, thoi_gian })
        // console.log(json_hash)
        // var next_hash = EncodeJson({ id_kh, noi_dung, coin_tranfer, next_string, ngay, thang, nam, thoi_gian })
        // console.log(next_hash)

        
        const ExcuteQuery = await pool.query(`
        select * from coin_bc where id_kh = ${id_kh}
        `)
        // Check block-chains
        console.log(ExcuteQuery.rows)
    } catch (error) {
        console.log(error)
    }
}


//#endregion
module.exports = {
    AddBlockChains, CheckBlockChains
}