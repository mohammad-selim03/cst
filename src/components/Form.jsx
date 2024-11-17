import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase.config'; // Import Firestore instance
import toast from 'react-hot-toast';
import Input from './Input';

const Form = () => {
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    phone: '',
    email: '',
    deptName: '',
    session: '',
    passingYear: '',
    shift: '',
    group: '',
    roll: '',
    address: '',
    currentPosition: '',
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
      toast.success('Student information submitted successfully!');
      setStudentInfo({
        name: '',
        phone: '',
        email: '',
        deptName: '',
        session: '',
        passingYear: '',
        shift: '',
        group: '',
        roll: '',
        address: '',
        currentPosition: '',
      });
    } catch (error) {
      console.error('Error adding document: ', error);
      setMessage('Failed to submit student information.');
      toast.error('Failed to submit student information.');
    }
  };

  return (
    <div>
      <h1>Ex-Student Information Form</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-start space-y-4">
        <div>
         
          <Input
            label={"Name"}
            type="text"
            name="name"
            value={studentInfo.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone *</label>
          <input
            className="border border-gray-500 rounded-md px-3 py-2"
            type="number"
            name="phone"
            value={studentInfo.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            className="border border-gray-500 rounded-md px-3 py-2"
            type="email"
            name="email"
            value={studentInfo.email}
            onChange={handleChange}
            
          />
        </div>
        <div>
          <label>Dept Name *</label>
          <input
            className="border border-gray-500 rounded-md px-3 py-2"
            type="text"
            name="deptName"
            value={studentInfo.deptName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Session *</label>
          <input
            className="border border-gray-500 rounded-md px-3 py-2"
            type="text"
            name="session"
            value={studentInfo.session}
            onChange={handleChange}
          
          />
        </div>
        <div>
          <label>Passing Year</label>
          <input
            className="border border-gray-500 rounded-md px-3 py-2"
            type="number"
            name="passingYear"
            value={studentInfo.passingYear}
            onChange={handleChange}
      
          />
        </div>
        <div>
          <label>Shift</label>
          <input
            className="border border-gray-500 rounded-md px-3 py-2"
            type="text"
            name="shift"
            value={studentInfo.shift}
            onChange={handleChange}
     
          />
        </div>
        <div>
          <label>Group</label>
          <input
            className="border border-gray-500 rounded-md px-3 py-2"
            type="text"
            name="group"
            value={studentInfo.group}
            onChange={handleChange}
           
          />
        </div>
        <div>
          <label>Roll *</label>
          <input
            className="border border-gray-500 rounded-md px-3 py-2"
            type="number"
            name="roll"
            value={studentInfo.roll}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address</label>
          <input
            className="border border-gray-500 rounded-md px-3 py-2"
            type="text"
            name="address"
            value={studentInfo.address}
            onChange={handleChange}
           
          />
        </div>
        <div>
          <label>Current Position *</label>
          <input
            className="border border-gray-500 rounded-md px-3 py-2"
            type="text"
            name="currentPosition"
            value={studentInfo.currentPosition}
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
