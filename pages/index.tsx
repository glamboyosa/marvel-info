import type {NextPage} from 'next';
import Head from 'next/head';
import React, {useState, useEffect} from 'react';
import {Button} from '../components/Button/button.style';
import {
  Card,
  CardBottom,
  CardImage,
  CardInfo,
  CardsContainer,
  CardTitle,
} from '../components/Card/card.style';
import {getHeroes} from '../libs/helpers/services';
import {result} from '../libs/types/characters';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import {Center, Container, Loading} from '../components/utils/utils.style';
import Link from '../components/utils/Link';
const Home: NextPage = () => {
  const [characters, setCharacters] = useState<result[] | null>(null!);
  const [loading, setLoading] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [cnt, setCnt] = useState(0);

  const [offset, setOffset] = useState('20');

  const paginationHandler = async () => {
    setPaginationLoading(true);
    if (cnt === 0) {
      const resp = await getHeroes(process.env.NEXT_PUBLIC_MARVEL_API_KEY!, offset);
      setPaginationLoading(false);
      setCharacters(prevResults => prevResults!.concat(resp.data.results));
      setCnt(prevCnt => prevCnt + 1);
      setOffset(prevOffset => (parseFloat(prevOffset)! + 20).toString());
    } else {
      const resp = await getHeroes(process.env.NEXT_PUBLIC_MARVEL_API_KEY!, offset);
      setPaginationLoading(false);
      setCharacters(prevResults => prevResults!.concat(resp.data.results));
      setCnt(prevCnt => prevCnt + 1);
      setOffset(prevOffset => (parseFloat(prevOffset)! + 20).toString());
    }
  };
  useEffect(() => {
    getHeroes(process.env.NEXT_PUBLIC_MARVEL_API_KEY!)
      .then(resp => {
        setLoading(false);
        console.log(resp);
        if (resp.code && resp.message) {
          Toastify({
            text: `${resp.message}`,
            duration: 3000,
            close: true,
            gravity: 'top',
            position: 'center',
            backgroundColor: '#f00',
            stopOnFocus: true,
          }).showToast();
        } else {
          setCharacters(resp.data.results);
        }
      })
      .catch(e => {
        setLoading(false);
        Toastify({
          text: `${e.message}`,
          duration: 3000,
          close: true,
          gravity: 'top',
          position: 'center',
          backgroundColor: '#f00',
          stopOnFocus: true,
        }).showToast();
      });
  }, []);
  return (
    <Container>
      <Head>
        <title>Marvel&#39;s Greatest Heros</title>
      </Head>

      {characters && !loading ? (
        <CardsContainer>
          {characters.map(el => (
            <Link href={`/characters/${el.id}`} key={el.id.toString()}>
              <Card>
                <CardImage src={`${el.thumbnail.path}.${el.thumbnail.extension}`} />
                <CardBottom>
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

export default Home;
