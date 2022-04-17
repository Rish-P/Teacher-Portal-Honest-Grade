import React from 'react';
import { Box } from '@mui/material';

const Account = (props) => {
	const teacher_details = JSON.parse(localStorage.getItem('teacher_details'));
	const boxStyles = {
		display: 'flex',
		flexDirection: 'column',
		width: '30%',
		margin: '3%',
		marginLeft: '20%',
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
			<h2>Account Details</h2>
			<Box style={cardStyle}>
				<h3>Name: {teacher_details.name}</h3>
				<h3>User ID: {teacher_details.userID}</h3>
				<h3>
					Date of Creation: {teacher_details.createdAt?.split('T')[0]}
				</h3>
			</Box>
		</Box>
	);
};

export default Account;
