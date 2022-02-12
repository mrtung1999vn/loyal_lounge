import React from 'react'
import { Link } from 'react-router-dom'

function TrangChu() {
    



    
    React.useEffect(async ()=>{
        try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.log(error)
        }
    },[])
    return (
        <React.Fragment>

        </React.Fragment>
    )
}

export default TrangChu