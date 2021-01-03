import React, { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/courseReducer";
import { ISLOADING, GETDATA, DELETECOURSE } from "../action";
import { fetchData } from "../components/fetchData";
const CourseContext = createContext();
const initialState = {
  isLoading: false,
  courses: [],
};
export const CourseContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const deleteCourse = (params, id) => {
    dispatch({ type: ISLOADING });
    dispatch({ type: DELETECOURSE, payload: { params, id } });
  };
  useEffect(() => {
    dispatch({ type: ISLOADING });
    fetchData("courses")
      .then((res) => dispatch({ type: GETDATA, payload: res }))
      .catch((error) => console.log(error));
  }, []);
  return (
    <CourseContext.Provider value={{ ...state, deleteCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

const useCourseContext = () => useContext(CourseContext);
export default useCourseContext;
