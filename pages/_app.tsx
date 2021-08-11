import GlobalStyles from '../styles/globalStyles';
import type {AppProps} from 'next/app';
import {Header, HeaderImage} from '../components/Header/header.style';
import marvelLogo from '../public/marvel.png';
import Head from 'next/head';
function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyles />
      <Header>
        <HeaderImage
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2560px-Marvel_Logo.svg.png"
          alt="The Marvel Logo"
        />
      </Header>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
