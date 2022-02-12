    import React, { useState } from 'react'
import {positions, useAlert} from 'react-alert'
import TimeLibrary from '../../../../asset/TimeLibrary'
import Alert from '../../../../libs/Alert'
import host from '../../../../service/host'
import Token from '../../../../storage/Token'
function ThemDangXuLy({UpdateThemDangXuLy,du_lieu_loc,naptien,khachhang,onClickTaiLai}) {
    // {ten_nganh}
    const alert = useAlert()

    const onClickLoc =  async()=>{
        try {
            du_lieu_loc({tu_ngay,den_ngay,tim_theo_ten,tim_theo_ma,tim_theo_van,so_dt})
        } catch (error) {
            
        }
    }   

    console.log(TimeLibrary.timeNowDB)
    
    const [tu_ngay,set_tu_ngay] = React.useState('2021-08-28')
    const [den_ngay,set_den_ngay] = React.useState(TimeLibrary.timeNowDB.split(' ')[0])
    const [tim_theo_ten,set_tim_theo_ten] = React.useState('')
    const [tim_theo_ma,set_tim_theo_ma] = React.useState('')
    const [tim_theo_van,set_tim_theo_van] = React.useState('')
    const [so_dt,set_so_dt] = React.useState('')


    if(khachhang === true){
        return (
            <div className="row" onKeyPress={e=>e.key ==="Enter" ? onClickLoc() : ''}>
                <div className="col-md-12">
                    <div className="card card-primary">
                        <div className="card-header">
                            {/* <h3 className="card-title">Quick Example</h3> */}
                        </div>
                        <div className="card-body">
                        
                        </div>
                        <div className="card-footer">
                            {/* <div class="row">
                                <div className="col">
                                    Từ ngày
                                    <input className="form-control" type="date"
                                    onChange={e=>set_tu_ngay(e.target.value)}
                                    ></input>
                                </div>
                                <div className="col">
                                    Đến ngày
                                    <input className="form-control" type="date"
                                    onChange={e=>set_den_ngay(e.target.value)}
                                    ></input>
                                </div>
                            </div> */}
                            <div class="row">
                                <div className="col">
                                    Tìm theo tên
                                    <input className="form-control" type="text"
                                    onChange={e=>set_tim_theo_ten(e.target.value)}
                                    ></input>
                                </div>
                                {/* <div className="col">
                                    Tìm theo mã đơn
                                    <input className="form-control" type="text"
                                    onChange={e=>set_tim_theo_ma(e.target.value)}
                                    ></input>
                                </div> */}
                            </div>
                            <div className="row">
                            <div className="col">
                                    Số điện thoại
                                    <input className="form-control" type="text"
                                    onChange={e=>set_so_dt(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                {/* Tìm theo vận đơn
                                    <input className="form-control" type="text"
                                    onChange={e=>set_tim_theo_van(e.target.value)}
                                    ></input> */}
                                </div>
                                <div className="col">
                                    <label hidden={true}> 123-</label><br></br>
                                    <button className="btn btn-primary" style={{width:'100px'}}
                                    onClick={()=>onClickLoc()}
                                    >Lọc</button>
                                        

                                    <button className="btn btn-primary ml-3"
                                    onClick={()=>onClickTaiLai(true)}
                                    >Tải lại</button>


                                </div>
                            </div>    
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
    if(naptien === true){
        return (
            <div className="row" onKeyPress={e=>e.key ==="Enter" ? onClickLoc() : ''}>
                <div className="col-md-12">
                    <div className="card card-primary">
                        <div className="card-header">
                            {/* <h3 className="card-title">Quick Example</h3> */}
                        </div>
                        <div className="card-body">
                        
                        </div>
                        <div className="card-footer">
                            <div class="row">
                                <div className="col">
                                    Từ ngày
                                    <input className="form-control" type="date"
                                    value={tu_ngay}
                                    onChange={e=>set_tu_ngay(e.target.value)}
                                    ></input>
                                </div>
                                <div className="col">
                                    Đến ngày
                                    <input className="form-control" type="date"
                                    value={den_ngay}
                                    onChange={e=>set_den_ngay(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <div class="row">
                                <div className="col">
                                    Tìm theo tên
                                    <input className="form-control" type="text"
                                    onChange={e=>set_tim_theo_ten(e.target.value)}
                                    ></input>
                                </div>
                                {/* <div className="col">
                                    Tìm theo mã đơn
                                    <input className="form-control" type="text"
                                    onChange={e=>set_tim_theo_ma(e.target.value)}
                                    ></input>
                                </div> */}
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                {/* Tìm theo vận đơn
                                    <input className="form-control" type="text"
                                    onChange={e=>set_tim_theo_van(e.target.value)}
                                    ></input> */}
                                </div>
                                <div className="col">
                                    <label hidden={true}> 123-</label><br></br>
                                    <button className="btn btn-primary" style={{width:'100px'}}
                                    onClick={()=>onClickLoc()}
                                    >Lọc</button>



                                </div>
                            </div>    
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
    else{
        return (
            <div className="row" onKeyPress={e=>e.key ==="Enter" ? onClickLoc() : ''}>
                <div className="col-md-12">
                    <div className="card card-primary">
                        <div className="card-header">
                            {/* <h3 className="card-title">Quick Example</h3> */}
                        </div>
                        <div className="card-body">
                        
                        </div>
                        <div className="card-footer">
                            <div class="row">
                                <div className="col">
                                    Từ ngày
                                    <input className="form-control" type="date"
                                    value={tu_ngay}
                                    onChange={e=>set_tu_ngay(e.target.value)}
                                    ></input>
                                </div>
                                <div className="col">
                                    Đến ngày
                                    <input className="form-control" type="date"
                                    value={den_ngay}
                                    onChange={e=>set_den_ngay(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <div class="row">
                                <div className="col">
                                    Tìm theo tên
                                    <input className="form-control" type="text"
                                    onChange={e=>set_tim_theo_ten(e.target.value)}
                                    ></input>
                                </div>
                                <div className="col">
                                    Tìm theo mã đơn
                                    <input className="form-control" type="text"
                                    onChange={e=>set_tim_theo_ma(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                Tìm theo vận đơn
                                    <input className="form-control" type="text"
                                    onChange={e=>set_tim_theo_van(e.target.value)}
                                    ></input>
                                </div>
                                <div className="col">
                                    <label hidden={true}> 123-</label><br></br>
                                    <button className="btn btn-primary" style={{width:'100px'}}
                                    onClick={()=>onClickLoc()}
                                    >Lọc</button>
                                </div>
                            </div>    
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
  
}

export default ThemDangXuLy
