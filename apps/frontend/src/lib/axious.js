import axios from "axios";

axios.defaults.baseURL = import.meta.env.BACKEND_BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.headers = {
  accept : "application/json"
}
export default axios;
