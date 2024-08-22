import { InfoCircleOutlined } from "@ant-design/icons";
import { Badge, Card, Tooltip } from "antd";
import React, { FC } from "react";
import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip as RTooltip, XAxis } from "recharts";
import dayjs from "dayjs";

interface ColCardProps {
    metaName: string;
    metaCount: string;
    body: React.ReactNode;
    footer: React.ReactNode;
    loading: boolean;
}

const ColCard: React.FC<ColCardProps> = (props) => {
    const { metaName, metaCount, body, footer, loading } = props;
    return (
        <Card loading={loading} className="overview" bordered={false}>
            <div className="overview-header">
                <div className="overview-header-meta">{metaName}</div>
                <div className="overview-header-count">{metaCount}</div>
                <Tooltip title="Introduce">
                    <InfoCircleOutlined className="overview-header-action" />
                </Tooltip>
            </div>
            <div className="overview-body" style={{ height: "300px" }}>
                {body}
            </div>
            <div className="overview-footer">{footer}</div>
        </Card>
    );
};

interface FieldProps {
    name: string;
    number: string;
}

const Field: FC<FieldProps> = ({ name, number }) => (
    <div className="field">
        <span className="field-label">{name}</span>
        <span className="field-number">{number} </span>
    </div>
);

const CustomTooltip: FC<any> = ({ active, payload, label }) =>
    active && (
        <div className="customTooltip">
            <span className="customTooltip-title">
                <Badge color={payload[0].fill} /> {label} : {payload[0].value}
            </span>
        </div>
    );

export const MyBarChart: FC<{ loading: boolean }> = ({ loading }) => {
    const data = new Array(14).fill(null).map((_, index) => ({
        name: dayjs().add(index, "day").format("MM-DD"),
        number: Math.floor(Math.random() * 10000 + 1),
    }));

    return (
        <ColCard
            loading={loading}
            metaName={"payments"}
            metaCount="6560"
            body={
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <XAxis dataKey="name" />
                        <RTooltip content={<CustomTooltip />} />
                        <Bar strokeOpacity={0} barSize={50} dataKey="number" stroke="#3B80D9" fill="#3B80D9" />
                        <LabelList dataKey="number" position="top" />
                    </BarChart>
                </ResponsiveContainer>
            }
            footer={<Field name={"conversionRate"} number="60%" />}
        />
    );
};
