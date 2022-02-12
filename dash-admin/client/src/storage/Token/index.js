import func from "../../asset/func"
import host from "../../service/host"


const Token = async ()=>{
    try {
        const responseToken = await fetch(host.token)
        const _Token = await responseToken.json()
        
        if(_Token.status === 1){
            return func.DecodeString_AES("0366262072",_Token.data).toString() + host.SHOP
        }
        else{
            return ""
        }
    } catch (error) {
        console.log(error)
    }
}

export default {
    Token
}