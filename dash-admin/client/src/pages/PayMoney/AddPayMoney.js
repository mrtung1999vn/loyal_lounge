import React, { useState } from 'react'
import host from '../../service/host'
import { storage } from '../../firebase'
import Select from 'react-select'

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  })

function AddPayMoney({ handleAddPayMoney, ListTypePayMoney, handleChangeTypePayMoney, chooseTypePayMoney }) {

    const [NamePayMoney, setNamePayMoney] = React.useState('')
    const [Password, setPassword] = React.useState('')
    const [RePassword, setRePassword] = React.useState('')
    const [Address, setAddress] = React.useState('')
    const [PhoneNumber, setPhoneNumber] = React.useState('')

    const [Status, setStatus] = React.useState('')

    const [options, setOptions] = React.useState([])
    // 

    const [Description, setDescription] = React.useState('')
    const [Price, setPrice] = React.useState(0)
    const [PriceVND, setPriceVND] = React.useState(0)
    const [Amount, setAmount] = React.useState(0)
    const [userName,setUserName] = React.useState('')
    const [TypePayMoney,setTypePayMoney] = React.useState('')

    // 
    //#region Image
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    const defaultValue = async () => {
        try {

            setPrice(0); setPriceVND(0); setDescription(''); setTypePayMoney('')

            setUserName(''); setStatus(''); setImage(null); setUrl('')

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
    const onClickAddPayMoney = async () => {
        try {
            if (TypePayMoney === '') {
                alert('User has not selected a transaction type!')
            } else if (Description === '') {
                alert('Description cannot be blank!')
            } else if (PriceVND === 0) {
                alert('Price cannot be blank and 0!')
            } else if (userName === 0) {
                alert('User name cannot be blank!')
            } else {
                // email,mat_khau,created_at,updated_at,status,dia_chi,so_dt,mat_khau_hash,image

                console.log({ chooseTypePayMoney, Description, Price, Amount, url })

                var image = url === '' ? `https://firebasestorage.googleapis.com/v0/b/loyal-lounge.appspot.com/o/User_font_awesome.svg.png?alt=media&token=2d674b84-1646-4d51-a862-9c780e0a3460` : url
                var dia_chi = Address

                const res = await fetch(host.WebDashDanhSachPayMoney, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ TypePayMoney, Description, Price, userName,PriceVND })
                })
                const content = await res.json()
                if (content.status === 1) {
                    alert(content.msg_en)
                    handleAddPayMoney(true)
                    defaultValue()
                } else {
                    alert(content.msg_en)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }


    React.useEffect(() => {
        try {
            let newData = []
            // const options = [
            //     { value: '', label: 'Choose status' },
            //     { value: 'true', label: 'True' },
            //     { value: 'false', label: 'False' }
            // ]
            for (let i = 0; i < ListTypePayMoney.length; i++) {
                var obj = {}
                obj['value'] = ListTypePayMoney[i].id_loai_sp
                obj['label'] = ListTypePayMoney[i].ten_loai_sp

                newData.push(obj)

            }
            setOptions([
                {value:'Cash payment', label:'Cash payment'},
                {value:'Payment via Paypal', label:'Payment via Paypal'}
            ])

        } catch (error) {

        }
    }, [ListTypePayMoney])

    return (
        <div className="white_card_body">
            <div className="row">

                <div className="col-lg-6">
                    <div className="common_input mb_20">
                        <label>Type PayMoney </label>
                        <Select options={options}
                            onChange={(e)=>setTypePayMoney(e)}
                            styles={{
                                width: '100%',
                                height: '100px'
                            }} />

                    </div>
                </div>

                <div className="col-lg-6">
                    <label>User Name </label>
                    <div className="common_input mb_20">
                        <input type="text" placeholder="User Name"
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                        />
                    </div>
                </div>

                {/* <div className="col-lg-6">
                    <label>Money ({formatter.format(Price)}) x 21.000đ = {
                    parseInt((Price)*21000).toLocaleString('vi', {style : 'currency', currency : 'VND'}) } </label>
                    <div className="common_input mb_20">
                        <input type="text" placeholder="Money"
                            value={Price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </div>
                </div> */}

                <div className="col-lg-6">
                    <label>Money_VND (
                        {parseInt(PriceVND).toLocaleString('vi', {style : 'currency', currency : 'VND'})}) : 21.000đ = 

                        {formatter.format((parseInt(PriceVND)/21000))}
                      </label>
                    <div className="common_input mb_20">
                        <input type="text" placeholder="Money"
                            value={PriceVND}
                            onChange={e => setPriceVND(e.target.value)}
                        />
                    </div>
                </div>
                
                <div className="col-lg-6">
                    <div className="common_input mb_20">
                        <label>Description</label>
                        <input type="text" placeholder="Description"
                            value={Description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                </div>


                <div className="col-12">
                    <div className="create_report_btn mt_30">
                        <a style={{ cursor: 'pointer' }} className="btn_1 w-100"
                            onClick={() => onClickAddPayMoney()}
                        >Add PayMoney</a>
                    </div>
                </div>

                
            </div>
        </div>
    )
}

export default AddPayMoney