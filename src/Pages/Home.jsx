import React, { useEffect, useState } from "react";
import {
  Box, Input, Center, Spinner, Button, Image, VStack,
} from "@chakra-ui/react";
import RandomCard from "../Components/RandomCard";
import { useNavigate } from "react-router-dom";
import pokemonImage from "../Assets/pokemon.png";

const Home = () => {
   const [randomPokemon, setRandomPokemon] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [pokemonData, setPokemonData] = useState([]);
  const navigate = useNavigate();

  const fetchAllPokemon = async () => {
    try {
      let allPokemon = [];
      // Loop through offsets from 0 to 30
      for (let offset = 0; offset <= 30; offset += 30) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=30`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        allPokemon = [...allPokemon, ...data.results];
      }
      setPokemonData(allPokemon);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const fetchPokemonByID = async (id) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return null;
    }
  };

  const getRandomPokemon = async () => {
    setLoading(true);
    try {
      const today = new Date().toISOString().slice(0, 10);
      const storedDate = localStorage.getItem("kirandate");
      if (storedDate !== today) {
        const randomId = Math.floor(Math.random() * 898) + 1;
        const pokemon = await fetchPokemonByID(randomId);
        if (pokemon) {
          setRandomPokemon(pokemon);
          localStorage.setItem("randomPokemonId", pokemon.id);
          localStorage.setItem("kirandate", today);
        }
      } else {
        const storedId = localStorage.getItem("randomPokemonId");
        const pokemon = await fetchPokemonByID(storedId);
        if (pokemon) {
          setRandomPokemon(pokemon);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch random Pokemon:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPokemon();
    getRandomPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    setLoading(true);
    const searchWithoutSpaces = search.replace(/\s/g, "");
    const filteredPokemon = pokemonData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchWithoutSpaces.toLowerCase())
    );
    setLoading(false);
    navigate(`/search/${encodeURIComponent(searchWithoutSpaces)}`, {
      state: { filteredPokemon },
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };


  return (
    <Box w="100%" margin="auto" fontFamily='cursive'>
      <Box w="90%" margin="auto">
        <br />
        <Center>
          <Image w={['50%', '50%', '50%', '20%']} src={pokemonImage} alt="Pokemon Logo" />
        </Center>
        <br />
        <Box
          margin={["0.5rem", "1rem", "1rem", "1rem"]}
          display="flex"
          flexDirection={["column", "row", "row", "row"]}
          gap="10px"
          justifyContent='center'
          alignItem='center'
          fontFamily='cursive'
        >
          <Input
            type="text"
            placeholder="Search Pokémon"
            _placeholder={{ opacity: 1, color: "gray.500" }}
            width="auto"
            color="black"
            bg={"white"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button colorScheme="blue" onClick={handleSearch}>
            Search
          </Button>
        </Box>
        {loading ? (
          <VStack>
            <Spinner size="xl" color="blue.500" />
          </VStack>
        ) : randomPokemon && <RandomCard pokemon={randomPokemon} />}
      </Box>
      <br />
    </Box>
  );
};

export default Home;
