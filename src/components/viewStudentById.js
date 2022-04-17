import React, { useState, useEffect } from 'react';
import { Box, ListItemButton } from '@mui/material';
import axios from 'axios';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

const ViewStudentById = (props) => {
	const [students, setStudents] = useState([]);
	const [exams, setExams] = useState([]);
	const [loadedExams, setLoadedExams] = useState(false);
	let { id } = useParams();
	let [classID, studentID] = id.split('&');
	let history = useHistory();

	useEffect(() => {
		//get topics from request
		axios
			.post('https://honestgrade.herokuapp.com/student/getForClass', {
				classID: classID,
			})
			.then((res) => {
				let temp = res.data.students;
				console.log(res.data);
				if (res.data.success === 1) {
					temp = temp.filter((student) => student._id === studentID);
					setStudents(temp[0]);
					console.log(temp[0]);
				} else {
					setStudents(undefined);
				}
			})
			.catch((err) => console.log(err));
		axios
			.post(
				'https://honestgrade.herokuapp.com/assessment/getAssessmentsByStudentAndClassID',
				{
					classID: classID,
					studentID: studentID,
				}
			)
			.then((res) => {
				const temp = res.data.assessment;
				console.log(res.data);
				if (res.data.success === 1) {
					setLoadedExams(true);
					if (temp.length !== 0) setExams(temp);
					else setExams(undefined);
					console.log(temp);
				} else {
					setExams(undefined);
				}
			})
			.catch((err) => console.log(err));
	}, []);

	let clickExam = (val) => {
		let link = '/assessment/view/' + val;
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
			<h2>Student Details</h2>
			<Box style={cardStyle}>
				<h3>Name: {students.name}</h3>
				<h3>No. of Classes: {students.class?.length}</h3>
				<h3>User ID: {students.userID}</h3>
			</Box>
			<h2>Exams</h2>
			<List style={cardStyle}>
				{exams !== undefined ? (
					loadedExams ? (
						exams.map((c, i) => (
							<div>
								<ListItem disablePadding>
									<ListItemButton
										onClick={() => clickExam(c._id)}
									>
										<ListItemText
											primary={c.exam[0]?.name}
										/>
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
					)
				) : (
					<h3
						style={{ fontFamily: 'Avenir Next', marginLeft: '11%' }}
					>
						There are no exams taken by this student.
					</h3>
				)}
			</List>
		</Box>
	);
};

export default ViewStudentById;
