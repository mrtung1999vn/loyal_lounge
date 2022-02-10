
const pool = require('../../pgconnect')
const express = require('express')
var fs = require("fs")
var jwt = require('jsonwebtoken');
var encode_decode = require("../../assets/encode_decode")

var privateKey = fs.readFileSync(__dirname+'/private.key');

module.exports = function(app) {
 
    app.get('/Token/:key' , async(req,res)=>{
        try {
            const {key} = req.params

            if(key === "0366262072"){
                const newQuery = await pool.query(`SELECT * from token`)
                // console.log(encode_decode.EncodeString_AES("0366262072", newQuery.rows[0].token_te).toString())
                res.json({
                    status:1,
                    message:"Thành công",
                    data:  encode_decode.EncodeString_AES("0366262072", newQuery.rows[0].token_te).toString()
                })
            }else{
                res.json({
                    status:0,
                    message:'Hết phiên thao tác người dùng',
                    data: []
                })
            }
        } catch (error) {
            // console.log(error)
            res.json({
                status:0,
                message:'Hết phiên thao tác người dùng',
                data:[]
            })
        }
    })
  
}








