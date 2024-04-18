import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Text, Heading, Image, Badge, Flex, Spinner, Button  } from '@chakra-ui/react';

const DetailsPage = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(true);

  const getData = async (id) => {
    setLoading(true); // Set loading state to true when fetching data
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let data1 = await response.json();
    setPokemon(data1);
    setLoading(false); // Set loading state to false when data fetching is complete
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  return (
    <Box bgColor='#1a202c' color="#333" minHeight="100vh" py="4">
       <Box  pb="1rem" mb="2rem" display="flex" alignItems="center" justifyContent="space-between">
        <Link to="/" style={{ textDecoration: 'none', color: '#4285f4' }}>
          <Button m='1rem' bgColor='#4285f4' color='white' size="md" _hover={{
            bgColor:'#4285f4'
          }}>Back</Button>
        </Link>
        <Heading as="h1" fontSize="4rem" fontFamily='cursive' color="#4285f4">
          Pokemon {pokemon.name} Details
        </Heading>
        <Box></Box> 
      </Box>
      {loading ? ( // Conditional rendering of loader while data is being fetched
        <Flex justifyContent="center" alignItems="center" height="70vh">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <Box fontFamily='cursive' width="80%" margin="auto" mt="1rem" display="flex" flexDirection={['column', 'row', 'row', 'row']} justifyContent="center" alignItem="center" gap="2rem">
          <Image width="60%" height="70vh" borderRadius="10px" src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} alt={pokemon.name} />
          <Box width="80%" textAlign="justify">
            <Text fontSize="2rem" fontWeight="bold" color="white" mt="1rem">Pokemon Name: <Text as='span' color='#c662a5'>{pokemon.name}</Text></Text>
            <Text fontSize="1.5rem" fontWeight="bold" color="white">Pokemon Order: <Text as='span' color='#c662a5'>#{pokemon.order}</Text></Text>
            <Text fontSize="1.5rem" fontWeight="bold" color="white">Pokemon Types:</Text>
            <Flex justifyContent="justify" mt="1rem" mb="1rem">
              {pokemon?.types?.map((type, index) => (
                <Badge key={index} variant="outline"  color='#c662a5' fontSize="1.2rem" mx="0.5rem">{type.type.name}</Badge>
              ))}
            </Flex>
            <Flex  alignItem='center' gap='2.5rem'>
            <Text fontSize="1.5rem" fontWeight="bold" color="white">Pokemon Abilities:</Text>
            <ul >
              {pokemon?.abilities?.map((ability, index) => (
                <li key={index} style={{ fontSize: '1.5rem',color:'#c662a5'  }}>{ability.ability.name}</li>
              ))}
            </ul>
            </Flex>
            <Text fontSize="1.5rem" fontWeight="bold" color="white">Pokemon Base Experience:  <Text as='span' color='#c662a5'>{pokemon.base_experience}</Text></Text>
            <Text fontSize="1.5rem" fontWeight="bold" color="white">Pokemon Height: <Text as='span' color='#c662a5'>{pokemon.height}</Text></Text>
            <Text fontSize="1.5rem" fontWeight="bold" color="white">Pokemon Weight: <Text as='span' color='#c662a5'>{pokemon.weight}</Text></Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DetailsPage;
