import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import Path from '../../../storage/Path'

function Body() {
    return (
       <Switch>
            {Path.map(x=>(
                <Route path={x.path} render={()=>x.components}></Route>
            ))}
       </Switch> 
    )
}

export default Body
