import React, { useState, useEffect } from 'react';
import { Box, ListItemButton } from '@mui/material';
import axios from 'axios';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

const ViewClasses = (props) => {
	const [students, setStudents] = useState([]);
	const [exams, setExams] = useState([]);
	const [loadedStudents, setLoadedStudents] = useState(false);
	const [loadedExams, setLoadedExams] = useState(false);
	let { id } = useParams();
	let history = useHistory();
	useEffect(() => {
		//get topics from request
		axios
			.post('https://honestgrade.herokuapp.com/student/getForClass', {
				classID: id,
			})
			.then((res) => {
				const temp = res.data.students;
				console.log(res.data);
				if (res.data.success === 1) {
					setLoadedStudents(true);
					setStudents(temp);
					console.log(temp);
				}
			})
			.catch((err) => console.log(err));
		axios
			.post('https://honestgrade.herokuapp.com/exam/getExamsForClass', {
				classId: id,
			})
			.then((res) => {
				const temp = res.data.exams;
				console.log(res.data);
				if (res.data.success === 1) {
					setLoadedExams(true);
					setExams(temp);
					console.log(temp);
				}
			})
			.catch((err) => console.log(err));
	}, []);
	let clickExam = (val) => {
		let link = '/exam/view/' + val;
		history.push(link);
	};
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
			<h2>Students</h2>
			<List style={cardStyle}>
				{loadedStudents ? (
					students.map((c, i) => (
						<div>
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemText primary={c.name} />
								</ListItemButton>
							</ListItem>
							{i + 1 < students.length ? <Divider /> : null}
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
			<h2>Exams</h2>
			<List style={cardStyle}>
				{loadedExams ? (
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
							type='Circles'
							color='black'
							height='50'
							timeout={10000}
						/>
					</div>
				)}
			</List>
		</Box>
	);
};

export default ViewClasses;
