import React from 'react'

import { Link } from 'react-router-dom';
import func from '../asset/func';
import host from '../service/host';
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

function Default({ email,coin }) {
    // const [coin, setCoin] = React.useState(0)
    const [User,setUser] = React.useState([])
    const onClickExit = async()=>{
        try {
            window.localStorage.clear()
            // setUser([])
            alert('Exit success!')
            window.location.href ="./"
        } catch (error) {
            
        }
    }

    React.useEffect(async () => {
        try {
            if( window.localStorage.getItem('__dir') !== null || window.localStorage.getItem('__dir') !== undefined || window.localStorage.getItem('__dir') !== '' ){
                setUser( 
                  func.DecodeJson_RESPONSE( window.localStorage.getItem('__dir') )
                )
            }
            // let newData = []
            // newData = func.DecodeJson_RESPONSE( window.localStorage.getItem('__dir') )
            // const res = await fetch(host.WebDuDoanCoinEmail + `/${newData[0]?.email}`)
            // const content = await res.json()

            // if (content.status === 1) {
            //     let JsonData = []
            //     let JsonDataUser = []
            //     JsonData = func.DecodeJson_RESPONSE(content.data)
            //     JsonDataUser = func.DecodeJson_RESPONSE(content.dataUser)
            //     console.log(func.DecodeJson_RESPONSE(content.data))
            //     if (JsonData.length > 0 && JsonDataUser.length > 0) {
            //         setCoin(JsonData[0].coin)
            //         setUser(JsonDataUser)
            //     }
            // }
        } catch (error) {

        }
    }, [])
    
    if(User.length > 0){
        return (
            <>             
                <Link to="/" className='nav-item'>
                    <a className="nav-link">Home</a>
                </Link>
            

                <Link to="/SendMoney" className='nav-item'>
                    <a className="nav-link">Send money</a>
                </Link>
    
                <Link to="/WithdrawMoney" className='nav-item'>
                    <a className="nav-link">Withdraw money</a>
                </Link>
    
                <Link to="/History" className='nav-item'>
                    <a className="nav-link">History</a>
                </Link>
    
                <Link to="/Login" className='nav-item'>
                    <a className="nav-link">Betting</a>
                </Link>

                <Link to="/Login" className='nav-item'>
                    <a className="nav-link">Hello, {email} ({formatter.format(parseFloat(coin))})</a>
                </Link>
    
                <Link className='nav-item' onClick={e => onClickExit()}>
                    <a className="nav-link">Exit</a>
                </Link></>
        )
    }else{
        return (
            <>             
                <Link to="/" className='nav-item'>
                    <a className="nav-link">Home</a>
                </Link>
    
                <Link to="/Login" className='nav-item'>
                    <a className="nav-link">Login</a>
                </Link>
                
                </>
        )
    }

}

export default Default