import TextField from '@mui/material/TextField';
import React, {useState, useEffect} from "react";
import {Button, Box, MenuItem} from '@mui/material'
import axios from 'axios'
import Select from 'react-select'

const SubjectiveQuestion = () => {
    const [answer, setAnswer] = useState('')
    const [question, setQuestion] = useState('')
    const [topics, setTopics] = useState([{}])
    const [selectedTopic, setSelectedTopic] = useState({})
    const [answerDesc, setAnswerDesc] = useState('')
    const [keywords, setKeywords] = useState([])
    const [keywordsStr, setKeywordsStr] = useState('');
    const [impKeywords, setImpKeywords] = useState([])
    const [impKeywordsStr, setImpKeywordsStr] = useState('');
    const [outOf, setOutOf] = useState(0);

    useEffect(() => {
        //get topics from request
        axios.post('https://honestgrade.herokuapp.com/topic/gettopics')
            .then((res) => {
                // console.log(res.data.data)
                const temp = res.data.data
                console.log(res.data)
                // let respArray = []
                //     temp.forEach((topic)=>{
                //         respArray.push(topic.name)
                //         })
                setTopics(temp)
            })
            .catch(err => console.log(err))
    }, [])
    let options1 = topics.map(function (city) {
        return {value: city.id, label: city.name};
    })
    const changeQuestion = (e) => {
        setQuestion(e.target.value)
    }

    const changeKeywords = (e) => {
        const temp = e.target.value.split(',')
        setKeywords(temp)
        setKeywordsStr(e.target.value)
    }
    const changeImpKeywords = (e) => {
        const temp = e.target.value.split(',')
        setImpKeywords(temp)
        setImpKeywordsStr(e.target.value)
    }
    const changeAnswerDesc = (e) => {
        setAnswerDesc(e.target.value)
    }
    const changeOutOf = (e) => {
        setOutOf(e.target.value)
    }
    const changeTopic = (e) => {
        setSelectedTopic(e)
    }
    const changeAnswer = (e) => {
        setAnswer(e.target.value)
    }
    const handleSubmit = () => {
        axios.post('https://honestgrade.herokuapp.com/questions/addSubjectiveQuestion', {
            question: question,
            answer: answer,
            topic: selectedTopic.value,
            teacher: '612923ef022ffa2284465389',
            privateFlag: false,
            answerDescription: answerDesc,
            keywords: keywords,
            importantKeywords: impKeywords,
            outOf: outOf,
            difficulty:0

        })
            .then(res => {
                alert("Question Added")
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }
    const boxStyles = {
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        margin: '3%'
    }

    return (
        <Box style={boxStyles}>
            <h2>Add Subjective Question</h2>
            <TextField
                onChange={changeQuestion}
                value={question}
                name="question"
                label={"Question"} //optional
                placeholder="Question"
            />

            <TextField
                onChange={changeAnswer}
                value={answer}
                name="answer"
                label={"Answer"} //optional
                placeholder="Answer"
            />

            <Select
                name="form-field-name"
                value={selectedTopic}
                onChange={changeTopic}
                searchable={false}
                options={options1}
                style={{marginBottom: '5%'}}
                label="Topic" //optional
                placeholder="Topic"
            />

            <TextField
                onChange={changeKeywords}
                value={keywordsStr}
                name="keywords"
                label={"Keywords"} //optional
                placeholder="keywords"
            />

            <TextField
                onChange={changeImpKeywords}
                value={impKeywordsStr}
                name="impKeywords"
                label={"Important Keywords"} //optional
                placeholder="Important Keywords"
            />
            <TextField
                onChange={changeOutOf}
                value={outOf}
                name="outOf"
                label={"Out Of"} //optional
                placeholder="Out Of"
            />
            <TextField
                onChange={changeAnswerDesc}
                value={answerDesc}
                name="answerDesc"
                label={"Text Value"} //optional
                placeholder="answer"
            />
            <Button variant='contained' onClick={handleSubmit}>Submit</Button>
        </Box>
    )
}

export default SubjectiveQuestion;
