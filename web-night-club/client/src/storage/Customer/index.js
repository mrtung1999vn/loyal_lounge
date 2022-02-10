import func from "../../asset/func"

const setCustomer = (data)=>{
    window.localStorage.setItem(func.Encode_LoopBtoa(10,'Customer'), data)
}
const getCustomer = ()=>{
    return window.localStorage.getItem(func.Encode_LoopBtoa(10,'Customer'))
}

export default {
    setCustomer,getCustomer
}