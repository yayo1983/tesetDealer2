import axios from 'axios';

const endPoint = "http://localhost:8000/";

export const get = async (url, data=null) => {
    return await axios.get(endPoint+url, data ? { params: data } : null);
};

export const post = async (endpoint, data) => {
    return await axios.post(endpoint, data);
};

export const put = async (url, data) => {
    return await axios.put(endPoint+url, data);
};

export const patch = async (url, data) => {
    return await axios.patch(endPoint+url, data);
};

