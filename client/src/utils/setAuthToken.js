import axios from "axios";
//Applies authorization token to every request while logged in, else deletes headers
const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};
export default setAuthToken;
