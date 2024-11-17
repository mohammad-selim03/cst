import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase.config"; // Import Firestore instance
import toast from "react-hot-toast";
import Input from "./Input";
import DynamicDropdown from "./DynamicDropdown";
import { deptData } from "../assets/Data";

const Form = () => {
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    phone: "",
    email: "",
    deptName: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add the studentInfo to the "students" collection in Firestore
      await addDoc(collection(db, "students"), studentInfo);
      setMessage("Student information submitted successfully!");
      toast.success("Student information submitted successfully!");
      setStudentInfo({
        name: "",
        phone: "",
        email: "",
        deptName: "",
        session: "",
        passingYear: "",
        shift: "",
        group: "",
        roll: "",
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
    <div>
      <h1 className="text-3xl font-bold text-center py-3">Ex-Student Information Form</h1>
      <div className="flex flex-col md:flex-row items-center gap-3 w-full">
        <div className="w-[50%]">
          <h3 className="text-xl font-semibold text-center">Register your success today!</h3>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[50%] mx-auto"
        >
          <Input
            label="Name"
            type="text"
            name="name"
            value={studentInfo.name}
            onChange={handleChange}
            required={true}
          />
          <Input
            label="Phone"
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
          {/* <Input
            label="Dept Name"
            type="text"
            name="deptName"
            value={studentInfo.deptName}
            onChange={handleChange}
            required={true}
          /> */}
          <DynamicDropdown options={deptData}/>
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
            label="Roll"
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
            label="Current Position"
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
          {message && <p className="mt-3 md:col-span-2 text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Form;
