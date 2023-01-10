// react
import React from "react";
import { useEffect, useState } from 'react';
import { Circles } from 'react-loader-spinner'

// microsoft
import { protectedResources } from "../authConfig";
import useFetchWithMsal from '../hooks/useFetchWithMsal';

// my components
import Offer from "./Offer";

// css
import "../styles/Offers.css"

const Offers = ({requestID}) => {

    console.log(requestID)

    const [offers, setOffers] = useState([])

    const { execute, isLoading } = useFetchWithMsal({
        scopes: protectedResources.apiLoanComparer.scopes.read,
    });

    //const [error, setError] = useState(false);

    useEffect(() => {
        const getOffersbyID_EFFECT = () => {

            execute("GET", protectedResources.apiLoanComparer.endpoint + `api/RequestManagement/api/RequestManagement/offers/${requestID}`)
            .then((response) => {
                setOffers(response);
            })
            .catch((e) => {
                console.log("getOffersbyID_EFFECT error: ", e);
            })    
        }

        getOffersbyID_EFFECT();
        // eslint-disable-next-line
    }, [requestID]) // eslint-disable-next-line

    return (
        <div className="Offers-islande">
            <div className="Offers-whole">
                <h1> Na podstawie Twojego formularzu możemy zaproponować następujące oferty </h1>

                {
                    isLoading 
                        ? 
                    <Circles 
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="circles-loading"
                        wrapperStyle={{ margin: 25}}
                        wrapperClass=""
                        visible={true}
                    />
                        :
                    null
                }

                <div className="Offers-offers">

                {
                    offers 
                        ? 
                    offers.map((offer, index) => (
                    <Offer key={index} data={offer} requestID={requestID}/>
                    )) 
                        :
                    <div> Ups, nie udało się załadować oferty, spróbuj ponownie odświeżywszy stronę</div>
                }
                </div>
            </div>
        </div>
    )
}

export default Offers