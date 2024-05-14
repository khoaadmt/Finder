import React, { useEffect, useRef, useState } from "react";

import type { MenuProps } from "antd";
import { Button, Dropdown, Menu, Space } from "antd";
import "./search_page_header.css";
interface Props {
    value: string;
    items_value: {
        label: string;
        key: string;
    }[];
}
export const Option_button: React.FC<Props> = (props) => {
    const { value, items_value } = props;
    const items: MenuProps["items"] = items_value;
    const [optionValue, setOptionValue] = useState("");

    const handleDropdownItemClick = (e: any) => {
        const items = e.key.split(":");
        setOptionValue(items[2]);
    };
    useEffect(() => {
        setOptionValue(value);
    }, []);

    useEffect(() => {}, [value]);

    return (
        <Dropdown menu={{ items, onClick: handleDropdownItemClick }} placement="bottom" trigger={["click"]}>
            <div>
                <button className="py-[5px] px-[14px] sm:py-[12px] sm:px-[17px] xl:px-[24px] rounded-full border hover:border-[#232323] transition border-[#dfdfdf]">
                    <div className="text-sm font-semibold text-nowrap">
                        <span className="">{optionValue}</span>
                    </div>
                </button>
            </div>
        </Dropdown>
    );
};
