import React from "react";

import classes from './Navigation.module.css';

const Navigation = (props) => {
    return (
        <nav className={classes.nav}>
            {props.isLoggedIn && (
                <li>
                    <a href="/">Users</a>
                </li>
            )}
            {props.isLoggedIn && (
                <li>
                    <a href="/">Admin</a>
                </li>
            )}
            {props.isLoggedIn && (
                <li>
                    <button onClick={props.onLogout}>Logout</button>
                </li>
            )}
        </nav>
    )
}
export default Navigation;