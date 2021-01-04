import { ISLOADING, GETDATA, DELETECOURSE, ADDNEWCOURSE } from "../action";
import { deleteData, addData } from "../components/fetchData";
const CourseReducer = (state, action) => {
  switch (action.type) {
    case ISLOADING:
      return { ...state, isLoading: true };
    case GETDATA:
      return { ...state, courses: action.payload, isLoading: false };
    case DELETECOURSE:
      deleteData(action.payload.params, action.payload.id);
      return {
        ...state,
        isLoading: false,
        courses: state.courses.filter(
          (course) => course.id !== action.payload.id
        ),
      };
    case ADDNEWCOURSE:
      state.courses.push(action.payload.data);
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default CourseReducer;
