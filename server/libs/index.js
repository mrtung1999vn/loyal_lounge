var randomstring = require("randomstring");
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const pool = require("../pgconnect");
const fetch = require('node-fetch')

require('dotenv').config()

const smtpTransport  = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // user: 'mctop1.vn@gmail.com',
      // pass: 'thanhan2901',
      user: 'hethong3000@gmail.com',
      pass: 'TUng0936563013*',
    }
  });
  const SendMailGoogle = async (email,subject,text)=>{
      try {
        const res = await fetch(process.env.URL_LINK_SEND_GMAIL,{
            method:"POST",
            headers:{"Content-Type" : "application/json"},
            body:JSON.stringify({email,subject,text})
        })
        const content = await res.JSON()
        if(content.status === 1){
          return 1
        }else{
          return 0
        }
      } catch (error) {
        return 0
      }
  }

  // SendMailGoogle('quachthanhtung1999@gmail.com','demo012','demo222')
  const checkRequest = (value)=>{
    const arrayRequest = process.env.checkRequest.split('|')
    // if(  )
    let check = false
    for(let i=0;i<=arrayRequest.length;i++){
      if( value.indexOf(arrayRequest[i]) >= 0 ){
        return true
      }else{
        check = false
      }
    }
    console.log( arrayRequest )
    return check
  }

  const createGift = async ()=>{
    try {
      function makeid(length) {
        var dateNow = new Date()
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return `0${dateNow.getDate()}${dateNow.getFullYear()}${dateNow.getSeconds()}${result}`;
    }
    for(let i=0;i<=5;i++){
        const newData = await pool.query(`
        insert into giam_gia(ma_giam,created_at,updated_at,gia_tri,check_bool)
        values(
          N'${makeid(5)}',NOW(),NOW(),N'500000',false
        )
      `)
    }
    console.log(makeid(5));
    } catch (error) {
      console.log( error )
    }
  }
  // createGift()
  module.exports = {
      SendMailGoogle, checkRequest
  }