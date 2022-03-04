import TextField from '@mui/material/TextField';
import React, {useState, useEffect} from "react";
import {Button, Box, MenuItem} from '@mui/material'
import axios from 'axios'
import Select from 'react-select'
import MaterialTable from "material-table";

const boxStyles = {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    margin: '3%'
}

let options2 = [{value: 1, label: "Subjective"}, {value: 0, label: "Objective"}]
const ViewQuestions = () => {
    const [topics, setTopics] = useState([{}])
    const [selectedTopic, setSelectedTopic] = useState({})
    const [selectedOption, setSelectedOption] = useState({})
    const [columns, setColumns] = useState([])
    const [data, setData] = useState([])

    function refetchTableData(topic, option) {
        let reqBody = {topicID: topic.value, type: option.value}
        axios.post('https://honestgrade.herokuapp.com/topic/getQuestionsForTopic', reqBody)
            .then((res) => {
                console.log(res.data)
                if (res.data.success === -20) {
                    setData([])
                } else {
                    if (option.value === 1) {
                        let tableData = res.data.data;
                        tableData.forEach(t => {
                            let str = ''
                            let str2 = ''
                            if (t.keywords) {
                                t.keywords.forEach(k => {
                                    str += k;
                                    str += ','
                                })
                            }
                            t.keywords = str;
                            if (t.importantKeywords) {
                                t.importantKeywords.forEach(k => {
                                    str2 += k;
                                    str2 += ','
                                })

                            }
                            t.importantKeywords = str2;

                        })
                        let colArr = [
                            {
                                title: "Question",
                                field: "question",
                            },
                            {
                                title: "Answer",
                                field: "answer",
                            },
                            {
                                title: "Keywords",
                                field: "keywords",
                            },
                            {
                                title: "Important Keywords",
                                field: "importantKeywords",
                            },
                            {
                                title: "Out Of",
                                field: "outOf",
                            },

                        ]
                        setColumns(colArr)
                        setData(res.data.data)
                    } else {
                        let tableData = res.data.data;
                        tableData.forEach(t => {
                            let str = ''
                            if (t.options) {
                                t.options.forEach(k => {
                                    str += k;
                                    str += ','
                                })
                            }
                            t.options = str;
                        })
                        let colArr = [
                            {
                                title: "Question",
                                field: "question",
                            },
                            {
                                title: "Answer",
                                field: "answer",
                            },
                            {
                                title: "Difficulty",
                                field: "difficulty",
                            },
                            {
                                title: "Options",
                                field: "options"
                            },
                            {
                                title: "Answer Description",
                                field: "answerDescription",
                            },

                        ]
                        setColumns(colArr)
                        setData(res.data.data)

                    }
                }
            })
            .catch(err => console.log(err))
    }

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
    const changeTopic = (e) => {
        setSelectedTopic(e)
        refetchTableData(e, selectedOption)
    }
    const changeOption = (e) => {
        setSelectedOption(e)
        refetchTableData(selectedTopic, e)
    }
    return (
        <Box style={boxStyles}>
            <Select
                name="form-field-name"
                value={selectedTopic}
                onChange={changeTopic}
                searchable={false}
                options={options1}
                style={{marginBottom: '5%'}}
            />
            <Select
                name="form-field-name"
                value={selectedOption}
                onChange={changeOption}
                searchable={false}
                options={options2}
                style={{marginBottom: '5%'}}
            />
            <MaterialTable title="Questions" data={data} columns={columns}/>
        </Box>
    )
}

export default ViewQuestions;
