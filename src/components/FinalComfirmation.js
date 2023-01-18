import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import { protectedResources } from "../authConfig";
import useFetchWithMsal from '../hooks/useFetchWithMsal';

import "../styles/FinalConfirmation.css"

const FinalComfirmation = () => {
	
	const { rqid, guid } = useParams();

	//console.log(rqid, "   ", guid);

	const { execute, isLoading } = useFetchWithMsal({
        scopes: protectedResources.apiLoanComparer.scopes.read,
    });

	useEffect(() => {

		CheckConfirmation();

	}, [])

	const CheckConfirmation = () => 
	{
		console.log("Dzień dobry")

		try{

			execute("GET", protectedResources.apiLoanComparer.endpoint `getFinalConfirmation/${rqid}/${guid}`)
			.then((response) =>
			{
				console.log(response);
			})
			.catch((e) => {
				console.log("BŁAD = ", e);
			}
			)
		}
		catch(e)
		{
			console.log("Wyjątek = ", e);
		}
	}

	return (

		<div className='FinalComf-island'>
			<div className='FinalComf-whole' >
				<h2>Akceptacja wniosku!</h2>
				<p>
					Gratulujemy! Twój wniosek kredytowy został zaakceptowany poprzez pracownika banku.
					Serdecznie zapraszamy po odbior pieniędzy do banku.
				</p>
			</div>
		</div>
	)
}

export default FinalComfirmation