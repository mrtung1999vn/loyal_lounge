import React, { useState } from 'react'
import host from '../../service/host'
import { storage } from '../../firebase'
import Select from 'react-select'

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  })

function AddCart({ handleAddCart, ListTypeCart, handleChangeTypeCart, chooseTypeCart ,
    onHandleChangeType,onHandleChooseCheck,
onHandleOnClickSuKien
}) {

    const [NameCart, setNameCart] = React.useState('')
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
    const [userName,setUserName] = React.useState('')
    const [TypeCart,setTypeCart] = React.useState('')

    // 
    //#region Image
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    const defaultValue = async () => {
        try {

            setNameCart(''); setPassword(''); setRePassword(''); setAddress('')

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
    const onClickAddCart = async () => {
        try {
            if (TypeCart === '') {
                alert('User has not selected a transaction type!')
            } else if (Description === '') {
                alert('Description cannot be blank!')
            } else if (Price === 0) {
                alert('Price cannot be blank and 0!')
            } else if (userName === 0) {
                alert('User name cannot be blank!')
            } else {
                // email,mat_khau,created_at,updated_at,status,dia_chi,so_dt,mat_khau_hash,image

                console.log({ chooseTypeCart, Description, Price, Amount, url })

                var image = url === '' ? `https://firebasestorage.googleapis.com/v0/b/loyal-lounge.appspot.com/o/User_font_awesome.svg.png?alt=media&token=2d674b84-1646-4d51-a862-9c780e0a3460` : url
                var dia_chi = Address

                const res = await fetch(host.WebDashDanhSachCart, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ TypeCart, Description, Price, userName })
                })
                const content = await res.json()
                if (content.status === 1) {
                    alert(content.msg_en)
                    handleAddCart(true)
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

    const getDataSuKien = async ()=>{
        try {
            const res = await fetch(host.WebDashsuKienHienTai)
            const content = await res.json()

            if( content.status === 1 ){
                setSuKienHienTai( content.data )
                let DataSuKien = content.data
                let newData = []
                newData.push({'value':'','label':''})
                for (let i = 0; i < DataSuKien.length; i++) {
                    var obj = {}
                    obj['value'] = DataSuKien[i].id_su_kien
                    obj['label'] =  `ID: ${DataSuKien[i].id_su_kien } ` + DataSuKien[i].ten_su_kien + ` $${DataSuKien[i].gia}`

                    newData.push(obj)

                }
                setOptions(newData)
            }else{

            }

        } catch (error) {
            
        }
    }

    React.useEffect(() => {
        try {
            getDataSuKien()
            // let newData = []
            // const options = [
            //     { value: '', label: 'Choose status' },
            //     { value: 'true', label: 'True' },
            //     { value: 'false', label: 'False' }
            // ]
            // for (let i = 0; i < ListTypeCart.length; i++) {
            //     var obj = {}
            //     obj['value'] = ListTypeCart[i].id_loai_sp
            //     obj['label'] = ListTypeCart[i].ten_loai_sp

            //     newData.push(obj)

            // }
            // setOptions([
            //     {value:'Cash payment', label:'Cash payment'},
            //     {value:'Payment via Paypal', label:'Payment via Paypal'}
            // ])

        } catch (error) {

        }
    }, [ListTypeCart])

    return (
        <div className="white_card_body">
            <div className="row">

                {/* <div className="col-lg-6">
                    <div className="common_input mb_20">
                        <label>Type Cart </label>
                        <Select options={options}
                            onChange={(e)=>onHandleOnClickSuKien(e)}
                            styles={{
                                width: '100%',
                                height: '100px'
                            }} />

                    </div>
                </div> */}

                <div className="col-lg-6">
                    <div className="common_input mb_20">
                        <label>Check </label>
                        <Select options={[
                            {'value':'','label':''},
                            {'value':'true','label':'checked'},
                            {'value':'false','label':'check'}
                            ]}
                            onChange={(e)=>onHandleChooseCheck(e)}
                            styles={{
                                width: '100%',
                                height: '100px'
                            }} />

                    </div>
                </div>

               
              
            </div>
            <div className="row">
                <button className='form-control' onClick={()=>onHandleChangeType(true)}
                style={{ backgroundColor: 'black', color: '#eaca8c' }}
                
                >Load bill</button>
            </div>
        </div>
    )
}

export default AddCart