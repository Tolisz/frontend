// react
import React from "react";
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// microsoft
import { AuthenticatedTemplate, UnauthenticatedTemplate, MsalProvider, useMsal } from "@azure/msal-react";
import { EventType } from '@azure/msal-browser';
import { loginRequest, protectedResources, b2cPolicies } from "./authConfig";
import useFetchWithMsal from './hooks/useFetchWithMsal';

// my components
import Header from "./components/Header";
import Home from "./components/Home"
import MyAccount from "./components/MyAccount";
import Form from "./components/Form";
import Offers from "./components/Offers";
import DocumentLoad from "./components/DocumentLoad";
import Success from "./components/Success";
import StatusCheck from "./components/StatusCheck";

const Pages = () => {
    const { instance } = useMsal();

    useEffect(() => {
        const callbackId = instance.addEventCallback((event) => {
            if (
                (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) &&
                event.payload.account
            ) {
                /**
                 * For the purpose of setting an active account for UI update, we want to consider only the auth
                 * response resulting from SUSI flow. "tfp" claim in the id token tells us the policy (NOTE: legacy
                 * policies may use "acr" instead of "tfp"). To learn more about B2C tokens, visit:
                 * https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
                 */
                if (event.payload.idTokenClaims['tfp'] === b2cPolicies.names.editProfile) {
                    // retrieve the account from initial sing-in to the app
                    const originalSignInAccount = instance
                        .getAllAccounts()
                        .find(
                            (account) =>
                                account.idTokenClaims.oid === event.payload.idTokenClaims.oid &&
                                account.idTokenClaims.sub === event.payload.idTokenClaims.sub &&
                                account.idTokenClaims['tfp'] === b2cPolicies.names.signUpSignIn
                        );

                    let signUpSignInFlowRequest = {
                        authority: b2cPolicies.authorities.signUpSignIn.authority,
                        account: originalSignInAccount,
                    };

                    // silently login again with the signUpSignIn policy
                    instance.ssoSilent(signUpSignInFlowRequest);
                }

                /**
                 * Below we are checking if the user is returning from the reset password flow.
                 * If so, we will ask the user to reauthenticate with their new password.
                 * If you do not want this behavior and prefer your users to stay signed in instead,
                 * you can replace the code below with the same pattern used for handling the return from
                 * profile edit flow
                 */
                if (event.payload.idTokenClaims['tfp'] === b2cPolicies.names.forgotPassword) {
                    let signUpSignInFlowRequest = {
                        authority: b2cPolicies.authorities.signUpSignIn.authority,
                        scopes: [
                            ...protectedResources.apiTodoList.scopes.read,
                            ...protectedResources.apiTodoList.scopes.write,
                        ],
                    };
                    instance.loginRedirect(signUpSignInFlowRequest);
                }
            }

            if (event.eventType === EventType.LOGIN_FAILURE) {
                // Check for forgot password error
                // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
                if (event.error && event.error.errorMessage.includes('AADB2C90118')) {
                    const resetPasswordRequest = {
                        authority: b2cPolicies.authorities.forgotPassword.authority,
                        scopes: [],
                    };
                    instance.loginRedirect(resetPasswordRequest);
                }
            }
        });

        return () => {
            if (callbackId) {
                instance.removeEventCallback(callbackId);
            }
        };
        // eslint-disable-next-line
    }, [instance]);
















    const [requestID, setRequestID] = useState(NaN);

    let activeAccount;
    if (instance) {
        activeAccount = instance.getActiveAccount();
    }

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
            console.log(response)
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
                <Route path='/form' element={<Form error={error}  execute={execute} setRequestID={setRequestID}/>}  />
                <Route path='/offers' element={<Offers error={error} execute={execute} requestID={requestID}/>} />
                <Route path='/loadDocuments' element={<DocumentLoad error={error} execute={execute} requestID={requestID}/>} />
                <Route path='/success' element={<Success/>} />
                <Route path='/statusCheck' element={<StatusCheck error={error} execute={execute}/>} />
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