// react
import React from "react";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// microsoft
import { AuthenticatedTemplate, UnauthenticatedTemplate, MsalProvider, useMsal } from "@azure/msal-react";
import { EventType } from '@azure/msal-browser';
import { loginRequest, protectedResources, b2cPolicies } from "../authConfig";

// my components
import Offer from "./Offer";

// css
import "../styles/Offers.css"

const Offers = ({error, execute, requestID}) => {

    console.log(requestID)

    const navigate = useNavigate();

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
        <div className="Offers-islande">
            <div className="Offers-whole">
                <h1> Na podstawie Twojego formularzu możemy zaproponować następujące oferty </h1>

                <div className="Offers-offers">
                {offers ? offers.map((offer, index) => (
                    <Offer key={index} data={offer} error={error} execute={execute} requestID={requestID}/>
                ) ) : 'Nie załadowane'}
                </div>
                <button onClick={getOffersbyID}>
                    Sprawdzian
                </button>
            </div>
        </div>
    )
}

export default Offers