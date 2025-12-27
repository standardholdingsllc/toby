import type { AppProps } from 'next/app';
import { AppProvider } from '@/context/AppContext';
import Layout from '@/components/Layout';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  );
}

