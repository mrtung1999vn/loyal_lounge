import React, { useState } from 'react'
import {positions, useAlert} from 'react-alert'
import Alert from '../../../../libs/Alert'
import host from '../../../../service/host'
import Token from '../../../../storage/Token'
function ThemNganhHang({UpdateThemNganhHang}) {
    // {ten_nganh}
    const alert = useAlert()
    const [ten_nganh,setten_nganh] = useState('')

    const DefaulValue = ()=>{
        setten_nganh('')
    }

    const onClickThemNganhHang =  async()=>{
        try {
            if(ten_nganh === '' ){
                alert.info("Người dùng chưa điền tên ngành hàng!",{position:positions.BOTTOM_CENTER})
            }else{
                // console.log({
                //     trangthai
                // })
                var token = (await Token.Token()).toString()
                console.log({ten_nganh})
                console.log(host.DSNganhHangThem)
                const response = await fetch(host.DSNganhHangThem,{
                    method:"POST",
                    headers:{"Content-Type" : "application/json"},
                    body:JSON.stringify({ten_nganh,token})})
                const JsonData = await response.json()
                // console.log(JsonData)
                if( JsonData.status === 1 ){
                    
                    alert.success(JsonData.message,{position:positions.BOTTOM_CENTER})
                    DefaulValue()
                    UpdateThemNganhHang(JsonData.data)
                }else{
                    alert.info(JsonData.message,{position:positions.BOTTOM_CENTER})
                }
            }
        } catch (error) {
            
        }
    }

    return (
        <div className="row" onKeyPress={e=>e.key ==="Enter" ? onClickThemNganhHang() : ''}>
            <div className="col-md-12">
                <div className="card card-primary">
                    <div className="card-header">
                        {/* <h3 className="card-title">Quick Example</h3> */}
                    </div>
                    <div className="card-body">
                    
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThemNganhHang
