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
import ViewClasses from '../components/viewClasses';
import ViewClassById from '../components/viewClassById'
import ViewExamById from '../components/viewExamById'
import PrivateRoute from "../utils/PrivateRoute";
import ViewAssessmentById from '../components/viewAssessmentById'

const ReactRouter = () => {
    return (
        <React.Fragment>
            <Header/>
            <PrivateRoute exact path="/" component={App}/>
            <PrivateRoute path="/teacher" component={Teacher}/>
            <PrivateRoute exact path="/question" component={Question}/>
            <PrivateRoute exact path="/question/subjective" component={SubjectiveQuestion}/>
            <PrivateRoute exact path="/question/view" component={ViewQuestions}/>
            <PrivateRoute exact path="/exam" component={Exam}/>
            <PrivateRoute exact path='/exam/view/:id' component={ViewExamById}/>
            <PrivateRoute path="/student" component={Student}/>
            <PrivateRoute exact path="/class" component={Class}/>
            <PrivateRoute exact path="/class/view" component={ViewClasses}/>
            <PrivateRoute exact path="/class/view/:id" component={ViewClassById}/>
            <PrivateRoute path="/topics" component={Topics}/>
            <PrivateRoute path='/assessment/view/:id' component={ViewAssessmentById}/>
            <Route path="/login" component={Login}/>
        </React.Fragment>
    );
}

export default ReactRouter;
