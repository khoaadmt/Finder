import { TimePicker, Select, Tag, DatePicker, Checkbox } from "antd";
import React, { useState } from "react";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { CustomDynamicForm } from "./form/CustomDynamicForm";
import "./createpost.css";

export const CreatePostPage: React.FC = () => {
    const memberLevel = [
        { value: "1", label: "Y" },
        { value: "2", label: "TBY" },
        { value: "3", label: "TB-" },
        { value: "4", label: "TB" },
        { value: "5", label: "TB+" },
        { value: "6", label: "TBK" },
        { value: "7", label: "Khá" },
        { value: "8", label: "Chuyên nghiệp" },
    ];
    const genderOptions = [
        { value: 1, label: "Nam" },
        { value: 2, label: "Nữ" },
    ];

    const [phones, setPhones] = useState([""]);

    const tagRender = (props: CustomTagProps) => {
        const { label, value, closable, onClose } = props;
        let color;
        const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
            event.preventDefault();
            event.stopPropagation();
        };
        if (value === 1) {
            color = "gold";
        } else {
            color = "green";
        }
        return (
            <Tag
                className="tag-post"
                color={color}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}>
                {label}
            </Tag>
        );
    };
    const handleChange = () => {};
    const disabledDate = (current: any) => {
        const today = new Date();
        return current && current < today.setHours(0, 0, 0, 0);
    };

    return (
        <div className="create-post-form max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
            <form className="my-4 sm:my-6 rounded-2xl border-2 flex flex-col md:flex-row gap-6 p-4 sm:p-6">
                <div className="flex-1 flex flex-col gap-4">
                    <div className="font-semibold text-lg text-black-ish-200">Thông tin chung</div>
                    <div className="w-full relative">
                        <input
                            placeholder=" "
                            className="peer w-full p-4 pt-6 bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4"
                            type="text"
                        />
                        <label className="absolute text-md duration-150 transform -translate-y-3 top-5 origin-[0] whitespace-nowrap left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 hover:cursor-text text-black-ish-100">
                            Địa chỉ sân<span className="text-red-500"> *</span>
                        </label>
                    </div>
                    <div className="w-full relative">
                        <input
                            placeholder=" "
                            className="peer w-full p-4 pt-6 bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4"
                            type="text"
                        />
                        <label className="absolute text-md duration-150 transform -translate-y-3 top-5 origin-[0] whitespace-nowrap left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 hover:cursor-text text-black-ish-100">
                            Tiêu đề<span className="text-red-500"> *</span>
                        </label>
                    </div>
                    <div className="w-full relative">
                        <textarea
                            id="input-post-description"
                            placeholder=" "
                            className="peer w-full p-4 pt-6 bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4"></textarea>
                        <label className="absolute text-md duration-150 transform -translate-y-3 top-5 origin-[0] whitespace-nowrap left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 hover:cursor-text text-black-ish-100">
                            Mô tả chi tiết<span className="text-red-500"> *</span>
                        </label>
                    </div>
                    <div className="font-semibold text-md text-black-ish-200">Yêu cầu về thành viên:</div>
                    <div className="flex flex-col sm:grid grid-cols-2 gap-4">
                        <div className="w-full relative">
                            <input
                                id="input-post-recruit-numb"
                                placeholder=" "
                                className="peer w-full p-4 pt-6 bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4"
                                type="number"
                                defaultValue={1}
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
                            />
                        </div>
                    </div>
                    <div className="font-semibold text-md text-black-ish-200">Trình độ:</div>
                    <div className="flex flex-col sm:grid grid-cols-2 gap-4">
                        <div className="w-full relative">
                            <Select
                                placeholder="Trình độ tối thiểu"
                                className="input-post w-full"
                                onChange={handleChange}
                                options={memberLevel}
                                style={{ border: "2px solid #e5e7eb" }}
                            />
                        </div>
                        <div className="w-full relative">
                            <Select
                                placeholder="Trình độ tối đa"
                                className="input-post  w-full"
                                onChange={handleChange}
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
                            />
                        </div>
                        <div className="w-full relative">
                            <DatePicker
                                className="custom-time-picker"
                                format={{
                                    format: "DD-MM-YYYY",
                                }}
                                disabledDate={disabledDate}
                                placeholder="Ngày diễn ra"
                                inputReadOnly
                                style={{ width: "100%", height: "65px", fontSize: "20px" }}
                            />
                        </div>
                    </div>
                    <div className="font-semibold text-md text-black-ish-200">Phí giao lưu:</div>
                    <div className="flex flex-col sm:grid grid-cols-3 gap-4">
                        <div className="w-full relative">
                            <input
                                id="input-post-recruit-numb"
                                placeholder="Từ"
                                className="peer w-full p-4 pt-6 bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4"
                                type="number"
                            />
                        </div>
                        <div className="w-full relative">
                            <input
                                id="input-post-recruit-numb"
                                placeholder="Đến"
                                className="peer w-full p-4 pt-6 bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4"
                                type="number"
                            />
                        </div>
                        <div className="w-full relative agreed-checkbox-container">
                            <p className="text-[14px]">Or</p>
                            <input
                                className="agreed-checkbox"
                                type="checkbox"
                                id="price"
                                name="price"
                                value="thỏa thuận"
                            />
                            <div className="text-md ">Thỏa thuận</div>
                        </div>
                    </div>
                    <div className="hidden md:flex justify-center mt-2">
                        <div className="w-full sm:w-1/2 lg:w-1/3 flex gap-4 justify-end">
                            <button
                                id="cancel-post"
                                type="button"
                                className="relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full bg-white border-black text-black text-md py-3 font-semibold border-2">
                                Hủy
                            </button>
                            <button
                                id="submit-post"
                                type="submit"
                                className="relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full bg-primary border-primary text-white text-md py-3 font-semibold border-2">
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
                        <div className="relative transition border-dashed border-2 border-neutral-300 flex flex-col justify-center items-center gap-4 text-black-ish-100 cursor-pointer hover:opacity-70 w-full h-[35vh]">
                            <svg
                                stroke="currentColor"
                                fill="none"
                                stroke-width="2"
                                viewBox="0 0 24 24"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                height="50"
                                width="50"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M15 8h.01"></path>
                                <path d="M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5"></path>
                                <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4"></path>
                                <path d="M14 14l1 -1c.67 -.644 1.45 -.824 2.182 -.54"></path>
                                <path d="M16 19h6"></path>
                                <path d="M19 16v6"></path>
                            </svg>
                            <div className="font-semibold text-lg">Thêm hình ảnh</div>
                        </div>
                        <input />
                    </div>
                    <div className="flex md:hidden justify-end mt-2">
                        <div className="w-full flex gap-4">
                            <button
                                id="cancel-post"
                                type="button"
                                className="relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full bg-white border-black text-black text-md py-3 font-semibold border-2">
                                Hủy
                            </button>
                            <button
                                id="submit-post"
                                type="submit"
                                className="relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full bg-primary border-primary text-white text-md py-3 font-semibold border-2">
                                Đăng tin
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
