import axios from "axios";

const baseURL = "http://192.168.1.84:8000";

const client = axios.create({ baseURL });

export default client;
