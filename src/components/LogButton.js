// react
import { useState } from 'react';
import { Popover } from 'react-tiny-popover';
import { useNavigate } from 'react-router-dom';

// microsoft
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal} from "@azure/msal-react";
import { loginRequest, protectedResources } from "../authConfig";

// my components

// css 
import "../styles/LogButton.css"

const LogButton = () => {
    
    const { instance } = useMsal();
    const navigate = useNavigate();
    
    const click_MyAccount = () => {
        navigate('/myaccount'); 
    }
    
    const click_LogOut = () => {
        instance.logoutRedirect({ postLogoutRedirectUri: "/" })
    }

    const click_LogIn = () => {
        instance.loginRedirect(loginRequest)
    }

    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    return (
    <>
        <AuthenticatedTemplate>
            <Popover
                isOpen={isPopoverOpen}
                positions={['bottom', 'left', 'left', 'right']} // preferred positions by priority
                content={
                    <>
                <button onClick={click_MyAccount} className="MenuButton"> Moje konto</button> <br/>
                <button onClick={click_LogOut} className="MenuButton"> Wylogój </button>
                    </>
            }
            >
            <button className="MenuButton" onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                Witaj
            </button>
            </Popover>
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
            <button className="LogInButton">
                <div onClick={click_LogIn}> Zaloguj się </div>
            </button>
        </UnauthenticatedTemplate>
    </>
    )
}

export default LogButton