import {
    useState,
    useCallback,
} from 'react';

import { InteractionType } from '@azure/msal-browser';
import { useMsal, useMsalAuthentication } from "@azure/msal-react";
//import { useEffect } from 'react';

// /**
//  * Custom hook to call a web API using bearer token obtained from MSAL
//  * @param {PopupRequest} msalRequest 
//  * @returns 
//  */
const useFetchWithMsal = (msalRequest) => {
    const { instance } = useMsal();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    
    //const [myResult, setMyResult] = useState(null);

    const { result, error: msalError, login, acquireToken  } = useMsalAuthentication(InteractionType.None, {
        ...msalRequest,
        account: instance.getActiveAccount(),
        redirectUri: '/redirect.html'
    });

    //acquireToken(InteractionType.None).then ((result) => { console.log("Pizda", result) })

    /**
     * Execute a fetch request with the given options
     * @param {string} method: GET, POST, PUT, DELETE
     * @param {String} endpoint: The endpoint to call
     * @param {Object} data: The data to send to the endpoint, if any 
     * @returns JSON response
     */
    const execute = async (method, endpoint, data = null, request_body = null) => {
        console.log('W execute');

        if (msalError) {
            console.log(msalError);
            setError(msalError);
            return;
        }

        console.log('result', result)
        if (result) {
            try {
                let response = null;

                console.log('Token', result.accessToken);
                const headers = new Headers();
                const bearer = `Bearer ${result.accessToken}`;            
                headers.append("Authorization", bearer);

                if (request_body) headers.append('Content-Type', request_body);
                // headers.append('Content-Type', 'application/json');

                let options = {
                    method: method,
                    headers: headers,
                    body: data, //? JSON.stringify(data) : null,
                };

                console.log("options.body = ", options.body);

                setIsLoading(true);

                response = await (await fetch(endpoint, options)).json();
                setData(response);

                setIsLoading(false);
                return response;
            } catch (e) {
                setError(e);
                setIsLoading(false);
                throw e;
            }
        }
        else 
        {
            console.log("Robie else");

            let accessToken;
            await acquireToken(InteractionType.None)
                .then ((res) => 
                { 
                    console.log("Pizda", res) 
                    accessToken = res.accessToken;
                    console.log("Token = ", accessToken);
                }); 

            console.log("No teraz to już na 100% robię else");
            try {
                let response = null;

                console.log('Token', accessToken);
                const headers = new Headers();
                const bearer = `Bearer ${accessToken}`;            
                headers.append("Authorization", bearer);

                if (request_body) headers.append('Content-Type', request_body);
                // headers.append('Content-Type', 'application/json');

                let options = {
                    method: method,
                    headers: headers,
                    body: data, //? JSON.stringify(data) : null,
                };

                console.log("options.body = ", options.body);

                setIsLoading(true);

                response = await (await fetch(endpoint, options)).json();
                setData(response);

                setIsLoading(false);
                return response;
            } catch (e) {
                setError(e);
                setIsLoading(false);
                throw e;
            }
        }
    };

    return {
        isLoading,
        error,
        data,
        execute: useCallback(execute, [result, msalError]), // to avoid infinite calls when inside a `useEffect`
    };
};

export default useFetchWithMsal;