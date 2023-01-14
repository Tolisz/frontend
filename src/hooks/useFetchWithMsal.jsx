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
    
    const { result, error: msalError, acquireToken  } = useMsalAuthentication(InteractionType.None, {
        ...msalRequest,
        account: instance.getActiveAccount(),
        redirectUri: '/'
    });

    /**
     * Execute a fetch request with the given options
     * @param {string} method: GET, POST, PUT, DELETE
     * @param {String} endpoint: The endpoint to call
     * @param {Object} data: The data to send to the endpoint, if any 
     * @returns JSON response
     */
    const execute = async (method, endpoint, data = null, request_body = null) => {

        if (msalError) {
            console.log(msalError);
            setError(msalError);
            return;
        }

        // Użytkownik dopiero się zalogował
        if (result) {
            try {
                let response = null;

                const headers = new Headers();
                const bearer = `Bearer ${result.accessToken}`;            
                headers.append("Authorization", bearer);

                if (request_body) headers.append('Content-Type', request_body);

                let options = {
                    method: method,
                    headers: headers,
                    body: data,
                };

                setIsLoading(true);

                response = await fetch(endpoint, options);

                if (response.status === 200 || response.status === 204) {
                    try {
                        response = await response.json();    
                    }
                    catch(e) {
                        console.log("Powodzenie, ale error = ", e);
                    }
                }

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
            // Użytkownik nie jest zalogowany
            if (!instance.getActiveAccount())
            {
                try {
                    let response = null;
    
                    const headers = new Headers();
                    //const bearer = `Bearer ${accessToken}`;            
                    //headers.append("Authorization", bearer);
                    if (request_body) headers.append('Content-Type', request_body);
    
                    let options = {
                        method: method,
                        headers: headers,
                        body: data,
                    };
    
                    setIsLoading(true);
    
                    response = await fetch(endpoint, options);
    
                    if (response.status === 200 || response.status === 204) {
                        try {
                            response = await response.json();    
                        }
                        catch(e) {
                            console.log("Powodzenie, ale error = ", e);
                        }
                    }

                    setData(response);
    
                    setIsLoading(false);
                    return response;
                } catch (e) {
                    setError(e);
                    setIsLoading(false);
                    throw e;
                }
            }

            // Użytkownik jest zalogowany, ale np. odświeżył stronę 
            let accessToken;
            await acquireToken(InteractionType.None)
                .then ((res) => 
                { 
                    accessToken = res.accessToken;
                }); 

            try {
                let response = null;

                const headers = new Headers();
                const bearer = `Bearer ${accessToken}`;            
                headers.append("Authorization", bearer);

                if (request_body) headers.append('Content-Type', request_body);

                let options = {
                    method: method,
                    headers: headers,
                    body: data,
                };

                setIsLoading(true);

                response = await fetch(endpoint, options);

                if (response.status === 200 || response.status === 204) {
                    try {
                        response = await response.json();    
                    }
                    catch(e) {
                        console.log("Powodzenie, ale error = ", e);
                    }
                }

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
        execute: useCallback(execute, [result, msalError, acquireToken, instance]), // to avoid infinite calls when inside a `useEffect`
    };
};

export default useFetchWithMsal;