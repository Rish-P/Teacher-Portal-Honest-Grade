import TextField from '@mui/material/TextField';
import React, { useState } from "react";
import {Button, Box} from '@mui/material'
import axios from 'axios'

const Teacher = () => {
  const [topics, setTopics] = useState('')

  const onTextChange = (e) => setTopics(e.target.value);
  const handleSubmit = () => {
    axios.post('https://honestgrade.herokuapp.com/topic/add',{
        topicName:topics
    })
    .then(res=>console.log(res.data))
    .catch(err=>console.log(err))
  };
  const boxStyles = {
    display:'flex',
    flexDirection:'column',
    width:'30%',
    margin:'3%'
}

  return (
    <Box style={boxStyles}>
      <h2>Add Topics</h2>

      <TextField
        onChange={onTextChange}
        value={topics}
        label={"Topics"} //optional
        style={{marginBottom:'3%'}}
      />
      <Button variant='contained' onClick={handleSubmit}>Submit</Button>
    </Box>
  )
}
 
export default Teacher;