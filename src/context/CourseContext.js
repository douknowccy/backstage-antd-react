import React, { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/courseReducer";
import { ISLOADING, GETDATA, DELETECOURSE, ADDNEWCOURSE } from "../action";
import { fetchData, addData } from "../components/fetchData";

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
  const addCourse = (params, data) => {
    dispatch({ type: ISLOADING });
    // console.log(params, data);
    addData("courses", data)
      .then((res) => dispatch({ type: ADDNEWCOURSE, payload: res }))
      .catch((error) => console.log(error));
  };
  const getData = () => {
    fetchData("courses")
      .then((res) => dispatch({ type: GETDATA, payload: res }))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    dispatch({ type: ISLOADING });
    getData();
  }, []);
  return (
    <CourseContext.Provider value={{ ...state, deleteCourse, addCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

const useCourseContext = () => useContext(CourseContext);
export default useCourseContext;
