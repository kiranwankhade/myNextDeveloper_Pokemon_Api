import {
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
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
      width='100%'
    >
      <img
        style={{
          height: "200px",
          width:'200px',
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          margin:'auto'
        }}
        src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
        alt="pokemon"
      />

      <Box m="1rem">
        <Text fontSize="1rem" fontWeight="bold">
          <Text as="span" color="#427e90">
            Pokemon Name :
          </Text>{" "}
          {pokemon.name}
        </Text>
        <Text fontSize="1rem" fontWeight="bold">
          <Text as="span" color="#427e90">
            Pokemon Order :
          </Text>{" "}
          # {pokemon.order}
        </Text>
        <Box
          display="flex"
          justifyContent="flex-start"
          fontSize="1rem"
          fontWeight="bold"
          gap="0.5rem"
        >
          <Text as="span" color="#427e90">
            Pokemon Type :
          </Text>
          <Text>
            {pokemon?.types?.map((type, i) => {
              return <Text key={i}>{type.type.name}</Text>;
            })}
          </Text>
        </Box>
      </Box>

      <Button color='white' fontSize='1.5rem' backgroundColor='#427e90' m='1rem' display="flex" alignItems="center" onClick = {handleDetailsClick} _hover={{
        backgroundColor:'#427e90'
      }}>
      Details
      <FaLongArrowAltRight style={{ marginLeft: '0.5rem' }} />
    </Button>
    </Box>
  );
};

export default Cards;
