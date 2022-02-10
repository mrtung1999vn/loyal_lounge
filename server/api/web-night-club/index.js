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
    
}


