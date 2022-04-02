import React ,{useState} from 'react'
import { Button,Modal } from 'react-bootstrap';
import host from '../../service/host';
import $ from 'jquery'

function DeleteUsers({EditData,onHandleDelete}) {

  const [IdUsers, setIdUsers] = React.useState(EditData.id_tk_admin)
  const [AccountName, setAccountName] = React.useState(EditData.ten_tai_khoan)
  const [Password, setPassword] = React.useState('')
  const [RePassword, setRePassword] = React.useState('')
  const [DefaultPassword, setDefaultPassword] = React.useState(EditData.mat_khau)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const onClickSave = async ()=>{
    try {
      var id_tk_admin = IdUsers
      var ten_tai_khoan = AccountName
      var mat_khau = RePassword
      const res = await fetch(host.WebDashDanhSachUsers, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({id_tk_admin,ten_tai_khoan,mat_khau})
      })
      const content = await res.json()

      if (content.status === 1) {
        alert(content.msg_en)
        onHandleDelete(true)
      } else {
        alert(content.msg_en)
      }
    } catch (error) {
      
    }
  }

  React.useEffect(async ()=>{
    try{

      setIdUsers( EditData.id_tk_admin )
    }catch(error){

    }
  },[
    EditData.id_tk_admin
  ])

  return (
    <>

<div>
        {/* Button trigger modal */}
        <button type="button" className="btn btn-danger" data-toggle="modal" data-target={`#user_delete${EditData.id_tk_admin}`}
          onClick={() => setTimeout(() => $('.modal-backdrop').remove(), 500)}
        >
          Delete
        </button>
        {/* Modal */}
        <div className="modal fade" id={`user_delete${EditData.id_tk_admin}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Delete user id { EditData.id_tk_admin }</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">

              Do you want to delete user { AccountName } (ID: { IdUsers }) ?

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>onClickSave()}>Yes</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default DeleteUsers