import React from "react";
import { useEffect, useState } from "react";
import { SearchPageHeader } from "../SearchPage/header/SearchPageHeader";
import { useSelector } from "react-redux";
import "./my-booked-courts.css";
import { Button, Input, Modal, Space } from "antd";
import { MyFooter } from "../Footer/Footer";
import { CarryOutOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { BookedCourts, RootState } from "../../../interface";
import BookingService from "../../../services/booking/BookingService";
const Badminton_yard = require("../../../assets/images/sau-cau.png");

export const MyBookedCourts = () => {
    const [bookedCourts, setBookedCourts] = useState<BookedCourts[]>();
    const bookingService = new BookingService();
    const user = useSelector((state: RootState) => state.auth.login.currentUser);
    const [reload, setReload] = useState(0);

    useEffect(() => {
        if (user) {
            bookingService.getBookingsByUserName(user?.username).then((res) => {
                console.log(res.data);
                setBookedCourts(res.data);
            });
        }
    }, [reload]);
    const { confirm } = Modal;
    const showDeleteConfirm = (bookingId: string) => {
        confirm({
            title: "Bạn có chắc muốn hủy không ?",
            icon: <ExclamationCircleFilled />,
            content: "Khi huy bạn sẽ không được hoàn lại tiền, bạn vẫn muốn hủy chứ.",
            okText: "Hủy",
            okType: "danger",
            cancelText: "Cacel",
            onOk() {
                bookingService.updateStatus(bookingId).then((res) => {
                    setReload((prev) => prev + 1);
                });
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };

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
                            <div key={bookedCourt._id} className="booked-courts-card">
                                <div className="card-header">
                                    <span>Sân cầu: {bookedCourt.location.name} </span>
                                </div>
                                <div className="card-image-container">
                                    <img className="booked-courts-img" src={Badminton_yard} alt="" />
                                    <p className="booked-court-number">Sân {bookedCourt.court.courtNumber}</p>
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
                                            defaultValue={bookedCourt.username}
                                        />
                                    </Space.Compact>
                                    {bookedCourt.status == "cancel" ? (
                                        <Button className="btn_cancel" danger>
                                            Đã Hủy
                                        </Button>
                                    ) : (
                                        bookedCourt.isFutureBooking && (
                                            <Button
                                                className="btn_cancel"
                                                type="primary"
                                                danger
                                                onClick={() => showDeleteConfirm(bookedCourt._id.toString())}>
                                                Hủy
                                            </Button>
                                        )
                                    )}
                                </div>
                            </div>
                        );
                    })}
            </div>
            <MyFooter></MyFooter>
        </div>
    );
};
