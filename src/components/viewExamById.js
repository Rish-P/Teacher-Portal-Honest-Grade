import React, { useState, useEffect } from 'react';
import { Box, ListItemButton } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { RotatingLines } from 'react-loader-spinner';

const ViewExamById = (props) => {
	const [examData, setExamData] = useState({});
	const [assessmentData, setAssessmentData] = useState([]);
	const [loadedAssessment, setLoadedAssessment] = useState(false);
	let { id } = useParams();
	let history = useHistory();
	useEffect(() => {
		axios
			.post('https://honestgrade.herokuapp.com/exam/getExamData', {
				examID: id,
			})
			.then((res) => {
				const temp = res.data.exam;
				const temp2 = res.data.assessments;
				console.log(temp);
				console.log(temp2);
				if (res.data.success === 1) {
					setLoadedAssessment(true);
					setExamData(temp[0]);
					setAssessmentData(temp2);
				}
			})
			.catch((err) => console.log(err));
	}, []);
	let clickAssessment = (val) => {
		let link = '/assessment/view/' + val;
		history.push(link);
	};
	const boxStyles = {
		display: 'flex',
		flexDirection: 'column',
		width: '75%',
		margin: '3%',
		marginLeft: '20%',
	};
	const cardStyle = {
		width: '75vw',
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
			<h2>Exam Details</h2>
			<div style={cardStyle}>
				<h3>
					Exam Name:{' '}
					<span style={{ fontFamily: 'Raleway' }}>
						{examData.name}
					</span>
				</h3>
				<h3>
					Scheduled Date:{' '}
					<span style={{ fontFamily: 'Raleway' }}>
						{examData.scheduleDate}
					</span>
				</h3>
				<h3>
					Expiry Date:{' '}
					<span style={{ fontFamily: 'Raleway' }}>
						{examData.expiryDate}
					</span>
				</h3>
				<h3>
					Turn Ins:{' '}
					<span style={{ fontFamily: 'Raleway' }}>
						{assessmentData.length}
					</span>
				</h3>
			</div>

			<h2>Assessment Details</h2>
			<List style={cardStyle}>
				{loadedAssessment ? (
					assessmentData.map((a, i) => (
						<div>
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemText
										primary={`${a.student.name} |
                                            ${
												a.violationCount
													? `Number of Violations: ${a.violationCount}`
													: 0
											} | 
                                            Score: ${a.score}`}
										onClick={() => clickAssessment(a._id)}
									/>
								</ListItemButton>
							</ListItem>
							{i + 1 < a.student.length ? <Divider /> : null}
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
			<h2>Questions</h2>
			<List style={cardStyle}>
				{examData && examData.questions ? (
					examData.questions.map((q, i) => (
						<div>
							<ListItem disablePadding>
								<ListItemButton>
									<ListItemText
										primary={`${i}. ${q.question}`}
									/>
								</ListItemButton>
							</ListItem>
							{i + 1 < examData.questions.length ? (
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
		</Box>
	);
};

export default ViewExamById;
