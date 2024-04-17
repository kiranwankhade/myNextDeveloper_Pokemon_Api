import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Text, Heading, Image, Badge, Flex, Spinner } from '@chakra-ui/react';

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
    <Box bg="#f8f8f8" color="#333" minHeight="100vh" py="4">
      <Heading as="h1" textAlign="center" fontSize="4rem" fontFamily='cursive' color="#4285f4">
        Pokemon {pokemon.name} Details
      </Heading>
      {loading ? ( // Conditional rendering of loader while data is being fetched
        <Flex justifyContent="center" alignItems="center" height="70vh">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <Box fontFamily='cursive' width="80%" margin="auto" mt="1rem" display="flex" flexDirection={['column', 'row', 'row', 'row']} justifyContent="center" alignItem="center" gap="2rem">
          <Image width="60%" height="70vh" borderRadius="10px" src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} alt={pokemon.name} />
          <Box width="80%" textAlign="justify">
            <Text fontSize="2rem" fontWeight="bold" color="#427e90" mt="1rem">Pokemon Name: {pokemon.name}</Text>
            <Text fontSize="1.5rem" fontWeight="bold" color="#427e90">Pokemon Order: #{pokemon.order}</Text>
            <Text fontSize="1.5rem" fontWeight="bold" color="#427e90">Pokemon Types:</Text>
            <Flex justifyContent="justify" mt="1rem" mb="1rem">
              {pokemon?.types?.map((type, index) => (
                <Badge key={index} variant="outline" colorScheme="blue" fontSize="1.2rem" mx="0.5rem">{type.type.name}</Badge>
              ))}
            </Flex>
            <Text fontSize="1.5rem" fontWeight="bold" color="#427e90">Pokemon Abilities:</Text>
            <ul style={{ margin: '1rem' }}>
              {pokemon?.abilities?.map((ability, index) => (
                <li key={index} style={{ fontSize: '1.5rem' }}>{ability.ability.name}</li>
              ))}
            </ul>
            <Text fontSize="1.5rem" fontWeight="bold" color="#427e90">Pokemon Base Experience: {pokemon.base_experience}</Text>
            <Text fontSize="1.5rem" fontWeight="bold" color="#427e90">Pokemon Height: {pokemon.height}</Text>
            <Text fontSize="1.5rem" fontWeight="bold" color="#427e90">Pokemon Weight: {pokemon.weight}</Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DetailsPage;
