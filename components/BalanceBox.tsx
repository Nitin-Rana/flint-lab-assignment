'use client'
import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

const BalanceBox = ({ address, apiKey, walletAddress, name }:any) => {
  const [balance, setBalance] = useState(0);
  const [currentETHPrice, setCurrentETHPrice] = useState(0);
  const [perChange, setPerChange] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    const now = new Date();
    now.setTime(now.getTime() - 12 * 60 * 60 * 1000);
    const formattedDate = now.toISOString().slice(0, 19) + 'Z';

    try {
      const balance = await fetch(`${address}/api?module=account&action=balance&address=${walletAddress}&tag=latest&apikey=${apiKey}`);

      const ethPrice = await fetch(`https://api.coinpaprika.com/v1/coins/eth-ethereum/ohlcv/historical?start=${formattedDate}`);

      const currentEthPrice = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD`);

      const data = await balance.json();
      const currentPrice = await ethPrice.json();
      const data3 = await currentEthPrice.json();

      setPerChange(((Number(currentPrice[0]['open']) - Number(data3.USD)) / Number(currentPrice[0]['open'])) * 100);
      setCurrentETHPrice(data3.USD);

      if (data.status === '1') {
        setBalance(parseFloat(data.result) / 1e18);
      } else {
        setError(data.message);
      }
    } catch (error) {
    //   setError('Failed to fetch data');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  if (Number(balance) === 0) {
    return null;
  }

  return (
    <Box p={8} borderWidth="1px" borderRadius="lg" boxShadow="lg" textAlign="center" mb={8} sx={{margin:'1rem'}}>
      <Heading as="h2" size="md" mb={4}>
        {name}
      </Heading>

      {error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <>
          {Math.abs(perChange) > 10 && (
            <Alert status={perChange > 0 ? "success" : "warning"}>
              <AlertIcon />
              <AlertDescription>
                {perChange > 0 ? "Balance increased by more than 10%" : "Balance decreased by more than 10%"}
              </AlertDescription>
            </Alert>
          )}
          <Table variant="simple" size="sm" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Property</Th>
              <Th isNumeric>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Balance(eth)</Td>
              <Td isNumeric>{Number(balance).toFixed(3)}</Td>
            </Tr>
            <Tr>
              <Td>ETH Price($)</Td>
              <Td isNumeric>{Number(currentETHPrice).toFixed(3)}</Td>
            </Tr>
            <Tr>
              <Td>Percentage Change in 12h</Td>
              <Td isNumeric>{Number(perChange).toFixed(3)}%</Td>
            </Tr>
          </Tbody>
          </Table>
        </>
      )}
    </Box>
  );
};

export default BalanceBox;
