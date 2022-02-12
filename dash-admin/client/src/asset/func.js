import Encodr from 'encodr'
import crypto from 'crypto-js'
import _3DES from 'nodejs3des'
const MSGPACK = new Encodr("msgpack")
const Encode_LoopBtoa = (n,data)=>{
    var result = data
    for(let i=0;i<n;i++){
        result  = window.btoa(result)
    }
    return result
}
const Decode_LoopAtoa = (n,data)=>{
    var result = data
    for(let i=0;i<n;i++){
        result  = window.atob(result)
    }
    return result
}

const EncodeJson = (_data)=>{
    try {
        var result = MSGPACK.encode(_data).toString('hex') 
        return  Encode_LoopBtoa(5,result)  
    } catch (error) {
        console.log(error)
    }
} // return String

const DecodeJson = (_data)=>{
    var result = Decode_LoopAtoa(5,_data)
    return MSGPACK.decode(Buffer.from(result,'hex')) 
                                                    // Key     ,Value
}// return Json


const EncodeString_AES = (key,data)=>{
    return crypto.AES.encrypt(data,key)
}

const DecodeString_AES = (key,data)=>{

    return crypto.AES.decrypt(data,key).toString(crypto.enc.Utf8)
}

const EncodeString = (key,data)=>{
    return _3DES.encrypt(key,data)
}

const DecodeString = (key,data)=>{
    try{
        return _3DES.decrypt(key,data)
    }catch{

    }
    
}





const DecodeJson_RESPONSE = (_data)=>{
    return MSGPACK.decode(Buffer.from(_3DES.decrypt('SharedKey',_data),'hex')) 
                                                    // Key     ,Value
}// return Json




function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }


// console.log(EncodeString('admin','admin123'))
export default  {
    Encode_LoopBtoa,EncodeString,DecodeString,
    EncodeJson,DecodeJson
    ,EncodeString_AES,DecodeString_AES,Decode_LoopAtoa,isNumeric,DecodeJson_RESPONSE
}