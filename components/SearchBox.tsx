// SearchBox.tsx
import React from 'react';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface SearchBoxProps {
  placeholder: string;
  onChange: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ placeholder, onChange }) => {
  return (
    <InputGroup>
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        borderRadius="md"
      />
      <InputRightElement>
        <SearchIcon color="gray.500" />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBox;
