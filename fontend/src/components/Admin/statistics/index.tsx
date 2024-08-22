import React, { useEffect, useState } from "react";
import Layout, { Content, Header } from "antd/es/layout/layout";
import { MyBarChart } from "./BarChart";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import "./index.css";
export const StatisticsPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
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

    return (
        <Layout>
            <Header style={{ background: "#F5F5F5" }}>
                <Button onClick={downloadCSV} className="download-btn sm:w-auto">
                    Download CSV <DownloadOutlined />
                </Button>
            </Header>
            <Content className="dashboard-content">
                <MyBarChart loading={loading} />
            </Content>
        </Layout>
    );
};
