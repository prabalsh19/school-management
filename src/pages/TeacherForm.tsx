import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addTeacher, editTeacher } from "../redux/slices/teacherSlice";

export const TeacherForm = () => {
  const { teacher } = useLocation().state || true;

  const [formData, setFormData] = useState({
    name: teacher?.name || "",
    subject: teacher?.subject || "",
    email: teacher?.email || "",
    phone: teacher?.phone || "",
  });
  const { name, subject, email, phone } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (name: string, value: string | number) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    teacher
      ? //@ts-ignore
        dispatch(editTeacher({ id: teacher._id, teacherData: formData }))
      : //@ts-ignore
        dispatch(addTeacher(formData));
    alert("Success!");
    navigate("/teacher");
  };
  return (
    <div className="addStudent">
      <h1>{teacher ? "Edit Teacher" : "Add Teacher"}</h1>
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
          Subject <br />{" "}
          <input
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            required
            type="text"
            name="subject"
            value={subject}
          />{" "}
        </label>
        <label htmlFor="">
          Email <br />
          <input
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            required
            type="email"
            name="email"
            value={email}
          />{" "}
        </label>
        <label htmlFor="">
          Phone <br />{" "}
          <input
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            required
            type="tel"
            name="phone"
            placeholder="Indian No. Only"
            value={phone}
          />{" "}
        </label>

        <button className="btn">Submit</button>
      </form>
    </div>
  );
};
