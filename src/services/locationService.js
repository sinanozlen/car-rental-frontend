import axios from 'axios';

const API_URL = 'http://localhost:5000/api/Locations';  // Backend API URL

const getAllLocations = () => {
    return axios.get(API_URL);
};

export default {
    getAllLocations
};
