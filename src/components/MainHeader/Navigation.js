import React from "react";

import classes from './Navigation.module.css';

const Navigation = () => {
    return (
        <nav className={classes.nav}>
            <ul >
                <li>
                    <a>User</a>
                </li>
                <li>
                    <a>Admin</a>
                </li>
                <li>
                    <button>LogOut</button>
                </li>
            </ul>
        </nav>
    )
}
export default Navigation;