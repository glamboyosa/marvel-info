import type {NextPage} from 'next';
import Head from 'next/head';
import {Button} from '../components/Button/button.style';
import CharactersHeader from '../components/Header/CharacterHeader/CharacterHeading';

const Home: NextPage = () => {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Head>
        <title>Marvel&#39;s Greatest Heros</title>
      </Head>

      <CharactersHeader
        characterImgURL="https://www.seekpng.com/png/detail/435-4357026_black-widow-avengers-black-widow-cartoon.png"
        characterTitle="Black Widow"
      />
    </div>
  );
};

export default Home;
