import func from "../../asset/func"

const setUser = (data)=>{
    window.localStorage.setItem(func.Encode_LoopBtoa(10,'User'), data)
}
const getUser = ()=>{
    return window.localStorage.getItem(func.Encode_LoopBtoa(10,'User')) === null ? [] :
    func.DecodeJson(window.localStorage.getItem(func.Encode_LoopBtoa(10,'User')))
}
const clearUser= ()=>{
    window.localStorage.removeItem(func.Encode_LoopBtoa(10,'User'))
}

const setUserLogin = (data)=>{
    window.localStorage.setItem(func.Encode_LoopBtoa(10,'UserLogin'), data)
}
const getUserLogin = ()=>{
    return window.localStorage.getItem(func.Encode_LoopBtoa(10,'UserLogin')) === null ? [] :
    func.DecodeJson(window.localStorage.getItem(func.Encode_LoopBtoa(10,'UserLogin')))
}


export default {
    setUser,getUser,setUserLogin,getUserLogin,clearUser

}