import React from 'react'
import host from '../../service/host'
function AddUsers({handleAddUsers}) {
    
    const [AccountName,setAccountName] = React.useState('')
    const [Password,setPassword] = React.useState('')
    const [RePassword,setRePassword] = React.useState('')

    const onClickAddUser = async ()=>{
        try {
            if( RePassword !== Password ){
                alert('Enter a password that does not match!')
            }else if( AccountName === '' ){
                alert('Username cannot be blank!')
            }else if( Password === '' ){
                alert('Password cannot be blank!')
            }else if( RePassword === '' ){
                alert('RePassword cannot be blank!')
            }else{
                var ten_tai_khoan = AccountName
                var mat_khau = RePassword
                const res = await fetch( host.WebDashDanhSachUsers ,{
                    method:"POST",
                    headers:{"Content-Type" : "application/json"},
                    body:JSON.stringify({ten_tai_khoan,mat_khau})
                })
                const content = await res.json()
                if( content.status === 1  ){
                    alert(content.msg_en)
                    handleAddUsers(true)
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
                        onChange={e=> setAccountName(e.target.value) }
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

export default AddUsers