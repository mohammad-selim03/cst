import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase.config"; // Import Firestore instance
import toast from "react-hot-toast";
import Input from "./Input";
import DynamicDropdown from "./DynamicDropdown";
import { fieldsData } from "../assets/Data";

const Form = () => {
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    phone: "",
    email: "",
    fieldName: "",
    session: "",
    passingYear: "",
    shift: "",
    group: "",
    roll: "",
    address: "",
    currentPosition: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  const handleDropdownChange = (value) => {
    setStudentInfo((prevInfo) => ({
      ...prevInfo,
      fieldName: value, // Assuming "deptName" is the key for the dropdown data
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add the studentInfo to the "students" collection in Firestore
      await addDoc(collection(db, "students"), studentInfo);
      setMessage("Student information submitted successfully!");
      toast.success("Student information submitted successfully!");
      console.log("student info before submit",studentInfo )
      setStudentInfo({
        name: "",
        phone: "",
        email: "",
        session: "",
        passingYear: "",
        shift: "",
        group: "",
        roll: "",
        field: "",
        address: "",
        currentPosition: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      setMessage("Failed to submit student information.");
      toast.error("Failed to submit student information.");
    }
  };

  return (
    <div className="pb-10">
      <h1 className="text-3xl font-bold text-center py-10 ">Ex-Student Information Form</h1>
      <div className="flex flex-col md:flex-row items-center gap-3 w-full">
        <div className="w-[50%]">
          <h3 className="text-xl font-semibold text-center text-green-500">Register your success today!</h3>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-4 w-[50%] mx-auto"
        >
          <Input
            label="Name*"
            type="text"
            name="name"
            value={studentInfo.name}
            onChange={handleChange}
            required={true}
          />
          <Input
            label="Phone*"
            type="number"
            name="phone"
            value={studentInfo.phone}
            onChange={handleChange}
            required={true}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={studentInfo.email}
            onChange={handleChange}
          />
      
          <DynamicDropdown options={fieldsData}onChange={handleDropdownChange} />
          <Input
            label="Session"
            type="text"
            name="session"
            value={studentInfo.session}
            onChange={handleChange}
          />
          <Input
            label="Passing Year"
            type="number"
            name="passingYear"
            value={studentInfo.passingYear}
            onChange={handleChange}
          />
          <Input
            label="Shift"
            type="text"
            name="shift"
            value={studentInfo.shift}
            onChange={handleChange}
          />
          <Input
            label="Group"
            type="text"
            name="group"
            value={studentInfo.group}
            onChange={handleChange}
          />
          <Input
            label="Roll*"
            type="number"
            name="roll"
            value={studentInfo.roll}
            onChange={handleChange}
            required={true}
          />
          <Input
            label="Address"
            type="text"
            name="address"
            value={studentInfo.address}
            onChange={handleChange}
          />
          <Input
            label="Current Position*"
            type="text"
            name="currentPosition"
            value={studentInfo.currentPosition}
            onChange={handleChange}
            required={true}
          />
          <button
            className="mt-3 px-4 py-2 w-full md:w-1/2 mx-auto bg-blue-500 text-white rounded-md md:col-span-2"
            type="submit"
          >
            Submit
          </button>
          {message && <p className="mt-3 md:col-span-2 text-center text-green-500">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Form;
