import {
  ISLOADING,
  GETDATA,
  DELETECOURSE,
  ADDNEWCOURSE,
  QUERYDATA,
} from "../action";
import { deleteData, addData } from "../components/fetchData";
const CourseReducer = (state, action) => {
  switch (action.type) {
    case ISLOADING:
      return { ...state, isLoading: true };
    case GETDATA:
      return {
        ...state,
        queryCourses: action.payload,
        courses: action.payload,
        isLoading: false,
      };
    case DELETECOURSE:
      deleteData(action.payload.params, action.payload.id);
      return {
        ...state,
        isLoading: false,
        queryCourses: state.queryCourses.filter(
          (course) => course.id !== action.payload.id
        ),
      };
    case ADDNEWCOURSE:
      state.queryCourses.push(action.payload.data);
      return {
        ...state,
        isLoading: false,
      };
    case QUERYDATA:
      // console.log("dispatch query");
      return { ...state, isLoading: false, queryCourses: action.payload };
    default:
      return state;
  }
};

export default CourseReducer;
