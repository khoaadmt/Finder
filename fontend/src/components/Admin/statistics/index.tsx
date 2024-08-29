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

    const convertToCSV = (array: any) => {
        const header = Object.keys(array[0]).join(",") + "\n";
        const rows = array.map((obj: any) => Object.values(obj).join(",")).join("\n");
        return header + rows;
    };

    const downloadCSV = () => {
        const csv = convertToCSV(data);
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute("download", "data.csv");
        a.click();
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

    console.log(data);
    return (
        <Layout>
            <Content className="dashboard-content">
                <div>
                    <Button onClick={downloadCSV} className="download-btn">
                        Download CSV <DownloadOutlined />
                    </Button>
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
                                    { value: "day", label: "ngày" },
                                    { value: "month", label: "tháng" },
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
