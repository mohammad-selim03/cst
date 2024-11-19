import React from "react";
import { cn } from "../lib/utills";

const Input = ({type, id, name, placeholder, label, className, onChange, required}) => {
  return (
    <div className="bg-white rounded-lg">
      <div className="relative bg-inherit">
        <input
          type={type || "text"}
          id={id || ""}
          name={name || ""}
          className={cn("peer bg-transparent h-10 w-full rounded-lg  placeholder-transparent ring-1 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600", className)}
          placeholder={placeholder || "Type inside me"}
          onChange={onChange}
          required={!!required }
        />
        <label
          htmlFor="username"
          className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default Input;
