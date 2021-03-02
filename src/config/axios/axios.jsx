import axios from 'axios';
import Cookies from "js-cookie";
let token = Cookies.get('token');
axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export default axios