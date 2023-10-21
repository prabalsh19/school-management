import { useEffect } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../redux/slices/studentSlice";
import { Link } from "react-router-dom";
import { StoreType, Student as StudentType } from "../utils/types";
import "./styles.scss";

export const Student = () => {
  const status = useSelector((state: StoreType) => state.students.status);
  const students = useSelector((state: StoreType) => state.students.students);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      //@ts-ignore
      dispatch(fetchStudents());
    }
  }, []);

  return (
    <div className="student">
      <h1>Student</h1>
      <Link to={"/student/add"} className="btn">
        Add
      </Link>
      <ul className="student__list">
        {students.length > 0 &&
          students.map((student: StudentType) => (
            <li key={student._id} className="student__list__item">
              <Link to={`/student/${student._id}`}>
                {student.name} - (Age: {student.age}, Grade: {student.grade})
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};
