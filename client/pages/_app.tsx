import React from 'react';
import { AppProps } from 'next/app';
import { SelectedItemProvider } from '../components/SelectedItemContext'; // Import the provider


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SelectedItemProvider>
      <Component {...pageProps} />
    </SelectedItemProvider>
  );
}