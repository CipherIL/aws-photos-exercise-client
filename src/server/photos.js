import axios from 'axios';
const serverDomain = "http://localhost";
const port = "8080";
const serverURL = `${serverDomain}:${port}`;

export const getPhotos = async () => {
    try {
        const response = await axios.get(serverURL + '/photos/get');
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export const uploadPhoto = async (formData) => {
    try {
        const response = await axios.post(serverURL + '/photos/upload',formData);
        return response.data;
    } catch (err) {
        console.log(err)
    }
}