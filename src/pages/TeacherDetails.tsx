import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Teacher } from "../utils/types";
import { useDispatch } from "react-redux";
import { deleteTeacher } from "../redux/slices/teacherSlice";

export const TeacherDetails = () => {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const BaseUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await axios.get(BaseUrl + "teacher/" + id);
      setTeacher(res.data.teacher);
    })();
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    (async () => {
      try {
        const BaseUrl = import.meta.env.VITE_BACKEND_URL;
        const res = await axios.delete(BaseUrl + "teacher/" + id);
        if (res.status === 200) {
          dispatch(deleteTeacher(id));
          alert("Teacher deleted");
          navigate("/teacher");
        }
      } catch (e) {
        console.error(e);
      }
    })();
  };

  return (
    <div className="studentDetails">
      {teacher && (
        <>
          <h1>{teacher.name}</h1>
          <p>Subject: {teacher.subject}</p>
          <p>Email: {teacher.email}</p>
          <p>Phone: {teacher.phone}</p>
          <button
            className="btn"
            style={{ marginRight: "1rem" }}
            onClick={() => navigate("/teacher/edit", { state: { teacher } })}
          >
            Edit
          </button>
          <button className="btn" onClick={() => handleDelete(teacher._id)}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};
