import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import axios from "axios";

function FacultyUploadMarks() {
    const { userId } = useSelector(state => state.user); // Assume Redux has the logged-in faculty's ID.
    // const [sections, setSections] = useState([]);
    // const [selectedSection, setSelectedSection] = useState("");
    // const [subjects, setSubjects] = useState([]);
    // const [selectedSubject, setSelectedSubject] = useState("");
    // const [students, setStudents] = useState([]);
    // const [marks, setMarks] = useState({});
    // const [isLoading, setIsLoading] = useState(false);
    //
    // // Fetch allowed sections when component mounts
    // useEffect(() => {
    //     async function fetchSections() {
    //         try {
    //             const { data } = await axios.get(`/api/sections/${userId}`);
    //             setSections(data);
    //         } catch (error) {
    //             console.error("Error fetching sections:", error);
    //         }
    //     }
    //     fetchSections();
    // }, [userId]);
    //
    // // Fetch subjects when a section is selected
    // useEffect(() => {
    //     async function fetchSubjects() {
    //         if (!selectedSection) return;
    //         try {
    //             const { data } = await axios.get(`/api/subjects/${userId}?section=${selectedSection}`);
    //             setSubjects(data);
    //         } catch (error) {
    //             console.error("Error fetching subjects:", error);
    //         }
    //     }
    //     fetchSubjects();
    // }, [selectedSection, userId]);
    //
    // // Fetch students when a subject is selected
    // useEffect(() => {
    //     async function fetchStudents() {
    //         if (!selectedSubject) return;
    //         try {
    //             const { data } = await axios.get(`/api/students?section=${selectedSection}`);
    //             setStudents(data);
    //             // Initialize marks for students
    //             const initialMarks = {};
    //             data.forEach(student => {
    //                 initialMarks[student.id] = ""; // Default mark as an empty string
    //             });
    //             setMarks(initialMarks);
    //         } catch (error) {
    //             console.error("Error fetching students:", error);
    //         }
    //     }
    //     fetchStudents();
    // }, [selectedSection, selectedSubject]);
    //
    // // Handle mark changes for each student
    // const handleMarkChange = (studentId, value) => {
    //     setMarks(prev => ({
    //         ...prev,
    //         [studentId]: value,
    //     }));
    // };
    //
    // // Submit marks
    // const handleSubmit = async () => {
    //     setIsLoading(true);
    //     try {
    //         await axios.post("/api/marks", {
    //             section: selectedSection,
    //             subject: selectedSubject,
    //             marks,
    //         });
    //         alert("Marks submitted successfully!");
    //     } catch (error) {
    //         console.error("Error submitting marks:", error);
    //         alert("Failed to submit marks.");
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    return (
        <p>faculty upload marks</p>
        // <div className="upload-marks-container p-4">
        //     <h2 className="text-xl font-bold mb-4">Upload Marks</h2>
        //
        //     {/* Section Selector */}
        //     <div className="mb-4">
        //         <label className="block mb-1">Select Section</label>
        //         <select
        //             value={selectedSection}
        //             onChange={(e) => setSelectedSection(e.target.value)}
        //             className="p-2 border rounded w-full"
        //         >
        //             <option value="">-- Select Section --</option>
        //             {sections.map(section => (
        //                 <option key={section.id} value={section.id}>{section.name}</option>
        //             ))}
        //         </select>
        //     </div>
        //
        //     {/* Subject Selector */}
        //     {selectedSection && (
        //         <div className="mb-4">
        //             <label className="block mb-1">Select Subject</label>
        //             <select
        //                 value={selectedSubject}
        //                 onChange={(e) => setSelectedSubject(e.target.value)}
        //                 className="p-2 border rounded w-full"
        //             >
        //                 <option value="">-- Select Subject --</option>
        //                 {subjects.map(subject => (
        //                     <option key={subject.id} value={subject.id}>{subject.name}</option>
        //                 ))}
        //             </select>
        //         </div>
        //     )}
        //
        //     {/* Student List */}
        //     {selectedSubject && students.length > 0 && (
        //         <div className="mb-4">
        //             <h3 className="text-lg font-bold mb-2">Enter Marks for Students</h3>
        //             <table className="table-auto w-full border">
        //                 <thead>
        //                 <tr>
        //                     <th className="border px-4 py-2">Roll No</th>
        //                     <th className="border px-4 py-2">Name</th>
        //                     <th className="border px-4 py-2">Marks</th>
        //                 </tr>
        //                 </thead>
        //                 <tbody>
        //                 {students.map(student => (
        //                     <tr key={student.id}>
        //                         <td className="border px-4 py-2">{student.rollNo}</td>
        //                         <td className="border px-4 py-2">{student.name}</td>
        //                         <td className="border px-4 py-2">
        //                             <input
        //                                 type="number"
        //                                 value={marks[student.id]}
        //                                 onChange={(e) => handleMarkChange(student.id, e.target.value)}
        //                                 className="p-2 border rounded w-full"
        //                             />
        //                         </td>
        //                     </tr>
        //                 ))}
        //                 </tbody>
        //             </table>
        //         </div>
        //     )}
        //
        //     {/* Submit Button */}
        //     {selectedSubject && students.length > 0 && (
        //         <div className="mt-4">
        //             <button
        //                 onClick={handleSubmit}
        //                 disabled={isLoading}
        //                 className={`bg-blue-500 text-white p-2 rounded ${isLoading ? "opacity-50" : "hover:bg-blue-600"}`}
        //             >
        //                 {isLoading ? "Submitting..." : "Submit Marks"}
        //             </button>
        //         </div>
        //     )}
        // </div>
    );
}

export default FacultyUploadMarks;
