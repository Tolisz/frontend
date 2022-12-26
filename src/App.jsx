import React from "react";
import { useEffect, useState } from 'react';

import { AuthenticatedTemplate, UnauthenticatedTemplate, MsalProvider, useMsal } from "@azure/msal-react";
import { loginRequest, protectedResources } from "./authConfig";

import useFetchWithMsal from './hooks/useFetchWithMsal';


const Pages = () => {

    const { instance } = useMsal();
    
    let activeAccount;
    if (instance) {
        activeAccount = instance.getActiveAccount();
    }

    
    const [data, setData] = useState(null)

    const { error, execute } = useFetchWithMsal({
        scopes: protectedResources.apiLoanComparer.scopes.read,
    });

    useEffect(() => {
        console.log('useEffect')
        execute("GET", "https://bank-project-backend-dev.azurewebsites.net/WeatherForecast")
        .then((response) => {
            setData(response)
            console.log('setData')
        })
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    
    
    // useEffect(() => {
    //     console.log('dzien dobry')

    //     const getDataFromServer = async () => {
    //         const DataFromServer = await exampleData()
    //         setData(DataFromServer)
    //         console.log('Skonczylem')
    //     }

    //     getDataFromServer()
    // }, [])

    // const exampleData = async () => {
    //     // const res = await fetch(protectedResources.apiLoanComparer.endpoint)
    //     const res = await fetch('https://bank-project-backend-dev.azurewebsites.net/WeatherForecast', { mode: 'no-cors'})
    //     const wynik = await res

    //     return JSON.stringify(wynik)
    // } 

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
        <>
        <div>
             This is a Home page.
        </div>
        
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
        </>
    );
}


const App = ({ instance }) => {


    return (
        <MsalProvider instance={instance}>
            <Pages/>
        </MsalProvider>
    );
}

export default App;