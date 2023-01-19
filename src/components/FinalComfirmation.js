import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Circles } from 'react-loader-spinner'

import { protectedResources } from "../authConfig";
import useFetchWithMsal from '../hooks/useFetchWithMsal';

import "../styles/FinalConfirmation.css"

const FinalComfirmation = () => {
	
	const { rqid, guid } = useParams();

	//console.log(rqid, "   ", guid);

	const { execute, isLoading } = useFetchWithMsal({
        scopes: protectedResources.apiLoanComparer.scopes.read,
    });

	const [confirmed, setConfirmed] = useState(false);

	useEffect(() => {
		CheckConfirmation();

		// eslint-disable-next-line
	}, [])

	const CheckConfirmation = () => 
	{
		console.log("Dzień dobry");

		try{
			execute("GET", protectedResources.apiLoanComparer.endpoint + `getFinalConfirmation/${rqid}/${guid}`)
			.then((response) =>
			{

				if (response.status === 200 || response.status === 204)
				{
					setConfirmed(true);
				}
				else
				{
					setConfirmed(false);
				}

				console.log(response);
			})
			.catch((e) => {
				console.log("BŁAD = ", e);
				setConfirmed(false);
			}
			)
		}
		catch(e)
		{
			console.log("Wyjątek = ", e);
			setConfirmed(false);
		}
	}

	return (

		<div className='FinalComf-island'>
			<div className='FinalComf-whole' >
				<h2>Akceptacja wniosku!</h2>

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
					(
						confirmed
							?
						<p>
							Gratulujemy! Twój wniosek kredytowy został zaakceptowany poprzez pracownika banku.
							Serdecznie zapraszamy po odbior pieniędzy do banku.
						</p>
							:
						<p>
							Twój wnisek nie jest zaakceptowany
						</p>
					)

				}
			</div>
		</div>
	)
}

export default FinalComfirmation