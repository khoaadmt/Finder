import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Modal, Popconfirm, Space, Table, Tag } from "antd";
import type { PopconfirmProps, TableProps } from "antd";
import { useState } from "react";
import { EditLocationModal } from "./EditLocationModal";

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

export const OverviewLocationPage = () => {
    const columns: TableProps<DataType>["columns"] = [
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Địa chỉ",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "Khu vực",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "số sân",
            dataIndex: "tags",
            key: "tags",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleBtnEdit(record)}>
                        Sửa <EditOutlined />
                    </Button>
                    <Popconfirm
                        title="Xóa sân cầu"
                        description="Bạn có chắc muốn xóa sân cầu này không?"
                        onConfirm={() => confirm(record)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No">
                        <Button type="primary" danger>
                            Xóa <DeleteOutlined />
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const data: DataType[] = [
        {
            key: "1",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
        },
        {
            key: "2",
            name: "Jim Green",
            age: 42,
            address: "London No. 1 Lake Park",
            tags: ["loser"],
        },
        {
            key: "3",
            name: "Joe Black",
            age: 32,
            address: "Sydney No. 1 Lake Park",
            tags: ["cool", "teacher"],
        },
        {
            key: "4",
            name: "Joe Black",
            age: 32,
            address: "Sydney No. 1 Lake Park",
            tags: ["cool", "teacher"],
        },
        {
            key: "5",
            name: "Joe Black",
            age: 32,
            address: "Sydney No. 1 Lake Park",
            tags: ["cool", "teacher"],
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleBtnEdit = (record: any) => {
        console.log("record :", record);
        setIsModalOpen(true);
    };

    const confirm = (record: any) => {
        if (!record) {
            console.error("Record is undefined");
            return;
        }
        console.log("record :", record);
        message.success("Xóa sân cầu thành công");
    };

    const cancel: PopconfirmProps["onCancel"] = (e) => {
        console.log(e);
        message.error("Click on No");
    };

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20"],
                }}
            />
            <EditLocationModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
    );
};
