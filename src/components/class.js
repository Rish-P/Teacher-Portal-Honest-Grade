import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import axios from 'axios';
import ViewClasses from '../components/viewClasses';

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
		width: '30%',
		margin: '3%',
		marginLeft: '20%',
	};
	const boxStyles2 = {
		display: 'flex',
		flexDirection: 'column',
		fontFamily: 'Noto Serif Display',
		width: '50%',
	};
	const cardStyle = {
		width: '35vw',
		border: '1px solid lightgray',
		boxShadow: '3px 3px 3px lightgray',
		padding: '2%',
		borderRadius: '10px 10px 10px',
		marginBottom: '2%',
		backgroundColor: 'white',
		marginRight: '3%',
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
			<Button
				variant='contained'
				onClick={handleSubmit}
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
			<h2>View Classes</h2>
			<ViewClasses></ViewClasses>
		</Box>
	);
};

export default Class;
