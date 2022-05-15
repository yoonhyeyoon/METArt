import useSWR from 'swr';
import http from './http';

const fetcher = (url) => http.get(url).then((res) => res.data);

export const getArtList = () => {
  const { data, error } = useSWR(`/art`, fetcher);

  return {
    artList: data,
    isLoading: !error && !data,
    isError: error,
  };
};
