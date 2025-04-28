import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  SimpleGrid,
  Spinner,
  Center,
  Stack,
  Heading,
} from "@chakra-ui/react";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

   const truncateTitle = (title) => {
     const words = title.split(" ");
     if (words.length > 20) {
       return words.slice(0, 20).join(" ") + "...";
     }
     return title;
   };

  if (loading) {
    return (
      <Center minHeight="80vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center minHeight="80vh">
        <Text color="red.500" fontSize="xl">
          {error}
        </Text>
      </Center>
    );
  }

  return (
    <Box p={6} maxW="1200px" mx="auto">
      <Heading mb={6} textAlign="center">
        Products
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
        {products.map((product) => (
          <Box
            key={product.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            _hover={{ boxShadow: "lg", cursor: "pointer" }}
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <Image
              src={product.image}
              alt={product.title}
              boxSize="200px"
              objectFit="contain"
              mx="auto"
            />
            <Stack spacing={3} mt={4}>
              <Text fontWeight="bold" noOfLines={1}>
                Name: {truncateTitle(product.title)}
              </Text>
              <Text color="green.500" fontWeight="semibold">
                Price: {product.price}
              </Text>
              <Text fontSize="sm" color="gray.600" noOfLines={1}>
                Category: {product.category}
              </Text>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Products;
