import React, { useState } from "react";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";

import classes from './Login.module.css';


const Login = (props) => {

    const [enteredEmail, setEnteredEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState();
    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();

        props.onLogin(enteredEmail, enteredPassword);

    }

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
        setFormIsValid(
            event.target.value.includes('@') && enteredPassword.trim().length > 6
          );
    }

    const validateEmailHandler = () => {
        setEmailIsValid(enteredEmail.includes('@'));
    }

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
        setFormIsValid(
            event.target.value.trim().length > 6 && enteredEmail.includes('@')
          );
    }

    const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 6)
    }

    return (
        <Card className={classes.login} >
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={enteredEmail}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={enteredPassword}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn} >
                        Login
                    </Button>
                </div>
            </form>

        </Card>
    )

}

export default Login;