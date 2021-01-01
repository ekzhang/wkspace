import axios from 'axios';

export const api = axios.create({ baseURL: '/api/' });
export const judge = axios.create({
  baseURL: 'https://judge0-ce.p.rapidapi.com/',
  headers: {
    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY
  }
});
