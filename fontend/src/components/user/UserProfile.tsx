import { Avatar, Button, Form, Space, Input, Row, Col, message, UploadFile, Upload, UploadProps } from "antd";
import { Search_Page_header } from "../SearchPage/header/SearchPageHeader";
import { EditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../redux/apiRequest";
import { PicturesWall } from "../Posts/PictureWall/PicturesWall";
import { RootState } from "../../interface";
import "./user-profile.css";
import UpLoadService from "../../services/uploads/UploadService";

export const UserProfile = () => {
    const user = useSelector((state: RootState) => state.auth.login.currentUser);
    const initInputState = {
        displaynameInput: true,
        contactPhoneInput: true,
        facebookId: true,
    };
    const [isChangeAvatar, setIsChangeAvatar] = useState(true);
    const [isEditable, setIsEditable] = useState(initInputState);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const dispatch = useDispatch();
    const uploadService = new UpLoadService();

    const rules = {
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
                max: 16,
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
    const handleEditClick = (inputName: string) => {
        setIsEditable((prev) => ({
            ...prev,
            [inputName]: false,
        }));
    };

    const handleFormFinish = async (values: any) => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append("files", file.originFileObj as File);
        });

        const avaUrlResponse = await uploadService.uploadAvatar(formData);
        values.avaUrl = avaUrlResponse.data[0].url;

        updateUserInfo(dispatch, values, user);
        setIsEditable(initInputState);
    };

    useEffect(() => {
        if (fileList.length > 0) {
            setIsChangeAvatar(false);
        } else {
            setIsChangeAvatar(true);
        }
    }, [fileList]);
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
                            <Col span={12}>
                                <Form.Item name="facebookId" label="Avatar" rules={rules.facebookId}>
                                    <PicturesWall setFileList={setFileList} fileList={fileList} maxCount={1} />
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
                                    isEditable.facebookId &&
                                    isChangeAvatar
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
