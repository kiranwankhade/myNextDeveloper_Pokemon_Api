import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Text, Heading, Image, Badge, Flex, Spinner, Button  } from '@chakra-ui/react';
import { FaLongArrowAltLeft } from 'react-icons/fa';

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
    <Box color="#333" py="4">
       <Box  mb="1rem" display="flex" alignItems="center" justifyContent="space-between">
       <Link to="/" style={{ textDecoration: "none", color: "#4285f4" }}>
        <Button
        color="white"
        fontSize="1rem"
        bgColor='transparent'
        ml="2rem"
        display="flex"
        alignItems="center"
        _hover={{
          backgroundColor: "#427e90",
          color:'white'
        }}
        padding='0.5rem'
        fontFamily='cursive'
      >
        <FaLongArrowAltLeft style={{ marginRight: "0.5rem" }} />
        Back
        
      </Button>
        </Link>
        <Heading  fontSize={["1.1rem","2rem","2rem","3rem"]} fontFamily='cursive' color="#4285f4">
          Pokemon {pokemon.name} Details
        </Heading>
        <Box></Box> 
      </Box>
      {loading ? ( 
        <Flex justifyContent="center" alignItems="center" height="70vh">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <Box fontFamily='cursive' width="80%" margin="auto" mt="2rem" display="flex" flexDirection={['column', 'column', 'row', 'row']} justifyContent="center" alignItem="center" gap="2rem">
          <Image width={["100%","80%","80%","80%"]} height={["50vh","60vh","60vh","70vh"]} borderRadius="10px" src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`} alt={pokemon.name} />
          <Box width={["100%","80%","80%","80%"]} textAlign="justify">
            <Text fontSize={["1.2rem","1.2rem","1.2rem","1.5rem"]} fontWeight="bold" color="white" mt="1rem" mb={'0.5rem'}>Pokemon Name: <Text as='span' color='#c662a5'>{pokemon.name}</Text></Text>
            
            <Text fontSize={["1.2rem","1.2rem","1.2rem","1.5rem"]}  fontWeight="bold" color="white" mb={'0.5rem'}>Pokemon Order: <Text as='span' color='#c662a5'>#{pokemon.order}</Text></Text>
            <Flex alignItem='center' gap='2.5rem' mb={'0.5rem'}>
            <Text fontSize={["1.2rem","1.2rem","1.2rem","1.5rem"]} fontWeight="bold" color="white">Pokemon Types:</Text>
            <Flex justifyContent="justify" mt="1rem" mb="1rem">
              {pokemon?.types?.map((type, index) => (
                <Badge fontSize={["1rem","1rem","1rem","1.2rem"]} key={index} variant="outline"  color='#c662a5'  mx="0.5rem">{type.type.name}</Badge>
              ))}
            </Flex>
            </Flex>
            <Flex mb={'0.5rem'} alignItem='center' gap={["0rem", "2.5rem", "2rem", "2rem"]}>
            <Text fontSize={["1.2rem","1.2rem","1.2rem","1.5rem"]} fontWeight="bold" color="white">Pokemon Abilities:</Text>
            
              <Flex flexDirection='column' gap={['0rem','1rem','1rem','1rem']}>
                {pokemon?.abilities?.map((ability, index) => (
                
                <Text
                    fontSize={{ base: "1.2rem", md: "1.5rem" }}
                    color='#c662a5' // Set color
                    textAlign='justify'
                >
                    {index+1}. {ability.ability.name}
                </Text>
                ))}
              </Flex>
            
            </Flex>
            
            <Text mb={'0.5rem'} fontSize={["1.2rem","1.2rem","1.2rem","1.5rem"]}  fontWeight="bold" color="white" >Pokemon Base Experience:  <Text as='span' color='#c662a5'>{pokemon.base_experience}</Text></Text>
            <Text mb={'0.5rem'} fontSize={["1.2rem","1.2rem","1.2rem","1.5rem"]}  fontWeight="bold" color="white">Pokemon Height: <Text as='span' color='#c662a5'>{pokemon.height}</Text></Text>
            <Text mb={'0.5rem'} fontSize={["1.2rem","1.2rem","1.2rem","1.5rem"]}  fontWeight="bold" color="white">Pokemon Weight: <Text as='span' color='#c662a5'>{pokemon.weight}</Text></Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DetailsPage;
