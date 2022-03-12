import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import host from '../../service/host';
import { storage } from '../../firebase'
import Select from 'react-select'


function DeletePayMoney({ EditData, onHandleDelete }) {

  const [IDPayMoney, setIDPayMoney] = React.useState(EditData.id_cash)
  const [Email, setEmail] = React.useState(EditData.email)
  const [Password, setPassword] = React.useState('')
  const [RePassword, setRePassword] = React.useState('')
  const [Address, setAddress] = React.useState(EditData.dia_chi)
  const [PhoneNumber, setPhoneNumber] = React.useState(EditData.so_dt)
  // const [Status, setStatus] = React.useState(EditData.status.toString())

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

      // email,mat_khau,created_at,updated_at,status,dia_chi,so_dt,mat_khau_hash,image
      var email = Email
      var mat_khau = RePassword === '' && Password === '' ? EditData.mat_khau : RePassword
      var so_dt = PhoneNumber
      var id_kh = IDPayMoney
      var image = url === '' ? `https://firebasestorage.googleapis.com/v0/b/loyal-lounge.appspot.com/o/User_font_awesome.svg.png?alt=media&token=2d674b84-1646-4d51-a862-9c780e0a3460` : url
      var dia_chi = Address

      const res = await fetch(host.WebDashDanhSachPayMoney, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ IDPayMoney })
      })
      const content = await res.json()
      if (content.status === 1) {
        alert(content.msg_en)
        onHandleDelete(true)
        setShow(false)
      } else {
        alert(content.msg_en)
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
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete PayMoney id {EditData.id_kh} </Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete PayMoney {Email} (ID: {IDPayMoney}) ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={() => onClickSave()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeletePayMoney