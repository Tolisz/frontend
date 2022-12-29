// react
import React from "react";
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// microsoft
import { AuthenticatedTemplate, UnauthenticatedTemplate, MsalProvider, useMsal } from "@azure/msal-react";
import { loginRequest, protectedResources } from "./authConfig";
import useFetchWithMsal from './hooks/useFetchWithMsal';

// my components
import Header from "./components/Header";
import Home from "./components/Home"
import MyAccount from "./components/MyAccount";
import Form from "./components/Form";

const Pages = () => {
    const { instance } = useMsal();
    
    let activeAccount;
    if (instance) {
        activeAccount = instance.getActiveAccount();
    }
    
    // Log (in/out) Button poprover
    // const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    const [data, setData] = useState(null)

    const { error, execute } = useFetchWithMsal({
        scopes: protectedResources.apiLoanComparer.scopes.read,
    });
    
    const buttonClick = () => {
        console.log('Button');

        execute("GET", "https://bank-project-backend-dev.azurewebsites.net/WeatherForecast")
        .then((response) => {
            setData(response)
            console.log('setData')
        })

        if (error) {
            return <div>Error: {error.message}</div>;
        }
    }

    return (
        <div className="container">
            <Header instance={instance}/>
            
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/myaccount' element={<MyAccount/>}/>
                <Route path='/form' element={<Form/>}/>
            </Routes>

            <UnauthenticatedTemplate>
            <div className="App">
                <header className="App-header">
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <button onClick={() => instance.loginRedirect(loginRequest)}>
                        Login
                    </button>
                </header>
            </div>
            </UnauthenticatedTemplate>

            <AuthenticatedTemplate>
                <div className="App">
                    <header className="App-header">

                        <p>
                            Hello {activeAccount && activeAccount.username ? activeAccount.username : 'Unknown'}!
                        </p>

                        <button onClick={() => instance.logoutRedirect({ postLogoutRedirectUri: "/" })}>
                            { activeAccount && activeAccount.username ? activeAccount.username : 'Unknown' }
                        </button>

                        <button onClick={buttonClick}>
                            Cześć
                        </button>
                    </header>
                </div>
            </AuthenticatedTemplate>
        </div>
    );
}


const App = ({ instance }) => {

    return (
        <MsalProvider instance={instance}>
            <BrowserRouter>
                <Pages/>
            </BrowserRouter>
        </MsalProvider>
    );
}

export default App;