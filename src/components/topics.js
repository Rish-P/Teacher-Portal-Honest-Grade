import TextField from '@mui/material/TextField';
import React, { useState, useEffect } from 'react';
import { Button, Box, ListItemButton } from '@mui/material';
import axios from 'axios';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { RotatingLines } from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';

const Teacher = () => {
	const [topics, setTopics] = useState('');
	const [fetchedTopics, setFetchedTopics] = useState([]);
	const [loaded, setLoaded] = useState(false);
	let history = useHistory();
	const onTextChange = (e) => setTopics(e.target.value);
	const handleSubmit = () => {
		axios
			.post('https://honestgrade.herokuapp.com/topic/add', {
				topicName: topics,
			})
			.then((res) => {
				console.log(res.data);
				setTopics('');
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		axios
			.post('https://honestgrade.herokuapp.com/topic/gettopics')
			.then((res) => {
				const temp = res.data.data;
				console.log(res.data);
				setLoaded(true);
				setFetchedTopics(temp);
			})
			.catch((err) => console.log(err));
	}, []);
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
			<h2>Add Topics</h2>

			<TextField
				onChange={onTextChange}
				value={topics}
				label={'Topics'} //optional
				style={{ marginBottom: '3%' }}
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
			<h2>View Topics</h2>
			<List style={cardStyle}>
				{loaded ? (
					fetchedTopics.map((c, i) => (
						<div>
							<ListItem disablePadding>
								<ListItemButton
									onClick={() =>
										history.push('/question/view')
									}
								>
									<ListItemText primary={c.name} />
								</ListItemButton>
							</ListItem>
							{i + 1 < fetchedTopics.length ? <Divider /> : null}
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
				)}
			</List>
		</Box>
	);
};

export default Teacher;
