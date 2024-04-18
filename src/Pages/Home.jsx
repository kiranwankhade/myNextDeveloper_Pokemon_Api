import React, { useEffect, useState } from "react";
import {
  Box,
  Input,
  Text,
  Heading,
  Center,
  Spinner,
  Button,
  Image,
  VStack,
} from "@chakra-ui/react";
import RandomCard from "../Comonents/RandomCard";
import SearchResultPage from "./SearchResultPage";
import { useNavigate } from "react-router-dom";

import pokemonImage from "../Assets/pokemon.png"

const Home = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const perPage = 10;
  const totalPages = Math.ceil(pokemonData.length / perPage);

  const getDailyOffset = () => {
    const today = new Date().toISOString().slice(0, 10);
    // const today = "2024-04-20";//testing
    const storedDate = localStorage.getItem("date");
    if (storedDate !== today) {
      const randomOffset = Math.floor(Math.random() * 5) * 5;
      localStorage.setItem("offset", randomOffset);
      localStorage.setItem("date", today);
      return randomOffset;
    }
    return parseInt(localStorage.getItem("offset"), 10);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const offset = getDailyOffset();
        const allPokemon = [];
        for (let i = 0; i < 5; i++) {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon?offset=${
              offset + i * 10
            }&limit=10`
          );
          const data = await response.json();
          const pokemonData = await Promise.all(
            data.results.map((pokemon) => fetchPokemon(pokemon.url))
          );
          allPokemon.push(...pokemonData);
        }
        setPokemonData(allPokemon);
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

  useEffect(() => {
    const fetchRandomPokemon = async () => {
      try {
        const offset = getDailyOffset();
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=1`
        );
        const data = await response.json();
        const randomPokemonData = await fetchPokemon(data.results[0].url);
        setRandomPokemon(randomPokemonData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRandomPokemon();
  }, []);

  

  const nav = useNavigate();
  const handleSearch = () => {
    const filteredPokemon = pokemonData.filter(pokemon =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
    nav(`/search/${encodeURIComponent(search)}`, { state: { filteredPokemon } });
  };

  
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box w="100%" margin="auto"  >
      <Box w="90%" margin="auto">
        <br />
        <Center>
          <Image w={['50%','50%','50%','20%']} src={pokemonImage} alt="Pokemon Logo" />
        </Center>
        <br />
        <Box
          margin={["0.5rem", "1rem", "1rem", "1rem"]}
          display="flex"
          flexDirection={["column", "row", "row", "row"]}
          gap="10px"
          justifyContent='center'
          alignItem='center'
        >
          <Input
            type="text"
            placeholder="pikachu"
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
        ) : <RandomCard pokemon={randomPokemon} />}
      </Box>
      <br />
    </Box>
  );
};

export default Home;