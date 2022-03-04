import React from "react";
import {Route} from "react-router-dom";
import App from "../components/app";
import Header from "../header";
import Teacher from '../components/teacher'
import Question from '../components/question'
import Exam from '../components/exam'
import Student from '../components/student'
import Class from '../components/class'
import Topics from '../components/topics'
import Login from '../components/login'
import SubjectiveQuestion from '../components/subjectiveQuestion'
import ViewQuestions from '../components/viewQuestions'
const ReactRouter = () => {
    return (
        <React.Fragment>
            <Header/>
            <Route exact path="/" component={App}/>
            <Route path="/teacher" component={Teacher}/>
            <Route exact path="/question" component={Question}/>
            <Route exact path="/question/subjective" component={SubjectiveQuestion} />
            <Route exact path="/question/view" component={ViewQuestions} />
            <Route path="/exam" component={Exam}/>
            <Route path="/student" component={Student}/>
            <Route path="/class" component={Class}/>
            <Route path="/topics" component={Topics}/>
            <Route path="/login" component={Login}/>
        </React.Fragment>
    );
}

export default ReactRouter;
