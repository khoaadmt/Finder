import React, { useEffect, useState } from "react";
import Layout, { Content, Header } from "antd/es/layout/layout";
import { Button, Select } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import "./index.css";
import { MyBarChart } from "./BarChart";
import { TransactionTable } from "./TransactionTable";
export const StatisticsPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [transactionTime, setTranSactionTime] = useState("ngày");
    const data = [
        { name: "John Doe", age: 28, email: "john@example.com" },
        { name: "Jane Doe", age: 25, email: "jane@example.com" },
        { name: "Alice Smith", age: 30, email: "alice@example.com" },
    ];

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
        console.log(transactionTime);
    }, [transactionTime]);
    const handleChange = (value: string) => {
        console.log("value :", value);
        setTranSactionTime(value);
    };
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

                        <TransactionTable />
                    </div>
                </div>
            </Content>
        </Layout>
    );
};
