import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';

import wrapper from '../store/cofigureStore';
import GlobalStyle from '../styles/GlobalStyle';

const App = ({ Component }: AppProps) => {
  return (
    <>
      <Head>
        <title>GARIN</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap" rel="stylesheet" />
      </Head>
      <GlobalStyle />
      <Component />
    </>
  );
};

export default wrapper.withRedux(App);