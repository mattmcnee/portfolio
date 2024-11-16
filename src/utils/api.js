import axios from 'axios';
import CryptoJS from 'crypto-js';

export const api = {

    // abstracted axios GET request with HMAC signature
    get: async (url, payload) => {
        try {
            // get the secret key and convert payload to string
            const secretKey = import.meta.env.VITE_API_KEY;
            const paramsPayload = payload.params || payload;

            // sort the payload keys alphabetically
            const orderedPayload = {};
            const sortedKeys = Object.keys(paramsPayload).sort();
            sortedKeys.forEach(key => {
                if (typeof paramsPayload[key] === 'number') {
                    orderedPayload[key] = String(paramsPayload[key]);
                } else {
                    orderedPayload[key] = paramsPayload[key];
                }
            });

            const payloadString = JSON.stringify(orderedPayload);

            // generate HMAC signature
            const hmac = CryptoJS.HmacSHA256(payloadString, secretKey);
            const signature = hmac.toString(CryptoJS.enc.Hex);

            // make the GET request with the signature in the headers
            const response = await axios.get(url, {
                params: orderedPayload,
                headers: {
                    'X-Signature': signature,
                    'Content-Type': 'application/json',
                },
            });

            return response;
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            throw error;
        }
    },

    // abstracted axios POST request with HMAC signature
    post: async (url, payload = {}, responseType = 'json') => {
        try {
            // get the secret key and convert payload to string
            const secretKey = import.meta.env.VITE_API_KEY;
            const paramsPayload = payload.params || payload;
    
            // sort the payload keys alphabetically
            const orderedPayload = {};
            const sortedKeys = Object.keys(paramsPayload).sort();
            sortedKeys.forEach(key => {
                orderedPayload[key] = paramsPayload[key];
            });
    
            // generate HMAC signature
            const payloadString = JSON.stringify(orderedPayload);
            const hmac = CryptoJS.HmacSHA256(payloadString, secretKey);
            const signature = hmac.toString(CryptoJS.enc.Hex);
    
            // make the POST request with the signature in the headers
            const response = await axios.post(url, orderedPayload, {
                responseType: responseType, // default to 'json' if not provided
                headers: {
                    'X-Signature': signature,
                    'Content-Type': 'application/json',
                }
            });
    
            return response;
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            throw error;
        }    
    },
};