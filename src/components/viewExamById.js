import React, {useState, useEffect} from "react";
import {Box} from '@mui/material'
import axios from 'axios'
import {useParams} from "react-router";


const ViewExamById = (props) => {
    const [examData, setExamData] = useState({})
    const [assessmentData, setAssessmentData] = useState([])
    let {id} = useParams();
    useEffect(() => {
        //get topics from request
        axios.post('https://honestgrade.herokuapp.com/exam/getExamData', {
            examID: id
        })
            .then((res) => {
                const temp = res.data.exam;
                let temp2 = res.data.assessments;
                console.log(temp)
                if (res.data.success === 1) {
                    setExamData(temp[0])
                    setAssessmentData(temp2)
                }
            })
            .catch(err => console.log(err))
    }, [])
    let clickAssessment = (val)=>{
        let link = "/assessment/view/"+val;
        props.history.push(link)
    }

    return (
        <Box style={{margin: 25}}>
            Exam Details
            <h2>Exam Name:{examData.name}</h2>
            <h2>Scheduled Date:{examData.scheduleDate}</h2>
            <h2>Expiry Date:{examData.expiryDate}</h2>
            <h3>Questions</h3>
            {(examData&& examData.questions)?examData.questions.map(q =>
                <h4>{q.question}</h4>
            ):""
            }
            <h3>Turn Ins:{assessmentData.length}</h3>
            <h3>Assessment Data</h3>
            {assessmentData.map(a => <div onClick={()=>{clickAssessment(a._id)}}><h2>{a.student.name} - {a.violationCount ? a.violationCount : 0}</h2></div>)}
        </Box>)
}

export default ViewExamById;
