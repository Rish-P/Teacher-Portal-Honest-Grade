import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    let teacherDetails = localStorage.getItem("teacher_details");
    return (
        <Route {...rest} render={props => (
            teacherDetails ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;
