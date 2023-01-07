// react
import React from "react";
import { useEffect, useState } from 'react';

// microsoft
import { loginRequest, protectedResources, b2cPolicies } from "../authConfig";

// css
import '../styles/StatusCheck.css'

const StatusCheck = ({ error, execute }) => {

    const [offer, setOffer] = useState();
    const [rqid, setRqid] = useState(0);

    const findOffer = (e) => {
        e.preventDefault();
        console.log("Próbuję szukać");

        execute("GET", protectedResources.apiLoanComparer.endpoint + `/inspect/${rqid}`)
        .then( (response) => {
            console.log(response);
            setOffer(response);
        })
    }

    const onChange = (e) => {
        setRqid(e.target.value);
    }

    return (
        <div className='StatusCheck-island'>
            <div className='StatusCheck-whole'>
                <div> Wprowadź poniżej identyfikator swojej oferty </div>
                
                <form className='StatusCheck-form' onSubmit={findOffer}>
                    <input type="number" className='StatusCheck-form-imput' onChange={onChange}/>
                    <button className='StatusCheck-form-button'> Sprawdź </button>
                </form>

                {offer ? 
                <div>
                    Status: {offer.status}
                </div> : null}
            </div>
        </div>
    )
}

export default StatusCheck