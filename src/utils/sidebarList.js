import React from "react";
import { Courses, Products } from "../pages/";
import { PieChartOutlined, AreaChartOutlined } from "@ant-design/icons";

const sidebarList = [
  {
    id: 0,
    component: <Courses />,
    path: "/courses",
    name: "Courses",
    icon: <AreaChartOutlined />,
  },
  {
    id: 1,
    component: <Products />,
    path: "/products",
    name: "Products",
    icon: <PieChartOutlined />,
  },
];
export default sidebarList;
