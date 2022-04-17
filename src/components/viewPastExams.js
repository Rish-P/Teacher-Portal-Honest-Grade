import React, { useState, useEffect } from 'react';
import { Box, ListItemButton } from '@mui/material';
import axios from 'axios';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

const ViewPastExams = (props) => {
	const [exams, setExams] = useState([]);
	const [loaded, setLoaded] = useState(false);
	let teacherData = JSON.parse(localStorage.getItem('teacher_details'));
	let history = useHistory();
	useEffect(() => {
		//get topics from request
		axios
			.post('https://honestgrade.herokuapp.com/exam/getPastExams', {
				teacherID: teacherData._id,
			})
			.then((res) => {
				const temp = res.data.exams;
				console.log(res.data);
				setLoaded(true);
				setExams(temp);
				console.log(temp);
			})
			.catch((err) => console.log(err));
	}, []);
	function clickExam(id) {
		let link = '/exam/view/' + id;
		history.push(link);
	}
	const boxStyles = {
		display: 'flex',
		flexDirection: 'column',
		width: '30%',
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
		<Box style={boxStyles}>
			<List style={cardStyle}>
				{exams !== undefined ? (
					loaded ? (
						exams.map((c, i) => (
							<div>
								<ListItem disablePadding>
									<ListItemButton
										onClick={() => clickExam(c._id)}
									>
										<ListItemText primary={c.name} />
									</ListItemButton>
								</ListItem>
								{i + 1 < exams.length ? <Divider /> : null}
							</div>
						))
					) : (
						<div style={loaderStyles}>
							<RotatingLines
								width='50'
								strokeColor='grey'
								strokeWidth='1'
								animationDuration='1'
								color='black'
								height='50'
								timeout={10000}
							/>
						</div>
					)
				) : (
					<h3
						style={{ fontFamily: 'Avenir Next', marginLeft: '22%' }}
					>
						There are no tests to display.
					</h3>
				)}
			</List>
		</Box>
	);
};

export default ViewPastExams;
