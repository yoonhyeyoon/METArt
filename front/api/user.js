import http from './http';
import { fetcher } from './art';
import useSWR from 'swr';

export const getUserInfoAPI = (address) => http.get(`/user/${address}`);

export const createUserAPI = (address) => http.post('/user', { address });

export const getUserListAPI = () => {
  const { data, error } = useSWR(`/user`, fetcher);

  return {
    data: data,
    userList: data && data.content,
    isLoading: !error && !data,
    isError: error,
  };
};
