import http from './http';
import { fetcher } from './art';
import useSWR from 'swr';

export const getUserInfoAPI = (address) => http.get(`/user/${address}`);

export const createUserAPI = (address) => http.post('/user', { address });

export const updateUserAPI = (address, data) => {
  // console.log(address, data);
  return http.put(`/user/${address}`, data);
};

export const getUserListAPI = () => {
  const { data, error } = useSWR(`/user?size=90`, fetcher);

  return {
    data: data,
    userList: data && data.content,
    isLoading: !error && !data,
    isError: error,
  };
};

export const getSearchUserListAPI = (search) => {
  // console.log(search);
  return http.get(`/user?name=${search.name}&size=90`);
};
