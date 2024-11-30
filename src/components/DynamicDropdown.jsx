import React, { useState } from "react";

const DynamicDropdown = ({ options, onChange }) => {
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
    setSearchTerm(option); // Set the input to the selected value
    setFilteredOptions([]); // Clear suggestions
    setIsDropdownOpen(false); // Close dropdown
    if (onChange) onChange(option); // Notify parent about the selection
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState); // Toggle dropdown visibility
  };

  return (
    <div className="dropdown-container relative md:-ml-4">
      <input
      name="fieldName"
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        onClick={toggleDropdown} // Show dropdown when clicked
        placeholder="Search or select field"
        className="peer bg-transparent h-10 w-[100%] md:w-[96%]  rounded-lg  ring-1 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600  md:ml-4 placheholder:text-black"
      />
      {isDropdownOpen && filteredOptions.length > 0 && (
        <ul className="dropdown-suggestions absolute z-50 h-60 overflow-y-scroll bg-white shadow-blue-200  px-2 py-2 rounded-md shadow-lg w-[95%] md:ml-5">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelectOption(option)}
              className="dropdown-item cursor-pointer hover:bg-gray-100 rounded-md py-2 px-4"
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
