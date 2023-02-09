const axios = require("axios");
// axios.default.headers.common["X-Requested-With"] = "XMLHttpRequest";

class Api {
    axios = null;
    baseUrl = 'http://127.0.0.1:8000/api/';
    constructor(baseURL) {
        this.baseURL = baseURL;

        this.axios = axios.create({
            baseURL: `${baseURL}/api`,
            timeout: 10000,
            withCredentials: true,
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                //"X-CSRF-TOKEN": bbm.csrfToken,
            },
            responseType: "json",
        });

        this.axios.interceptors.response.use(
            this.handleSuccess,
            this.handleFailed
        );

        this.getCsrfToken();
    }

    getCsrfToken = async () => {
        await this.axios.get(this.baseUrl + "/sanctum/csrf-cookie");
    };

/*     serveRequest = async (axiosPromise) => {
        const { error, response } = await axiosPromise;

        if (response) {
            if (response.data) {
                if (response.data.redirect || response.redirect) {
                    window.open(
                        response.data.redirect ?? response.redirect,
                        "_self"
                    );
                }
            }
        }

        if (!error) {
            const data = response.data ? response.data.data ?? null : null;
            return [data, response.data ?? response];
        }

        return [null, response.data ?? response];
    }; */

    get = async (endpoint, data) => {
        // const dataToSend = this.prepareRequestData(data);
        return await this.serveRequest(
            this.axios.get(endpoint, data ? { params: data } : null)
        );
    };

    post = async (endpoint, data) => {
        const dataToSend = this.prepareRequestData(data);
        // return ;
        return await this.serveRequest(this.axios.post(endpoint, dataToSend));
    };

    put = async (endpoint, data) => {
        const dataToSend = this.prepareRequestData(data);
        return await this.serveRequest(this.axios.put(endpoint, dataToSend));
    };

    patch = async (endpoint, data) => {
        const dataToSend = this.prepareRequestData(data);
        return await this.serveRequest(this.axios.patch(endpoint, dataToSend));
    };

    delete = async (endpoint, data) => {
        const dataToSend = this.prepareRequestData(data);
        return await this.axios.delete(endpoint, { data: dataToSend });
    };
}

export default Api;
