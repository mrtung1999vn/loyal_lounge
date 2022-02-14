import React from 'react'
import host from '../../service/host'
function AddCustomer({handleAddCustomer}) {
    
    const [Email,setEmail] = React.useState('')
    const [Password,setPassword] = React.useState('')
    const [RePassword,setRePassword] = React.useState('')
    const [Address,setAddress] = React.useState('')
    const [PhoneNumber,setPhoneNumber] = React.useState('')
    const [Image,setImage] = React.useState('')
    const [Status,setStatus] = React.useState('')

    const onClickAddUser = async ()=>{
        try {
            if( RePassword !== Password ){
                alert('Enter a password that does not match!')
            }else if( Email === '' ){
                alert('Email cannot be blank!')
            }else if( Password === '' ){
                alert('Password cannot be blank!')
            }else if( RePassword === '' ){
                alert('RePassword cannot be blank!')
            }else{
                // email,mat_khau,created_at,updated_at,status,dia_chi,so_dt,mat_khau_hash,image
                var email = Email
                var mat_khau = RePassword
                var so_dt = PhoneNumber
                var status = Status

                var image = Image
                var dia_chi = Address

                const res = await fetch( host.WebDashDanhSachCustomer ,{
                    method:"POST",
                    headers:{"Content-Type" : "application/json"},
                    body:JSON.stringify({email,mat_khau,status,dia_chi,so_dt,image})
                })
                const content = await res.json()
                if( content.status === 1  ){
                    alert(content.msg_en)
                    handleAddCustomer(true)
                }else{
                    alert(content.msg_en)
                }
            }
        } catch (error) {
            console.log( error )
        }
    }

    return (
        <div className="white_card_body">
            <div className="row">
                <div className="col-lg-6">
                    <label>Account name</label>
                    <div className="common_input mb_20">
                        <input type="text" placeholder="Account name" 
                        onChange={e=> setEmail(e.target.value) }
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="common_input mb_20">
                        <label>Password</label>
                        <input type="password" placeholder="Password" 
                        onChange={e=> setPassword(e.target.value) }
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
                        onChange={e=>setRePassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-lg-6">
                </div>
                <div className="col-12">
                    <div className="create_report_btn mt_30">
                        <a style={{cursor:'pointer'}} className="btn_1 w-100"
                        onClick={()=>onClickAddUser()}
                        >Add User</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCustomer