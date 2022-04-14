import React, {useState} from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";

function Login(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload={
            "userID":state.email,
            "password":state.password,
        }
        axios.post("https://honestgrade.herokuapp.com/teacher/login", payload)
            .then(function (response) {
                if(response.data.success === 1){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Login successful. Redirecting to home page..'
                    }))
                    localStorage.setItem("teacher_details",JSON.stringify(response.data.teacher));
                    redirectToHome();

                }
                else if(response.data.success === -10){
                    alert("Username and password do not match");
                }
                else{

                    alert("Some error occurred");
                }
            })
            .catch(function (error) {
                console.log(error);
                alert("Some error occurred");

            });
    }
    const redirectToHome = () => {
        props.history.push('/');
    }
    return(
        <div style={{marginLeft: '200' }}>
            <h1>Login</h1>
            <form>
                <div >
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input type="email"
                           id="email"
                           placeholder="Enter Username"
                           value={state.email}
                           onChange={handleChange}
                    />
                </div>
                <div >
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                           id="password"
                           placeholder="Password"
                           value={state.password}
                           onChange={handleChange}
                    />
                </div>
                
                <button
                    type="submit"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            {/* <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div> */}
        </div>
    )
}

export default withRouter(Login);
