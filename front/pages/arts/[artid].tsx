import { useRouter } from 'next/router';
import useSWR from 'swr';
import Page from 'Layouts/Page';
import DetailArt from 'components/art/DetailArt';
import { fetcher } from 'api/art';

function Art() {
  const router = useRouter();
  const { artid } = router.query;

  const { data, error } = useSWR(`/art/${artid}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Page title="Art Detail">
      <DetailArt {...data} />
    </Page>
  );
}

export default Art;
