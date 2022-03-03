import React,{useState} from 'react'
import axios from 'axios'
import {BrowserRouter as Router} from 'react-router-dom'


function App() {
    const headerStyles = {
        display:'flex',
        justifyContent:'center'
    }
    return(
        <React.Fragment style={headerStyles}>
            <h1>
                Teacher Portal
            </h1>
        </React.Fragment>
    )
}
export default App