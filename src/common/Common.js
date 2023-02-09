import Axios from "axios";
const baseURL = "http://localhost:8000/api/";

Axios.defaults.xsrfHeaderName = "X-CSRFToken";  

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const get = async (endpoint, data=null) => {
    return await Axios.get(baseURL+endpoint, data ? { params: data } : null);
};

const post = async (endpoint, data) => {
    return await Axios.post(baseURL+endpoint, data);
};


const post2 = async (endpoint, objectdata) =>{
    return await fetch(baseURL+endpoint, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(objectdata)
    });

}

const put = async (endpoint, data) => {
    return await Axios.put(baseURL+endpoint, data);
};

const patch = async (endpoint, data) => {
    return await Axios.patch(baseURL+endpoint, data);
};

const ucfirst = (string) => {
    return typeof string === "string"
        ? string.charAt(0).toUpperCase() + string.slice(1)
        : string;
};

const prettyString = (string) => {
    if (typeof string === 'string') {
        string = string.replace(/-/g, " ");
        string = string.replace(/_/g, " ");
        return ucfirst(string);
    }
    return "";
};

const objClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

const roundDecimals = (number, decimals) => {
    const adjustNumber = 10 ^ decimals;
    let secureNumber = number;
    if (typeof secureNumber != "number") {
        secureNumber = parseFloat(secureNumber);
    }
    if (isNaN(secureNumber)) {
        console.error(
            "Number passed to roundDecimals function is not a number: " + number
        );
    }
    return Math.round(secureNumber * adjustNumber) / adjustNumber;
};

const parse = (proxy) => {
    return JSON.parse(JSON.stringify(proxy));
};

const currentTime = () => {
    var today = new Date();
    var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return `${date}_${time}`;
};



export {
    get,
    post,
    post2,
    put,
    parse,
    patch,
    ucfirst,
    objClone,
    currentTime,
    prettyString,
    roundDecimals };