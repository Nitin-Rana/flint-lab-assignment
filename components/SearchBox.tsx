import React, { useState } from 'react';
import { Input, Button, Flex } from '@chakra-ui/react';

const SearchBox = ({ placeholder, onChange, onSearchClick }:any) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event:any) => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  const handleSearchClick = () => {
    // Call the onSearchClick callback with the current input value
    onSearchClick(inputValue);
  };

  return (
    <Flex>
      <Input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button ml={2} onClick={handleSearchClick}>
        Search
      </Button>
    </Flex>
  );
};

export default SearchBox;