import React, { useEffect, useState } from 'react';
import { Box, Input, Text, Heading, Center, Spinner, Button, Flex } from '@chakra-ui/react';
import Cards from './Card';

const Home = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const totalPages = Math.ceil(pokemonData.length / perPage);

  const getDailyOffset = () => {
    // Check the date and get random pokemon
    // const today = new Date().toISOString().slice(0, 10);
    const today = "2024-04-22";//testing
    const storedDate = localStorage.getItem('date');
    if (storedDate !== today) {
      // Generate a random offset every new day
      const randomOffset = Math.floor(Math.random() * 5) * 5; // Random offset among 0, 5,10,15,20,25,30
      localStorage.setItem('offset', randomOffset);
      localStorage.setItem('date', today);
      return randomOffset;
    }
    return parseInt(localStorage.getItem('offset'), 10);
  };


useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const offset = getDailyOffset();
        const allPokemon = [];
        for (let i = 0; i < 5; i++) {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset + i * 10}&limit=10`);
          const data = await response.json();
          const pokemonData = await Promise.all(data.results.map(pokemon => fetchPokemon(pokemon.url)));
          allPokemon.push(...pokemonData);
        }
        setPokemonData(allPokemon);
        setCurrentPage(1); // Reset to first page on new data fetch
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const fetchPokemon = async (url) => {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const filteredPokemon = pokemonData.filter(pokemon => {
    return pokemon.name.toLowerCase().includes(search.toLowerCase());
  });

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const visiblePokemon = filteredPokemon.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <Box w='90%' margin='auto'>
      <Box w='90%' margin='auto'>
      <br />
      <Center>
        <Heading color={'#4285f4'} fontSize='4rem'>
          Pokemon's Data
        </Heading>
      </Center>
      <br />
      <Box margin='2rem' display='flex' flexDirection={['column', 'row', 'row', 'row']} gap='10px'>
        <Text fontSize='1.5rem'> Search Pokemon</Text>
        <Input type='text' placeholder='pikachu' _placeholder={{ opacity: 1, color: 'gray.500' }} width='auto' color='black' bg={'white'} value={search} onChange={(e) => setSearch(e.target.value)} />
      </Box>
      <br />
      {loading ? (
        <Center>
          <Spinner size='xl' color='blue.500' />
        </Center>
      ) : filteredPokemon.length === 0 && search !== '' ? (
        <Center>
          <Text>No Pokemon found matching the search criteria.</Text>
        </Center>
      ) : (
        <>
          <Box w='95%' margin={'auto'} display={'grid'} gridTemplateColumns={{ sm: 'repeat(1,1fr)', md: 'repeat(2,1fr)', lg: 'repeat(3,1fr)' }} gap='20px'>
            {visiblePokemon.map((pokemon, i) => {
              return <Cards key={i} pokemon={pokemon} />;
            })}
          </Box>
          <Flex mt={4} flexDirection='row' justifyContent='center' alignItem='center' gap='30px'>
            <Button colorScheme="blue" isDisabled={currentPage === 1} onClick={handlePrevPage} mr={2}>
              Previous
            </Button>
            <Text> {currentPage}</Text>
            <Button colorScheme="blue" isDisabled={currentPage === totalPages} onClick={handleNextPage}>
              Next
            </Button>
          </Flex>
        </>
      )}
    </Box>
    </Box>
  );
};

export default Home;
