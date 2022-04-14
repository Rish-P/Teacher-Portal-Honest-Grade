import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import TextField from '@mui/material/TextField';

function Login(props) {
	const [state, setState] = useState({
		email: '',
		password: '',
		successMessage: null,
	});
	const handleChange = (e) => {
		const { id, value } = e.target;
		setState((prevState) => ({
			...prevState,
			[id]: value,
		}));
	};

	const handleSubmitClick = (e) => {
		e.preventDefault();
		const payload = {
			userID: state.email,
			password: state.password,
		};
		axios
			.post('https://honestgrade.herokuapp.com/teacher/login', payload)
			.then(function (response) {
				if (response.data.success === 1) {
					setState((prevState) => ({
						...prevState,
						successMessage:
							'Login successful. Redirecting to home page..',
					}));
					localStorage.setItem(
						'teacher_details',
						JSON.stringify(response.data.teacher)
					);
					redirectToHome();
				} else if (response.data.success === -10) {
					alert('Username and password do not match');
				} else {
					alert('Some error occurred');
				}
			})
			.catch(function (error) {
				console.log(error);
				alert('Some error occurred');
			});
	};
	const redirectToHome = () => {
		props.history.push('/');
	};
	const boxStyles = {
		display: 'flex',
		flexDirection: 'column',
		fontFamily: 'Noto Serif Display',
		width: '50%',
		margin: '1%',
		marginLeft: '26%',
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
		marginLeft: '30%',
		marginTop: '10%',
	};
	return (
		<div style={cardStyle}>
			<h1 style={{ textAlign: 'center' }}>Login</h1>
			<form>
				<div style={boxStyles}>
					<label htmlFor='exampleInputEmail1'>Username</label>
					<TextField
						type='email'
						id='email'
						placeholder='Enter Username'
						value={state.email}
						onChange={handleChange}
						style={{ marginBottom: '2%' }}
					/>
				</div>
				<div style={boxStyles}>
					<label htmlFor='exampleInputPassword1'>Password</label>
					<TextField
						type='password'
						id='password'
						placeholder='Password'
						value={state.password}
						onChange={handleChange}
						style={{ marginBottom: '20%' }}
					/>
				</div>

				<button
					type='submit'
					onClick={handleSubmitClick}
					style={{
						backgroundColor: 'black',
						color: 'white',
						fontFamily: 'inherit',
						fontSize: '18px',
						width: '40%',
						marginLeft: '30%',
						fontWeight: 'bold',
						borderRadius: '6px',
					}}
				>
					Submit
				</button>
			</form>
			{/* <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div> */}
		</div>
	);
}

export default withRouter(Login);
