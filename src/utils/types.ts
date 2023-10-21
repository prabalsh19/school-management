export interface Student {
  _id: string;
  name: string;
  age: number;
  grade: string;
  gender: string;
  attendance: number;
  marks: number;
}

export interface StudentState {
  students: Student[];
  error: null | string;
  status: "idle" | "loading" | "success" | "error";
}

export interface Teacher {
  _id: string;
  name: string;
  subject: string;
  email: string;
  phone: number;
}

export interface TeacherState {
  teachers: Teacher[];
  error: null | string;
  status: "idle" | "loading" | "success" | "error";
}

export interface School {
  totalStudents: number;
  avgAttendance: number;
  avgMarks: number;
  topStudent: Student;
}

export interface StoreType {
  school: School;
  students: StudentState;
  teachers: TeacherState;
}
