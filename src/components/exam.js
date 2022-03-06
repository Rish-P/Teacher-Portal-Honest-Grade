import TextField from '@mui/material/TextField';
import { Button, Box } from '@mui/material';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import MaterialTable from 'material-table';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

const Exam = () => {
	const [value, setValue] = useState('objective');
	const [exam, setExam] = useState('');
	const [classes, setClasses] = useState([]);
	const [selectedClass, setSelectedClass] = useState({});
	const [examDesc, setExamDesc] = useState('');
	const [total, setTotal] = useState('');
	const [topics, setTopics] = useState([{}]);
	const [selectedTopic, setSelectedTopic] = useState({});
	const [selectedOption, setSelectedOption] = useState({});
	const [columns, setColumns] = useState([]);
	const [data, setData] = useState([]);
	const [addedData, setAddedData] = useState([]);
	const [scheduledDate, setScheduledDate] = useState(moment());
	const [expiryDate, setExpiryDate] = useState(moment());
	const [inputScheduleValue, setScheduleInputValue] = useState(
		moment().format('DD-MM-YYYY')
	);
	const [inputExpiryValue, setExpiryInputValue] = useState(
		moment().format('DD-MM-YYYY')
	);
	const [difficulty, setDifficulty] = useState({
		1: 0,
		2: 0,
		3: 0,
	});

	const teacherID = JSON.stringify(localStorage.getItem('teacher_details'))
		._id;

	const onChangeExam = (e) => setExam(e.target.value);
	const onChangeDesc = (e) => setExamDesc(e.target.value);
	const onChangeTotal = (e) => setTotal(e.target.value);
	const onScheduledDateChange = (date, value) => {
		setScheduledDate(date);
		setScheduleInputValue(value);
	};
	const onExpiryDateChange = (date, value) => {
		setExpiryDate(date);
		setExpiryInputValue(value);
	};
	const handleSubmit = () => {
		axios
			.post('https://honestgrade.herokuapp.com/exam/add', {
				type: value,
				name: exam,
				description: examDesc,
				numberQuestions: total,
				class: selectedClass,
				scheduleDate: scheduledDate,
				expiryDate: expiryDate,
				questionIds: addedData,
			})
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err));
	};

	let options2 = [
		{ value: 1, label: 'Subjective' },
		{ value: 0, label: 'Objective' },
	];

	function refetchTableData(topic, option) {
		let reqBody = { topicID: topic.value, type: option.value };
		axios
			.post(
				'https://honestgrade.herokuapp.com/topic/getQuestionsForTopic',
				reqBody
			)
			.then((res) => {
				console.log(res.data);
				if (res.data.success === -20) {
					setData([]);
				} else {
					if (option.value === 1) {
						let tableData = res.data.data;
						tableData.forEach((t) => {
							let str = '';
							let str2 = '';
							if (t.keywords) {
								t.keywords.forEach((k) => {
									str += k;
									str += ',';
								});
							}
							t.keywords = str;
							if (t.importantKeywords) {
								t.importantKeywords.forEach((k) => {
									str2 += k;
									str2 += ',';
								});
							}
							t.importantKeywords = str2;
						});
						let colArr = [
							{
								title: 'Question',
								field: 'question',
							},
							{
								title: 'Answer',
								field: 'answer',
							},
							{
								title: 'Keywords',
								field: 'keywords',
							},
							{
								title: 'Important Keywords',
								field: 'importantKeywords',
							},
							{
								title: 'Out Of',
								field: 'outOf',
							},
						];
						setColumns(colArr);
						setData(res.data.data);
					} else {
						let tableData = res.data.data;
						tableData.forEach((t) => {
							let str = '';
							if (t.options) {
								t.options.forEach((k) => {
									str += k;
									str += ',';
								});
							}
							t.options = str;
						});
						let colArr = [
							{
								title: 'Question',
								field: 'question',
							},
							{
								title: 'Answer',
								field: 'answer',
							},
							{
								title: 'Difficulty',
								field: 'difficulty',
							},
							{
								title: 'Options',
								field: 'options',
							},
							{
								title: 'Answer Description',
								field: 'answerDescription',
							},
						];
						setColumns(colArr);
						setData(res.data.data);
					}
				}
			})
			.catch((err) => console.log(err));
	}

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

	useEffect(() => {
		//get topics from request
		axios
			.post('https://honestgrade.herokuapp.com/class/get', {
				teacher: '612923ef022ffa2284465389',
			})
			.then((res) => {
				const temp = res.data.classes;
				console.log(res.data);
				setClasses(temp);
			})
			.catch((err) => console.log(err));
	}, []);

	let options1 = topics.map(function (city) {
		return { value: city.id, label: city.name };
	});

	let options3 = classes.map((el) => {
		return { value: el._id, label: el.name };
	});

	const changeTopic = (e) => {
		setSelectedTopic(e);
		refetchTableData(e, selectedOption);
	};

	const changeClass = (e) => {
		setSelectedClass(e);
	};

	const changeOption = (e) => {
		setSelectedOption(e);
		refetchTableData(selectedTopic, e);
	};
	const addQuestion = (event, selectedRow) => {
		setAddedData((prevState) => {
			const dataCopy = [...prevState];
			if (dataCopy.indexOf(selectedRow) == -1) {
				setDifficulty((prevState) => {
					const dataCopy = { ...prevState };
					if (selectedRow.difficulty === 2) {
						if (dataCopy[selectedRow.difficulty] < total)
							dataCopy[selectedRow.difficulty]++;
						else
							alert(
								'You have added the total number of questions needed for this difficulty level'
							);
					} else if (
						selectedRow.difficulty === 1 ||
						selectedRow.difficulty === 3
					) {
						if (dataCopy[selectedRow.difficulty] < total - 2)
							dataCopy[selectedRow.difficulty]++;
						else
							alert(
								'You have added the total number of questions needed for this difficulty level'
							);
					}
					return dataCopy;
				});
				if (
					selectedRow.difficulty === 1 ||
					selectedRow.difficulty === 3
				) {
					if (difficulty[selectedRow.difficulty] < total - 2)
						dataCopy.push(selectedRow);
				} else {
					if (difficulty[selectedRow.difficulty] < total)
						dataCopy.push(selectedRow);
				}
			}
			return dataCopy;
		});
	};
	console.log(difficulty);
	const deleteQuestion = (event, selectedRow) => {
		if (window.confirm('Do you want to delete this question ?')) {
			setAddedData((prevState) => {
				let dataCopy = [...prevState];
				dataCopy = dataCopy.filter((row) => row != selectedRow);
				setDifficulty((prevState) => {
					const dataCopy = { ...prevState };
					dataCopy[selectedRow.difficulty]--;
					return dataCopy;
				});
				return dataCopy;
			});
		}
	};
	const boxStyles = {
		display: 'flex',
		flexDirection: 'column',
		width: '20%',
		margin: '3%',
	};

	const boxStyles2 = {
		display: 'flex',
		flexDirection: 'column',
		width: '80%',
		margin: '3%',
	};
	const dateFormatter = (str) => {
		return str;
	};
	const handleChange = (event) => {
		setValue(event.target.value);
	};
	let inputProps = {};
	if (isNaN(total)) {
		inputProps.error = true;
		inputProps.helperText = 'Enter a Number';
	} else if (total > 20) {
		inputProps.error = true;
		inputProps.helperText = 'Enter a Smaller Number';
	}

	return (
		<div>
			<Box style={boxStyles}>
				<h2>Add Exam</h2>
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
					onChange={onChangeExam}
					value={exam}
					label={'Exam'}
					style={{ marginBottom: '5%' }}
				/>
				<TextField
					onChange={onChangeDesc}
					value={examDesc}
					label={'Exam Description'}
					style={{ marginBottom: '5%' }}
				/>
				<TextField
					onChange={onChangeTotal}
					value={total}
					label={'Total No. of Questions'}
					style={{ marginBottom: '5%' }}
					{...inputProps}
				/>
				<Select
					name='form-field-name'
					value={selectedClass}
					onChange={changeClass}
					searchable={false}
					options={options3}
					style={{ marginBottom: '5%' }}
				/>
				<h4>Scheduled Date</h4>
				<MuiPickersUtilsProvider
					libInstance={moment}
					utils={MomentUtils}
				>
					<KeyboardDatePicker
						autoOk={true}
						showTodayButton={true}
						value={scheduledDate}
						format='DD-MM-YYYY'
						inputValue={inputScheduleValue}
						onChange={onScheduledDateChange}
						rifmFormatter={dateFormatter}
					/>
				</MuiPickersUtilsProvider>
				<h4>Expiry Date</h4>
				<MuiPickersUtilsProvider
					libInstance={moment}
					utils={MomentUtils}
				>
					<KeyboardDatePicker
						autoOk={true}
						showTodayButton={true}
						value={expiryDate}
						format='DD-MM-YYYY'
						inputValue={inputExpiryValue}
						onChange={onExpiryDateChange}
						rifmFormatter={dateFormatter}
					/>
				</MuiPickersUtilsProvider>
				<Button variant='contained' onClick={handleSubmit}>
					Submit
				</Button>
			</Box>
			<Box style={boxStyles2}>
				<h2>Add Questions</h2>
				<Select
					name='form-field-name'
					value={selectedTopic}
					onChange={changeTopic}
					searchable={false}
					options={options1}
					style={{ marginBottom: '5%' }}
				/>
				<Select
					name='form-field-name'
					value={selectedOption}
					onChange={changeOption}
					searchable={false}
					options={options2}
					style={{ marginBottom: '5%' }}
				/>
				<h4>
					Easy :{' '}
					{total - difficulty[1] - 2 < 0
						? 0
						: total - difficulty[1] - 2}{' '}
					Medium :{total - difficulty[2]} Hard :{' '}
					{total - difficulty[3] - 2 < 0
						? 0
						: total - difficulty[3] - 2}
				</h4>
				<MaterialTable
					title='Questions'
					data={data}
					columns={columns}
					actions={[
						{
							icon: 'Add',
							tooltip: 'Add Question',
							onClick: addQuestion,
						},
					]}
				/>
				<MaterialTable
					title='Added Questions'
					data={addedData}
					columns={columns}
					actions={[
						{
							icon: 'Delete',
							tooltip: 'Delete Question',
							onClick: deleteQuestion,
						},
					]}
				/>
			</Box>
		</div>
	);
};

export default Exam;
