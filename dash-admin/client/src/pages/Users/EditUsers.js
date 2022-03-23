import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import host from '../../service/host';
import $ from 'jquery'

function EditUsers({ EditData, onHandleEdit }) {

  const [IdUsers, setIdUsers] = React.useState(EditData.id_tk_admin)
  const [AccountName, setAccountName] = React.useState(EditData.ten_tai_khoan)
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
        var id_tk_admin = IdUsers
        var ten_tai_khoan = AccountName
        var mat_khau = RePassword
        const res = await fetch(host.WebDashDanhSachUsers, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_tk_admin, ten_tai_khoan, mat_khau })
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
      // console.log(EditData)

      setIdUsers( EditData.id_tk_admin )
      setAccountName( EditData.ten_tai_khoan )
      setDefaultPassword( EditData.mat_khau  )


      
    } catch (error) {

    }
  }, [
    EditData.id_tk_admin,
    EditData.ten_tai_khoan,
    EditData.mat_khau
  ])

  return (
    <>




      <div>
        {/* Button trigger modal */}
        <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#user_edit${EditData.id_tk_admin}`}
          onClick={() => setTimeout(() => $('.modal-backdrop').remove(), 500)}
        >
          Edit
        </button>
        {/* Modal */}
        <div className="modal fade" id={`user_edit${EditData.id_tk_admin}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit user id {EditData.id_tk_admin}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-6">
                    <label>Account name</label>
                    <div className="common_input mb_20">
                      <input type="text" placeholder="Account name"
                        value={AccountName}
                        onChange={e => setAccountName(e.target.value)}
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



              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default EditUsers