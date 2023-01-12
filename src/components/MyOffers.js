// // react
import { useEffect, useState } from 'react'
import { Circles } from 'react-loader-spinner'

// microsoft 
import { protectedResources } from "../authConfig";
import useFetchWithMsal from '../hooks/useFetchWithMsal';

// my component
import { HomeOffer } from './HomeOffer';

import "../styles/MyOffers.css"

const MyOffers = () => {

    const [offers, setOffers] = useState(null);

    const { execute, isLoading } = useFetchWithMsal({
        scopes: protectedResources.apiLoanComparer.scopes.read,
    });

	useEffect( () => {

		execute("GET", protectedResources.apiLoanComparer.endpoint + `getUserRequests`)
		.then((response) => {
            console.log("resp", response);

            setOffers(response);
        })
        .catch((error) => {
            console.log("error", error);
        })

		// eslint-disable-next-line
	}, [])

	return (
		<div className="MyOffers-island"> 
			<div className="MyOffers-whole">
				<h1>Poniżej możesz zobaczyć wszystkie swoje oferty </h1>

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
						<HomeOffer key={index} offer={offer}/>
					))
						:
					isLoading 
					?
					null
					:
					<div>Nie udało się załadować</div>
				}   

			</div>
		</div>
	)
}

export default MyOffers