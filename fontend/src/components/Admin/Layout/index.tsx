import { Layout, Menu, MenuProps, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useState } from "react";
import { MyFooter } from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { PieChartOutlined, DesktopOutlined, UserOutlined, TeamOutlined, FileOutlined } from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem("Dashboard", "1", <PieChartOutlined />),
    getItem("Table", "2", <DesktopOutlined />),
    getItem("Location", "sub1", <UserOutlined />, [
        getItem("overview", "3"),
        getItem("Add", "4"),
        getItem("Alex", "5"),
    ]),
    getItem("Team", "sub2", <TeamOutlined />, [getItem("Team 1", "6"), getItem("Team 2", "8")]),
    getItem("Files", "9", <FileOutlined />),
];

export const LayoutPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();
    const handleMenuOnChange = (e: any) => {
        const key = e.key;
        console.log("key :", typeof key);
        switch (key) {
            case "1":
                navigate("dashboard");
                break;
            case "3":
                navigate("location");
                break;
            case "4":
                navigate("location/add");
                break;
        }
    };
    return (
        <Layout hasSider>
            <Sider
                theme="light"
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{ overflow: "auto", height: "100vh", position: "fixed" }}>
                <div className="demo-logo-vertical" />
                <Menu
                    onSelect={handleMenuOnChange}
                    className="sider"
                    theme="light"
                    defaultSelectedKeys={["1"]}
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: "8px 12px 0", overflow: "initial" }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
