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
} from '@chakra-ui/react';

export default function Home() {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dateString, setDateString] = useState('');

  const fetchData = async () => {
    setIsLoading(true);
    const now = new Date();

    now.setTime(now.getTime() - (12 * 60 * 60 * 1000));

    const formattedDate = now.toISOString().slice(0, 19) + 'Z';

    setDateString(formattedDate);

    try {
      const response = await fetch('https://api.kromascan.com/api?module=account&action=balance&address=0x7afb9de72A9A321fA535Bb36b7bF0c987b42b859&tag=latest&apikey=S3E2HSJH694PRNNXW1E75ZBUXIQ7QVWWXR');

      const response2 = await fetch(`https://api.coinpaprika.com/v1/coins/eth-ethereum/ohlcv/historical?start=${formattedDate}`);
      const response3 = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD`);

      const data = await response.json();
      const data2 = await response2.json();
      const data3 = await response3.json();

      console.log(Number((data2[0]['open'])/2));
      console.log(((Number(data2[0]['open']) - Number(data3.USD)) / Number(data2[0]['open']))*100);

      if (data.status === '1') {
        setBalance(data.result);
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
    <Center h="100vh">
      <Box
        p={8}
        maxW="400px"
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        textAlign="center"
      >
        <Heading as="h1" size="xl" mb={4}>
          Kroma Balance
        </Heading>
        {isLoading ? (
          <Spinner size="xl" />
        ) : error ? (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <Text fontSize="lg">Balance: {balance}</Text>
        )}
      </Box>
    </Center>
  );
}
