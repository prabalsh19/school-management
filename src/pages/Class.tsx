import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { StoreType, Student } from "../utils/types";
import { useEffect, useState } from "react";
import { fetchStudents } from "../redux/slices/studentSlice";
import {
  filterArrayByClass,
  filterArrayByGender,
  sortArray,
} from "../utils/utils";

export const Class = () => {
  const students = useSelector((state: StoreType) => state.students.students);
  const status = useSelector((state: StoreType) => state.students.status);
  const [classNum, setClassNum] = useState<string | number>("");
  const [gender, setGender] = useState<string | number>("");
  const [sortBy, setSortBy] = useState("");
  console.log(useSelector((state) => state));
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      //@ts-ignore
      dispatch(fetchStudents());
    }
  }, []);

  const filteredStudentsByClass = filterArrayByClass(students, classNum);
  const filteredStudentsByGender = filterArrayByGender(
    filteredStudentsByClass,
    gender
  );
  const sortedStudents = sortArray(filteredStudentsByGender, sortBy);
  return (
    <div className="class">
      <h1>Class</h1>
      <label style={{ marginRight: "1rem" }}>
        Filter by class:{" "}
        <select onChange={(e) => setClassNum(Number(e.target.value))}>
          <option value={""}>Select</option>

          {new Array(12).fill("").map((_, index) => (
            <option value={index + 1}>{index + 1}</option>
          ))}
        </select>
      </label>

      <label style={{ marginRight: "1rem" }}>
        Filter by Gender:{" "}
        <select onChange={(e) => setGender(e.target.value)}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label style={{ marginRight: "1rem" }}>
        Sort by:{" "}
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value={""}>Select</option>
          <option value={"name"}>Name</option>
          <option value={"age"}>Age</option>
          <option value={"attendance"}>Attendance</option>
          <option value={"marks"}>Marks</option>
        </select>
      </label>
      <br />
      <br />
      <ul className="student__list">
        {sortedStudents.length > 0 ? (
          sortedStudents.map((student: Student) => (
            <li key={student._id} className="student__list__item">
              <Link to={`/student/${student._id}`}>
                {student.name} - (Age: {student.age}, Grade:{" "}
                {student.grade.toUpperCase()}, Attendance: {student.attendance},
                Marks: {student.marks})
              </Link>
            </li>
          ))
        ) : (
          <li>No Students Found</li>
        )}
      </ul>
    </div>
  );
};
