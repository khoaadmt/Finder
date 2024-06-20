import { Form, Select } from "antd";
import React from "react";

export const Test2 = () => {
    return (
        <Select
            showSearch
            placeholder="Select a person"
            filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
            options={[
                { value: "1", label: "Jack" },
                { value: "2", label: "Lucy" },
                { value: "3", label: "Tom" },
            ]}
        />
    );
};
