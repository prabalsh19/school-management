import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { store } from "./redux/store.ts";
import { Student } from "./pages/Student.tsx";
import { StudentForm } from "./pages/StudentForm.tsx";
import { StudentDetails } from "./pages/StudentDetails.tsx";
import { Teacher } from "./pages/Teacher.tsx";
import { TeacherForm } from "./pages/TeacherForm.tsx";
import { TeacherDetails } from "./pages/TeacherDetails.tsx";
import { Class } from "./pages/Class.tsx";
import { School } from "./pages/School.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Student /> },
      { path: "/student/add", element: <StudentForm /> },
      { path: "/student/edit", element: <StudentForm /> },
      { path: "/student/:id", element: <StudentDetails /> },
      { path: "/teacher", element: <Teacher /> },
      { path: "/teacher/add", element: <TeacherForm /> },
      { path: "/teacher/edit", element: <TeacherForm /> },
      { path: "/teacher/:id", element: <TeacherDetails /> },
      { path: "/class", element: <Class /> },
      { path: "/school", element: <School /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
