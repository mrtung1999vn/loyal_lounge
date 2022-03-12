import React, { useState } from 'react'
import host from '../../service/host'
import { storage } from '../../firebase'
import Select from 'react-select'
function AddProduct({ handleAddProduct, ListTypeProduct, handleChangeTypeProduct, chooseTypeProduct }) {

    const [NameProduct, setNameProduct] = React.useState('')
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

    // 
    //#region Image
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    const defaultValue = async () => {
        try {

            setNameProduct(''); setPassword(''); setRePassword(''); setAddress('')

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
    const onClickAddProduct = async () => {
        try {
            if (chooseTypeProduct === '') {
                alert('The user has not selected a product type!')
            } else if (Description === '') {
                alert('Description cannot be blank!')
            } else if (Price === 0) {
                alert('Price cannot be blank and 0!')
            } else if (Amount === 0) {
                alert('Amount cannot be blank and 0!')
            } else if (url === '') {
                alert('Image cannot be blank !')
            }
            else {
                // email,mat_khau,created_at,updated_at,status,dia_chi,so_dt,mat_khau_hash,image

                console.log({ chooseTypeProduct, Description, Price, Amount, url })

                var image = url === '' ? `https://firebasestorage.googleapis.com/v0/b/loyal-lounge.appspot.com/o/User_font_awesome.svg.png?alt=media&token=2d674b84-1646-4d51-a862-9c780e0a3460` : url
                var dia_chi = Address

                const res = await fetch(host.WebDashDanhSachProduct, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ chooseTypeProduct, Description, Price, Amount, url,NameProduct })
                })
                const content = await res.json()
                if (content.status === 1) {
                    alert(content.msg_en)
                    handleAddProduct(true)
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
            for (let i = 0; i < ListTypeProduct.length; i++) {
                var obj = {}
                obj['value'] = ListTypeProduct[i].id_loai_sp
                obj['label'] = ListTypeProduct[i].ten_loai_sp

                newData.push(obj)

            }
            setOptions(newData)

        } catch (error) {

        }
    }, [ListTypeProduct])

    return (
        <div className="white_card_body">
            <div className="row">
                <div className="col-lg-6">
                    <div className="common_input mb_20">
                        <label>Type Product </label>
                        <Select options={options}
                            onChange={handleChangeTypeProduct}
                            styles={{
                                width: '100%',
                                height: '100px'
                            }} />

                    </div>
                </div>

                <div className="col-lg-6">
                    <label>Name Product </label>
                    <div className="common_input mb_20">
                        <input type="text" placeholder="NameProduct"
                            value={NameProduct}
                            onChange={e => setNameProduct(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-lg-6">
                    <label>Description</label>
                    <div className="common_input mb_20">
                        <input type="text" placeholder="Description"
                            value={Description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="common_input mb_20">
                        <label>Price</label>
                        <input type="text" placeholder="Price"
                            value={Price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="common_input mb_20">
                        <label>Amount</label>
                        <input type="text" placeholder="Amount"
                            value={Amount}
                            onChange={e => setAmount(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="common_input mb_20">
                        <div className='row'>
                            <div className='col-lg-6'>

                                <input type="file" onChange={(e) => handleChange(e)}
                                    style={{ width: '200px', marginTop: '32px' }} />

                            </div>
                        </div>
                        {progress > 0 && progress < 100 ? <>Loading ... {progress}%</> : <></>}
                        <br>
                        </br>
                        <img
                            style={window.innerWidth <= 800 ? { width: '100%', height: '100%' } :
                                { width: '50%', height: '50%' }
                            }
                            src={url || "http://via.placeholder.com/300"} alt="firebase-image" />
                    </div>
                </div>

                <div className="col-12">
                    <div className="create_report_btn mt_30">
                        <a style={{ cursor: 'pointer' }} className="btn_1 w-100"
                            onClick={() => onClickAddProduct()}
                        >Add Product</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct