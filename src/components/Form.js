// react
import { useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';

// microsoft
import useFetchWithMsal from '../hooks/useFetchWithMsal';
import { loginRequest, protectedResources } from "../authConfig";
import { AuthenticatedTemplate, UnauthenticatedTemplate, MsalProvider, useMsal } from "@azure/msal-react";
import { createClaimsTable } from '../utils/claimUtils';

// my components
import FormInput from './FormInput';

// styles
import "../styles/Form.css"

const Form = ({ error, execute, setRequestID }) => {

    const navigate = useNavigate();


    // Microsoft magic
    // Jebani microsoft
    // const { error, execute } = useFetchWithMsal({
    //     scopes: protectedResources.apiLoanComparer.scopes.read,
    // });
    
    const [values, setValues] = useState({
        name: "TestoweImie",
        surname: "TestoweNazwisko",
        govermentId: "120398123",
        email: "dupa@gmail.com",
        jobType: "RobieGlupieProekty",
        incomeLevel: 3000,
        amount: 3000,
        numberOfInstallments: 12
    });

    const inputs = [
        {
            id: 1,
            name: "name",
            type: "text", 
            placeholder: "Imię",
            errorMessage: "Twoje imię musi zaczynać się z wielkiej litery oraz posiadać co najmniej 3 litery, ale nie więcej niż 20",
            label: "Imię",
            pattern: "^[A-Z][A-Za-z]{2,20}",
            required: true,
        },
        {
            id: 2,
            name: "surname",
            type: "text", 
            placeholder: "Nazwisko",
            errorMessage: "Twoje nazwisko musi zaczynać się z wielkiej litery oraz posiadać co najmniej 3 litery, ale nie więcej niż 20",
            label: "Nazwisko",
            pattern: "^[A-Z][A-Za-z]{2,20}",
            required: true,
        },
        {
            id: 3,
            name: "govermentId",
            type: "text", 
            placeholder: "Identyfikator urzędowy",
            errorMessage: "Identyfikator musi zawierać wyłącznie cyfry lub litery",
            label: "Identyfikator urzędowy",
            pattern: "[A-Za-z0-9]*",
            required: true, 
        }, 
        {
            id: 4,
            name: "email",
            type: "email",
            placeholder: "Adres mailowy",
            errorMessage: "Podany adres mailowy jest niepoprawny",
            label: "email",
            required: true, 
        },
        {
            id: 5,
            name: "jobType",
            type: "text",
            placeholder: "Zawód",
            errorMessage: "Nazwa zawodu nie może być dłuższa niż 40 liter",
            label: "Zawód",
            pattern: "[A-Za-z]{1,40}",
            required: true, 
        },
        {
            id: 6,
            name: "incomeLevel",
            type: "number",
            placeholder: "Dochód",
            errorMessage: "Dochód musi być większy od minimalnej krajowej oraz po przecinku zawierać co najwyżej dwie cyfry. Pole musi zawierać wyłączne cyfry ",
            label: "Dochód",
            //pattern: "[0-9]{3,9}([.][0-9]{1,2}){0,1}",
            min: 1000,
            max: 100000000,
            required: true, 
        },
        {
            id: 7,
            name: "amount",
            type: "number",
            placeholder: "Suma kredytu",
            errorMessage: "Suma kredytu zawiera wyłącznie cyfry",
            label: "Suma kredytu",
            //pattern: "[0-9]{1,9}([.][0-9]{1,2}){0,1}",
            min: 1,
            max: 100000000,
            required: true, 
        },
        {
            id: 8,
            name: "numberOfInstallments",
            type: "number",
            placeholder: "Liczba rat",
            errorMessage: "Liczba rat musi być w zakresie pomiędzy 1 a 100",
            label: "Liczba rat",
            //pattern: "[0-9]{1,2}",
            min: 1,
            max: 100,
            required: true, 
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault();

        let currentTime = new Date().toJSON();
        let formData = {...values, date: currentTime, status: 'require acceptance' };
        
        console.log(formData);
        console.log("Lecimy z tym koksem");
        console.log("Ednpoint: ", protectedResources.apiLoanComparer.endpoint + `RequestManagement`);

        execute("POST", protectedResources.apiLoanComparer.endpoint + `api/RequestManagement`, formData)
        .then((response) => {
            if (response && response.message === "success") {
                console.log("Udało się");
            }

            console.log(response.message);
            setRequestID(response);
            if (error) {
                console.log("Error", error.message);
            }

            navigate('/offers');
        })

        if (error) {
            return <div>Error: {error.message}</div>;
        }

        // execute("GET", "https://bank-project-backend-dev.azurewebsites.net/WeatherForecast")
        // .then((response) => {
        //     console.log(response)
        //     console.log('setData')
        // })
        
        // const data = new FormData(e.target);
        // console.log(Object.fromEntries(data.entries()));
    } 

    const onChange = (e) => {
        switch(e.target.name)
        {
            case "incomeLevel":
            case "numberOfInstallments":
            case "amount":
                setValues({...values, [e.target.name]: parseFloat(e.target.value, 10)});
                break;
            default:
                setValues({...values, [e.target.name]: e.target.value});
        }
    }

    console.log(values)
    
    return (
        <div className='Form'>

            <h1 className='FormTitle'>FormTitle</h1> <br/>

            <form onSubmit={handleSubmit}>

                {inputs.map((input) => (
                    <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                ))}

            <button>Submit</button>
            </form>
        </div>
    )
}

export default Form