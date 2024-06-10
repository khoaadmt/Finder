import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { SetURLSearchParams, useLocation, useSearchParams } from "react-router-dom";
interface Props {
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
    totalFacility: number;
}
export const PaginationComponent: React.FC<Props> = (props) => {
    const pageSize = 6;
    const { setPageNumber, totalFacility } = props;
    const handleOnChange = (pageNumber: number) => {
        setPageNumber(pageNumber);
    };
    return (
        <div className="w-full flex justify-center pt-[20px] pb-[48px]">
            <Pagination onChange={handleOnChange} defaultCurrent={1} pageSize={pageSize} total={totalFacility} />
        </div>
    );
};
