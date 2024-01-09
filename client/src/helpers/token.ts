import Cookies from "universal-cookie";

const cookies = new Cookies();
const propertyName = "TOKEN";

export const setToken = (token: string) => {
    cookies.set(propertyName, token, {
        path: "/",
      });      
};

export const getToken = () => {
    return cookies.get(propertyName);
}

export const clearToken = () => {
    cookies.remove(propertyName);
}