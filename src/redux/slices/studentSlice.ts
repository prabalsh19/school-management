import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { StudentState, Student } from "../../utils/types";

const initialState: StudentState = {
  students: [],
  error: null,
  status: "idle",
};

export const fetchStudents = createAsyncThunk(
  "student/fetchStudents",
  async () => {
    const BaseUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.get(BaseUrl + "student");
    return response.data;
  }
);

export const addStudent = createAsyncThunk(
  "student/add",
  async (studentData: Student) => {
    const BaseUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.post(BaseUrl + "student", { ...studentData });
    return response.data;
  }
);

export const editStudent = createAsyncThunk(
  "student/edit",
  async ({ id, studentData }: { id: string; studentData: Student }) => {
    const BaseUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.put(BaseUrl + "student/" + id, {
      ...studentData,
    });
    return response.data;
  }
);

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    deleteStudent: (state, action) => {
      state.students = state.students.filter(
        (student) => student._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addStudent.pending, (state: StudentState) => {
        state.status = "loading";
      })
      .addCase(addStudent.fulfilled, (state: StudentState, action) => {
        state.status = "success";
        state.students.push(action.payload.student);
      })
      .addCase(addStudent.rejected, (state: StudentState, action) => {
        state.status = "error";
        state.error = action.error.message as string;
      })
      .addCase(fetchStudents.pending, (state: StudentState) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state: StudentState, action) => {
        state.status = "success";
        state.students = action.payload.students;
      })
      .addCase(fetchStudents.rejected, (state: StudentState, action) => {
        state.status = "error";
        state.error = action.error.message as string;
      })
      .addCase(editStudent.pending, (state: StudentState) => {
        state.status = "loading";
      })
      .addCase(editStudent.fulfilled, (state: StudentState, action) => {
        state.status = "success";
        const studentIndex = state.students.findIndex(
          (student) => student._id === action.payload.student._id
        );
        if (studentIndex !== -1) {
          state.students[studentIndex] = action.payload.student;
        }
      })
      .addCase(editStudent.rejected, (state: StudentState, action) => {
        state.status = "error";
        state.error = action.error.message as string;
      });
  },
});

export const { deleteStudent } = studentSlice.actions;
