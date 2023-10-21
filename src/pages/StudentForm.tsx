import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent, editStudent } from "../redux/slices/studentSlice";
import { useLocation, useNavigate } from "react-router-dom";

export const StudentForm = () => {
  const { student } = useLocation().state || true;

  const [formData, setFormData] = useState({
    name: student?.name || "",
    age: student?.age || 0,
    grade: student?.grade || "",
    gender: student?.gender || "male",
    attendance: student?.attendance || 0,
    marks: student?.marks || 0,
  });
  const { name, age, grade, gender, attendance, marks } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (name: string, value: string | number) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    student
      ? //@ts-ignore
        dispatch(editStudent({ id: student._id, studentData: formData }))
      : //@ts-ignore
        dispatch(addStudent(formData));
    alert("Success!");
    navigate("/");
  };
  return (
    <div className="addStudent">
      <h1>{student ? "Edit Student" : "Add Student"}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          Name <br />{" "}
          <input
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            required
            type="text"
            name="name"
            value={name}
          />{" "}
        </label>
        <label htmlFor="">
          Age <br />{" "}
          <input
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            required
            type="number"
            name="age"
            value={age}
          />{" "}
        </label>
        <label htmlFor="">
          Grade <br />{" "}
          <input
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            required
            type="text"
            maxLength={1}
            name="grade"
            value={grade}
            style={{ textTransform: "uppercase" }}
          />{" "}
        </label>
        <label htmlFor="">
          Gender <br />
          <select
            value={gender}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            name="gender"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label htmlFor="">
          Attendance <br />{" "}
          <input
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            required
            type="number"
            min={0}
            max={100}
            name="attendance"
            value={attendance}
          />{" "}
        </label>
        <label htmlFor="">
          Marks <br />{" "}
          <input
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            required
            type="number"
            min={0}
            max={100}
            name="marks"
            value={marks}
          />{" "}
        </label>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};
