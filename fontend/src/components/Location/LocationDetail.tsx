import React, { useEffect, useState } from "react";
import { SearchPageHeader } from "../SearchPage/header/SearchPageHeader";
import { Button, Calendar, CalendarProps, Carousel, Flex, Select, theme } from "antd";
import { Facility, Optional } from "../../interface";
import LocationService from "../../services/location/LocationService";
import { useParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import "./location-detail.css";
import { PostDetailPage } from "../Posts/PostDetail/PostDetailPage";
const map_icon = require("../../assets/images/map.png");
const support_icon = require("../../assets/images/support.png");
const Badminton_yard = require("../../assets/images/san-cau-long.png");

export const LocationDetail: React.FC = () => {
    const [locationDetail, setLocationDetail] = useState<Facility | null>();
    const locationService = new LocationService();
    const { locationId } = useParams();
    const [activeButton, setActiveButton] = useState("");
    const [imgBlur, setImageBlur] = useState<number>();

    // const [options, setOptions] = useState<Optional[] | null>();

    useEffect(() => {
        if (locationId) {
            locationService
                .getLocationById(locationId)
                .then((response) => {
                    setLocationDetail(response.data);
                })
                .catch((error) => {});
        }
    }, []);
    const handleBtnFindAddressClick = () => {
        window.open(
            `https://www.google.com/maps/search/?api=1&query=${locationDetail?.latitude},${locationDetail?.longitude}`,
            "_blank"
        );
    };

    const { token } = theme.useToken();

    const wrapperStyle: React.CSSProperties = {
        width: "100%",
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
        overflow: "hidden",
    };

    const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
        console.log(value.format("YYYY-MM-DD"), mode);
    };
    const disabledDate = (current: any) => {
        const today = new Date();
        return current && current < today.setHours(0, 0, 0, 0);
    };
    const options = [
        { value: 1, label: "Ca 1: 5:30 - 7:30:" },
        { value: 2, label: "Ca 2: 7:30 - 9:30:" },
        { value: 3, label: "Ca 3: 9:30 - 11:30:" },
        { value: 4, label: "Ca 4: 11:30 - 1:30:" },
    ];

    const handleClick = (buttonName: string) => {
        setActiveButton(buttonName);
    };
    const handleMouseEndter = (i: number) => {
        setImageBlur(i);
    };
    const handleMouseLeave = () => {
        console.log("mouseleave");
        setImageBlur(-1);
    };
    return (
        <div>
            <SearchPageHeader defaultSelectedKeys="" />
            <div className="max-w-[90%] sm:px-3 mx-auto mb-5 sm:mt-5">
                <div className="grid grid-cols-1 md:grid-cols-8 md:gap-6">
                    <div className="col-span-3 flex flex-col space-y-8">
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
                                    {locationDetail?.Name}
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
                                            stroke-width="0"
                                            viewBox="0 0 15 15"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M12 13C12.5523 13 13 12.5523 13 12V3C13 2.44771 12.5523 2 12 2H3C2.44771 2 2 2.44771 2 3V6.5C2 6.77614 2.22386 7 2.5 7C2.77614 7 3 6.77614 3 6.5V3H12V12H8.5C8.22386 12 8 12.2239 8 12.5C8 12.7761 8.22386 13 8.5 13H12ZM9 6.5C9 6.5001 9 6.50021 9 6.50031V6.50035V9.5C9 9.77614 8.77614 10 8.5 10C8.22386 10 8 9.77614 8 9.5V7.70711L2.85355 12.8536C2.65829 13.0488 2.34171 13.0488 2.14645 12.8536C1.95118 12.6583 1.95118 12.3417 2.14645 12.1464L7.29289 7H5.5C5.22386 7 5 6.77614 5 6.5C5 6.22386 5.22386 6 5.5 6H8.5C8.56779 6 8.63244 6.01349 8.69139 6.03794C8.74949 6.06198 8.80398 6.09744 8.85143 6.14433C8.94251 6.23434 8.9992 6.35909 8.99999 6.49708L8.99999 6.49738"
                                                fill="currentColor"></path>
                                        </svg>
                                    </button>
                                </span>
                            </address>
                            <div className="flex gap-2 items-center sm:pl-1">
                                <span className="text-black-ish-100 truncate">🏟️ Sân cầu: VNBC</span>
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
                            {locationDetail?.Name}
                        </div>
                        <hr className="mx-3 sm:mx-0" />
                        <hr className="mx-3 sm:mx-0" />
                    </div>
                    <div className="col-span-5 flex flex-col ">
                        <div className="grid grid-cols-8 gap-4">
                            <div className="col-span-3 flex flex-col">
                                <div className="calendar" style={wrapperStyle}>
                                    <Calendar
                                        fullscreen={false}
                                        onPanelChange={onPanelChange}
                                        disabledDate={disabledDate}
                                    />
                                </div>
                                <Select
                                    className="mt-1"
                                    defaultValue={1}
                                    onChange={() => {}}
                                    style={{ width: "100% " }}
                                    options={options}
                                />
                                <Flex justify={"space-between"} align={"center"} className="mt-2">
                                    <Button
                                        className={activeButton === "Sáng" ? "active-button" : ""}
                                        onClick={() => handleClick("Sáng")}>
                                        Sáng
                                    </Button>
                                    <Button
                                        className={activeButton === "Chiều" ? "active-button" : ""}
                                        onClick={() => handleClick("Chiều")}>
                                        Chiều
                                    </Button>
                                    <Button
                                        className={activeButton === "Tối" ? "active-button" : ""}
                                        onClick={() => handleClick("Tối")}>
                                        Tối
                                    </Button>
                                </Flex>
                            </div>

                            <div className="col-span-5">
                                <Flex className="p-1 bg-gray-100" justify={"space-between"} wrap="wrap">
                                    {Array.from({ length: 8 }, (_, i) => (
                                        <div className="badminton-yard-container">
                                            <img
                                                className={`badminton-yard-img mb-4 ${imgBlur == i ? "blur" : ""}`}
                                                src={Badminton_yard}
                                                alt=""
                                            />
                                            <p className="badminton-yard-number">Sân {i + 1}</p>
                                            <Button
                                                onMouseEnter={() => handleMouseEndter(i)}
                                                onMouseLeave={handleMouseLeave}
                                                className="btn-book-court">
                                                Đặt sân
                                            </Button>
                                        </div>
                                    ))}
                                </Flex>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
