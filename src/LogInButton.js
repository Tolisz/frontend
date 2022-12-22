import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function ClickHandler() {
    console.log('dupa');
}

class LogInButton extends React.Component
{

    render() {
        return (
        <div>
            <button onClick={ClickHandler}>Log In</button>
        </div>
        );
    }
}

export default LogInButton;