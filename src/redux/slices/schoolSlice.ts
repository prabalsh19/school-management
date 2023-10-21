import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalStudents: 0,
  avgAttendance: 0,
  avgMarks: 0,
  topStudent: "",
};

export const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {
    updateSchoolStats: (state, action) => {
      state.totalStudents = action.payload.totalStudents;
      state.avgAttendance = action.payload.avgAttendance;
      state.avgMarks = action.payload.avgMarks;
      state.topStudent = action.payload.topStudent;
    },
  },
});

export const { updateSchoolStats } = schoolSlice.actions;
