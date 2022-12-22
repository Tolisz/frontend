import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import ErrorPage from './ErrorPage';
import LogInButton from './LogInButton'

import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";
import { MsalProvider} from "@azure/msal-react";

export const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
   
    <MsalProvider instance={msalInstance}>
        <Home />
    </MsalProvider>

   {/* <BrowserRouter>
      <LogInButton/>
      
      <Routes>
        <Route 
            path="/"
            element={ <MsalProvider instance={msalInstance}>
                          <Home />
                      </MsalProvider>}>

        </Route>
        <Route
            path="/error"
            element={<ErrorPage/>}  >

        </Route>
      </Routes>
   </BrowserRouter> */}

    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
