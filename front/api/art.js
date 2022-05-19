import useSWR from 'swr';
import http from './http';

export const fetcher = (url) => http.get(url).then((res) => res.data);

export const getArtList = (pageIndex) => {
  const { data, error } = useSWR(`/art?page=${pageIndex}`, fetcher);

  return {
    data: data,
    artList: data && data.content,
    isLoading: !error && !data,
    isError: error,
  };
};

export const getSearchArtListAPI = (search) => {
  // console.log(search);
  return http.get(`/art?name=${search.name}&?size=90`);
};

export const imageUploadAPI = (data) => http.post('/image', data);

export const createArtAPI = (data) =>
  http.post('/art', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const createSaleAPI = (data) => http.post('/sale', data);

export const cancelSaleAPI = (data, saleId) =>
  http.put(`/sale/${saleId}/cancel`, data);

export const purchaseSaleAPI = (data, saleId) =>
  http.put(`/sale/${saleId}/purchase`, data);

export const getNewArtList = () => {
  const { data, error } = useSWR(`/main/new`, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
