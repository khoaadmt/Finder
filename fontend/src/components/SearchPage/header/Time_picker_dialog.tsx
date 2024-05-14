import { TimePicker } from "antd";
import dayjs from "dayjs";
import React from "react";
const format = "HH:mm";
interface Props {
    setIsShowTimePickerDialog: React.Dispatch<React.SetStateAction<boolean>>;
    setTime: React.Dispatch<React.SetStateAction<string>>;
}
export const Time_picker_dialog: React.FC<Props> = (props) => {
    const { setTime, setIsShowTimePickerDialog } = props;
    const handleChangeTime = (time: any, timeString: any) => {
        setTime(timeString);
        setIsShowTimePickerDialog(false);
    };
    return (
        <div className="time-picker">
            <div className="fixed sm:absolute top-[154px] left-[16px] mx-0 rounded-[20px] w-[150px] bg-white text-sm z-10 sm:left-0 sm:top-2 p-5 shadow-[rgba(0,0,0,0.3)_0px_2px_15px_0px]">
                <div className="text-sm">
                    <div>
                        <div className="mb-2">
                            <span className="text-sm font-semibold">Ngày</span>
                        </div>
                        <div className="mb-2">
                            <div className="react-datepicker-wrapper">
                                <div className="react-datepicker__input-container">
                                    <TimePicker
                                        onChange={handleChangeTime}
                                        minuteStep={15}
                                        // popupStyle={{
                                        //     height: "53px",
                                        //     width: "155px",
                                        // }}

                                        format={format}
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
