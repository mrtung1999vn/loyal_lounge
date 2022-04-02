import React, { useState } from 'react'
import host from '../../service/host'
import { storage } from '../../firebase'
import Select from 'react-select'



function AddTypeProduct({ handleAddTypeProduct }) {

    const [NameTypeProduct, setNameTypeProduct] = React.useState('')
    const [Password, setPassword] = React.useState('')
    const [RePassword, setRePassword] = React.useState('')
    const [Address, setAddress] = React.useState('')
    const [PhoneNumber, setPhoneNumber] = React.useState('')
    const [Status, setStatus] = React.useState('')

    const [Price, setPrice] = React.useState(0)
    const [Type, setType] = React.useState('')
    const [Actors, setActors] = React.useState('')
    const [Description, setDescription] = React.useState('')

    const [DateValue, setDate] = React.useState('')
    const [Time, setTime] = React.useState('')


    // 
    const options = [
        { value: '', label: 'Choose status' },
        { value: 'true', label: 'True' },
        { value: 'false', label: 'False' }
    ]
    // 
    //#region Image
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    const defaultValue = async () => {
        try {
            setNameTypeProduct(''); setPassword(''); setRePassword(''); setAddress('')
            setPhoneNumber(''); setStatus(''); setImage(null); setUrl('');

            setPrice(0); setType(''); setActors(''); setDescription('');
            setDate(''); setTime(''); setProgress(0)

        } catch (error) { }
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
    const onClickAddTypeProduct = async () => {
        try {

            if (NameTypeProduct === '') {
                alert('Name Type Product cannot be blank!')
            } else {

                console.log({ NameTypeProduct })

                const res = await fetch(host.WebDashDanhSachTypeProduct, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ NameTypeProduct })
                })

                const content = await res.json()
                if (content.status === 1) {
                    alert(content.msg_en)
                    handleAddTypeProduct(true)
                    defaultValue()
                } else {
                    alert(content.msg_en)
                }


            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="white_card_body">
            <div className="row">
                <div className="col-lg-6">
                    <label>Name TypeProduct</label>
                    <div className="common_input mb_20">
                        <input type="text" placeholder="Name TypeProduct"
                            value={NameTypeProduct}
                            onChange={e => setNameTypeProduct(e.target.value)}
                        />
                    </div>
                </div>

                {/* <div className="col-lg-6">
                    <div className="common_input mb_20">
                        <label>Status {Status}</label>
                        <Select options={options}
                            onChange={e => setStatus(e.value)}
                            styles={{
                                width: '100%',
                                height: '100px'
                            }} />

                    </div>
                </div> */}
                {/* <div className="col-lg-6">
                    <div className="common_input mb_20">
                        <label>Status :{Status}</label>
                        <Select options={options}
                            onChange={e => setStatus(e.value)}
                            styles={{
                                width: '100%',
                                height: '100px'
                            }} />

                    </div>
                </div> */}


                <div className="col-12">
                    <div className="create_report_btn mt_30">
                        <a style={{ cursor: 'pointer' }} className="btn_1 w-100"
                            onClick={() => onClickAddTypeProduct()}
                        >Add TypeProduct</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTypeProduct