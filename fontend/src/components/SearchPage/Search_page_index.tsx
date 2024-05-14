import axios from "axios";
import React, { useEffect, useState } from "react";
import { ResponseLocation } from "../../interface";
import { Search_Page_header } from "./header/Search_Page_Header";
import { useSearchParams } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const Search_page_index = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [hasOptions, setHasOptions] = useState(false);
    const location = searchParams.get("location");
    const type = searchParams.get("type");
    axios.defaults.baseURL = "http://localhost:5000";

    useEffect(() => {
        if (type === "Giao lưu") {
            setHasOptions(true);
        } else {
            setHasOptions(false);
        }
    }, [searchParams]);

    return (
        <>
            <Search_Page_header hasOptions={hasOptions} />
            <Outlet />
        </>
    );
};
