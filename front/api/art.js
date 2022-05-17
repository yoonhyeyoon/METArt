import useSWR from 'swr';
import http from './http';

export const fetcher = (url) => http.get(url).then((res) => res.data);

export const getArtList = () => {
  const { data, error } = useSWR(`/art`, fetcher);

  return {
    artList: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const imageUploadAPI = (data) => http.post('/image', data);

export const createArtAPI = (data) => {
  console.log(data);
  return http.post('/art', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// export const getArt = (artid) => {
//   const id = String(artid);
//   const { data, error } = useSWR(`/art/${id}`, fetcher);

//   return {
//     art: data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// };
