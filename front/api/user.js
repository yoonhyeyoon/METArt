import http from './http';

export const getUserInfoAPI = (address) => http.get(`/user/${address}`);

export const createUserAPI = (address) => http.post('/user', { address });
