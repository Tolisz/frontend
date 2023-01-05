// react
import { useNavigate } from 'react-router-dom';

// microsoft
import { loginRequest, protectedResources } from "../authConfig";


const Offer = ({data, error, execute, requestID}) => {

    const navigate = useNavigate();

    const test = {
        "date": "2023-01-04T21:18:58.716Z",
        "amount": 0,
        "numberOfInstallments": 0,
        "name": "string",
        "surname": "string",
        "govermentId": "string",
        "email": "string",
        "jobType": "string",
        "incomeLevel": 0,
        "status": "string",
        "monthlyInstallment": 0
      };

    //const test = data;

    const click_Offer = () => {
        console.log(data);
        console.log(JSON.stringify(data))
        execute("POST", protectedResources.apiLoanComparer.endpoint + `SelectedResult/${requestID}`, data)
        .then((response) => {
            console.log(response);

            navigate("/loadDocuments");
        })

        if (error) {
            return <div>Error: {error.message}</div>;
        }
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