import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Text, Button } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box bg="blue.600" color="white" p={4}>
      <Flex justify="space-between" align="center">
        <Text fontSize="2xl" fontWeight="bold">
          <Link to="/">Product Catalog</Link>
        </Text>
        <Box>
          <Link to="/products">
            <Button
              variant="link"
              color="white"
              _hover={{ textDecoration: "underline" }}
            >
              Products
            </Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
