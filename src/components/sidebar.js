import React, { useState } from 'react';
import {
	ProSidebar,
	Menu,
	MenuItem,
	SidebarHeader,
	SidebarFooter,
	SidebarContent,
} from 'react-pro-sidebar';

import { FaQuestion, FaChalkboardTeacher } from 'react-icons/fa';
import { FiHome, FiLogOut } from 'react-icons/fi';
import { BiChalkboard } from 'react-icons/bi';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { ImBooks } from 'react-icons/im';
import { MdAddCircleOutline } from 'react-icons/md';
import { BsFillFilePersonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import 'react-pro-sidebar/dist/css/styles.css';
import '../sidebar.css';

const Header = () => {
	const [activeItem, setActiveItem] = useState('/');
	const activeItemClick = () => {
		setActiveItem(window.location.pathname);
		console.log(activeItem);
	};
	const logoutItemClick = () => {
		localStorage.removeItem('teacher_details');
	};

	return (
		<>
			<div id='header'>
				<ProSidebar>
					<SidebarHeader></SidebarHeader>
					<SidebarContent>
						<Menu iconShape='circle'>
							<MenuItem
								active={'/' === activeItem}
								icon={<FiHome />}
								onClick={activeItemClick}
							>
								Home
								<Link exact to='/' />
							</MenuItem>
							<MenuItem
								active={'/teacher' === activeItem}
								onClick={activeItemClick}
								icon={<BiChalkboard />}
							>
								Teachers
								<Link to='/teacher' />
							</MenuItem>

							<MenuItem
								icon={<MdAddCircleOutline />}
								active={'/question' === activeItem}
								onClick={activeItemClick}
							>
								Add Questions
								<Link to='/question' />
							</MenuItem>
							<MenuItem
								icon={<FaQuestion />}
								active={'/question/view' === activeItem}
								onClick={activeItemClick}
							>
								View Questions
								<Link to='/question/view' />
							</MenuItem>
							<MenuItem
								icon={<FaChalkboardTeacher />}
								active={'/class' === activeItem}
								onClick={activeItemClick}
							>
								Classes
								<Link to='/class' />
							</MenuItem>
							<MenuItem
								icon={<HiOutlineBookOpen />}
								active={'/exam' === activeItem}
								onClick={activeItemClick}
							>
								Exams
								<Link to='/exam' />
							</MenuItem>
							<MenuItem
								icon={<BsFillFilePersonFill />}
								active={'/student' === activeItem}
								onClick={activeItemClick}
							>
								Students
								<Link to='/student' />
							</MenuItem>
							<MenuItem
								icon={<ImBooks />}
								active={'/topics' === activeItem}
								onClick={activeItemClick}
							>
								Topics
								<Link to='/topics' />
							</MenuItem>
						</Menu>
					</SidebarContent>
					<SidebarFooter>
						<Menu iconShape='square'>
							<MenuItem icon={<FiLogOut />} onClick={logoutItemClick}>Logout</MenuItem>
						</Menu>
					</SidebarFooter>
				</ProSidebar>
			</div>
		</>
	);
};

export default Header;
