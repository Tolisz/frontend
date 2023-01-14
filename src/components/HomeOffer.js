// react
import { useNavigate } from 'react-router-dom';

// css 
import "../styles/Table.css"

export const HomeOffer = ({offer}) => {

    //console.log(offer);

    const navigate = useNavigate();

    const onClick_Pending = () => 
    {
        // NALEŻY TUTAJ z App.jsx ustawić ID oferty
        
        navigate("/offers");
    }

    const onClick_OfferSelected = () => 
    {
        // NALEŻY TUTAJ z App.jsx ustawić ID oferty

        navigate("/loadDocuments");
    }

    return (
        <div>
            <table className="styled-table">
                <tbody>
                    <tr>
                        <td>Czas złożenia oferty:</td>
                        <td>{offer.date}</td>
                    </tr>
                    <tr>
                        <td>Status:</td>
                        <td>{offer.status}</td>
                    </tr>
                    <tr>
                        <td>Suma kredytu:</td>
                        <td>{offer.amount}</td>
                    </tr>
                    <tr>
                        <td>Rata: </td>
                        <td>{offer.rate == null ? "oferta nie wybrana" : offer.rate}</td>
                    </tr>
                    <tr>
                        <td>Liczba rat:</td>
                        <td>{offer.numberOfInstallments}</td>
                    </tr>
                    <tr>
                        {(() => {
                            switch(offer.status) {
                                case "Pending": return <td colSpan="2" className="styled-table-click-Pending" onClick={onClick_Pending}> Wybierz ofertę </td>;
                                case "OfferSelected": return <td colSpan="2" className="styled-table-click-OfferSelected" onClick={onClick_OfferSelected}> Wgraj Dokumenty </td>;
                                case "Będzie w przyszłości": return ;
                                default: return null;
                            }
                            })()}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
