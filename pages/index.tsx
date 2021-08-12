import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { Button } from '../components/Button/button.style';
import {
  Card,
  CardBottom,
  CardImage,
  CardInfo,
  CardLine,
  CardsContainer,
  CardSearch,
  CardTitle
} from '../components/Card/card.style';
import Link from '../components/utils/Link';
import { Center, Container, Loading } from '../components/utils/utils.style';
import { getHeroes } from '../libs/helpers/services';
import { result } from '../libs/types/characters';
const Home: NextPage = () => {
  const [characters, setCharacters] = useState<result[] | null>(null!);
  const [loading, setLoading] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [cnt, setCnt] = useState(0);
  // this ref contains current character data, the full list fetched
  // we always have a 'snapshot' of the full + paginated characters
  const charactersRef = useRef<result[] | null>(null);
  const [offset, setOffset] = useState('20');
  // search
  const [search, setSearch] = useState('');
  const searchRef = useRef<HTMLInputElement>(null!);

  console.log(searchRef.current?.value);
  console.log(search);
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
          charactersRef.current = resp.data.results;
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

  // useEffect for search functionality. to try reduce spamming HTTP requests on every keystroke

  useEffect(() => {
    setTimeout(() => {
      // if the input is empty
      if (!search.length && !searchRef.current.value.length) {
        setCharacters(charactersRef.current);
      } else if (search === searchRef.current.value) {
        console.log('sfeefef');
        getHeroes(process.env.NEXT_PUBLIC_MARVEL_API_KEY!, '0', search)
          .then(resp => {
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
              setSearch('');
            }
          })
          .catch(e => {
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
      }
    }, 2000);
  }, [search, searchRef]);
  return (
    <Container>
      <Head>
        <title>Marvel&#39;s Greatest Heros</title>
      </Head>
      <Center>
        <CardSearch
          type="text"
          placeholder="Search Character"
          onChange={e => setSearch(e.target.value)}
          ref={searchRef}
        />
      </Center>
      {characters?.length && !loading ? (
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

export default Home;
