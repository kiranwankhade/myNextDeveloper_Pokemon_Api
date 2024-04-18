import React from "react";
import { Box, Button, Text, Image, Flex, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

const RandomCard = ({ pokemon }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/${pokemon.name}`);
  };

  return (
    <Box
      margin="auto"
      width={["80%", "80%", "80%", "80%"]}
    >
      <Text color="white" fontSize="1.5rem" mb="1rem">
        Random Pokemon
      </Text>
      {pokemon ? (
        <Box
          border="1px solid gray"
          borderRadius="10px"
          backgroundColor="white"
          color="black"
          display="flex"
          gap="2rem"
        >
          <Image
            padding={"1rem"}
            width={["100%", "50%", "50%", "50%"]}
            height={["50vh", "60vh", "60vh", "60vh"]}
            borderRadius="10px"
            src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
            alt={pokemon.name}
          />

          <Box display="flex" flexDirection="column" alignItem="center" gap="1rem" mt="1rem">
            <Box p="1rem">
              <Text fontSize="1rem" fontWeight="bold" mb="0.5rem">
                <Text as="span" color="#427e90">
                  Pokemon Name:
                </Text>{" "}
                {pokemon.name}
              </Text>
              <Text fontSize="1rem" fontWeight="bold" mb="0.5rem">
                <Text as="span" color="#427e90">
                  Pokemon Order:
                </Text>{" "}
                # {pokemon.order}
              </Text>
              <Flex fontSize="1rem" fontWeight="bold" gap="10px">
                <Text as="span" color="#427e90">
                  Pokemon Type:
                </Text>{" "}
                {pokemon?.types?.map((type, i) => (
                  <Text key={i}>{type.type.name}</Text>
                ))}
              </Flex>

              <Text fontWeight="bold" mb="0.5rem" fontSize="1rem">
                <Text as="span" color="#427e90">
                  Pokemon Base Experience:{" "}
                </Text>
                {pokemon.base_experience}
              </Text>

              <Text fontWeight="bold" mb="0.5rem" fontSize="1rem">
                <Text as="span" color="#427e90">
                  Pokemon Height:{" "}
                </Text>
                {pokemon.height}
              </Text>

              <Text mb="0.5rem" fontSize="1rem" fontWeight="bold">
                <Text as="span" color="#427e90">
                  Pokemon Weight:{" "}
                </Text>
                {pokemon.weight}
              </Text>
            </Box>

            <Button
              color="white"
              fontSize="1.5rem"
              backgroundColor="#427e90"
              m="1rem"
              display="flex"
              alignItems="center"
              onClick={handleDetailsClick}
              _hover={{
                backgroundColor: "#427e90",
              }}
            >
              Details <FaLongArrowAltRight style={{ marginLeft: "0.5rem" }} />
            </Button>
          </Box>
        </Box>
      ) : (
        <Flex justify="center" align="center" height="300px">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      )}
    </Box>
  );
};

export default RandomCard;
