import { Button, Form, Input, InputNumber, Modal, Space, TimePicker, UploadFile } from "antd";
import React, { FC, useState } from "react";
import { MyFormItem } from "../../common/InputFIeld/MyFormItem";
import { PicturesWall } from "../../User/Posts/PictureWall/PicturesWall";
import { AutoCompleteLocation } from "./AutoCompleteLocation";
import { Coordinates, formItemLayout } from "./Add";
import dayjs, { Dayjs } from "dayjs";
interface Prop {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const EditLocationModal: React.FC<Prop> = (prop) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const timeFormat = "HH:mm";
    const [coordinates, setCoordinates] = useState<Coordinates>(null);
    const [address, setAddress] = useState("");

    const onFinish = (values: any) => {
        console.log("Success:", values);
        console.log("coordinates: ", coordinates);
    };

    const { isModalOpen, setIsModalOpen } = prop;
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const data = {
        name: "VNBC",
        city: "Hà Nội",
        address: "Từ liêm, Hà Nội, Việt Nam",
        phoneNumber: "0366516834",
        description: "Mô tả vắn tắt",
        numberOfCourt: 9,
        priceMin: 1000000,
        priceMax: 5000000,
        startTime: "05:30",
        endTime: "22:00",
        agreement: true,
    };
    return (
        <Modal
            className="add-location-modal"
            title="Chỉnh sửa thông tin sân cầu"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
            ]}>
            <Form onFinish={onFinish} className="pt-8 pb-10 add-location-form w-full " {...formItemLayout}>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 md:gap-6">
                    <div className="md:col-span-1">
                        <MyFormItem
                            label="Tên"
                            name="name"
                            rules={[{ required: true, message: "Please input!" }]}
                            children={<Input defaultValue={"aa"} />}
                        />

                        <MyFormItem
                            label="Thành phố:"
                            name="city"
                            rules={[{ required: true, message: "Please input!" }]}
                            children={<Input defaultValue={data.city} />}
                        />

                        <MyFormItem
                            label="Địa chỉ:"
                            children={
                                <AutoCompleteLocation
                                    setCoordinates={setCoordinates}
                                    setAddress={setAddress}
                                    defaultvalue={data.address}
                                />
                            }
                        />

                        <MyFormItem
                            label="SĐT liên hệ:"
                            name="phoneNumber"
                            rules={[{ required: true, message: "Please input!" }]}
                            children={<Input defaultValue={data.phoneNumber} />}
                        />

                        <MyFormItem
                            label="Mô tả về sân:"
                            name="description"
                            rules={[{ required: true, message: "Please input!" }]}
                            children={
                                <Input.TextArea
                                    autoSize={{ minRows: 4, maxRows: 12 }}
                                    defaultValue={data.description}
                                />
                            }
                        />
                    </div>
                    <div className="md:col-span-1">
                        <MyFormItem
                            label="Số sân:"
                            name="courtNumber"
                            rules={[{ required: true, message: "Please input!" }]}
                            children={<InputNumber style={{ width: "100%" }} defaultValue={data.numberOfCourt} />}
                        />

                        <MyFormItem label="Giá thuê:">
                            <Space>
                                <MyFormItem
                                    name="priceMin"
                                    noStyle
                                    rules={[{ required: true, message: "Giá thuê tối thiểu là bắt buộc" }]}>
                                    <InputNumber
                                        placeholder="Từ"
                                        style={{ width: "100%" }}
                                        defaultValue={data.priceMin}
                                    />
                                </MyFormItem>
                                <MyFormItem
                                    name="priceMax"
                                    noStyle
                                    rules={[{ required: true, message: "Giá thuê tối đa là bắt buộc" }]}>
                                    <InputNumber
                                        placeholder="Đến"
                                        style={{ width: "100%" }}
                                        defaultValue={data.priceMax}
                                    />
                                </MyFormItem>
                            </Space>
                        </MyFormItem>

                        <MyFormItem
                            label="thời gian mở cửa:"
                            name="openHours"
                            rules={[{ required: true, message: "Please input!" }]}
                            children={
                                <TimePicker.RangePicker
                                    format={timeFormat}
                                    className="time-picker"
                                    minuteStep={30}
                                    defaultValue={[dayjs(data.startTime, timeFormat), dayjs(data.endTime, timeFormat)]}
                                />
                            }
                        />

                        <MyFormItem
                            label="Hình ảnh:"
                            name="img"
                            children={<PicturesWall setFileList={setFileList} fileList={fileList} maxCount={8} />}
                        />
                    </div>
                </div>
                <div className="flex justify-center w-full pt-8 ">
                    <div className="w-1/4 flex justify-around">
                        <Button className="btn-submit" htmlType="submit">
                            Lưu
                        </Button>
                    </div>
                </div>
            </Form>
        </Modal>
    );
};
