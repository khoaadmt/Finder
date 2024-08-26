import { Button, Cascader, DatePicker, Form, FormProps, Input, InputNumber, Space, TimePicker, UploadFile } from "antd";
import { PicturesWall } from "../../User/Posts/PictureWall/PicturesWall";
import { useState } from "react";
import "./index.css";
import { MyFormItem } from "../../common/InputFIeld/MyFormItem";
import { AutoCompleteLocation } from "./AutoCompleteLocation";
import LocationService from "../../../services/location/LocationService";
import { useSelector } from "react-redux";
import { RootState } from "../../../interface";
export const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

export type Coordinates = {
    lat: string;
    lng: string;
} | null;
export const AddLocationPage = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const timeFormat = "HH:mm";
    const [coordinates, setCoordinates] = useState<Coordinates>(null);
    const [address, setAddress] = useState("");
    const locationService = new LocationService();
    const user = useSelector((state: RootState) => state.auth.login.currentUser);

    const onFinish = (values: any) => {
        // console.log("Success:", values);
        // console.log("addres: ", address);
        // console.log("coordinates: ", coordinates);
        values.address = address;
        values.latitude = coordinates?.lat;
        values.longitude = coordinates?.lng;
        console.log(values);
        //locationService.createLocation(values, user?.accessToken);
    };

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
                        children={
                            <AutoCompleteLocation
                                setCoordinates={setCoordinates}
                                setAddress={setAddress}
                                defaultvalue=""
                            />
                        }
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
                        children={<Input.TextArea autoSize={{ minRows: 4, maxRows: 12 }} />}
                    />
                </div>
                <div className="md:col-span-1">
                    <MyFormItem
                        label="Số sân:"
                        name="courtNumber"
                        rules={[{ required: true, message: "Please input!" }]}
                        children={<InputNumber style={{ width: "100%" }} />}
                    />

                    <MyFormItem label="Giá thuê:">
                        <Space>
                            <MyFormItem
                                name="priceMin"
                                noStyle
                                rules={[{ required: true, message: "Giá thuê tối thiểu là bắt buộc" }]}>
                                <InputNumber placeholder="Từ" style={{ width: "100%" }} />
                            </MyFormItem>
                            <MyFormItem
                                name="priceMax"
                                noStyle
                                rules={[{ required: true, message: "Giá thuê tối đa là bắt buộc" }]}>
                                <InputNumber placeholder="Đến" style={{ width: "100%" }} />
                            </MyFormItem>
                        </Space>
                    </MyFormItem>

                    <MyFormItem
                        label="thời gian mở cửa:"
                        name="openHours"
                        rules={[{ required: true, message: "Please input!" }]}
                        children={
                            <TimePicker.RangePicker format={timeFormat} className="time-picker" minuteStep={30} />
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
                    <Button className="btn-cancel">Hủy</Button>
                </div>
            </div>
        </Form>
    );
};
