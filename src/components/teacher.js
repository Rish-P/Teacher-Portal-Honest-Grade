import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import axios from 'axios';

const Teacher = () => {
	const [teacher, setTeacher] = useState('');

	const onTextChange = (e) => setTeacher(e.target.value);
	const addTeacher = () => {
		axios
			.post('https://honestgrade.herokuapp.com/teacher/add', {
				teacherName: teacher,
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
			<h2>Add Teacher</h2>

			<TextField
				onChange={onTextChange}
				value={teacher}
				label={'Teacher Name'} //optional
				style={{ marginBottom: '5%' }}
			/>
			<Button
				variant='contained'
				onClick={addTeacher}
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
	);
};

export default Teacher;
