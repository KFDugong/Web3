import base64 from "base-64";

export const SHOW_LOGIN_DIALOG = "SHOW_LOGIN_DIALOG";
export const HIDE_LOGIN_DIALOG = "HIDE_LOGIN_DIALOG";

export const AUTHENTICATION_PENDING = 'AUTHENTICATION_PENDING';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';

export const AUTHENTICATION_LOGOUT = 'AUTHENTICATION_LOGOUT';

const SERVER = process.env.REACT_APP_SERVER_URL;

export function getShowLoginDialogAction() {
    return {
        type: SHOW_LOGIN_DIALOG
    }
}

export function getHideLoginDialogAction() {
    return {
        type: HIDE_LOGIN_DIALOG
    }
}

export function getAuthenticateUserPendingAction() {
    return {
        type: AUTHENTICATION_PENDING
    }
}

export function getAuthenticateSuccessAction(userSession) {
    return {
        type: AUTHENTICATION_SUCCESS,
        user: userSession.user,
        accessToken: userSession.accessToken
    }
}

export function getAuthenticateErrorAction(error) {
    return {
        type: AUTHENTICATION_ERROR,
        error: error
    }
}

export function getLogOutAction() {
    return {
        type: AUTHENTICATION_LOGOUT,
    }
}

export function authenticateUser(userID, password) {
    return dispatch => {
        dispatch(getAuthenticateUserPendingAction());

        login(userID, password)
            .then(
                userSession => {
                    const action = getAuthenticateSuccessAction(userSession);
                    dispatch(action);
                },
                error => {
                    dispatch(getAuthenticateErrorAction(error))
                }
            )
            .catch(error => {
                dispatch(getAuthenticateErrorAction(error));
            })
    }
}

function login(userID, password) {

    const requestOptions = {
        method: 'GET',
        headers: { 'Authorization': "Basic " + base64.encode(userID + ":" + password) }
        // body: JSON.stringify({ userID, password })
    };

    return fetch(SERVER + 'authenticate', requestOptions)
        .then(handleResponse)
        .then(userSession => {
            return userSession
        });
}

function logout() {
    return dispatch => {
        dispatch(getLogOutAction());
    }
}

function handleResponse(response) {
    const authorizationHeader = response.headers.get('Authorization');

    return response.text().then(text => {

        const data = text && JSON.parse(text);
        let token
        if (authorizationHeader) {
            token = authorizationHeader.split(" ")[1]
        }

        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from API
                logout();
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        } else {
            let userSession = {
                user: data,
                accessToken: token
            }
            return userSession
        }
    })
}