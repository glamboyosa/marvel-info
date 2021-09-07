import type {NextPage} from 'next';
import {NextSeo} from 'next-seo';
import Head from 'next/head';
import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import {ComicResult} from '../..//libs/types/comics';
import {Button} from '../../components/Button/button.style';
import {
  Card,
  CardBottom,
  CardImage,
  CardInfo,
  CardsContainer,
  CardTitle,
} from '../../components/Card/card.style';
import CharactersHeader from '../../components/Header/CharacterHeader/CharacterHeader';
import {
  Modal,
  ModalContent,
  ModalContentDescritption,
  ModalContentImage,
  ModalTitle,
} from '../../components/utils/modal.style';
import {
  Center,
  CloseButton,
  Container,
  Heading,
  Line,
  Loading,
} from '../../components/utils/utils.style';
import {getHeroesComics} from '../../libs/helpers/services';
const CharactersPage: NextPage = () => {
  const {query} = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [modalLink, setModalLink] = useState('');
  const [characterComics, setCharacterComics] = useState<ComicResult[] | null>(null!);
  const [loading, setLoading] = useState(true);
  const {id, img, name} = query;

  // pass in the clicked elements title, image path and description to render in the modal
  const showModalHandler = (
    title: string,
    img: string,
    description: string,
    url: string,
  ) => {
    setShowModal(true);
    setModalTitle(title);
    setModalImage(img);
    setModalDescription(description);
    setModalLink(url);
  };
  // set back to defaults
  const closeModalHandler = () => {
    setShowModal(false);
    setModalTitle('');
    setModalImage('');
    setModalDescription('');
    setModalLink('');
  };
  const renderImages = () => {
    console.log(window.scrollY);
    if (window.scrollY >= 100) {
      const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('.images');

      images.forEach(async (image, index) => {
        console.log(image.dataset.src);

        if (image.complete) {
          image.src = image.dataset.src!;
          console.log(`image at ${index} has fully loaded`);
        }
      });
    }
  };
  // useEffect for image logic
  useEffect(() => {
    document.addEventListener('scroll', renderImages);
  }, []);
  useEffect(() => {
    if (id) {
      getHeroesComics(process.env.NEXT_PUBLIC_MARVEL_API_KEY!, id as string)
        .then(resp => {
          setLoading(false);
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
            setCharacterComics(resp.data.results);
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
    }
  }, [id]);
  return (
    <>
      <NextSeo
        title="Marvel's Greatest Heros 🚀"
        description="One stop place for finding comics of your favourite Marvel heros ⚡️"
        canonical="https://static.posters.cz/image/750/posters/marvel-universe-i31869.jpg"
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
      <Head>
        <title>{name}</title>
      </Head>

      <CharactersHeader characterImgURL={img as string} characterTitle={name as string} />

      <Modal showModal={showModal}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2,1fr)'}}>
          <CloseButton onClick={closeModalHandler} />
        </div>
        <ModalTitle>{modalTitle}</ModalTitle>
        <ModalContent>
          <ModalContentImage src={modalImage} />
          <ModalContentDescritption>
            {modalDescription ? modalDescription : 'Description not provided 😥'}
          </ModalContentDescritption>
          <Center>
            <a style={{textDecoration: 'none'}} href={modalLink}>
              <Button>Read Comic</Button>
            </a>
          </Center>
        </ModalContent>
      </Modal>
      <Center>
        <Line />
      </Center>
      <Container>
        <Heading>Comics</Heading>

        {characterComics?.length && !loading ? (
          <CardsContainer>
            {characterComics.map(el => (
              <Card
                key={el.id}
                style={{marginTop: '6rem'}}
                onClick={() =>
                  showModalHandler(
                    el.title,
                    `${el.thumbnail.path}.${el.thumbnail.extension}`,
                    el.description,
                    el.urls[0].url,
                  )
                }>
                <CardImage
                  className="images"
                  src="https://ik.imagekit.io/demo/img/image8.jpeg?tr=w-400,h-300,bl-30,q-50"
                  data-src={`${el.thumbnail.path}.${el.thumbnail.extension}`}
                />
                <CardBottom home={false}>
                  <CardTitle style={{color: '#000', fontSize: '2rem', marginTop: '1rem'}}>
                    {el.title}
                  </CardTitle>
                  <CardInfo
                    style={{
                      color: '#000',
                      fontSize: '1.2rem',
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      flexWrap: 'wrap',
                      marginBottom: '5rem',
                    }}>
                    {/* ;ogic for displaying creators last names only */}
                    {el.creators.items
                      .map(el => {
                        return el.name.split(' ')[el.name.split(' ').length - 1];
                      })
                      .map(el => (
                        <p key={el}>{el} , </p>
                      ))}
                  </CardInfo>
                </CardBottom>
              </Card>
            ))}
          </CardsContainer>
        ) : (
          <Center>
            <Loading>👁</Loading>
          </Center>
        )}
      </Container>
    </>
  );
};

export default CharactersPage;
