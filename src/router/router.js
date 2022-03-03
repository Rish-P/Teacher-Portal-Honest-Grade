import React from "react";
import { Route } from "react-router-dom";
import App from "../components/app";
import Header from "../header";
import Teacher from '../components/teacher'
import Question from '../components/question'
import Exam from '../components/exam'
import Student from '../components/student'
import Class from '../components/class'
import Topics from '../components/topics'

const ReactRouter = () => {
    return (
      <React.Fragment>
        <Header />
        <Route exact path="/" component={App} />
        <Route  path="/teacher" component={Teacher} />
        <Route  path="/question" component={Question} />
        <Route  path="/exam" component={Exam} />
        <Route  path="/student" component={Student} />
        <Route  path="/class" component={Class} />
        <Route  path="/topics" component={Topics} />
      </React.Fragment>
    );
  }

export default ReactRouter;