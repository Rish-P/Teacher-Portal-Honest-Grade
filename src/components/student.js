import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import axios from 'axios';
import Select from 'react-select';

const Student = () => {
	const [student, setStudent] = useState('');
	const [selectedClass, setSelectedClass] = useState({});
	const [classes, setClasses] = useState([]);
	const [userID, setUserID] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		//get the classes
		axios
			.post('https://honestgrade.herokuapp.com/class/get', {
				teacher: '612923ef022ffa2284465389',
			})
			.then((res) => {
				const temp = res.data.classes;
				let arr = [];
				temp.forEach((t) => {
					arr.push({ value: t._id, label: t.name });
				});
				setClasses(arr);
			})
			.catch((err) => console.log(err));
	}, []);
	const onSelectedClassChange = (e) => {
		console.log('SELECTED CLASS CHANGED to', e);
		setSelectedClass(e);
	};
	const onStudentNameChange = (e) => setStudent(e.target.value);
	const onUserIDChange = (e) => setUserID(e.target.value);
	const onPasswordChange = (e) => setPassword(e.target.value);

	const handleSubmit = () => {
		axios
			.post('https://honestgrade.herokuapp.com/student/add', {
				studentName: student,
				classes: [selectedClass.value],
				userID: userID,
				password: password,
			})
			.then((res) => console.log(res.data))
			.catch((err) => console.log(err));
	};
	const boxStyles = {
		display: 'flex',
		flexDirection: 'column',
		width: '20%',
		margin: '3%',
		marginLeft: '20%',
	};

	return (
		<Box style={boxStyles}>
			<h2>Add Student</h2>

			<TextField
				onChange={onStudentNameChange}
				value={student}
				label={'Student Name'} //optional
			/>
			<TextField
				onChange={onUserIDChange}
				value={userID}
				label={'UserID'} //optional
			/>
			<TextField
				onChange={onPasswordChange}
				value={password}
				label={'password'} //optional
			/>
			<Select options={classes} onChange={onSelectedClassChange} />
			<Button variant='contained' onClick={handleSubmit}>
				Add Student
			</Button>
		</Box>
	);
};

export default Student;
