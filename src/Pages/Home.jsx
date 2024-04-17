
// import React, { useEffect, useState } from 'react';
// import { Box, Input, Text, Heading, Center, Spinner } from '@chakra-ui/react';
// import Cards from './Card';
// import { getAllPokemon, getPokemon } from './server';

// const Home = () => {
//   const [pokemonData, setPokemonData] = useState([]);
//   const [search, setSearch] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         setLoading(true); // Set loading state to true when fetching data
//         const allPokemon = [];
//         // Fetch data from multiple pages with offsets
//         for (let offset = 0; offset < 30; offset += 10) {
//           const response = await getAllPokemon(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`);
//           const pokemonData = await Promise.all(response.results.map(pokemon => getPokemon(pokemon)));
//           allPokemon.push(...pokemonData);
//         }
//         setPokemonData(allPokemon);
//         setLoading(false); // Set loading state to false when data fetching is complete
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     fetchData();
//   }, []);

//   const filteredPokemon = pokemonData.filter(pokemon => {
//     return pokemon.name.toLowerCase().includes(search.toLowerCase());
//   });

//   return (
//     <Box w='90%' margin='auto'>
//       <br />
//       <Center>
//         <Heading color={'#4285f4'} fontSize='4rem'>
//           Pokemon's Data
//         </Heading>
//       </Center>
//       <br />
//       <Box margin='2rem' display='flex' flexDirection={['column', 'row', 'row', 'row']} gap='10px'>
//         <Text fontSize='1.5rem'> Search Pokemon</Text>
//         <Input type='text'  placeholder='pikachu'  _placeholder={{ opacity: 1, color: 'gray.500' }} width='auto' color='black' bg={'white'} value={search} onChange={(e) => setSearch(e.target.value)} />
//       </Box>
//       <br />
//       {loading ? (
//         <Center>
//           <Spinner size='xl' color='blue.500' />
//         </Center>
//       ) : filteredPokemon.length === 0 && search !== '' ? (
//         <Center>
//           <Text>No Pokemon found matching the search criteria.</Text>
//         </Center>
//       ) : (
//         <Box w='95%' margin={'auto'} display={'grid'} gridTemplateColumns={{ sm: 'repeat(1,1fr)', md: 'repeat(2,1fr)', lg: 'repeat(3,1fr)' }} gap='20px'>
//           {filteredPokemon.map((pokemon, i) => {
//             return <Cards key={i} pokemon={pokemon} />;
//           })}
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Home;

import React, { useEffect, useState } from 'react';
import { Box, Input, Text, Heading, Center, Spinner, Button,Flex } from '@chakra-ui/react';
import Cards from './Card';
import { getAllPokemon, getPokemon } from './server';

const Home = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const totalPages = Math.ceil(pokemonData.length / perPage);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const allPokemon = [];
        for (let offset = 0; offset < 30; offset += 10) {
          const response = await getAllPokemon(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`);
          const pokemonData = await Promise.all(response.results.map(pokemon => getPokemon(pokemon)));
          allPokemon.push(...pokemonData);
        }
        setPokemonData(allPokemon);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

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
  );
};

export default Home;
