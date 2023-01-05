// react
import React from "react";
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// microsoft
import { AuthenticatedTemplate, UnauthenticatedTemplate, MsalProvider, useMsal } from "@azure/msal-react";
import { EventType } from '@azure/msal-browser';
import { loginRequest, protectedResources, b2cPolicies } from "../authConfig";

// my components
import Offer from "./Offer";


const Offers = ({error, execute, requestID}) => {

    console.log(requestID)

    const [offers, setOffers] = useState([])


    useEffect(() => {
        getOffersbyID();
    }, [])

    const getOffersbyID = () => {
        execute("GET", protectedResources.apiLoanComparer.endpoint + `api/RequestManagement/api/RequestManagement/offers/${requestID}`)
        .then((response) => {
            console.log(response)
            console.log('setData')
            setOffers(response)
        })

        if (error) {
            return <div>Error: {error.message}</div>;
        }
    }

    return (
        <>
            <h1> Offers related to your form </h1>

            {offers.map((offer, index) => (
                <Offer key={index} data={offer} error={error} execute={execute} requestID={requestID}/>
            ) ) }

            <button onClick={getOffersbyID}>
                Sprawdzian
            </button>
        </>
    )
}

export default Offers