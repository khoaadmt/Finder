import React, { useEffect, useState } from "react";
import { SearchPageHeader } from "../SearchPage/header/SearchPageHeader";
import { Button, Calendar, CalendarProps, Carousel, Flex, Modal, Select, message, theme } from "antd";
import { Facility, Optional, RootState } from "../../interface";
import LocationService from "../../services/location/LocationService";
import { useParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import "./location-detail.css";
import { useSelector } from "react-redux";
import BookingService from "../../services/booking/BookingService";
import { Footer } from "antd/es/layout/layout";
const map_icon = require("../../assets/images/map.png");
const support_icon = require("../../assets/images/support.png");
const Badminton_yard = require("../../assets/images/san-cau-long.png");

const createInitDate = () => {
    const timeStamp = dayjs(Date.now());
    const date = timeStamp.format("YYYY-MM-D");
    return date;
};

export const LocationDetail: React.FC = () => {
    const [locationDetail, setLocationDetail] = useState<Facility | null>();
    const locationService = new LocationService();
    const { locationId } = useParams();
    const [activeButtonName, setActiveButtonName] = useState("Ca sáng");
    const [imgBlur, setImageBlur] = useState<number>();
    const [dateSelected, setDateSelected] = useState(createInitDate());
    const [shiftSelected, setShiftSelected] = useState<number>(0);
    const [bookedCourts, setBookedCourts] = useState<string[]>();
    const [paymentUrl, setPaymentUrl] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [cancelCount, setCancelCount] = useState(0);

    const user = useSelector((state: RootState) => state.auth.login.currentUser);
    const bookingService = new BookingService();

    const [options, setOptions] = useState<any>("");

    const { token } = theme.useToken();

    const wrapperStyle: React.CSSProperties = {
        width: "100%",
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
        overflow: "hidden",
    };

    useEffect(() => {
        if (locationId) {
            locationService
                .getLocationById(locationId)
                .then((response) => {
                    setLocationDetail(response.data[0]);
                    console.log("response.data[0] :", response.data[0]);
                })
                .catch((error) => {});
        }
    }, []);

    useEffect(() => {
        if (locationDetail) {
            const params = {
                params: {
                    locationId: locationDetail._id,
                    shiftId: locationDetail.shifts[shiftSelected]._id,
                    date: dateSelected,
                },
            };
            bookingService
                .getBookedCourts(params)
                .then((bookedCourts) => {
                    setBookedCourts(bookedCourts.data);
                    console.log("bookedCourts.data :", bookedCourts.data);
                })
                .catch((error) => {
                    message.error(error.message);
                });
        }
    }, [shiftSelected, dateSelected, locationDetail, cancelCount]);

    const handleBtnFindAddressClick = () => {
        window.open(
            `https://www.google.com/maps/search/?api=1&query=${locationDetail?.latitude},${locationDetail?.longitude}`,
            "_blank"
        );
    };

    const HandleDateOnChange = (value: Dayjs) => {
        setDateSelected(value.format("YYYY-MM-DD"));
    };
    const disabledDate = (current: any) => {
        const today = new Date();
        return current && current < today.setHours(0, 0, 0, 0);
    };

    useEffect(() => {
        setShiftSelected(0);
        if (locationDetail?.shifts) {
            const optionsTmp: Optional[] = locationDetail.shifts
                .filter((shift) => shift.period === activeButtonName)
                .map((shift, index) => {
                    return {
                        value: shift.shiftNumber,
                        label: `Ca ${shift.shiftNumber} - ${shift.startTime} : ${shift.endTime}`,
                    };
                });
            setOptions(optionsTmp);
        }
    }, [locationDetail, activeButtonName]);

    const handleClick = (buttonName: string) => {
        setActiveButtonName(buttonName);
    };

    const handleMouseEndter = (i: number) => {
        setImageBlur(i);
    };

    const handleMouseLeave = () => {
        setImageBlur(-1);
    };

    const handleBooking = (courtId: string) => {
        const shiftId = locationDetail?.shifts[options[shiftSelected]?.value - 1]._id;
        const userName = user?.username;

        let data = {
            locationId,
            shiftId,
            userName,
            courtId,
            date: dateSelected,
        };

        bookingService.createBooking(data).then((resUrl) => {
            setPaymentUrl(resUrl.data);
        });

        setIsModalVisible(true);
    };

    const handleOnChangeShift = (value: any) => {
        setShiftSelected(value - 1);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCancelCount((prevCount) => prevCount + 1);
    };
    return (
        <div>
            <SearchPageHeader defaultSelectedKeys="" />
            <div className="max-w-[90%] mx-auto mb-5 sm:mt-5">
                <div className="grid grid-cols-1 md:grid-cols-8 md:gap-4">
                    <div className="col-span-3  flex flex-col">
                        <div className=" ">
                            <Carousel className="w-[400px] h[400px] slide-image bg-gray-500" arrows infinite={false}>
                                {locationDetail &&
                                    locationDetail.img?.map((imgUrl) => {
                                        return (
                                            <div key={imgUrl}>
                                                <img alt="Description image" loading="lazy" src={imgUrl} />
                                            </div>
                                        );
                                    })}
                            </Carousel>
                        </div>

                        <div className="px-3 sm:px-0 space-y-2 !mt-6 text-sm sm:text-base">
                            <div className="w-full pb-2">
                                <h2 className="text-2xl font-bold text-black-ish-200 leading-none sm:leading-normal">
                                    {locationDetail?.name}
                                </h2>
                            </div>
                            <address className="flex gap-2 items-start sm:pl-1">
                                <img className="w-[16px] h-[16px] ml-1" src={map_icon} alt="" />
                                <span className="flex text-black-ish-100">
                                    Địa chỉ:
                                    {locationDetail?.address}
                                    <button
                                        onClick={handleBtnFindAddressClick}
                                        className="btn_find_address py-[1px] px-2 font-semibold rounded-full whitespace-nowrap hover:shadow-md transition border border-primary bg-white flex items-center gap-2">
                                        <span>Tìm đường</span>
                                        <svg
                                            stroke="currentColor"
                                            fill="none"
                                            strokeWidth="0"
                                            viewBox="0 0 15 15"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M12 13C12.5523 13 13 12.5523 13 12V3C13 2.44771 12.5523 2 12 2H3C2.44771 2 2 2.44771 2 3V6.5C2 6.77614 2.22386 7 2.5 7C2.77614 7 3 6.77614 3 6.5V3H12V12H8.5C8.22386 12 8 12.2239 8 12.5C8 12.7761 8.22386 13 8.5 13H12ZM9 6.5C9 6.5001 9 6.50021 9 6.50031V6.50035V9.5C9 9.77614 8.77614 10 8.5 10C8.22386 10 8 9.77614 8 9.5V7.70711L2.85355 12.8536C2.65829 13.0488 2.34171 13.0488 2.14645 12.8536C1.95118 12.6583 1.95118 12.3417 2.14645 12.1464L7.29289 7H5.5C5.22386 7 5 6.77614 5 6.5C5 6.22386 5.22386 6 5.5 6H8.5C8.56779 6 8.63244 6.01349 8.69139 6.03794C8.74949 6.06198 8.80398 6.09744 8.85143 6.14433C8.94251 6.23434 8.9992 6.35909 8.99999 6.49708L8.99999 6.49738"
                                                fill="currentColor"></path>
                                        </svg>
                                    </button>
                                </span>
                            </address>
                            <div className="flex gap-2 items-center sm:pl-1">
                                <span className="text-black-ish-100 truncate">🏟️ Sân cầu: {locationDetail?.name}</span>
                            </div>
                        </div>

                        <hr className="mx-3 sm:mx-0" />
                        <div className="px-3 sm:px-0">
                            <div className="w-full flex justify-center items-center rounded-xl overflow-hidden" />
                        </div>
                        <div className="px-3 sm:px-0 text-xl font-semibold flex flex-row items-center gap-2">
                            Mô tả thêm
                        </div>
                        <div className="px-3 sm:px-0 text-black-ish-100 whitespace-pre-line !mt-4 text-sm sm:text-base">
                            {locationDetail?.name}
                        </div>
                        <hr className="mx-3 sm:mx-0" />
                        <hr className="mx-3 sm:mx-0" />
                    </div>
                    <div className="col-span-5  flex flex-col">
                        <div className="sm:grid grid-cols-8 gap-2">
                            <div className="col-span-5">
                                <div className="flex">
                                    Giá thuê:
                                    <p className="shift-price">
                                        {locationDetail &&
                                            locationDetail?.shifts[options[shiftSelected]?.value]?.price.toLocaleString(
                                                "vi-VN"
                                            )}
                                    </p>
                                </div>
                                <Flex className="p-1 bg-gray-100" justify={"space-between"} wrap="wrap">
                                    {locationDetail?.courts &&
                                        locationDetail.courts.map((court) => {
                                            let isDisable = "";
                                            if (bookedCourts) {
                                                if (bookedCourts.indexOf(court._id) != -1) isDisable = "disabled";
                                            }
                                            return (
                                                <div className={`badminton-yard-container ${isDisable}`}>
                                                    <img
                                                        className={`badminton-yard-img mb-4 ${
                                                            imgBlur == court.courtNumber ? "blur" : ""
                                                        }`}
                                                        src={Badminton_yard}
                                                        alt=""
                                                    />
                                                    <p className="badminton-yard-number">Sân {court.courtNumber}</p>
                                                    <Button
                                                        onMouseEnter={() => handleMouseEndter(court.courtNumber)}
                                                        onMouseLeave={handleMouseLeave}
                                                        onClick={() => handleBooking(court._id)}
                                                        className="btn-book-court">
                                                        Đặt sân
                                                    </Button>
                                                </div>
                                            );
                                        })}
                                </Flex>
                            </div>

                            <div className="col-span-3 flex flex-col">
                                <div className="calendar" style={wrapperStyle}>
                                    <Calendar
                                        fullscreen={false}
                                        onChange={HandleDateOnChange}
                                        disabledDate={disabledDate}
                                    />
                                </div>
                                <Select
                                    className="mt-1"
                                    value={options && options[shiftSelected]}
                                    onChange={handleOnChangeShift}
                                    style={{ width: "100% " }}
                                    options={options}
                                />
                                <Flex justify={"space-between"} align={"center"} className="mt-2 group-btn">
                                    <Button
                                        className={`btn-shift ${activeButtonName === "Ca sáng" ? "active-button" : ""}`}
                                        onClick={() => handleClick("Ca sáng")}>
                                        Sáng
                                    </Button>
                                    <Button
                                        className={`btn-shift ${
                                            activeButtonName === "Ca chiều" ? "active-button" : ""
                                        }`}
                                        onClick={() => handleClick("Ca chiều")}>
                                        Chiều
                                    </Button>
                                    <Button
                                        className={`btn-shift ${activeButtonName === "Ca tối" ? "active-button" : ""}`}
                                        onClick={() => handleClick("Ca tối")}>
                                        Tối
                                    </Button>
                                </Flex>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer style={{ textAlign: "center" }}>
                <h1>Giao luu cau long .com</h1>
                Tìm kiếm cơ hội giao lưu gần bạn
            </Footer>
            <Modal
                visible={isModalVisible}
                footer={false}
                onOk={handleOk}
                onCancel={handleCancel}
                width="80%"
                style={{ top: 20 }}>
                <iframe
                    src={paymentUrl}
                    title="Popup Content"
                    style={{ width: "100%", height: "450px", border: "none" }}></iframe>
            </Modal>
        </div>
    );
};
