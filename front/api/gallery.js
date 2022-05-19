import http from './http';
import { fetcher } from './art';
import useSWR from 'swr';

export const getProfileAPI = (address) => {
  const { data, error } = useSWR(`/user/${address}`, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const getGalleryArtAPI = (address) => {
  const { data, error } = useSWR(`/user/${address}/arts?size=90`, fetcher);

  return {
    data: data,
    artList: data && data.content,
    isLoad: !error && !data,
    isErr: error,
  };
};

export const getGalleryBuyAPI = (address) => {
  const { data, error } = useSWR(`/user/${address}/my-arts?size=90`, fetcher);

  return {
    data: data,
    buyList: data && data.content,
    isLoading: !error && !data,
    isError: error,
  };
};

export const getPopularGalleryListAPI = () => {
  const { data, error } = useSWR(`/main/popular`, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
