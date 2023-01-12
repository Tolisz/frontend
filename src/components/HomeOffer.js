// css 
import "../styles/Table.css"

export const HomeOffer = ({offer}) => {

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
                        <td>{offer.rate}</td>
                    </tr>
                    <tr>
                        <td>Liczba rat:</td>
                        <td>{offer.numberOfInstallments}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
