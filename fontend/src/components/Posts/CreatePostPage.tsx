import { TimePicker, Select, DatePicker, UploadFile } from "antd";
import React, { useEffect, useState } from "react";
import { CustomDynamicForm } from "./form/CustomDynamicForm";
import { PicturesWall } from "./PictureWall/PicturesWall";
import { genderOptions, memberLevel } from "./options";
import { tagRender } from "./tagRender";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Dayjs } from "dayjs";
import "./createpost.css";
import { disabledDate, filterOption } from "./FunctionHandler";
import axios from "axios";
import { optional } from "../../interface";

export const CreatePostPage: React.FC = () => {
    const [phones, setPhones] = useState([""]);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [locationOptions, setLocationOptions] = useState();

    const createPostForm = useFormik({
        initialValues: {
            title: "",
            description: "",
            memberCount: "",
            date: "",
            startTime: "",
            gender: 0,
            phones: [""],
            images: "",
            levelMemberMin: 0,
            levelMemberMax: 0,
            priceMin: 0,
            priceMax: 0,
            agreement: false,
            location_id: "",
            user_id: "user id",
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            fileList.forEach((file) => {
                formData.append("files", file.originFileObj as File);
            });

            const resPostId = await axios.post("http://localhost:5000/api/posts", {
                values,
            });

            const postId = resPostId.data;
            console.log("postId :", postId);
            formData.append("postId", String(postId));
            console.log("formData :", formData);

            const responseUpload = await axios.post("http://localhost:5000/api/upload/post", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        },
    });
    const HandleLocationOnChange = (value: string) => {
        createPostForm.setFieldValue("location_id", value);
    };

    const handleGenderChange = (value: any) => {
        createPostForm.setFieldValue("gender", value);
    };

    const handleDateChange = (date: Dayjs, dateString: string | string[]) => {
        createPostForm.setFieldValue("date", dateString);
    };
    const handleStartTimeChange = (time: Dayjs, timeString: string | string[]) => {
        createPostForm.setFieldValue("startTime", timeString);
    };
    const handleLevelMemberMinChange = (value: any) => {
        createPostForm.setFieldValue("levelMemberMin", value);
    };
    const handleLevelMemberMaxChange = (value: any) => {
        createPostForm.setFieldValue("levelMemberMax", value);
    };
    const handleAgreementChange = (e: any) => {
        createPostForm.setFieldValue("agreement", e.target.checked);
        if (e.target.checked) {
            createPostForm.setFieldValue("priceMin", "");
            createPostForm.setFieldValue("priceMax", "");
        }
    };

    useEffect(() => {
        createPostForm.setFieldValue("phones", phones);
    }, [phones]);

    useEffect(() => {
        const getLocationOptions = async () => {
            const locations = await axios.get("http://localhost:5000/api/search/locations");
            return locations;
        };
        getLocationOptions().then((res) => {
            setLocationOptions(res.data);
        });
    }, []);

    console.log(createPostForm.values);
    return (
        <div className="create-post-form max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
            <form
                onSubmit={createPostForm.handleSubmit}
                className="my-4 sm:my-6 rounded-2xl border-2 flex flex-col md:flex-row gap-6 p-4 sm:p-6">
                <div className="flex-1 flex flex-col gap-4 md:w-3/5">
                    <div className="font-semibold text-lg text-black-ish-200">Thông tin chung</div>

                    <div className="w-full relative">
                        <input
                            className="peer w-full p-4 pt-6 bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4"
                            type="text"
                            value={createPostForm.values.title}
                            name="title"
                            onChange={createPostForm.handleChange}
                        />
                        <label className="absolute text-md duration-150 transform -translate-y-3 top-5 origin-[0] whitespace-nowrap left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 hover:cursor-text text-black-ish-100">
                            Tiêu đề<span className="text-red-500"> *</span>
                        </label>
                    </div>
                    <div className="w-full relative">
                        <textarea
                            value={createPostForm.values.description}
                            name="description"
                            onChange={createPostForm.handleChange}
                            id="input-post-description"
                            placeholder=" "
                            className="peer w-full p-4 pt-6 bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4"></textarea>
                        <label className="absolute text-md duration-150 transform -translate-y-3 top-5 origin-[0] whitespace-nowrap left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 hover:cursor-text text-black-ish-100">
                            Mô tả chi tiết<span className="text-red-500"> *</span>
                        </label>
                    </div>

                    <div className="font-semibold text-md text-black-ish-200">Sân đấu:</div>
                    <div className=" w-full relative">
                        <Select
                            showSearch
                            className="input-location"
                            placeholder="Tìm kiếm sân đấu"
                            optionFilterProp="children"
                            onChange={HandleLocationOnChange}
                            filterOption={filterOption}
                            dropdownRender={(menu) => <div className="custom-dropdown">{menu}</div>}
                            options={locationOptions}
                        />
                    </div>
                    <div className="font-semibold text-md text-black-ish-200">Yêu cầu về thành viên:</div>
                    <div className="flex flex-col sm:grid grid-cols-2 gap-4">
                        <div className="w-full relative">
                            <input
                                className="peer w-full p-4 pt-6 bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4"
                                type="number"
                                name="memberCount"
                                value={createPostForm.values.memberCount}
                                onChange={createPostForm.handleChange}
                                min="1"
                            />
                            <label className="absolute text-md duration-150 transform -translate-y-3 top-5 origin-[0] whitespace-nowrap left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 hover:cursor-text text-black-ish-100">
                                Số người cần tuyển<span className="text-red-500"> *</span>
                            </label>
                        </div>
                        <div className="w-full relative">
                            <Select
                                placeholder="Giới tính"
                                className="input-post w-full"
                                mode="multiple"
                                tagRender={tagRender}
                                style={{ border: "2px solid #e5e7eb", width: "100%" }}
                                options={genderOptions}
                                onChange={handleGenderChange}
                            />
                        </div>
                    </div>
                    <div className="font-semibold text-md text-black-ish-200">Trình độ:</div>
                    <div className="flex flex-col sm:grid grid-cols-2 gap-4">
                        <div className="w-full relative">
                            <Select
                                placeholder="Trình độ tối thiểu"
                                className="input-post w-full"
                                onChange={handleLevelMemberMinChange}
                                options={memberLevel}
                                style={{ border: "2px solid #e5e7eb" }}
                            />
                        </div>
                        <div className="w-full relative">
                            <Select
                                placeholder="Trình độ tối đa"
                                className="input-post  w-full"
                                onChange={handleLevelMemberMaxChange}
                                options={memberLevel}
                            />
                        </div>
                    </div>
                    <div className="font-semibold text-md text-black-ish-200">Thời gian:</div>
                    <div className="flex flex-col sm:grid grid-cols-2 gap-4">
                        <div className="w-full relative">
                            <TimePicker
                                className="custom-time-picker"
                                placeholder="Giờ bắt đầu"
                                minuteStep={30}
                                style={{ width: "100%", height: "65px" }}
                                format={"HH:mm"}
                                inputReadOnly
                                onChange={handleStartTimeChange}
                            />
                        </div>
                        <div className="w-full relative">
                            <DatePicker
                                className="custom-date-picker"
                                format={{
                                    format: "DD-MM-YYYY",
                                }}
                                disabledDate={disabledDate}
                                placeholder="Ngày diễn ra"
                                inputReadOnly
                                style={{ width: "100%", height: "65px" }}
                                onChange={handleDateChange}
                            />
                        </div>
                    </div>
                    <div className="font-semibold text-md text-black-ish-200">Phí giao lưu:</div>
                    <div className="flex flex-col sm:grid grid-cols-3 gap-4">
                        <div className="w-full relative">
                            <input
                                placeholder="Từ"
                                className="peer w-full p-4 pt-6 bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4"
                                type="number"
                                name="priceMin"
                                min={1}
                                value={createPostForm.values.priceMin}
                                onChange={createPostForm.handleChange}
                            />
                        </div>
                        <div className="w-full relative">
                            <input
                                placeholder="Đến"
                                className="peer w-full p-4 pt-6 bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4"
                                type="number"
                                name="priceMax"
                                min={1}
                                value={createPostForm.values.priceMax}
                                onChange={createPostForm.handleChange}
                            />
                        </div>
                        <div className="w-full relative agreed-checkbox-container">
                            <p className="text-[14px]">Or</p>
                            <input
                                className="agreed-checkbox"
                                type="checkbox"
                                value="thỏa thuận"
                                onChange={handleAgreementChange}
                            />
                            <div className="text-md ">Thỏa thuận</div>
                        </div>
                    </div>
                    <div className="hidden md:flex justify-center mt-2">
                        <div className="w-full sm:w-1/2 lg:w-1/3 flex gap-4 justify-end">
                            <button
                                id="cancel-post"
                                type="button"
                                className="relative bg-primary text-white disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full bg-white border-black text-black text-md py-3 font-semibold border-2">
                                Hủy
                            </button>
                            <button
                                id="submit-post"
                                type="submit"
                                className="relative ant-btn-primary disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full  border-primary text-white text-md py-3 font-semibold border-2">
                                Đăng tin
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 md:w-2/5 w-full relative">
                    <div className="font-semibold text-lg text-black-ish-200">Thông tin liên hệ</div>
                    <div className="w-full relative">
                        <CustomDynamicForm values={phones} setValues={setPhones} />
                    </div>
                    <div className="font-semibold text-lg text-black-ish-200 mt-2">Hình ảnh mô tả</div>
                    <div className="flex flex-wrap gap-3">
                        <PicturesWall fileList={fileList} setFileList={setFileList} />
                    </div>
                </div>
            </form>
        </div>
    );
};
