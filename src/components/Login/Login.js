import React, { useEffect, useReducer, useRef, useState } from "react";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";

import classes from './Login.module.css';


const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: action.val.includes('@') };
    }
    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.includes('@') };
    }
    return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: action.val.trim().length > 6 }
    }

    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.trim().length > 6 }
    }
    return { value: '', isValid: false };
}

const Login = (props) => {

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: null,
    });

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: '',
        isValid: null
    });

    const [formIsValid, setFormIsValid] = useState(false);

    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid } = passwordState;

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(emailIsValid && passwordIsValid);
        }, 500
        )

        return () => {
            clearTimeout(identifier);
        }

    }, [emailIsValid, passwordIsValid])

    const emailChangeHandler = (event) => {
        dispatchEmail({ type: 'USER_INPUT', val: event.target.value });

        setFormIsValid(
            event.target.value.includes('@') && passwordState.isValid
        );
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: "USER_INPUT", val: event.target.value });

        setFormIsValid(
            event.target.value.includes('@') && passwordState.isValid
        );
    };

    const validateEmailHandler = () => {
        dispatchEmail({ type: 'INPUT_BLUR' });
    };

    const validatePasswordHandler = () => {
        dispatchEmail({ type: 'INPUT_BLUR' });
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (formIsValid) {
            props.onLogin(emailState.value, passwordState.value);
        } else if (!emailIsValid) {
            emailInputRef.current.focus();
        } else {
            passwordInputRef.current.focus();
        }

    };
    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input
                    ref={emailInputRef}
                    id='email'
                    type='email'
                    label='E-Mail'
                    isValid={emailIsValid}
                    value={emailState.value}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                />
                <Input
                    ref={passwordInputRef}
                    id='password'
                    type='password'
                    label='Password'
                    isValid={passwordIsValid}
                    value={passwordState.value}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                />
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    )

}

export default Login;