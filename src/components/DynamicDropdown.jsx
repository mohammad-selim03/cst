import React, { useState } from "react";

const DynamicDropdown = ({ options }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOption, setSelectedOption] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setSearchTerm(option); // Optionally, set the search term to the selected option
    setFilteredOptions([]); // Clear suggestions after selection
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState); // Toggle dropdown visibility
  };

  return (
    <div className="dropdown-container relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        onClick={toggleDropdown} // Show dropdown when clicked
        placeholder="Search or select Department"
        className="peer bg-transparent h-10 w-[90%] rounded-lg  placeholder-transparent ring-1 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600 md:mt-4 md:ml-4"
      />
      {isDropdownOpen && filteredOptions.length > 0 && (
        <ul className="dropdown-suggestions absolute z-50 h-40 overflow-y-scroll bg-gray-200 px-2 py-2 rounded-md shadow-lg">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelectOption(option)}
              className="dropdown-item cursor-pointer hover:bg-gray-300 py-2 px-4"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DynamicDropdown;
