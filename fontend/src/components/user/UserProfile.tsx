import { Avatar, Button, Form, Space, Input, Row, Col } from "antd";
import { Search_Page_header } from "../SearchPage/header/Search_Page_Header";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../interface";
import "./userprofile.css";
import { max, min } from "moment";

export const UserProfile = () => {
    const user = useSelector((state: RootState) => state.auth.login.currentUser);
    const [isEditable, setIsEditable] = useState({
        usernameInput: true,
        displaynameInput: true,
        contactPhoneInput: true,
        facebookId: true,
    });

    const rules = {
        username: [
            {
                required: !isEditable.usernameInput,
                message: "Username is require!",
            },
            {
                min: 4,
                message: "Username require min 4 characters!",
            },
            {
                max: 12,
                message: "Username require max 12 characters!",
            },
        ],
        displayName: [
            {
                required: !isEditable.displaynameInput,
                message: "Display name is require!",
            },
            {
                min: 4,
                message: "Display name require min 4 characters!",
            },
            {
                max: 12,
                message: "Display name max 12 characters!",
            },
        ],
        contactPhone: [
            {
                required: !isEditable.contactPhoneInput,
                message: "Please input value for contact phone!",
            },
            {
                pattern: /^[0-9]+$/,
                message: "Contact phone must contain only digits!",
            },
        ],
        facebookId: [
            {
                required: !isEditable.facebookId,
                message: "Please input value for Facebook ID!",
            },
            {
                pattern: /^[0-9]+$/,
                message: "Contact phone must contain only digits!",
            },
        ],
    };
    const handleEditClick = (inputName: any) => {
        setIsEditable((prev) => ({
            ...prev,
            [inputName]: false,
        }));
    };

    const handleFormFinish = (values: any) => {
        console.log(values);
    };

    return (
        <div className="user-profile">
            <Search_Page_header defaultSelectedKeys="0" />
            <div className="user-profile-content">
                <div className="overlap-group">
                    <div className="image-wrapper"></div>
                    <Avatar className="ellipse" src={user?.avaUrl} />
                    <div className="group">
                        <div className="user-name-wrapper">{user?.username}</div>
                        <div className="display-name-wrapper">{user?.displayName}</div>
                    </div>
                </div>
                <div className="user-profile-form">
                    <Form onFinish={handleFormFinish} layout="vertical" style={{ padding: "20px" }}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="username" label="User Name" rules={rules.username}>
                                    <Space.Compact>
                                        <Input
                                            className="input-form-item"
                                            defaultValue={user?.username}
                                            disabled={isEditable.usernameInput}
                                        />
                                        <div
                                            className="icon-input-form-item"
                                            onClick={() => handleEditClick("usernameInput")}>
                                            <EditOutlined style={{ fontSize: "18px" }} />
                                        </div>
                                    </Space.Compact>
                                </Form.Item>
                                <Form.Item name="displayName" label="Display Name" rules={rules.displayName}>
                                    <Space.Compact>
                                        <Input
                                            className="input-form-item"
                                            defaultValue={user?.displayName}
                                            disabled={isEditable.displaynameInput}
                                        />
                                        <div
                                            className="icon-input-form-item"
                                            onClick={() => handleEditClick("displaynameInput")}>
                                            <EditOutlined style={{ fontSize: "18px" }} />
                                        </div>
                                    </Space.Compact>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="contactPhone" label="Contact Phone" rules={rules.contactPhone}>
                                    <Space.Compact>
                                        <Input
                                            className="input-form-item"
                                            defaultValue={user?.contactPhone}
                                            disabled={isEditable.contactPhoneInput}
                                        />
                                        <div
                                            className="icon-input-form-item"
                                            onClick={() => handleEditClick("contactPhoneInput")}>
                                            <EditOutlined style={{ fontSize: "18px" }} />
                                        </div>
                                    </Space.Compact>
                                </Form.Item>
                                <Form.Item name="facebookId" label="Facebook ID" rules={rules.facebookId}>
                                    <Space.Compact>
                                        <Input
                                            className="input-form-item"
                                            defaultValue={user?.facebookId}
                                            disabled={isEditable.facebookId}
                                        />
                                        <div
                                            className="icon-input-form-item"
                                            onClick={() => handleEditClick("facebookId")}>
                                            <EditOutlined style={{ fontSize: "18px" }} />
                                        </div>
                                    </Space.Compact>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ marginTop: "18px" }}
                                disabled={
                                    isEditable.contactPhoneInput &&
                                    isEditable.displaynameInput &&
                                    isEditable.usernameInput
                                }>
                                Change
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};
