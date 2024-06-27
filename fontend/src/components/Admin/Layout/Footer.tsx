import { Footer } from "antd/es/layout/layout";
import React from "react";

export const MyFooter = () => {
    return (
        <Footer style={{ textAlign: "center", bottom: 0 }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
    );
};
