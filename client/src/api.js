import axios from 'axios';

export const api = axios.create({ baseURL: '/api/' });
export const judge = axios.create({ baseURL: 'https://api.judge0.com/' });
