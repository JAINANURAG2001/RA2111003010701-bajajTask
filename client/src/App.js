import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [filters, setFilters] = useState({
    numbers: true,
    alphabets: true,
    highestAlphabet: true
  });

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const response = await axios.post('https://ra2111003010701-bajajtask.onrender.com/bfhl', parsedData);
      const getResponse = await axios.get('https://ra2111003010701-bajajtask.onrender.com/bfhl');
      setResponseData(response.data);
      console.log(response)
    } catch (error) {
      console.error('Invalid JSON input or request failed', error);
    }
  };

  const toggleFilter = (field) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: !prevFilters[field]
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">JSON Input and Display</h1>
      <textarea
        rows="10"
        cols="50"
        value={jsonInput}
        onChange={handleJsonChange}
        className="w-full max-w-lg p-2 mb-4 border border-gray-300 rounded shadow-sm"
        placeholder='{"data": ["A", "B", "1", "z"]}'
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition duration-300"
      >
        Submit
      </button>
      {responseData && (
        <div className="mt-6 w-full max-w-lg bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Response Data</h2>
          <div className="flex justify-between mb-4">
            <button
              onClick={() => toggleFilter('numbers')}
              className={`px-3 py-1 rounded ${filters.numbers ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Toggle Numbers
            </button>
            <button
              onClick={() => toggleFilter('alphabets')}
              className={`px-3 py-1 rounded ${filters.alphabets ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Toggle Alphabets
            </button>
            <button
              onClick={() => toggleFilter('highestAlphabet')}
              className={`px-3 py-1 rounded ${filters.highestAlphabet ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Toggle Highest Alphabet
            </button>
          </div>
          {filters.numbers && responseData.numbers && (
            <div className="mb-4">
              <h3 className="text-lg font-medium">Numbers</h3>
              <p className="text-gray-700">{responseData.numbers.join(', ')}</p>
            </div>
          )}
          {filters.alphabets && responseData.alphabets && (
            <div className="mb-4">
              <h3 className="text-lg font-medium">Alphabets</h3>
              <p className="text-gray-700">{responseData.alphabets.join(', ')}</p>
            </div>
          )}
          {filters.highestAlphabet && responseData.highestAlphabet && (
            <div>
              <h3 className="text-lg font-medium">Highest Alphabet</h3>
              <p className="text-gray-700">{responseData.highestAlphabet}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
