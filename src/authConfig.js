import { LogLevel } from "@azure/msal-browser";

/**
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
    names: {
        signUpSignIn: 'B2C_1_susi_v2',
        forgotPassword: 'B2C_1_reset_v3',
        editProfile: 'B2C_1_edit_profile_v2',
    },
    authorities: {
        signUpSignIn: {
            authority: 'https://CreditComparer.b2clogin.com/CreditComparer.onmicrosoft.com/b2c_1_susi',
        },
        forgotPassword: {
            authority: 'https://CreditComparer.b2clogin.com/CreditComparer.onmicrosoft.com/B2C_1_reset_v3',
        },
        editProfile: {
            authority: 'https://CreditComparer.b2clogin.com/CreditComparer.onmicrosoft.com/b2c_1_edit_profile_v2',
        },
    },
    authorityDomain: "CreditComparer.b2clogin.com"
}

/**
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig = {
    auth: {
        clientId: "6a60b029-b850-496f-a7ab-427ae928bfbe", 
        authority: b2cPolicies.authorities.signUpSignIn.authority, 
        knownAuthorities: [b2cPolicies.authorityDomain], 
        redirectUri: "/",
        postLogoutRedirectUri: "/",
        navigateToLoginRequestUrl: false, 
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
    system: {	
        loggerOptions: {	
            loggerCallback: (level, message, containsPii) => {	
                if (containsPii) {		
                    return;		
                }		
                switch (level) {		
                    case LogLevel.Error:		
                        console.error(message);		
                        return;		
                    case LogLevel.Info:		
                        console.info(message);		
                        return;		
                    case LogLevel.Verbose:		
                        console.debug(message);		
                        return;		
                    case LogLevel.Warning:		
                        console.warn(message);		
                        return;
                    default:
                        return;
                }	
            }	
        }	
    }
};

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
    apiLoanComparer: {
        endpoint: 'https://bank-project-backend-dev.azurewebsites.net/',
        scopes: {
            read: ['https://CreditComparer.onmicrosoft.com/08b8fb66-4b9f-493a-b3d2-53158caeb956/access_as_user'],
            write: ['https://CreditComparer.onmicrosoft.com/08b8fb66-4b9f-493a-b3d2-53158caeb956/access_as_user'],
        },
    },
};


/**
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: [...protectedResources.apiLoanComparer.scopes.read, ...protectedResources.apiLoanComparer.scopes.write],
};