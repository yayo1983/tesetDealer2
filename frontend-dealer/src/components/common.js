import axios from 'axios';
import { addLocale } from 'primereact/api';

addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    today: 'Hoy',
    clear: 'Limpiar'
});

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

