import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import host from '../../service/host';
import { storage } from '../../firebase'
import Select from 'react-select'
import func from '../../asset/func';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
})

function checkNumber(str) {
    try {
        if (parseFloat(str) > 0) {
            return true
        } else {
            return false
        }
        return false
    } catch (error) {
        return false
    }
}
function BettingFootBall({ EditData }) {
    const [coin,setCoin] = React.useState(0)
    const [User,setUser] = React.useState([])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [chooseTeamWin, setChooseTeamWin] = React.useState('')
    const [IDMATCH, setIDMATCH] = React.useState(EditData.id_match)
    const [MoneyChooseTeamWin, setMoneyChooseTeamWin] = React.useState(0)
    const [chooseEvenOdd, setChooseEvenOdd] = React.useState('')
    const [MoneyEvenOdd, setMoneyEvenOdd] = React.useState(0)

    const [PassWordConfirm, setPassWordConfirm] = React.useState('')

    const [MoneyChooseDraw, setMoneyChooseDraw] = React.useState(0)

    const defaultCointEmail = async (email,array)=>{
        try {
            const res = await fetch(host.WebDuDoanCoinEmail+`/${email}`)
            const content = await res.json()

            if( content.status === 1 ){
                let JsonData = []
                let JsonDataUser = []
                JsonData = func.DecodeJson_RESPONSE( content.data )
                JsonDataUser = func.DecodeJson_RESPONSE( content.dataUser )
                console.log(  func.DecodeJson_RESPONSE( content.data ) )
                if( JsonData.length > 0 &&  JsonDataUser.length >0 ){
                    setCoin( JsonData[0].coin )
                    setUser(  JsonDataUser )
                }
            }
        } catch (error) {
            
        }
    }

    const onClickBetting = async () => {
        try {
            console.log('test')
            let data = []
            if( User.length > 0 ){
                if( User[0]?.mat_khau.toString() ===  PassWordConfirm){
                    if (MoneyChooseTeamWin !== 0 && chooseTeamWin !== '') {
                        if (!checkNumber(MoneyChooseTeamWin)) {
                            alert('Betting Money team win is number!')
                        } else {
                            if( parseFloat(MoneyChooseTeamWin) > 0 ){
                                console.log({ MoneyEvenOdd, IDMATCH, MoneyChooseTeamWin })
                                data.push({type_betting:'Play win',id_match:IDMATCH, money: MoneyChooseTeamWin})
                            }else{
                                alert('Betting Money team win  than 0')
                            }
                        }
                    }
        
                    if (MoneyEvenOdd !== 0 && chooseEvenOdd !== '') {
                        if (!checkNumber(MoneyEvenOdd)) {
                            alert('Betting Money even odd  is number!')
                        } else {
                            if( parseFloat(MoneyEvenOdd) > 0 ){
                                
                                data.push({type_betting:'Even Odd',id_match:IDMATCH, money: chooseEvenOdd})
                            }else{
                                alert('Betting Money even odd  than 0')
                            }
                        }
                    }

                    if (MoneyChooseDraw !== 0) {
                        if (!checkNumber(MoneyChooseDraw)) {
                            alert('Betting Money (Match score draw)  is number!')
                        } else {
                            if( parseFloat(MoneyChooseTeamWin) > 0 ){
                                console.log({ MoneyEvenOdd, IDMATCH, MoneyChooseDraw })
                                data.push({type_betting:'Match draw',id_match:IDMATCH, money: MoneyChooseDraw})
                            }else{
                                alert('Betting Money (Match score draw)  than 0')
                            }
                        }
                    }
                    console.log(data)
                    alert('Betting success')
                }else{
                    alert('Re-enter wrong password !')
                }
            }else{

            }
        } catch (error) {

        }
    }
    React.useEffect(() => {
        try {
            // console.log(EditData)

            if( window.localStorage.getItem('__dir') !== null || window.localStorage.getItem('__dir') !== undefined || window.localStorage.getItem('__dir') !== '' ){
                setUser( 
                  func.DecodeJson_RESPONSE( window.localStorage.getItem('__dir') )
                )
            }
            let newData = []
            newData = func.DecodeJson_RESPONSE( window.localStorage.getItem('__dir') )
            defaultCointEmail( newData[0]?.email ,[])
            

        } catch (error) {

        }
    }, [])

    // console.log( User )

    return (
        <>
            <Button variant="warning" onClick={handleShow}>
                Betting
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Betting  <br></br>{EditData.name_01.toString()} {EditData.coast_01.toString()}  -  {EditData.coast_02.toString()} {EditData.name_02.toString()}
                        <br></br>
                        {EditData.time_start}
                    </Modal.Title>


                </Modal.Header>
                <Modal.Body>
                    <label><label style={{ fontWeight: 'bold' }}>Team Win:</label> The user selects a team you think will win to place a bet. User selects the box below bet amount</label>
                    <div className='row'>
                        <div className="col-lg-6">
                            <label style={{ fontWeight: 'bold' }}>Choose Team</label>
                            <select className='form-control'

                                onChange={(e) => setChooseTeamWin(e.target.value)}>
                                <option value=''>Choose Team</option>
                                <option value={EditData.name_01.toString()}>{EditData.name_01.toString()}</option>
                                <option value={EditData.name_02.toString()}>{EditData.name_02.toString()}</option>
                            </select>
                        </div>
                        <div className="col-lg-6">
                            <label style={{ fontWeight: 'bold' }}>Betting Money {formatter.format(MoneyChooseTeamWin)}</label>
                            <input className='form-control'
                                value={MoneyChooseTeamWin}
                                onChange={e => setMoneyChooseTeamWin(e.target.value)}></input>
                        </div>
                    </div>


                    <hr></hr>
                    <label><label style={{ fontWeight: 'bold' }}>Even or Odd:</label> You can choose even or odd. We will announce the results when the match is over. The sum of the points of the two teams for us to decide an odd or a sure</label>
                    <div className='row'>
                        <div className="col-lg-6">
                            <label style={{ fontWeight: 'bold' }}>Choose Team</label>
                            <select className='form-control'

                                onChange={(e) => setChooseEvenOdd(e.target.value)}>
                                <option value=''>Choose Even or Odd</option>
                                <option value={'Even'}>{'Even'}</option>
                                <option value={'Odd'}>{'Odd'}</option>
                            </select>
                        </div>
                        <div className="col-lg-6">
                            <label style={{ fontWeight: 'bold' }}>Betting Money {formatter.format(MoneyEvenOdd)}</label>

                            <input className='form-control'
                                value={MoneyEvenOdd}
                                onChange={e => setMoneyEvenOdd(e.target.value)}></input>
                        </div>
                    </div>


                    <hr></hr>
                    <label><label style={{ fontWeight: 'bold' }}>Match score draw:</label> You bet if the two teams tie</label>
                    <div className='row'>

                        <div className="col-lg-6">
                            <label style={{ fontWeight: 'bold' }}>Betting Money {formatter.format(MoneyEvenOdd)}</label>

                            <input className='form-control'
                                value={MoneyChooseDraw}
                                onChange={e => setMoneyChooseDraw(e.target.value)}></input>
                        </div>
                    </div>


                    <hr></hr>
                    <label><label style={{ fontWeight: 'bold' }}>Password Confirm:</label> Re-enter your password to confirm the bet</label>
                    <div className='row'>
                        <div className="col-lg-12">
                            Password Confirm
                            <input className='form-control'
                                value={PassWordConfirm}
                                onChange={(e) => setPassWordConfirm(e.target.value)}>
                            </input>
                        </div>
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => onClickBetting()}>Betting</Button>
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

export default BettingFootBall