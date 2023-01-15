// react
import { useNavigate } from 'react-router-dom';
import { Circles } from 'react-loader-spinner'

// microsoft
import { protectedResources } from "../authConfig";
import useFetchWithMsal from '../hooks/useFetchWithMsal';

// css
import "../styles/Offer.css"
import "../styles/Table.css"

const Offer = ({data, requestID}) => {

    const navigate = useNavigate();

    const { execute, isLoading } = useFetchWithMsal({
        scopes: protectedResources.apiLoanComparer.scopes.read,
    });

    const click_Offer = () => {
        execute("POST", protectedResources.apiLoanComparer.endpoint + `SelectedResult/${requestID}`, JSON.stringify(data), 'application/json')
        .then((response) => {
            console.log(response);

            navigate("/loadDocuments");
        }).catch(e => {
            console.log(e);
        });
    }

    return (
        <div onClick={click_Offer}>
            <table className='styled-table'>
                <tbody>
                    <tr>
                        <td>Suma kredytu:</td>
                        <td>{data.amount}</td>
                    </tr>
                    <tr>
                        <td>Rata: </td>
                        <td>{data.monthlyInstallment}</td>
                    </tr>
                    <tr>
                        <td>Liczba rat:</td>
                        <td>{data.numberOfInstallments}</td>
                    </tr>
                </tbody>
            </table>

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
        </div>
  )
}

export default Offer