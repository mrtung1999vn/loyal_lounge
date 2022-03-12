const { lib } = require('crypto-js')
const fetch = require('node-fetch')
const { EncodeJson, DecodeString_AES, DecodeJson, DecodeJsonRequest, EncodeString, EncodeString_AES, DecodeString } = require('../../assets/encode_decode')
const { SendMailGoogle } = require('../../libs')

const jwt = require('jsonwebtoken');

const pool = require('../../pgconnect')
const encode_decode = require('../../assets/encode_decode')
const {timeNowDB} = require('../../assets/TimeLibary')
const moment = require('moment')

module.exports = function (app){
    app.get(`/WebNightClub/SuKien` , async (req,res)=>{
        try {
            
        console.log( req.headers )


        const ExcuteQueryEventWeek = await pool.query(`
            select * from su_kien 
            where to_timestamp(thoi_gian_dien, 'YYYY-MM-DD hh24:mi:ss')::timestamp >= now()
            order by thoi_gian_dien asc 
        `)
        const ExcuteQueryEventLimit = await pool.query(`
            select * from su_kien 
            where to_timestamp(thoi_gian_dien, 'YYYY-MM-DD hh24:mi:ss')::timestamp >= now()
            order by thoi_gian_dien asc
            limit 3 
        `)

        res.json({
            status:1,
            dataEventWeek:ExcuteQueryEventWeek.rows,
            dataEventWeekLimit: ExcuteQueryEventLimit.rows
        })

        } catch (error) {
            console.log( error )
        }
    })
}


