import axios from 'axios';

export const api = axios.create({ baseURL: '/api/' });
export const judge = axios.create({
  baseURL: 'https://' + process.env.REACT_APP_RAPIDAPI_HOST,
  headers: {
    'X-RapidAPI-Host': process.env.REACT_APP_RAPIDAPI_HOST,
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
  },
});
