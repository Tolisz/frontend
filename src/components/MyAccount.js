// react
import { useEffect, useState } from 'react';

// microsoft
import useFetchWithMsal from '../hooks/useFetchWithMsal';
import { loginRequest, protectedResources } from "../authConfig";
import { AuthenticatedTemplate, UnauthenticatedTemplate, MsalProvider, useMsal } from "@azure/msal-react";
import { createClaimsTable } from '../utils/claimUtils';

// my components


const MyAccount = (props) => {

    const { instance } = useMsal();    
    const activeAccount = instance.getActiveAccount();
    const tokenClaims = createClaimsTable(activeAccount.idTokenClaims);

    // const tableRow = Object.keys(tokenClaims).map((key, index) => {
    //     return (
    //         <tr key={key}>
    //             {tokenClaims[key].map((claimItem) => (
    //                 <td key={claimItem}>{claimItem}</td>
    //             ))}
    //         </tr>
    //     );
    // });

    return (
        <>
            <AuthenticatedTemplate>
                {/* {tableRow} */}
                <div>
                    Moje konto

                    <br/>
                    
                    Poniżej możesz znaleźć informacje dotyczące twojego konta

                    <table>
                        <tbody>
                            <tr>
                                <td>Surname</td>
                                <td>{tokenClaims[10][1]}</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>{tokenClaims[11][1]}</td>
                            </tr>
                            <tr>
                                <td>Government ID</td>
                                <td>{tokenClaims[12][1]}</td>
                            </tr>
                            <tr>
                                <td>Government Type</td>
                                <td>{tokenClaims[13][1]}</td>
                            </tr>
                            <tr>
                                <td>Income Level</td>
                                <td>{tokenClaims[14][1]}</td>
                            </tr>
                            <tr>
                                <td>JobType</td>
                                <td>{tokenClaims[15][1]}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </AuthenticatedTemplate>
        
            <UnauthenticatedTemplate>
                NIE JESTES ZALOGOWANY!!!!!!!!!!
            </UnauthenticatedTemplate>
        </>
    )
}

export default MyAccount