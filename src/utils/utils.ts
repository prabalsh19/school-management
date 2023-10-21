import { Student } from "./types";

export const getClass = (age: number) => {
  const studentClass = age - 6;
  return studentClass > 12 ? 12 : studentClass;
};

export const filterArrayByClass = (
  array: Student[],
  classNum: number | string
) => {
  if (classNum === "") {
    return array;
  }
  return array.filter((item) => {
    return getClass(item.age) === classNum;
  });
};

export const filterArrayByGender = (array: Student[], gender: string) => {
  if (gender === "") {
    return array;
  }
  return array.filter((item) => {
    return item.gender.toLowerCase() === gender.toLowerCase();
  });
};

export const sortArray = (array: Student[], condition: string) => {
  if (condition === "") {
    return array;
  }
  if (condition === "name") {
    return [...array].sort((a, b) => a.name.localeCompare(b.name));
  }
  return [...array].sort((a, b) => {
    return (a as any)[condition] - (b as any)[condition];
  });
};
