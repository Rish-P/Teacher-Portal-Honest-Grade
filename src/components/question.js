import TextField from '@mui/material/TextField';
import React, { useState,useEffect } from "react";
import {Button, Box, MenuItem } from '@mui/material'
import axios from 'axios'
import Select from 'react-select'

const Question = () => {
  const [answer, setAnswer] = useState('')
  const [question, setQuestion] = useState('')
  const [difficulty, setDifficulty] = useState(0)
  const [topics, setTopics] = useState([{}])
  const [selectedTopic, setSelectedTopic] = useState({})
  const [answerDesc, setAnswerDesc] = useState('')
  const [options, setOptions] = useState([])
  const [answerOps, setAnswerOps] = useState([{}])

useEffect(()=>{
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
    .catch(err=>console.log(err))
},[])
let options1 = topics.map(function (city) {
    return { value: city.id, label: city.name };
  })
console.log(options)
console.log(answerOps)
  const changeQuestion = (e) => {
    setQuestion(e.target.value)
  }
  const changeAnswerDesc = (e)=>{
    setAnswerDesc(e.target.value)
  }
  const changeAnswer = (e)=>{
    setAnswer(e)
  }
  const changeDifficulty = (e)=>{
    setDifficulty(e.target.value)
  }
  const changeTopic = (e)=>{
    setSelectedTopic(e)
  }
  const changeOptions = (e)=>{
      const temp = e.target.value.split(',')
    setOptions(temp)
  }
  const handleSubmit = () => {
    const optionsArr = options.split(',')
    console.log(optionsArr)
    axios.post('https://honestgrade.herokuapp.com/questions/add',{
      question:question,
    options:options,
    answer:answer.val,
    topic:selectedTopic.value,
    teacher:'612923ef022ffa2284465389',
    difficulty:difficulty,
    privateFlag:false,
    answerDescription: answerDesc
    })
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  }
  const boxStyles = {
    display:'flex',
    flexDirection:'column',
    width:'30%',
    margin:'3%'
}

  return (
    <Box style={boxStyles}>
      <h2>Add Question</h2>

      <TextField
        onChange={changeQuestion}
        value={question}
        name="question"
        label={"Question"} //optional

      />
      <TextField
        onChange={changeOptions}
        value={options}
        name="options"
        label={"Options"} //optional
        placeholder="options"
      />
      <Select
                name="form-field-name"
                value={answer}
                onChange={changeAnswer}
                searchable={false}
                options={answerOps}    
                style={{marginBottom:'5%'}}
            />
      <Select
                name="form-field-name"
                value={selectedTopic}
                onChange={changeTopic}
                searchable={false}
                options={options1}  
                style={{marginBottom:'5%'}}
            />
      <TextField
        onChange={changeAnswerDesc}
        value={answerDesc}
        name="answerDesc"
        label={"Text Value"} //optional
        placeholder="answer"

      />
      <TextField
        onChange={changeDifficulty}
        value={difficulty}
        name="difficulty"
        label={"Text Value"} //optional
        placeholder="difficulty"

      />

      <Button variant='contained' onClick={handleSubmit}>Submit</Button>
    </Box>
  )
}
 
export default Question;