import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Moment } from "moment";
import React from "react";
interface Props {
    setIsShowDatePickerDialog: React.Dispatch<React.SetStateAction<boolean>>;
    setDate: React.Dispatch<React.SetStateAction<string>>;
}
export const Date_picker_dialog: React.FC<Props> = (props) => {
    const { setIsShowDatePickerDialog, setDate } = props;

    const onChange = (date: any, dateString: any) => {
        setDate(dateString);
        setIsShowDatePickerDialog(false);
    };
    const disabledDate = (current: any) => {
        const today = new Date();
        return current && current < today.setHours(0, 0, 0, 0);
    };

    return (
        <div className="date-picker">
            <div className="fixed sm:absolute top-[154px] left-[16px] mx-0 rounded-[20px] w-[200px] bg-white text-sm z-10 sm:left-0 sm:top-2 p-5 shadow-[rgba(0,0,0,0.3)_0px_2px_15px_0px]">
                <div className="text-sm">
                    <div>
                        <div className="mb-2">
                            <span className="text-sm font-semibold">Ngày</span>
                        </div>
                        <div className="mb-2">
                            <div className="react-datepicker-wrapper">
                                <div className="react-datepicker__input-container">
                                    <DatePicker
                                        style={{ width: "100%" }}
                                        format={{
                                            format: "DD-MM-YYYY",
                                        }}
                                        disabledDate={disabledDate}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <button className="hover:underline text-sm">Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
