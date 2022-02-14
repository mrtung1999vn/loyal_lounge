import React ,{useState} from 'react'
import { Button,Modal } from 'react-bootstrap';
import host from '../../service/host';


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
      console.log( EditData )
    }catch(error){

    }
  },[])

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete user id { EditData.id_tk_admin } </Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete user { AccountName } (ID: { IdUsers }) ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={()=>onClickSave()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteUsers