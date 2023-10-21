import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Student } from "../utils/types";
import { useDispatch } from "react-redux";
import { deleteStudent } from "../redux/slices/studentSlice";
import { getClass } from "../utils/utils";

export const StudentDetails = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const BaseUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await axios.get(BaseUrl + "student/" + id);
      setStudent(res.data.student);
    })();
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    (async () => {
      try {
        const BaseUrl = import.meta.env.VITE_BACKEND_URL;
        const res = await axios.delete(BaseUrl + "student/" + id);
        if (res.status === 200) {
          dispatch(deleteStudent(id));
          alert("Student deleted");
          navigate("/");
        }
      } catch (e) {
        console.error(e);
      }
    })();
  };

  return (
    <div className="studentDetails">
      {student && (
        <>
          <h1>{student.name}</h1>
          <p>Age: {student.age}</p>
          <p>Class: {getClass(student.age)}</p>
          <p>Grade: {student.grade}</p>
          <p>Gender: {student.gender}</p>
          <p>Attendance: {student.attendance}</p>
          <p>Marks: {student.marks}</p>
          <button
            className="btn"
            style={{ marginRight: "1rem" }}
            onClick={() => navigate("/student/edit", { state: { student } })}
          >
            Edit
          </button>
          <button className="btn" onClick={() => handleDelete(student._id)}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};
