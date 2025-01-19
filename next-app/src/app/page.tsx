// src/pages/_app.tsx
'use client'
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apolloClient';
import Home from './home';
import { AppProps } from 'next/app';
import StringsProvider from './context/StringsProvider';

function App({
  Component,
  pageProps }: AppProps) {

  return (
    <ApolloProvider client={client}>
      <StringsProvider>
        <Home />
      </StringsProvider>
    </ApolloProvider>
  );
}

export default App;



