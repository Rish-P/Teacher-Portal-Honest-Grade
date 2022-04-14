import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react';
import { Button, Box, MenuItem } from '@mui/material';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios';
import Select from 'react-select';

const Question = () => {
	const [value, setValue] = useState('objective');
	const [answer, setAnswer] = useState([{}]);
	const [answerSubjective, setAnswerSubjective] = useState('');
	const [outOf, setOutOf] = useState(0);
	const [keywords, setKeywords] = useState('');
	const [impKeywords, setImpKeywords] = useState('');
	const [question, setQuestion] = useState('');
	const [difficulty, setDifficulty] = useState([{}]);
	const [topics, setTopics] = useState([{}]);
	const [selectedTopic, setSelectedTopic] = useState({});
	const [answerDesc, setAnswerDesc] = useState('');
	const [option1, setOption1] = useState('');
	const [option2, setOption2] = useState('');
	const [option3, setOption3] = useState('');
	const [option4, setOption4] = useState('');

	useEffect(() => {
		//get topics from request
		axios
			.post('https://honestgrade.herokuapp.com/topic/gettopics')
			.then((res) => {
				// console.log(res.data.data)
				const temp = res.data.data;
				console.log(res.data);
				// let respArray = []
				//     temp.forEach((topic)=>{
				//         respArray.push(topic.name)
				//         })
				setTopics(temp);
			})
			.catch((err) => console.log(err));
	}, []);
	let options1 = topics.map(function (city) {
		return { value: city.id, label: city.name };
	});

	const changeQuestion = (e) => {
		setQuestion(e.target.value);
	};
	const changeAnswerDesc = (e) => {
		setAnswerDesc(e.target.value);
	};
	const changeAnswerSubjective = (e) => {
		setAnswerSubjective(e.target.value);
	};
	const changeOutOf = (e) => {
		setOutOf(e.target.value);
	};
	const changeKeywords = (e) => {
		setKeywords(e.target.value);
	};
	const changeImpKeywords = (e) => {
		setImpKeywords(e.target.value);
	};
	const changeAnswer = (e) => {
		setAnswer(e);
	};
	const changeDifficulty = (e) => {
		console.log(e);
		setDifficulty(e);
	};
	const changeTopic = (e) => {
		setSelectedTopic(e);
	};
	const changeOption1 = (e) => {
		const temp = e.target.value;
		setOption1(temp);
	};
	const changeOption2 = (e) => {
		const temp = e.target.value;
		setOption2(temp);
	};
	const changeOption3 = (e) => {
		const temp = e.target.value;
		setOption3(temp);
	};
	const changeOption4 = (e) => {
		const temp = e.target.value;
		setOption4(temp);
	};
	const handleChange = (event) => {
		setValue(event.target.value);
	};
	const handleSubmit = () => {
		const optionsArr = [option1, option2, option3, option4];
		const difficultyNumber =
			difficulty.value === 'Easy'
				? 0
				: difficulty.value === 'Medium'
				? 1
				: 2;
		const teacher_details = JSON.parse(
			localStorage.getItem('user_details')
		);
		console.log(teacher_details);
		console.log(difficultyNumber);
		console.log(optionsArr);
		axios
			.post('https://honestgrade.herokuapp.com/questions/add', {
				question: question,
				options: optionsArr,
				answer: answer.value,
				topic: selectedTopic.value,
				teacher: teacher_details._id,
				difficulty: difficultyNumber,
				private: false,
				answerDescription: answerDesc,
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	}; //outof//keywords//importantkeywords
	const handleSubmitSubjective = () => {
		const teacher_details = JSON.parse(
			localStorage.getItem('user_details')
		);
		const keywordsArr = keywords.split(',');
		const impKeywordsArr = impKeywords.split(',');
		console.log("ANS",answer);
		console.log("REQ.BODY",{
			question: question,
			options: undefined,
			answer: answerSubjective,
			topic: selectedTopic.value,
			teacher: teacher_details._id,
			difficulty: 0,
			private: false,
			answerDescription: answerDesc,
			outOf,
			keywords: keywordsArr,
			impKeywords: impKeywordsArr,
		})
		axios
			.post('https://honestgrade.herokuapp.com/questions/addSubjectiveQuestion', {
				question: question,
				options: undefined,
				answer: answerSubjective,
				topic: selectedTopic.value,
				teacher: teacher_details._id,
				difficulty: 0,
				private: false,
				answerDescription: answerDesc,
				outOf,
				keywords: keywordsArr,
				impKeywords: impKeywordsArr,
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};
	const boxStyles = {
		display: 'flex',
		flexDirection: 'column',
		width: '30%',
		margin: '3%',
		marginLeft: '20%',
	};
	const boxStyles2 = {
		width: '63%',
		margin: '3%',
		marginLeft: '20%',
	};

	let optionsObj = [option1, option2, option3, option4].map((el) => {
		return { value: el, label: el };
	});
	let difficultyObj = ['Easy', 'Medium', 'Hard'].map((el) => {
		return { value: el, label: el };
	});

	return (
		<div>
			<Box style={boxStyles}>
				<h2>Add Question</h2>
				<FormControl component='fieldset'>
					<FormLabel component='legend'>Type</FormLabel>
					<RadioGroup
						row
						aria-label='types'
						name='type'
						value={value}
						onChange={handleChange}
					>
						<FormControlLabel
							value='objective'
							control={<Radio />}
							label='Objective'
						/>
						<FormControlLabel
							value='subjective'
							control={<Radio />}
							label='Subjective'
						/>
					</RadioGroup>
				</FormControl>
				<TextField
					onChange={changeQuestion}
					value={question}
					name='question'
					label={'Question'}
					style={{ marginTop: '5%' }}
				/>
			</Box>
			{value === 'objective' ? (
				<Box style={boxStyles2}>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<TextField
							onChange={changeOption1}
							value={option1}
							name='options1'
							label={'Option 1'} //optional
							style={{
								marginBottom: '5%',
								paddingRight: '2%',
								width: '60%',
							}}
						/>
						<TextField
							onChange={changeOption2}
							value={option2}
							name='option2'
							label={'Option 2'} //optional
							style={{
								marginBottom: '5%',
								paddingRight: '2%',
								width: '60%',
							}}
						/>
					</div>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<TextField
							onChange={changeOption3}
							value={option3}
							name='option3'
							label={'Option 3'} //optional
							style={{
								paddingRight: '2%',
								width: '60%',
							}}
						/>
						<TextField
							onChange={changeOption4}
							value={option4}
							name='options4'
							label={'Option 4'} //optional
							style={{
								paddingRight: '2%',
								width: '60%',
							}}
						/>
					</div>
				</Box>
			) : null}
			{value === 'objective' ? (
				<Box style={boxStyles}>
					<div
						style={{
							marginBottom: '5%',
							fontSize: '17px',
							zIndex: '102',
						}}
					>
						Answer:
						<Select
							name='form-field-name'
							value={answer}
							onChange={changeAnswer}
							searchable={false}
							options={optionsObj}
						/>
					</div>
					<div
						style={{
							marginBottom: '5%',
							fontSize: '17px',
							zIndex: '101',
						}}
					>
						Class:
						<Select
							name='form-field-name'
							value={selectedTopic}
							onChange={changeTopic}
							searchable={false}
							options={options1}
							styles={{ marginBottom: '20%' }}
						/>
					</div>
					<TextField
						onChange={changeAnswerDesc}
						value={answerDesc}
						name='answerDesc'
						label={'Description of Answer'} //optional
						placeholder='answer'
						style={{ marginBottom: '5%' }}
					/>
					<div
						style={{
							marginBottom: '5%',
							fontSize: '17px',
							zIndex: '100',
						}}
					>
						Difficulty:
						<Select
							name='form-field-name'
							value={difficulty}
							onChange={changeDifficulty}
							searchable={false}
							options={difficultyObj}
						/>
					</div>
				</Box>
			) : null}
			{value === 'subjective' ? (
				<Box style={boxStyles}>
					<TextField
						onChange={changeAnswerSubjective}
						value={answerSubjective}
						name='answerSubj'
						label={'Model Answer'} //optional
						placeholder='Answer'
						style={{ marginBottom: '5%' }}
					/>
					<div
						style={{
							marginBottom: '5%',
							fontSize: '17px',
							zIndex: '101',
						}}
					>
						Class:
						<Select
							name='form-field-name'
							value={selectedTopic}
							onChange={changeTopic}
							searchable={false}
							options={options1}
							styles={{ marginBottom: '20%' }}
						/>
					</div>
					<TextField
						onChange={changeOutOf}
						value={outOf}
						name='outOf'
						label={'Total Marks'} //optional
						placeholder='marks'
						style={{ marginBottom: '5%' }}
					/>
					<TextField
						onChange={changeKeywords}
						value={keywords}
						name='keywords'
						label={'Keywords'} //optional
						placeholder='keywords'
						style={{ marginBottom: '5%' }}
					/>
					<TextField
						onChange={changeImpKeywords}
						value={impKeywords}
						name='impkey'
						label={'Important Keywords'} //optional
						placeholder='impkeywords'
						style={{ marginBottom: '5%' }}
					/>
				</Box>
			) : null}
			<Box style={boxStyles2}>
				<Button
					variant='contained'
					onClick={
						value === 'objective'
							? handleSubmit
							: handleSubmitSubjective
					}
					style={{
						backgroundColor: 'black',
						color: 'white',
						fontFamily: 'inherit',
						fontSize: '18px',
						width: '40%',
						marginLeft: '30%',
						fontWeight: 'bold',
						borderRadius: '4px',
					}}
				>
					Submit
				</Button>
			</Box>
		</div>
	);
};

export default Question;
