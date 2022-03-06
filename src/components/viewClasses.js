import React, {useState, useEffect} from "react";
import {Box, ListItemButton} from '@mui/material'
import axios from 'axios'
import {List, ListItem, ListItemText} from "@material-ui/core";
import {Redirect} from "react-router";


const ViewClasses = (props) => {
    const [classes, setClasses] = useState([])
    useEffect(() => {
        //get topics from request
        axios.post('https://honestgrade.herokuapp.com/class/get', {
            teacher: "612923ef022ffa2284465389"
        })
            .then((res) => {
                const temp = res.data.classes
                console.log(res.data)
                setClasses(temp)
                console.log(temp)
            })
            .catch(err => console.log(err))
    }, [])
    function clickClass(id){
        let link = "/class/view/"+id;
        props.history.push(link)
    }
    return (
        <Box sx={{padding: "30", margin: "2%", width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            <h3>My Classes</h3>
            <List>
                {classes.map(c=>(<ListItem disablePadding>
                    <ListItemButton onClick={()=>clickClass(c._id)}>
                        <ListItemText primary={c.name}/>
                    </ListItemButton>
                </ListItem>))}
            </List>

        </Box>)
}

export default ViewClasses;
