export const getNameOfLecturer = ({ firstname, lastname, academic_title, salutation }) => {
  return academic_title
    ? `${salutation} ${academic_title} ${lastname}, ${firstname}`
    : `${salutation} ${lastname}, ${firstname}`;
};
