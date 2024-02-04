import axios from "axios";

const d = new Date().toLocaleDateString();

let axiosInstance = new axios.create({
    baseURL:process.env.REACT_APP_AXIOS_BASE_URL,
    headers:{
        "_date":d
    }
});

export default axiosInstance;