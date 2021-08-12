import type {GetServerSideProps, NextPage} from 'next';
import Head from 'next/head';
import {useEffect, useState} from 'react';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import {useRouter} from 'next/router';
import CharactersHeader from '../../components/Header/CharacterHeader/CharacterHeader';
import {
  Center,
  CloseButton,
  Container,
  Heading,
  Line,
} from '../../components/utils/utils.style';
import {getHeroesComics} from '../../libs/helpers/services';
import {Modal} from '../../components/utils/modal.style';

const CharactersPage: NextPage = () => {
  const {query} = useRouter();
  const [showModal, setShowModal] = useState(false);
  console.log(query);
  const {id, img, name} = query;
  useEffect(() => {
    getHeroesComics(process.env.NEXT_PUBLIC_MARVEL_API_KEY!, id as string)
      .then(resp => console.log(resp))
      .catch(e => console.log(JSON.stringify(e)));
  }, [id]);
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>

      <CharactersHeader characterImgURL={img as string} characterTitle={name as string} />

      <Modal showModal={showModal}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2,1fr)'}}>
          <CloseButton onClick={() => setShowModal(false)} />
        </div>
      </Modal>
      <Center>
        <Line />
      </Center>
      <Container>
        <Heading>Comics</Heading>
      </Container>
    </>
  );
};

export default CharactersPage;
