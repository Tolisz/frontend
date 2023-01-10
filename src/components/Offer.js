// react
import { useNavigate } from 'react-router-dom';

// microsoft
import { protectedResources } from "../authConfig";
import useFetchWithMsal from '../hooks/useFetchWithMsal';

// css
import "../styles/Offer.css"

const Offer = ({data, requestID}) => {

    const navigate = useNavigate();

    const { execute } = useFetchWithMsal({
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
            <table>
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
        </div>
  )
}

export default Offer