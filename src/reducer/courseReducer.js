import { ISLOADING, GETDATA, DELETECOURSE } from "../action";
import { deleteData } from "../components/fetchData";
const CourseReducer = (state, action) => {
  switch (action.type) {
    case ISLOADING:
      return { ...state, isLoading: true };
    case GETDATA:
      return { ...state, courses: action.payload, isLoading: false };
    case DELETECOURSE:
      deleteData("courses", action.payload.id);
      return {
        ...state,
        isLoading: false,
        courses: state.courses.filter(
          (course) => course.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default CourseReducer;
