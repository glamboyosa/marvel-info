import type {AppProps} from 'next/app';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {DefaultSeo} from 'next-seo';
import {Header, HeaderImage} from '../components/Header/header.style';
import GlobalStyles from '../styles/globalStyles';
function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();

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
      <DefaultSeo
        openGraph={{
          url: 'https://marvel-info.vercel.app',
          title: "Marvel's Greatest Heros 🚀",
          description:
            'One stop place for finding comics of your favourite Marvel heros ⚡️',
          images: [
            {
              url: 'https://static.posters.cz/image/750/posters/marvel-universe-i31869.jpg',
              width: 800,
              height: 600,
              alt: 'Kickass Marvel Poster!',
            },
          ],
        }}
      />
      <Header>
        <HeaderImage
          onClick={() => router.push('/')}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2560px-Marvel_Logo.svg.png"
          alt="The Marvel Logo"
        />
      </Header>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
