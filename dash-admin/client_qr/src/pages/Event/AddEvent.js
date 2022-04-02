import React, { useState } from 'react'
import host from '../../service/host'
import { storage } from '../../firebase'
import Select from 'react-select'



function AddEvent({ handleAddEvent }) {

    const [NameEvent, setNameEvent] = React.useState('')
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
            setNameEvent(''); setPassword(''); setRePassword(''); setAddress('')
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
    const onClickAddEvent = async () => {
        try {

            if (Type === '') {
                alert('Type cannot be blank!')
            } else if (Price === 0) {
                alert('Price other price 0')
            } else if (Actors === '') {
                alert('Actors cannot be blank!')
            } else if (Description === '') {
                alert('Description cannot be blank!')
            } else if (DateValue === '') {
                alert('Date cannot be blank!')
            } else if (Time === '') {
                alert('Time cannot be blank!')
            } else if (url === '') {
                alert('Image cannot be blank!')
            } else {

                console.log({ NameEvent, Type, Price, Actors, Description, DateValue, Time, image, url })

                const res = await fetch(host.WebDashDanhSachEvent, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ NameEvent, Type, Price, Actors, Description, DateValue, Time, image, url })
                })

                const content = await res.json()
                if (content.status === 1) {
                    alert(content.msg_en)
                    handleAddEvent(true)
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
                    <label>Name Event</label>
                    <div className="common_input mb_20">
                        <input type="text" placeholder="Name Event"
                            value={NameEvent}
                            onChange={e => setNameEvent(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="common_input mb_20">
                        <label>Price</label>
                        <input type="text" placeholder=""
                            value={Price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </div>
                    {`${Price} $`}
                </div>
                <div className="col-lg-6">
                    <div className="common_input mb_20">
                        <label>Date</label>
                        <input type="date" placeholder="Date"
                            value={DateValue}
                            onChange={e => setDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="common_input mb_20">
                        <label>Time</label>
                        <input type="time" placeholder="Time"
                            value={Time}
                            onChange={e => setTime(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="common_input mb_20">
                        <label>Actors</label>
                        <input type="text" placeholder="Actors"
                            value={Actors}
                            onChange={e => setActors(e.target.value)}
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

                <div className="col-lg-6">
                    <div className="common_input mb_20">
                        <label>Type</label>
                        <input type="text" placeholder="Type"
                            value={Type}
                            onChange={e => setType(e.target.value)}
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

                <div className="col-lg-6">
                    <div className="common_input mb_20">
                        <div className='row'>
                            <div className='col-lg-6'>

                                <input type="file" onChange={(e) => handleChange(e)}
                                    style={{ width: '200px',marginTop: '32px' }}  />
                            
                            </div>
                        </div>

                        {progress > 0 && progress < 100 ? <>Loading ... {progress}%</> : <></>}
                        
                        <br>
                        </br>
                        <img
                            style={window.innerWidth <= 800 ? { width: '100%', height: '100%' } :
                                { width: '50%', height: '50%' }
                            }
                            src={url  || "http://via.placeholder.com/300"} alt="firebase-image" />
                    </div>
                </div>

                <div className="col-12">
                    <div className="create_report_btn mt_30">
                        <a style={{ cursor: 'pointer' }} className="btn_1 w-100"
                            onClick={() => onClickAddEvent()}
                        >Add Event</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEvent