import './App.css';
import React, { Fragment } from 'react';
import Login from './page/Login';
import func from './asset/func';
import User from './storage/User';
import Main from './page/Main';

function App() {
  const [user,setUser] = React.useState(false)

  React.useEffect(async () =>{
    try {
      setUser( window.localStorage.getItem(func.Encode_LoopBtoa(10,'UserLogin')).length >= 0 )
    } catch (error) {
      setUser(false)
    }
  },[])
  // console.log(  )
  // if(user){
  if(true){  
    return(
      <Fragment>
          <Main></Main>
      </Fragment>
    )
  }else{
    return (
      <Fragment>
        <Login></Login>
      </Fragment>
    );
  }
}

export default App;
