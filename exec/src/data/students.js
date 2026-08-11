import rawStudents from '../../data/students.json'

export const students = rawStudents.map((student) => ({
  ...student,
  searchText: `${student.id} ${student.name} ${student.participation}`.toLowerCase(),
}))

