import React from "react";
import { Layout, Menu } from "antd";
import { FileOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import sidebarList from "../utils/sidebarList";
const { Header, Content, Footer, Sider } = Layout;

export const LayoutHome = ({ children }) => {
  const { location } = useHistory();
  const [collapsed, setCollapsed] = React.useState(false);
  const onCollapse = () => {
    setCollapsed((preState) => !preState);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" selectedKeys={[location.pathname]} mode="inline">
          <Menu.Item key="/" icon={<FileOutlined />}>
            <Link to="/"> Home</Link>
          </Menu.Item>
          {sidebarList.map((item) => {
            const { icon, path, name } = item;
            return (
              <Menu.Item key={path} icon={icon}>
                <Link to={path}> {name} </Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "12px 16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
