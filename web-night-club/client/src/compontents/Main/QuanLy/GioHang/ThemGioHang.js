import React, { useState ,useRef} from 'react'
import {positions, useAlert} from 'react-alert'
import Alert from '../../../../libs/Alert'
import host from '../../../../service/host'
import Token from '../../../../storage/Token'
import { storage } from "../../../../firebase/index";
import func from '../../../../asset/func'
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
var date = new Date()
const timeNow = `${(date).getDate()}-${(date).getMonth()+1}-${(date).getFullYear()}`



function ThemGioHang({UpdateThemGioHang}) {
    const timeTimeoutRef = useRef(null)
    const alert = useAlert()
    const [title,settitle] = useState(' ')
    const [price,setprice] = useState('')
    const [qty,setqty] = useState('')
    const [web,setweb] = useState('')
    const [note,setnote] = useState('')
    
    // Tìm kiếm
    const [ten_khach,setten_khach] = React.useState('')



    // IMAGE
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState("");

    const DefaulValue = ()=>{
        settitle(' ');setprice('')
        setqty('');setImage('')
        setweb('');setUrl('')
        settai_khoan_khach('');setnote('')
    }
    const handleChange = e => {
        const file = e.target.files[0];
    
        if (file) {
          const fileType = file["type"];
          const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
          if (validImageTypes.includes(fileType)) {
            setError("");
            setImage(file);
            handleUpload(file)
          } else {
            console.log("error");
            setError("error please upload a image file");
          }
        }
    };

    const handleUpload = (image) => {
    var path_1 = getRandomInt(10000)
    var path_2 = getRandomInt(10000)
    if (image) {
        // add to image folder in firebase
        const uploadTask = storage.ref(`images/${timeNow}/${path_1}/${path_2}/${image.name}`).put(image);
        // Listen for state changes, errors, and completion of the upload.
        UpdateThemGioHang(true)
        uploadTask.on(
        "state_changed",
        snapshot => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
        },
        error => {
            // error function ....
            console.log(error);
            setError(error);
        },
        () => {
            // complete function ....
            storage
            .ref(`images/${timeNow}/${path_1}/${path_2}`)
            .child(image.name) // Upload the file and metadata
            .getDownloadURL() // get download url
            .then(url => {
                console.log(url);
                setUrl(url);
                setProgress(0);
                UpdateThemGioHang(false)
            });
        }
        );
    } else {
        setError("Error please choose an image to upload");
    }
    };

    // IMAGE

    const onClickThemGioHang =  async()=>{
        try {
            
            if(title === '' || price === '' || qty === '' || image === null
            || web === '' || note === '' || tai_khoan_khach === ''
            ){
                alert.info(
                    title === '' ? 'Người dùng chưa điền tên sản phẩm!' : 
                    price === '' ? 'Người dùng điền giá' :
                    qty === '' ? 'Người dùng điền số lượng' :
                    image === '' ? 'Người dùng chưa chọn ảnh' : 
                    web === '' ? 'Người dùng chưa điền trang web' : 
                    note === '' ? 'Người dùng điền ghi chú' : 'Chưa chọn tài khoản'
                ,{position:positions.BOTTOM_CENTER})
            }else{
                // console.log({
                //     trangthai
                // })
                UpdateThemGioHang(true)
                var token = "order0phi"
                var image = url
                
                console.log({ token, title, price, web, note, tai_khoan_khach, qty, image })
                const response = await fetch(host.ThemGioHangKH,{
                    method:"POST",
                    headers:{"Content-Type" : "application/json"},
                    body:JSON.stringify({ token, title, price, web, note, tai_khoan_khach, qty, image })})
                const JsonData = await response.json()
                // console.log(JsonData)
                if( JsonData.status === 1 ){
                    alert.success("Thêm thành công",{position:positions.BOTTOM_CENTER})
                    DefaulValue()
                    UpdateThemGioHang(false)
                    
                }else{
                    alert.info(JsonData.message,{position:positions.BOTTOM_CENTER})
                }
            }
        } catch (error) {
            
        }
    }
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
    console.log(DSKhachHang)
    const [tai_khoan_khach,settai_khoan_khach] = React.useState('')
    return (
        <div className="row" onKeyPress={e=>e.key ==="Enter" ? onClickThemGioHang() : ''}>
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
                        <select className="form-control" value={tai_khoan_khach}
                        onChange={e=>settai_khoan_khach(e.target.value)}
                        >
                            <option value="">Chọn tài khoản</option>
                            {DSKhachHang.map(x=><option value={x.tai_khoan_khach}>{x.so_dt + "_" +x.ten_kh}</option>)}
                        </select>
                    </div>
                    <div className="row ">
                            {/* <div className="col col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Tên sản phẩm</label>
                                    <input type="text" 
                                    className="form-control" id="exampleInputEmail1"
                                    value={title}
                                    onChange={e=>settitle(e.target.value)}
                                    placeholder="Tên sản phẩm" />
                                </div>
                            </div> */}
                            <div className="col col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Đường dẫn</label>
                                    <input type="text" 
                                    className="form-control" id="exampleInputEmail1"
                                    value={web}
                                    onChange={e=>setweb(e.target.value)}
                                    placeholder="Đường dẫn" />
                                    {/* <select className="form-control"
                                    value={loai_tk}
                                    onChange={e=>setloai_tk(e.target.value)}
                                    >
                                        <option className="">Chọn loại tài khoản</option>
                                        <option className="Tài khoản hệ thống">Tài khoản hệ thống</option>
                                        <option className="Tài khoản khách">Tài khoản khách</option>
                                    </select> */}
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Giá tệ</label>
                                    <input type="text" 
                                    className="form-control" id="exampleInputEmail1" 
                                    value={price}
                                    onChange={e=>setprice(e.target.value)}
                                    placeholder="Giá tệ" />
                                </div>
                            </div>
                            <div className="col col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Số lượng</label>
                                    <input type="text" className="form-control" 
                                    id="exampleInputEmail1" 
                                    value={qty}
                                    onChange={e=>setqty(e.target.value)}
                                    placeholder="Số lượng" />
                                </div>
                            </div>
                        </div>


                        <div className="row ">
                            <div className="col col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Ghi chú</label>
                                    <input type="text" 
                                    className="form-control" 
                                    value={note}
                                    onChange={e=>setnote(e.target.value)}
                                    id="exampleInputEmail1" placeholder="Ghi chú" />
                                </div>
                            </div>
                            {/* <div className="col col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Xác nhận mật khẩu</label>
                                    <input type="password" className="form-control" 
                                    id="exampleInputEmail1" placeholder="Xác nhận mật khẩu"
                                    value={xacnhan_mk} 
                                    onChange={e=>setxacnhan_mk(e.target.value)}
                                    />
                                </div>
                            </div> */}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputFile">Ảnh</label>
                            <div className="input-group">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input"
                                    onChange={handleChange}
                                    id="exampleInputFile" />
                                    <label className="custom-file-label" htmlFor="exampleInputFile"
                                    style={{cursor:'pointer'}}
                                    ></label>
                                </div>
                                {/* <div className="input-group-append"
                                style={{cursor:'pointer'}}>
                                    <span className="input-group-text"
                                    onClick={handleUpload}
                                    >Tải ảnh</span>
                                </div> */}
                            </div>
                        </div>
                        <div style={{ height: "100px" }}>
                            <p style={{color:"red"}}>{error}</p>
                            <p style={{color:"green"}} hidden={progress === 0 ? true : false}>{progress} %</p>
                            {progress > 0 ? <progress value={progress} max="100" style={{width:'300px'}}/> : ""}
                        </div>
                        <div className="text-center">
                        {url ? (
                                <img src={url} alt="Uploaded images" style={{width:'300px',height:'300px'}}/>
                            ) : (
                                <img src="" style={{width:'300px',height:'300px'}}/>
                            )}
                        </div>
                  
                        {/* <div className="form-check">
                            <input type="checkbox" className="form-check-input" 
                            onClick={async ()=>settrangthai(!trangthai)}
                            checked={trangthai}
                            id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Bạn có muốn kích hoạt tài khoản?</label>
                        </div> */}
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary"
                        onClick={onClickThemGioHang}
                        style={{float:'right'}}>Thêm giỏ hàng</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThemGioHang
