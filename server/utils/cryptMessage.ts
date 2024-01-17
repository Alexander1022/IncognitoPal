import CryptoJS from "crypto-js";

export const MessageCrypt = {
    encrypt: (message: string, secret: string) => {
       return CryptoJS.DES.encrypt(message, secret).toString(); 
    },

    decrypt: (message: string, secret: string) => {
        return CryptoJS.DES.decrypt(message, secret).toString(CryptoJS.enc.Utf8);
    },
};

export default MessageCrypt;