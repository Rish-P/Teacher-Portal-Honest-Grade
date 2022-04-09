import React from 'react';
import { Box } from '@mui/material';
import ViewClasses from '../components/viewClasses';

function App() {
	const headerStyles = {
		display: 'flex',
		justifyContent: 'center',
	};
	const boxStyles = {
		display: 'flex',
		flexDirection: 'column',
		fontFamily: 'Noto Serif Display',
		width: '50%',
		margin: '1%',
	};
	const boxStyles2 = {
		display: 'flex',
		flexDirection: 'column',
		fontFamily: 'Noto Serif Display',
		width: '50%',
		marginLeft: '3%',
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
	const teacher_details = JSON.parse(localStorage.getItem('user_details'));
	return (
		<React.Fragment style={headerStyles}>
			<Box style={boxStyles}>
				<h1>Welcome {teacher_details.userID} !</h1>
			</Box>
			<Box style={boxStyles2}>
				<h2>View Upcoming Tests</h2>
				<Box style={cardStyle}>
					<h3 style={{ fontFamily: 'Avenir Next' }}>
						You do not have any upcoming tests !
					</h3>
				</Box>
			</Box>
			<Box style={boxStyles2}>
				<h2>View Classes</h2>
				<Box style={cardStyle}>
					<ViewClasses></ViewClasses>
				</Box>
			</Box>
		</React.Fragment>
	);
}
export default App;
