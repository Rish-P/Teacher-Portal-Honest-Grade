import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => { 
  const active = {
    fontWeight: "bold",
    color: "red"
  };
  const header = {
    display: "flex",
    justifyContent: "space-evenly",
    listStyle: "none",
    textDecoration:'none',
    backgroundColor:"lightgreen",
    paddingTop: '1%',
    paddingBottom: '1%',
  };
    return (
      <div style={header}>
        <NavLink exact to="/" activeStyle={active}>
          Teacher Portal
        </NavLink>
        <NavLink to="/teacher" activeStyle={active}>
          Teacher
        </NavLink>
        <NavLink to="/question" activeStyle={active}>
          Question
        </NavLink>
        <NavLink to="/class" activeStyle={active}>
          Class
        </NavLink>
        <NavLink to="/exam" activeStyle={active}>
          Exam
        </NavLink>
        <NavLink to="/student" activeStyle={active}>
          Student
        </NavLink>
        <NavLink to="/topics" activeStyle={active}>
          Topics
        </NavLink>
      </div>
    );
}

export default Header;