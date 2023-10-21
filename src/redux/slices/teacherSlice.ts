import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Teacher, TeacherState } from "../../utils/types";
import axios from "axios";

const initialState: TeacherState = {
  teachers: [],
  error: null,
  status: "idle",
};

export const fetchTeachers = createAsyncThunk(
  "teacher/fetchTeachers",
  async () => {
    const BaseUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.get(BaseUrl + "teacher");
    return response.data;
  }
);

export const addTeacher = createAsyncThunk(
  "teacher/add",
  async (teacherData: Teacher) => {
    const BaseUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.post(BaseUrl + "teacher", { ...teacherData });
    return response.data;
  }
);

export const editTeacher = createAsyncThunk(
  "teacher/edit",
  async ({ id, teacherData }: { id: string; teacherData: Teacher }) => {
    const BaseUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.put(BaseUrl + "teacher/" + id, {
      ...teacherData,
    });
    return response.data;
  }
);

export const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    deleteTeacher: (state, action) => {
      state.teachers = state.teachers.filter(
        (teacher) => teacher._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTeacher.pending, (state: TeacherState) => {
        state.status = "loading";
      })
      .addCase(addTeacher.fulfilled, (state: TeacherState, action) => {
        state.status = "success";
        state.teachers.push(action.payload.teacher);
      })
      .addCase(addTeacher.rejected, (state: TeacherState, action) => {
        state.status = "error";
        state.error = action.error.message as string;
      })
      .addCase(fetchTeachers.pending, (state: TeacherState) => {
        state.status = "loading";
      })
      .addCase(fetchTeachers.fulfilled, (state: TeacherState, action) => {
        state.status = "success";
        state.teachers = action.payload.teachers;
      })
      .addCase(fetchTeachers.rejected, (state: TeacherState, action) => {
        state.status = "error";
        state.error = action.error.message as string;
      })
      .addCase(editTeacher.pending, (state: TeacherState) => {
        state.status = "loading";
      })
      .addCase(editTeacher.fulfilled, (state: TeacherState, action) => {
        state.status = "success";
        const teacherIndex = state.teachers.findIndex(
          (teacher) => teacher._id === action.payload.teacher._id
        );
        if (teacherIndex !== -1) {
          state.teachers[teacherIndex] = action.payload.teacher;
        }
      })
      .addCase(editTeacher.rejected, (state: TeacherState, action) => {
        state.status = "error";
        state.error = action.error.message as string;
      });
  },
});

export const { deleteTeacher } = teacherSlice.actions;
