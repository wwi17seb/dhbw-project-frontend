export const getNameOfLecturer = (Lecturer) => {
  return Lecturer && (Lecturer.lastname || Lecturer.firstname)
    ? `${Lecturer.academic_title || ''} ${Lecturer.lastname || ''}, ${Lecturer.firstname || ''}`
    : '';
};
