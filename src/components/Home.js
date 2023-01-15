// // react
import { useEffect, useState } from 'react'
import { Circles } from 'react-loader-spinner'

// microsoft
import { protectedResources } from "../authConfig";
import useFetchWithMsal from '../hooks/useFetchWithMsal';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";

// my components
import { HomeOffer } from './HomeOffer';

// css 
import '../styles/Home.css'
import "../styles/Table.css"

const Home = ({setRequestID}) => {

    const { instance } = useMsal();

    const [offers, setOffers] = useState([]);

    const { execute, isLoading } = useFetchWithMsal({
        scopes: protectedResources.apiLoanComparer.scopes.read,
    });

    useEffect( () => 
    {
        if (!instance.getActiveAccount())
        {
            setTimeout(getLastOffers, 1000);
        }
        else 
        {
            getLastOffers();
        }

        // eslint-disable-next-line
    }, [])

    const getLastOffers = async () => 
    {
        if (!instance.getActiveAccount())
            return;

        execute("GET", protectedResources.apiLoanComparer.endpoint + `getRecentRequests`)
        .then((response) => {
            if (response.status === 401)
            {
                setOffers(null);
                return;
            }
            
            setOffers(response);
        })
        .catch((error) => {
            console.log("error", error);
        })
    }

    return (
        <div className='Home'>
            <div className='Home-text'>
                <div className='Home-text-Whole'>

                <h1> Witamy w serwisie Kredyt.pl </h1>

                <div> Już ponad milion polaków stracili swoje pieniądze posługując się naszym serwisem. </div>

                <br/> 

                <div> To samo również możesz zrobić Ty! </div> 

                <br/> 
                
                <div> To Proste! Wypewnij formularz kredytowy, wybierz pasującą dla Ciebie ofertę, poczeka na akceptację oferty naszym pracownikiem i korzystaj ze swoich pieniędzy! </div>
                
                </div>
            </div>

            <div className='Home-offers'>
                <div className='Home-offers-Whole'>
                    <UnauthenticatedTemplate>
                        Musisz być zalogowany żeby widzieć ostatnio wybrane oferty
                    </UnauthenticatedTemplate>
                    <AuthenticatedTemplate>
                        <div className='Home-offers-offer'>
                            <div>Oferty za ostatnie 30 dni.</div>

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

                            {                   
                                offers
                                    ?
                                offers.map((offer, index) => (
                                    <HomeOffer key={index} offer={offer} setRequestID={setRequestID}/>
                                ))
                                    :
                                isLoading 
                                ?
                                null
                                :
                                <div>Nie udało się załadować</div>
                            }   

                        </div>  
                    </AuthenticatedTemplate>
                </div>
            </div>
        </div>
    )
}

export default Home