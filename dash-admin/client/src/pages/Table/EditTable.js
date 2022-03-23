import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import host from '../../service/host';
import { storage } from '../../firebase'
import Select from 'react-select'

function EditTable({ EditData, onHandleEdit }) {
  const [IDTable, setIDTable] = React.useState(EditData.id_ban)
  const [Email, setEmail] = React.useState(EditData.email)
  const [Password, setPassword] = React.useState('')
  const [RePassword, setRePassword] = React.useState('')
  const [Address, setAddress] = React.useState(EditData.dia_chi)
  const [PhoneNumber, setPhoneNumber] = React.useState(EditData.so_dt)
  const [Status, setStatus] = React.useState(EditData.status.toString())

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // 
  const options = [
    { value: '', label: 'Choose status' },
    { value: 'true', label: 'True' },
    { value: 'false', label: 'False' }
  ]
  // 
  //#region Image
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(EditData.image);
  const [progress, setProgress] = useState(0);

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
  const onClickSave = async () => {
    try {
      if (Status === '') {
        alert('Status cannot be blank!')
      } else if (PhoneNumber === '') {
        alert('PhoneNumber cannot be blank!')
      } else if (Address === '') {
        alert('Address cannot be blank!')
      } else if (RePassword !== Password) {
        alert('Enter a password that does not match!')
      } else if (Email === '') {
        alert('Email cannot be blank!')
      } else {
        // email,mat_khau,created_at,updated_at,status,dia_chi,so_dt,mat_khau_hash,image
        var email = Email
        var mat_khau = RePassword === '' && Password === '' ? EditData.mat_khau : RePassword
        var so_dt = PhoneNumber
        var status = Status
        var id_kh = IDTable
        var image = url === '' ? `https://firebasestorage.googleapis.com/v0/b/loyal-lounge.appspot.com/o/User_font_awesome.svg.png?alt=media&token=2d674b84-1646-4d51-a862-9c780e0a3460` : url
        var dia_chi = Address

        const res = await fetch(host.WebDashDanhSachTable, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, mat_khau, status, dia_chi, so_dt, image, id_kh })
        })
        const content = await res.json()
        if (content.status === 1) {
          alert(content.msg_en)
          onHandleEdit(true)
        } else {
          alert(content.msg_en)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(async () => {
    try {
      // console.log(EditData.status)
    } catch (error) {

    }
  }, [])

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Table id {EditData.id_tk_admin} </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className='row'>
            <div className="col-lg-6">
              <label>Email</label>
              <div className="common_input mb_20">
                <input type="text" placeholder="Email"
                  value={Email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="common_input mb_20">
                <label>Password</label>
                <input type="password" placeholder="Password"
                  value={Password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="common_input mb_20">
                <label>Address</label>
                <input type="text" placeholder="Address"
                  value={Address}
                  onChange={e => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="common_input mb_20">
                <label>Re-Password</label>
                <input type="password" placeholder="RePassword"
                  value={RePassword}
                  onChange={e => setRePassword(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="common_input mb_20">
                <label>Phone Number</label>
                <input type="text" placeholder="Phone Number"
                  value={PhoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="common_input mb_20">
                <label>Status: {Status}</label>
                <Select options={options}
                  // defaultInputValue={Status}
                  value={Status}
                  onChange={e => setStatus(e.value)}
                  styles={{
                    width: '100%',
                    height: '100px'
                  }} />

              </div>
            </div>
            <div className="col-lg-6">
              <div className="common_input mb_20">
                <div className='row'>
                  <div className='col-lg-6'>
                    <input type="file" onChange={(e) => handleChange(e)}
                      style={{ width: '200px' }} /></div>
                </div>
                {progress > 0 && progress < 100 ? <>Loading ... {progress}%</> : <></>}
                <br>
                </br>
                <img
                  style={window.innerWidth <= 800 ? { width: '100%', height: '100%' } :
                    { width: '50%', height: '50%' }
                  }
                  src={url || "http://via.placeholder.com/300" } alt="firebase-image" />
              </div>
            </div>
            <div className="col-12">
              <div className="create_report_btn mt_30">
                <a style={{ cursor: 'pointer' }} className="btn_1 w-100"
                  onClick={() => onClickSave()}
                >Edit Table</a>
              </div>
            </div>
          </div>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={() => onClickSave()}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditTable