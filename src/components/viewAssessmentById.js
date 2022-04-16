import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router';
import Select from 'react-select';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';

const ViewAssessmentById = (props) => {
	const [assessment, setAssessment] = useState({});
	const [filter, setFilter] = useState([{}]);
	const [loaded, setLoaded] = useState(false);
	let { id } = useParams();
	const changeFilter = (e) => {
		setFilter(e);
	};
	useEffect(() => {
		//get topics from request
		axios
			.post(
				'https://honestgrade.herokuapp.com/assessment/getAssessmentById',
				{
					assessmentID: id,
				}
			)
			.then((res) => {
				let temp = res.data.assessment;
				console.log(temp);
				if (res.data.success === 1) {
					setAssessment(temp[0]);
					setLoaded(true);
					console.log(temp[0]);
				}
			})
			.catch((err) => console.log(err));
	}, []);
	function getViolationType(type) {
		if (type === 0) {
			return 'Tab Switching';
		} else if (type === 1) {
			return 'Proctoring';
		} else {
			return 'Sound Heard';
		}
	}
	const data = [
		{
			name: 'Sound Heard',
			Count: 0,
		},
		{
			name: 'Proctoring',
			Count: 0,
		},
		{
			name: 'Tab Switching',
			Count: 0,
		},
	];
	let optionsObj = ['Tab Switching', 'Proctoring', 'Sound Heard', 'All'].map(
		(el, i) => {
			return { value: i, label: el };
		}
	);
	const boxStyles = {
		display: 'flex',
		flexDirection: 'column',
		width: '75%',
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
	let violationCount = {};
	assessment.violations?.forEach((v) => {
		if (v.violationType in violationCount)
			violationCount[v.violationType]++;
		else violationCount[v.violationType] = 1;
	});
	data[0].Count = violationCount[2];
	data[1].Count = violationCount[1];
	data[2].Count = violationCount[0];
	return (
		<Box>
			<Box style={boxStyles}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<div style={cardStyle}>
						<h2>Assessment Details</h2>
						<h3>
							Name: {loaded ? assessment.student[0].name : ''}
						</h3>
						<h3>Score: {assessment.score}</h3>
						<h3>Total Marks:{assessment.totalMarks}</h3>
					</div>
					<BarChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}
					>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='name' />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey='Count' fill='black' />
					</BarChart>
				</div>
			</Box>
			<Box style={boxStyles}>
				<h2>Violation Details</h2>
				Filter:
				<div style={{ marginBottom: '1%' }}>
					<Select
						name='form-field-name'
						value={filter}
						onChange={changeFilter}
						searchable={false}
						options={optionsObj}
					/>
				</div>
				{filter.value === 3
					? assessment.violations //82ca9d
						? assessment.violations.map((v) => (
								<div>
									<span style={{ fontWeight: 'bold' }}>
										Violation Type:{'  '}
									</span>
									{getViolationType(v.violationType)} <br />
									<span style={{ fontWeight: 'bold' }}>
										Notes:{'  '}
									</span>{' '}
									{v.notes} <br />
									<span style={{ fontWeight: 'bold' }}>
										Violation Time:{'  '}
									</span>{' '}
									{v.createdAt}
									<hr />
								</div>
						  ))
						: ''
					: assessment.violations
					? assessment.violations.map((v) =>
							v.violationType === filter.value ? (
								<div>
									<span style={{ fontWeight: 'bold' }}>
										Violation Type:{'  '}
									</span>
									{getViolationType(v.violationType)} <br />
									<span style={{ fontWeight: 'bold' }}>
										Notes:{'  '}
									</span>
									{v.notes} <br />
									<span style={{ fontWeight: 'bold' }}>
										Violation Time:{'  '}
									</span>{' '}
									{v.createdAt}
									<hr />
								</div>
							) : (
								''
							)
					  )
					: ''}
			</Box>
		</Box>
	);
};

export default ViewAssessmentById;
