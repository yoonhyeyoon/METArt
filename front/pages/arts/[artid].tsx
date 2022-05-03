import React from 'react';
import { useRouter } from 'next/router';
import Page from '../../Layouts/Page';
import DetailArt from '../../components/arts/DetailArt';

function Art() {
  const router = useRouter();
  const { artid } = router.query;

  return (
    <Page>
      <DetailArt />
    </Page>
  );
}

export default Art;
