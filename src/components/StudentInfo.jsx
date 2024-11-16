import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase.config'; // Make sure the Firebase config is correct
import { collection, getDocs } from 'firebase/firestore';

const StudentInfo = () => {
  // State to store the student information
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Firestore when the component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Reference to the students collection in Firestore
        const studentCollection = collection(db, 'students');
        const studentSnapshot = await getDocs(studentCollection);
        const studentList = studentSnapshot.docs.map(doc => doc.data());
        
        setStudents(studentList); // Set the student data to state
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching student data:", error);
        setLoading(false); // Handle errors and stop loading
      }
    };

    fetchStudents();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  return (
    <div>
      <h1>Student Information</h1>
      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <ul>
          {students.map((student, index) => (
            <li key={index}>
              <strong>Name:</strong> {student.fullName} <br />
              <strong>Email:</strong> {student.email} <br />
              <strong>Phone:</strong> {student.phone} <br />
              <strong>Graduation Year:</strong> {student.graduationYear} <br />
              <strong>Course:</strong> {student.course} <br />
              <strong>Address:</strong> {student.address} <br />
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentInfo;
