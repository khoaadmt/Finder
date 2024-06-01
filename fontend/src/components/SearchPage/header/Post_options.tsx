import React, { useEffect, useState } from "react";
import { Option_button } from "./Option_button";
import { Distance_value, Gender_value, Level_value, MemberNumber_value, Price_value } from "./Values_option";
import { Date_picker_dialog } from "./Date_picker_dialog";
import { Time_picker_dialog } from "./Time_picker_dialog";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FilterOptions } from "../../../interface";
import { DatePicker, TimePicker } from "antd";

interface Props {
    setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions | null>>;
}
export const Post_options: React.FC<Props> = (props) => {
    const { setFilterOptions } = props;

    const [isActive, setIsActive] = useState(false);
    const [isShowDatePickerDialog, setIsShowDatePickerDialog] = useState(false);
    const [isShowTimePickerDialog, setIsShowTimePickerDialog] = useState(false);
    const [time, setTime] = useState("Giờ bắt đầu");
    const [valueDateOption, setValueDateOption] = useState("");

    useEffect(() => {
        setValueDateOption(time);
    }, [time]);

    const handleClickDateOption = () => {
        setIsShowDatePickerDialog(!isShowDatePickerDialog);
    };

    const handleClickTimeOption = () => {
        setIsShowTimePickerDialog(!isShowTimePickerDialog);
    };

    const handleBtnOptionSelected = (key: string, value: any) => {
        setIsActive(!isActive);

        setFilterOptions((prev) => {
            return {
                ...prev,
                [key]: value,
            } as FilterOptions;
        });
    };
    const HandleDatePickerOnChange = (date: any, dateString: any) => {};
    const disabledDate = (current: any) => {
        const today = new Date();
        return current && current < today.setHours(0, 0, 0, 0);
    };
    const handleChangeTime = (time: any, timeString: any) => {
        setTime(timeString);
        setIsShowTimePickerDialog(false);
    };

    return (
        <div className="font-normal flex justify-center sm:pt-4 pb-4 px-[15px] sm:px-5 overflow-x-scroll lg:overflow-visible">
            <div className="flex gap-2 sm:gap-[10px]">
                <div>
                    <button
                        onClick={() => handleBtnOptionSelected("sortBy", "upcoming")}
                        className={`${
                            isActive ? "btn-active" : "hover:border-[#232323]"
                        }  py-[5px] px-[14px] sm:py-[12px] sm:px-[17px] xl:px-[24px] rounded-full border  transition border-[#dfdfdf]`}>
                        <div className="text-sm font-semibold text-nowrap">
                            <span className="">Sắp diễn ra</span>
                        </div>
                    </button>
                </div>
                <Option_button
                    defaultValue="Khoảng cách"
                    items_value={Distance_value}
                    setFilterOptions={setFilterOptions}
                />
                <Option_button defaultValue="Trình độ" items_value={Level_value} setFilterOptions={setFilterOptions} />
                <div className="">
                    <DatePicker
                        className="sm:py-[12px] sm:px-[17px] xl:px-[8px]"
                        style={{ width: "120px", borderRadius: "25px" }}
                        format={{
                            format: "DD-MM-YYYY",
                        }}
                        placeholder="Ngày"
                        disabledDate={disabledDate}
                        onChange={HandleDatePickerOnChange}
                    />
                </div>

                <div className="">
                    <TimePicker
                        onChange={handleChangeTime}
                        minuteStep={15}
                        style={{ width: "100px" }}
                        placeholder="Giờ"
                        // popupStyle={{
                        //     height: "53px",
                        //     width: "155px",
                        // }}

                        format={"HH:mm"}
                    />
                </div>

                <Option_button defaultValue="Giá" items_value={Price_value} setFilterOptions={setFilterOptions} />
                <Option_button
                    defaultValue="Số người"
                    items_value={MemberNumber_value}
                    setFilterOptions={setFilterOptions}
                />
                <Option_button
                    defaultValue="Giới tính"
                    items_value={Gender_value}
                    setFilterOptions={setFilterOptions}
                />
                <button className="mx-2 pr-8 sm:pr-0">
                    <span className="text-sm font-semibold underline whitespace-nowrap">Xóa lọc</span>
                </button>
            </div>
        </div>
    );
};
