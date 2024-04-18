import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

const Cards = ({ pokemon }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/${pokemon.name}`);
  };

  return (
    <Box
      border="1px solid gray"
      textAlign="Justify"
      borderRadius="10px"
      backgroundColor="white"
      color="Black"
      width="80%"
      boxShadow="0 0 10px 3px rgba(0, 128, 128, 0.5)" // add a teal shadow
      rounded="md"
      overflow="hidden"
      mx="4"
      my="2"
      _hover={{ boxShadow: "lg" }}
      transition="box-shadow 0.2s"
    >
      <img
        style={{
          height: "150px",
          width: "150px",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          margin: "auto",
        }}
        src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
        alt="pokemon"
      />

      <Box m="1rem" textAlign='center'>
        <Text color="#c95b6a" fontSize="2rem" fontWeight="bold" textShadow="2px 2px black">
          
          {pokemon.name}
        </Text>
      </Box>

      <Button
        color="#427e90"
        fontSize="1rem"
        m="1rem"
        display="flex"
        alignItems="center"
        onClick={handleDetailsClick}
        _hover={{
          backgroundColor: "#427e90",
          color:'white'
        }}
        padding='0.2rem'
      >
        Details
        <FaLongArrowAltRight style={{ marginLeft: "0.2rem" }} />
      </Button>
    </Box>
  );
};

export default Cards;
