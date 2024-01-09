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
    { name: 'Linea', address: 'https://api.lineascan.build/', apiKey: '6JCNBMP6FP3WIZW4NHS3CP5A5KXI53RSEE' },
    { name: 'Kroma', address: 'https://api.kromascan.com/', apiKey: '6JCNBMP6FP3WIZW4NHS3CP5A5KXI53RSEE' },
    // Add more chains as needed
  ];

  const handleSearchClick = (value:any) => {
    setSearchTerm(value);
    console.log(searchTerm);
  };

  return (
    <Center h="100vh" flexDirection="column">
      <Box width={['100%', '75%', '50%', '25%']} mb={4}>
      <SearchBox
          placeholder="Search balances..."
          onChange={(value:any) => setSearchTerm(value)}
          onSearchClick={handleSearchClick}
        />
      </Box>
      <Flex>
        {chains.map((chain, index) => (
          <BalanceBox key={`${chain.address}-${searchTerm}`} address={chain.address} apiKey={chain.apiKey} walletAddress={searchTerm} name={chain.name}/>
        ))}
      </Flex>
    </Center>
  );
}
