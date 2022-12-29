// react
import { useEffect, useState, useRef} from 'react';

// microsoft
import useFetchWithMsal from '../hooks/useFetchWithMsal';
import { loginRequest, protectedResources } from "../authConfig";
import { AuthenticatedTemplate, UnauthenticatedTemplate, MsalProvider, useMsal } from "@azure/msal-react";
import { createClaimsTable } from '../utils/claimUtils';

// my components
import FormInput from './FormInput';

// styles
import "../styles/Form.css"

const Form = () => {

    const [values, setValues] = useState({
        name: "",
        surname: "",
        govermentId: "",

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
            placeholder: "Nazwisko",
            errorMessage: "Twoje nazwisko musi zaczynać się z wielkiej litery oraz posiadać co najmniej 3 litery, ale nie więcej niż 20",
            label: "Nazwisko",
            pattern: "^[A-Z][A-Za-z]{2,20}",
            required: true,
        },
        {
            id: 3
        }

        // {
        //     id: 2,
        //     name: "email",
        //     type: "email", 
        //     placeholder: "Email",
        //     errorMessage: "test2",
        //     label: "Email",
        //     required: true,
        // },
        // {
        //     id: 3,
        //     name: "birthday",
        //     type: "date", 
        //     placeholder: "Birthday",
        //     errorMessage: "test3",
        //     label: "Birthday",
        // },
        // {
        //     id: 4,
        //     name: "password",
        //     type: "password", 
        //     placeholder: "Password",
        //     errorMessage: "test4",
        //     label: "Password",
        //     required: true,
        // },
        // {
        //     id: 5,
        //     name: "confirmPassword",
        //     type: "password", 
        //     placeholder: "Confirm Password",
        //     errorMessage: "test5",
        //     label: "Confirm Password",
        //     required: true,
        // }
    ]

    const handleSubmit = (e) => {
        e.preventDefault();

        // const data = new FormData(e.target);
        // console.log(Object.fromEntries(data.entries()));
    } 

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
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