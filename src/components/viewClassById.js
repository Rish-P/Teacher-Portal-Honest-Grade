import React, {useState, useEffect} from "react";
import {Box, ListItemButton} from '@mui/material'
import axios from 'axios'
import {List, ListItem, ListItemText} from "@material-ui/core";
import {useParams} from "react-router";


const ViewClasses = (props) => {
    const [students, setStudents] = useState([]);
    const [exams, setExams] = useState([]);
    let {id} = useParams();
    useEffect(() => {
        //get topics from request
        axios.post('https://honestgrade.herokuapp.com/student/getForClass', {
            classID: id
        })
            .then((res) => {
                const temp = res.data.students
                console.log(res.data)
                if (res.data.success === 1) {
                    setStudents(temp)
                    console.log(temp)
                }
            })
            .catch(err => console.log(err))
        axios.post('https://honestgrade.herokuapp.com/exam/getExamsForClass', {
            classId: id
        })
            .then((res) => {
                const temp = res.data.exams
                console.log(res.data)
                if (res.data.success === 1) {
                    setExams(temp)
                    console.log(temp)

                }
            })
            .catch(err => console.log(err))
    }, [])
    let clickExam = (val)=>{
        let link = "/exam/view/"+val;
        props.history.push(link)
    }


    return (
        <Box>
            Students
            <ul>
                {students.map(c => (<li>
                    {c.name}
                </li>))}
            </ul>
            Exams
            <ul>
                {exams.map(c => (<div onClick={()=>clickExam(c._id)}><li>
                    {c.name}
                </li></div>))}
            </ul>


        </Box>)
}

export default ViewClasses;
