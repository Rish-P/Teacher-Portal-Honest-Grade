import React, {useState, useEffect} from "react";
import {Box} from '@mui/material'
import axios from 'axios'
import {useParams} from "react-router";


const ViewAssessmentById = (props) => {
    const [assessment,setAssessment] = useState({})
    let {id} = useParams();
    useEffect(() => {
        //get topics from request
        axios.post('https://honestgrade.herokuapp.com/assessment/getAssessmentById', {
            assessmentID: id
        })
            .then((res) => {
                let temp = res.data.assessment;
                console.log(temp)
                if (res.data.success === 1) {
                    setAssessment(temp[0])
                    console.log(temp[0])
                }
            })
            .catch(err => console.log(err))
    }, [])
    function getViolationType(type){
        if(type===0){
            return "Tab Switching"
        }else if(type===1){
            return "Proctoring"
        }else {
            return "Sound heard"
        }
    }
    return (
        <Box style={{margin: 25,marginLeft: 250}}>
            Assessment Details
            <h2>Score: {assessment.score}</h2>
            <h3>Total Marks:{assessment.totalMarks}</h3>
            {assessment.violations?assessment.violations.map(v=>
                <div>
                    Violation Type:{getViolationType(v.violationType)} <br/>
                    Notes: {v.notes} <br/>
                    Violation Time: {v.createdAt}
                    <hr/>
                </div>
            ):""}
        </Box>)
}

export default ViewAssessmentById;
