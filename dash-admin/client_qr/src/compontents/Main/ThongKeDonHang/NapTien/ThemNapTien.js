import React, { useState ,useRef, useEffect} from 'react'
import {positions, useAlert} from 'react-alert'
import func from '../../../../asset/func'
import Alert from '../../../../libs/Alert'
import host from '../../../../service/host'
import Token from '../../../../storage/Token'
function getRandomInt(max) {
    return Math.floor(Math.random() * max).toString();
  }
  
function ThemNapTien({UpdateThemNapTien}) {
    // {ten_nganh}
    const timeTimeoutRef = useRef(null)
    const alert = useAlert()
    const [ten_nganh,setten_nganh] = useState('')
    const [tai_khoan_khach,settai_khoan_khach] = React.useState('')
    const [so_tien,setso_tien] = React.useState(0)
    const [ghi_chu,setghi_chu] = React.useState('')
    const DefaulValue = ()=>{
        setten_nganh('');settai_khoan_khach('');
        setso_tien(0)
    }
    const [captcha,setCaptcha] = React.useState(getRandomInt(10000))
    const [captchaConfirm,setCaptchaConfirm] = React.useState('')
    const onClickThemNapTien =  async()=>{
        try {
            console.log(tai_khoan_khach === '')
            if(tai_khoan_khach === ''){
                alert.info("Người dùng chưa chọn tài khoản",{position:positions.BOTTOM_CENTER})
            }else if(so_tien === 0){
                alert.info("Người dùng chưa điền số tiền",{position:positions.BOTTOM_CENTER})
            }else if(ghi_chu === ''){
                alert.info("Người dùng điền ghi chú khách hàng",{position:positions.BOTTOM_CENTER})
            }else 
            {
                var token = (await Token.Token()).toString()
                
                const response = await fetch(host.NapTien,{
                    method:"POST",
                    headers:{"Content-Type" : "application/json"},
                    body:JSON.stringify({token,tai_khoan_khach,ghi_chu,so_tien})
                })
                const JsonData = await response.json()
                // console.log(JsonData)
                if( JsonData.status === 1 ){
             
                    alert.success(JsonData.message,{position:positions.BOTTOM_CENTER})
                    // DefaulValue()
                    UpdateThemNapTien(JsonData.data)
                }else{
                    alert.info(JsonData.message,{position:positions.BOTTOM_CENTER})
                }
            }
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        // setCaptcha(getRandomInt(10000))
    },[])
    const [DSKhachHang,setDSKhachHang] = React.useState([])
    const onChangeTimTenKhach = async (e)=>{
        try{
            const value = e 
            if(timeTimeoutRef.current){
                clearTimeout(timeTimeoutRef.current)
            }
            
            timeTimeoutRef.current = setTimeout(async ()=>{
                    const response = await fetch(host.KhachHang + `/${value}`)
                    const JsonData = await response.json()
        
                    if(JsonData.status === 1){
                        const newData = []
                        
                        func.DecodeJson_RESPONSE(JsonData.data).map((x,index)=>{
                            newData.push({
                                ten_kh : x.ten_kh,
                                tai_khoan_khach : x.tai_khoan_khach,
                                so_dt: func.DecodeString("GIO_HANG",x.tai_khoan_khach)
                            })
                            if(index + 1 === func.DecodeJson_RESPONSE(JsonData.data).length){
                                setDSKhachHang(newData)
                            }
                        }
                        )
                    }else{
                        
                    }
            },500)
      
              
      
        }catch(error){

        }
    }


    return (
        <div className="row" onKeyPress={e=>e.key ==="Enter" ? onClickThemNapTien() : ''}>
            <div className="col-md-12">
                <div className="card card-primary">
                    <div className="card-header">
                        {/* <h3 className="card-title">Quick Example</h3> */}
                    </div>
                    <div className="card-body">
                    <div className="row">
                        <label>Tìm tên khách</label>
                        <input className="form-control" onChange={e=>
                            onChangeTimTenKhach(e.target.value)}/>
                    </div>
                    <div className="row">
                        Số điện thoại <label style={{color:'green'}}> (Đăng nhập)</label>
                        <select className="form-control" 
                        onChange={e=>settai_khoan_khach(e.target.value)}
                        >
                            <option value="">Chọn tài khoản</option>
                            {DSKhachHang.map(x=><option value={x.tai_khoan_khach}>{x.ten_kh}</option>)}
                        </select>
                    </div>
                        <div className="row ">
                            <div className="col col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Số tiền</label>
                                    <input type="text" 
                                    className="form-control" id="exampleInputEmail1"
                                    value={so_tien}
                                    onChange={e=>setso_tien(e.target.value)}
                                    placeholder="Số tiền" />
                                </div>
                                <label style={{color:'green'}}>{
                                parseInt(so_tien).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</label>
                            </div>
                            <div className="col col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Ghi chú</label>
                                    <input type="text" 
                                    className="form-control" id="exampleInputEmail1"
                                    value={ghi_chu}
                                    onChange={e=>setghi_chu(e.target.value)}
                                    placeholder="" />
                                </div>
                            </div>
                      
                        </div>
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary"
                        onClick={onClickThemNapTien}
                        style={{float:'right'}}>Nạp tiền</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThemNapTien
