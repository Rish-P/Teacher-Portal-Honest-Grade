import React, { useState, useEffect } from 'react';
import { Box, ListItemButton, Typography, Modal } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { RotatingLines } from 'react-loader-spinner';

const ViewExamById = (props) => {
	const [examData, setExamData] = useState({});
	const [assessmentData, setAssessmentData] = useState([]);
	const [loadedAssessment, setLoadedAssessment] = useState(false);
	const [open, setOpen] = useState(false);
	const [modalData, setModalData] = useState([]);
	const handleOpen = (question, options, answer) => {
		setOpen(true);
		setModalData([question, options, answer]);
	};
	const handleClose = () => setOpen(false);
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
					if (temp2.length !== 0) setAssessmentData(temp2);
					else setAssessmentData(undefined);
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
	const modalStyle = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '600px',
		backgroundColor: 'background.paper',
		border: '1px solid #000',
		borderRadius: '15px',
		boxShadow: '24px',
		padding: '4px',
	};
	return (
		<Box style={boxStyles}>
			{examData !== undefined ? (
				<Box>
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
								{examData.scheduleDate?.split('T')[0]}
							</span>
						</h3>
						<h3>
							Expiry Date:{' '}
							<span style={{ fontFamily: 'Raleway' }}>
								{examData.expiryDate?.split('T')[0]}
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
						{assessmentData !== undefined ? (
							loadedAssessment ? (
								assessmentData.map((a, i) => (
									<div>
										<ListItem disablePadding>
											<ListItemButton
												onClick={() =>
													clickAssessment(a._id)
												}
											>
												<ListItemText
													primary={`${i + 1}. ${
														a.student.name
													} |
                                            ${
												a.violationCount
													? `Number of Violations: ${a.violationCount}`
													: 0
											} | 
                                            Score: ${a.score}`}
												/>
											</ListItemButton>
										</ListItem>
										{i + 1 < a.student.length ? (
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
							)
						) : (
							<h3
								style={{
									fontFamily: 'Avenir Next',
									marginLeft: '2%',
								}}
							>
								There are no turn ins yet.
							</h3>
						)}
					</List>
					<h2>Questions</h2>
					<List style={cardStyle}>
						{examData && examData.questions ? (
							examData.questions.map((q, i) => (
								<div>
									<ListItem disablePadding>
										<ListItemButton
											onClick={() =>
												handleOpen(
													q.question,
													q.options,
													q.answer
												)
											}
										>
											<ListItemText
												primary={`${i + 1}. ${
													q.question
												}`}
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
					<Modal open={open} onClose={handleClose}>
						<Box sx={modalStyle}>
							<Typography
								id='modal-modal-title'
								variant='h6'
								component='h2'
								style={{
									fontFamily: 'Noto Serif Display',
									marginLeft: '1%',
									marginBottom: '4%',
								}}
							>
								{modalData[0]}
							</Typography>
							<Typography
								id='modal-modal-description'
								sx={{ mt: 2 }}
								style={{
									fontFamily: 'Avenir Next',
									marginLeft: '1%',
								}}
							>
								Options: {modalData[1]?.join(', ')}
								<br />
								<div
									style={{
										marginTop: '4%',
										marginBottom: '2%',
									}}
								>
									Answer: {modalData[2]}
								</div>
							</Typography>
						</Box>
					</Modal>
				</Box>
			) : (
				<div>
					<h2>Exam Details</h2>
					<h3
						style={{
							...cardStyle,
							fontFamily: 'Avenir Next',
						}}
					>
						<span style={{ marginLeft: '28%' }}>
							This exam no longer exists. Please check again.
						</span>
					</h3>
				</div>
			)}
		</Box>
	);
};

export default ViewExamById;
