import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase.config'; // Import Firestore instance

const Form = () => {
  const [studentInfo, setStudentInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    graduationYear: '',
    course: '',
    address: '',
  });

  const [message, setMessage] = useState('');

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
      await addDoc(collection(db, 'students'), studentInfo);
      setMessage('Student information submitted successfully!');
      setStudentInfo({
        fullName: '',
        email: '',
        phone: '',
        graduationYear: '',
        course: '',
        address: '',
      });
    } catch (error) {
      console.error('Error adding document: ', error);
      setMessage('Failed to submit student information.');
    }
  };

  return (
    <div>
      <h1>Ex-Student Information Form</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-start">
        <div>
          <label>Full Name:</label>
          <input
            className="border border-gray-500 rounded-md px-3 py-2"
            type="text"
            name="fullName"
            value={studentInfo.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            className="border border-gray-500 rounded-md px-3 py-2"
            type="email"
            name="email"
            value={studentInfo.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            className="border border-gray-500 rounded-md px-3 py-2"
            type="tel"
            name="phone"
            value={studentInfo.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Graduation Year:</label>
          <input
            className="border border-gray-500 rounded-md px-3 py-2"
            type="number"
            name="graduationYear"
            value={studentInfo.graduationYear}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Course:</label>
          <input
            className="border border-gray-500 rounded-md px-3 py-2"
            type="text"
            name="course"
            value={studentInfo.course}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            className="border border-gray-500 rounded-md px-3 py-2"
            type="text"
            name="address"
            value={studentInfo.address}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md"
          type="submit"
        >
          Submit
        </button>
        {message && <p className="mt-3">{message}</p>}
      </form>
    </div>
  );
};

export default Form;
