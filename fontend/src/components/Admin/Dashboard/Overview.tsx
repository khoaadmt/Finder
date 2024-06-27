import { CaretDownOutlined, CaretUpOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Badge, Card, Col, Progress, Tooltip, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { FC } from "react";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip as RTooltip, XAxis } from "recharts";
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
            <div className="overview-body">{body}</div>
            <div className="overview-footer">{footer}</div>
        </Card>
    );
};

interface TrendProps {
    wow: string;
    dod: string;
    style?: React.CSSProperties;
}

const Trend: FC<TrendProps> = ({ wow, dod, style = {} }) => {
    return (
        <div className="trend" style={style}>
            <div className="trend-item">
                <span className="trend-item-label">wowChange</span>
                <span className="trend-item-text">{wow}</span>
                <CaretUpOutlined style={{ color: "#F5222D" }} />
            </div>
            <div className="trend-item">
                <span className="trend-item-label">dodChange</span>
                <span className="trend-item-text">{dod}</span>
                <CaretDownOutlined style={{ color: "#52c41a" }} />
            </div>
        </div>
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

export const Overview: FC<{ loading: boolean }> = ({ loading }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const data = new Array(14).fill(null).map((_, index) => ({
        name: dayjs().add(index, "day").format("YYYY-MM-DD"),
        number: Math.floor(Math.random() * 8 + 1),
    }));

    return (
        <Content className="dashboard-content">
            <div className="container-card grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColCard
                    loading={loading}
                    metaName={"totalSales"}
                    metaCount="¥ 126,560"
                    body={<Trend wow="12%" dod="12%" />}
                    footer={<Field name={"app.dashboard.overview.dailySales"} number="￥12,423" />}
                />
                <ColCard
                    loading={loading}
                    metaName={"visits"}
                    metaCount="8846"
                    body={
                        <ResponsiveContainer>
                            <AreaChart data={data}>
                                <XAxis dataKey="name" hide />
                                <RTooltip content={<CustomTooltip />} />
                                <Area strokeOpacity={0} type="monotone" dataKey="number" fill="#8E65D3" />
                            </AreaChart>
                        </ResponsiveContainer>
                    }
                    footer={<Field name={"dailySales"} number="1234" />}
                />
                <ColCard
                    loading={loading}
                    metaName={"payments"}
                    metaCount="6560"
                    body={
                        <ResponsiveContainer>
                            <BarChart data={data}>
                                <XAxis dataKey="name" hide />
                                <RTooltip content={<CustomTooltip />} />
                                <Bar strokeOpacity={0} barSize={10} dataKey="number" stroke="#3B80D9" fill="#3B80D9" />
                            </BarChart>
                        </ResponsiveContainer>
                    }
                    footer={<Field name={"conversionRate"} number="60%" />}
                />
                <ColCard
                    loading={loading}
                    metaName={"operationalEffect"}
                    metaCount="8846"
                    body={<Progress strokeColor="#58BFC1" percent={85} />}
                    footer={<Trend style={{ position: "inherit" }} wow="12%" dod="12%" />}
                />
            </div>
        </Content>
    );
};
