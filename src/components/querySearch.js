const querySearch = ({ query, newCourses, courses }) => {
  if (!query) {
    return courses;
  }
  const searchCourses = newCourses.filter((item) => {
    if (item.name.indexOf(query) !== -1 || item.type.indexOf(query) !== -1)
      return item;
  });
  return searchCourses;
};
export default querySearch;
