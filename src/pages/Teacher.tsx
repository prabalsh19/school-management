import { useEffect } from "react";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { StoreType, Teacher as TeacherType } from "../utils/types";
import "./styles.scss";
import { fetchTeachers } from "../redux/slices/teacherSlice";

export const Teacher = () => {
  const teachers = useSelector((state: StoreType) => state.teachers.teachers);
  const status = useSelector((state: StoreType) => state.teachers.status);
  const dispatch = useDispatch();
  console.log(useSelector((state) => state));
  useEffect(() => {
    if (status === "idle") {
      //@ts-ignore
      dispatch(fetchTeachers());
    }
  }, []);
  return (
    <div className="student">
      <h1>Teacher</h1>
      <Link to={"/teacher/add"} className="btn">
        Add
      </Link>
      <ul className="student__list">
        {teachers.length > 0 &&
          teachers.map((teacher: TeacherType) => (
            <li key={teacher._id} className="student__list__item">
              <Link to={`/teacher/${teacher._id}`}>
                {teacher.name} - (Subject: {teacher.subject})
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};
