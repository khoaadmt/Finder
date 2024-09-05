import React, { useEffect, useState } from "react";
import Layout, { Content, Header } from "antd/es/layout/layout";
import { Button, Select } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import "./index.css";
import { MyBarChart } from "./BarChart";
import { TransactionTable } from "./TransactionTable";
import BookingService from "../../../services/booking/BookingService";
import dayjs, { Dayjs } from "dayjs";
import { BookedCourts } from "../../../interface";
export const StatisticsPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [transactionTime, setTranSactionTime] = useState("day");
    const bookingService = new BookingService();
    const [data, setData] = useState<BookedCourts[] | undefined>();

    const processData = (data: any[]) => {
        return data.map((item) => ({
            "Người thuê": item.username,
            "Địa điểm": item.location.name,
            "Sân số": item.court.courtNumber,
            "Thời gian": `${item.shift.startTime} - ${item.shift.endTime}`,
            "Giá thuê": item.price,
            "Ngày thuê": item.date,
            "Ngày thanh toán": item.createdAt,
        }));
    };
    const convertToCSV = (array: any) => {
        const header = Object.keys(array[0]).join(",") + "\n";
        const rows = array.map((obj: any) => Object.values(obj).join(",")).join("\n");
        return header + rows;
    };

    const downloadCSV = () => {
        if (data) {
            const csv = convertToCSV(processData(data));
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" }); // Đảm bảo mã hóa UTF-8
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.setAttribute("href", url);
            a.setAttribute("download", "data.csv");
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(undefined as any);
        }, 700);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        const date = dayjs();
        if (transactionTime === "day") {
            const day = date.format("YYYY-MM-DD");
            bookingService.getTransactionInDay(day).then((res) => {
                setData(res.data);
            });
        }
        if (transactionTime === "month") {
            const month = date.month() + 1;
            bookingService.getTransactionInMonth(month).then((res) => {
                setData(res.data);
            });
        }
        if (transactionTime === "all") {
            bookingService.getAllTransaction().then((res) => {
                setData(res.data);
            });
        }
    }, [transactionTime]);

    const handleChange = (value: string) => {
        setTranSactionTime(value);
    };

    return (
        <Layout>
            <Content className="dashboard-content">
                <div>
                    <MyBarChart loading={loading} />
                </div>

                <div>
                    <Button onClick={downloadCSV} className="download-btn2">
                        Download CSV <DownloadOutlined />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2 pb-2">
                            <p className="title-table">Các giao dịch trong: </p>
                            <Select
                                defaultValue="day"
                                style={{ width: 120 }}
                                onChange={handleChange}
                                options={[
                                    { value: "day", label: "hôm nay" },
                                    { value: "month", label: "tháng này" },
                                    { value: "all", label: "toàn bộ" },
                                ]}
                            />
                        </div>
                        {data && <TransactionTable data={data} />}
                    </div>
                </div>
            </Content>
        </Layout>
    );
};
