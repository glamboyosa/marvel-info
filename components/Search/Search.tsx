import React, {useEffect, useRef, useState} from 'react';
import Toastify from 'toastify-js';
import {getHeroes} from '../../libs/helpers/services';
import {SearchProps} from '../../libs/types/search';
import {CardSearch} from '../Card/card.style';
import {Center} from '../utils/utils.style';

const Search = ({updateCharacters}: SearchProps) => {
  // search
  const [search, setSearch] = useState('');
  const searchRef = useRef<HTMLInputElement>(null!);

  // useEffect for search functionality. to try reduce spamming HTTP requests on every keystroke

  useEffect(() => {
    setTimeout(() => {
      // if the input is empty
      if (!search.length && !searchRef.current.value.length) {
        updateCharacters();
      } else if (search === searchRef.current.value) {
        getHeroes(process.env.NEXT_PUBLIC_MARVEL_API_KEY!, '0', search)
          .then(resp => {
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
              !resp.data.results.length &&
                Toastify({
                  text: `Unable to find superhero. Consider adding a hyphen or shortening search 👍🏿`,
                  duration: 3000,
                  close: true,
                  gravity: 'top',
                  position: 'center',
                  backgroundColor: '#f00',
                  stopOnFocus: true,
                }).showToast();
              updateCharacters(resp.data.results);
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
  }, [search, searchRef, updateCharacters]);
  return (
    <Center>
      <CardSearch
        type="text"
        placeholder="Search Character"
        onChange={e => setSearch(e.target.value)}
        ref={searchRef}
      />
    </Center>
  );
};

export default Search;
