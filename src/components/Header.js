// react
import { useNavigate } from 'react-router-dom';

// microsoft

// my components
import LogButton from "./LogButton"

// css
import "../styles/Header.css"


const Header = () => {

    const navigate = useNavigate();

    const click_FormPage = () => {
        navigate('/form');
    }

    const click_HomePage = () => {
        navigate('/');
    }

    return (
        <div className="header">
            <div onClick={click_HomePage}>
                Kredyt.pl
            </div>
            <button onClick={click_FormPage} className="header-formbutton">
                Wypewnij formularz
            </button>
            <LogButton/>
        </div>
    )
}

export default Header