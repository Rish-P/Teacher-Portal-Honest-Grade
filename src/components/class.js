import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import axios from 'axios';

const Class = () => {
	const [class1, setClass] = useState('');

	const onTextChange = (e) => setClass(e.target.value);
	const handleSubmit = () => {
		axios
			.post('https://honestgrade.herokuapp.com/class/add', {
				className: class1,
				teacher: '612923ef022ffa2284465389',
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
			<h2>Add Class</h2>

			<TextField
				onChange={onTextChange}
				value={class1}
				label={'Class Name'}
				style={{ marginBottom: '5%' }} //optional
			/>
			<Button variant='contained' onClick={handleSubmit}>
				Submit
			</Button>
		</Box>
	);
};

export default Class;
