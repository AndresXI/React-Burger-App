import axios from 'axios'; 

const instance = axios.create({
   baseURL: 'https://react-burger-app-d3a03.firebaseio.com/'
}); 

export default instance; 


