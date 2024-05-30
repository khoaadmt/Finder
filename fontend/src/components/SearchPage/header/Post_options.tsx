import React, { useEffect, useState } from "react";
import { Option_button } from "./Option_button";
import { Distance_value, Gender_value, Level_value, MemberNumber_value, Price_value } from "./Values_option";
import { Date_picker_dialog } from "./Date_picker_dialog";
import { Time_picker_dialog } from "./Time_picker_dialog";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Post_options: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const [isShowDatePickerDialog, setIsShowDatePickerDialog] = useState(false);
    const [isShowTimePickerDialog, setIsShowTimePickerDialog] = useState(false);
    const [date, setDate] = useState("Ngày");
    const [time, setTime] = useState("Giờ bắt đầu");
    const [valueDateOption, setValueDateOption] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        setValueDateOption(time);
    }, [time]);

    const setNewParams = (param: string, value: string) => {
        const newSearchParams = new URLSearchParams();

        newSearchParams.set(param, value.toString());
        searchParams.forEach((value, key) => {
            newSearchParams.set(key, value);
        });

        setSearchParams(newSearchParams.toString());
    };

    const handleOptionButtonClick = (param: string, paramValue: string) => {
        setIsActive(!isActive);
    };

    const handleClickDateOption = () => {
        setIsShowDatePickerDialog(!isShowDatePickerDialog);
    };

    const handleClickTimeOption = () => {
        setIsShowTimePickerDialog(!isShowTimePickerDialog);
    };

    const getNewPost = () => {
        navigate(`/search/sessions/new?location=${"Hà Nội"}&type=${"Giao lưu"}`);
    };

    return (
        <div className="font-normal flex justify-center  sm:pt-4 pb-4 px-[15px] sm:px-5 overflow-x-scroll lg:overflow-visible">
            <div className="flex gap-2 sm:gap-[10px]">
                <div>
                    <button
                        onClick={getNewPost}
                        className={`${
                            isActive ? "btn-active" : "hover:border-[#232323]"
                        }  py-[5px] px-[14px] sm:py-[12px] sm:px-[17px] xl:px-[24px] rounded-full border  transition border-[#dfdfdf]`}>
                        <div className="text-sm font-semibold text-nowrap">
                            <span className="">Sắp diễn ra</span>
                        </div>
                    </button>
                </div>
                <Option_button value="Khoảng cách" items_value={Distance_value} />
                <Option_button value="Trình độ" items_value={Level_value} />
                <div className="">
                    <div>
                        <button
                            onClick={handleClickDateOption}
                            className="py-[5px] px-[14px] sm:py-[12px] sm:px-[17px] xl:px-[24px] rounded-full border hover:border-[#232323] transition border-[#dfdfdf]">
                            <div className="text-sm font-semibold text-nowrap">
                                <span className="">{date}</span>
                            </div>
                        </button>
                    </div>
                    {isShowDatePickerDialog && (
                        <Date_picker_dialog setIsShowDatePickerDialog={setIsShowDatePickerDialog} setDate={setDate} />
                    )}
                </div>

                <div className="">
                    <div>
                        <button
                            onClick={handleClickTimeOption}
                            className="py-[5px] px-[14px] sm:py-[12px] sm:px-[17px] xl:px-[24px] rounded-full border hover:border-[#232323] transition border-[#dfdfdf]">
                            <div className="text-sm font-semibold text-nowrap">
                                <span className="">{time}</span>
                            </div>
                        </button>
                    </div>
                    {isShowTimePickerDialog && (
                        <Time_picker_dialog setIsShowTimePickerDialog={setIsShowTimePickerDialog} setTime={setTime} />
                    )}
                </div>

                <Option_button value="Giá" items_value={Price_value} />
                <Option_button value="Số người" items_value={MemberNumber_value} />
                <Option_button value="Giới tính" items_value={Gender_value} />
                <button className="mx-2 pr-8 sm:pr-0">
                    <span className="text-sm font-semibold underline whitespace-nowrap">Xóa lọc</span>
                </button>
            </div>
        </div>
    );
};