// react
import { StubPerformanceClient } from '@azure/msal-common';
import { useEffect, useState, useRef} from 'react';

// styles
import "../styles/FormInput.css"

const FormInput = (props) => {
  
    const [focused, setFocuse] = useState(false);

    const {label, errorMessage, onChange, id, ...inputProps} = props;

    const handleFocuse = (e) => {
        setFocuse(true);
    }

    return (
        <div className="FormInput">
            <label>{label}</label>
            <input 
                {...inputProps} 
                onChange={onChange}
                onBlur={handleFocuse}
                onFocus={() => inputProps.name === "confirmPassword" && setFocuse(true)}
                focused={focused.toString()}
            />
            <span> {errorMessage} </span>
        </div>
    )
}

export default FormInput