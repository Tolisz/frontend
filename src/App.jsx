// react
import React from "react";
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// microsoft
import { MsalProvider } from "@azure/msal-react";

// my components
import Header from "./components/Header";
import Home from "./components/Home"
import MyAccount from "./components/MyAccount";
import Form from "./components/Form";
import Offers from "./components/Offers";
import DocumentLoad from "./components/DocumentLoad";
import Success from "./components/Success";
import StatusCheck from "./components/StatusCheck";
import MyOffers from "./components/MyOffers";
import FinalComfirmation from "./components/FinalComfirmation";

const Pages = () => {

    const [requestID, setRequestID] = useState(NaN);

    return (
        <div className="container">
            <Header />
            
            <Routes>
                <Route path='/' element={<Home setRequestID={setRequestID}/>}/>
                <Route path='/myaccount' element={<MyAccount/>}/>
                <Route path='/myoffers' element={<MyOffers/>} />
                <Route path='/form' element={<Form setRequestID={setRequestID}/>}  />
                <Route path='/offers' element={<Offers requestID={requestID}/>} />
                <Route path='/loadDocuments' element={<DocumentLoad requestID={requestID}/>} />
                <Route path='/success' element={<Success/>} />
                <Route path='/statusCheck' element={<StatusCheck/>} />
                <Route path='/statusCheck/:id' element={<StatusCheck/>} />
                <Route path='/finalConfirmation/:rqid/:guid' element={<FinalComfirmation />} />
            </Routes>

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