import React, { useEffect, useState } from "react";
import { db } from "../config/firebase.config"; // Make sure the Firebase config is correct
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import TableData from "./Table";

const StudentInfo = () => {
  // State to store the student information
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term

  // Fetch data from Firestore when the component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Reference to the students collection in Firestore
        const studentCollection = collection(db, "students");
        const studentSnapshot = await getDocs(studentCollection);
        const studentList = studentSnapshot.docs.map((doc) => doc.data());

        setStudents(studentList); // Set the student data to state
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching student data:", error);
        setLoading(false); // Handle errors and stop loading
      }
    };

    fetchStudents();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handle search input changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const { currentUser } = useAuth();

  // Filter students based on the search term
  const filteredStudents = students?.filter((student) => {
    const searchTermLower = searchTerm?.toLowerCase();
    return (
      student?.name?.toLowerCase().includes(searchTermLower) ||
      student?.roll?.toLowerCase().includes(searchTermLower) ||
      student?.deptName?.toLowerCase().includes(searchTermLower) ||
      student?.currentPosition?.toLowerCase().includes(searchTermLower)
    );
  });

  console.log("student data", students)

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        Student Information
      </h1>

      {/* Search bar */}
      {}
      {currentUser?.email === "admin@admin.com" && (
        <div className="mb-4 flex justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by roll, name, department, position..."
            className="p-2 w-1/2 border border-gray-300 rounded-md"
          />
        </div>
      )}

      {filteredStudents.length === 0 ? (
        <p className="text-center text-gray-600">No students found</p>
      ) : (
        // <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        //   {filteredStudents.map((student, index) => (
        //     <div
        //       key={index}
        //       className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
        //     >
        //       <h2 className="text-xl font-semibold text-gray-800 mb-4">
        //         {student.fullName}
        //       </h2>
        //       <p className="text-gray-700">
        //         <strong className="text-gray-900">Phone:</strong>{" "}
        //         {student.phone}
        //       </p>
        //       <p className="text-gray-700">
        //         <strong className="text-gray-900">Email:</strong>{" "}
        //         {student.email}
        //       </p>
        //       <p className="text-gray-700">
        //         <strong className="text-gray-900">Dept Name:</strong>{" "}
        //         {student.deptName}
        //       </p>
        //       <p className="text-gray-700">
        //         <strong className="text-gray-900">Session:</strong>{" "}
        //         {student.session}
        //       </p>
        //       <p className="text-gray-700">
        //         <strong className="text-gray-900">Passing Year:</strong>{" "}
        //         {student.passingYear}
        //       </p>
        //       <p className="text-gray-700">
        //         <strong className="text-gray-900">Shift:</strong>{" "}
        //         {student.shift}
        //       </p>
        //       <p className="text-gray-700">
        //         <strong className="text-gray-900">Group:</strong>{" "}
        //         {student.group}
        //       </p>
        //       <p className="text-gray-700">
        //         <strong className="text-gray-900">Roll:</strong> {student.roll}
        //       </p>
        //       <p className="text-gray-700">
        //         <strong className="text-gray-900">Address:</strong>{" "}
        //         {student.address}
        //       </p>
        //       <p className="text-gray-700">
        //         <strong className="text-gray-900">Current Position:</strong>{" "}
        //         {student.currentPosition}
        //       </p>
        //     </div>
        //   ))}
        // </div>
        <></>
      )}

      <TableData studentData={filteredStudents} />
    </div>
  );
};

export default StudentInfo;
