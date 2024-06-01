import React, { useEffect, useRef, useState } from "react";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import "./search_page_header.css";
import { FilterOptions } from "../../../interface";

interface Props {
    defaultValue: string;
    items_value: {
        label: string;
        key: string;
    }[];

    setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions | null>>;
}
export const Option_button: React.FC<Props> = (props) => {
    const { defaultValue, items_value, setFilterOptions } = props;
    const items: MenuProps["items"] = items_value;
    const [optionValue, setOptionValue] = useState("");

    const handleDropdownItemClick = (e: any) => {
        const items = e.key.split(":");
        setOptionValue(items[2]);

        setFilterOptions((prev) => {
            return {
                ...prev,
                [items[1]]: items[0],
            } as FilterOptions;
        });
    };

    useEffect(() => {
        setOptionValue(defaultValue);
    }, []);

    useEffect(() => {}, [defaultValue]);

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
