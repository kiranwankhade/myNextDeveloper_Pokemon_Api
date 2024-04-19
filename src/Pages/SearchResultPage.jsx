import React, { useState } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import Cards from "../Components/Card";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";

const SearchResultPage = () => {
  const { q } = useParams();
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
    <Box w="100%" margin="auto" display="flex" flexDirection="column" fontFamily='cursive'>
      <Box w="90%" margin="auto" flex="1">
        <Text
          color="white"
          fontSize={["1.5rem", "1.5rem", "1.5rem", "1.5rem"]}
          pt="2rem"
          ml="2rem"
        >
          Search Results for "{q}"
        </Text>
        <Link to="/" style={{ textDecoration: "none", color: "#4285f4" }}>
          <Button
            color="white"
            fontSize="1rem"
            bgColor="transparent"
            mt="1rem"
            ml="2rem"
            mb="2rem"
            display="flex"
            alignItems="center"
            _hover={{
              backgroundColor: "#427e90",
              color: "white",
            }}
            padding="0.5rem"
            fontFamily='cursive'
          >
            <FaLongArrowAltLeft style={{ marginRight: "0.5rem" }} />
            Back
          </Button>
        </Link>
        {visiblePokemon.length === 0 ? (
          <Box
            width="90%"
            margin="auto"
            display="flex"
            justifyContent="center"
            m="2rem"
            alignItems="flex-start"
          >
            <Text color="white" fontSize="1.5rem">
              No Pokemon found matching the search criteria.
            </Text>
          </Box>
        ) : (
            <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center" 
            ml='2rem'  
          >
            <Box
              display="grid"
              gridTemplateColumns={["repeat(1, 1fr)","repeat(1, 1fr)","repeat(2, 1fr)","repeat(3, 1fr)"]
              }
              gap="20px"
              width="90%"
              margin="auto"
              justifyContent="center" 
              alignItems="center"
            >
              {visiblePokemon?.map((pokemon, i) => {
                return <Cards key={i} pokemon={pokemon} />;
              })}
            </Box>
          </Box>
          
        )}
        {totalPages > 1 && (
          <Box mt="2rem" textAlign="center">
            <Button
              colorScheme="blue"
              isDisabled={isPrevDisabled}
              onClick={handlePrevPage}
              mr={2}
            >
              Previous
            </Button>
            <Text
              color="white"
              fontSize="1rem"
              fontWeight="bold"
              display="inline-block"
            >
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
    </Box>
  );
};

export default SearchResultPage;
