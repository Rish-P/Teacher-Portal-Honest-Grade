import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdOutlineAccountCircle } from 'react-icons/md';

const Header = () => {
	const teacher_details = JSON.parse(localStorage.getItem('teacher_details'));

	const active = {
		color: 'lightblue',
		fontWeight: 'bold',
	};
	const linkStyle = {
		fontFamily: 'Noto Serif Display',
		color: 'white',
		textDecoration: 'none',
		fontSize: '24px',
	};
	const header = {
		position: '-webkit-sticky',
		position: 'sticky',
		top: '0px',
		zIndex: '9999',
		display: 'flex',
		justifyContent: 'space-between',
		paddingLeft: '3%',
		paddingRight: '3%',
		listStyle: 'none',
		textDecoration: 'none',
		backgroundColor: 'black',
		paddingTop: '0.8%',
		paddingBottom: '0.8%',
		fontSize: '16px',
	};
	return teacher_details !== null ? (
		<div style={header}>
			<NavLink exact to='/' style={linkStyle}>
				Honest Grade.
			</NavLink>
			{/* <NavLink to='/teacher' style={linkStyle} activeStyle={active}>
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
			</NavLink> */}
			<NavLink to='/account' style={linkStyle} activeStyle={active}>
				<MdOutlineAccountCircle style={{ fontSize: '26px' }} />
			</NavLink>
		</div>
	) : (
		<div style={{ ...header, justifyContent: 'center' }}>
			<NavLink exact to='/' style={linkStyle}>
				Honest Grade.
			</NavLink>
		</div>
	);
};

export default Header;
