import React from "react";

const Notification = props => {
    return (<div>
        <h2>{props.heading}</h2>
        <ul>
            {props.notifications.map(notification => <li>{notification}</li>)}
        </ul>
    </div>)
    };

export default Notification;