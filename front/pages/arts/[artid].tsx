import React from 'react';
import { useRouter } from 'next/router';
import Page from '../../Layouts/Page';
import DetailArt from '../../components/art/DetailArt';
import { fetcher } from 'api/art';
import useSWR from 'swr';
import http from '../../api/http';

function Art() {
  const router = useRouter();
  const { artid } = router.query;

  // const { art, isLoading, isError } = getArt(artid);
  console.log(artid);

  const { data, error } = useSWR(`/art/${artid}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  console.log(data);
  return (
    <Page>
      <DetailArt {...data} />
    </Page>
  );
}

export default Art;
