// pages/kroma-balance.js
import { useEffect, useState } from 'react';

const KromaBalance = () => {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.kromascan.com/api?module=account&action=balance&address=0x7afb9de72A9A321fA535Bb36b7bF0c987b42b859&tag=latest&apikey=S3E2HSJH694PRNNXW1E75ZBUXIQ7QVWWXR');
        const data = await response.json();

        if (data.status === '1') {
          setBalance(data.result);
        } else {
          setError(data.message);
        }
      } catch (error) {
        // setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Kroma Balance</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Balance: {balance}</p>
      )}
    </div>
  );
};

export default KromaBalance;
