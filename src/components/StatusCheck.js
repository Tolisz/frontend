// react
import React from "react";
import { useState } from 'react';
import { Circles } from 'react-loader-spinner'

// microsoft
import { protectedResources } from "../authConfig";
import useFetchWithMsal from '../hooks/useFetchWithMsal';

// css
import '../styles/StatusCheck.css'

const StatusCheck = () => {

    const [offer, setOffer] = useState(null);
    const [rqid, setRqid] = useState(0);

    const { execute, isLoading } = useFetchWithMsal({
        scopes: protectedResources.apiLoanComparer.scopes.read,
    });

    const findOffer = (e) => {
        e.preventDefault();
        console.log("Próbuję szukać");

        execute("GET", protectedResources.apiLoanComparer.endpoint + `inspect/${rqid}`)
        .then( (response) => {
            console.log(response);
            setOffer(response);
        })
        .catch( (e) => {
            setOffer( { status: "Podany numer oferty jest niepoprawny"} );
        });
    }

    const onChange = (e) => {
        setRqid(e.target.value);
    }

    return (
        <div className='StatusCheck-island'>
            <div className='StatusCheck-whole'>
                <div> Wprowadź poniżej identyfikator swojej oferty </div>
                
                <form className='StatusCheck-form' onSubmit={findOffer}>
                    
                    {
                        isLoading
                            ?
                        <input type="number" className='StatusCheck-form-imput' onChange={onChange} disabled/>
                            :
                        <input type="number" className='StatusCheck-form-imput' onChange={onChange} />
                    }
                    
                    <button className='StatusCheck-form-button'> Sprawdź </button>
                </form>


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
                        
                    <>{offer ? 
                    <div>
                        Status: {offer.status === 500 ? "Oferta nie została znaleziona" : offer.status}
                    </div> : null}
                    </>
                }
            </div>
        </div>
    )
}

export default StatusCheck