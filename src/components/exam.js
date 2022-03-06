import TextField from '@mui/material/TextField';
import React, {useState} from "react";
import {Button, Box} from '@mui/material'
import axios from 'axios'

const Exam = () => {
    const [exam, setExam] = useState('')
    const [examDesc, setExamDesc] = useState('')

    const onChangeExam = (e) => setExam(e.target.value);
    const onChangeDesc = (e) => setExamDesc(e.target.value);

    const handleSubmit = () => {
        const id_arr = ['61292537022ffa228446538b', '61365dcb35821226f036f365', '61365de235821226f036f367', '61365de835821226f036f369']
        axios.post('https://honestgrade.herokuapp.com/exam/add', {
            name: exam,
            class: '61292731e4341604f0fbbf15',
            description: examDesc,
            questionIds: id_arr,
            scheduleDate: '08/09/2021',
            numberQuestions: 6
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    };
    const boxStyles = {
        display: 'flex',
        flexDirection: 'column',
        width: '20%',
        margin: '3%'
    }
    return (
        <Box style={boxStyles}>
            <h2>Add Exam</h2>

            <TextField
                onChange={onChangeExam}
                value={exam}
                label={"Exam"}
                style={{marginBottom: '5%'}}
            />
            <TextField
                onChange={onChangeDesc}
                value={examDesc}
                label={'Exam Description'}
                style={{marginBottom: '5%'}}
            />
            <Button variant='contained' onClick={handleSubmit}>Submit</Button>
        </Box>
    )
}

export default Exam;
