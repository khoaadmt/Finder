import React from "react";
import { useEffect, useState } from "react";
import { SearchPageHeader } from "../SearchPage/header/SearchPageHeader";
import { useSelector } from "react-redux";
import "./my-booked-courts.css";
import { Input, Space } from "antd";
import { MyFooter } from "../Footer/Footer";
import { CarryOutOutlined } from "@ant-design/icons";
import { BookedCourts, RootState } from "../../../interface";
import BookingService from "../../../services/booking/BookingService";
const Badminton_yard = require("../../../assets/images/sau-cau.png");

export const MyBookedCourts = () => {
    const [bookedCourts, setBookedCourts] = useState<BookedCourts[]>();
    const bookingService = new BookingService();
    const user = useSelector((state: RootState) => state.auth.login.currentUser);

    useEffect(() => {
        if (user) {
            bookingService.getBookingsByUserName(user?.username).then((res) => {
                console.log(res.data);
                setBookedCourts(res.data);
            });
        }
    }, []);
    return (
        <div>
            <SearchPageHeader defaultSelectedKeys="" />
            <div className="booked-court-title">
                <CarryOutOutlined /> Sân đã đặt
            </div>
            <div className="flex flex-wrap justify-around max-w-[90%] mx-auto mt-5">
                {bookedCourts &&
                    bookedCourts.map((bookedCourt) => {
                        return (
                            <div className="booked-courts-card">
                                <div className="card-header">
                                    <span>Sân cầu: {bookedCourt.location.name} </span>
                                </div>
                                <div className="card-image-container">
                                    <img className="booked-courts-img" src={Badminton_yard} alt="" />
                                </div>
                                <div className="card-content ">
                                    <Space.Compact className="mb-2">
                                        <Input
                                            className="input-left"
                                            style={{ width: "30%" }}
                                            defaultValue="Địa chỉ:"
                                            readOnly
                                        />
                                        <Input
                                            className="input-right"
                                            style={{ width: "80%" }}
                                            defaultValue={bookedCourt.location.address}
                                            readOnly
                                        />
                                    </Space.Compact>
                                    <Space.Compact className="mb-2">
                                        <Input
                                            readOnly
                                            className="input-left"
                                            style={{ width: "30%" }}
                                            defaultValue={`Ca :${bookedCourt.shift.shiftNumber}`}
                                        />
                                        <Input
                                            readOnly
                                            className="input-right"
                                            style={{ width: "80%" }}
                                            defaultValue={
                                                bookedCourt.shift.startTime + " - " + bookedCourt.shift.endTime
                                            }
                                        />
                                    </Space.Compact>
                                    <Space.Compact className="mb-2">
                                        <Input
                                            readOnly
                                            className="input-left"
                                            style={{ width: "30%" }}
                                            defaultValue="Ngày đặt"
                                        />
                                        <Input
                                            readOnly
                                            className="input-right"
                                            style={{ width: "80%" }}
                                            defaultValue={`${bookedCourt.date}`}
                                        />
                                    </Space.Compact>
                                    <Space.Compact className="mb-2">
                                        <Input
                                            readOnly
                                            className="input-left"
                                            style={{ width: "30%" }}
                                            defaultValue="Người đặt"
                                        />
                                        <Input
                                            readOnly
                                            className="input-right"
                                            style={{ width: "80%" }}
                                            defaultValue={bookedCourt.userName}
                                        />
                                    </Space.Compact>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <MyFooter></MyFooter>
        </div>
    );
};
