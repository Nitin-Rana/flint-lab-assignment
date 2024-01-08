import { Flex, Spacer, Box, Heading, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai'; // Importing an icon for home

const Navbar = () => {
  return (
    <Flex
      p={4}
      bg="black"
      color="white"
      align="center"
      borderBottom="1px"
      borderColor="whiteAlpha.300"
    >
      <Box>
        <Heading as="h1" size="lg">
          Flint Assignment
        </Heading>
      </Box>
      <Spacer />
      <Box>
        <Link href="/" passHref>
          <Button
            leftIcon={<AiOutlineHome />} // Adding an icon to the button
            colorScheme="whiteAlpha"
            variant="outline"
            _hover={{ bg: 'white', color: 'black' }} // Hover effect
            mr={4}
          >
            Home
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Navbar;
