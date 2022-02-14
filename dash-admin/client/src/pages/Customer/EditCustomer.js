import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import host from '../../service/host';


function EditCustomer({ EditData,onHandleEdit }) {

  const [IdCustomer, setIdCustomer] = React.useState(EditData.id_kh)
  const [Email, setEmail] = React.useState(EditData.email)
  const [Password, setPassword] = React.useState('')
  const [RePassword, setRePassword] = React.useState('')
  const [DefaultPassword, setDefaultPassword] = React.useState(EditData.mat_khau)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const onClickSave = async () => {
    try {

      if (Password === '') {
        alert('User has not entered password')
      } else if (RePassword === '') {
        alert('User has not entered re-password')
      } else if (Password !== RePassword) {
      } else {
        var id_tk_admin = IdCustomer
        var ten_tai_khoan = Email
        var mat_khau = RePassword
        const res = await fetch(host.WebDashDanhSachCustomer, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body:JSON.stringify({id_tk_admin,ten_tai_khoan,mat_khau})
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

    }
  }

  React.useEffect(async () => {
    try {
      console.log(EditData)
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
          <Modal.Title>Edit user id {EditData.id_tk_admin}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="row">
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
                {/* <label>Password</label>
                          <input type="password" placeholder="Password" /> */}
              </div>
              {/* <label>Expire Month</label>
                      <select className="nice_Select2 nice_Select_line wide mb_20" style={{ display: 'none' }}>
                          <option value={1}>Expire Month</option>
                          <option value={1}>jan</option>
                          <option value={1}>Feb</option>
                      </select> */}
            </div>
            <div className="col-lg-6">
              <div className="common_input mb_20">
                <label>Re-Password</label>
                <input type="password" placeholder="Password"
                  value={RePassword}
                  onChange={e => setRePassword(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-6">
            </div>
            <div className="col-12">
              <div className="create_report_btn mt_30">
                <a style={{ cursor: 'pointer' }} className="btn_1 w-100"
                  onClick={() => onClickSave()}
                >Save</a>
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

export default EditCustomer