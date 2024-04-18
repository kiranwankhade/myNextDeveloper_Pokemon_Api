import React, { useState } from "react";
import { Box, Text,Button } from "@chakra-ui/react";
import Cards from "../Comonents/Card";
import { Link, useLocation, useParams } from "react-router-dom";

const SearchResultPage = () => {
    const { q } = useParams();
    console.log('q:', q)
    const location = useLocation();
    const filteredPokemon = location.state ? location.state.filteredPokemon : [];
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;
    const totalPages = Math.ceil(filteredPokemon.length / perPage);
  
    const handleNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
    };
  
    const handlePrevPage = () => {
      setCurrentPage((prevPage) => prevPage - 1);
    };
  
    const visiblePokemon = filteredPokemon.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    );
  
    const isNextDisabled = currentPage === totalPages;
    const isPrevDisabled = currentPage === 1;
  
    return (
      <Box w="100%" margin="auto" bgColor="#1a202c">
        <Text color="white" fontSize={["1.5rem","1.5rem","1.5rem","1.5rem"]} mb="1rem">
          Search Results for "{q}"
        </Text>
        <Link to="/" style={{ textDecoration: "none", color: "#4285f4" }}>
          <Button
            m="1rem"
            bgColor="#4285f4"
            color="white"
            size="md"
            _hover={{
              bgColor: "#4285f4",
            }}
          >
            Back
          </Button>
        </Link>
        <Box
          display="grid"
          gridTemplateColumns={{
            sm: "repeat(1,1fr)",
            md: "repeat(2,1fr)",
            lg: "repeat(3,1fr)",
          }}
          gap="20px"
          width='90%'
          margin='auto'
        >
          {visiblePokemon?.map((pokemon, i) => {
            return <Cards key={i} pokemon={pokemon} />;
          })}
        </Box>
        {(totalPages > 1) && (
          <Box mt="2rem" textAlign="center">
            <Button
              colorScheme="blue"
              isDisabled={isPrevDisabled}
              onClick={handlePrevPage}
              mr={2}
            >
              Previous
            </Button>
            <Text color="white" fontSize="1rem" fontWeight="bold" display="inline-block">
              {currentPage} / {totalPages}
            </Text>
            <Button
              colorScheme="blue"
              isDisabled={isNextDisabled}
              onClick={handleNextPage}
              ml={2}
            >
              Next
            </Button>
          </Box>
        )}
      </Box>
    );
  };
  

export default SearchResultPage;
