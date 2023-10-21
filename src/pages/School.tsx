import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSchoolStats } from "../redux/slices/schoolSlice";
import { fetchStudents } from "../redux/slices/studentSlice";
import { StoreType } from "../utils/types";

export const School = () => {
  const students = useSelector((state: StoreType) => state.students.students);
  const status = useSelector((state: StoreType) => state.students.status);
  const stats = useSelector((state: StoreType) => state.school);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      //@ts-ignore
      dispatch(fetchStudents());
    }
    if (students.length > 0) {
      const totalStudents = students?.length;
      const totalAttendance = students?.reduce(
        (acc, student) => acc + student.attendance,
        0
      );
      const avgAttendance = totalAttendance / totalStudents;
      const totalMarks = students?.reduce(
        (acc, student) => acc + student.marks,
        0
      );
      const avgMarks = totalMarks / totalStudents;
      const topStudent = students?.reduce((topStudent, student) =>
        student.marks > topStudent.marks ? student : topStudent
      );
      dispatch(
        updateSchoolStats({
          totalStudents,
          avgAttendance,
          avgMarks,
          topStudent,
        })
      );
    }
  }, [students]);

  return (
    <div className="school">
      <h1>School</h1>
      <p>Total Number of Students: {stats.totalStudents}</p>
      <p>Average Attendance: {stats.avgAttendance}</p>
      <p>Average Marks: {stats.avgMarks}</p>
      <p>Top Student: {stats.topStudent.name}</p>
    </div>
  );
};
