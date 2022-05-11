import '../styles/globals.css';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { RecoilRoot } from 'recoil';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
