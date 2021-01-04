import axios from "axios";

import { url } from "../constant/URL";
const fetchData = async (params) => {
  try {
    const response = await axios(`${url}/${params}`);

    return response.data;
  } catch (error) {
    console.log(error, "error");
  }
};
const deleteData = async (params, id) => {
  try {
    const response = await axios.delete(`${url}/${params}/${id}`);
    //refetch data
    // fetchData(params);
    return response.data;
  } catch (error) {
    console.log(error, "error");
  }
};
const addData = async (params, data) => {
  try {
    const response = await axios.post(`${url}/${params}`, data);
    return response;
  } catch (error) {
    console.log(error, "error");
  }
};

const editData = async (params, id, data) => {
  try {
    const response = await axios.delete(`${url}/${params}/${id}`, data);
    console.log(response.data);
  } catch (error) {
    console.log(error, "error");
  }
};
export { fetchData, deleteData, addData, editData };
