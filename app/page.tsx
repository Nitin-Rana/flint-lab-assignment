'use client'
import React, { useState, useEffect } from 'react';
import { Center, Box, Flex } from '@chakra-ui/react';
import BalanceBox from '@/components/BalanceBox';
import SearchBox from '@/components/SearchBox';



export default function Home() {
  //set default wallet address
  const [searchTerm, setSearchTerm] = useState('0xDCBc586cAb42a1D193CaCD165a81E5fbd9B428d7');
  const [perChange, setPerChange] = useState(0);

  //define available chains
  const chains = [
    { address: 'https://api.lineascan.build/', apiKey: '6JCNBMP6FP3WIZW4NHS3CP5A5KXI53RSEE' },
    { address: 'https://api.kromascan.com/', apiKey: '6JCNBMP6FP3WIZW4NHS3CP5A5KXI53RSEE' },
    // Add more chains as needed
  ];

  // const fetchData = async () => {
  //   const now = new Date();
  //   now.setTime(now.getTime() - 12 * 60 * 60 * 1000);
  //   const formattedDate = now.toISOString().slice(0, 19) + 'Z';
  //   try {
  //     const ethPrice = await fetch(`api.coincap.io/v2/candles?exchange=poloniex&interval=h8&baseId=ethereum&quoteId=bitcoin%0A`);
  //     const response3 = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD`);
  //     const currentPrice = await ethPrice.json();
  //     const data3 = await response3.json();
  //     // setPerChange(((Number(currentPrice[0]['open']) - Number(data3.USD)) / Number(currentPrice[0]['open'])) * 100);
  //     console.log(currentPrice);
  //   } catch (error) {
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  //   const intervalId = setInterval(fetchData, 5000);
  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <Center h="100vh" flexDirection="column">
      <Box width={['100%', '75%', '50%', '25%']} mb={4}>
        <SearchBox placeholder="Search balances..." onChange={(value) => setSearchTerm(value)} />
      </Box>
      <Flex>
        {chains.map((chain, index) => (
          <BalanceBox key={index} address={chain.address} apiKey={chain.apiKey} walletAddress={searchTerm}/>
        ))}
      </Flex>
    </Center>
  );
}
