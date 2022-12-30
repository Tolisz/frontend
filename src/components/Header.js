// react
import { useNavigate } from 'react-router-dom';

// microsoft

// my components
import LogButton from "./LogButton"

const Header = () => {

    const navigate = useNavigate();

    const click_FormPage = () => {
        navigate('/offers'); // MUSI BYĆ /form
    }

    const click_HomePage = () => {
        navigate('/');
    }

    return (
        <header className="header">
            <div onClick={click_HomePage}>
                Jakiś logotyp
            </div>

            <button onClick={click_FormPage}>
                Wypewnij formę
            </button>
            <LogButton/>
        </header>
    )
}

export default Header