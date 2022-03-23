import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import host from '../../service/host';
import { storage } from '../../firebase'
import Select from 'react-select'
import $ from 'jquery'

function DeleteEvent({ EditData, onHandleDelete }) {

  const [IDEvent, setIDEvent] = React.useState(EditData.id_su_kien)
  const [Email, setEmail] = React.useState(EditData.email)
  const [Password, setPassword] = React.useState('')
  const [RePassword, setRePassword] = React.useState('')
  const [Address, setAddress] = React.useState(EditData.dia_chi)
  const [PhoneNumber, setPhoneNumber] = React.useState(EditData.so_dt)
  const [Status, setStatus] = React.useState(EditData.status.toString())

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [Price, setPrice] = React.useState(EditData.gia)
  const [Type, setType] = React.useState(EditData.the_loai)
  const [Actors, setActors] = React.useState(EditData.nguoi_tham_gia)
  const [Description, setDescription] = React.useState(EditData.noi_dung)

  const [DateValue, setDate] = React.useState(EditData.thoi_gian_dien.split(' ')[0])
  const [Time, setTime] = React.useState(EditData.thoi_gian_dien.split(' ')[1])


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
      var status = Status
      var id_su_kien = IDEvent
      var image = url === '' ? `https://firebasestorage.googleapis.com/v0/b/loyal-lounge.appspot.com/o/User_font_awesome.svg.png?alt=media&token=2d674b84-1646-4d51-a862-9c780e0a3460` : url
      var dia_chi = Address

      const res = await fetch(host.WebDashDanhSachEvent, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_su_kien })
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
      setIDEvent(EditData.id_su_kien)

    } catch (error) {

    }
  }, [
    EditData.id_su_kien
  ])

  return (
    <>



      <div>
        {/* Button trigger modal */}
        <button type="button" className="btn btn-danger" data-toggle="modal" data-target={`#event_id_delete${EditData.id_su_kien}`}
          onClick={() => setTimeout(() => $('.modal-backdrop').remove(), 500)}
        >
          Delete
        </button>
        {/* Modal */}
        <div className="modal fade" id={`event_id_delete${EditData.id_su_kien}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Delete event id {EditData.id_su_kien} </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                Do you want to delete Event {Email} (ID: {IDEvent}) ?

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => onClickSave()}>Yes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteEvent