import React, { useState } from 'react'
import host from '../../service/host'
import { storage } from '../../firebase'
import Select from 'react-select'
import QrReader from 'react-qr-scanner'
import $ from 'jquery'

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
})

function AddBooking({ handleAddBooking, ListTypeBooking, handleChangeTypeBooking, chooseTypeBooking,
    onClickLoadForm,
    onHandleOnClickSuKien
}) {

    const [NameBooking, setNameBooking] = React.useState('')
    const [Password, setPassword] = React.useState('')
    const [RePassword, setRePassword] = React.useState('')
    const [Address, setAddress] = React.useState('')
    const [PhoneNumber, setPhoneNumber] = React.useState('')

    const [Status, setStatus] = React.useState('')

    const [options, setOptions] = React.useState([])
    // 

    const [Description, setDescription] = React.useState('')
    const [Price, setPrice] = React.useState(0)
    const [Amount, setAmount] = React.useState(0)
    const [userName, setUserName] = React.useState('')
    const [TypeBooking, setTypeBooking] = React.useState('')

    // 
    //#region Image
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    const defaultValue = async () => {
        try {

            setNameBooking(''); setPassword(''); setRePassword(''); setAddress('')

            setPhoneNumber(''); setStatus(''); setImage(null); setUrl('')

            setProgress(0)

        } catch (error) {

        }
    }

    const handleChange = e => {
        var date = new Date()
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            let image = e.target.files[0]

            function makeid(length) {

                var result = '';
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for (var i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() *
                        charactersLength));
                }
                return `${result}_${date.getSeconds()}_${date.getDate()}_${date.getMonth()}`;
            }
            var randomString = makeid(5)
            var url_image = `images/${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}/${randomString}/${image.name}`
            const uploadTask = storage.ref(url_image).put(image);

            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref(`images/${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}/${randomString}`)
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            setUrl(url);
                        });
                }
            );
        }

    };


    //#endregion
    const onClickAddBooking = async () => {
        try {
            if (TypeBooking === '') {
                alert('User has not selected a transaction type!')
            } else if (Description === '') {
                alert('Description cannot be blank!')
            } else if (Price === 0) {
                alert('Price cannot be blank and 0!')
            } else if (userName === 0) {
                alert('User name cannot be blank!')
            } else {
                // email,mat_khau,created_at,updated_at,status,dia_chi,so_dt,mat_khau_hash,image

                console.log({ chooseTypeBooking, Description, Price, Amount, url })

                var image = url === '' ? `https://firebasestorage.googleapis.com/v0/b/loyal-lounge.appspot.com/o/User_font_awesome.svg.png?alt=media&token=2d674b84-1646-4d51-a862-9c780e0a3460` : url
                var dia_chi = Address

                const res = await fetch(host.WebDashDanhSachBooking, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ TypeBooking, Description, Price, userName })
                })
                const content = await res.json()
                if (content.status === 1) {
                    alert(content.msg_en)
                    handleAddBooking(true)
                    defaultValue()
                } else {
                    alert(content.msg_en)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const [SuKienHienTai, setSuKienHienTai] = React.useState([])

    const getDataSuKien = async () => {
        try {
            const res = await fetch(host.WebDashsuKienHienTai)
            const content = await res.json()

            if (content.status === 1) {
                setSuKienHienTai(content.data)
                let DataSuKien = content.data
                let newData = []
                newData.push({ 'value': '', 'label': '' })
                for (let i = 0; i < DataSuKien.length; i++) {
                    var obj = {}
                    obj['value'] = DataSuKien[i].id_su_kien
                    obj['label'] = `ID: ${DataSuKien[i].id_su_kien} ` + DataSuKien[i].ten_su_kien + ` $${DataSuKien[i].gia}`

                    newData.push(obj)

                }
                setOptions(newData)
            } else {

            }

        } catch (error) {

        }
    }



    const [data, setData] = React.useState('')
    const [data_su_kien, setdata_su_kien] = React.useState('')
    const [FormKhachHang, setFormKhachHang] = React.useState([])
    const onClickTypeSuKien01 = (e) => {
        onHandleOnClickSuKien(e)
    }
    const onChangeQRCODE = async (e) => {
        try {
            setData(e.text)

            let data = e.text

            $("#id_check_form").prop("disabled", true);
            if (data_su_kien === '') {
                alert('Choose event')
            } else if (data === '') {
                alert('Scan customer qr code')
            } else {
                let id_su_kien = data_su_kien?.value
                let id_kh = data
                const res = await fetch(host.AppQuetKhachHang, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id_su_kien, id_kh })
                })
                const content = await res.json()
                if (content.status === 1) {
                    setFormKhachHang(content.data)
                } else {

                }
            }
            $("#id_check_form").prop("disabled", false);


        } catch (error) {

        }
    }


    // QR code
    React.useEffect(() => {
        try {
            getDataSuKien()
            // let newData = []
            // const options = [
            //     { value: '', label: 'Choose status' },
            //     { value: 'true', label: 'True' },
            //     { value: 'false', label: 'False' }
            // ]
            // for (let i = 0; i < ListTypeBooking.length; i++) {
            //     var obj = {}
            //     obj['value'] = ListTypeBooking[i].id_loai_sp
            //     obj['label'] = ListTypeBooking[i].ten_loai_sp

            //     newData.push(obj)

            // }
            // setOptions([
            //     {value:'Cash payment', label:'Cash payment'},
            //     {value:'Payment via Paypal', label:'Payment via Paypal'}
            // ])

        } catch (error) {

        }
    }, [ListTypeBooking])


    const onClickCheckForm = async () => {
        try {
            $("#id_check_form").prop("disabled", true);
            if (data_su_kien === '') {
                alert('Choose event')
            } else if (data === '') {
                alert('Scan customer qr code')
            } else if (FormKhachHang.length < 0) {
                alert('Scan customer qr code')
            }
            else {
                let id_su_kien = data_su_kien?.value
                let id_kh = data
                const res = await fetch(host.AppQuetKhachHang + `/CheckForm`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id_su_kien, id_kh, FormKhachHang })
                })
                const content = await res.json()
                if (content.status === 1) {
                    alert('success')
                    // setdata_su_kien('')
                    setFormKhachHang([])
                    // onCheckFormData(true)
                } else {
                    setFormKhachHang([])
                    // onCheckFormData(true)
                    alert('error')
                }
            }
            $("#id_check_form").prop("disabled", false);
        } catch (error) {

        }
    }

    // console.log(data )
    const onClickSuKien = (e) => {
        setdata_su_kien(e)
    }
    return (
        <div className="white_card_body">
            <div className="row">

                <div className="col-lg-6">
                    <div className="common_input mb_20">
                        <label>Type Booking </label>
                        <Select options={options}
                            onChange={(e) => onClickTypeSuKien01(e)}
                            styles={{
                                width: '100%',
                                height: '100px'
                            }} />

                    </div>
                </div>

                {/* <div className="col-lg-6">
                    <div className="common_input mb_20">
                        <label>Type Booking </label>
                        <Select options={options}
                            onChange={(e)=>onHandleOnClickSuKien(e)}
                            styles={{
                                width: '100%',
                                height: '100px'
                            }} />

                    </div>
                </div> */}



            </div>


            <QRCodeCheck data={data}
                options={options}
                onChangeQRCODE={onChangeQRCODE} onClickCheckForm={onClickCheckForm} onClickSuKien={onClickSuKien} FormKhachHang={FormKhachHang}></QRCodeCheck>

            <div className="row mt-3">
                <button className='form-control'
                    // data-toggle="modal" data-target={`#idQRCODE${data}`}
                    onClick={() => onClickLoadForm(true)}
                    style={{ backgroundColor: 'black', color: '#eaca8c' }}
                // onClick={()=>{
                //     setTimeout(() => $('.modal-backdrop').remove(), 500)}}
                >Load booking</button>
            </div>
        </div>
    )
}

export default AddBooking


const QRCodeCheck = ({ data_su_kien, data, onChangeQRCODE, onClickCheckForm, options, onClickSuKien, FormKhachHang }) => {

    // QR Code
    const previewStyle = {
        height: 480,
        width: 480,
    }



    const handleScan = (data) => {
        try {
            onChangeQRCODE(data)
        } catch (error) {

        }
    }
    // console.log( data )


    const handleError = (err) => {
        console.error(err)
    }

    React.useEffect(() => {
        try {

        } catch (error) {

        }
    }, [data, FormKhachHang])

    console.log(FormKhachHang)



    return (
        <>
            <div className="row">
                <button className='form-control'
                    data-toggle="modal" data-target={`#idQRCODE${data}`}
                    style={{ backgroundColor: 'black', color: '#eaca8c' }}
                    onClick={() => {
                        setTimeout(() => $('.modal-backdrop').remove(), 500)
                    }}
                >Check QR</button>
            </div>


            <div className="modal fade mt-5" id={`idQRCODE${data}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{'Form'}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body"
                            style={{ textAlign: 'center' }}>
                            <div className="col-lg-6">
                                <div className="common_input mb_20">
                                    <label>Type Booking </label>
                                    <Select options={options}
                                        onChange={(e) => onClickSuKien(e)}
                                        styles={{
                                            width: '100%',
                                            height: '100px'
                                        }} />

                                </div>
                            </div>

                            <QrReader
                                delay={100}
                                style={previewStyle}
                                onError={handleError}
                                onScan={e => handleScan(e)}
                            />
                            {/* {data} */}

                            {
                                FormKhachHang.length > 0 ?
                                    FormKhachHang.map((x, index) => (
                                        <>
                                            <h3>Check form</h3>
                                            <hr></hr>
                                            <div className='row'>
                                                <div className='col' style={{ textAlign: 'left' }}>Email</div>
                                                <div className='col'>{x.email}</div>
                                            </div>
                                            <hr></hr>

                                            <div className='row'>
                                                <div className='col' style={{ textAlign: 'left' }}>Event</div>
                                                <div className='col'>{x.ten_su_kien}</div>
                                            </div>
                                            <hr></hr>
                                            <div className='row'>
                                                <div className='col' style={{ textAlign: 'left' }}>Check</div>
                                                <div className='col'>{x.so_luong_quet}/{x.so_luong_dat}</div>
                                            </div>
                                            <hr></hr>
                                            <div className='row'>
                                                <div className='col' style={{ textAlign: 'left' }}>Total</div>
                                                <div className='col'>{x.tong_tien}</div>
                                            </div>
                                            <hr></hr>
                                        </>
                                    ))
                                    : <></>
                            }




                            <button className='form-control'
                                style={{ backgroundColor: 'black', color: '#eaca8c' }}
                                onClick={() => onClickCheckForm()}
                                id="id_check_form"
                            >Check Form</button>


                            {/* <button className='form-control'
                    data-toggle="modal" data-target={`#idQRCODE${data}`}
                    style={{ backgroundColor: 'black', color: '#eaca8c' }}
                    onClick={()=>onClickReLoad(true)}
                    >Re-Load</button> */}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}