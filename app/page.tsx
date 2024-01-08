"use client"
import { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  Center,
  Flex,Grid, GridItem,Table, Thead, Tbody, Tr, Th, Td
} from '@chakra-ui/react';
import SearchBox from '@/components/SearchBox';

export default function Home() {
  const [balance, setBalance] = useState<Number>(0);
  const [currentETHPrice, setCurrentETHPrice] = useState<Number>(0);
  const [perChange, setPerChange] = useState<Number>(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dateString, setDateString] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const fetchData = async () => {
    setIsLoading(true);
    const now = new Date();

    now.setTime(now.getTime() - (12 * 60 * 60 * 1000));

    const formattedDate = now.toISOString().slice(0, 19) + 'Z';

    setDateString(formattedDate);

    try {
      const response = await fetch(`https://api.kromascan.com/api?module=account&action=balance&address=0x7afb9de72A9A321fA535Bb36b7bF0c987b42b859&tag=latest&apikey=${apiKey}`);

      const ethPrice = await fetch(`https://api.coinpaprika.com/v1/coins/eth-ethereum/ohlcv/historical?start=${formattedDate}`);

      const response3 = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD`);

      const data = await response.json();
      const currentPrice = await ethPrice.json();
      const data3 = await response3.json();

      console.log(currentPrice);

      setPerChange(((Number(currentPrice[0]['open']) - Number(data3.USD)) / Number(currentPrice[0]['open']))*100);
      setCurrentETHPrice(data3.USD);

      if (data.status === '1') {
        setBalance(parseFloat(data.result) / 1e18);
      } else {
        setError(data.message);
      }
    } catch (error) {
      // setError('Failed to fetch data');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Center h="100vh" flexDirection="column">
      <Flex width="150%" justify="center">
        <Box width={['100%', '75%', '50%', '25%']} mb={4}>
          <SearchBox placeholder="Search balances..." onChange={(value) => setSearchTerm(value)} />
        </Box>
      </Flex>
      <Box
        p={8}
        // width="400px"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        textAlign="center"
        // height="300px"
      >

        <Heading as="h1" size="xl" mb={4}>
          Kroma Balance
        </Heading>
        {error ? (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <>
    <Box overflowX="auto">
    <Table variant="simple" size="sm" colorScheme="teal">
      <Thead>
        <Tr>
          <Th>Property</Th>
          <Th isNumeric>Value</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Balance</Td>
          <Td isNumeric>{Number(balance).toFixed(3)}</Td>
        </Tr>
        <Tr>
          <Td>ETH Price</Td>
          <Td isNumeric>{Number(currentETHPrice).toFixed(3)}</Td>
        </Tr>
        <Tr>
          <Td>Percentage Change</Td>
          <Td isNumeric>{Number(perChange).toFixed(3)}%</Td>
        </Tr>
      </Tbody>
    </Table>
  </Box>
  </>
        )}
      </Box>
    </Center>
  );
}
