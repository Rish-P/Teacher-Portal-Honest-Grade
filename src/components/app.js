import React, { useState, useEffect } from 'react';
import { Box, ListItemButton } from '@mui/material';
import ViewClasses from '../components/viewClasses';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';
import ViewPastExams from './viewPastExams';

function App() {
	const [exams, setExams] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const history = useHistory();
	const teacher_details = JSON.parse(localStorage.getItem('teacher_details'));
	useEffect(() => {
		axios
			.post('https://honestgrade.herokuapp.com/exam/getUpcomingExams', {
				teacherID: teacher_details._id,
			})
			.then((res) => {
				const temp = res.data.exams;
				console.log(res.data);
				console.log(temp);
				setLoaded(true);
				setExams(temp);
			})
			.catch((err) => console.log(err));
	}, []);
	let clickExam = (val) => {
		let link = '/exam/view/' + val;
		history.push(link);
	};
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
		marginLeft: '20%',
	};
	const boxStyles2 = {
		display: 'flex',
		flexDirection: 'column',
		fontFamily: 'Noto Serif Display',
		width: '50%',
		marginLeft: '20%',
	};
	const boxStyles3 = {
		display: 'flex',
		flexDirection: 'column',
		fontFamily: 'Noto Serif Display',
		width: '50%',
	};
	const boxStyles4 = {
		display: 'flex',
		flexDirection: 'column',
		fontFamily: 'Noto Serif Display',
		width: '50%',
		marginLeft: '30%',
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
	const loaderStyles = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		width: '100%',
		flexDirection: 'row',
	};
	return (
		<React.Fragment style={headerStyles}>
			<Box style={boxStyles}>
				<h1>Welcome {teacher_details.userID} !</h1>
			</Box>
			<Box style={boxStyles2}>
				<h2>View Upcoming Tests</h2>
				<Box>
					{exams === undefined ? (
						<Box style={cardStyle}>
							<h3 style={{ fontFamily: 'Avenir Next' }}>
								You do not have any upcoming tests !
							</h3>
						</Box>
					) : (
						''
					)}
					{exams !== undefined ? (
						<List style={cardStyle}>
							{loaded ? (
								exams.map((c, i) => (
									<div>
										<ListItem disablePadding>
											<ListItemButton
												onClick={() => clickExam(c._id)}
											>
												<ListItemText
													primary={c.name}
												/>
											</ListItemButton>
										</ListItem>
										{i + 1 < exams.length ? (
											<Divider />
										) : null}
									</div>
								))
							) : (
								<div style={loaderStyles}>
									<RotatingLines
										width='50'
										strokeColor='grey'
										strokeWidth='1'
										animationDuration='1'
										type='Circles'
										color='black'
										height='50'
										timeout={10000}
									/>
								</div>
							)}
						</List>
					) : (
						''
					)}
				</Box>
				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<Box style={boxStyles3}>
						<h2>View Classes</h2>
						<ViewClasses></ViewClasses>
					</Box>
					<Box style={boxStyles4}>
						<h2>View Past Tests</h2>
						<ViewPastExams></ViewPastExams>
					</Box>
				</div>
			</Box>
		</React.Fragment>
	);
}
export default App;
