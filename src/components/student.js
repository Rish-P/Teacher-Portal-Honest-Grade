import TextField from '@mui/material/TextField';
import React, { useState,useEffect } from "react";
import {Button, Box, Select} from '@mui/material'
import axios from 'axios'

const Teacher = () => {
  const [student, setStudent] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [classes, setClasses] = useState([])
  useEffect(()=>{
    //get the classes
    axios.post('https://honestgrade.herokuapp.com/class/get',{
        teacher:'612923ef022ffa2284465389'
    })
    .then(res=>{
      const temp = res.data.classes
      setClasses([...temp])
    })
    .catch(err=>console.log(err))
  },[])
  const onTextChange = (e) => setStudent(e.target.value);
  const changeClass = (e) => setSelectedClass(e);
  const handleSubmit = () => {
    axios.post('https://honestgrade.herokuapp.com/student/add',{
        studentName:student,
        classes:["61292731e4341604f0fbbf15"]
    })
    .then(res=>console.log(res.data))
    .catch(err=>console.log(err))
  };
  const boxStyles = {
    display:'flex',
    flexDirection:'column',
    width:'20%',
    margin:'3%'
}

  return (
    <Box style={boxStyles}>
      <h2>Add Student</h2>

      <TextField
        onChange={onTextChange}
        value={student}
        label={"Student Name"} //optional
      />
      <Select
                name="form-field-name"
                value={selectedClass}
                onChange={changeClass}
                searchable={false}
                options={classes}    
                style={{marginBottom:'5%'}}
            />
      <Button variant='contained' onClick={handleSubmit}>Submit</Button>
    </Box>
  )
}
 
export default Teacher;