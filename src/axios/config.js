import axios from "axios";
const urlLocal ="https://localhost:7282/api/"
const urlServer = ""

const blogFetch = axios.create({
    baseURL: urlLocal ,
    headers:{"Content-Type": "application/json"}
});
export default blogFetch;
