import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  Spinner,
  Flex,
  Stack,
  Center,
} from "@chakra-ui/react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) {
          throw new Error("Product not found");
        }
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Center minHeight="80vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error || !product) {
    return (
      <Center minHeight="80vh" flexDirection="column" gap={4}>
        <Text fontSize="xl" color="red.500">
          Product not found or an error occurred.
        </Text>
        <Button colorScheme="blue" onClick={() => navigate("/products")}>
          Back to Products
        </Button>
      </Center>
    );
  }

  return (
    <Box maxW="6xl" mx="auto" p={6}>
      <Button mb={6} colorScheme="blue" onClick={() => navigate("/products")}>
        Back to Products
      </Button>
      <Flex direction={{ base: "column", md: "row" }} gap={8} align="center">
        <Image
          src={product.image}
          alt={product.title}
          boxSize="300px"
          objectFit="contain"
          borderRadius="md"
        />
        <Stack spacing={4}>
          <Heading size="lg">{product.title}</Heading>
          <Text fontSize="2xl" color="green.500">
            ${product.price}
          </Text>
          <Text fontSize="md" color="gray.600">
            Category: {product.category}
          </Text>
          <Text>{product.description}</Text>
        </Stack>
      </Flex>
    </Box>
  );
};

export default ProductDetails;
