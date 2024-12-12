import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  // Sample dataset for search
  const sampleData = [
    'Apple',
    'Banana',
    'Orange',
    'Grapes',
    'Mango',
    'Pineapple',
    'Strawberry',
    'Blueberry',
    'Watermelon',
    'Peach',
  ];

  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Hook to navigate between pages

  // Function to handle input change
  const handleInputChange = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    // Filter data based on the query
    if (searchQuery) {
      const filtered = sampleData.filter(item =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
      setErrorMessage(''); // Clear the error message when typing
    } else {
      setFilteredData([]);
      setErrorMessage(''); // Clear the error message when typing
    }
  };

  // Function to handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion); // Set the query to the clicked suggestion
    

    setFilteredData([]); // Optionally clear the suggestions list after selection
  };

  // Function to handle "Tìm Kiếm" button click
  const handleLookingButtonClick = () => {
    if (!query) {
      setErrorMessage('Please enter a search query'); // Show error if the query is empty
    } else if (sampleData.indexOf(query) === -1) {
      setErrorMessage('No results found'); // Show error if no results found
    }
    else {
      navigate('/looking'); // Navigate to the /looking page if valid query and results exist
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <div className="relative">
        {/* Input field with enhanced styling */}
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Search for patients"
        />

        {/* Display suggestions */}
        {query && filteredData.length > 0 && (
          <ul className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 z-10">
            {filteredData.map((item, index) => (
              <li
                key={index}
                className="p-3 cursor-pointer hover:bg-pink-100 transition-all"
                onClick={() => handleSuggestionClick(item)} // Handle click
              >
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* Display "Not Found" message */}
        {query && sampleData.indexOf(query)===-1 && (
          <div className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 p-3 text-gray-500">
            Not Found
          </div>
        )}

        {/* Display Error Message */}
        {errorMessage && (
          <div className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 p-3 text-red-500">
            {errorMessage}
          </div>
        )}

        {/* "Tìm Kiếm" Button */}
        <button
          onClick={handleLookingButtonClick}
          className="mt-4 w-full p-4 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
        >
          Tìm Kiếm
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
