// react
import { useNavigate } from 'react-router-dom';

// microsoft

// my components
import LogButton from "./LogButton"

const Header = () => {

    const navigate = useNavigate();

    const click_Logo = () => {
        navigate('/');
    }

    return (
        <header className="header">
            <div onClick={click_Logo}>
                Jakiś logotyp
            </div>

            <LogButton/>
        </header>
    )
}

export default Header