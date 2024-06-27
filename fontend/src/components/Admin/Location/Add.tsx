import { Button, Cascader, DatePicker, Form, FormProps, Input, InputNumber, Space, TimePicker, UploadFile } from "antd";
import { PicturesWall } from "../../User/Posts/PictureWall/PicturesWall";
import { useState } from "react";
import "./index.css";
import { MyFormItem } from "../../common/InputFIeld/MyFormItem";
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
export const AddLocationPage = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const onFinish = (values: any) => {
        console.log("Success:", values);
    };
    const timeFormat = "HH:mm";
    return (
        <Form onFinish={onFinish} className="pt-8 pb-10 add-location-form w-full " {...formItemLayout}>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 md:gap-6">
                <div className="md:col-span-1">
                    <MyFormItem
                        label="Tên"
                        name="name"
                        rules={[{ required: true, message: "Please input!" }]}
                        children={<Input />}
                    />

                    <MyFormItem
                        label="Thành phố:"
                        name="city"
                        rules={[{ required: true, message: "Please input!" }]}
                        children={<Input />}
                    />

                    <MyFormItem
                        label="Địa chỉ:"
                        name="address"
                        rules={[{ required: true, message: "Please input!" }]}
                        children={<Input />}
                    />

                    <MyFormItem
                        label="SĐT liên hệ:"
                        name="phoneNumber"
                        rules={[{ required: true, message: "Please input!" }]}
                        children={<Input />}
                    />

                    <MyFormItem
                        label="Mô tả về sân:"
                        name="description"
                        rules={[{ required: true, message: "Please input!" }]}
                        children={<Input.TextArea />}
                    />
                </div>
                <div className="md:col-span-1">
                    <MyFormItem
                        label="Số sân:"
                        name="courtNumber"
                        rules={[{ required: true, message: "Please input!" }]}
                        children={<InputNumber style={{ width: "100%" }} />}
                    />

                    <MyFormItem
                        label="Giá thuê:"
                        name="prices"
                        rules={[{ required: true, message: "Please input!" }]}
                        children={
                            <>
                                <Space.Compact>
                                    <MyFormItem
                                        name={["prices", "priceMin"]}
                                        noStyle
                                        rules={[{ required: true, message: "Province is required" }]}
                                        children={<InputNumber placeholder="Từ" style={{ width: "50%" }} />}
                                    />
                                    <MyFormItem
                                        name={["prices", "priceMax"]}
                                        noStyle
                                        rules={[{ required: true, message: "Province is required" }]}
                                        children={<InputNumber placeholder="Đến" style={{ width: "50%" }} />}
                                    />
                                </Space.Compact>
                            </>
                        }
                    />

                    <MyFormItem
                        label="thời gian mở cửa:"
                        name="openHours"
                        rules={[{ required: true, message: "Please input!" }]}
                        children={<TimePicker.RangePicker format={timeFormat} className="time-picker" />}
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
                    <Button className="btn-cancel">Hủy</Button>
                </div>
            </div>
        </Form>
    );
};
