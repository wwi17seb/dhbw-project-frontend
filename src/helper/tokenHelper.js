const accessToken = "ExoplanSessionToken";

export const getTokenFromStorage = () => {
    return localStorage.getItem(accessToken);
}