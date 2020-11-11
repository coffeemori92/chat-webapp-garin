import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';

import GlobalStyle from '../styles/GlobalStyle';

const App = ({ Component }: AppProps) => {
  return (
    <>
      <Head>
        <title>GARIN</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <GlobalStyle />
      <Component />
    </>
  );
};

export default App;