var randomstring = require("randomstring");
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const pool = require("../pgconnect");
const fetch = require('node-fetch');
const { EncodeJson, DecodeJson } = require("../assets/encode_decode");

require('dotenv').config()

// Tạo Block-chains
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

// Check Block-chains
const CheckJsonChains = ( data01, data02 )=>{
    try {
        let check = false
        if( data01.id_kh === data02.id_kh){
            check = true
        }else if( data01.noi_dung === data02.noi_dung){
            check = true
        }else if( data01.coin_tranfer === data02.coin_tranfer){
            check = true
        }else if( data01.ngay === data02.ngay){
            check = true
        }else if( data01.thang === data02.thang){
            check = true
        }else if( data01.nam === data02.nam){
            check = true
        }else if( data01.thoi_gian === data02.thoi_gian){
            check = true
        }else{
            check = false
        }
        return check
    } catch (error) {
        return false
    }
}
const CheckBlockChains = async ( id_kh ) => {
    try {
        // Check block-chains bao gồm :

        // var next_string = '_string_next'
        // var block_hash = EncodeJson({ id_kh, noi_dung, coin_tranfer, ngay, thang, nam, thoi_gian })
        // console.log(block_hash)
        // var json_hash = JSON.stringify({ id_kh, noi_dung, coin_tranfer, ngay, thang, nam, thoi_gian })
        // console.log(json_hash)
        // var next_hash = EncodeJson({ id_kh, noi_dung, coin_tranfer, next_string, ngay, thang, nam, thoi_gian })
        // console.log(next_hash)
        let checkBlockChains = false

        const ExcuteQuery = await pool.query(`
            select * from coin_bc_loyal
            where id_kh = ${ id_kh }
            order by created_at asc
        `)


        for(let i=0;i< ExcuteQuery.rowCount;i++){

            // Check Json
            if (i === 0){
                if( JSON.parse( ExcuteQuery.rows[0].json_hash ).coin_tranfer === ExcuteQuery.rows[0].coin_tranfer ){
                    checkBlockChains = true
                }else{
                    checkBlockChains = false
                }
            }else if( i + 1 !== ExcuteQuery.rowCount ){
                var block_hash = DecodeJson( ExcuteQuery.rows[i].block_hash )
                var json_hash = JSON.parse( ExcuteQuery.rows[i].json_hash )
                var next_hash = DecodeJson( ExcuteQuery.rows[i].next_hash )

                var pre_hash = DecodeJson( ExcuteQuery.rows[i+1].pre_hash )
                // console.log( CheckJsonChains( next_hash,json_hash ) )
                if( CheckJsonChains(block_hash,json_hash) && CheckJsonChains( next_hash,json_hash ) ){
                    checkBlockChains = true
                }
                else if( CheckBlockChains(block_hash,pre_hash  ) ){
                    checkBlockChains = true
                }else{
                    checkBlockChains = false
                }
            }else{
                var block_hash = DecodeJson( ExcuteQuery.rows[i].block_hash )
                var json_hash = JSON.parse( ExcuteQuery.rows[i].json_hash )
                var next_hash = DecodeJson( ExcuteQuery.rows[i].next_hash )

                if( CheckJsonChains(block_hash,json_hash) && CheckJsonChains( next_hash,json_hash ) ){
                    checkBlockChains = true
                }else{
                    checkBlockChains = false
                }
            }
            // //Check block_hash, json_hash pre_hash

            // ExcuteQuery.rows[i].block_hash
            // ExcuteQuery.rows[i].json_hash
            // ExcuteQuery.rows[i + 1].pre_hash
        }
        console.log( checkBlockChains  )
        return checkBlockChains
        // Check block-chains
        // console.log(ExcuteQuery.rows)
    } catch (error) {
        console.log(error)
        return false
    }
}


//#endregion
module.exports = {
    AddBlockChains, CheckBlockChains
}