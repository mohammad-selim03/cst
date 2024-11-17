import React from "react";
import { cn } from "../lib/utills";

const Input = ({type, id, name, placeholder, label, className, onChange}) => {
  return (
    <div class="bg-white p-4 rounded-lg">
      <div class="relative bg-inherit">
        <input
          type={type || "text"}
          id={id || ""}
          name={name || ""}
          className={cn("peer bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600", className)}
          placeholder={placeholder || "Type inside me"}
          onChange={onChange}
        />
        <label
          for="username"
          class="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default Input;
