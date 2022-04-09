import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
	const active = {
		color: 'lightblue',
		fontWeight: 'bold',
	};
	const linkStyle = {
		fontFamily: 'Noto Serif Display',
		color: 'white',
		textDecoration: 'none',
		fontSize: '20px',
	};
	const header = {
		display: 'flex',
		justifyContent: 'space-evenly',
		listStyle: 'none',
		textDecoration: 'none',
		backgroundColor: 'black',
		paddingTop: '1%',
		paddingBottom: '1%',
		fontSize: '16px',
	};
	return (
		<div style={header}>
			<NavLink exact to='/' style={linkStyle} activeStyle={active}>
				Home
			</NavLink>
			<NavLink to='/teacher' style={linkStyle} activeStyle={active}>
				Teacher
			</NavLink>
			<NavLink to='/question' style={linkStyle} activeStyle={active}>
				Question
			</NavLink>
			<NavLink to='/class' style={linkStyle} activeStyle={active}>
				Class
			</NavLink>
			<NavLink to='/exam' style={linkStyle} activeStyle={active}>
				Exam
			</NavLink>
			<NavLink to='/student' style={linkStyle} activeStyle={active}>
				Student
			</NavLink>
			<NavLink to='/topics' style={linkStyle} activeStyle={active}>
				Topics
			</NavLink>
		</div>
	);
};

export default Header;
