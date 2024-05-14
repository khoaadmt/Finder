import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { SetURLSearchParams, useLocation, useSearchParams } from "react-router-dom";
interface Props {
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
    totalFacility: number;
}
export const Pagination_search_page: React.FC<Props> = (props) => {
    const { setPageNumber, totalFacility } = props;

    const [searchParams, setSearchParams] = useSearchParams();

    const handleOnChange = (pageNumber: number) => {
        setPageNumber(pageNumber);
    };
    return (
        <div className="w-full flex justify-center pt-[20px] pb-[48px]">
            <Pagination onChange={handleOnChange} defaultCurrent={1} pageSize={3} total={totalFacility} />
        </div>
    );
};
