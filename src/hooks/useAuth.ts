import axios from "axios"

export const useRefresh = async () => {
  try {
    const refresh_token = localStorage.getItem('refreshToken');  
    const response = await axios.post('http://188.166.57.73:8001/api/token/refresh/', {refresh: refresh_token});
    
    localStorage.setItem('accessToken', response.data.access);
  } catch (error) {
    console.error('Error refreshing token', error);
    throw error;
  }
}