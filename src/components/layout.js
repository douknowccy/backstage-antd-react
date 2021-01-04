import React from "react";
import { Layout, Menu } from "antd";
import { FileOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import sidebarList from "../utils/sidebarList";
import styled from "styled-components";
const { Header, Content, Footer, Sider } = Layout;

export const LayoutHome = ({ children }) => {
  const { location } = useHistory();
  const [collapsed, setCollapsed] = React.useState(false);
  const onCollapse = () => {
    setCollapsed((preState) => !preState);
  };
  return (
    <LayoutWrapper>
      <Layout className="layout">
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
        <Layout className="site-layout" style={{ Height: "100vh" }}>
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "12px 16px" }} className="content">
            {children}
          </Content>
          <Footer style={{ textAlign: "center" }}>@2021 credit by Elon</Footer>
        </Layout>
      </Layout>
    </LayoutWrapper>
  );
};
//do some responsive......
const LayoutWrapper = styled.main`
  .layout {
    height: 100vh;
    width: 100vw;
  }
  .content {
    display: inline-block;
    width: 100vw;
    max-width: 1000px;
    min-width: 500px;
  }
`;
