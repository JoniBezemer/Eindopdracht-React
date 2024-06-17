
import { Box, Flex, Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navigation = () => (
  <Box bg="pink.500" p={4} mb={5}>
    <Flex align="center" justify="space-between">
      <Heading as="h1" size="lg" color="white">
        Event App
      </Heading>
      <Flex>
        <Link as={RouterLink} to="/" color="white" mr={4}>
          Home
        </Link>
      </Flex>
    </Flex>
  </Box>
);

export default Navigation;
