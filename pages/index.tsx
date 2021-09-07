import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next';
import Head from 'next/head';
import React, {useEffect, useRef, useState} from 'react';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import {Button} from '../components/Button/button.style';
import {
  Card,
  CardBottom,
  CardImage,
  CardInfo,
  CardLine,
  CardsContainer,
  CardSearch,
  CardTitle,
} from '../components/Card/card.style';
import Search from '../components/Search/Search';
import Link from '../components/utils/Link';
import {Center, Container, Loading} from '../components/utils/utils.style';
import {getHeroes} from '../libs/helpers/services';
import {result} from '../libs/types/characters';
const Home: NextPage = ({
  results,
  code: errorCode,
  message: errorMessage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [characters, setCharacters] = useState<result[] | null>(results);
  const [code] = useState<string | undefined>(errorCode);
  const [message] = useState<string | undefined>(errorMessage);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [cnt, setCnt] = useState(0);
  // this ref contains current character data, the full list fetched
  // we always have a 'snapshot' of the full + paginated characters
  const charactersRef = useRef<result[] | null>(null);
  const [offset, setOffset] = useState('20');

  const paginationHandler = async () => {
    setPaginationLoading(true);
    if (cnt === 0) {
      const resp = await getHeroes(process.env.NEXT_PUBLIC_MARVEL_API_KEY!, offset);
      setPaginationLoading(false);
      setCharacters(prevResults => prevResults!.concat(resp.data.results));
      charactersRef.current = charactersRef.current!.concat(resp.data.results);
      setCnt(prevCnt => prevCnt + 1);
      setOffset(prevOffset => (parseFloat(prevOffset)! + 20).toString());
    } else {
      const resp = await getHeroes(process.env.NEXT_PUBLIC_MARVEL_API_KEY!, offset);
      setPaginationLoading(false);
      setCharacters(prevResults => prevResults!.concat(resp.data.results));
      charactersRef.current = charactersRef.current!.concat(resp.data.results);
      setCnt(prevCnt => prevCnt + 1);
      setOffset(prevOffset => (parseFloat(prevOffset)! + 20).toString());
    }
  };
  useEffect(() => {
    if (code && message) {
      Toastify({
        text: `${message}`,
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'center',
        backgroundColor: '#f00',
        stopOnFocus: true,
      }).showToast();
    }
  }, [code, message]);

  return (
    <Container>
      <Head>
        <title>Marvel&#39;s Greatest Heros</title>
      </Head>
      <Search
        updateCharacters={characters => {
          characters ? setCharacters(characters) : setCharacters(charactersRef.current);
        }}
      />
      {characters?.length ? (
        <CardsContainer>
          {characters.map(el => (
            <Link
              href={`/characters/${el.id}?name=${el.name}&img=${el.thumbnail.path}.${el.thumbnail.extension}`}
              key={el.id.toString()}>
              <Card>
                <CardImage src={`${el.thumbnail.path}.${el.thumbnail.extension}`} />
                <CardLine />
                <CardBottom home>
                  <CardTitle>{el.name}</CardTitle>
                  <CardInfo>{el.comics.available} comics available.</CardInfo>
                </CardBottom>
              </Card>
            </Link>
          ))}
        </CardsContainer>
      ) : (
        <Loading>Loading...</Loading>
      )}
      <Center>
        {paginationLoading ? (
          <Loading>Loading...</Loading>
        ) : (
          <Button onClick={paginationHandler}>Load More</Button>
        )}
      </Center>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const resp = await getHeroes(process.env.MARVEL_API_KEY!);

  return {
    props: {
      results: resp.data.results,
      code: resp.code,
      message: resp.message,
    },
  };
};
export default Home;
